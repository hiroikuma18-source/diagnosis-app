"use client";

import { useState } from "react";
import { importDiagnosis } from "./actions";
import Link from "next/link";

const TEMPLATE = JSON.stringify(
  {
    slug: "new-diagnosis",
    category: "personality",
    categoryLabel: "性格診断",
    title: "新しい診断タイトル",
    description: "診断の説明文をここに書く",
    seoTitle: "SEOタイトル｜キャッチコピー",
    seoDescription: "SEO用の説明文",
    questionCountLabel: "6問",
    durationLabel: "約1分",
    displayOrder: 99,
    questions: [
      {
        order: 1,
        text: "質問文をここに書く",
        choices: [
          { text: "選択肢A", scores: { typeA: 2 } },
          { text: "選択肢B", scores: { typeB: 2 } },
        ],
      },
      {
        order: 2,
        text: "2問目の質問",
        choices: [
          { text: "選択肢A", scores: { typeA: 2 } },
          { text: "選択肢B", scores: { typeC: 2 } },
        ],
      },
    ],
    results: [
      {
        scoreKey: "typeA",
        label: "Aタイプ",
        description: "Aタイプの説明",
        reasons: ["理由1", "理由2", "理由3"],
        failurePattern: "このタイプがやりがちな失敗",
        sevenDayPlan: [
          "Day1: やること",
          "Day2: やること",
          "Day3: やること",
          "Day4: やること",
          "Day5: やること",
          "Day6: やること",
          "Day7: やること",
        ],
        actionFree: "無料でできること",
        actionLowCost: "低コストでできること",
        actionFastest: "最短でできること",
        serviceDescription: "おすすめサービスの説明",
        affiliateLink: "https://example.com",
      },
      {
        scoreKey: "typeB",
        label: "Bタイプ",
        description: "Bタイプの説明",
        reasons: ["理由1", "理由2", "理由3"],
        failurePattern: "このタイプがやりがちな失敗",
        sevenDayPlan: [
          "Day1: やること",
          "Day2: やること",
          "Day3: やること",
          "Day4: やること",
          "Day5: やること",
          "Day6: やること",
          "Day7: やること",
        ],
        actionFree: "無料でできること",
        actionLowCost: "低コストでできること",
        actionFastest: "最短でできること",
        serviceDescription: "おすすめサービスの説明",
        affiliateLink: "https://example.com",
      },
    ],
  },
  null,
  2
);

export default function ImportPage() {
  const [json, setJson] = useState("");
  const [mode, setMode] = useState<"create" | "update">("create");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData();
    formData.set("json", json);
    formData.set("mode", mode);
    const result = await importDiagnosis(formData);

    if (result.success) {
      setStatus("success");
      setMessage(`「${result.title}」を登録しました！`);
      setJson("");
    } else {
      setStatus("error");
      setMessage(result.error);
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <Link href="/admin" className="text-sm text-slate-500 hover:text-slate-700">
          ← 一覧に戻る
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">一括インポート</h1>
        <p className="mt-1 text-sm text-slate-500">
          JSONを貼り付けるだけで診断・質問・結果をまとめて登録できます
        </p>
      </div>

      {status === "success" && (
        <div className="mb-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          ✓ {message}
          <Link href="/admin" className="ml-3 underline">
            一覧を確認する
          </Link>
        </div>
      )}
      {status === "error" && (
        <div className="mb-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">
          エラー: {message}
        </div>
      )}

      <div className="mb-4 flex rounded-full bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => setMode("create")}
          className={`flex-1 rounded-full py-2 text-sm font-semibold transition ${
            mode === "create"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          新規作成
        </button>
        <button
          type="button"
          onClick={() => setMode("update")}
          className={`flex-1 rounded-full py-2 text-sm font-semibold transition ${
            mode === "update"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          既存を更新
        </button>
      </div>

      {mode === "update" && (
        <div className="mb-4 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
          既存の診断をJSONで上書きします。slugが一致する診断を削除して再登録します。
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="rounded-[24px] bg-white p-6 ring-1 ring-slate-200">
          <div className="mb-3 flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700">
              JSON を貼り付ける
            </label>
            <button
              type="button"
              onClick={() => setJson(TEMPLATE)}
              className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-200"
            >
              テンプレートを使う
            </button>
          </div>
          <textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            placeholder="ここにJSONを貼り付けてください..."
            rows={20}
            required
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-xs text-slate-700 outline-none focus:border-slate-400 focus:bg-white"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading" || !json}
          className="w-full rounded-full bg-slate-900 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
        >
          {status === "loading"
            ? "処理中..."
            : mode === "create"
            ? "新規登録する"
            : "上書き更新する"}
        </button>
      </form>

      {/* フォーマット説明 */}
      <div className="mt-8 rounded-[24px] bg-slate-50 p-6 ring-1 ring-slate-200">
        <p className="mb-3 text-sm font-semibold text-slate-700">JSONフォーマットの説明</p>
        <dl className="space-y-2 text-xs text-slate-600">
          <div className="flex gap-3">
            <dt className="w-40 shrink-0 font-medium text-slate-700">slug</dt>
            <dd>URLになる文字列（例: programming-type）</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-40 shrink-0 font-medium text-slate-700">category</dt>
            <dd>personality / sidejob / strength のいずれか</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-40 shrink-0 font-medium text-slate-700">questions[].scores</dt>
            <dd>例: {`{"typeA": 2}`}（キーと点数）</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-40 shrink-0 font-medium text-slate-700">results[].scoreKey</dt>
            <dd>scoresのキーと一致させる（例: typeA）</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-40 shrink-0 font-medium text-slate-700">affiliateLink</dt>
            <dd>不要な場合は省略OK</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
