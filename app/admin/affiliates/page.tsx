import Link from "next/link";
import { getAdminClient } from "../../lib/supabase";
import AffiliateLinkForm from "./AffiliateLinkForm";

export const dynamic = "force-dynamic";

export default async function AffiliatesPage() {
  const db = getAdminClient();
  const { data: diagnoses } = await db
    .from("diagnoses")
    .select("id, title, result_types(id, label, affiliate_link)")
    .order("display_order");

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin" className="text-sm text-slate-500 hover:text-slate-700">
          ← 一覧に戻る
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">アフィリエイトリンク管理</h1>
      </div>

      <div className="space-y-6">
        {(diagnoses ?? []).map((d) => (
          <div key={d.id} className="rounded-[24px] bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-base font-semibold text-slate-900">{d.title}</h2>
            <div className="space-y-3">
              {(d.result_types as any[]).map((r) => (
                <AffiliateLinkForm
                  key={r.id}
                  resultTypeId={r.id}
                  label={r.label}
                  currentLink={r.affiliate_link ?? ""}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
