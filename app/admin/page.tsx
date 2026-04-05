import Link from "next/link";
import { supabase } from "../lib/supabase";

export const dynamic = "force-dynamic";
import { deleteDiagnosis } from "./actions";
import DeleteButton from "./components/DeleteButton";
import ExportButton from "./components/ExportButton";
import AnalyticsStats from "./components/AnalyticsStats";
import OwnerToggle from "./components/OwnerToggle";

export default async function AdminPage() {
  const { data: diagnoses } = await supabase
    .from("diagnoses")
    .select("id, slug, title, category_label, display_order")
    .order("display_order");

  const { data: completions } = await supabase
    .from("diagnosis_completions")
    .select("diagnosis_id");

  const completionCounts: Record<string, number> = {};
  for (const c of completions ?? []) {
    completionCounts[c.diagnosis_id] = (completionCounts[c.diagnosis_id] ?? 0) + 1;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">診断一覧</h1>
        <div className="flex flex-wrap gap-2">
          <OwnerToggle />
          <Link
            href="/admin/affiliates"
            className="rounded-full bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            アフィリエイト
          </Link>
          <Link
            href="/admin/import"
            className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            一括インポート
          </Link>
          <Link
            href="/admin/diagnoses/new"
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            + 手動で追加
          </Link>
        </div>
      </div>

      {(!diagnoses || diagnoses.length === 0) ? (
        <div className="rounded-[24px] bg-white p-10 text-center ring-1 ring-slate-200">
          <p className="text-slate-500">診断がまだありません</p>
        </div>
      ) : (
        <div className="space-y-3">
          {diagnoses.map((d) => (
            <div
              key={d.id}
              className="flex items-center justify-between rounded-[20px] bg-white px-6 py-4 ring-1 ring-slate-200"
            >
              <div>
                <span className="mr-3 rounded-full bg-rose-50 px-2 py-1 text-xs font-medium text-rose-500">
                  {d.category_label}
                </span>
                <span className="text-base font-medium text-slate-900">{d.title}</span>
                <span className="ml-3 text-xs text-slate-400">/{d.slug}</span>
                <span className="ml-3 text-xs text-emerald-600">
                  完了数: {completionCounts[d.id] ?? 0}
                </span>
                <AnalyticsStats slug={d.slug} />
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/diagnoses/${d.id}/questions`}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-200"
                >
                  質問編集
                </Link>
                <Link
                  href={`/admin/diagnoses/${d.id}/results`}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-200"
                >
                  結果編集
                </Link>
                <Link
                  href={`/admin/diagnoses/${d.id}`}
                  className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-600 transition hover:bg-sky-100"
                >
                  基本情報
                </Link>
                <ExportButton diagnosisId={d.id} diagnosisTitle={d.title} />
                <DeleteButton
                  action={deleteDiagnosis.bind(null, d.id)}
                  confirmMessage={`「${d.title}」を削除しますか？`}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
