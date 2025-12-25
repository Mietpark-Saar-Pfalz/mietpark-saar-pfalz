## [1.0.7] - 2025-12-25

### ✨ Added - Neue Features

- **SEO-Overhaul**: Integration von `react-helmet-async` für professionelles Meta-Tag-Management.
  - Dynamische Titel und Beschreibungen für alle Seiten.
  - **Open Graph Tags**: Optimierte Darstellung beim Teilen auf Social Media (Facebook, WhatsApp, LinkedIn).
  - **Structured Data (JSON-LD)**: Produktseiten enthalten jetzt detaillierte Schema.org-Daten (Preis, Verfügbarkeit, Bilder) für Rich Snippets in Google.
- **Datenschutzerklärung**: Vollständige, DSGVO-konforme Datenschutzseite unter `/datenschutz` implementiert.

### 🔧 Changed - Verbesserungen

- **UI/UX Optimierungen**:
  - **Header**: "Buchung" Button entfernt, Navigation auf Startseite/Vermietung/Kontakt fokussiert.
  - **Produkt-Header**: Modernes Gradient-Design mit Glassmorphism-Effekten auf Detailseiten.
  - **Formular**: Visuelles Feedback (rote Hintergründe) bei Validierungsfehlern für bessere User Guidance.
  - **Bezahloptionen**: "oder per Rechnung" aus dem Footer entfernt (nur Bar/PayPal/EC vor Ort).
  - **Produkt-Infos**: HSN/TSN Labels präzisiert ("Herstellernummer", "Typenschlüsselnummer") und Maße/Zubehör für Hüpfburg/Dachträger aktualisiert.

## [1.0.6] - 2025-12-25

### ✨ Added - Neue Features

- **Preistafeln pro Produkt**: Jede Produktseite zeigt jetzt eine strukturierte Preistafel mit Staffelpreisen, Dachträger-Option und Saisonhinweis.
- **Dynamischer Preisrechner**: Kunden können Mietzeitraum, Saison und Dachträger-Bedarf eingeben und erhalten sofort einen transparenten Preis inkl. Aufschlüsselung.

### 🔧 Changed - Verbesserungen

- **Produktdaten**: `src/data/products.js` enthält detaillierte Preis- und Saisonkonfigurationen für Dachboxen, Heckbox, Fahrradträger, Hüpfburg und Dachträger.
- **Produktdetailseite**: Neue Komponenten `PriceTable` und `PriceCalculator` wurden integriert, inkl. Tooltip, Saison-Infobox sowie Übergabe der berechneten Preise an das Anfrageformular.
- **Stylesheet**: Globale Styles in `index.css` um Karten-, Tabellen- und Button-Designs für Preistafel und Rechner erweitert.

### 🧹 Documentation

- README listet die neuen Pricing-Features sowie die zusätzlichen Komponenten in der Projektstruktur.

## [1.0.5] - 2025-12-24

### ✨ Added - Neue Features

- **NewsletterSection**: Neue wiederverwendbare React-Komponente, die auf Start-, Blog- und Produktdetailseiten identische Texte, Formularlogik und Double-Opt-In-Hinweise ausspielt.

### 🔧 Changed - Verbesserungen

- **Frontend-Tracking**: `NewsletterSection` akzeptiert nun einen `source`-Prop, sodass der Worker jede Anmeldung eindeutig (home/article/product_detail) zuordnen kann.
- **E-Mail-Validierung**: Regex im Frontend und im Worker wieder synchronisiert – TLD ist erneut Pflicht, wodurch `user@domain` ohne Suffix abgelehnt wird.
- **Rate-Limit**: Worker führt das Request-Limit wieder vor der Payload-Verarbeitung aus und bereinigt die Submission-Map ohne unnötiges Löschen.

### 🧹 Documentation

- README ergänzt um den neuen Newsletter-CTA, die Komponentenstruktur sowie einen Hinweis auf die `source`-Prop.

## [1.0.4] - 2025-12-24

### ✨ Added - Neue Features

- **Template-Dokumentation**: Neues Markdown-Dokument `docs/newsletter-templates/templates.md` beschreibt Betreffzeilen, Copy-Guidelines und HTML-Snippets für Double-Opt-In- sowie Willkommens-Mail.

### 🔧 Changed - Verbesserungen

- **README**: Newsletter-Anleitung verweist jetzt auf das neue Templates-Dokument und stellt klar, dass auch `.txt`-Exporte lokal gitignored bleiben.
- **Sitemap**: `newsletter/confirm` ist nun aufgeführt und alle `lastmod`-Zeitstempel wurden auf den aktuellen Stand gebracht.
- **.gitignore**: Zusätzlich zu HTML-Dateien werden nun auch `.txt`-Exporte im Ordner `docs/newsletter-templates/` ignoriert, damit Brevo-Backups lokal bleiben.

# Changelog

