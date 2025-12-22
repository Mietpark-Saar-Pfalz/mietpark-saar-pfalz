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
  // Basis-Konfiguration
  const baseConfig = seoConfig.default;

  // Seiten-spezifische Konfiguration
  let pageConfig = {};
  if (pageType && seoConfig[pageType]) {
    pageConfig = seoConfig[pageType];
  }

  // Dynamische Daten für Produkte/Blog
  let dynamicConfig = {};
  if (pageType && pageId && pageData) {
    dynamicConfig = getDynamicSEO(pageType, pageId, pageData);
  }

  // Finale SEO-Daten (Priorität: dynamic > page > base)
  const finalSEO = {
    ...baseConfig,
    ...pageConfig,
    ...dynamicConfig,
    ...(title && { title }),
    ...(description && { description }),
    ...(keywords && { keywords }),
    ...(image && { image }),
    ...(url && { url })
  };

  return (
    <Helmet>
      {/* Basis Meta Tags */}
      <title>{finalSEO.title}</title>
      <meta name="description" content={finalSEO.description} />
      <meta name="keywords" content={finalSEO.keywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={finalSEO.url} />

      {/* Open Graph */}
      <meta property="og:title" content={finalSEO.title} />
      <meta property="og:description" content={finalSEO.description} />
      <meta property="og:image" content={finalSEO.image} />
      <meta property="og:url" content={finalSEO.url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Mietpark Saar-Pfalz" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalSEO.title} />
      <meta name="twitter:description" content={finalSEO.description} />
      <meta name="twitter:image" content={finalSEO.image} />

      {/* Zusätzliche SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="de-DE" />
      <meta name="author" content="Mietpark Saar-Pfalz" />
      <meta name="publisher" content="Mietpark Saar-Pfalz" />

      {/* Geo Tags */}
      <meta name="geo.region" content="DE-SL" />
      <meta name="geo.placename" content="Homburg" />
      <meta name="geo.position" content="49.2838384;7.3414247" />
      <meta name="ICBM" content="49.2838384, 7.3414247" />

      {/* Business Informationen */}
      <meta name="business:contact_data:street_address" content="Kastanienweg 17" />
      <meta name="business:contact_data:locality" content="Homburg" />
      <meta name="business:contact_data:region" content="Saarland" />
      <meta name="business:contact_data:postal_code" content="66424" />
      <meta name="business:contact_data:country_name" content="Deutschland" />
      <meta name="business:contact_data:phone_number" content="+49 173 761 5995" />

      {/* Theme Color für Mobile */}
      <meta name="theme-color" content="#1a4d2e" />
      <meta name="msapplication-TileColor" content="#1a4d2e" />

      {/* Favicon und Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

      {/* Preconnect für Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

      {/* JSON-LD Structured Data wird separat behandelt */}
    </Helmet>
  );
}
