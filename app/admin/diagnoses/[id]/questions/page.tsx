import { supabase } from "../../../../lib/supabase";
import { createQuestion, deleteQuestion } from "../../../actions";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteButton from "../../../components/DeleteButton";

type PageProps = { params: Promise<{ id: string }> };

export default async function QuestionsPage({ params }: PageProps) {
  const { id } = await params;
  const { data: diagnosis } = await supabase.from("diagnoses").select("id, title").eq("id", id).single();
  if (!diagnosis) notFound();

  const { data: questions } = await supabase
    .from("questions")
    .select("id, display_order, text, choices(id, display_order, text, scores)")
    .eq("diagnosis_id", id)
    .order("display_order");

  const createWithId = createQuestion.bind(null, id);

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <Link href="/admin" className="text-sm text-slate-500 hover:text-slate-700">← 一覧に戻る</Link>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">{diagnosis.title} — 質問管理</h1>
        <div className="mt-2 flex gap-3">
          <Link href={`/admin/diagnoses/${id}`} className="text-sm text-sky-500 hover:text-sky-700">基本情報を編集</Link>
          <Link href={`/admin/diagnoses/${id}/results`} className="text-sm text-sky-500 hover:text-sky-700">結果タイプを管理</Link>
        </div>
      </div>

      {/* 既存の質問一覧 */}
      {questions && questions.length > 0 && (
        <div className="mb-8 space-y-3">
          <h2 className="text-sm font-semibold text-slate-500">登録済み質問</h2>
          {questions.map((q) => {
            const deleteWithIds = deleteQuestion.bind(null, q.id, id);
            return (
              <div key={q.id} className="rounded-[20px] bg-white p-5 ring-1 ring-slate-200">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <span className="mr-2 text-xs text-slate-400">Q{q.display_order}</span>
                    <span className="text-sm font-medium text-slate-900">{q.text}</span>
                  </div>
                  <DeleteButton
                    action={deleteWithIds}
                    confirmMessage="この質問を削除しますか？"
                    label="削除"
                  />
                </div>
                <div className="space-y-1.5">
                  {[...((q.choices as { display_order: number; text: string; scores: Record<string, number> }[]) ?? [])]
                    .sort((a, b) => a.display_order - b.display_order)
                    .map((c, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5">{c.text}</span>
                        <span className="text-slate-400">{JSON.stringify(c.scores)}</span>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 質問追加フォーム */}
      <div className="rounded-[24px] bg-white p-6 ring-1 ring-slate-200">
        <h2 className="mb-4 text-base font-semibold text-slate-900">質問を追加</h2>
        <form action={createWithId} className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">順番</label>
              <input type="number" name="display_order" defaultValue={(questions?.length ?? 0) + 1}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-400" />
            </div>
            <div className="col-span-3">
              <label className="mb-1 block text-sm font-medium text-slate-700">質問文 <span className="text-rose-500">*</span></label>
              <input type="text" name="text" required placeholder="例: 休日の過ごし方は？"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:bg-white" />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-700">選択肢（スコアはJSON形式: 例 {`{"action": 2}`}）</p>
            {[1, 2].map((n) => (
              <div key={n} className="grid grid-cols-2 gap-3">
                <input type="text" name="choice_text" required placeholder={`選択肢 ${n}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:bg-white" />
                <input type="text" name="choice_scores" required placeholder={`{"key": 2}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:bg-white" />
              </div>
            ))}
          </div>

          <button type="submit" className="w-full rounded-full bg-slate-900 py-3 text-sm font-semibold text-white transition hover:opacity-90">
            質問を追加する
          </button>
        </form>
      </div>
    </div>
  );
}
