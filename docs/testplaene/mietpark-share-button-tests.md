# Testplan: Teilen-Button auf Produktseiten

## Ziel
Sicherstellen, dass jede Produktdetailseite einen Teilen-Block mit WhatsApp/E-Mail hat und die Links korrekt sind.

## Manuelle Tests
1. Öffne `/product/1` (und 1–2 weitere Produkte).
   - Erwartung: Im Hero-Bereich sind Buttons sichtbar: "Teilen", "WhatsApp", "E-Mail", "Link kopieren".

2. WhatsApp
   - Klick auf "WhatsApp".
   - Erwartung: Neuer Tab/Fenster öffnet WhatsApp (Web/App) mit vorbefülltem Text inklusive Produktname + URL.

3. E-Mail
   - Klick auf "E-Mail".
   - Erwartung: Mail-Client öffnet mit Betreff "Empfehlung: <Produkt>" und Body enthält Link.

4. Link kopieren
   - Klick auf "Link kopieren".
   - Erwartung: Zwischenablage enthält kanonische URL; Status "Link kopiert" erscheint kurz.

5. Native Share (falls unterstützt)
   - Klick auf "Teilen" auf iOS/Android.
   - Erwartung: System-Share-Sheet öffnet.

6. Responsive
   - Mobile Breite (<= 768px): Buttons umbrechen sauber; kein Layout-Overflow.
