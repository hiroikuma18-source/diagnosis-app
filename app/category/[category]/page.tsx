import type { Metadata } from "next";
import Link from "next/link";
import { getDiagnoses } from "../../lib/db";

type PageProps = {
  params: Promise<{ category: string }>;
};

const categoryMeta: Record<string, { title: string; description: string }> = {
  personality: { title: "性格診断", description: "あなたの性格タイプや強みがわかる診断を集めました。" },
  sidejob: { title: "副業診断", description: "あなたに向いている副業タイプがわかる診断を集めました。" },
  strength: { title: "強み診断", description: "あなたの強みや得意分野がわかる診断を集めました。" },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const meta = categoryMeta[category];
  if (!meta) return { title: "カテゴリ" };
  return {
    title: `${meta.title}一覧 | 診断サイト`,
    description: meta.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const meta = categoryMeta[category];
  const allDiagnoses = await getDiagnoses();
  const filtered = allDiagnoses.filter((d) => d.category === category);

  if (!meta || filtered.length === 0) {
    return (
      <main className="px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
          <h1 className="text-2xl font-bold text-slate-900">カテゴリが見つかりません</h1>
          <Link href="/" className="mt-6 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90">
            ホームに戻る
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link href="/" className="text-sm text-slate-500 transition hover:text-slate-700">← ホームに戻る</Link>
          <p className="mt-4 mb-2 text-sm font-semibold text-rose-500">CATEGORY</p>
          <h1 className="text-3xl font-bold text-slate-900">{meta.title}一覧</h1>
          <p className="mt-2 text-base text-slate-600">{meta.description}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {filtered.map((d) => (
            <Link
              key={d.slug}
              href={`/diagnoses/${d.slug}`}
              className="group rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="mb-3 inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-500">
                {d.categoryLabel}
              </span>
              <h2 className="mb-3 mt-3 text-xl font-semibold text-slate-900 transition group-hover:text-rose-500">
                {d.title}
              </h2>
              <p className="mb-4 text-sm leading-7 text-slate-600">{d.description}</p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">{d.questionCountLabel}</span>
                <span className="rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">{d.durationLabel}</span>
                <span className="rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">無料</span>
              </div>
              <div className="mt-4 text-sm font-semibold text-rose-500">無料で診断する →</div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <p className="mb-4 text-sm font-semibold text-slate-500">他のカテゴリも見てみよう</p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(categoryMeta).filter(([key]) => key !== category).map(([key, value]) => (
              <Link key={key} href={`/category/${key}`} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 ring-1 ring-slate-200 transition hover:bg-rose-50 hover:text-rose-500">
                {value.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
