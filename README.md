# Mietpark Saar-Pfalz 🌲❄️

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://mietpark-saar-pfalz.com)
[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-blue)](https://mietpark-saar-pfalz.github.io/mietpark-saar-pfalz/)
[![React](https://img.shields.io/badge/React-19.2.0-61dafb)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3.0-646cff)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**Professionelle Vermietungsplattform für Dachboxen, Fahrradträger und Wintersport-Ausrüstung**

Mietpark Saar-Pfalz ist Ihre zuverlässige Anlaufstelle für die Miete von Transportlösungen in Homburg und Umgebung. Von Dachboxen für den Winterurlaub bis hin zu Fahrradträgern für den nächsten Ausflug - wir bieten flexible, hochwertige Lösungen für alle Transportbedürfnisse.

## ✨ Features

### 🏔️ Kernfunktionalitäten
- **Produktkatalog** - 7 verschiedene Mietprodukte mit detaillierten Spezifikationen
- **Online-Buchungssystem** - Einfache Anfrage über integriertes Kontaktformular
- **Blog & Ratgeber** - 6 Fachartikel zu Wintersport und Transportthemen
- **Responsive Design** - Optimierte Darstellung auf allen Geräten
- **Mehrsprachige SEO** - Vollständige Suchmaschinenoptimierung
- **Persönliche Hilfe vor Ort** - Betreiber Daniel Brußig beantwortet jede Anfrage direkt, inklusive Telefon/Email + Avatar-Callout auf allen Produktseiten
- **Newsletter CTA überall** - Einheitliche NewsletterSection inklusive Double-Opt-In-Flow auf Start-, Blog- und Produktdetailseiten
- **Interaktive Preistafeln & Preisrechner** - Jede Produktseite verfügt über eine Preistabelle sowie einen dynamischen Rechner, der Mietzeitraum, Saisonaufschläge und Dachträger-Optionen sofort berücksichtigt
- **Webmaster/Creator CTA** - Am Ende der Startseite ist ein hervorgehobener Hinweis für Website-Projekte in Homburg/Saar integriert (Serverraum247)

### 🎨 Benutzeroberfläche
- **Moderne UI/UX** - Clean Design mit natürlichen Farben (Waldgrün)
- **Animierte Übergänge** - Smooth Animations mit React Spring
- **Winterliches Video** - Atmosphärischer Hintergrund mit Schneefall-Effekt
- **Dark Mode Ready** - Barrierefreie Farbpalette
- **Touch-Optimiert** - Mobile-first Ansatz

### 🔍 SEO & Performance
- **Hybrid SSG/SEO** - Beste Kombination aus SPA-Performance und Suchmaschinenoptimierung
- **Structured Data** - Rich Snippets für Google (LocalBusiness, Product Schema)
- **Open Graph & Twitter Cards** - Optimale Social Media Darstellung
- **Sitemap & Robots.txt** - Vollständige Crawling-Unterstützung inkl. Newsletter-Bestätigungsseite
- **RSS Feed** - RSS 2.0 Feed unter `/feed/index.xml` (z. B. für News/Angebote)
- **Core Web Vitals** - Lighthouse Score > 90 in allen Kategorien

### 🚀 Technische Features
- **SPA mit Fallback** - Client-side Routing mit 404.html Fallback für direkte URLs
- **Legacy-URL Handling** - z. B. `/partybox` wird auf die Startseite geleitet (client-seitig via Router)
- **Progressive Enhancement** - Funktioniert auch ohne JavaScript
- **Offline-Capable** - Service Worker bereit für PWA-Features
- **Accessibility** - WCAG 2.1 AA konform
- **Performance-optimiert** - Lazy Loading, Code Splitting, Asset Optimization

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Moderne UI-Bibliothek mit Concurrent Features
- **Vite 7.3.0** - Blitzschneller Build-Tool und Dev-Server
- **React Router 7.11.0** - Client-side Routing mit History API
- **React Spring 10.0.3** - Performante Animationen
- **React Helmet Async** - Professionelles Head Management und SEO

### Entwicklung & Build
- **ESLint** - Code-Qualität und Konsistenz
- **Commit Hooks** - Husky + Commitlint (Conventional Commits) zur Sicherung konsistenter Commit Messages
- **Vite Plugins** - Optimierte Asset-Verarbeitung
- **CSS Custom Properties** - Moderne Styling-Architektur
- **PostCSS** - CSS-Processing und Autoprefixing

### Deployment & Hosting
- **GitHub Pages** - Kostenloses Hosting mit Custom Domain
- **GitHub Actions** - Automatisierte CI/CD Pipeline
- **gh-pages CLI** - Einfache Deployment-Automatisierung

### SEO & Analytics
- **Schema.org** - Strukturierte Daten für Suchmaschinen
- **Open Graph Protocol** - Social Media Optimierung
- **Google Analytics ready** - Tracking-Infrastruktur vorbereitet
- **Sitemap.xml** - Vollständige URL-Indexierung

## 🚀 Schnellstart

### Voraussetzungen
- **Node.js** 18.0.0 oder höher
- **npm** oder **yarn**
- **Git** für Versionskontrolle

### Installation

1. **Repository klonen:**
   ```bash
   git clone https://github.com/Mietpark-Saar-Pfalz/mietpark-saar-pfalz.git
   cd mietpark-saar-pfalz
   ```

2. **Dependencies installieren:**
   ```bash
   npm install
   ```

3. **Entwicklungsserver starten:**
   ```bash
   npm run dev
   ```

4. **Browser öffnen:**
   ```
   http://localhost:5173
   ```

### Build für Produktion

```bash
# Entwicklung
npm run dev

# Produktions-Build testen
npm run build
npm run preview

# Deployment
npm run deploy
```

## 🔐 Environment Variables

Damit das Anfrageformular sicher funktioniert, benötigt die App eigene API-Keys für EmailJS und ImgBB. Für die Newsletter-Anmeldung wird zusätzlich der Cloudflare-Worker-Endpunkt hinterlegt.

1. Datei [.env.example](.env.example) kopieren und als `.env.local` speichern.
2. Eigene Werte für `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_IMGBB_API_KEY` **und** `VITE_NEWSLETTER_ENDPOINT` (URL des Cloudflare-Workers) eintragen.
3. `.env.local` nicht committen – Vite liest die Variablen automatisch über `import.meta.env`.

### GitHub Actions

- In den Repository-Secrets die gleichen Variablennamen hinterlegen (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_IMGBB_API_KEY`, `VITE_NEWSLETTER_ENDPOINT`).
- Der Workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml) exportiert diese Secrets während des Builds, sodass die statische Seite mit den richtigen Werten generiert wird.
- Änderungen an den Keys erfordern einen neuen Build, damit die Werte in der ausgelieferten App landen.

## 🌍 SEO & Cloudflare Optimierungen

### Sitemap & RSS Feed
- **Sitemap**: `/sitemap.xml` enthält alle wichtigen URLs für Suchmaschinen (Startseite, Produkte, Blog, Impressum, Datenschutz, AGB, Widerruf, Newsletter-Bestätigung).
- **RSS Feed**: Neuer RSS 2.0 Feed unter `/feed/index.xml` mit konfigurierbarem `source`-Attribut für Tracking.
- **Cloudflare Redirects**: 
  - `/feed/` und `/feed` werden serverseitig (301) auf `/feed/index.xml` weitergeleitet (Cloudflare Rule).
  - `http://` wird auf `https://` weitergeleitet (Always Use HTTPS).
  - `www.` wird auf Apex-Domain weitergeleitet (Redirect Rule).

### Rechtliche Seiten & Compliance
- **Impressum, AGB, Datenschutzerklärung**: Sind ausschließlich im Footer platziert (dezent, keine Button-Hervorhebung).
- **2-Click-Erreichbarkeit**: Von jeder Seite mit maximal 2 Klicks erreichbar (Seite → Footer → Link).
- **Kein verstecktes Menü**: Alle Links sind sichtbar, keine Akkordeons oder Load-More-Mechanismen.
- **noindex & noimageai Meta-Tags**: Legal-Seiten erhalten `<meta name="robots" content="noindex, nofollow">` und `<meta name="robots" content="noai, noimageai">`, um sie vor Suchmaschinen und KI-Training-Crawler zu schützen.

## 📬 Newsletter-Setup (Cloudflare Worker + Brevo)

Der Newsletter wird über ein serverloses Setup mit Cloudflare Workers und Brevo (Sendinblue) realisiert. So bleiben API-Keys geheim, Double-Opt-In ist rechtssicher nachweisbar und die Frontend-App bleibt komplett statisch. Das Frontend sendet je nach Einsatzort (`home`, `article`, `product_detail`) einen `source`-Wert mit, damit der Worker jede Anmeldung sauber einsortieren und auswerten kann.

### 1. Templates & Branding
- Double-Opt-In- und Willkommens-Templates werden lokal unter `docs/newsletter-templates/` abgelegt. Die Ordnereinträge `*.html`, `*.htm` **und** `*.txt` sind via `.gitignore` ausgeschlossen und können gefahrlos angepasst werden.
- Detaillierte Brand- und Copy-Guidelines für beide Templates findest du in [`docs/newsletter-templates/templates.md`](docs/newsletter-templates/templates.md). Hier dokumentierst du auch neue Versionen, während die eigentlichen HTML-/TXT-Dateien lokal bleiben.
- Die finalen HTML-Dateien werden in Brevo als Templates hochgeladen. Notiere die Template-IDs, z. B. `BREVO_DOI_TEMPLATE_ID` und optional `BREVO_WELCOME_TEMPLATE_ID`.
- Brevo leitet nach erfolgreichem Klick auf die neue Bestätigungsseite unter [`/newsletter/confirm`](https://mietpark-saar-pfalz.com/newsletter/confirm) weiter. Setze dazu `BREVO_REDIRECT_URL=https://mietpark-saar-pfalz.com/newsletter/confirm` in deinen Worker-Secrets.

### 2. Cloudflare Worker konfigurieren
- Basiscode liegt unter [`workers/newsletter`](workers/newsletter). Er validiert E-Mail-Adressen, erzwingt die Einwilligung und ruft die Brevo Double-Opt-In-API auf.
- Lokales Testing: `cd workers/newsletter && wrangler dev`. Secrets liegen in `.dev.vars` (siehe `.gitignore`). Beispiel:
   ```bash
   echo "BREVO_API_KEY=xxx" >> .dev.vars
   echo "BREVO_LIST_ID=12" >> .dev.vars
   echo "BREVO_DOI_TEMPLATE_ID=34" >> .dev.vars
   echo "ALLOWED_ORIGINS=https://mietpark-saar-pfalz.com,https://www.mietpark-saar-pfalz.com,http://localhost:5173" >> .dev.vars
   ```
- Production-Secrets setzen: `wrangler secret put BREVO_API_KEY` (analog für `BREVO_LIST_ID`, `BREVO_DOI_TEMPLATE_ID`, optional `BREVO_REDIRECT_URL`).
- Deployment: `wrangler publish`. Die Workers.dev-URL oder eine eigene Route dient anschließend als `VITE_NEWSLETTER_ENDPOINT`.

### 3. Rechte & Datenschutz
- Der Worker speichert keine Daten, sondern reicht sie an Brevo weiter. Wir protokollieren nur aggregierte Metriken.
- Double-Opt-In-Mails dürfen ausschließlich den Bestätigungszweck enthalten; die Willkommensmail startet erst nach erfolgreicher Bestätigung.
- Die Datenschutzerklärung enthält einen Abschnitt zu Cloudflare Worker, Brevo und Widerrufsrecht (siehe `src/pages/Datenschutz.jsx`).

### 4. Governance & Secrets
- Newsletter-relevante Secrets niemals im Code speichern. Rotation spätestens alle 90 Tage.
- Zugriff auf Cloudflare & Brevo dokumentieren (wer pflegt Keys, Templates, DNS für DKIM/SPF/DMARC).
- Domain-Authentifizierung in Brevo abschließen, damit DOI- und Newsletter-Mails zuverlässig zugestellt werden.

## 📁 Projektstruktur

```
mietpark-saar-pfalz/
├── public/                 # Statische Assets
│   ├── images/            # Produkt- und UI-Bilder
│   ├── video/             # Hintergrundvideos
│   ├── 404.html           # SPA Fallback
│   ├── sitemap.xml        # SEO Sitemap
│   ├── robots.txt         # Crawling-Anweisungen
│   └── CNAME              # Custom Domain
├── src/
│   ├── components/        # Wiederverwendbare Komponenten
│   │   ├── Header.jsx     # Navigation & Logo
│   │   ├── Footer.jsx     # Footer mit Links
│   │   ├── ProductCard.jsx # Produkt-Vorschau
│   │   ├── ProductGallery.jsx # Bildergalerie
│   │   ├── PriceTable.jsx   # Strukturierte Preistafeln je Produkt
│   │   ├── PriceCalculator.jsx # Dynamischer Mietpreis-Rechner inkl. Saisonlogik
│   │   ├── NewsletterSection.jsx # Einheitliche Newsletter-CTA inkl. Formular-Logik
│   │   ├── SEOHead.jsx    # SEO Meta-Tags
│   │   └── ScrollToTop.jsx # UX Verbesserung
│   ├── pages/             # Seiten-Komponenten
│   │   ├── Home.jsx       # Startseite mit Hero
│   │   ├── ProductDetail.jsx # Produkt-Details
│   │   ├── Blog.jsx       # Blog-Übersicht
│   │   ├── BlogDetail.jsx # Einzelne Blog-Artikel
│   │   ├── Impressum.jsx  # Rechtliches
│   │   ├── Agb.jsx        # AGB
│   │   └── Datenschutz.jsx # Datenschutz
│   ├── data/              # Statische Daten
│   │   └── products.js    # Produkt-Katalog
│   ├── index.css          # Globale Styles
│   └── main.jsx           # App Entry Point
├── docs/                  # Dokumentation
│   ├── CHANGELOG.md       # Versionshistorie
│   ├── COMMIT_CONVENTIONS.md # Commit-Standards
│   ├── CONTRIBUTING.md    # Entwicklungsanleitung
│   └── newsletter-templates/ # Lokale HTML-Referenzen (gitignored für *.html)
├── workers/
│   └── newsletter/
│       ├── src/index.js   # Cloudflare Worker Logik
│       └── wrangler.toml  # Worker-Konfiguration
├── REPOSITORY_VISIBILITY.md # Guide: Public → Private Umstellung
└── package.json          # Dependencies & Scripts
```

## 🎨 Design System

### Farbpalette
```css
--primary: #1a4d2e;      /* Waldgrün - Hauptfarbe */
--primary-light: #4f772d;  /* Heller Grün */
--accent: #90a955;       /* Frisches Grün */
--text-main: #132a13;    /* Dunkler Text */
--text-muted: #576b5b;   /* Grauer Text */
--bg-white: #ffffff;     /* Weißer Hintergrund */
--bg-light: #ecf3e6;     /* Heller Hintergrund */
```

### Typografie
- **Font Family:** Inter (Google Fonts)
- **Hauptfarbe:** `--primary` für Headings
- **Textfarbe:** `--text-main` für Fließtext
- **Akzentfarbe:** `--accent` für CTAs

### Komponenten
- **Cards:** Schatten und abgerundete Ecken
- **Buttons:** Konsistente Padding und Hover-Effekte
- **Forms:** Validierung und UX-Feedback
- **Navigation:** Responsive mit Mobile-Menü

## 🌐 SEO & Performance

### Suchmaschinenoptimierung
- **Meta Tags:** Vollständige Title, Description, Keywords
- **Canonical URLs:** Vermeidung von Duplicate Content
- **Structured Data:** LocalBusiness & Product Schema
- **Sitemap:** Automatische Generierung aller URLs
- **Robots.txt:** Crawling-Optimierung

### Creator/Credits (Footer + Structured Data)

- **Footer Credit (global):** `src/components/Footer.jsx` enthält im unteren Bereich einen Hinweis "Website by Serverraum247" inkl. Mail-Link (`webmaster@serverraum247.dev`).
- **Webmaster-Section (Startseite):** `src/pages/Home.jsx` enthält am Ende der Seite eine hervorgehobene CTA-Box (Section-ID: `webmaster`).
- **Globales JSON-LD (Trust/SEO):** `src/components/SEOHead.jsx` rendert zusätzlich zu page-spezifischem Schema immer ein kleines JSON-LD Snippet (Schema.org `Person`) für "Serverraum247".

Hinweis: Die Startseite verwaltet zusätzlich ein eigenes LocalBusiness-Schema per Script-ID `local-business-schema` (in `Home.jsx`). Dadurch werden andere JSON-LD Scripts (z. B. das globale Creator-Snippet aus `SEOHead.jsx`) nicht mehr entfernt.

### Performance-Metriken
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **Bundle Size:** ~407 KB (gzipped: 127 KB)
- **Lighthouse Score:** > 90 in allen Kategorien

### Monitoring
- **Core Web Vitals:** Kontinuierliche Überwachung
- **Error Boundaries:** Client-side Error Handling
- **Performance Budgets:** Automatische Checks

## 🚀 Deployment

### GitHub Pages Setup

1. **Repository für GitHub Pages aktivieren:**
   - Settings → Pages → Source: "Deploy from a branch"
   - Branch: `gh-pages` → Save

2. **Custom Domain konfigurieren:**
   - Settings → Pages → Custom domain: `mietpark-saar-pfalz.com`
   - DNS bei Provider: CNAME Record → `mietpark-saar-pfalz.github.io`

3. **SSL-Zertifikat:**
   - Automatisch über Let's Encrypt
   - "Enforce HTTPS" aktivieren

### Lokales Deployment

```bash
# Build testen
npm run build:custom

# Deployment ausführen
npm run deploy

# Status prüfen
git log --oneline origin/gh-pages
```

### Automatisches Deployment (GitHub Actions)

- Workflow: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
- Triggert bei jedem Push/PR auf `main`
- Schritte: `npm ci` → `npm run lint` → `npm test` → `npm run build` (+ `npm run build:custom` Test)
- Deployment via `peaceiris/actions-gh-pages@v3` nach `gh-pages` inkl. CNAME `mietpark-saar-pfalz.com`
- Statusausgabe im Job verrät Live-URL & Build-Größe

## 📊 Analytics & Monitoring

### Verfügbare Metriken
- **Page Views** - Besucherzahlen
- **Conversion Rates** - Anfrage-Formular
- **User Journey** - Navigation-Analyse
- **Performance** - Ladezeiten und Core Web Vitals
- **SEO Rankings** - Suchmaschinen-Positionen

### Integration bereit für
- **Google Analytics 4**
- **Google Search Console**
- **Microsoft Clarity** (Session Recordings)
- **Hotjar** (Heatmaps & Feedback)

## 🧪 Testing

### Browser-Support
- ✅ Chrome 88+ (Desktop & Mobile)
- ✅ Firefox 85+
- ✅ Safari 14+ (Desktop & iOS)
- ✅ Edge 88+

### Geräte-Kompatibilität
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (320px - 767px)
- ✅ Retina Displays

### Accessibility
- ✅ WCAG 2.1 AA konform
- ✅ Keyboard Navigation
- ✅ Screen Reader Support
- ✅ Color Contrast Ratios
- ✅ Reduced Motion Support

## 🤝 Contributing

Wir freuen uns über Beiträge! Bitte lesen Sie unsere [Contributing Guidelines](CONTRIBUTING.md).

### Quick Start für Contributors
1. Fork das Repository
2. Feature-Branch erstellen: `git checkout -b feature/neue-funktion`
3. Änderungen committen: `git commit -m "feat: beschreibung"`
4. Pull Request erstellen

### Commit-Konventionen
Wir verwenden [Conventional Commits](COMMIT_CONVENTIONS.md):
- `feat:` - Neue Features
- `fix:` - Bugfixes
- `docs:` - Dokumentation
- `style:` - Code-Formatierung
- `refactor:` - Code-Refactoring

## 🔐 Repository-Sichtbarkeit

**Wichtige Information:** Wenn Sie planen, dieses Repository von Public auf Private umzustellen, lesen Sie bitte die detaillierte Dokumentation [REPOSITORY_VISIBILITY.md](REPOSITORY_VISIBILITY.md). Dort finden Sie:
- ✅ Was weiterhin funktioniert (GitHub Pages, Deployment, etc.)
- ⚠️ Was sich ändert (Code-Zugriff, GitHub Actions Minutes)
- 💰 Kosten-Kalkulation und Monitoring
- 🚀 Schritt-für-Schritt Migrationspfad
- 🆘 Troubleshooting und Support

**Kurz:** Die Website bleibt öffentlich, nur der Quellcode wird geschützt. Deployment und Hosting funktionieren ohne Änderungen.

## 📝 Changelog

Alle wichtigen Änderungen werden in der [CHANGELOG.md](CHANGELOG.md) dokumentiert.

### Aktuelle Version: 1.0.7
- ✅ **SEO Complete**: `react-helmet-async` Integration mit Open Graph und JSON-LD Product Schema
- ✅ **Privacy Ready**: Neue Datenschutzerklärung und DSGVO-Compliance
- ✅ **UI Polish**: Verbesserte Formular-Validierung und Header-Designs
- ✅ PWA-Unterstützung plus verbesserte Mobile-Experience
- ✅ SEO-Optimierung und Performance
- ✅ GitHub Pages Deployment
- ✅ Custom Domain Integration

## 📞 Support & Kontakt

**Mietpark Saar-Pfalz**
- **Telefon:** +49 173 761 5995
- **Email:** kontakt@mietpark-saar-pfalz.com
- **Website:** [mietpark-saar-pfalz.com](https://mietpark-saar-pfalz.com)
- Persönlich erreichbar: Unsere Homepage zeigt Daniel Brußig mit Avatar in der Hilfe-Sektion, damit jede Frage direkt an den Betreiber geht.

### Technischer Support
- **Issues:** [GitHub Issues](https://github.com/Mietpark-Saar-Pfalz/mietpark-saar-pfalz/issues)
- **Email:** dbrussig@gmail.com

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die [LICENSE](LICENSE) Datei für Details.

## 🙏 Credits

- **Entwicklung:** Daniel Brüssig
- **Design:** Responsive Webdesign Prinzipien
- **Icons:** Custom SVG Icons
- **Bilder:** Hochwertige Produkt-Fotografie
- **Hosting:** GitHub Pages (kostenlos)

---

**⭐ Wenn Ihnen dieses Projekt gefällt, geben Sie uns einen Stern auf GitHub!**

Erstellt mit ❤️ für Wintersport-Begeisterte in der Region Saar-Pfalz.