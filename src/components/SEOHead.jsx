import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEOHead({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  schema
}) {
  const siteTitle = 'Mietpark Saar-Pfalz';
  const defaultDesc = 'Ihr zuverlässiger Partner für Dachboxen, Heckboxen, Fahrradträger und Hüpfburgen in Homburg. Flexible Mietpreise, Montageservice inklusive.';
  const baseUrl = 'https://mietpark-saar-pfalz.com';
  // Ensure we have a valid absolute URL for OG images
  const metaImage = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}/images/logo.png`;
  const metaUrl = url ? (url.startsWith('http') ? url : `${baseUrl}${url}`) : baseUrl;

  const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} - Dachboxen, Fahrradträger & mehr mieten`;
  const metaDesc = description || defaultDesc;

  const creatorSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Serverraum247',
    email: 'webmaster@serverraum247.dev',
    areaServed: {
      '@type': 'City',
      name: 'Homburg/Saar'
    }
  };

  const schemas = [creatorSchema, ...(schema ? [schema] : [])];

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={metaUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImage} />

      {/* Structured Data (JSON-LD) */}
      {schemas.map((entry, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  );
}
