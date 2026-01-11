# Cloudflare WAF Deployment mit Wrangler

## 🚀 Quick Start

### 1. API Token holen

Gehe zu: https://dash.cloudflare.com/profile/api-tokens

**Erstelle einen neuen Token** mit folgenden Permissions:
- Zone → Firewall Management (Write)
- Zone → Zone Settings (Read)

Beispiel-Token-Name: `mietpark-waf-deployment`

### 2. Token in `.env.local` eintragen

```bash
# Öffne .env.local und füge deinen Token ein:
echo "CLOUDFLARE_API_TOKEN=your_token_here" >> .env.local
```

Ersetze `your_token_here` mit deinem echten Token.

### 3. WAF Rule deployen

```bash
# Via npm Script:
npm run deploy:waf

# Oder direkt mit Node:
node scripts/deploy-waf.js
```

**Erwartet Output:**
```
🔧 Deploying WAF Rule for Legal Pages...

📍 Step 1: Finding Zone ID...
✅ Zone ID: abc123def456...

🔍 Step 2: Checking for existing rule...
✏️  Step 3: Creating WAF Rule...
✅ WAF Rule Created Successfully!

Rule ID: firewall_uuid_here
Name: Block AI Bots on Legal Pages
Mode: managed_challenge
Status: Enabled

🔐 Step 4: Verifying Rule...
✅ Verification successful! Rule is active.

🧪 Testing:
...
```

---

## 🧪 WAF Rule testen

### Test 1: Normal Bot (sollte durchkommen)
```bash
curl -I https://mietpark-saar-pfalz.com/impressum \
  -H "User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1)"
# Erwartet: HTTP 200 OK
```

### Test 2: GPTBot (sollte geblockt werden)
```bash
curl -I https://mietpark-saar-pfalz.com/impressum \
  -H "User-Agent: Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)"
# Erwartet: HTTP 403 Forbidden oder 429 Challenge
```

### Test 3: Im Cloudflare Dashboard
1. Gehe zu: https://dash.cloudflare.com/?account=mietpark-saar-pfalz.com&page=waf
2. Suche nach "Block AI Bots on Legal Pages"
3. Prüfe die "Security Events" für blockierte Requests

---

## ⚙️ Was macht das Skript?

1. **Zone ID finden** — Sucht deine Cloudflare Zone für `mietpark-saar-pfalz.com`
2. **Prüft auf existierende Regel** — Falls bereits vorhanden, bricht ab
3. **Erstellt WAF Rule** mit Conditions:
   - **Pfade**: `/impressum`, `/datenschutz`, `/agb`
   - **Bot-Filter**: AI Crawlers (OpenAI, Perplexity, Claude, etc.)
   - **Action**: Managed Challenge (CAPTCHA/Proof-of-Work)
4. **Verifiziert** die Regel ist aktiv

---

## 📋 Cloudflare WAF Expression

Falls du die Regel manuell anpassen möchtest, hier ist die Expression:

```
(http.request.uri.path contains "/impressum" or
 http.request.uri.path contains "/datenschutz" or
 http.request.uri.path contains "/agb")
and
(cf.verified_bot_category eq "AI Crawler" or
 cf.bot_management.verified_bot_category eq "AI Crawler")
```

---

## ❓ FAQ

**F: Was ist der Unterschied zwischen "Block" und "Managed Challenge"?**  
A: 
- **Block**: HTTP 403 Forbidden (sofort blockiert)
- **Managed Challenge**: CAPTCHA/Proof-of-Work (Bots müssen einen Challenge lösen)

Managed Challenge ist sanfter und blockiert keine Humans. Empfohlen!

**F: Kann ich die Regel später deaktivieren?**  
A: Ja, im Dashboard: Security → WAF → Disable/Delete Rule

**F: Muss ich das Skript erneut laufen lassen?**  
A: Nein, nur einmalig zum Erstellen. Updates machst du manuell im Dashboard.

---

## 🔗 Nützliche Links

- [Cloudflare WAF Dashboard](https://dash.cloudflare.com/?account=mietpark-saar-pfalz.com&page=waf)
- [Security Events Log](https://dash.cloudflare.com/?account=mietpark-saar-pfalz.com&page=security_events)
- [Firewall Rule Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/)
- [API Documentation](https://developers.cloudflare.com/api/operations/firewall-waf-rules-list-waaf-overrides)

---

## 🐛 Troubleshooting

### "API Error: Invalid token"
- Token ist ungültig oder hat keine Permissions
- Erstelle einen neuen Token mit allen Permissions

### "Zone not found"
- Domain `mietpark-saar-pfalz.com` ist nicht bei diesem Cloudflare Account registriert
- Überprüfe den Cloudflare Account

### "Rule already exists"
- Die Regel wurde bereits erstellt
- Um zu löschen: Dashboard → Security → WAF → Delete Rule

---

**Erstellt:** 2026-01-11  
**Letzte Änderung:** WAF-Deployment-Dokumentation

