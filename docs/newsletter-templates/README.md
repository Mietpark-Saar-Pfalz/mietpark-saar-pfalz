# Newsletter-Templates (lokal)

Die HTML-Vorlagen für den Double-Opt-In- und Willkommen-Newsletter liegen ausschließlich lokal in diesem Ordner. Die Dateien enthalten personenbezogene Einstellungen, Tracking-Parameter und private URLs und sollen deshalb **nicht in Git** versioniert werden.

## Verwendung

1. Speichere die gewünschten HTML-Dateien hier, z. B. `double-opt-in.html` und `welcome.html`.
2. Bearbeite sie lokal und lade die finale Version in Brevo hoch.
3. Notiere die Template-IDs in deiner geheimen Dokumentation oder als Wert der Worker-Secrets (`BREVO_DOI_TEMPLATE_ID`, `BREVO_WELCOME_TEMPLATE_ID`).
4. Prüfe die Templates regelmäßig auf Aktualität (Datenschutztexte, Links, Branding).

> Hinweis: Durch den Eintrag `docs/newsletter-templates/*.html` in der `.gitignore` werden reine HTML-Dateien aus diesem Ordner automatisch ignoriert. Die README selbst wird versioniert, damit der Workflow dokumentiert bleibt.
