# Cloudflare Integration für Mietpark Saar-Pfalz

## 📍 Kurz-Übersicht

Diese Ordner enthält Dokumentation und Konfigurationen für **Cloudflare-Features**:

### 🔐 Konfigurierte Features

| Feature | Status | Datei | Beschreibung |
|---------|--------|-------|-------------|
| **Feed-Redirect** | ✅ Live | — | `/feed/` → `/feed/index.xml` (301) |
| **HTTPS + www-Redirect** | ✅ Live | — | Automatisch in Cloudflare konfiguriert |
| **WAF (Web App Firewall)** | 📋 Ready | `WAF_DEPLOYMENT.md` | Wrangler-basiertes Deployment für KI-Bot Blocking |
| **Rate Limiting** | 📋 Optional | `WAF_CONFIG.md` | Backup gegen Brute-Force (Schritt 5) |

---

## 🚀 Schnellanleitung WAF

Falls du KI-Bots von Legal-Seiten blocken möchtest:

1. **Datei öffnen**: [`WAF_DEPLOYMENT.md`](./WAF_DEPLOYMENT.md)
2. **API Token holen** bei Cloudflare (2 Min)
3. **Token in `.env.local` eintragen**
4. **Deployment ausführen**: `npm run deploy:waf`
5. **Monitoring aktivieren** (Security → Events)

---

## 📋 Dateien in diesem Ordner

- **`WAF_DEPLOYMENT.md`** — Wrangler/Node.js-basiertes Deployment
  - Automatisches Setup via `npm run deploy:waf`
  - API Token Management
  - Test-Befehle mit curl
  - Troubleshooting

- **`WAF_CONFIG.md`** — Manuelle Konfiguration (Fallback)
  - Für alle, die das Dashboard lieber nutzen
  - Vollständige Anleitung mit Expressions
  - Test-Befehle

---

## ⚙️ Live-Konfigurationen (bereits aktiv)

### Redirect-Regel
```
Source: https://mietpark-saar-pfalz.com/feed 
                oder /feed/
Destination: https://mietpark-saar-pfalz.com/feed/index.xml
Status: 301 (Permanent Redirect)
```

**Test:**
```bash
curl -I https://mietpark-saar-pfalz.com/feed
# → HTTP 301
# → Location: https://mietpark-saar-pfalz.com/feed/index.xml
```

### HTTPS + www
```
Always HTTPS: Enabled
Redirect www to apex: Enabled (www.mietpark-saar-pfalz.com → mietpark-saar-pfalz.com)
```

---

## 🔗 Cloudflare Dashboard Links

- [Domain Settings](https://dash.cloudflare.com/?account=mietpark-saar-pfalz.com)
- [WAF Rules](https://dash.cloudflare.com/?account=mietpark-saar-pfalz.com&zone=mietpark-saar-pfalz.com&page=waf)
- [Redirect Rules](https://dash.cloudflare.com/?account=mietpark-saar-pfalz.com&zone=mietpark-saar-pfalz.com&page=rules)
- [Security Events](https://dash.cloudflare.com/?account=mietpark-saar-pfalz.com&zone=mietpark-saar-pfalz.com&page=security_events)

---

## ❓ FAQ

**F: Brauche ich den WAF?**  
A: Nein, optional. robots.txt + Meta-Tags reichen aus. WAF ist ein Upgrade für höhere Kontrolle.

**F: Ist der WAF kostenlos?**  
A: Nein, nur in Cloudflare Pro+ Plan ($20+/Monat). Standard-Plan hat keinen WAF-Zugang.

**F: Blockt WAF auch normale User?**  
A: Nein, wenn richtig konfiguriert. WAF filtert nach Bot-Profilen, nicht nach normalen Browsern.

**F: Wie teste ich die WAF-Regel?**  
A: Mit `curl` + Custom User-Agent (siehe Schritt "Testen" in WAF_CONFIG.md)

---

## 📞 Support

Falls WAF-Konfiguration nicht funktioniert:
1. Überprüfe deinen Cloudflare Plan (mindestens Pro)
2. Verifiziere die Expression-Syntax (Cloudflare Editor zeigt Fehler)
3. Prüfe "Security → Events" für blockte Requests
4. Teste mit verschiedenen User-Agents (curl -H "User-Agent: ...")

---

**Erstellt:** 2026-01-11  
**Letzte Änderung:** WAF-Dokumentation hinzugefügt

