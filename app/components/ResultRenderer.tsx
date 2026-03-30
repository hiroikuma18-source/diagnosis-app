import Link from "next/link";
import type { Diagnosis, ResultDetail } from "../lib/types";
import { diagnoses } from "../lib/diagnoses";

interface Props {
  resultLabel: string;
  detail: ResultDetail;
  diagnosis: Diagnosis;
  onRetry: () => void;
}

export default function ResultRenderer({ resultLabel, detail, diagnosis, onRetry }: Props) {
  const otherDiagnoses = diagnoses.filter((d) => d.slug !== diagnosis.slug).slice(0, 3);
  const shareText = `私は「${resultLabel}」タイプでした！あなたはどのタイプ？`;
  const shareUrl = `https://diagnosis-app-xi.vercel.app/diagnoses/${diagnosis.slug}`;

  return (
    <main className="px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-5">

        {/* タイプ */}
        <div className="rounded-[32px] bg-white p-8 text-center shadow-sm ring-1 ring-slate-200 sm:p-10">
          <p className="mb-3 inline-flex rounded-full bg-rose-50 px-4 py-2 text-sm font-medium text-rose-500">
            診断結果
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            あなたは「{resultLabel}」です！
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600">
            {detail.description}
          </p>
        </div>

        {/* なぜこのタイプ？ */}
        <div className="rounded-[28px] bg-amber-50 p-6 ring-1 ring-amber-100">
          <p className="mb-2 text-sm font-semibold text-amber-600">なぜこのタイプ？</p>
          <p className="text-base leading-7 text-slate-700">{detail.reason}</p>
        </div>

        {/* 強み・注意点 */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[28px] bg-emerald-50 p-6 ring-1 ring-emerald-100">
            <p className="mb-3 text-sm font-semibold text-emerald-600">強み</p>
            <ul className="space-y-2">
              {detail.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 shrink-0 text-emerald-500">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] bg-rose-50 p-6 ring-1 ring-rose-100">
            <p className="mb-3 text-sm font-semibold text-rose-500">注意点</p>
            <ul className="space-y-2">
              {detail.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 shrink-0 text-rose-400">!</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 向いている選択肢 */}
        <div className="rounded-[28px] bg-sky-50 p-6 ring-1 ring-sky-100">
          <p className="mb-3 text-sm font-semibold text-sky-600">向いている選択肢</p>
          <div className="flex flex-wrap gap-2">
            {detail.suitableOptions.map((opt, i) => (
              <span
                key={i}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-sky-200"
              >
                {opt}
              </span>
            ))}
          </div>
        </div>

        {/* 次の一手 */}
        <div className="rounded-[28px] bg-gradient-to-br from-rose-50 to-sky-50 p-6 ring-1 ring-slate-200">
          <p className="mb-2 text-sm font-semibold text-slate-500">次の一手</p>
          <p className="mb-4 text-base leading-7 text-slate-800">{detail.nextStep}</p>
          {detail.affiliateLink && (
            <a
              href={detail.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              今すぐチェックする（無料）
            </a>
          )}
        </div>

        {/* シェア */}
        <div className="rounded-[28px] bg-white p-6 text-center ring-1 ring-slate-200">
          <p className="mb-1 text-sm font-semibold text-slate-700">結果をシェアして友達と比べよう</p>
          <p className="mb-4 text-xs text-slate-400">「{resultLabel}」タイプだったよ！あなたは？</p>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Xでシェアする
          </a>
        </div>

        {/* 他の診断 */}
        <div className="rounded-[28px] bg-white p-6 ring-1 ring-slate-200">
          <p className="mb-4 text-base font-semibold text-slate-900">他の診断もおすすめ</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {otherDiagnoses.map((d) => (
              <Link
                key={d.slug}
                href={`/diagnoses/${d.slug}`}
                className="rounded-2xl bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700 transition hover:bg-rose-50 hover:text-rose-500"
              >
                {d.title}
              </Link>
            ))}
          </div>
        </div>

        {/* もう一度 */}
        <div className="text-center">
          <button
            onClick={onRetry}
            className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            もう一度診断する
          </button>
        </div>

      </div>
    </main>
  );
}
