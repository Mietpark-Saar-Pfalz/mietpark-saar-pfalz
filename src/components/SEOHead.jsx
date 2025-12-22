import React from 'react';

export default function SEOHead({
  title,
  description,
  keywords
}) {
  // Einfache SEO ohne externe Dependencies - verwendet useEffect für document manipulation
  React.useEffect(() => {
    const defaultTitle = 'Mietpark Saar-Pfalz - Dachboxen, Fahrradträger & mehr mieten';
    const defaultDescription = 'Ihr zuverlässiger Partner für Dachboxen, Heckboxen, Fahrradträger und Hüpfburgen in Homburg. Flexible Mietpreise, Montageservice inklusive.';

    // Title setzen
    document.title = title || defaultTitle;

    // Meta Description setzen oder aktualisieren
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description || defaultDescription;

    // Meta Keywords setzen oder aktualisieren (falls vorhanden)
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = keywords;
    }
  }, [title, description, keywords]);

  return null; // Diese Komponente rendert nichts, manipuliert nur das document
}
