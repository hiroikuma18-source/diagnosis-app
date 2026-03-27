export const diagnoses = [
  {
    slug: "personality-type",
    title: "あなたの性格タイプ診断",
    description:
      "6つの簡単な質問に答えるだけで、あなたの性格タイプや強みがわかります。",
    seoTitle: "性格タイプ診断｜あなたの性格が1分でわかる",
    seoDescription:
      "簡単な質問に答えるだけで、あなたの性格タイプや特徴を診断します。",
    questionCountLabel: "6問",
    durationLabel: "約1分",
    questions: [
      {
        id: 1,
        text: "新しいことを始めるときは？",
        choices: [
          { text: "直感で動く", scores: { intuition: 2 } },
          { text: "しっかり調べる", scores: { logic: 2 } },
        ],
      },
      {
        id: 2,
        text: "人といるときの自分は？",
        choices: [
          { text: "エネルギーをもらう", scores: { extrovert: 2 } },
          { text: "一人の方が楽", scores: { introvert: 2 } },
        ],
      },
      {
        id: 3,
        text: "問題が起きたときは？",
        choices: [
          { text: "すぐ行動", scores: { action: 2 } },
          { text: "まず考える", scores: { logic: 1 } },
        ],
      },
      {
        id: 4,
        text: "友達からよく言われるのは？",
        choices: [
          {
            text: "明るい・ノリがいい",
            scores: { extrovert: 1, emotion: 1 },
          },
          {
            text: "落ち着いている",
            scores: { introvert: 1, logic: 1 },
          },
        ],
      },
      {
        id: 5,
        text: "決断するときは？",
        choices: [
          { text: "気持ち重視", scores: { emotion: 2 } },
          { text: "理屈重視", scores: { logic: 2 } },
        ],
      },
      {
        id: 6,
        text: "休日の過ごし方は？",
        choices: [
          { text: "アクティブ", scores: { action: 2 } },
          { text: "インドア", scores: { introvert: 1 } },
        ],
      },
    ],
  },
  {
    slug: "sidejob-type",
    title: "向いてる副業診断",
    description:
      "6つの質問に答えるだけで、あなたに向いている副業タイプがわかります。",
    seoTitle: "副業診断｜あなたに向いている副業が1分でわかる",
    seoDescription:
      "簡単な質問に答えるだけで、あなたに向いている副業タイプを診断します。",
    questionCountLabel: "6問",
    durationLabel: "約1分",
    questions: [
      {
        id: 1,
        text: "副業に使える時間は？",
        choices: [
          { text: "平日もコツコツ使える", scores: { steady: 2 } },
          { text: "休日にまとめて使いたい", scores: { active: 2 } },
        ],
      },
      {
        id: 2,
        text: "得意なのは？",
        choices: [
          { text: "文章を書くこと", scores: { writing: 2 } },
          { text: "人と話すこと", scores: { communication: 2 } },
        ],
      },
      {
        id: 3,
        text: "副業で重視したいのは？",
        choices: [
          { text: "安定して続けやすいこと", scores: { steady: 2 } },
          {
            text: "短期間で大きく稼げる可能性",
            scores: { active: 2 },
          },
        ],
      },
      {
        id: 4,
        text: "働き方の好みは？",
        choices: [
          { text: "一人で進めたい", scores: { solo: 2 } },
          {
            text: "人と関わりながら進めたい",
            scores: { communication: 2 },
          },
        ],
      },
      {
        id: 5,
        text: "新しいことに対しては？",
        choices: [
          {
            text: "まず調べてから始めたい",
            scores: { steady: 1, solo: 1 },
          },
          { text: "とりあえずやってみたい", scores: { active: 2 } },
        ],
      },
      {
        id: 6,
        text: "理想の副業スタイルは？",
        choices: [
          { text: "在宅で完結したい", scores: { solo: 2 } },
          {
            text: "人脈や営業力を活かしたい",
            scores: { communication: 2 },
          },
        ],
      },
    ],
  },
  {
    slug: "strength-type",
    title: "あなたの強み診断",
    description:
      "6つの質問に答えるだけで、あなたの強みや活かし方がわかります。",
    seoTitle: "強み診断｜あなたの強みや得意分野が1分でわかる",
    seoDescription:
      "簡単な質問に答えるだけで、あなたの強みや活かし方を診断します。",
    questionCountLabel: "6問",
    durationLabel: "約1分",
    questions: [
      {
        id: 1,
        text: "周りからよく言われるのは？",
        choices: [
          { text: "行動力がある", scores: { action: 2 } },
          { text: "気配りができる", scores: { support: 2 } },
        ],
      },
      {
        id: 2,
        text: "得意なことは？",
        choices: [
          { text: "人と話すこと", scores: { communication: 2 } },
          { text: "コツコツ続けること", scores: { steady: 2 } },
        ],
      },
      {
        id: 3,
        text: "問題が起きたときは？",
        choices: [
          { text: "すぐ行動する", scores: { action: 2 } },
          { text: "冷静に分析する", scores: { logic: 2 } },
        ],
      },
      {
        id: 4,
        text: "仕事で評価されるのは？",
        choices: [
          { text: "スピード感", scores: { action: 1 } },
          { text: "丁寧さ", scores: { steady: 2 } },
        ],
      },
      {
        id: 5,
        text: "人との関係で大事にするのは？",
        choices: [
          { text: "信頼関係", scores: { support: 2 } },
          { text: "楽しさ", scores: { communication: 2 } },
        ],
      },
      {
        id: 6,
        text: "自分の強みはどちらに近い？",
        choices: [
          { text: "論理的思考", scores: { logic: 2 } },
          { text: "共感力", scores: { support: 2 } },
        ],
      },
    ],
  },
];