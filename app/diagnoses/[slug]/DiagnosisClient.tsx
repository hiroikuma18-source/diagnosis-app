"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { diagnoses } from "../../lib/diagnoses";
import { resultDescriptions } from "../../lib/result-descriptions";
import { affiliateLinks } from "../../lib/affiliate-links";
import { resultMaps } from "../../lib/result-maps";

export default function DiagnosisClient() {
  const params = useParams();
  const slug = params.slug as string;

  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const calculateResult = (answers: Record<string, number>[]) => {
    const total: Record<string, number> = {};

    answers.forEach((ans) => {
      Object.entries(ans).forEach(([key, value]) => {
        total[key] = (total[key] || 0) + Number(value);
      });
    });

    let maxKey = "";
    let maxValue = -Infinity;

    Object.entries(total).forEach(([key, value]) => {
      if (value > maxValue) {
        maxKey = key;
        maxValue = value;
      }
    });

    return maxKey;
  };

  const diagnosis = diagnoses.find((item) => item.slug === slug);

  if (!diagnosis) {
    return (
      <main className="px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
          <h1 className="text-2xl font-bold text-slate-900">
            診断が見つかりません
          </h1>
        </div>
      </main>
    );
  }

  if (result) {
    return (
      <main className="px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-10">
            <div className="mb-6 text-center">
              <p className="mb-3 inline-flex rounded-full bg-rose-50 px-4 py-2 text-sm font-medium text-rose-500">
                診断結果
              </p>

              <h1 className="mb-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                あなたは「{result}」です！
              </h1>

              <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600">
                {resultDescriptions[result] ||
                  "バランスがよく、柔軟に対応できるタイプです。"}
              </p>
            </div>

            <div className="mx-auto mb-8 max-w-xl rounded-3xl bg-gradient-to-br from-rose-50 to-sky-50 p-6 ring-1 ring-slate-200">
              <p className="mb-2 text-sm font-semibold text-slate-500">
                あなたの結果をシェア
              </p>
              <a
                href={`https://twitter.com/intent/tweet?text=あなたは「${result}」タイプでした！あなたはどのタイプ？&url=https://diagnosis-app-xi.vercel.app/diagnoses/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Xでシェアする
              </a>
            </div>

            {diagnosis.slug === "sidejob-type" && (
              <div className="mx-auto mb-8 max-w-xl rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <p className="mb-3 text-lg font-semibold text-slate-900">
                  あなたにピッタリの副業が今すぐ始められます👇
                </p>

                <a
                  href={affiliateLinks[result] || "https://example.com/default"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  無料で副業をチェックする
                </a>
              </div>
            )}

            <div className="mx-auto mb-8 max-w-xl rounded-3xl bg-white p-6 ring-1 ring-slate-200">
              <p className="mb-4 text-base font-semibold text-slate-900">
                他の診断もおすすめ👇
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                <a
                  href="/diagnoses/personality-type"
                  className="rounded-2xl bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700 transition hover:bg-rose-50 hover:text-rose-500"
                >
                  性格診断
                </a>

                <a
                  href="/diagnoses/strength-type"
                  className="rounded-2xl bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700 transition hover:bg-rose-50 hover:text-rose-500"
                >
                  強み診断
                </a>

                <a
                  href="/diagnoses/sidejob-type"
                  className="rounded-2xl bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700 transition hover:bg-rose-50 hover:text-rose-500"
                >
                  副業診断
                </a>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setStarted(false);
                  setStep(0);
                  setAnswers([]);
                  setResult(null);
                }}
                className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                もう一度診断する
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!started) {
    return (
      <main className="px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
                無料診断コンテンツ
              </p>

              <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-slate-900">
                {diagnosis.title}
              </h1>

              <p className="max-w-2xl text-base leading-8 text-slate-600">
                {diagnosis.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-500 ring-1 ring-slate-200">
                  質問数: {diagnosis.questionCountLabel}
                </span>
                <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-500 ring-1 ring-slate-200">
                  所要時間: {diagnosis.durationLabel}
                </span>
                <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-500 ring-1 ring-slate-200">
                  無料
                </span>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setStarted(true)}
                  className="inline-flex rounded-full bg-slate-900 px-8 py-4 text-base font-semibold text-white transition hover:opacity-90"
                >
                  診断をはじめる
                </button>
              </div>
            </div>

            <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <p className="mb-3 text-sm font-semibold text-rose-500">
                POINT
              </p>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                1分でサクッとわかる
              </h2>
              <p className="mb-6 text-sm leading-7 text-slate-600">
                直感で答えられる質問だけなので、気軽に診断できます。
                今の自分のタイプを知りたいときにぴったりです。
              </p>

              <div className="space-y-3">
                <div className="rounded-2xl bg-rose-50 px-4 py-4 text-sm text-slate-700">
                  やさしい質問設計
                </div>
                <div className="rounded-2xl bg-sky-50 px-4 py-4 text-sm text-slate-700">
                  スマホでも見やすい
                </div>
                <div className="rounded-2xl bg-amber-50 px-4 py-4 text-sm text-slate-700">
                  結果がすぐわかる
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const question = diagnosis.questions[step];
  const progress = ((step + 1) / diagnosis.questions.length) * 100;

  return (
    <main className="px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-10">
          <div className="mb-8">
            <p className="mb-3 text-sm font-semibold text-rose-500">
              QUESTION {step + 1}
            </p>

            <div className="mb-4 h-3 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose-400 to-sky-400 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
              <span>
                {step + 1} / {diagnosis.questions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>

            <h2 className="mt-6 text-2xl font-bold leading-10 text-slate-900 sm:text-3xl">
              {question.text}
            </h2>
          </div>

          <div className="space-y-4">
            {question.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => {
                  const newAnswers: Record<string, number>[] = [
                    ...answers,
                    choice.scores as unknown as Record<string, number>,
                  ];
                  setAnswers(newAnswers);

                  if (step + 1 < diagnosis.questions.length) {
                    setStep(step + 1);
                  } else {
                    const resultKey = calculateResult(newAnswers);
                    const resultMap = resultMaps[diagnosis.slug] || {};
                    setResult(resultMap[resultKey] || "バランス型");
                  }
                }}
                className="group w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5 text-left transition hover:border-rose-300 hover:bg-white hover:shadow-sm"
              >
                <span className="text-base font-medium text-slate-800 transition group-hover:text-rose-500">
                  {choice.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}