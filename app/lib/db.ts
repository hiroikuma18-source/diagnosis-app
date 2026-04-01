import { supabase } from "./supabase";
import type { Diagnosis, DiagnosisSummary, ResultDetail } from "./types";

type RawResultType = {
  id: string;
  score_key: string;
  label: string;
  description: string;
  reasons: string[];
  failure_pattern: string;
  seven_day_plan: string[];
  action_free: string;
  action_low_cost: string;
  action_fastest: string;
  service_description: string;
  affiliate_link: string | null;
};

type RawChoice = {
  display_order: number;
  text: string;
  scores: Record<string, number>;
};

type RawQuestion = {
  id: string;
  display_order: number;
  text: string;
  choices: RawChoice[];
};

type RawDiagnosis = {
  id: string;
  slug: string;
  category: string;
  category_label: string;
  title: string;
  description: string;
  seo_title: string;
  seo_description: string;
  question_count_label: string;
  duration_label: string;
  display_order: number;
  questions: RawQuestion[];
  result_types: RawResultType[];
};

function toResultDetail(r: RawResultType): ResultDetail {
  return {
    description: r.description,
    reasons: r.reasons,
    failurePattern: r.failure_pattern,
    sevenDayPlan: r.seven_day_plan,
    actionOptions: {
      free: r.action_free,
      lowCost: r.action_low_cost,
      fastest: r.action_fastest,
    },
    serviceProposal: {
      description: r.service_description,
      affiliateLink: r.affiliate_link ?? undefined,
    },
  };
}

function toDiagnosis(raw: RawDiagnosis): Diagnosis {
  const questions = [...raw.questions]
    .sort((a, b) => a.display_order - b.display_order)
    .map((q, i) => ({
      id: i + 1,
      text: q.text,
      choices: [...q.choices]
        .sort((a, b) => a.display_order - b.display_order)
        .map((c) => ({ text: c.text, scores: c.scores })),
    }));

  const resultMap: Record<string, string> = {};
  const results: Record<string, ResultDetail> = {};
  for (const r of raw.result_types) {
    resultMap[r.score_key] = r.label;
    results[r.label] = toResultDetail(r);
  }

  return {
    slug: raw.slug,
    category: raw.category as Diagnosis["category"],
    categoryLabel: raw.category_label,
    title: raw.title,
    description: raw.description,
    seoTitle: raw.seo_title,
    seoDescription: raw.seo_description,
    questionCountLabel: raw.question_count_label,
    durationLabel: raw.duration_label,
    questions,
    resultMap,
    results,
  };
}

export async function getDiagnoses(): Promise<DiagnosisSummary[]> {
  const { data, error } = await supabase
    .from("diagnoses")
    .select("id, slug, category, category_label, title, description, question_count_label, duration_label, display_order")
    .order("display_order");

  if (error) return [];

  return (data ?? []).map((d) => ({
    id: d.id,
    slug: d.slug,
    category: d.category as DiagnosisSummary["category"],
    categoryLabel: d.category_label,
    title: d.title,
    description: d.description,
    questionCountLabel: d.question_count_label,
    durationLabel: d.duration_label,
    displayOrder: d.display_order,
  }));
}

export async function getDiagnosisBySlug(slug: string): Promise<Diagnosis | null> {
  const { data, error } = await supabase
    .from("diagnoses")
    .select(`
      *,
      questions(id, display_order, text, choices(display_order, text, scores)),
      result_types(id, score_key, label, description, reasons, failure_pattern, seven_day_plan, action_free, action_low_cost, action_fastest, service_description, affiliate_link)
    `)
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return toDiagnosis(data as unknown as RawDiagnosis);
}
