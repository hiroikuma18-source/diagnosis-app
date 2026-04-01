"use client";

import { useState } from "react";

interface Props {
  diagnosisId: string;
  diagnosisTitle: string;
}

export default function ExportButton({ diagnosisId, diagnosisTitle }: Props) {
  const [open, setOpen] = useState(false);
  const [json, setJson] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    setLoading(true);
    const res = await fetch(`/api/admin/export?id=${diagnosisId}`);
    const data = await res.json();
    setJson(JSON.stringify(data, null, 2));
    setOpen(true);
    setLoading(false);
  }

  return (
    <>
      <button
        onClick={handleExport}
        disabled={loading}
        className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-600 transition hover:bg-amber-100 disabled:opacity-40"
      >
        {loading ? "..." : "JSON出力"}
      </button>

      {open && json && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-2xl rounded-[24px] bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">
                「{diagnosisTitle}」のJSON
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(json);
                    alert("コピーしました！");
                  }}
                  className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white"
                >
                  コピー
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-medium text-slate-600"
                >
                  閉じる
                </button>
              </div>
            </div>
            <textarea
              value={json}
              readOnly
              rows={20}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-xs text-slate-700 outline-none"
            />
            <p className="mt-3 text-xs text-slate-400">
              このJSONをコピーして「一括インポート（更新）」に貼り付けると編集できます
            </p>
          </div>
        </div>
      )}
    </>
  );
}
