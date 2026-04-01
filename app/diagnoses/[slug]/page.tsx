import type { Metadata } from "next";
import { getDiagnosisBySlug, getDiagnoses } from "../../lib/db";
import DiagnosisClient from "./DiagnosisClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const diagnosis = await getDiagnosisBySlug(slug);
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

export default async function DiagnosisPage({ params }: PageProps) {
  const { slug } = await params;
  const [diagnosis, allDiagnoses] = await Promise.all([
    getDiagnosisBySlug(slug),
    getDiagnoses(),
  ]);
  const otherDiagnoses = allDiagnoses.filter((d) => d.slug !== slug);

  return <DiagnosisClient diagnosis={diagnosis} otherDiagnoses={otherDiagnoses} />;
}
