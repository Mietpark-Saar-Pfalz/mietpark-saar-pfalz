var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.js
var EMAIL_REGEX = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i;
var RATE_LIMIT_WINDOW_MS = 6e4;
var RATE_LIMIT_MAX_REQUESTS = 5;
var submissionLog = /* @__PURE__ */ new Map();
function parseAllowedOrigins(env) {
  const raw = env.ALLOWED_ORIGINS || "";
  return raw.split(",").map((value) => value.trim()).filter(Boolean);
}
__name(parseAllowedOrigins, "parseAllowedOrigins");
function resolveCorsOrigin(origin, env) {
  const allowed = parseAllowedOrigins(env);
  if (!allowed.length) {
    return "*";
  }
  if (origin && allowed.includes(origin)) {
    return origin;
  }
  return allowed[0];
}
__name(resolveCorsOrigin, "resolveCorsOrigin");
function buildCorsHeaders(origin, env) {
  const allowOrigin = resolveCorsOrigin(origin, env);
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
}
__name(buildCorsHeaders, "buildCorsHeaders");
function jsonResponse(payload, { status = 200, corsHeaders }) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders
    }
  });
}
__name(jsonResponse, "jsonResponse");
function handleOptions(request, env) {
  const origin = request.headers.get("Origin") || "";
  const corsHeaders = buildCorsHeaders(origin, env);
  return new Response(null, { headers: corsHeaders });
}
__name(handleOptions, "handleOptions");
function registerSubmission(ip) {
  const key = ip || "anonymous";
  const now = Date.now();
  const history = submissionLog.get(key)?.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS) || [];
  if (history.length >= RATE_LIMIT_MAX_REQUESTS) {
    submissionLog.set(key, history);
    return false;
  }
  history.push(now);
  submissionLog.set(key, history);
  return true;
}
__name(registerSubmission, "registerSubmission");
async function sendBrevoDoubleOptIn(email, request, env, source) {
  const templateId = parseInt(env.BREVO_DOI_TEMPLATE_ID, 10);
  const listId = parseInt(env.BREVO_LIST_ID, 10);
  if (!env.BREVO_API_KEY || Number.isNaN(templateId) || Number.isNaN(listId)) {
    if (env.ENVIRONMENT === "development") {
      console.error("Brevo-Konfiguration ist unvollst\xE4ndig: Bitte API-Key, Template-ID und List-ID pr\xFCfen.");
    }
    throw new Error("Newsletter-Anmeldung ist derzeit nicht m\xF6glich. Bitte versuchen Sie es sp\xE4ter erneut.");
  }
  const body = {
    email,
    includeListIds: [listId],
    templateId,
    redirectionUrl: env.BREVO_REDIRECT_URL || "https://mietpark-saar-pfalz.com/newsletter-bestaetigt",
    attributes: {
      SOURCE: source,
      IP_ADDRESS: request.headers.get("CF-Connecting-IP") || "unknown"
    }
  };
  const response = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": env.BREVO_API_KEY
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    const errorDetail = await response.text();
    console.error("Brevo API error while sending double opt-in email:", {
      status: response.status,
      body: errorDetail
    });
    throw new Error("Fehler beim Versand der Best\xE4tigungs-E-Mail. Bitte versuchen Sie es sp\xE4ter erneut.");
  }
}
__name(sendBrevoDoubleOptIn, "sendBrevoDoubleOptIn");
var src_default = {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return handleOptions(request, env);
    }
    const origin = request.headers.get("Origin") || "";
    const corsHeaders = buildCorsHeaders(origin, env);
    if (request.method !== "POST") {
      return jsonResponse({ message: "Method not allowed" }, { status: 405, corsHeaders });
    }
    const ipAddress = request.headers.get("CF-Connecting-IP") || "anonymous";
    if (!registerSubmission(ipAddress)) {
      return jsonResponse({ message: "Zu viele Anfragen. Bitte versuche es in einer Minute erneut." }, { status: 429, corsHeaders });
    }
    let payload;
    try {
      payload = await request.json();
    } catch (error) {
      return jsonResponse({ message: "Ung\xFCltiges JSON-Format." }, { status: 400, corsHeaders });
    }
    const email = (payload.email || "").trim().toLowerCase();
    const consent = Boolean(payload.consent);
    const rawSource = (payload.source || "website").toString();
    const source = rawSource.replace(/[^A-Za-z0-9_-]/g, "").slice(0, 60) || "website";
    if (!EMAIL_REGEX.test(email)) {
      return jsonResponse({ message: "Bitte eine g\xFCltige E-Mail-Adresse angeben." }, { status: 400, corsHeaders });
    }
    if (!consent) {
      return jsonResponse({ message: "Die Einwilligung ist erforderlich." }, { status: 400, corsHeaders });
    }
    try {
      await sendBrevoDoubleOptIn(email, request, env, source);
      return jsonResponse({ message: "Fast geschafft! Bitte best\xE4tige deine Anmeldung in der zugesandten E-Mail." }, { status: 200, corsHeaders });
    } catch (error) {
      console.error("Newsletter worker error", error);
      return jsonResponse({ message: "Der Newsletter-Dienst ist momentan nicht erreichbar. Bitte versuche es sp\xE4ter erneut." }, { status: 502, corsHeaders });
    }
  }
};

// ../../../../../../opt/homebrew/Cellar/cloudflare-wrangler/4.56.0/libexec/lib/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../../../../opt/homebrew/Cellar/cloudflare-wrangler/4.56.0/libexec/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-1GT2L1/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// ../../../../../../opt/homebrew/Cellar/cloudflare-wrangler/4.56.0/libexec/lib/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-1GT2L1/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
