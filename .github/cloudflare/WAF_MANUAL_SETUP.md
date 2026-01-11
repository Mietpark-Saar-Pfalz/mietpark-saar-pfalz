# WAF-Regel manuell anpassen (Dashboard)

## ⚠️ API-Kompatibilität

Die Cloudflare Firewall Rules API funktioniert leider nicht für alle Zone-Konfigurationen. Daher: **manuelle Konfiguration im Dashboard** (2-Minuten-Setup).

## 📋 So passt du die Rule an:

### 1. Dashboard öffnen
Gehe zu: https://dash.cloudflare.com/?account=600df42578d05bdf7c2a08a4f93f0b70&zone=83f7da4541755ff2f35a0cfb7c024d9b&page=waf

### 2. Neue Custom Rule erstellen

**Klick: "Create Rule"** unter "Custom Rules"

### 3. Rule-Details eingeben

**Name**: `Block AI Bots on Legal Pages`

**Expression** (Copy & Paste exakt):
```
(http.request.uri.path eq "/impressum" or
 http.request.uri.path eq "/impressum/" or
 http.request.uri.path eq "/datenschutz" or
 http.request.uri.path eq "/datenschutz/" or
 http.request.uri.path eq "/agb" or
 http.request.uri.path eq "/agb/")
and
cf.verified_bot_category eq "AI Crawler"
```

**Action**: `Managed Challenge` (oder `Block` wenn schärfer)

**Deploy**: Klick "Deploy"

---

## 🧪 Test nach Konfiguration

```bash
# Test 1: Googlebot auf /blog (sollte 200 sein)
curl -I https://mietpark-saar-pfalz.com/blog \
  -H "User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1)"
# Expected: HTTP 200 OK

# Test 2: GPTBot auf /blog (sollte 200 sein - nicht blockiert!)
curl -I https://mietpark-saar-pfalz.com/blog \
  -H "User-Agent: Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)"
# Expected: HTTP 200 OK (NICHT 403!)

# Test 3: GPTBot auf /impressum (sollte 403 sein)
curl -I https://mietpark-saar-pfalz.com/impressum \
  -H "User-Agent: Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)"
# Expected: HTTP 403 Forbidden oder Managed Challenge (CAPTCHA)
```

---

## ✅ Unterschied zwischen alt und neu

| Pfad | Alt (zu breit) | Neu (nur Legal) |
|------|---|---|
| `/impressum` + GPTBot | 🚫 403 | 🚫 403 |
| `/blog` + GPTBot | 🚫 403 | ✅ 200 |
| `/product/dachbox` + GPTBot | 🚫 403 | ✅ 200 |

---

## 💡 Warum API nicht funktioniert

Die Firewall Rules API (`/zones/{id}/firewall/rules`) hat Kompatibilitätsprobleme mit bestimmten Zone-Konfigurationen. Das Dashboard verwendet andere interne APIs, die stabiler sind.

**Alternative für Zukunft**: Wenn du später API-Automatisierung willst, kannst du Cloudflare Wrangler Workers + Deploy Hooks verwenden.

---

**Sobald konfiguriert → Test-Befehle laufen lassen und Bescheid geben!**
