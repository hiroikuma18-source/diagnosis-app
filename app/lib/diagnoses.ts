import type { Diagnosis } from "./types";

export const diagnoses: Diagnosis[] = [
  {
    slug: "personality-type",
    category: "personality",
    categoryLabel: "性格診断",
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
          { text: "明るい・ノリがいい", scores: { extrovert: 1, emotion: 1 } },
          { text: "落ち着いている", scores: { introvert: 1, logic: 1 } },
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
    resultMap: {
      action: "リーダー型",
      extrovert: "ムードメーカー型",
      intuition: "チャレンジャー型",
      emotion: "クリエイター型",
      introvert: "サポーター型",
      logic: "プランナー型",
    },
    results: {
      リーダー型: {
        description: "行動力が高く、周囲を引っ張る力があるタイプです。",
        reason:
          "困難な状況でも迷わず動き、行動を通じて周囲の信頼を積み上げてきたタイプです。",
        strengths: [
          "決断が速く、スピード感を持って動ける",
          "チームや周囲を自然と引っ張れる",
          "結果にコミットする強い意志がある",
        ],
        weaknesses: [
          "細部を見落としやすい",
          "ペースが速すぎて周囲がついてこないことも",
        ],
        suitableOptions: ["マネジメント職", "起業・独立", "営業リーダー"],
        nextStep:
          "あなたのリーダーシップを活かせる環境に飛び込もう。マネジメントや起業にも向いています。",
      },
      ムードメーカー型: {
        description: "明るく、人との関わりの中で力を発揮するタイプです。",
        reason:
          "人と関わることでエネルギーが上がり、自然と場の空気を作り出せます。",
        strengths: [
          "誰とでも打ち解けられる",
          "場の空気を明るくできる",
          "人脈を広げるのが得意",
        ],
        weaknesses: [
          "一人での作業が続くとモチベーションが落ちやすい",
          "深く考えすぎて疲れることも",
        ],
        suitableOptions: [
          "営業・接客",
          "SNS発信・インフルエンサー",
          "イベント・企画職",
        ],
        nextStep:
          "社交性を武器に、人前に立てる仕事やSNS発信を始めてみよう。",
      },
      チャレンジャー型: {
        description: "直感と行動力で新しいことに挑戦できるタイプです。",
        reason:
          "新しい環境や変化をポジティブに捉え、直感に従って動くことで道を切り開きます。",
        strengths: [
          "変化に強くすぐ適応できる",
          "新しいことへの恐れが少ない",
          "直感的に本質を掴める",
        ],
        weaknesses: ["計画が甘くなりがち", "継続が苦手なこともある"],
        suitableOptions: [
          "スタートアップ・新規事業",
          "フリーランス",
          "クリエイティブ職",
        ],
        nextStep:
          "まずやってみる精神を活かして、新しいことに一歩踏み出してみよう。",
      },
      クリエイター型: {
        description: "自分の世界観を大切にしながら発想できるタイプです。",
        reason:
          "感情や感性が豊かで、独自の視点から価値を生み出す力があります。",
        strengths: [
          "独自の世界観や美意識を持つ",
          "感情を表現する力がある",
          "共感力が高い",
        ],
        weaknesses: [
          "評価を気にしすぎることがある",
          "気分にムラが出やすい",
        ],
        suitableOptions: [
          "デザイナー・アーティスト",
          "ライター・ブロガー",
          "動画クリエイター",
        ],
        nextStep:
          "あなたの感性を作品やコンテンツとして発信してみよう。",
      },
      サポーター型: {
        description: "相手の気持ちに寄り添い、支えることが得意なタイプです。",
        reason:
          "周囲の変化に敏感で、誰かの力になることに深い充実感を覚えます。",
        strengths: [
          "相手の気持ちを敏感に察知できる",
          "縁の下の力持ちとして信頼される",
          "丁寧な仕事で安心感を与えられる",
        ],
        weaknesses: [
          "自分の意見を言いにくい",
          "一人で抱え込みすぎることも",
        ],
        suitableOptions: [
          "カウンセラー・サポート職",
          "教育・コーチング",
          "事務・バックオフィス",
        ],
        nextStep:
          "あなたの共感力を活かして、人を支えるポジションで輝こう。",
      },
      プランナー型: {
        description: "落ち着いて考え、計画的に進めるのが得意なタイプです。",
        reason:
          "論理的に物事を整理し、リスクを見越した上で確実に進める力があります。",
        strengths: [
          "計画を立てるのが得意",
          "冷静に問題を分析できる",
          "確実に成果を積み上げられる",
        ],
        weaknesses: [
          "考えすぎて動き出しが遅くなることも",
          "予想外の事態に戸惑いやすい",
        ],
        suitableOptions: [
          "プロジェクトマネージャー",
          "アナリスト・コンサルタント",
          "エンジニア・企画職",
        ],
        nextStep:
          "あなたの計画力を活かして、戦略的なキャリアを描いてみよう。",
      },
    },
  },
  {
    slug: "sidejob-type",
    category: "sidejob",
    categoryLabel: "副業診断",
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
          { text: "短期間で大きく稼げる可能性", scores: { active: 2 } },
        ],
      },
      {
        id: 4,
        text: "働き方の好みは？",
        choices: [
          { text: "一人で進めたい", scores: { solo: 2 } },
          { text: "人と関わりながら進めたい", scores: { communication: 2 } },
        ],
      },
      {
        id: 5,
        text: "新しいことに対しては？",
        choices: [
          { text: "まず調べてから始めたい", scores: { steady: 1, solo: 1 } },
          { text: "とりあえずやってみたい", scores: { active: 2 } },
        ],
      },
      {
        id: 6,
        text: "理想の副業スタイルは？",
        choices: [
          { text: "在宅で完結したい", scores: { solo: 2 } },
          { text: "人脈や営業力を活かしたい", scores: { communication: 2 } },
        ],
      },
    ],
    resultMap: {
      steady: "コツコツ型副業向き",
      active: "行動型副業向き",
      writing: "ライティング副業向き",
      communication: "コミュニケーション型副業向き",
      solo: "在宅ワーク型副業向き",
    },
    results: {
      コツコツ型副業向き: {
        description:
          "地道に積み上げる作業が得意で、継続型の副業と相性が良いタイプです。",
        reason:
          "長期的な積み上げでじわじわと成果が出る仕事が向いています。焦らず続けることで大きなリターンが得られます。",
        strengths: [
          "継続力があり、途中で諦めにくい",
          "小さな改善を積み重ねるのが得意",
          "安定したペースで取り組める",
        ],
        weaknesses: [
          "短期間での大きな成果は出にくい",
          "急な変化への対応が苦手なこともある",
        ],
        suitableOptions: ["ブログ・アフィリエイト", "動画編集", "せどり・物販"],
        nextStep:
          "継続力が武器になるブログやYouTubeを今日から始めてみよう。",
        affiliateLink: "https://example.com/steady",
      },
      行動型副業向き: {
        description:
          "まず動いて経験を積むのが得意で、実践しながら伸びる副業に向いています。",
        reason:
          "失敗を恐れず挑戦し続けることで、短期間でスキルと収益を積み上げます。",
        strengths: [
          "スピード感を持って取り組める",
          "実践から素早く学べる",
          "挑戦への抵抗が少ない",
        ],
        weaknesses: [
          "計画が甘くなりがち",
          "継続よりも新しいことに目が向きやすい",
        ],
        suitableOptions: ["フリーランス営業", "転売・フリマ", "Webライター"],
        nextStep:
          "まずは1件受注を目標に、クラウドソーシングに登録してみよう。",
        affiliateLink: "https://example.com/action",
      },
      ライティング副業向き: {
        description:
          "文章で価値を伝える力があり、記事作成やコンテンツ制作系の副業と相性が良いです。",
        reason:
          "言葉で人の心を動かす力があり、コンテンツビジネスと相性が良いです。",
        strengths: [
          "文章で分かりやすく伝えられる",
          "読者の気持ちを考えた表現ができる",
          "継続的に発信できる",
        ],
        weaknesses: [
          "単価が上がるまで時間がかかる",
          "ネタ切れで悩むことも",
        ],
        suitableOptions: [
          "Webライター",
          "ブログ・アフィリエイト",
          "SNSライティング代行",
        ],
        nextStep:
          "クラウドワークスでライター案件に応募するところから始めよう。",
        affiliateLink: "https://example.com/writing",
      },
      コミュニケーション型副業向き: {
        description:
          "人と関わることが得意で、営業・接客・相談対応系の副業に向いています。",
        reason:
          "人との会話から信頼を積み上げ、口コミや紹介で収益を伸ばせます。",
        strengths: [
          "人との関係構築が得意",
          "話を引き出すのがうまい",
          "信頼されやすい",
        ],
        weaknesses: [
          "人間関係で疲れることもある",
          "一人での作業が続くと辛くなりやすい",
        ],
        suitableOptions: [
          "コーチング・相談業",
          "営業代行",
          "SNSアカウント運用代行",
        ],
        nextStep:
          "あなたのコミュ力を活かして、コーチングや相談業を試してみよう。",
        affiliateLink: "https://example.com/communication",
      },
      在宅ワーク型副業向き: {
        description:
          "一人で集中して進めるのが得意で、在宅で完結する副業と相性が良いです。",
        reason:
          "静かな環境で集中して取り組むことで、高品質な成果を出せます。",
        strengths: [
          "集中力が高く、自分のペースで進められる",
          "コツコツ取り組む忍耐力がある",
          "品質にこだわれる",
        ],
        weaknesses: [
          "モチベーション管理が自分次第",
          "孤独感を感じやすい",
        ],
        suitableOptions: [
          "データ入力・事務",
          "イラスト・デザイン",
          "プログラミング副業",
        ],
        nextStep:
          "在宅で完結するスキル系副業（デザイン・プログラミング）の学習を始めよう。",
        affiliateLink: "https://example.com/remote",
      },
    },
  },
  {
    slug: "strength-type",
    category: "strength",
    categoryLabel: "強み診断",
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
    resultMap: {
      action: "行動力タイプ",
      support: "サポートタイプ",
      communication: "コミュニケーションタイプ",
      steady: "継続力タイプ",
      logic: "分析力タイプ",
    },
    results: {
      行動力タイプ: {
        description:
          "まず動いて成果を作るのが得意な、推進力のあるタイプです。",
        reason:
          "考えるより先に動くことで、実践知識と経験を積み上げてきたタイプです。",
        strengths: [
          "スピード感を持って物事を進められる",
          "実行力があり、確実に結果を出せる",
          "挑戦することをいとわない",
        ],
        weaknesses: [
          "計画不足になることも",
          "無駄な動きが増えがち",
        ],
        suitableOptions: ["営業・事業開発", "起業・副業", "スポーツ・フィジカル系"],
        nextStep:
          "あなたの行動力を活かして、まずは一つ新しいことに挑戦してみよう。",
      },
      サポートタイプ: {
        description:
          "周囲を支え、気配りや共感で価値を出せるタイプです。",
        reason:
          "人の気持ちに敏感で、自然と相手が求めることを察知できます。",
        strengths: [
          "気配りと観察力がある",
          "人を安心させる力がある",
          "縁の下で確実に貢献できる",
        ],
        weaknesses: [
          "自分のことを後回しにしがち",
          "評価されにくいポジションに甘んじることも",
        ],
        suitableOptions: [
          "カスタマーサポート",
          "教育・指導",
          "チームサポート職",
        ],
        nextStep:
          "あなたのサポート力を武器に、コーチングや教育分野を探ってみよう。",
      },
      コミュニケーションタイプ: {
        description:
          "人と関わる中で力を発揮し、会話や調整が得意なタイプです。",
        reason:
          "人と話す中で情報やアイデアを引き出し、場をまとめる能力に長けています。",
        strengths: [
          "会話から信頼を作れる",
          "複数の意見をまとめる力がある",
          "調整・交渉が得意",
        ],
        weaknesses: [
          "一人の時間が不足すると疲弊することも",
          "全員に合わせすぎて消耗することも",
        ],
        suitableOptions: ["営業・折衝職", "PR・広報", "イベントプランナー"],
        nextStep:
          "あなたのコミュ力を活かしたキャリア・副業を積極的に探してみよう。",
      },
      継続力タイプ: {
        description:
          "コツコツ積み上げて成果につなげる、安定感のあるタイプです。",
        reason:
          "小さな努力を積み重ねることを苦と思わず、着実に実力をつけてきたタイプです。",
        strengths: [
          "長期的なプロジェクトに強い",
          "信頼されやすく任される",
          "品質を維持しながら続けられる",
        ],
        weaknesses: [
          "新しいことへの切り替えに時間がかかる",
          "急な変化に弱い",
        ],
        suitableOptions: [
          "専門職・技術職",
          "ライター・クリエイター",
          "研究・開発",
        ],
        nextStep:
          "あなたの継続力を活かして、スキルを深める学習・資格取得に挑戦しよう。",
      },
      分析力タイプ: {
        description:
          "物事を整理して考え、冷静に判断できるタイプです。",
        reason:
          "感情に左右されずにデータや事実を見て判断できる、希少な能力を持っています。",
        strengths: [
          "論理的に考え、整理して伝えられる",
          "リスクを事前に察知できる",
          "データから本質を読み取れる",
        ],
        weaknesses: [
          "考えすぎて行動が遅くなることも",
          "感情的なアプローチが苦手なことも",
        ],
        suitableOptions: [
          "エンジニア・データサイエンティスト",
          "コンサルタント",
          "財務・分析職",
        ],
        nextStep:
          "あなたの分析力を活かして、データや戦略に関わるキャリアを目指そう。",
      },
    },
    
  },
  {
  slug: "self-study-or-school-diagnosis",
  category: "strength",
  categoryLabel: "学習診断",
  title: "独学 or スクール向き診断",
  description: "10個の質問に答えるだけで、あなたが独学向きか、スクール向きか、または両方を組み合わせるべきかがわかります。",
  seoTitle: "独学 or スクール向き診断｜あなたに合う学び方を10問で判定",
  seoDescription:
    "独学で進めるべきか、スクールを活用した方がいいかを10問で診断。継続力・自己解決力・期限・サポート必要度から、あなたに合う学習スタイルを判定します。",
  questionCountLabel: "10問",
  durationLabel: "約2分",
  questions: [
    {
      id: 1,
      text: "新しいことを学ぶとき、どの進め方が一番しっくりきますか？",
      choices: [
        { text: "まず自分で調べて試しながら進めたい", scores: { selfStudy: 2 } },
        { text: "最初だけ道筋がほしいが、途中からは自分で進めたい", scores: { hybrid: 2 } },
        { text: "最初から手順や正解を教えてもらえる方が安心", scores: { school: 2 } },
      ],
    },
    {
      id: 2,
      text: "わからないことが出てきたとき、あなたに近いのは？",
      choices: [
        { text: "自分で調べて解決することが多い", scores: { selfStudy: 2 } },
        { text: "少し調べて難しければ人に聞く", scores: { hybrid: 2 } },
        { text: "すぐに質問できる環境がないと止まりやすい", scores: { school: 2 } },
      ],
    },
    {
      id: 3,
      text: "これまでの勉強やスキル習得ではどうでしたか？",
      choices: [
        { text: "自力でもある程度続けられた経験が多い", scores: { selfStudy: 2 } },
        { text: "内容によって続く時と続かない時がある", scores: { hybrid: 2 } },
        { text: "一人だと途中で止まってしまうことが多い", scores: { school: 2 } },
      ],
    },
    {
      id: 4,
      text: "今回の学習で求めているものに一番近いのは？",
      choices: [
        { text: "自分のペースでじっくり身につけたい", scores: { selfStudy: 2 } },
        { text: "無理なく進めつつ、必要なら効率も上げたい", scores: { hybrid: 2 } },
        { text: "できるだけ早く結果を出したい", scores: { school: 2 } },
      ],
    },
    {
      id: 5,
      text: "学習中のフィードバックについてどう感じますか？",
      choices: [
        { text: "なくても進められる", scores: { selfStudy: 2 } },
        { text: "節目ごとに確認してもらえると助かる", scores: { hybrid: 2 } },
        { text: "定期的にチェックしてもらわないと不安", scores: { school: 2 } },
      ],
    },
    {
      id: 6,
      text: "日々の学習時間の確保はしやすいですか？",
      choices: [
        { text: "比較的安定して確保できる", scores: { selfStudy: 2 } },
        { text: "波はあるが、工夫すればなんとか取れる", scores: { hybrid: 2 } },
        { text: "忙しくて一人だと後回しになりやすい", scores: { school: 2 } },
      ],
    },
    {
      id: 7,
      text: "学習にお金をかけることについて、一番近い考えは？",
      choices: [
        { text: "できるだけ低コストで進めたい", scores: { selfStudy: 2 } },
        { text: "必要な部分だけなら投資してもいい", scores: { hybrid: 2 } },
        { text: "効率が上がるならしっかり投資してもいい", scores: { school: 2 } },
      ],
    },
    {
      id: 8,
      text: "学習のゴールは今どれくらい明確ですか？",
      choices: [
        { text: "ある程度明確で、やるべきことも見えている", scores: { selfStudy: 2 } },
        { text: "方向性はあるが、進め方はまだ迷っている", scores: { hybrid: 2 } },
        { text: "ゴールも進め方も整理しきれていない", scores: { school: 2 } },
      ],
    },
    {
      id: 9,
      text: "学習を続けるために必要なのは？",
      choices: [
        { text: "自分で計画を立てて進めること", scores: { selfStudy: 2 } },
        { text: "最低限の締切や伴走があること", scores: { hybrid: 2 } },
        { text: "課題・締切・管理などの強制力があること", scores: { school: 2 } },
      ],
    },
    {
      id: 10,
      text: "うまくいかない時の自分に近いのは？",
      choices: [
        { text: "試行錯誤しながら立て直せる", scores: { selfStudy: 2 } },
        { text: "少し相談できればまた進められる", scores: { hybrid: 2 } },
        { text: "不安になって止まりやすい", scores: { school: 2 } },
      ],
    },
  ],
  resultMap: {
    selfStudy: "独学向きタイプ",
    hybrid: "ハイブリッドタイプ",
    school: "スクール向きタイプ",
  },
  results: {
    "独学向きタイプ": {
      description:
        "あなたは、自分で調べて考えながら進める独学スタイルと相性がいいタイプです。ゴールがある程度見えていて、試行錯誤を前向きに続けられる傾向があります。",
      reason:
        "自己解決力・継続力・自走力が比較的高く、サポートがなくても学習を前に進めやすい傾向があるためです。",
      strengths: [
        "自分のペースで学習を進めやすい",
        "コストを抑えて挑戦しやすい",
        "必要な情報を選びながら柔軟に学べる",
      ],
      weaknesses: [
        "方向性を誤ると遠回りしやすい",
        "客観的なフィードバック不足で伸び悩むことがある",
      ],
      suitableOptions: [
        "書籍や動画教材での独学",
        "無料教材＋必要に応じた単発相談",
        "学習ロードマップ記事を見ながら進める方法",
      ],
      nextStep:
        "まずは学習目的を1つに絞り、30日分の学習計画を作ってください。そのうえで、無料教材1つと実践課題1つを決めて始めるのがおすすめです。",
      affiliateLink: "https://example.com/self-study",
    },
    "ハイブリッドタイプ": {
      description:
        "あなたは、基本は自分で進めつつ、要所でサポートを入れると伸びやすいタイプです。完全独学でも完全スクールでもなく、必要な部分だけ支援を受ける形が合っています。",
      reason:
        "自走できる場面はある一方で、方向修正・継続・フィードバックの支援があると成果が安定しやすい傾向があるためです。",
      strengths: [
        "コストと効率のバランスを取りやすい",
        "必要な支援だけを受けて前進できる",
        "独学の自由さとサポートの安心感を両立しやすい",
      ],
      weaknesses: [
        "支援を入れるタイミングを間違えると中途半端になりやすい",
        "一人で抱え込みすぎると失速することがある",
      ],
      suitableOptions: [
        "独学＋メンター相談",
        "買い切り教材＋添削サービス",
        "短期講座や無料体験を部分的に使う方法",
      ],
      nextStep:
        "最初の1週間で独学を試し、詰まった部分だけ相談・添削・講座で補う設計にしてください。最初から全部を外注しないのがコツです。",
      affiliateLink: "https://example.com/hybrid",
    },
    "スクール向きタイプ": {
      description:
        "あなたは、一人で進めるよりも、学習の道筋・フィードバック・強制力がある環境の方が成果につながりやすいタイプです。特に期限がある目標ではスクール活用の価値が高いです。",
      reason:
        "継続の仕組み、質問できる環境、進捗管理などの外部サポートがあることで、学習効率と完了率が上がりやすい傾向があるためです。",
      strengths: [
        "最短ルートで学びやすい",
        "質問・添削で理解が深まりやすい",
        "一人では続かない学習も完走しやすい",
      ],
      weaknesses: [
        "費用がかかりやすい",
        "環境任せになると自走力が育ちにくい",
      ],
      suitableOptions: [
        "無料体験付きスクール",
        "伴走型の講座やコーチング",
        "添削・質問サポートがある学習サービス",
      ],
      nextStep:
        "まずは無料体験や説明会で、学習サポートの内容・質問対応・受講後の出口を比較してください。料金だけで決めず、続けやすさと目的達成への近さで選ぶのが重要です。",
      affiliateLink: "https://example.com/school",
    },
  },
},
{
  slug: "learning-dropout-cause-diagnosis",
  category: "strength",
  categoryLabel: "学習診断",
  title: "挫折原因診断",
  description: "学習が続かない本当の原因を10問で診断。あなたに合う立て直し方もわかります。",
  seoTitle: "挫折原因診断｜勉強が続かない理由を10問でチェック",
  seoDescription:
    "勉強が続かない原因を10問で診断。計画倒れ・完璧主義・孤独・目的の弱さなど、あなたの挫折パターンを見抜いて改善のヒントを提示します。",
  questionCountLabel: "10問",
  durationLabel: "約2分",
  questions: [
    {
      id: 1,
      text: "勉強を始めるとき、最初の状態に近いのは？",
      choices: [
        { text: "やる気はあるが計画が曖昧なまま始める", scores: { noPlan: 2 } },
        { text: "最初から完璧な計画を作ろうとする", scores: { perfectionism: 2 } },
        { text: "そもそも何のためにやるかがぼんやりしている", scores: { weakPurpose: 2 } },
      ],
    },
    {
      id: 2,
      text: "勉強が止まりやすいタイミングは？",
      choices: [
        { text: "忙しくなって予定通りできなくなった時", scores: { noPlan: 2 } },
        { text: "少し遅れると一気にやる気がなくなる時", scores: { perfectionism: 2 } },
        { text: "一人で続けていて孤独を感じた時", scores: { lonely: 2 } },
      ],
    },
    {
      id: 3,
      text: "うまく進まない時の考え方は？",
      choices: [
        { text: "何を優先すべきかわからなくなる", scores: { noPlan: 2 } },
        { text: "ちゃんとできていない自分が嫌になる", scores: { perfectionism: 2 } },
        { text: "これをやる意味あるのかなと思う", scores: { weakPurpose: 2 } },
      ],
    },
    {
      id: 4,
      text: "普段の学習スタイルに近いのは？",
      choices: [
        { text: "その日の気分でやる内容を決めがち", scores: { noPlan: 2 } },
        { text: "理想通りにできないとやり直したくなる", scores: { perfectionism: 2 } },
        { text: "誰にも見られていないと続きにくい", scores: { lonely: 2 } },
      ],
    },
    {
      id: 5,
      text: "教材や学習法を選ぶ時は？",
      choices: [
        { text: "いろいろ手を出してしまい、絞れない", scores: { noPlan: 2 } },
        { text: "一番正しい方法を探し続けてしまう", scores: { perfectionism: 2 } },
        { text: "選んでも途中で目的を見失いやすい", scores: { weakPurpose: 2 } },
      ],
    },
    {
      id: 6,
      text: "勉強を休んだあとに起こりやすいのは？",
      choices: [
        { text: "どこから再開するか分からなくなる", scores: { noPlan: 2 } },
        { text: "遅れを取り戻せない気がして嫌になる", scores: { perfectionism: 2 } },
        { text: "一人だとそのまま戻れなくなる", scores: { lonely: 2 } },
      ],
    },
    {
      id: 7,
      text: "成果が出るまで時間がかかるときは？",
      choices: [
        { text: "進め方を頻繁に変えてしまう", scores: { noPlan: 2 } },
        { text: "自分には向いていないと感じやすい", scores: { perfectionism: 2 } },
        { text: "そもそも何のためにやるのか薄れてくる", scores: { weakPurpose: 2 } },
      ],
    },
    {
      id: 8,
      text: "勉強を続けるうえで一番必要なのは？",
      choices: [
        { text: "無理のない順番と小さな計画", scores: { noPlan: 2 } },
        { text: "完璧でなくても進めていい感覚", scores: { perfectionism: 2 } },
        { text: "声をかけてくれる人や仲間", scores: { lonely: 2 } },
      ],
    },
    {
      id: 9,
      text: "今のあなたに一番近い悩みは？",
      choices: [
        { text: "何をどれだけやればいいか分からない", scores: { noPlan: 2 } },
        { text: "できない日があると全部ダメに感じる", scores: { perfectionism: 2 } },
        { text: "頑張る理由が弱く、熱が続かない", scores: { weakPurpose: 2 } },
      ],
    },
    {
      id: 10,
      text: "立て直すならどれが一番効果がありそうですか？",
      choices: [
        { text: "1週間単位でやることを絞る", scores: { noPlan: 2 } },
        { text: "最低ラインを決めて自分を責めない", scores: { perfectionism: 2 } },
        { text: "相談や報告ができる環境を作る", scores: { lonely: 2 } },
      ],
    },
  ],
  resultMap: {
    noPlan: "計画迷子タイプ",
    perfectionism: "完璧主義タイプ",
    lonely: "孤独失速タイプ",
    weakPurpose: "目的ぼんやりタイプ",
  },
  results: {
    "計画迷子タイプ": {
      description:
        "あなたは、やる気はあるのに『何をどの順番で進めるか』が曖昧なまま走り出してしまい、途中で迷って止まりやすいタイプです。",
      reason:
        "継続力そのものよりも、学習の順番・範囲・優先順位が定まっていないことが、挫折の主な原因になりやすい傾向があります。",
      strengths: ["学ぶ意欲はある", "新しいことに前向き", "切り替えが早い"],
      weaknesses: ["教材や方法を変えすぎやすい", "再開ポイントが曖昧になりやすい"],
      suitableOptions: ["1週間単位の学習計画", "やることを3つに絞る進め方", "ロードマップ付き教材"],
      nextStep:
        "まずは『今週やることを3つだけ決める』ことから始めてください。1日単位ではなく、1週間単位で管理するのが合っています。",
      affiliateLink: "https://example.com/plan",
    },
    "完璧主義タイプ": {
      description:
        "あなたは、真面目で基準が高いぶん、少し崩れると一気にモチベーションを落としやすいタイプです。",
      reason:
        "継続できない原因は意志の弱さではなく、『理想通りにできない自分を許せないこと』にある可能性が高いです。",
      strengths: ["丁寧に学べる", "理解を深めやすい", "質を重視できる"],
      weaknesses: ["小さな遅れで止まりやすい", "スタートが重くなりやすい"],
      suitableOptions: ["最低ラインを決める学習法", "短時間でも前進扱いにする設計", "伴走やコーチング"],
      nextStep:
        "『毎日完璧にやる』ではなく、『週に4回、15分でもやれば合格』のように最低ラインを作ってください。",
      affiliateLink: "https://example.com/perfection",
    },
    "孤独失速タイプ": {
      description:
        "あなたは、一人で黙々と進めるよりも、報告・相談・フィードバックがある環境で継続しやすいタイプです。",
      reason:
        "能力不足ではなく、外部との接点が少ないことで熱量が落ち、途中で失速しやすい傾向があります。",
      strengths: ["人から学ぶ吸収力が高い", "フィードバックで伸びやすい", "環境が整うと継続しやすい"],
      weaknesses: ["一人だと止まりやすい", "不安を抱え込みやすい"],
      suitableOptions: ["コミュニティ付き講座", "メンター相談", "定期報告のある学習サービス"],
      nextStep:
        "まずは『週1回誰かに進捗を報告する仕組み』を作ってください。完全独学より、軽い伴走がある方が合います。",
      affiliateLink: "https://example.com/community",
    },
    "目的ぼんやりタイプ": {
      description:
        "あなたは、学ぶ気持ちはあるものの、『なぜ今これをやるのか』が弱いため、継続のエネルギーが切れやすいタイプです。",
      reason:
        "やる気不足ではなく、学習の先にあるメリットや期限が曖昧で、優先順位を上げきれていない可能性があります。",
      strengths: ["興味の幅が広い", "柔軟に選択肢を探せる", "新しい分野に入りやすい"],
      weaknesses: ["優先順位が下がりやすい", "途中で意味を見失いやすい"],
      suitableOptions: ["目的整理ワーク", "ゴールから逆算する学習計画", "資格や案件などの明確な目標設定"],
      nextStep:
        "『3か月後にどうなっていたいか』を1文で書き出してください。まずは目標を曖昧な興味から具体的な目的に変えるのが先です。",
      affiliateLink: "https://example.com/purpose",
    },
  },
},
{
  slug: "learning-plan-diagnosis",
  category: "strength",
  categoryLabel: "学習診断",
  title: "学習計画診断",
  description: "今のあなたに合う学習の進め方を診断。無理なく続けやすい今月の3ステップが見つかります。",
  seoTitle: "学習計画診断｜今のあなたに合う勉強プランをチェック",
  seoDescription:
    "勉強時間、目的、期限、得意な進め方から、あなたに合う学習計画タイプを診断。今月やるべき3ステップもわかります。",
  questionCountLabel: "10問",
  durationLabel: "約2分",
  questions: [
    {
      id: 1,
      text: "今の学習目的に一番近いのは？",
      choices: [
        { text: "基礎を固めたい", scores: { steady: 2 } },
        { text: "短期間で成果を出したい", scores: { sprint: 2 } },
        { text: "作りながら学びたい", scores: { project: 2 } },
      ],
    },
    {
      id: 2,
      text: "1週間で使える学習時間は？",
      choices: [
        { text: "少なめだがコツコツ続けられる", scores: { steady: 2 } },
        { text: "限られるが集中して使いたい", scores: { sprint: 2 } },
        { text: "波はあるがまとまった時間を取りやすい", scores: { project: 2 } },
      ],
    },
    {
      id: 3,
      text: "学習するときの理想は？",
      choices: [
        { text: "毎日少しずつ積み上げたい", scores: { steady: 2 } },
        { text: "期限に向けて一気に進めたい", scores: { sprint: 2 } },
        { text: "実際に手を動かして覚えたい", scores: { project: 2 } },
      ],
    },
    {
      id: 4,
      text: "理解しやすいのはどれですか？",
      choices: [
        { text: "順番に基礎から学ぶ", scores: { steady: 2 } },
        { text: "試験や締切を意識して覚える", scores: { sprint: 2 } },
        { text: "作品や成果物を作りながら学ぶ", scores: { project: 2 } },
      ],
    },
    {
      id: 5,
      text: "途中で不安になるのは？",
      choices: [
        { text: "本当に積み上がっているか分からないこと", scores: { steady: 2 } },
        { text: "期限に間に合わないこと", scores: { sprint: 2 } },
        { text: "何を作ればいいか分からないこと", scores: { project: 2 } },
      ],
    },
    {
      id: 6,
      text: "今ほしい成果に近いのは？",
      choices: [
        { text: "基礎知識や理解の安定", scores: { steady: 2 } },
        { text: "試験合格や短期成果", scores: { sprint: 2 } },
        { text: "ポートフォリオや実践物", scores: { project: 2 } },
      ],
    },
    {
      id: 7,
      text: "勉強の進み方として一番合うのは？",
      choices: [
        { text: "毎週同じペースで進む", scores: { steady: 2 } },
        { text: "優先順位をつけて一気に進む", scores: { sprint: 2 } },
        { text: "完成物を目標に逆算して進む", scores: { project: 2 } },
      ],
    },
    {
      id: 8,
      text: "モチベーションが上がるのは？",
      choices: [
        { text: "昨日より理解できた実感", scores: { steady: 2 } },
        { text: "ゴールに近づく手応え", scores: { sprint: 2 } },
        { text: "形になるものが増えること", scores: { project: 2 } },
      ],
    },
    {
      id: 9,
      text: "今の自分に必要なのは？",
      choices: [
        { text: "無理のない学習習慣", scores: { steady: 2 } },
        { text: "集中して成果を出す計画", scores: { sprint: 2 } },
        { text: "実践経験を積む機会", scores: { project: 2 } },
      ],
    },
    {
      id: 10,
      text: "今月の理想の終わり方は？",
      choices: [
        { text: "基礎を一通り理解できている", scores: { steady: 2 } },
        { text: "目標に対して必要範囲を終えている", scores: { sprint: 2 } },
        { text: "1つ成果物やアウトプットがある", scores: { project: 2 } },
      ],
    },
  ],
  resultMap: {
    steady: "積み上げ安定型",
    sprint: "短期集中型",
    project: "実践プロジェクト型",
  },
  results: {
    "積み上げ安定型": {
      description:
        "あなたは、毎日少しずつでも継続することで成果が出やすいタイプです。派手さより、積み上げの設計が重要です。",
      reason:
        "短期勝負よりも、基礎を安定して積み上げることで理解と習慣が定着しやすい傾向があります。",
      strengths: ["無理なく続けやすい", "基礎が抜けにくい", "再現性が高い"],
      weaknesses: ["成果実感が遅く感じやすい", "ペースがゆるみやすい"],
      suitableOptions: ["毎日15〜30分の学習計画", "基礎教材の反復", "習慣化アプリやチェック表"],
      nextStep:
        "今月は『毎日やる最小単位』を決めてください。例：平日20分、休日40分。まず習慣を固定するのが最優先です。",
      affiliateLink: "https://example.com/steady",
    },
    "短期集中型": {
      description:
        "あなたは、期限や目標があると集中力を発揮しやすいタイプです。今月は広くやるより、必要な範囲に絞るのが効果的です。",
      reason:
        "日々の積み上げだけでなく、『いつまでに何を終えるか』が明確な方が動きやすい傾向があります。",
      strengths: ["ゴールがあると強い", "優先順位をつけやすい", "短期間で成果を出しやすい"],
      weaknesses: ["期限後に失速しやすい", "詰め込みすぎやすい"],
      suitableOptions: ["試験対策プラン", "締切付き講座", "週単位の集中学習"],
      nextStep:
        "今月は『やらないこと』を決めてください。目標達成に必要な範囲だけに絞ることで、短期の成果が出やすくなります。",
      affiliateLink: "https://example.com/sprint",
    },
    "実践プロジェクト型": {
      description:
        "あなたは、知識を先に詰め込むより、作りながら覚える方が伸びやすいタイプです。成果物ベースの計画が合っています。",
      reason:
        "インプット単体よりも、手を動かして形にすることで理解とモチベーションが高まりやすい傾向があります。",
      strengths: ["実践力がつきやすい", "モチベーションが続きやすい", "成果物が残る"],
      weaknesses: ["基礎が抜けたまま進みやすい", "テーマ選びで迷いやすい"],
      suitableOptions: ["作品制作型の学習", "課題付き教材", "ポートフォリオ講座"],
      nextStep:
        "今月は『小さく完成できる1テーマ』を決めてください。大きな目標より、1つ完成させることが次につながります。",
      affiliateLink: "https://example.com/project",
    },
  },
},
];
