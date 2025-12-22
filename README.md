# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Video-Hintergrund hinzufügen 🎥

Die Website unterstützt jetzt einen Video-Hintergrund als Dauerschleife!

### So fügen Sie ein Video hinzu:

1. **Video vorbereiten:**
   - **Format:** MP4 (primär) und WebM (Fallback) für beste Browser-Kompatibilität
   - **Auflösung:** 1920x1080 (Full HD) oder 1280x720 (HD)
   - **Länge:** 10-30 Sekunden für optimale Performance
   - **Dateigröße:** Max. 5-10 MB (komprimiert)
   - **Inhalt:** Ruhige, loop-fähige Szene (z.B. sanftes Schneefallen, Wellen, Wolken)

2. **Video komprimieren:**
   ```bash
   # Empfohlene Tools:
   # - HandBrake (kostenlos)
   # - Adobe Media Encoder
   # - FFmpeg: ffmpeg -i input.mp4 -vf scale=1920:1080 -c:v libx264 -crf 28 -preset slow background-video.mp4
   ```

3. **Dateien platzieren:**
   - `public/images/background-video.mp4` (Hauptformat)
   - `public/images/background-video.webm` (empfohlen für bessere Kompression)

4. **Features:**
   - ✅ **Automatische Dauerschleife**
   - ✅ **Stummgeschaltet** (für Autoplay-Kompatibilität)
   - ✅ **Responsive** (nur auf Desktop sichtbar)
   - ✅ **Accessibility** (deaktiviert bei `prefers-reduced-motion`)
   - ✅ **Performance-optimiert** (lazy loading, mobile ausgeschaltet)
   - ✅ **Fallback** auf statisches Hintergrundbild

5. **Testen:**
   - Desktop: Video sollte als subtiler Hintergrund sichtbar sein
   - Mobile: Nur statisches Bild (Performance)
   - Browser mit Reduced Motion: Nur statisches Bild

### Beispiel-Video-Ideen:
- Sanftes Schneefallen im Winter
- Leichte Wellenbewegung am See
- Ziehe Wolken am Himmel
- Ruhige Naturaufnahmen mit leichtem Wind

## Zukünftige Erweiterungen

- **Serverseitiges Rendering (SSR) oder Statische Seitengenerierung (SSG)**: Für eine optimale SEO und Performance, insbesondere bei größeren Inhaltsmengen, wird die Implementierung von SSR oder SSG in Betracht gezogen. Dies kann die initiale Ladezeit verbessern und die Indexierung durch Suchmaschinen erleichtern.