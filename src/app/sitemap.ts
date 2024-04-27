import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://otsecret.xyz",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://otsecret.xyz/faq",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://otsecret.xyz/v",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.8,
    },
  ];
}
