import { createDiagnosis } from "../../actions";
import Link from "next/link";

export default function NewDiagnosisPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link href="/admin" className="text-sm text-slate-500 hover:text-slate-700">← 一覧に戻る</Link>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">新しい診断を追加</h1>
      </div>

      <form action={createDiagnosis} className="space-y-4 rounded-[24px] bg-white p-6 ring-1 ring-slate-200">
        <Field label="スラッグ（URL）" name="slug" placeholder="例: programming-type" required />
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">カテゴリ</label>
          <select name="category" required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400 focus:bg-white">
            <option value="personality">personality（性格診断）</option>
            <option value="sidejob">sidejob（副業診断）</option>
            <option value="strength">strength（強み診断）</option>
          </select>
        </div>
        <Field label="カテゴリラベル（表示名）" name="category_label" placeholder="例: 性格診断" required />
        <Field label="タイトル" name="title" placeholder="例: プログラミング適性診断" required />
        <Field label="説明文" name="description" placeholder="診断の説明" required textarea />
        <Field label="SEOタイトル" name="seo_title" placeholder="例: プログラミング適性診断｜1分でわかる" />
        <Field label="SEO説明文" name="seo_description" placeholder="検索結果に表示される説明文" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="質問数ラベル" name="question_count_label" placeholder="例: 6問" />
          <Field label="所要時間ラベル" name="duration_label" placeholder="例: 約1分" />
        </div>
        <Field label="表示順" name="display_order" placeholder="例: 4" type="number" />
        <button type="submit" className="w-full rounded-full bg-slate-900 py-3 text-sm font-semibold text-white transition hover:opacity-90">
          作成して質問を追加する →
        </button>
      </form>
    </div>
  );
}

function Field({ label, name, placeholder, required, textarea, type }: {
  label: string; name: string; placeholder?: string; required?: boolean; textarea?: boolean; type?: string;
}) {
  const cls = "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400 focus:bg-white";
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}{required && <span className="ml-1 text-rose-500">*</span>}
      </label>
      {textarea
        ? <textarea name={name} placeholder={placeholder} required={required} rows={3} className={cls} />
        : <input type={type || "text"} name={name} placeholder={placeholder} required={required} className={cls} />
      }
    </div>
  );
}
