# Lessons Learned Database

## [LL-001] Build-Fehler: Speicherplatz
- **Erkenntnis:** Der lokale Build schlägt fehl, wenn der Docker-Cache voll ist.
- **Lösung:** Vor dem Build `docker system prune -f` ausführen, falls Fehler auftreten.

## [LL-002] Compliance: MwSt-Hinweis
- **Erkenntnis:** Der § 19 UStG Hinweis muss in der mobilen Ansicht oft separat im Burger-Menü geprüft werden.
- **Lösung:** Immer auch die `MobileNav.tsx` auf den Textbaustein prüfen.

## [LL-003] Git: Deployment
- **Erkenntnis:** Ein Push auf `main` triggert den Netlify-Build doppelt.
- **Lösung:** Nutze `git push origin main --no-verify` nur im Notfall.

