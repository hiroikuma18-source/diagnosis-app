"use client";

import { useState } from "react";
import { updateAffiliateLinks } from "../actions";
import type { AffiliateLink } from "../../lib/types";

interface Props {
  resultTypeId: string;
  label: string;
  currentLinks: AffiliateLink[];
  currentServiceTitle: string;
  currentBanner: string;
}

export default function AffiliateLinkForm({ resultTypeId, label, currentLinks, currentServiceTitle, currentBanner }: Props) {
  const [links, setLinks] = useState<AffiliateLink[]>(currentLinks.length > 0 ? currentLinks : []);
  const [serviceTitle, setServiceTitle] = useState(currentServiceTitle);
  const [banner, setBanner] = useState(currentBanner);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  function addLink() {
    setLinks((prev) => [...prev, { url: "", label: "今すぐチェックする（無料）" }]);
  }

  function removeLink(index: number) {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  }

  function updateLink(index: number, field: keyof AffiliateLink, value: string) {
    setLinks((prev) => prev.map((link, i) => i === index ? { ...link, [field]: value } : link));
  }

  async function handleSave() {
    setStatus("saving");
    await updateAffiliateLinks(resultTypeId, links, serviceTitle, banner);
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <div className="rounded-2xl border border-slate-100 p-4">
      <p className="mb-3 text-sm font-semibold text-slate-700">{label}</p>
      <div className="space-y-2">
        <input
          type="text"
          value={serviceTitle}
          onChange={(e) => setServiceTitle(e.target.value)}
          placeholder="サービスタイトル（例: あなたの強みを活かせるサービス）"
          className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 focus:bg-white"
        />

        <div className="space-y-2">
          {links.map((link, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={link.label}
                onChange={(e) => updateLink(i, "label", e.target.value)}
                placeholder="ボタンのラベル"
                className="w-1/3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 focus:bg-white"
              />
              <input
                type="url"
                value={link.url}
                onChange={(e) => updateLink(i, "url", e.target.value)}
                placeholder="https://..."
                className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 focus:bg-white"
              />
              <button
                onClick={() => removeLink(i)}
                className="rounded-full px-3 py-2 text-xs text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                削除
              </button>
            </div>
          ))}
          <button
            onClick={addLink}
            className="rounded-full border border-dashed border-slate-300 px-4 py-2 text-xs text-slate-500 transition hover:border-slate-400 hover:text-slate-700"
          >
            + リンクを追加
          </button>
        </div>

        <textarea
          value={banner}
          onChange={(e) => setBanner(e.target.value)}
          placeholder="バナーHTML（A8.netなどのコードをそのまま貼り付け）"
          rows={4}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-xs text-slate-700 outline-none focus:border-slate-400 focus:bg-white"
        />
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
