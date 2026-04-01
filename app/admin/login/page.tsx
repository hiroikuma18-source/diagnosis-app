import { loginAction } from "./actions";

type PageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-[28px] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">管理画面</h1>
        <p className="mb-6 text-sm text-slate-500">パスワードを入力してください</p>

        {error && (
          <div className="mb-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">
            パスワードが正しくありません
          </div>
        )}

        <form action={loginAction} className="space-y-4">
          <input
            type="password"
            name="password"
            placeholder="パスワード"
            required
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400 focus:bg-white"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-slate-900 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}
