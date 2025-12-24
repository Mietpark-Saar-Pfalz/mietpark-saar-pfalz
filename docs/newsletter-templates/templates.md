# Newsletter-Templates (Brevo)

Diese Datei beschreibt die beiden E-Mail-Vorlagen, die für den Double-Opt-In-Prozess und die anschließende Begrüßung verwendet werden. Die eigentlichen HTML-Dateien verbleiben weiterhin **lokal** und werden nicht ins Repository eingecheckt – siehe `README.md` in diesem Ordner.

## Gemeinsame Richtlinien

- **Branding**: Logo Mietpark Saar-Pfalz oben links, Hauptfarbe `#E63946`, Akzent `#1D3557`, Hintergrund hell (`#F7F8FA`).
- **Schriften**: Google Font "Inter" oder System-Fallback `Helvetica, Arial, sans-serif`.
- **Buttons**: 44×44 px Mindesthöhe, abgerundet (4 px), kontrastreich (`#E63946` auf weiß, Text weiß).
- **Footer**: Firmenanschrift, Impressum-Link, Datenschutz-Link, Abmeldelink.
- **Tracking**: UTM-Parameter `utm_source=newsletter&utm_medium=email&utm_campaign={{campaign}}` nur in produktiver Version einfügen.

---

## Template 1 – Double Opt-In

| Feld                 | Inhalt                                                                 |
|----------------------|-------------------------------------------------------------------------|
| Name in Brevo        | `Newsletter • Double Opt-In`                                            |
| Betreff              | `Fast geschafft: Bitte bestätige deine Anmeldung`                       |
| Preview Text         | `Nur noch ein Klick trennt dich von Tipps rund um Dachbox und Anhänger.`|
| Haupt-CTA            | `Jetzt Anmeldung bestätigen` (führt auf `{{ params.confirmation_url }}`)|
| Fallback-Link        | Vollständige DOI-URL im Klartext unter dem Button                       |

### Empfohlener Aufbau

1. **Hero-Bild** (Familie mit Dachbox, 600×240 px). Alternative: Vollflächige Hintergrundfarbe, wenn kein Bild verfügbar.
2. **Intro-Text** mit persönlicher Anrede (`Hallo {{ contact.FIRSTNAME | default:"" }}` optional).
3. **Liste** mit 3 Vorteilen (z. B. Verfügbarkeit, persönliche Beratung, Miettipps).
4. **CTA-Button** (zentriert, 100 % Breite auf Mobile).
5. **Hinweis** zur Sicherheit: "Aus Versehen angemeldet? Ignoriere diese E-Mail."

### HTML-Snippet (gekürzt)

```html
<section style="font-family:Inter,Arial,sans-serif; background:#F7F8FA; padding:40px 24px;">
  <table role="presentation" width="100%" style="max-width:560px; margin:0 auto;">
    <tr>
      <td style="text-align:center;">
        <img src="cid:logo" alt="Mietpark Saar-Pfalz" width="180" style="margin-bottom:24px;" />
        <h1 style="color:#1D3557;">Fast geschafft!</h1>
        <p style="color:#1D3557;">Bitte bestätige deine Anmeldung mit einem Klick:</p>
        <a href="{{ params.confirmation_url }}" style="display:inline-block; background:#E63946; color:#fff; padding:14px 28px; border-radius:4px; font-weight:600; text-decoration:none;">
          Jetzt Anmeldung bestätigen
        </a>
        <p style="font-size:12px; color:#6C7483; margin-top:16px;">
          Falls der Button nicht funktioniert, kopiere diese Adresse:<br />
          <a href="{{ params.confirmation_url }}" style="color:#1D3557;">{{ params.confirmation_url }}</a>
        </p>
      </td>
    </tr>
  </table>
</section>
```

> **Hinweis:** Brevo ersetzt `{{ params.confirmation_url }}` automatisch durch den Double-Opt-In-Link.

---

## Template 2 – Willkommen

| Feld                 | Inhalt                                                                 
|----------------------|-------------------------------------------------------------------------|
| Name in Brevo        | `Newsletter • Willkommen`                                               |
| Betreff              | `Willkommen beim Mietpark Saar-Pfalz Newsletter`                        |
| Preview Text         | `Tipps zur Dachbox-Miete, neue Verfügbarkeiten & exklusive Aktionen.`   |
| Haupt-CTA            | `Jetzt verfügbare Dachbox prüfen` (Link `https://mietpark-saar-pfalz.com/#produkte`)
| Zweiter CTA          | `Persönliche Beratung anfragen` (`https://mietpark-saar-pfalz.com/#kontakt`)

### Empfohlener Aufbau

1. **Dankesabsatz** mit individueller Note: "Schön, dass du dabei bist, {{ contact.FIRSTNAME | default:"" }}".
2. **Checkliste**: Wie funktioniert die Buchung (3 Schritte).
3. **Produkt-Highlight**: Kleines Grid mit zwei Dachbox-Typen (Bild + Kurztext).
4. **CTA-Buttons** (nebeneinander Desktop, übereinander Mobile).
5. **FAQ-Block** mit häufigen Fragen (Verfügbarkeit, Montage, Abholung).

### HTML-Snippet (gekürzt)

```html
<section style="font-family:Inter,Arial,sans-serif; background:#FFFFFF; padding:40px 24px;">
  <table role="presentation" width="100%" style="max-width:640px; margin:0 auto;">
    <tr>
      <td>
        <h1 style="color:#1D3557;">Willkommen im Mietpark Saar-Pfalz!</h1>
        <p style="color:#1D3557;">Hier bekommst du Verfügbarkeiten, Angebotsupdates und saisonale Tipps direkt in dein Postfach.</p>
        <ol style="color:#1D3557; padding-left:20px;">
          <li>Termin & Dachbox online anfragen</li>
          <li>Persönliche Bestätigung innerhalb von 24h</li>
          <li>Abholung in Homburg inkl. Montage-Check</li>
        </ol>
        <div style="margin:24px 0;">
          <a href="https://mietpark-saar-pfalz.com/#produkte" style="background:#E63946; color:#fff; padding:14px 24px; border-radius:4px; text-decoration:none; font-weight:600; margin-right:12px;">
            Jetzt verfügbare Dachbox prüfen
          </a>
          <a href="https://mietpark-saar-pfalz.com/#kontakt" style="border:2px solid #E63946; color:#E63946; padding:12px 22px; border-radius:4px; text-decoration:none; font-weight:600; display:inline-block; margin-top:12px;">
            Persönliche Beratung anfragen
          </a>
        </div>
      </td>
    </tr>
  </table>
</section>
```

---

## Workflow zum Aktualisieren

1. Templates in Brevo als **HTML Custom** erstellen (kein Drag-&-Drop, damit der Code 1:1 übernommen wird).
2. Versionsstand lokal als `.html` speichern (z. B. `double-opt-in-2025-12.html`). Die Datei bleibt wegen `.gitignore` nur lokal.
3. Änderungen in diesem Markdown-Dokument nachziehen (Betreff, Links, Assets).
4. Template-ID aus Brevo kopieren und als Secret im Worker (`BREVO_DOI_TEMPLATE_ID`, `BREVO_WELCOME_TEMPLATE_ID`) ablegen.
5. Nach Anpassungen immer einen Testlauf durchführen (`wrangler dev` + Testadresse), um Mailing und Redirect zu validieren.

> ✉️ **Tipp:** Für schnelle Anpassungen kannst du auch eine reine Textfassung (Plain Text) in Brevo pflegen. Deren Inhalte sollten mit den HTML-Versionen synchron sein.
