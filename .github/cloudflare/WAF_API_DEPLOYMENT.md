# Cloudflare WAF API Deployment - Ruleset Engine Approach

## 📋 Zusammenfassung

**Erfolgreich getestete Methode:** Cloudflare Ruleset Engine API (Zone Rulesets)

**Was blockiert wird:** AI-Bots werden durch Cloudflares "Managed Free Ruleset" automatisch blockiert.

**Status:** ✅ Live und funktionierend

---

## 🔧 Wie die WAF-Rule erstellt wurde

### 1. API Token erstellen

**URL:** https://dash.cloudflare.com/profile/api-tokens

**Erforderliche Berechtigungen:**
- ✅ Zone → Edit (ALL)
- ✅ WAF → Edit
- ✅ Firewall Services → Edit

**Token Name:** `Mietpark WAF Admin`

**TTL:** 90 Tage

### 2. Zone IDs ermitteln

```bash
ZONE_ID="83f7da4541755ff2f35a0cfb7c024d9b"      # mietpark-saar-pfalz.com
API_TOKEN="your_token_here"
```

### 3. Existierende Rulesets abrufen (READ)

```bash
curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets" \
  -H "Authorization: Bearer $API_TOKEN" | python3 -m json.tool
```

**Output:** Liste aller Rulesets, z.B.:
- `Cloudflare Normalization Ruleset` (phase: http_request_sanitize)
- `Cloudflare Managed Free Ruleset` (phase: http_request_firewall_managed) ← **Blockiert AI Bots!**
- `DDoS L7 ruleset` (phase: ddos_l7)
- `default` (kind: zone, phase: http_request_firewall_custom) ← **Unsere Custom Rule**

**Merke:** Ruleset ID für Custom Rules = `6561ccfd3de34d62b5f6c9e3fbcb240a`

---

## 🛠️ WAF Rule via Ruleset API erstellen

### Option A: Rule mit Legal Pages Filter

```bash
RULESET_ID="6561ccfd3de34d62b5f6c9e3fbcb240a"

curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "default",
    "description": "Custom WAF Rules",
    "kind": "zone",
    "phase": "http_request_firewall_custom",
    "rules": [
      {
        "action": "managed_challenge",
        "expression": "http.request.uri.path in {\"/impressum\" \"/impressum/\" \"/datenschutz\" \"/datenschutz/\" \"/agb\" \"/agb/\"}",
        "description": "Block bots on legal pages"
      }
    ]
  }'
```

**Response Success:**
```json
{
  "success": true,
  "result": {
    "id": "6561ccfd3de34d62b5f6c9e3fbcb240a",
    "kind": "zone",
    "phase": "http_request_firewall_custom",
    "rules": [
      {
        "id": "263439b2328147f5b349bcb330b75af3",
        "action": "managed_challenge",
        "enabled": true,
        "expression": "http.request.uri.path in {...}",
        "description": "Block bots on legal pages"
      }
    ],
    "version": "5"
  }
}
```

### Option B: Rule mit AI-Bot Detection (User-Agent)

```bash
curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "default",
    "description": "Custom WAF Rules",
    "kind": "zone",
    "phase": "http_request_firewall_custom",
    "rules": [
      {
        "action": "managed_challenge",
        "expression": "(http.request.uri.path in {\"/impressum\" \"/impressum/\" \"/datenschutz\" \"/datenschutz/\" \"/agb\" \"/agb/\"}) and (http.user_agent contains \"GPT\" or http.user_agent contains \"Perplexity\" or http.user_agent contains \"Claude\")",
        "description": "Block AI Bots on Legal Pages"
      }
    ]
  }'
```

---

## 🧪 Testing der Rule

### Test 1: AI-Bot auf Legal Page

```bash
curl -s -w "%{http_code}\n" -o /dev/null https://mietpark-saar-pfalz.com/impressum \
  -H "User-Agent: GPTBot/1.0"
# Expected: 403 (blockiert)
```

### Test 2: AI-Bot auf normaler Seite

```bash
curl -s -w "%{http_code}\n" -o /dev/null https://mietpark-saar-pfalz.com/blog \
  -H "User-Agent: GPTBot/1.0"
# Expected: 200 (erlaubt) oder 403 (Cloudflare blockiert global)
```

### Test 3: Normaler Browser

```bash
curl -s -w "%{http_code}\n" -o /dev/null https://mietpark-saar-pfalz.com/impressum \
  -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
# Expected: 200 (erlaubt)
```

### Test 4: Googlebot

```bash
curl -s -w "%{http_code}\n" -o /dev/null https://mietpark-saar-pfalz.com/blog \
  -H "User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1)"
# Expected: 200 (erlaubt)
```

---

## 📊 Aktuelle Ergebnisse (11. Jan 2026)

| Bot | /impressum | /blog | /datenschutz |
|-----|-----------|-------|--------------|
| GPTBot | 403 | 200 | 403 |
| Perplexity | 403 | 200 | 403 |
| Googlebot | 200 | 200 | 200 |
| Browser | 200 | 200 | 200 |

**Hinweis:** GPTBot wird auch global durch Cloudflare's "Managed Free Ruleset" blockiert. Custom Rule ist für zusätzliche Kontrolle gedacht.

---

## 🔄 Rule aktualisieren (PUT)

Um eine bestehende Rule zu ändern, verwendet man **PUT** mit der kompletten neuen Ruleset-Struktur:

```bash
curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ ...new ruleset... }'
```

⚠️ **PATCH funktioniert NICHT** mit API Tokens! Nur PUT.

---

## ❌ Was NICHT funktioniert hat

### 1. Firewall Rules API (veraltet?)
```bash
# ❌ Gibt Error: malformed_request_body
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/rules"
```

### 2. WAF Overrides API
```bash
# ❌ Gibt Error: Authentication error
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/waf/overrides"
```

### 3. Page Rules API
```bash
# ❌ Endpoint existiert nicht (veraltet)
curl -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_rules"
```

---

## 📚 Ressourcen

- [Cloudflare Ruleset API Docs](https://developers.cloudflare.com/api/resources/zones/resources/rulesets/)
- [Cloudflare Account-Owned Tokens](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/)
- [WAF Rule Expressions](https://developers.cloudflare.com/waf/custom-rules/waf-expressions/)

---

## 🎯 Nächste Schritte

1. **Monitoring:** Überprüfe Cloudflare Security Events für blockierte Requests
   - URL: https://dash.cloudflare.com/83f7da4541755ff2f35a0cfb7c024d9b/analytics/security

2. **Automatisierung:** Scripte in `scripts/deploy-waf.js` verwenden für CI/CD

3. **Anpassungen:** Mit PUT-API können neue Expressions hinzugefügt werden, z.B. für PerplexityBot, ClaudeBot, etc.

---

**Letzte Aktualisierung:** 11. Januar 2026  
**Status:** ✅ Erfolgreich deployiert und getestet
