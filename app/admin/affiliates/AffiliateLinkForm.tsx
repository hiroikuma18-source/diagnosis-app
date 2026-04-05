"use client";

import { useState } from "react";
import { updateServiceProposals } from "../actions";
import type { ServiceProposal } from "../../lib/types";

interface Props {
  resultTypeId: string;
  label: string;
  currentProposals: ServiceProposal[];
}

const emptyProposal = (): ServiceProposal => ({
  title: "",
  link: "",
  linkLabel: "今すぐチェックする（無料）",
  banner: "",
});

export default function AffiliateLinkForm({ resultTypeId, label, currentProposals }: Props) {
  const [proposals, setProposals] = useState<ServiceProposal[]>(currentProposals);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  function addProposal() {
    setProposals((prev) => [...prev, emptyProposal()]);
  }

  function removeProposal(index: number) {
    setProposals((prev) => prev.filter((_, i) => i !== index));
  }

  function updateProposal(index: number, field: keyof ServiceProposal, value: string) {
    setProposals((prev) => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
  }

  async function handleSave() {
    setStatus("saving");
    await updateServiceProposals(resultTypeId, proposals);
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <div className="rounded-2xl border border-slate-100 p-4">
      <p className="mb-3 text-sm font-semibold text-slate-700">{label}</p>
      <div className="space-y-3">
        {proposals.map((proposal, i) => (
          <div key={i} className="rounded-xl border border-slate-200 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-500">サービス提案 {i + 1}</p>
              <button
                onClick={() => removeProposal(i)}
                className="text-xs text-slate-400 transition hover:text-red-500"
              >
                削除
              </button>
            </div>
            <input
              type="text"
              value={proposal.title}
              onChange={(e) => updateProposal(i, "title", e.target.value)}
              placeholder="サービスタイトル（例: あなたの強みを活かせるサービス）"
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 focus:bg-white"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={proposal.linkLabel}
                onChange={(e) => updateProposal(i, "linkLabel", e.target.value)}
                placeholder="CTAボタンのラベル"
                className="w-1/3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 focus:bg-white"
              />
              <input
                type="url"
                value={proposal.link}
                onChange={(e) => updateProposal(i, "link", e.target.value)}
                placeholder="アフィリエイトURL https://..."
                className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 focus:bg-white"
              />
            </div>
            <textarea
              value={proposal.banner}
              onChange={(e) => updateProposal(i, "banner", e.target.value)}
              placeholder="バナーHTML（A8.netなどのコードをそのまま貼り付け）※URLより優先されます"
              rows={3}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-xs text-slate-700 outline-none focus:border-slate-400 focus:bg-white"
            />
          </div>
        ))}
        <button
          onClick={addProposal}
          className="w-full rounded-xl border border-dashed border-slate-300 py-2 text-xs text-slate-500 transition hover:border-slate-400 hover:text-slate-700"
        >
          + サービス提案を追加
        </button>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={status === "saving"}
            className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
          >
            {status === "saving" ? "保存中..." : status === "saved" ? "✓ 保存済" : "保存"}
          </button>
        </div>
      </div>
    </div>
  );
}
