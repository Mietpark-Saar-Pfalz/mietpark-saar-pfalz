# Git Workflow & Branch Strategy

Dieses Dokument beschreibt den empfohlenen Git-Workflow für die Mietpark Saar-Pfalz Website.

## 🌳 Branch-Struktur

### Haupt-Branches

#### `main` (Default Branch)
- **Zweck:** Hauptentwicklungsbranch
- **Status:** Immer deploy-ready
- **Regeln:**
  - Nur gemergte, getestete Features
  - Keine direkten Commits (nur über PRs)
  - Automatische CI/CD Pipeline
  - Protected Branch (mind. 1 Approval für Merges)

#### `gh-pages` (Deployment Branch)
- **Zweck:** Automatisch generierter Deployment-Branch
- **Status:** Wird automatisch von GitHub Actions erstellt
- **Regeln:**
  - Niemals manuell committen/pushen
  - Nur durch CI/CD Pipeline aktualisiert
  - Enthält nur `dist/` Build-Output

### Feature Branches

#### Namenskonvention: `feature/*`
```
feature/user-authentication
feature/winter-theme
feature/contact-form
feature/seo-optimization
```

**Workflow:**
```bash
# Neuen Feature-Branch erstellen
git checkout -b feature/neue-funktion

# Regelmäßig main pullen
git pull origin main

# Commits mit Conventional Commits
git commit -m "feat: implement neue funktion"

# Push und PR erstellen
git push origin feature/neue-funktion
```

### Bugfix Branches

#### Namenskonvention: `fix/*`
```
fix/navigation-broken
fix/seo-meta-tags
fix/mobile-layout
```

### Hotfix Branches

#### Namenskonvention: `hotfix/*`
```
hotfix/critical-security-fix
hotfix/broken-deployment
```

**Für Produktions-Hotfixes:**
```bash
# Direkt von main
git checkout -b hotfix/critical-fix main

# Fix committen
git commit -m "fix: critical production issue"

# Sofort in main mergen
git checkout main
git merge hotfix/critical-fix

# Tag erstellen
git tag -a v1.0.1 -m "Hotfix: Critical production fix"
```

## 🔄 Synchronisation der Branches

### Automatische gh-pages Updates

**GitHub Actions Workflow** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Manuelle Synchronisation

**gh-pages manuell aktualisieren** (nur bei Bedarf):
```bash
# Von main deployen
npm run deploy

# Status prüfen
git log --oneline --graph --all
```

## 📝 Dokumentation aktuell halten

### Automatische Changelog-Updates

**1. Release-Script** (`package.json`):
```json
{
  "scripts": {
    "release": "npm version patch && npm run build && npm run deploy",
    "release:minor": "npm version minor && npm run build && npm run deploy",
    "release:major": "npm version major && npm run build && npm run deploy"
  }
}
```

**2. Version-Commit Hook** (`.husky/pre-commit`):
```bash
#!/bin/sh
# Update CHANGELOG.md
npm run changelog:update

# Lint and test
npm run lint
npm run test
```

### README.md automatische Updates

**README Badges aktualisieren:**
```bash
# Version in README aktualisieren
sed -i "s/version-.*-blue/version-$(npm pkg get version)-blue/" README.md

# Build-Status aktualisieren
sed -i "s/last-deployed-.*-green/last-deployed-$(date +%Y-%m-%d)-green/" README.md
```

## 🔐 Branch Protection Rules

### main Branch Protection
```yaml
# .github/settings.yml oder manuell konfigurieren
branches:
  - name: main
    protection:
      required_status_checks:
        contexts: ["build", "test", "lint"]
      required_pull_request_reviews:
        required_approving_review_count: 1
        dismiss_stale_reviews: true
      restrictions: []
      enforce_admins: false
      allow_force_pushes: false
      allow_deletions: false
```

## 📊 Monitoring & Status

### Branch-Status prüfen
```bash
# Alle Branches anzeigen
git branch -a

# Status prüfen
git status

# Unterschiede zwischen Branches
git diff main..gh-pages

# Letzte Commits aller Branches
git log --oneline --graph --all --decorate
```

### CI/CD Status
- **GitHub Actions:** Automatische Builds und Deployments
- **Branch Protection:** Verhindert fehlerhafte Merges
- **Status Badges:** Zeigen Build-Status in README

## 🚀 Release Workflow

### Standard Release
```bash
# Feature fertig entwickelt
git checkout -b release/v1.1.0
npm version minor  # v1.0.0 -> v1.1.0

# Finale Tests
npm run test
npm run build

# In main mergen
git checkout main
git merge release/v1.1.0

# Tag erstellen
git tag -a v1.1.0 -m "Release v1.1.0: Neue Features"

# Push mit Tags
git push origin main --tags
```

### Changelog generieren
```bash
# Mit conventional-changelog
npm install -g conventional-changelog-cli
conventional-changelog -p angular -i CHANGELOG.md -s

# Oder manuell aktualisieren
echo "## [$(npm pkg get version)] - $(date +%Y-%m-%d)" >> CHANGELOG.md
echo "### Added" >> CHANGELOG.md
echo "- Feature description" >> CHANGELOG.md
```

## 🛠️ Tools & Automation

### Empfohlene Git Tools
```bash
# Git Flow
npm install -g git-flow

# Husky für Git Hooks
npm install -g husky
npx husky install

# Commitizen für Conventional Commits
npm install -g commitizen
```

### Git Hooks Setup
```bash
# pre-commit hook
npx husky add .husky/pre-commit "npm run lint"
npx husky add .husky/pre-commit "npm run test"

# commit-msg hook für Conventional Commits
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

## 📋 Checkliste vor Merge

### Für Feature Branches
- [ ] Alle Tests bestehen (`npm test`)
- [ ] Linting erfolgreich (`npm run lint`)
- [ ] Build erfolgreich (`npm run build`)
- [ ] README aktualisiert (falls nötig)
- [ ] CHANGELOG aktualisiert
- [ ] Dokumentation vollständig

### Für main Branch
- [ ] CI/CD Pipeline grün
- [ ] Code Review abgeschlossen
- [ ] Konflikte aufgelöst
- [ ] Branch up-to-date mit main

## 🔧 Troubleshooting

### gh-pages nicht aktuell
```bash
# Force redeploy
git push origin --delete gh-pages
npm run deploy
```

### Branch-Konflikte
```bash
# Rebase statt merge
git checkout feature/branch
git rebase main

# Bei Konflikten
git add <resolved-files>
git rebase --continue
```

### CI/CD Probleme
- GitHub Actions Logs prüfen
- Branch Protection Settings überprüfen
- Secrets und Tokens validieren

---

## 🎯 Zusammenfassung

**Branch-Strategie:**
- `main`: Development (protected)
- `gh-pages`: Auto-deployment
- `feature/*`: Neue Features
- `fix/*`: Bugfixes
- `hotfix/*`: Kritische Fixes

**Automatisierung:**
- GitHub Actions für CI/CD
- Husky für Git Hooks
- Conventional Commits für semantische Versionsierung
- Automatische Changelog-Generierung

**Qualitätssicherung:**
- Branch Protection
- Code Reviews
- Automatische Tests
- Build-Validierung

Dieser Workflow gewährleistet saubere, wartbare Branches und immer aktuelle Dokumentation.
