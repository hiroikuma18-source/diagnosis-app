import type { MetadataRoute } from "next";
import { supabase } from "./lib/supabase";

export const dynamic = "force-dynamic";

const BASE_URL = "https://diagnosis-lab.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: diagnoses } = await supabase
    .from("diagnoses")
    .select("slug")
    .order("display_order");

  const diagnosisUrls = (diagnoses ?? []).map((d) => ({
    url: `${BASE_URL}/diagnoses/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/category/personality`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/category/sidejob`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/category/strength`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...diagnosisUrls,
  ];
}
