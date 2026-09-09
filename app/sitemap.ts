import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/seo";
import { services, insightsArticles } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/about",
    "/services",
    "/industries",
    "/case-studies",
    "/insights",
    "/tools/self-assessment",
    "/contact",
    "/privacy-policy",
    "/investment-disclaimer",
  ];

  const serviceRoutes = services.map((service) => `/services/${service.slug}`);
  const articleRoutes = insightsArticles.map((article) => `/insights/${article.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...articleRoutes].map((route) => ({
    url: `${baseUrl()}${route}`,
    lastModified: new Date(),
  }));
}