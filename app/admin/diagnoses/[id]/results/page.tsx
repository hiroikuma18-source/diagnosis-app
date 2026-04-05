import { supabase } from "../../../../lib/supabase";
import { createResultType, deleteResultType } from "../../../actions";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteButton from "../../../components/DeleteButton";

type PageProps = { params: Promise<{ id: string }> };

export default async function ResultsPage({ params }: PageProps) {
  const { id } = await params;
  const { data: diagnosis } = await supabase.from("diagnoses").select("id, title").eq("id", id).single();
  if (!diagnosis) notFound();

  const { data: results } = await supabase
    .from("result_types")
    .select("id, score_key, label, description")
    .eq("diagnosis_id", id);

  const createWithId = createResultType.bind(null, id);

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <Link href="/admin" className="text-sm text-slate-500 hover:text-slate-700">← 一覧に戻る</Link>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">{diagnosis.title} — 結果タイプ管理</h1>
        <div className="mt-2 flex gap-3">
          <Link href={`/admin/diagnoses/${id}`} className="text-sm text-sky-500 hover:text-sky-700">基本情報を編集</Link>
          <Link href={`/admin/diagnoses/${id}/questions`} className="text-sm text-sky-500 hover:text-sky-700">質問を管理</Link>
        </div>
      </div>

      {/* 登録済み結果タイプ */}
      {results && results.length > 0 && (
        <div className="mb-8 space-y-3">
          <h2 className="text-sm font-semibold text-slate-500">登録済み結果タイプ</h2>
          {results.map((r) => {
            const deleteWithIds = deleteResultType.bind(null, r.id, id);
            return (
              <div key={r.id} className="flex items-start justify-between rounded-[20px] bg-white p-5 ring-1 ring-slate-200">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">{r.score_key}</span>
                    <span className="text-sm font-semibold text-slate-900">{r.label}</span>
                  </div>
                  <p className="text-xs text-slate-500">{r.description}</p>
                </div>
                <DeleteButton
                  action={deleteWithIds}
                  confirmMessage="この結果タイプを削除しますか？"
                  label="削除"
                />
              </div>
            );
          })}
        </div>
      )}

      {/* 結果タイプ追加フォーム */}
      <div className="rounded-[24px] bg-white p-6 ring-1 ring-slate-200">
        <h2 className="mb-4 text-base font-semibold text-slate-900">結果タイプを追加</h2>
        <form action={createWithId} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="スコアキー" name="score_key" placeholder="例: action" required />
            <Field label="結果ラベル" name="label" placeholder="例: リーダー型" required />
          </div>
          <Field label="説明文" name="description" placeholder="このタイプの説明" required />

          <div>
            <p className="mb-2 text-sm font-medium text-slate-700">根拠（なぜこのタイプ？）</p>
            <div className="space-y-2">
              {[1, 2, 3].map((n) => (
                <input key={n} type="text" name={`reason_${n}`} required placeholder={`根拠 ${n}`}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:bg-white" />
              ))}
            </div>
          </div>

          <Field label="失敗パターン" name="failure_pattern" placeholder="このタイプがやりがちな失敗" required textarea />

          <div>
            <p className="mb-2 text-sm font-medium text-slate-700">7日間プラン</p>
            <div className="space-y-2">
              {Array.from({ length: 7 }, (_, i) => (
                <input key={i} type="text" name={`day_${i + 1}`} required placeholder={`Day${i + 1}: やること`}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:bg-white" />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-slate-700">行動の選択肢</p>
            <div className="space-y-2">
              <Field label="無料でやる" name="action_free" placeholder="今すぐ無料でできること" required />
              <Field label="低コストでやる" name="action_low_cost" placeholder="少しお金をかけてやること" required />
              <Field label="最短でやる" name="action_fastest" placeholder="最短で結果を出す方法" required />
            </div>
          </div>

          <Field label="サービス紹介文" name="service_description" placeholder="このタイプにおすすめのサービス説明" required />

          <button type="submit" className="w-full rounded-full bg-slate-900 py-3 text-sm font-semibold text-white transition hover:opacity-90">
            結果タイプを追加する
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, name, placeholder, required, textarea }: {
  label: string; name: string; placeholder?: string; required?: boolean; textarea?: boolean;
}) {
  const cls = "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:bg-white";
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}{required && <span className="ml-1 text-rose-500">*</span>}
      </label>
      {textarea
        ? <textarea name={name} placeholder={placeholder} rows={2} className={cls} />
        : <input type="text" name={name} placeholder={placeholder} className={cls} />
      }
    </div>
  );
}
