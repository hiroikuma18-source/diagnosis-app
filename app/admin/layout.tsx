import Link from "next/link";
import { logoutAction } from "./login/actions";

export const metadata = { title: "管理画面 | 診断サイト" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-base font-bold text-slate-900">
              管理画面
            </Link>
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-700" target="_blank">
              サイトを見る →
            </Link>
          </div>
          <form action={logoutAction}>
            <button type="submit" className="text-sm text-slate-500 hover:text-slate-700">
              ログアウト
            </button>
          </form>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
    </div>
  );
}