Alle wichtigen Änderungen an der Mietpark Saar-Pfalz Website werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
und dieses Projekt hält sich an [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2025-12-24

### ✨ Added - Neue Features

- **Newsletter-Architektur**: Cloudflare-Worker + Brevo Double-Opt-In inklusive neuer Newsletter-Sektion auf der Startseite mit validiertem Formular, Consent-Checkbox und Nutzerfeedback.
- **Worker-Code & Doku**: Eigenes Worker-Verzeichnis (`workers/newsletter`) plus README-Erweiterungen für Secrets, Wrangler-Setup und lokale Template-Ablage.
- **Confirm Page**: Neue Seite `/newsletter/confirm` dient als professionelle Landingpage für Brevo-Weiterleitungen nach dem Double-Opt-In.

### 🔧 Changed - Verbesserungen

- **Datenschutz**: Neuer Abschnitt erläutert Double-Opt-In, Cloudflare Worker sowie Brevo als Auftragsverarbeiter.
- **.env & .gitignore**: Neuer `VITE_NEWSLETTER_ENDPOINT`, lokale `.dev.vars` und HTML-Templates werden automatisch ignoriert.
- **README**: Ausführliche Anleitung zur rechtssicheren Newsletter-Inbetriebnahme inkl. Templateverwaltung und Deployment-Checkliste.

## [1.0.2] - 2025-12-23

### ✨ Added - Neue Features

- **Persönlicher Support**: Avatar-basierter Hilfebereich auf allen Produktseiten mit direkten E-Mail- und Telefon-CTAs, damit Besucher sofort wissen, dass sie Daniel Brußig erreichen können.

### 🔧 Changed - Verbesserungen

- **Regional Storytelling**: Hero-Subtitles und Structured Data kommunizieren jetzt klar „Ihr verlässlicher Partner im Saarland, Homburg und Umgebung seit 2023“ inklusive Hinweis auf Ski- und Snowboard-Transport.
- **Navigation**: Mobile Hamburger-Menü und Desktop-Navigation zeigen aktuell Impressum, AGB und Datenschutz; alle Links wurden für bessere Orientierung ergänzt.

## [1.0.1] - 2025-12-22

### ✨ Added - Neue Features

- **PWA-Unterstützung**: manifest.json für Progressive Web App Funktionalität
  - App-Installation auf Mobilgeräten möglich
  - Offline-Fähigkeiten und bessere Performance
  - Native App-ähnliche Erfahrung

### 🔧 Changed - Verbesserungen

- **Performance-Optimierung**: Alle Bilder neu hochgeladen nach Metadaten-Entfernung
  - Reduzierte Dateigrößen bei gleichbleibender Qualität
  - Schnellere Ladezeiten und bessere Performance
  - 67 Bilddateien optimiert (Produkte, Hero-Bilder, Logos)
  - Video-Dateien neu hochgeladen

- **Mobile Responsivität**: Umfassende Optimierung für mobile Geräte
  - Mobile Navigation mit absolut positioniertem Hamburger-Menü
  - Produkte-Grid von 320px auf 280px minimale Breite reduziert
  - Benefits-Grid von 300px auf 250px minimale Breite reduziert
  - Optimierte Hero-Sektion, Karten und Footer für kleine Bildschirme
  - Verbesserte Touch-Ziele und Barrierefreiheit (aria-labels)
  - Bessere mobile Container-Abstände und Layouts
  - Neue Hero-Typografie-Klassen für konsistente Breakpoints
  - Horizontale Produktkarten stapeln auf Mobilgeräten automatisch
  - Apple-Touch-Icon & iOS-spezifische Backdrop-Filter für sauberere Darstellung

- **Mobile Menu**: Verbesserte Benutzerfreundlichkeit
  - Sichtbares und zugängliches Hamburger-Menü-Icon
  - Verbesserte Animation und Backdrop-Effekte
  - Accessibility-Verbesserungen mit aria-expanded Attributen

## [1.0.0] - 2025-12-22

### ✨ Added - Neue Features

- **Initial Release**: Vollständige Mietpark Saar-Pfalz Website
  - Responsive React-Anwendung mit Vite
  - Produktkatalog mit Dachboxen, Heckboxen, Fahrradträgern und Hüpfburgen
  - Blog-System mit Artikeln über Wintersport-Ausrüstung
  - Mehrsprachige SEO-Optimierung (Deutsch)
  - Winterliches Video-Hintergrunddesign
  - Cookie-Banner mit DSGVO-Konformität
  - WhatsApp Business Integration
  - Google Maps Standort-Integration

- **Produktverwaltung**:
  - 7 verschiedene Mietprodukte mit detaillierten Spezifikationen
  - Preisstaffelung und Verfügbarkeitskalender
  - Hochwertige Produktbilder und Galerien
  - Automatische saisonale Preisänderungen

- **Content Management**:
  - 6 Blog-Artikel zu Wintersport-Themen
  - FAQ-Bereich mit häufig gestellten Fragen
  - Newsletter-Anmeldung mit Mailchimp-Integration
  - Kundenbewertungen und Social Proof

### 🔧 Changed - Geänderte Features

- **Deployment-Migration**: Von GitHub Actions zu gh-pages npm package
  - Vereinfachte Deployment-Pipeline
  - Schnellere Build-Zeiten
  - Bessere lokale Entwicklung

- **Routing-Optimierung**: Single Page Application für GitHub Pages
  - 404.html Fallback für direkte URL-Zugriffe
  - Client-side Routing ohne Page Reloads
  - SEO-freundliche URL-Struktur

- **Domain-Migration**: Custom Domain Setup
  - Migration von github.io Subdomain zu mietpark-saar-pfalz.com
  - HTTPS-Zertifikat Konfiguration
  - DNS CNAME Record Setup

### 🐛 Fixed - Fehlerbehebungen

- **SPA Routing 404 Fix**: Direkte URLs funktionieren jetzt korrekt
  - Problem: GitHub Pages zeigte 404 für /product/1, /blog URLs
  - Lösung: 404.html mit URL-Redirect und .nojekyll Datei
  - Ergebnis: Alle Unterseiten sind direkt aufrufbar

- **Bild-Pfad Korrekturen**: Alle Assets laden korrekt
  - Problem: Bilder funktionierten nicht mit Custom Domain
  - Lösung: Absolute Pfade von Domain-Root (/images/...)
  - Ergebnis: Alle Bilder, Videos und Assets funktionieren

- **Video-Background**: Winterliches Hintergrundvideo
  - Problem: Autoplay-Blockierung in Browsern
  - Lösung: Fallback-Poster-Bild und Play-Button
  - Ergebnis: Performance-optimiertes Video mit Accessibility

### 🚀 Deployment - Veröffentlichungen

- **GitHub Pages Setup**: Vollständige Automatisierung
  - Source: gh-pages Branch
  - Custom Domain: mietpark-saar-pfalz.com
  - SSL: Automatisches Let's Encrypt Zertifikat
  - Build: Automatische Vite-Optimierung

- **Hybrid SSG/SEO Lösung**: Serverseitiges Rendering für Suchmaschinen
  - SEOHead Komponente für dynamische Meta-Tags
  - Sitemap.xml für alle URLs
  - Robots.txt für Crawling-Optimierung
  - Structured Data für Rich Snippets
  - Open Graph und Twitter Cards
  - SPA Fallback für direkte URL-Zugriffe

### 📱 Performance - Leistungsoptimierungen

- **Asset-Optimierung**: Minimierte Bundle-Größen
  - CSS: 11.81 kB (gzip: 2.97 kB)
  - JavaScript: 406.87 kB (gzip: 126.51 kB)
  - Bilder: WebP-Konvertierung vorbereitet
  - Lazy Loading für alle Medien

- **SEO-Optimierung**: Suchmaschinen-Optimierung
  - Structured Data (JSON-LD) für Local Business
  - Meta-Tags für alle Seiten
  - Open Graph Tags für Social Media
  - Sitemap-Struktur für Crawler

### 🔒 Security - Sicherheit

- **HTTPS Enforcement**: SSL-Zertifikat für alle Verbindungen
- **Content Security Policy**: Grundlegende CSP-Header
- **Cookie-Management**: DSGVO-konforme Cookie-Einwilligung
- **Secure Headers**: XSS-Schutz und Sicherheits-Header

### 📊 Analytics - Analyse

- **Performance Monitoring**: Lighthouse Scores > 90
- **User Experience**: Core Web Vitals optimiert
- **Error Tracking**: Client-side Error Boundaries
- **Conversion Tracking**: Anfrage-Formular Analytics

---

## Entwicklungshinweise

### Lokale Entwicklung
```bash
npm install
npm run dev          # Entwicklungsserver
npm run build        # Produktionsbuild
npm run build:custom # Custom Domain Test-Build
npm run deploy       # GitHub Pages Deployment
```

### Verzeichnisstruktur
```
├── public/           # Statische Assets
│   ├── images/       # Produkt- und Content-Bilder
│   ├── video/        # Hintergrundvideos
│   ├── 404.html      # SPA Fallback
│   └── .nojekyll     # Jekyll-Deaktivierung
├── src/
│   ├── components/   # Wiederverwendbare Komponenten
│   ├── pages/        # Seiten-Komponenten
│   ├── data/         # Produktdaten
│   └── styles/       # CSS-Stile
└── dist/            # Build-Output (automatisch)
```

### Browser-Support
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile Browser Support

---

## Zukünftige Features (Roadmap)

### Geplant für v1.1.0
- [ ] Admin-Panel für Content-Management
- [ ] Mehrsprachigkeit (Englisch)
- [ ] Online-Buchungssystem Integration
- [ ] Push-Notifications für Verfügbarkeit
- [ ] Progressive Web App (PWA) Features

### Technische Verbesserungen
- [ ] WebP Bild-Konvertierung
- [ ] Service Worker für Offline-Support
- [ ] Advanced Analytics Integration
- [ ] A/B Testing Framework

---

**Vollständige Dokumentation:** [README.md](README.md)
**Live Website:** https://mietpark-saar-pfalz.com
