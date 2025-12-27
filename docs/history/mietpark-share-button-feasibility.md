<feasibility_format>
  <summary>
    Umsetzung ist unkompliziert: React Router liefert Produktdetailseiten über `/product/:id`.
    Teilen kann client-seitig über Links (WhatsApp/mailto) und optional via Web Share API erfolgen.
  </summary>

  <risks>
    - Desktop ohne WhatsApp-App: WhatsApp-Web wird geöffnet (ok).
    - Clipboard API ggf. nicht verfügbar/erfordert HTTPS: Fallback via `window.prompt`.
    - Benutzer bricht native Share ab: wird abgefangen, Copy-Fallback.
  </risks>

  <terminal_output>
    npm run lint
    -> OK

    npm run build
    vite v7.3.0 building client environment for production...
    ✓ 109 modules transformed.
    dist/index.html                   6.66 kB │ gzip:   2.48 kB
    dist/assets/index-BLJZgtI0.css   23.41 kB │ gzip:   4.96 kB
    dist/assets/index-D6qiBuGL.js   458.95 kB │ gzip: 142.69 kB
    ✓ built in 634ms
  </terminal_output>
</feasibility_format>
