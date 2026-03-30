import type { Question } from "../lib/types";

interface Props {
  question: Question;
  step: number;
  total: number;
  onAnswer: (scores: Record<string, number>) => void;
}

export default function QuestionRenderer({ question, step, total, onAnswer }: Props) {
  const progress = ((step + 1) / total) * 100;

  return (
    <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-10">
      <div className="mb-8">
        <p className="mb-3 text-sm font-semibold text-rose-500">
          QUESTION {step + 1}
        </p>

        <div className="mb-4 h-3 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose-400 to-sky-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mb-6 flex items-center justify-between text-xs text-slate-400">
          <span>{step + 1} / {total}</span>
          <span>{Math.round(progress)}%</span>
        </div>

        <h2 className="text-2xl font-bold leading-10 text-slate-900 sm:text-3xl">
          {question.text}
        </h2>
      </div>

      <div className="space-y-4">
        {question.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => onAnswer(choice.scores)}
            className="group w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5 text-left transition hover:border-rose-300 hover:bg-white hover:shadow-sm"
          >
            <span className="text-base font-medium text-slate-800 transition group-hover:text-rose-500">
              {choice.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
