# Video-Hintergrund Anleitung

## 🎥 Video-Hintergrund ist implementiert!

Die Website kann jetzt ein Video als Dauerschleife im Hintergrund abspielen.

## Was wurde implementiert:

### ✅ Features:
- **Autoplay & Loop**: Video startet automatisch und wiederholt sich endlos
- **Muted**: Stummgeschaltet für Autoplay-Kompatibilität
- **Responsive**: Nur auf Desktop-Bildschirmen sichtbar (>768px)
- **Accessibility**: Deaktiviert bei `prefers-reduced-motion`
- **Performance**: Optimiert für schnelles Laden
- **Fallback**: Statisches Bild wenn Video nicht verfügbar

### 📁 Benötigte Dateien:
- `background-video.mp4` (Hauptformat)
- `background-video.webm` (Fallback-Format)

### 🔧 Technische Details:
- Opacity: 60% für Lesbarkeit
- Overlay: Dunkler Filter für besseren Textkontrast
- Mobile: Ausgeschaltet für Performance
- Reduced Motion: Vollständig deaktiviert

## 🚀 Video hinzufügen:

1. Video-Dateien in diesen Ordner legen
2. Namen: `background-video.mp4` und `background-video.webm`
3. Seite neu laden - fertig!

## 📋 Empfehlungen für Videos:

### ✅ Ideal:
- Ruhige Naturaufnahmen
- Sanfte Bewegungen
- 10-30 Sekunden Länge
- 1920x1080 Auflösung
- < 10MB Dateigröße

### ❌ Nicht geeignet:
- Schnelle Bewegungen
- Laute Geräusche
- Zu lange Videos (>30s)
- Starke Kontraste
