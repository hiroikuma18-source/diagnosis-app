import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const { data, error } = await supabase
    .from("diagnoses")
    .select(`
      slug, category, category_label, title, description,
      seo_title, seo_description, question_count_label, duration_label, display_order,
      questions(id, display_order, text, choices(display_order, text, scores)),
      result_types(score_key, label, description, reasons, failure_pattern, seven_day_plan, action_free, action_low_cost, action_fastest, service_description, affiliate_link)
    `)
    .eq("id", id)
    .single();

  if (error || !data) return NextResponse.json({ error: "not found" }, { status: 404 });

  const questions = [...(data.questions as any[])]
    .sort((a, b) => a.display_order - b.display_order)
    .map((q) => ({
      order: q.display_order,
      text: q.text,
      choices: [...(q.choices as any[])]
        .sort((a, b) => a.display_order - b.display_order)
        .map((c) => ({ text: c.text, scores: c.scores })),
    }));

  const results = (data.result_types as any[]).map((r) => ({
    scoreKey: r.score_key,
    label: r.label,
    description: r.description,
    reasons: r.reasons,
    failurePattern: r.failure_pattern,
    sevenDayPlan: r.seven_day_plan,
    actionFree: r.action_free,
    actionLowCost: r.action_low_cost,
    actionFastest: r.action_fastest,
    serviceDescription: r.service_description,
    affiliateLink: r.affiliate_link,
  }));

  return NextResponse.json({
    slug: data.slug,
    category: data.category,
    categoryLabel: data.category_label,
    title: data.title,
    description: data.description,
    seoTitle: data.seo_title,
    seoDescription: data.seo_description,
    questionCountLabel: data.question_count_label,
    durationLabel: data.duration_label,
    displayOrder: data.display_order,
    questions,
    results,
  });
}
