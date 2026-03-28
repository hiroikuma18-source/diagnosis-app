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
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
              <Link href="/" className="text-lg font-bold tracking-tight">
                診断サイト
              </Link>

              <nav className="flex items-center gap-4 text-sm text-slate-600">
                <Link href="/" className="hover:text-slate-900 transition">
                  ホーム
                </Link>
                <Link
                  href="/diagnoses/personality-type"
                  className="hover:text-slate-900 transition"
                >
                  性格診断
                </Link>
                <Link
                  href="/diagnoses/sidejob-type"
                  className="hover:text-slate-900 transition"
                >
                  副業診断
                </Link>
                <Link
                  href="/diagnoses/strength-type"
                  className="hover:text-slate-900 transition"
                >
                  強み診断
                </Link>
              </nav>
            </div>
          </header>

          <main className="flex-1">
            {children}
          </main>

          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-6xl px-4 py-8">
              <div className="mb-2 text-base font-semibold">診断サイト</div>
              <p className="text-sm leading-6 text-slate-600">
                性格・強み・副業タイプなどを、簡単な質問で診断できるサイトです。
              </p>
              <p className="mt-4 text-xs text-slate-400">
                © 2026 診断サイト
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}