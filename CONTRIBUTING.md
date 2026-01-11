# Contributing Guide

Willkommen beim Mietpark Saar-Pfalz Projekt! Vielen Dank, dass Sie sich für einen Beitrag interessieren.

## 🚀 Schnellstart

1. **Repository klonen:**
   ```bash
   git clone https://github.com/Serverraum247/mietpark-saar-pfalz.git
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

4. **Änderungen testen:**
   ```bash
   npm run build    # Produktionsbuild
   npm run preview  # Build-Vorschau
   ```

## 📝 Entwicklung

### Code-Style
- **ESLint**: Automatische Code-Qualität (`npm run lint`)
- **Prettier**: Konsistente Formatierung
- **React Best Practices**: Funktionale Komponenten mit Hooks

### Commit-Nachrichten
Bitte verwenden Sie das definierte [Commit-Format](COMMIT_CONVENTIONS.md):

```bash
git commit -m "feat: add new product category

- Implementiert neue Kategorie mit Filtern
- Responsive Design für alle Bildschirmgrößen
- SEO-optimiert mit Structured Data"
```

### Branches
- `main`: Produktions-Code
- `feature/*`: Neue Features
- `fix/*`: Bugfixes
- `docs/*`: Dokumentation

### Pull Requests
1. **Branch erstellen:** `git checkout -b feature/neues-feature`
2. **Änderungen committen** mit Conventional Commits Format
3. **Pushen:** `git push origin feature/neues-feature`
4. **PR erstellen** mit detaillierter Beschreibung
5. **Code Review** abwarten

## 🧪 Testing

### Lokale Tests
- **Unit Tests:** `npm test` (falls implementiert)
- **E2E Tests:** Manuell in verschiedenen Browsern
- **Performance:** Lighthouse Audit > 90 Punkte

### Cross-Browser Testing
- Chrome/Edge (primär)
- Firefox
- Safari
- Mobile Browser (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Lokale Deployments
```bash
npm run build:custom  # Test-Build für Custom Domain
npm run deploy        # Produktions-Deployment zu GitHub Pages
```

### GitHub Pages
- Automatisches Deployment bei Push zu `main`
- Custom Domain: `mietpark-saar-pfalz.com`
- SSL: Automatisches Let's Encrypt Zertifikat

## 📋 Checkliste vor Commit

- [ ] Code lintet (`npm run lint`)
- [ ] Build erfolgreich (`npm run build`)
- [ ] Lokale Tests bestanden
- [ ] Responsive Design geprüft
- [ ] Accessibility (WCAG) beachtet
- [ ] SEO-optimiert (Meta-Tags, Structured Data)
- [ ] Performance geprüft (Lighthouse)
- [ ] Cross-Browser kompatibel
- [ ] Dokumentation aktualisiert

## 🐛 Bug Reports

Bitte verwenden Sie das Issue-Template:

**Titel:** `Bug: Kurze Beschreibung`
**Beschreibung:**
- Schritte zum Reproduzieren
- Erwartetes Verhalten
- Tatsächlichs Verhalten
- Browser/Version
- Screenshots (falls relevant)

## 💡 Feature Requests

**Titel:** `Feature: Neue Funktionalität`
**Beschreibung:**
- Use Case
- Akzeptanzkriterien
- Mockups/Screenshots
- Priorität

## 📞 Kontakt

Bei Fragen:
- **Issues:** Für Bugs und Feature Requests
- **Discussions:** Für allgemeine Fragen
- **Email:** kontakt@mietpark-saar-pfalz.com

## 📚 Ressourcen

- [CHANGELOG.md](CHANGELOG.md) - Versionshistorie
- [COMMIT_CONVENTIONS.md](COMMIT_CONVENTIONS.md) - Commit-Format
- [README.md](README.md) - Projekt-Übersicht
- [Live Website](https://mietpark-saar-pfalz.com)

---

**Vielen Dank für Ihren Beitrag! 🎉**
