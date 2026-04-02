"use client";

import { useEffect, useState } from "react";

interface Row {
  path: string;
  pv: number;
  uu: number;
}

let cache: Row[] | null = null;
let fetchPromise: Promise<Row[]> | null = null;

function fetchAnalytics(): Promise<Row[]> {
  if (cache) return Promise.resolve(cache);
  if (!fetchPromise) {
    fetchPromise = fetch("/api/admin/analytics")
      .then((r) => r.json())
      .then((data) => {
        cache = data.rows ?? [];
        return cache!;
      });
  }
  return fetchPromise;
}

export default function AnalyticsStats({ slug }: { slug: string }) {
  const [stats, setStats] = useState<{ pv: number; uu: number } | null>(null);

  useEffect(() => {
    fetchAnalytics().then((rows) => {
      const path = `/diagnoses/${slug}`;
      const row = rows.find((r) => r.path === path);
      setStats({ pv: row?.pv ?? 0, uu: row?.uu ?? 0 });
    });
  }, [slug]);

  if (!stats) return null;

  return (
    <span className="ml-2 text-xs text-slate-400">
      PV: {stats.pv} / UU: {stats.uu}
    </span>
  );
}
