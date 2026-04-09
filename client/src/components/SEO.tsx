import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'organization';
  structuredData?: Record<string, any>;
}

export function SEO({ 
  title = 'Brasil Sustenta - Hub de Inovação ESG e Conexão de Talentos',
  description = 'Conectamos estudantes de tecnologia a projetos reais de sustentabilidade em grandes empresas. Desenvolva habilidades, construa currículo e impulsione o impacto ESG no Brasil.',
  image = 'https://raw.githubusercontent.com/brenerpompeorodrigues/brasil-sustenta/main/assets/cover-default-dark-premium.jpg', // Placeholder de segurança
  url = 'https://brasilsustenta.com.br',
  type = 'website',
  structuredData,
}: SEOProps) {

  const siteName = "Brasil Sustenta";
  const composedTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  // Default Organization JSON-LD if not overridden
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Brasil Sustenta",
    "url": "https://brasilsustenta.com.br",
    "logo": image,
    "description": "Rede de conexão entre talentos acadêmicos e projetos de inovação ODS e ESG do Pacto Global.",
    "sameAs": [
      "https://linkedin.com/company/brasilsustenta"
    ]
  };

  const schemaToInject = structuredData || defaultSchema;

  return (
    <Helmet>
      {/* Primeiras Tags */}
      <title>{composedTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <link rel="canonical" href={url} />

      {/* Opengraph / Social Sharing */}
      <meta property="og:title" content={composedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={composedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Tema Global & PWA */}
      <meta name="theme-color" content="#090909" />
      
      {/* GEO & Semantic (Schema.org JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(schemaToInject)}
      </script>
    </Helmet>
  );
}
