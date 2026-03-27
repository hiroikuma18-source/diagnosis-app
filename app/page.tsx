export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">
        診断コンテンツ一覧
      </h1>

      <a
        href="/diagnoses/personality-type"
        className="text-blue-500 underline"
      >
        性格診断
      </a>

      <a
        href="/diagnoses/sidejob-type"
        className="text-blue-500 underline"
      >
        副業診断
      </a>

      <a
        href="/diagnoses/strength-type"
        className="text-blue-500 underline"
      >
        強み診断
      </a>
    </main>
  );
}