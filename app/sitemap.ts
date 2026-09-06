import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/seo";
import { services } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/about",
    "/services",
    "/industries",
    "/insights",
    "/tools/self-assessment",
    "/contact",
    "/privacy-policy",
    "/investment-disclaimer",
  ];

  const serviceRoutes = services.map((service) => `/services/${service.slug}`);

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: `${baseUrl()}${route}`,
    lastModified: new Date(),
  }));
}