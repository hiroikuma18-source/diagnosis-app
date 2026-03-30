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
  reason: string;
  strengths: string[];
  weaknesses: string[];
  suitableOptions: string[];
  nextStep: string;
  affiliateLink?: string;
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
