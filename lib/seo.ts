/**
 * دوال البيانات المنظمة (Schema.org) للموقع.
 * تُرجع كائنات عادية ويقوم مكوّن JsonLd بتحويلها إلى نص.
 */
import { site } from "./content";

export function baseUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://isg-advisory.com").replace(/\/+$/, "");
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.nameAr,
    alternateName: site.shortcut,
    url: baseUrl(),
    description: site.descriptor,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "الرياض",
      addressCountry: "SA",
    },
    sameAs: [site.linkedin],
  };
}

export function financialServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "FinancialService"],
    name: site.activity,
    description: site.descriptor,
    provider: {
      "@type": "Organization",
      name: site.nameAr,
      url: baseUrl(),
    },
    areaServed: { "@type": "Country", name: "السعودية" },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl()}${item.path}`,
    })),
  };
}

export function serviceJsonLd(arg: {
  slug: string;
  title: string;
  promise: string;
  broader: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: arg.title,
    description: arg.broader || arg.promise,
    url: `${baseUrl()}/services/${arg.slug}`,
    serviceType: arg.title,
    provider: {
      "@type": "Organization",
      name: site.nameAr,
      url: baseUrl(),
    },
    areaServed: { "@type": "Country", name: "السعودية" },
    offers: {
      "@type": "Offer",
      url: `${baseUrl()}/services/${arg.slug}`,
      availability: "https://schema.org/InStock",
      priceCurrency: "SAR",
    },
  };
}