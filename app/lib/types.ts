export type DiagnosisCategory = "personality" | "sidejob" | "strength";

export interface Choice {
  text: string;
  scores: Record<string, number>;
}

export interface Question {
  id: number;
  text: string;
  choices: Choice[];
}

export interface ResultDetail {
  description: string;
  reasons: string[];
  failurePattern: string;
  sevenDayPlan: string[];
  actionOptions: {
    free: string;
    lowCost: string;
    fastest: string;
  };
  serviceProposal: {
    title?: string;
    description: string;
    affiliateLink?: string;
    affiliateBanner?: string;
  };
}

export interface Diagnosis {
  slug: string;
  category: DiagnosisCategory;
  categoryLabel: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  questionCountLabel: string;
  durationLabel: string;
  questions: Question[];
  resultMap: Record<string, string>;
  results: Record<string, ResultDetail>;
}

// Supabase から取得する軽量版（一覧表示用）
export interface DiagnosisSummary {
  id: string;
  slug: string;
  category: DiagnosisCategory;
  categoryLabel: string;
  title: string;
  description: string;
  questionCountLabel: string;
  durationLabel: string;
  displayOrder: number;
}
