import React from 'react';
import { Helmet } from 'react-helmet';

// SEO-Konfiguration für alle Seiten
const seoConfig = {
  default: {
    title: 'Mietpark Saar-Pfalz - Dachboxen, Fahrradträger & mehr mieten',
    description: 'Ihr zuverlässiger Partner für Dachboxen, Heckboxen, Fahrradträger und Hüpfburgen in Homburg. Flexible Mietpreise, Montageservice inklusive.',
    keywords: 'Dachbox mieten, Fahrradträger leihen, Heckbox vermieten, Homburg, Saarland, Wintersport, Urlaub',
    image: 'https://mietpark-saar-pfalz.com/images/logo.png',
    url: 'https://mietpark-saar-pfalz.com'
  },
  home: {
    title: 'Mietpark Saar-Pfalz - Dachboxen & Transportlösungen mieten',
    description: 'Mehr Raum für Ihre Erlebnisse: Dachboxen, Heckboxen & Fahrradträger mieten in Homburg. Flexible Abholung, faire Preise, Montage inklusive.',
    keywords: 'Dachbox mieten Homburg, Fahrradträger leihen, Heckbox vermieten Saarland, Transportlösungen, Winterurlaub'
  },
  blog: {
    title: 'Blog - Tipps zu Dachboxen & Transportlösungen | Mietpark Saar-Pfalz',
    description: 'Praktische Tipps und Ratgeber rund um Dachboxen, Fahrradträger und Transportlösungen. Erfahren Sie mehr über sicheren Transport im Winterurlaub.',
    keywords: 'Dachbox Tipps, Fahrradtransport, Winterurlaub Transport, Transportlösungen Ratgeber'
  },
  products: {
    title: 'Mietangebot - Dachboxen, Fahrradträger & mehr | Mietpark Saar-Pfalz',
    description: 'Unser komplettes Mietangebot: Dachboxen für Winterurlaub, Fahrradträger, Heckboxen und Hüpfburgen. Wählen Sie Ihr Wunschprodukt.',
    keywords: 'Dachbox mieten, Fahrradträger leihen, Heckbox vermieten, Hüpfburg mieten, Transportlösungen'
  }
};

// Dynamische SEO-Daten für Produkte und Blog-Artikel
const getDynamicSEO = (type, id, data) => {
  switch (type) {
    case 'product':
      return {
        title: `${data.title} mieten | Mietpark Saar-Pfalz`,
        description: `${data.description.substring(0, 155)}... Ab ${data.prices?.text || data.price} mieten.`,
        image: data.image ? `https://mietpark-saar-pfalz.com${data.image}` : 'https://mietpark-saar-pfalz.com/images/logo.png'
      };

    case 'blog':
      return {
        title: `${data.title} | Mietpark Blog`,
        description: data.excerpt || data.content?.substring(0, 155) + '...',
        image: data.image ? `https://mietpark-saar-pfalz.com${data.image}` : 'https://mietpark-saar-pfalz.com/images/logo.png'
      };

    default:
      return {};
  }
};

export default function SEOHead({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  pageType,
  pageId,
  pageData
}) {
  // Temporäre Vereinfachung für Debugging
  const defaultTitle = 'Mietpark Saar-Pfalz - Dachboxen, Fahrradträger & mehr mieten';
  const defaultDescription = 'Ihr zuverlässiger Partner für Dachboxen, Heckboxen, Fahrradträger und Hüpfburgen in Homburg. Flexible Mietpreise, Montageservice inklusive.';

  return (
    <Helmet>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
    </Helmet>
  );
  return (
    <Helmet>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
    </Helmet>
  );
}
