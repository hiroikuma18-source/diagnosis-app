"use client";

import { useState } from "react";
import { updateAffiliateLink } from "../actions";

interface Props {
  resultTypeId: string;
  label: string;
  currentLink: string;
}

export default function AffiliateLinkForm({ resultTypeId, label, currentLink }: Props) {
  const [link, setLink] = useState(currentLink);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  async function handleSave() {
    setStatus("saving");
    await updateAffiliateLink(resultTypeId, link);
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <div className="flex items-center gap-3">
      <span className="w-28 shrink-0 text-sm text-slate-600">{label}</span>
      <input
        type="url"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="https://..."
        className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 focus:bg-white"
      />
      <button
        onClick={handleSave}
        disabled={status === "saving"}
        className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
      >
        {status === "saving" ? "保存中..." : status === "saved" ? "✓ 保存済" : "保存"}
      </button>
    </div>
  );
}
