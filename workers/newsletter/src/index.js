const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

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

async function sendBrevoDoubleOptIn(email, request, env, source) {
    const templateId = Number(env.BREVO_DOI_TEMPLATE_ID || '');
    const listId = Number(env.BREVO_LIST_ID || '');

    if (!env.BREVO_API_KEY || !templateId || !listId) {
        throw new Error('Brevo-Konfiguration ist unvollständig.');
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
        throw new Error(`Brevo API Fehler: ${errorDetail}`);
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
        const source = (payload.source || 'website').toString().slice(0, 60);

        if (!EMAIL_REGEX.test(email)) {
            return jsonResponse({ message: 'Bitte eine gültige E-Mail-Adresse angeben.' }, { status: 400, corsHeaders });
        }

        if (!consent) {
            return jsonResponse({ message: 'Die Einwilligung ist erforderlich.' }, { status: 400, corsHeaders });
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
