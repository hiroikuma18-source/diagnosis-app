"use server";

import { getAdminClient } from "../../lib/supabase";
import { revalidatePath } from "next/cache";

export type ImportResult =
  | { success: true; title: string }
  | { success: false; error: string };

export async function importDiagnosis(formData: FormData): Promise<ImportResult> {
  const raw = formData.get("json") as string;
  const mode = formData.get("mode") as string; // "create" | "update"

  let data: any;
  try {
    data = JSON.parse(raw);
  } catch {
    return { success: false, error: "JSONの形式が正しくありません。" };
  }

  const db = getAdminClient();

  try {
    // 更新モード: 既存データを削除してから再登録
    if (mode === "update") {
      const { data: existing, error: findError } = await db
        .from("diagnoses")
        .select("id")
        .eq("slug", data.slug)
        .single();

      if (findError) console.error("find error:", findError);

      if (!existing) {
        return { success: false, error: `slug「${data.slug}」の診断が見つかりません。新規作成モードを使ってください。（詳細: ${findError?.message ?? "不明"}）` };
      }

      // 関連データを全削除（CASCADE で questions/choices/result_types も消える）
      await db.from("diagnoses").delete().eq("id", existing.id);
    }

    // 診断を登録
    const { data: diagnosis, error: diagError } = await db
      .from("diagnoses")
      .insert({
        slug: data.slug,
        category: data.category,
        category_label: data.categoryLabel,
        title: data.title,
        description: data.description,
        seo_title: data.seoTitle || data.title,
        seo_description: data.seoDescription || data.description,
        question_count_label: data.questionCountLabel || `${data.questions?.length ?? 0}問`,
        duration_label: data.durationLabel || "約1分",
        display_order: data.displayOrder ?? 99,
      })
      .select()
      .single();

    if (diagError) return { success: false, error: `診断の登録エラー: ${diagError.message}` };

    // 質問と選択肢を登録
    for (const q of data.questions ?? []) {
      const { data: question, error: qError } = await db
        .from("questions")
        .insert({
          diagnosis_id: diagnosis.id,
          display_order: q.order,
          text: q.text,
        })
        .select()
        .single();

      if (qError) return { success: false, error: `質問の登録エラー: ${qError.message}` };

      const choices = (q.choices ?? []).map((c: any, i: number) => ({
        question_id: question.id,
        display_order: i + 1,
        text: c.text,
        scores: c.scores,
      }));

      if (choices.length > 0) {
        const { error: cError } = await db.from("choices").insert(choices);
        if (cError) return { success: false, error: `選択肢の登録エラー: ${cError.message}` };
      }
    }

    // 結果タイプを登録
    for (const r of data.results ?? []) {
      const { error: rError } = await db.from("result_types").insert({
        diagnosis_id: diagnosis.id,
        score_key: r.scoreKey,
        label: r.label,
        description: r.description,
        reasons: r.reasons ?? [],
        failure_pattern: r.failurePattern ?? "",
        seven_day_plan: r.sevenDayPlan ?? [],
        action_free: r.actionFree ?? "",
        action_low_cost: r.actionLowCost ?? "",
        action_fastest: r.actionFastest ?? "",
        service_title: r.serviceTitle ?? "",
        service_description: r.serviceDescription ?? "",
        affiliate_link: r.affiliateLink || null,
      });

      if (rError) return { success: false, error: `結果タイプの登録エラー: ${rError.message}` };
    }

    revalidatePath("/admin");
    return { success: true, title: data.title };
  } catch (e: any) {
    return { success: false, error: e.message ?? "不明なエラー" };
  }
}
