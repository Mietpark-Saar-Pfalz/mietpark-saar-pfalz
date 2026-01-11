# Cloudflare WAF Konfiguration für Legal-Seiten

## 🎯 Ziel

Nur **KI-Bots** von den Legal-Seiten (`/impressum`, `/datenschutz`, `/agb`) blocken, während normale SEO-Crawler (GoogleBot, Bingbot) ungehindert zugreifen können.

## ⚙️ Voraussetzung

- **Cloudflare Plan**: Pro oder höher (WAF-Zugang erforderlich)
- Domain: `mietpark-saar-pfalz.com` (bereits konfiguriert)

## 🔧 Schritt-für-Schritt Anleitung

### 1. Cloudflare Dashboard öffnen

1. Gehe zu [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Wähle deine Domain: **mietpark-saar-pfalz.com**
3. Navigiere zu **Security** → **WAF** (Web Application Firewall)

### 2. Neue WAF-Regel erstellen

Klick auf **"Create Rule"** unter "Custom rules"

### 3. Rule-Details ausfüllen

**Name der Regel:**
```
Block AI Bots on Legal Pages
```

**Condition (Expression):**
```
(http.request.uri.path contains "/impressum" or
 http.request.uri.path contains "/datenschutz" or
 http.request.uri.path contains "/agb")
and
(cf.verified_bot_category eq "AI Crawler" or
 cf.bot_management.verified_bot_category eq "AI Crawler")
```

**Alternative (vereinfacht, wenn obiges nicht funktioniert):**
```
(http.request.uri.path contains "/impressum" or
 http.request.uri.path contains "/datenschutz" or
 http.request.uri.path contains "/agb")
and
(cf.bot.name contains "AI" or
 cf.bot.name contains "Claude" or
 cf.bot.name contains "GPT" or
 cf.bot.name contains "Perplexity" or
 cf.bot.name contains "Common Crawl")
```

**Action (Aktion):**
- **Block** (Standard) — Antwortet mit 403 Forbidden
- **Managed Challenge** — Zeigt CAPTCHA/Proof-of-Work (sanfter)

> **Empfehlung**: Starte mit "Managed Challenge", um zu sehen, ob echte KI-Bots blockt werden.

### 4. Rule aktivieren

Klick **"Deploy"** oder **"Save"**

---

## 📋 Alternative: Nur spezifische KI-Bots blocken

Falls die obige Regel zu breit ist, blockiere **nur bestimmte Bots**:

```
(http.request.uri.path contains "/impressum" or
 http.request.uri.path contains "/datenschutz" or
 http.request.uri.path contains "/agb")
and
(cf.bot.name eq "GPTBot" or
 cf.bot.name eq "CCBot" or
 cf.bot.name eq "PerplexityBot" or
 cf.bot.name eq "ClaudeBot" or
 cf.bot.name eq "Applebot")
```

---

## ✅ Testen

### 1. Mit curl testen (normaler Bot):
```bash
curl -I https://mietpark-saar-pfalz.com/impressum \
  -H "User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1)"
# Erwartet: HTTP 200 OK
```

### 2. Mit GPTBot-User-Agent testen:
```bash
curl -I https://mietpark-saar-pfalz.com/impressum \
  -H "User-Agent: Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)"
# Erwartet: HTTP 403 Forbidden oder 429 (Challenge)
```

### 3. Im Cloudflare Dashboard überprüfen:
- **Security** → **Events** → Gefilterte Requests ansehen
- **Analytics** → **Bot Management** (wenn aktiviert)

---

## 📊 Monitoring

### Real-Time Logs prüfen:
1. Dashboard → **Security** → **Events**
2. Filter nach **Status: 403** und **Path: /impressum** usw.
3. Sehe welche Bots blockt wurden

### Insights:
- **Blocking Rate**: Wie viele KI-Bots werden blockt?
- **False Positives**: Werden echte User blockt? (sollte 0 sein)

---

## 🎛️ Erweiterte Optionen

### Nur für bestimmte User-Agents:
```
(http.request.uri.path contains "/impressum" or
 http.request.uri.path contains "/datenschutz" or
 http.request.uri.path contains "/agb")
and
(http.user_agent contains "AI" or
 http.user_agent contains "Bot" or
 http.user_agent contains "Crawler")
and
not http.user_agent contains "Googlebot" and
not http.user_agent contains "Bingbot"
```

### Rate Limiting kombinieren:
Zusätzlich zu WAF kannst du auch **Rate Limiting** setzen:
- Path: `/impressum`, `/datenschutz`, `/agb`
- Limit: 10 requests pro 10 Sekunden pro IP
- Action: Block oder Challenge

---

## 🔄 Zusammenfassung der Strategie

| Schicht | Methode | Effekt |
|---------|---------|--------|
| 1. robots.txt | `Disallow: /impressum` | Polite crawlers respektieren das |
| 2. Meta-Tags | `<meta name="robots" content="noindex">` | HTML-Level Signal |
| 3. Cloudflare WAF | Block AI Bots auf Legal Pages | Prevents aggressive crawling |
| 4. Rate Limiting | Max 10 req/10s | Backup gegen Brute-Force |

---

## ⚠️ Wichtige Hinweise

1. **Cloudflare Plan erforderlich**: WAF ist nur in Pro+ verfügbar
2. **Testing ist wichtig**: Vor dem Deploy in Production testen
3. **False Positives**: Legitime Nutzer könnten blockt werden → Monitorn
4. **EU-DSGVO**: WAF-Logs enthalten IP-Adressen → Datenschutzerklärung ggf. anpassen

---

## 📝 Logs der konfigurierten Regeln

Wenn alles konfiguriert ist, findest du die WAF-Aktivität hier:
```
Cloudflare Dashboard → Security → Events → Filter by:
- Path: /impressum
- Action: Block / Challenge
```

Beispiel-Output:
```
Time: 2026-01-11 10:45:32
IP: 203.0.113.42
Country: US
Bot: GPTBot/1.0
Action: Block (403)
Rule: "Block AI Bots on Legal Pages"
Path: /impressum
```

---

## 🚀 Quick-Start Checkliste

- [ ] Cloudflare Dashboard öffnet sich
- [ ] Security → WAF → Create Rule
- [ ] Expression eingeben (siehe Schritt 3)
- [ ] Action wählen (Managed Challenge empfohlen)
- [ ] Deploy/Save
- [ ] Mit curl testen (siehe Testen)
- [ ] Monitoring in "Events" aktivieren
- [ ] In 24-48h Logs überprüfen

---

**Erstellt:** 2026-01-11  
**Status:** Ready to deploy  
**Letzte Änderung:** WAF Rule für Legal Pages

