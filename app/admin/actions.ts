"use server";

import { getAdminClient } from "../lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createDiagnosis(formData: FormData) {
  const db = getAdminClient();
  const { data, error } = await db.from("diagnoses").insert({
    slug: formData.get("slug"),
    category: formData.get("category"),
    category_label: formData.get("category_label"),
    title: formData.get("title"),
    description: formData.get("description"),
    seo_title: formData.get("seo_title"),
    seo_description: formData.get("seo_description"),
    question_count_label: formData.get("question_count_label") || "6問",
    duration_label: formData.get("duration_label") || "約1分",
    display_order: Number(formData.get("display_order")) || 99,
  }).select().single();

  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  redirect(`/admin/diagnoses/${data.id}/questions`);
}

export async function updateDiagnosis(id: string, formData: FormData) {
  const db = getAdminClient();
  const { error } = await db.from("diagnoses").update({
    slug: formData.get("slug"),
    category: formData.get("category"),
    category_label: formData.get("category_label"),
    title: formData.get("title"),
    description: formData.get("description"),
    seo_title: formData.get("seo_title"),
    seo_description: formData.get("seo_description"),
    question_count_label: formData.get("question_count_label"),
    duration_label: formData.get("duration_label"),
    display_order: Number(formData.get("display_order")),
  }).eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath(`/admin/diagnoses/${id}`);
  redirect("/admin");
}

export async function deleteDiagnosis(id: string) {
  const db = getAdminClient();
  const { error } = await db.from("diagnoses").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function createQuestion(diagnosisId: string, formData: FormData) {
  const db = getAdminClient();
  const { data, error } = await db.from("questions").insert({
    diagnosis_id: diagnosisId,
    display_order: Number(formData.get("display_order")),
    text: formData.get("text"),
  }).select().single();

  if (error) throw new Error(error.message);

  // 選択肢を追加
  const choiceTexts = formData.getAll("choice_text") as string[];
  const choiceScores = formData.getAll("choice_scores") as string[];
  const choices = choiceTexts
    .map((text, i) => ({
      question_id: data.id,
      display_order: i + 1,
      text,
      scores: JSON.parse(choiceScores[i] || "{}"),
    }))
    .filter((c) => c.text);

  if (choices.length > 0) {
    await db.from("choices").insert(choices);
  }

  revalidatePath(`/admin/diagnoses/${diagnosisId}/questions`);
  redirect(`/admin/diagnoses/${diagnosisId}/questions`);
}

export async function deleteQuestion(questionId: string, diagnosisId: string) {
  const db = getAdminClient();
  await db.from("questions").delete().eq("id", questionId);
  revalidatePath(`/admin/diagnoses/${diagnosisId}/questions`);
  redirect(`/admin/diagnoses/${diagnosisId}/questions`);
}

export async function createResultType(diagnosisId: string, formData: FormData) {
  const db = getAdminClient();

  const reasons = [
    formData.get("reason_1"),
    formData.get("reason_2"),
    formData.get("reason_3"),
  ].filter(Boolean);

  const sevenDayPlan = Array.from({ length: 7 }, (_, i) =>
    formData.get(`day_${i + 1}`)
  ).filter(Boolean);

  const { error } = await db.from("result_types").insert({
    diagnosis_id: diagnosisId,
    score_key: formData.get("score_key"),
    label: formData.get("label"),
    description: formData.get("description"),
    reasons,
    failure_pattern: formData.get("failure_pattern"),
    seven_day_plan: sevenDayPlan,
    action_free: formData.get("action_free"),
    action_low_cost: formData.get("action_low_cost"),
    action_fastest: formData.get("action_fastest"),
    service_description: formData.get("service_description"),
    affiliate_link: formData.get("affiliate_link") || null,
  });

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/diagnoses/${diagnosisId}/results`);
  redirect(`/admin/diagnoses/${diagnosisId}/results`);
}

export async function deleteResultType(resultTypeId: string, diagnosisId: string) {
  const db = getAdminClient();
  await db.from("result_types").delete().eq("id", resultTypeId);
  revalidatePath(`/admin/diagnoses/${diagnosisId}/results`);
  redirect(`/admin/diagnoses/${diagnosisId}/results`);
}

export async function updateAffiliateLink(resultTypeId: string, affiliateLink: string) {
  const db = getAdminClient();
  const { error } = await db
    .from("result_types")
    .update({ affiliate_link: affiliateLink || null })
    .eq("id", resultTypeId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/affiliates");
}
