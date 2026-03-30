import type { Metadata } from "next";
import { diagnoses } from "../../lib/diagnoses";
import DiagnosisClient from "./DiagnosisClient";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const diagnosis = diagnoses.find((item) => item.slug === slug);
  const title = diagnosis?.seoTitle || "診断ページ";
  const description = diagnosis?.seoDescription || "診断コンテンツです";
  const url = `https://diagnosis-app-xi.vercel.app/diagnoses/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "診断サイト",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function DiagnosisPage() {
  return <DiagnosisClient />;
}
