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

  return {
    title: diagnosis?.seoTitle || "診断ページ",
    description: diagnosis?.seoDescription || "診断コンテンツです",
  };
}

export default function DiagnosisPage() {
  return <DiagnosisClient />;
}