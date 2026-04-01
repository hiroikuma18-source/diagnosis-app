import Link from "next/link";
import { getDiagnoses } from "./lib/db";

export const dynamic = "force-dynamic";

const categories = [
  {
    key: "personality",
    label: "性格診断",
    description: "自分の性格タイプや行動パターンを知る",
    color: "bg-rose-50 text-rose-500",
  },
  {
    key: "sidejob",
    label: "副業診断",
    description: "あなたに向いている副業の種類がわかる",
    color: "bg-sky-50 text-sky-500",
  },
  {
    key: "strength",
    label: "強み診断",
    description: "自分の得意分野や活かし方を発見する",
    color: "bg-emerald-50 text-emerald-600",
  },
];

export default async function Home() {
  const diagnoses = await getDiagnoses();

  return (
    <main className="bg-gradient-to-b from-rose-50 via-white to-sky-50">

      {/* ヒーロー */}
      <section className="px-4 pt-14 pb-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
                累計3種類の無料診断が揃う診断サイト
              </p>
              <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                性格・強み・副業タイプが
                <br />
                1分でわかる無料診断サイト
              </h1>
              <p className="max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                簡単な質問に答えるだけで、あなたの性格・強み・向いている副業がわかります。
                シェアして友達と比べてみよう。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/diagnoses/personality-type"
                  className="inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  無料で診断する（1分）
                </Link>
                <Link
                  href="#diagnoses"
                  className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
                >
                  診断一覧を見る
                </Link>
              </div>
            </div>

            <div className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="mb-4 text-sm font-semibold text-slate-500">人気の診断</p>
              <div className="space-y-4">
                {diagnoses.slice(0, 3).map((d, index) => (
                  <Link
                    key={d.slug}
                    href={`/diagnoses/${d.slug}`}
                    className="block rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-slate-300 hover:bg-white"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
                        人気 {index + 1}
                      </span>
                      <span className="text-xs text-slate-400">{d.durationLabel}</span>
                    </div>
                    <h2 className="mb-1 text-base font-semibold text-slate-900">{d.title}</h2>
                    <p className="text-sm leading-6 text-slate-600">{d.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* カテゴリ */}
      <section className="bg-white px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="mb-2 text-sm font-semibold text-rose-500">CATEGORY</p>
            <h2 className="text-2xl font-bold text-slate-900">カテゴリから探す</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.key}
                href={`/category/${cat.key}`}
                className="group rounded-[24px] bg-slate-50 p-6 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className={`mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${cat.color}`}>
                  {cat.label}
                </span>
                <p className="mt-2 text-sm leading-6 text-slate-600">{cat.description}</p>
                <p className="mt-3 text-sm font-semibold text-slate-900 transition group-hover:text-rose-500">
                  一覧を見る →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 診断一覧 */}
      <section id="diagnoses" className="px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-semibold text-rose-500">DIAGNOSES</p>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">診断一覧</h2>
            </div>
            <p className="hidden text-sm text-slate-500 sm:block">気になるテーマから自由に選べます</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {diagnoses.map((d, index) => (
              <Link
                key={d.slug}
                href={`/diagnoses/${d.slug}`}
                className="group rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-500">
                    {d.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-400">No.{index + 1}</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold leading-8 text-slate-900 transition group-hover:text-rose-500">
                  {d.title}
                </h3>
                <p className="mb-5 text-sm leading-7 text-slate-600">{d.description}</p>
                <div className="mb-5 flex flex-wrap gap-2 text-xs text-slate-500">
                  <span className="rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">{d.questionCountLabel}</span>
                  <span className="rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">{d.durationLabel}</span>
                  <span className="rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">無料</span>
                </div>
                <div className="text-sm font-semibold text-rose-500">無料で診断する →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
