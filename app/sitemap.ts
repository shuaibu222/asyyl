import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/sms/", "/bms/", "/services/", "/contact/"].map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: "monthly",
  }));
}
