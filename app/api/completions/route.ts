import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../lib/supabase";

export async function POST(request: NextRequest) {
  const { slug } = await request.json();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const { data: diagnosis } = await supabase
    .from("diagnoses")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!diagnosis) return NextResponse.json({ error: "not found" }, { status: 404 });

  await supabase.from("diagnosis_completions").insert({ diagnosis_id: diagnosis.id });

  return NextResponse.json({ ok: true });
}
