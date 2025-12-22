# Commit Message Conventions

Dieses Projekt verwendet ein standardisiertes Format für Commit-Nachrichten, basierend auf [Conventional Commits](https://conventionalcommits.org/).

## Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Beispiele

```
feat: add winter background video
fix: resolve 404 routing on direct URLs
docs: update changelog for v1.0.0 release
style: format code with prettier
refactor: optimize image loading performance
test: add unit tests for product component
chore: update dependencies to latest versions
```

## Types

| Type | Beschreibung |
|------|-------------|
| `feat` | Neue Features |
| `fix` | Bugfixes |
| `docs` | Dokumentation |
| `style` | Code-Style Änderungen (Formatierung, etc.) |
| `refactor` | Code-Refactoring ohne Funktionalitätsänderung |
| `test` | Tests hinzufügen oder korrigieren |
| `chore` | Wartungsarbeiten (Dependencies, Build, etc.) |
| `perf` | Performance-Verbesserungen |
| `ci` | CI/CD Änderungen |
| `build` | Build-System oder Dependencies |

## Regeln

### Zusammenfassung (Subject)
- **Maximal 70 Zeichen**
- **Imperativ form** (add, fix, update, etc.)
- **Kleinstbuchstabe** am Anfang
- **Kein Punkt** am Ende

### Gute Beispiele
```
feat: add responsive navigation menu
fix: resolve image loading on mobile devices
docs: update installation instructions
style: format CSS with consistent indentation
refactor: extract reusable product card component
```

### Schlechte Beispiele
```
Added new feature for navigation  # Zu lang, kein Typ
fix bug in product page          # Kein Imperativ
Fixed: Product page bug          # Großbuchstabe, unnötiges "Fixed:"
update readme.md                  # Kein Typ-Spezifizierer
```

## Body (Optionaler Detailtext)

```
feat: add winter video background

- Implementiert loopendes Winter-Video als Hintergrund
- Fügt Fallback-Poster-Bild für Performance hinzu
- Responsive Design für Mobile-Geräte
- Accessibility-konform mit reduced-motion Support

Closes #123
```

## Breaking Changes

Bei breaking changes:

```
feat: change product API structure

BREAKING CHANGE: Product interface changed from array to object
Update all components using product data
```

## Scope (Optional)

Für größere Projekte kann ein Scope hinzugefügt werden:

```
feat(auth): add user login functionality
fix(ui): resolve button alignment issue
```

## Automatische Versionierung

Diese Commit-Types werden für automatische Versionierung verwendet:
- `feat` → Minor Version (1.0.0 → 1.1.0)
- `fix` → Patch Version (1.0.0 → 1.0.1)
- `BREAKING CHANGE` → Major Version (1.0.0 → 2.0.0)

## Tools

### Commitizen
```bash
npm install -g commitizen
commitizen init cz-conventional-changelog --save-dev --save-exact
```

### Commitlint
```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

## Beispiele aus diesem Projekt

```
feat: implement SPA routing for GitHub Pages
fix: correct image paths for custom domain
docs: create comprehensive changelog
chore: setup gh-pages deployment workflow
perf: optimize video loading and autoplay
style: format code with consistent spacing
```

## Quick Reference

**Subject Line:**
- `<type>: <description>` (max 70 chars)
- Imperativ form
- Kein Punkt am Ende

**Body:**
- Detaillierte Erklärung (optional)
- Bullet points für Änderungen
- Issue references

**Footer:**
- Breaking changes
- Issue references
- Co-authors
