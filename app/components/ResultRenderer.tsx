"use client";

import Link from "next/link";
import type { Diagnosis, DiagnosisSummary, ResultDetail } from "../lib/types";

interface Props {
  resultLabel: string;
  detail: ResultDetail;
  diagnosis: Diagnosis;
  otherDiagnoses: DiagnosisSummary[];
  onRetry: () => void;
}

export default function ResultRenderer({
  resultLabel,
  detail,
  diagnosis,
  otherDiagnoses,
  onRetry,
}: Props) {
  const shareText = `私は「${resultLabel}」タイプでした！あなたはどのタイプ？`;
  const shareUrl = `${window.location.origin}/diagnoses/${diagnosis.slug}`;

  return (
    <main className="px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-5">

        {/* ① 結果表示 */}
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

        {/* ② 根拠 */}
        <div className="rounded-[28px] bg-amber-50 p-6 ring-1 ring-amber-100">
          <p className="mb-3 text-sm font-semibold text-amber-600">
            なぜこのタイプ？（根拠）
          </p>
          <ul className="space-y-2">
            {detail.reasons.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-7 text-slate-700">
                <span className="mt-0.5 shrink-0 font-bold text-amber-500">
                  {i + 1}.
                </span>
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* ③ 失敗パターン */}
        <div className="rounded-[28px] bg-rose-50 p-6 ring-1 ring-rose-100">
          <p className="mb-2 text-sm font-semibold text-rose-500">
            このタイプがやりがちな失敗
          </p>
          <p className="text-sm leading-7 text-slate-700">{detail.failurePattern}</p>
        </div>

        {/* ④ 7日間プラン */}
        <div className="rounded-[28px] bg-white p-6 ring-1 ring-slate-200">
          <p className="mb-4 text-sm font-semibold text-slate-700">
            今日からの7日間プラン
          </p>
          <ol className="space-y-3">
            {detail.sevenDayPlan.map((plan, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-sm leading-6 text-slate-700">{plan.replace(/^Day\d+: /, "")}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* ⑤ 行動の選択肢 */}
        <div className="rounded-[28px] bg-sky-50 p-6 ring-1 ring-sky-100">
          <p className="mb-4 text-sm font-semibold text-sky-600">行動の選択肢</p>
          <div className="space-y-3">
            <div className="rounded-2xl bg-white p-4 ring-1 ring-sky-100">
              <p className="mb-1 text-xs font-semibold text-emerald-600">無料でやる</p>
              <p className="text-sm text-slate-700">{detail.actionOptions.free}</p>
            </div>
            <div className="rounded-2xl bg-white p-4 ring-1 ring-sky-100">
              <p className="mb-1 text-xs font-semibold text-sky-600">低コストでやる</p>
              <p className="text-sm text-slate-700">{detail.actionOptions.lowCost}</p>
            </div>
            <div className="rounded-2xl bg-white p-4 ring-1 ring-sky-100">
              <p className="mb-1 text-xs font-semibold text-rose-500">最短でやる</p>
              <p className="text-sm text-slate-700">{detail.actionOptions.fastest}</p>
            </div>
          </div>
        </div>

        {/* ⑥ サービス提案 */}
        {(detail.serviceDescription || detail.serviceProposals.length > 0) && (
          <div className="space-y-4">
            {detail.serviceDescription && (
              <p className="px-2 text-sm text-slate-500">{detail.serviceDescription}</p>
            )}
            {detail.serviceProposals.map((proposal, i) => (
              <div key={i} className="rounded-[28px] bg-gradient-to-br from-rose-50 to-sky-50 p-6 ring-1 ring-slate-200">
                {proposal.title && (
                  <p className="mb-3 text-sm font-semibold text-slate-500">{proposal.title}</p>
                )}
                {proposal.banner ? (
                  <div dangerouslySetInnerHTML={{ __html: proposal.banner }} />
                ) : proposal.link ? (
                  <a
                    href={proposal.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    {proposal.linkLabel || "今すぐチェックする（無料）"}
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        )}

        {/* シェア */}
        <div className="rounded-[28px] bg-white p-6 text-center ring-1 ring-slate-200">
          <p className="mb-1 text-sm font-semibold text-slate-700">
            結果をシェアして友達と比べよう
          </p>
          <p className="mb-4 text-xs text-slate-400">
            「{resultLabel}」タイプだったよ！あなたは？
          </p>
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
        {otherDiagnoses.length > 0 && (
          <div className="rounded-[28px] bg-white p-6 ring-1 ring-slate-200">
            <p className="mb-4 text-base font-semibold text-slate-900">
              他の診断もおすすめ
            </p>
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
        )}

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
