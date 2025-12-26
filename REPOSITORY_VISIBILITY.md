# 🔐 Repository-Sichtbarkeit: Public vs. Private

## 📋 Übersicht

Diese Dokumentation beschreibt die Auswirkungen einer Umstellung des Repositories von **Public** auf **Private** für Ihr aktuelles Setup.

**Aktueller Status:** Repository ist PUBLIC
**Frage:** Was hat eine Umstellung auf PRIVATE für Folgen?

---

## ✅ Was funktioniert WEITERHIN ohne Änderungen

### 1. **GitHub Pages Hosting** ✨
- ✅ **Custom Domain bleibt funktionsfähig:** `mietpark-saar-pfalz.com`
- ✅ **SSL-Zertifikat bleibt aktiv:** Let's Encrypt automatisch
- ✅ **Website bleibt öffentlich zugänglich:** Alle Besucher können die Website normal aufrufen
- ✅ **Deployment-Workflow funktioniert:** GitHub Actions kann weiterhin auf `gh-pages` Branch deployen

> **Wichtig:** Die WEBSITE bleibt öffentlich, nur der QUELLCODE wird privat!

### 2. **Deployment-Prozess**
- ✅ **GitHub Actions Workflow:** Läuft weiterhin automatisch bei Push zu `main`
- ✅ **Secrets:** Alle hinterlegten Secrets (`VITE_EMAILJS_SERVICE_ID`, etc.) bleiben verfügbar
- ✅ **Peaceiris Actions:** Das `peaceiris/actions-gh-pages@v4` Action funktioniert mit privaten Repos
- ✅ **CNAME-Datei:** Wird weiterhin korrekt in `gh-pages` Branch deployed

### 3. **Entwicklung & Build**
- ✅ **Lokale Entwicklung:** `npm run dev` funktioniert unverändert
- ✅ **Build-Prozesse:** Alle `npm run build` Befehle arbeiten normal
- ✅ **Dependencies:** NPM-Packages werden normal installiert
- ✅ **Vite-Konfiguration:** Keine Änderungen nötig

---

## ⚠️ Was ändert sich bei Private Repository

### 1. **Zugriff auf Quellcode** 🔒

#### Vorher (Public):
- Jeder kann den Code sehen und klonen
- Repository erscheint in GitHub-Suche
- Forks sind möglich

#### Nachher (Private):
- **Nur Sie und eingeladene Collaborators** können Code sehen
- Repository ist nicht in der öffentlichen Suche
- Nur Members können forken (innerhalb der Organisation)
- Besserer Schutz für:
  - 📧 EmailJS Template-IDs (sichtbar im Code)
  - 🔧 Interne Code-Struktur
  - 💡 Business-Logik
  - 🎨 Design-Entscheidungen

### 2. **GitHub Actions Minutes** ⏱️

#### Kostenstruktur:

| Account-Typ | Kostenlose Minutes/Monat | Kosten für zusätzliche Minutes |
|-------------|-------------------------|--------------------------------|
| **Personal Account** | 2.000 Minutes | $0.008/Minute (Linux) |
| **Organisation (Free)** | 2.000 Minutes | Keine zusätzlichen Minutes |
| **GitHub Pro** | 3.000 Minutes | $0.008/Minute |

#### Ihr aktueller Verbrauch:

Basierend auf Ihrem Workflow (`.github/workflows/deploy.yml`):

**Pro Deployment:**
- CI Job: ~5-8 Minuten
- Deploy Job: ~3-5 Minuten
- **Gesamt: ~8-13 Minuten**

**Geschätzte monatliche Deployments:**
- Bei 150 Deployments/Monat: ~1.950 Minuten (innerhalb Free Tier)
- Bei 200 Deployments/Monat: ~2.600 Minuten (600 Minuten = $4.80 Kosten)

> **Empfehlung:** Monitoring aktivieren unter: Settings → Billing → Usage this month

#### Optimierungsmöglichkeiten:
```yaml
# Optional: Nur bei Push zu main deployen (nicht bei PRs)
on:
  push:
    branches: [ main ]
  # pull_request entfernen, wenn nicht nötig
```

### 3. **Badges & README** 📊

#### Diese Badges funktionieren NICHT mehr bei Private Repos:

```markdown
# ❌ Diese sind bei Private Repos nicht sichtbar:
![GitHub Stars](https://img.shields.io/github/stars/...)
![GitHub Forks](https://img.shields.io/github/forks/...)
![GitHub Contributors](https://img.shields.io/github/contributors/...)
![GitHub Last Commit](https://img.shields.io/github/last-commit/...)
```

#### Diese Badges funktionieren WEITERHIN:

