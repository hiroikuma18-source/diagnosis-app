import { supabase } from "../../../lib/supabase";
import { updateDiagnosis } from "../../actions";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditDiagnosisPage({ params }: PageProps) {
  const { id } = await params;
  const { data: d } = await supabase.from("diagnoses").select("*").eq("id", id).single();
  if (!d) notFound();

  const updateWithId = updateDiagnosis.bind(null, id);

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link href="/admin" className="text-sm text-slate-500 hover:text-slate-700">← 一覧に戻る</Link>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">基本情報を編集</h1>
      </div>

      <form action={updateWithId} className="space-y-4 rounded-[24px] bg-white p-6 ring-1 ring-slate-200">
        <Field label="スラッグ（URL）" name="slug" defaultValue={d.slug} required />
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">カテゴリ</label>
          <select name="category" defaultValue={d.category} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400 focus:bg-white">
            <option value="personality">personality（性格診断）</option>
            <option value="sidejob">sidejob（副業診断）</option>
            <option value="strength">strength（強み診断）</option>
          </select>
        </div>
        <Field label="カテゴリラベル" name="category_label" defaultValue={d.category_label} required />
        <Field label="タイトル" name="title" defaultValue={d.title} required />
        <Field label="説明文" name="description" defaultValue={d.description} textarea />
        <Field label="SEOタイトル" name="seo_title" defaultValue={d.seo_title} />
        <Field label="SEO説明文" name="seo_description" defaultValue={d.seo_description} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="質問数ラベル" name="question_count_label" defaultValue={d.question_count_label} />
          <Field label="所要時間ラベル" name="duration_label" defaultValue={d.duration_label} />
        </div>
        <Field label="表示順" name="display_order" defaultValue={String(d.display_order)} type="number" />
        <button type="submit" className="w-full rounded-full bg-slate-900 py-3 text-sm font-semibold text-white transition hover:opacity-90">
          保存する
        </button>
      </form>
    </div>
  );
}

function Field({ label, name, defaultValue, required, textarea, type }: {
  label: string; name: string; defaultValue?: string; required?: boolean; textarea?: boolean; type?: string;
}) {
  const cls = "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400 focus:bg-white";
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}{required && <span className="ml-1 text-rose-500">*</span>}
      </label>
      {textarea
        ? <textarea name={name} defaultValue={defaultValue} rows={3} className={cls} />
        : <input type={type || "text"} name={name} defaultValue={defaultValue} className={cls} />
      }
    </div>
  );
}
