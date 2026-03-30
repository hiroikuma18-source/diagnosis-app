import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "診断サイト｜性格・強み・副業タイプが1分でわかる",
  description:
    "簡単な質問に答えるだけで、あなたの性格タイプ・強み・向いている副業がわかります。",
  verification: {
    google: "2F-XqYZ7isxJJUVpGcKg68Vk0hVYeC0szR2mvbzcGCw",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
              <Link href="/" className="text-lg font-bold tracking-tight">
                診断サイト
              </Link>

              <nav className="flex items-center gap-1 text-sm text-slate-600">
<Link
                  href="/category/personality"
                  className="rounded-full px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  性格診断
                </Link>
                <Link
                  href="/category/sidejob"
                  className="rounded-full px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  副業診断
                </Link>
                <Link
                  href="/category/strength"
                  className="rounded-full px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  強み診断
                </Link>
              </nav>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-6xl px-4 py-10">
              <div className="mb-4 text-base font-bold">診断サイト</div>
              <p className="mb-4 text-sm leading-6 text-slate-600">
                性格・強み・副業タイプなどを、簡単な質問で診断できるサイトです。
              </p>
              <div className="mb-6 flex flex-wrap gap-4 text-sm text-slate-500">
                <Link href="/category/personality" className="hover:text-slate-700">
                  性格診断
                </Link>
                <Link href="/category/sidejob" className="hover:text-slate-700">
                  副業診断
                </Link>
                <Link href="/category/strength" className="hover:text-slate-700">
                  強み診断
                </Link>
              </div>
              <p className="text-xs text-slate-400">© 2026 診断サイト</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
