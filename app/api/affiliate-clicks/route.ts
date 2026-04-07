import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../lib/supabase";

export async function POST(request: NextRequest) {
  const { link_url, link_label, diagnosis_slug } = await request.json();
  if (!link_url) return NextResponse.json({ error: "link_url required" }, { status: 400 });

  const { error } = await supabase.from("affiliate_clicks").insert({ link_url, link_label, diagnosis_slug });
  if (error) {
    console.error("affiliate click insert error:", error);
    return NextResponse.json({ error: "insert failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
