"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { diagnoses } from "../../lib/diagnoses";
import { calculateResult } from "../../lib/diagnosis-utils";
import QuestionRenderer from "../../components/QuestionRenderer";
import ResultRenderer from "../../components/ResultRenderer";
import Link from "next/link";

export default function DiagnosisClient() {
  const params = useParams();
  const slug = params.slug as string;

  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>[]>([]);
  const [resultLabel, setResultLabel] = useState<string | null>(null);

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

  if (resultLabel) {
    const detail = diagnosis.results[resultLabel] ?? {
      description: "バランスがよく、柔軟に対応できるタイプです。",
      reason: "複数の特性がバランスよく組み合わさっています。",
      strengths: [
        "柔軟性がある",
        "バランス感覚に優れている",
        "幅広い状況に対応できる",
      ],
      weaknesses: [
        "突出した強みを見つけにくいことも",
        "方向性に迷うことも",
      ],
      suitableOptions: ["幅広い職種・分野"],
      nextStep:
        "様々な経験を積んで、自分の得意を見つけていこう。",
    };

    return (
      <ResultRenderer
        resultLabel={resultLabel}
        detail={detail}
        diagnosis={diagnosis}
        onRetry={() => {
          setStarted(false);
          setStep(0);
          setAnswers([]);
          setResultLabel(null);
        }}
      />
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

              <div className="mt-6 flex flex-wrap gap-3">
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
                  無料で診断する（1分）
                </button>
              </div>
            </div>

            <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <p className="mb-3 text-sm font-semibold text-rose-500">POINT</p>
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
                  強み・弱みまで詳しくわかる
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-[28px] bg-white p-6 ring-1 ring-slate-200">
            <p className="mb-4 text-sm font-semibold text-slate-500">他の診断も見てみよう</p>
            <div className="flex flex-wrap gap-3">
              {diagnoses.filter((d) => d.slug !== slug).map((d) => (
                <Link
                  key={d.slug}
                  href={`/diagnoses/${d.slug}`}
                  className="rounded-full bg-slate-50 px-4 py-2 text-sm text-slate-600 ring-1 ring-slate-200 transition hover:bg-rose-50 hover:text-rose-500"
                >
                  {d.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  const question = diagnosis.questions[step];

  return (
    <main className="px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <QuestionRenderer
          question={question}
          step={step}
          total={diagnosis.questions.length}
          onAnswer={(scores) => {
            const newAnswers = [...answers, scores];
            setAnswers(newAnswers);

            if (step + 1 < diagnosis.questions.length) {
              setStep(step + 1);
            } else {
              const scoreKey = calculateResult(newAnswers);
              const label = diagnosis.resultMap[scoreKey] || "バランス型";
              setResultLabel(label);
            }
          }}
        />
      </div>
    </main>
  );
}
