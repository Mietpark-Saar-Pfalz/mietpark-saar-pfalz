<research_format>
  <context>
    Ziel: Auf jeder Produktdetailseite einen Teilen-Button anbieten, um die Seite bequem per WhatsApp oder E-Mail zu teilen.
  </context>

  <notes>
    - WhatsApp Share URL (universell): https://wa.me/?text=<URL-ENCODED-TEXT>
    - E-Mail Share via mailto: mailto:?subject=<SUBJECT>&body=<BODY>
    - Optional (komfortabel): Web Share API (navigator.share) auf mobilen Geräten/unterstützten Browsern.
    - Fallback für Copy: navigator.clipboard.writeText, alternativ window.prompt.
  </notes>

  <decisions>
    - Implementierung als wiederverwendbare React-Komponente `src/components/ShareButtons.jsx`.
    - Auf Produktdetailseite wird die kanonische URL geteilt, um "saubere" Links zu erzeugen.
  </decisions>
</research_format>
