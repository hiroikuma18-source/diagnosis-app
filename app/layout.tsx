import "./globals.css";

export const metadata = {
  title: "診断サイト｜性格・強み・副業タイプが1分でわかる",
  description:
    "簡単な質問に答えるだけで、あなたの性格タイプ・強み・向いている副業がわかります。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <meta name="google-site-verification" content="<meta name="google-site-verification" content="2F-XqYZ7isxJJUVpGcKg68Vk0hVYeC0szR2mvbzcGCw" />" />
      </head>
      <body>{children}</body>
    </html>
  );
}