```markdown
# ✅ Diese bleiben funktional:
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://mietpark-saar-pfalz.com)
[![React](https://img.shields.io/badge/React-19.2.0-61dafb)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3.0-646cff)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
```

**Ihr README:** Aktuell verwenden Sie nur funktionierende Badges ✅

### 4. **Collaborator Management** 👥

#### Wenn Sie externe Entwickler einladen möchten:

**Zugriffs-Levels:**
- **Read:** Kann Code sehen, Issues erstellen
- **Triage:** Kann Issues/PRs verwalten
- **Write:** Kann Code pushen
- **Maintain:** Kann Settings verwalten (ohne sensible)
- **Admin:** Vollzugriff

**Einladung:** Settings → Collaborators → Add people

### 5. **Sicherheit & Secrets** 🔐

#### Vorteile bei Private:
- ✅ Secrets im Code sind besser geschützt
- ✅ API-Struktur ist nicht öffentlich einsehbar
- ✅ Interne Dokumentation kann vertraulich bleiben

#### Weiterhin zu beachten:
- ⚠️ **Niemals echte API-Keys im Code committen** (auch bei Private!)
- ✅ Weiterhin GitHub Secrets nutzen für:
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`
  - `VITE_IMGBB_API_KEY`
  - `VITE_NEWSLETTER_ENDPOINT`

---

## 🚀 Migrationspfad: Public → Private

### Schritt 1: Vorbereitung
```bash
# 1. Alle Änderungen committen
git status
git add .
git commit -m "chore: prepare for private repository"

# 2. Backup erstellen (optional)
git clone https://github.com/Mietpark-Saar-Pfalz/mietpark-saar-pfalz.git backup-repo
```

### Schritt 2: Repository auf Private umstellen
1. Gehe zu: **Settings** → **General**
2. Scrolle zu: **Danger Zone** → **Change repository visibility**
3. Klicke: **Change visibility** → **Make private**
4. Bestätige mit Repository-Name

### Schritt 3: Überprüfung (sofort nach Umstellung)

#### A) Website-Erreichbarkeit testen
```bash
# Website sollte SOFORT erreichbar sein:
curl -I https://mietpark-saar-pfalz.com
# Erwartete Antwort: HTTP/2 200
```

#### B) GitHub Actions überprüfen
1. Gehe zu: **Actions** Tab
2. Letzter Workflow sollte grün sein ✅
3. Falls fehlgeschlagen: Logs prüfen

#### C) GitHub Pages Status checken
1. Gehe zu: **Settings** → **Pages**
2. Status sollte sein: "Your site is live at https://mietpark-saar-pfalz.com"

### Schritt 4: Lokale Entwicklung testen
```bash
# Code pullen
git pull origin main

# Lokaler Build
npm ci
npm run dev

# Produktions-Build
npm run build:custom
```

### Schritt 5: Deployment testen
```bash
# Test-Commit erstellen
echo "# Test" >> test.md
git add test.md
git commit -m "test: verify deployment after visibility change"
git push origin main

# Workflow überwachen in GitHub Actions
```

### Schritt 6: Actions Minutes Monitoring aktivieren
1. Gehe zu: **Settings** → **Billing and plans**
2. Unter **Actions**: Klick auf **Usage this month**
3. Aktiviere Email-Benachrichtigungen bei 75% Verbrauch

---

## 💰 Kosten-Kalkulation

### Szenario 1: Persönlicher Account (Free)
- ✅ Repository: Kostenlos (unlimitiert private Repos)
- ✅ GitHub Actions: 2.000 Minutes/Monat kostenlos
- ✅ GitHub Pages: Kostenlos
- ⚠️ Zusätzliche Actions Minutes: $0.008/Minute

**Monatliche Kosten bei normalem Betrieb:** $0

### Szenario 2: Bei hoher Deployment-Frequenz
- 300 Deployments/Monat à 10 Minuten = 3.000 Minutes
- Verbrauch: 3.000 - 2.000 (kostenlos) = 1.000 zusätzliche Minutes
- **Kosten: 1.000 × $0.008 = $8/Monat**

### Szenario 3: GitHub Pro ($4/Monat)
- ✅ 3.000 Minutes/Monat
- Bei 300 Deployments = 3.000 Minutes → **Keine Zusatzkosten**
- **Lohnt sich ab:** ~250+ Deployments/Monat

---

## 🎯 Empfehlungen

### ✅ Sprechen FÜR Private Repository:
1. **Besserer Code-Schutz:** API-Struktur und Business-Logik bleiben vertraulich
2. **Professioneller Eindruck:** "Professionelle Firma mit geschütztem Code"
3. **Flexibilität:** Sie kontrollieren, wer Code sehen darf
4. **Minimale Kosten:** Bei normalem Betrieb kostenlos
5. **Website bleibt öffentlich:** Kunden sehen keinen Unterschied

### ⚠️ Sprechen GEGEN Private Repository:
1. **Open Source Community:** Kein Beitrag zur Open-Source-Bewegung
2. **Transparenz:** Potenzielle Entwickler können Code nicht einsehen
3. **Kosten:** Bei sehr hoher Deployment-Frequenz können Kosten entstehen
4. **Komplexität:** Collaborator-Management erforderlich

### 🎯 Empfehlung für Ihr Projekt:

**➡️ Umstellung auf PRIVATE ist empfohlen, weil:**
- Sie sind ein **kommerzielles Projekt** (Mietpark-Business)
- Ihre **API-Keys und Endpoints** sind im Code sichtbar
- Sie möchten **Business-Logik schützen**
- **Kosten sind minimal** bei Ihrem Setup
- **Keine Nachteile** für Ihre Kunden/Besucher
- **Website bleibt vollständig öffentlich**

---

## 🔄 Zurück zu Public (falls nötig)

Falls Sie später wieder auf Public umstellen möchten:

1. **Settings** → **General** → **Danger Zone**
2. **Change visibility** → **Make public**
3. ⚠️ **Achtung:** Stelle sicher, dass keine Secrets im Code-History sind!

**Tipp:** Vor Public-Umstellung sensible Commits aus History entfernen:
```bash
# Alle Secrets aus Git-History entfernen (falls nötig)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env.local" \
  --prune-empty --tag-name-filter cat -- --all
