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
      <main className="p-8">
        <h1 className="text-2xl font-bold">診断が見つかりません</h1>
      </main>
    );
  }

  if (result) {
    return (
      <main className="p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">
          あなたは「{result}」です！
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          {resultDescriptions[result] ||
            "バランスがよく、柔軟に対応できるタイプです。"}
        </p>

        <a
          href={`https://twitter.com/intent/tweet?text=あなたは「${result}」タイプでした！あなたはどのタイプ？&url=http://localhost:3000/diagnoses/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-4 bg-blue-500 text-white px-6 py-3 rounded"
        >
          Xでシェアする
        </a>

        {diagnosis.slug === "sidejob-type" && (
          <div className="mt-8">
            <p className="mb-4 text-lg font-semibold">
              あなたにおすすめの副業はこちら👇
            </p>

            <a
              href={affiliateLinks[result] || "https://example.com/default"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
            >
              無料で副業をチェックする
            </a>
          </div>
        )}

        <button
          onClick={() => {
            setStarted(false);
            setStep(0);
            setAnswers([]);
            setResult(null);
          }}
          className="bg-black text-white px-6 py-3 rounded"
        >
          もう一度診断する
        </button>
      </main>
    );
  }

  if (!started) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-md border p-8 text-center">
            <p className="text-sm text-gray-500 mb-2">診断コンテンツ</p>

            <h1 className="text-3xl font-bold mb-4">{diagnosis.title}</h1>

            <p className="text-gray-600 leading-7 mb-8">
              {diagnosis.description}
            </p>

            <div className="flex justify-center gap-4 text-sm text-gray-500 mb-8">
              <span className="border rounded-full px-4 py-2">
                質問数: {diagnosis.questionCountLabel}
              </span>
              <span className="border rounded-full px-4 py-2">
                所要時間: {diagnosis.durationLabel}
              </span>
            </div>

            <button
              onClick={() => setStarted(true)}
              className="bg-black text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:opacity-90 transition"
            >
              診断を始める
            </button>
          </div>
        </div>
      </main>
    );
  }

  const question = diagnosis.questions[step];

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">
        Q{step + 1}. {question.text}
      </h2>

      <div className="space-y-3">
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
            className="w-full border p-4 rounded hover:bg-gray-100"
          >
            {choice.text}
          </button>
        ))}
      </div>
    </main>
  );
}