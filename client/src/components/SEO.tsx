import React from "react";
import { Helmet } from "react-helmet";
import { APP_LOGO } from "@/const";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "organization";
  structuredData?: Record<string, any>;
}

export function SEO({
  title = "Brasil Sustenta - Squads universitarios para desafios ESG com matching por IA",
  description = "Plataforma AI-first que conecta empresas, universidades e talentos para executar desafios ESG com squads, curadoria e entregas mensuraveis.",
  image = "https://raw.githubusercontent.com/brenerpompeorodrigues/brasil-sustenta/main/assets/cover-default-dark-premium.jpg", // Placeholder de segurança
  url = "https://brasilsustenta.com.br",
  type = "website",
  structuredData,
}: SEOProps) {
  const siteName = "Brasil Sustenta";
  const composedTitle = title.includes(siteName)
    ? title
    : `${title} | ${siteName}`;

  // Default Organization JSON-LD if not overridden
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Brasil Sustenta",
    url: "https://brasilsustenta.com.br",
    logo: image,
    description:
      "Plataforma AI-first que monta squads universitarios para desafios ESG reais de empresas.",
    sameAs: ["https://linkedin.com/company/brasilsustenta"],
  };

  const schemaToInject = structuredData || defaultSchema;

  return (
    <Helmet>
      {/* Primeiras Tags */}
      <title>{composedTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5"
      />
      <link rel="canonical" href={url} />
      <link rel="icon" href={APP_LOGO} />
      <link rel="apple-touch-icon" href={APP_LOGO} />

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
      <meta name="theme-color" content="#FBF8F1" />

      {/* GEO & Semantic (Schema.org JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(schemaToInject)}
      </script>
    </Helmet>
  );
}