```

---

## 📊 Monitoring nach Umstellung

### Woche 1: Tägliche Checks
- [ ] Website erreichbar: `https://mietpark-saar-pfalz.com`
- [ ] Kontaktformular funktioniert
- [ ] Newsletter-Anmeldung funktioniert
- [ ] GitHub Actions läuft erfolgreich
- [ ] Keine Fehler in Browser Console

### Woche 2-4: Wöchentliche Checks
- [ ] Actions Minutes Verbrauch prüfen
- [ ] Deployment-Logs kontrollieren
- [ ] Performance-Metriken (Lighthouse)

### Monatlich:
- [ ] Actions Minutes Verbrauch analysieren
- [ ] Kosten-Report erstellen
- [ ] Optimierungspotenziale identifizieren

---

## 🆘 Troubleshooting

### Problem: Website nicht erreichbar nach Umstellung
**Lösung:**
1. Settings → Pages → Check Status
2. Falls "Unpublished": Re-run letzter Workflow
3. DNS-Propagation prüfen: `nslookup mietpark-saar-pfalz.com`

### Problem: GitHub Actions schlägt fehl
**Lösung:**
1. Actions Tab → Fehlgeschlagenen Workflow öffnen
2. Logs prüfen auf Permissions-Fehler
3. Workflow Permissions prüfen: Settings → Actions → General → Workflow permissions

### Problem: Secrets funktionieren nicht
**Lösung:**
1. Settings → Secrets and variables → Actions
2. Alle Secrets überprüfen:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_IMGBB_API_KEY`

---

## 📞 Support

Bei Fragen zur Repository-Umstellung:
- **GitHub Docs:** [GitHub Pages with Private Repos](https://docs.github.com/en/pages)
- **GitHub Support:** Bei technischen Problemen
- **Actions Billing:** Settings → Billing and plans

---

## ✅ Zusammenfassung

| Aspekt | Public | Private | Änderung nötig? |
|--------|--------|---------|-----------------|
| **Website-Zugriff** | ✅ Öffentlich | ✅ Öffentlich | ❌ Nein |
| **Code-Zugriff** | ✅ Jeder | 🔒 Nur Members | - |
| **GitHub Actions** | ✅ Unbegrenzt (Public) | ⏱️ 2.000 Min/Monat | 📊 Monitoring |
| **GitHub Pages** | ✅ Kostenlos | ✅ Kostenlos | ❌ Nein |
| **Custom Domain** | ✅ Funktioniert | ✅ Funktioniert | ❌ Nein |
| **SSL-Zertifikat** | ✅ Aktiv | ✅ Aktiv | ❌ Nein |
| **Deployment-Workflow** | ✅ Funktioniert | ✅ Funktioniert | ❌ Nein |
| **Secrets** | ✅ Verfügbar | ✅ Verfügbar | ❌ Nein |
| **Monatliche Kosten** | $0 | $0 - $8 | 💰 Minimal |

**Fazit:** Die Umstellung auf Private hat **keine negativen Auswirkungen** auf Ihr Setup und ist für ein kommerzielles Projekt **empfehlenswert**. Die Website bleibt vollständig öffentlich, nur der Quellcode wird geschützt.

---

**Letzte Aktualisierung:** 2025-12-26  
**Version:** 1.0
