const EMAIL_REGEX = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i;
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5;
// NOTE: For long-lived/persistent rate limits consider Durable Objects or KV storage.
const submissionLog = new Map();

function parseAllowedOrigins(env) {
    const raw = env.ALLOWED_ORIGINS || '';
    return raw
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);
}

function resolveCorsOrigin(origin, env) {
    const allowed = parseAllowedOrigins(env);
    if (!allowed.length) {
        return '*';
    }

    if (origin && allowed.includes(origin)) {
        return origin;
    }

    // Fallback auf erste konfigurierte Domain
    return allowed[0];
}

function buildCorsHeaders(origin, env) {
    const allowOrigin = resolveCorsOrigin(origin, env);
    return {
        'Access-Control-Allow-Origin': allowOrigin,
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
    };
}

function jsonResponse(payload, { status = 200, corsHeaders }) {
    return new Response(JSON.stringify(payload), {
        status,
        headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
        }
    });
}

function handleOptions(request, env) {
    const origin = request.headers.get('Origin') || '';
    const corsHeaders = buildCorsHeaders(origin, env);
    return new Response(null, { headers: corsHeaders });
}

function registerSubmission(ip) {
    const key = ip || 'anonymous';
    const now = Date.now();
    const history = submissionLog.get(key)?.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS) || [];

    if (!history.length) {
        submissionLog.delete(key);
    }

    if (history.length >= RATE_LIMIT_MAX_REQUESTS) {
        submissionLog.set(key, history);
        return false;
    }

    history.push(now);
    submissionLog.set(key, history);
    return true;
}

async function sendBrevoDoubleOptIn(email, request, env, source) {
    const templateId = parseInt(env.BREVO_DOI_TEMPLATE_ID, 10);
    const listId = parseInt(env.BREVO_LIST_ID, 10);

    if (!env.BREVO_API_KEY || Number.isNaN(templateId) || Number.isNaN(listId)) {
        if (env.ENVIRONMENT === 'development') {
            console.error('Brevo-Konfiguration ist unvollständig: Bitte API-Key, Template-ID und List-ID prüfen.');
        }
        throw new Error('Newsletter-Anmeldung ist derzeit nicht möglich. Bitte versuchen Sie es später erneut.');
    }

    const body = {
        email,
        includeListIds: [listId],
        templateId,
        redirectionUrl: env.BREVO_REDIRECT_URL || 'https://mietpark-saar-pfalz.com/newsletter-bestaetigt',
        attributes: {
            SOURCE: source,
            IP_ADDRESS: request.headers.get('CF-Connecting-IP') || 'unknown'
        }
    };

    const response = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': env.BREVO_API_KEY
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const errorDetail = await response.text();
        console.error('Brevo API error while sending double opt-in email:', {
            status: response.status,
            body: errorDetail
        });
        throw new Error('Fehler beim Versand der Bestätigungs-E-Mail. Bitte versuchen Sie es später erneut.');
    }
}

export default {
    async fetch(request, env) {
        if (request.method === 'OPTIONS') {
            return handleOptions(request, env);
        }

        const origin = request.headers.get('Origin') || '';
        const corsHeaders = buildCorsHeaders(origin, env);

        if (request.method !== 'POST') {
            return jsonResponse({ message: 'Method not allowed' }, { status: 405, corsHeaders });
        }

        let payload;
        try {
            payload = await request.json();
        } catch (error) {
            return jsonResponse({ message: 'Ungültiges JSON-Format.' }, { status: 400, corsHeaders });
        }

        const email = (payload.email || '').trim().toLowerCase();
        const consent = Boolean(payload.consent);
        const rawSource = (payload.source || 'website').toString();
        let source = rawSource.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 60);
        if (!source) {
            source = 'website';
        }

        if (!EMAIL_REGEX.test(email)) {
            return jsonResponse({ message: 'Bitte eine gültige E-Mail-Adresse angeben.' }, { status: 400, corsHeaders });
        }

        if (!consent) {
            return jsonResponse({ message: 'Die Einwilligung ist erforderlich.' }, { status: 400, corsHeaders });
        }

        const ipAddress = request.headers.get('CF-Connecting-IP') || 'anonymous';
        if (!registerSubmission(ipAddress)) {
            return jsonResponse({ message: 'Zu viele Anfragen. Bitte versuche es in einer Minute erneut.' }, { status: 429, corsHeaders });
        }

        try {
            await sendBrevoDoubleOptIn(email, request, env, source);
            return jsonResponse({ message: 'Fast geschafft! Bitte bestätige deine Anmeldung in der zugesandten E-Mail.' }, { status: 200, corsHeaders });
        } catch (error) {
            console.error('Newsletter worker error', error);
            return jsonResponse({ message: 'Der Newsletter-Dienst ist momentan nicht erreichbar. Bitte versuche es später erneut.' }, { status: 502, corsHeaders });
        }
    }
};
