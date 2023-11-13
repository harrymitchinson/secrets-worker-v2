import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/v/",
    },
    sitemap: "https://acme.com/sitemap.xml",
  };
}
