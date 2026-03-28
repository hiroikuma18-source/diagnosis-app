import Link from "next/link";
import { diagnoses } from "./lib/diagnoses";

const categoryLabels: Record<string, string> = {
  "personality-type": "性格診断",
  "sidejob-type": "副業診断",
  "strength-type": "強み診断",
};

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-rose-50 via-white to-sky-50">
      <section className="px-4 pt-12 pb-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
                1分でわかる無料診断サイト
              </p>

              <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                自分に合うタイプが見つかる
                <br />
                やさしい診断サイト
              </h1>

              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                性格・強み・向いている副業などを、簡単な質問に答えるだけで診断できます。
                迷ったときや、自分を知りたいときに気軽に試せるコンテンツを集めました。
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/diagnoses/personality-type"
                  className="inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  人気の性格診断をはじめる
                </Link>

                <Link
                  href="/diagnoses/strength-type"
                  className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
                >
                  強み診断を見る
                </Link>
              </div>
            </div>

            <div className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="mb-4 text-sm font-semibold text-slate-500">
                人気の診断
              </p>

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
                      <span className="text-xs text-slate-400">
                        {d.durationLabel}
                      </span>
                    </div>

                    <h2 className="mb-2 text-base font-semibold text-slate-900">
                      {d.title}
                    </h2>

                    <p className="text-sm leading-6 text-slate-600">
                      {d.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-semibold text-rose-500">
                DIAGNOSES
              </p>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                診断一覧
              </h2>
            </div>
            <p className="hidden text-sm text-slate-500 sm:block">
              気になるテーマから自由に選べます
            </p>
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
                    {categoryLabels[d.slug] || "診断"}
                  </span>
                  <span className="text-xs text-slate-400">
                    No.{index + 1}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-semibold leading-8 text-slate-900 transition group-hover:text-rose-500">
                  {d.title}
                </h3>

                <p className="mb-5 text-sm leading-7 text-slate-600">
                  {d.description}
                </p>

                <div className="mb-5 flex flex-wrap gap-2 text-xs text-slate-500">
                  <span className="rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
                    {d.questionCountLabel}
                  </span>
                  <span className="rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
                    {d.durationLabel}
                  </span>
                  <span className="rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
                    無料
                  </span>
                </div>

                <div className="text-sm font-semibold text-slate-900">
                  診断をはじめる →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}