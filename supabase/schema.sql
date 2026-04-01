-- =============================================
-- テーブル作成
-- =============================================

CREATE TABLE diagnoses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  category_label text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  seo_title text NOT NULL DEFAULT '',
  seo_description text NOT NULL DEFAULT '',
  question_count_label text NOT NULL DEFAULT '6問',
  duration_label text NOT NULL DEFAULT '約1分',
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnosis_id uuid NOT NULL REFERENCES diagnoses(id) ON DELETE CASCADE,
  display_order int NOT NULL,
  text text NOT NULL
);

CREATE TABLE choices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  display_order int NOT NULL,
  text text NOT NULL,
  scores jsonb NOT NULL DEFAULT '{}'
);

CREATE TABLE result_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnosis_id uuid NOT NULL REFERENCES diagnoses(id) ON DELETE CASCADE,
  score_key text NOT NULL,
  label text NOT NULL,
  description text NOT NULL DEFAULT '',
  reasons jsonb NOT NULL DEFAULT '[]',
  failure_pattern text NOT NULL DEFAULT '',
  seven_day_plan jsonb NOT NULL DEFAULT '[]',
  action_free text NOT NULL DEFAULT '',
  action_low_cost text NOT NULL DEFAULT '',
  action_fastest text NOT NULL DEFAULT '',
  service_description text NOT NULL DEFAULT '',
  affiliate_link text
);

-- =============================================
-- RLS（Row Level Security）
-- =============================================

ALTER TABLE diagnoses ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE choices ENABLE ROW LEVEL SECURITY;
ALTER TABLE result_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read diagnoses" ON diagnoses FOR SELECT USING (true);
CREATE POLICY "Public read questions" ON questions FOR SELECT USING (true);
CREATE POLICY "Public read choices" ON choices FOR SELECT USING (true);
CREATE POLICY "Public read result_types" ON result_types FOR SELECT USING (true);

-- =============================================
-- シードデータ（既存の診断3件）
-- =============================================

DO $$
DECLARE
  p_id uuid; -- personality-type
  s_id uuid; -- sidejob-type
  t_id uuid; -- strength-type
  q_id uuid;
BEGIN

-- =============================================
-- 性格タイプ診断
-- =============================================
INSERT INTO diagnoses (slug, category, category_label, title, description, seo_title, seo_description, question_count_label, duration_label, display_order)
VALUES ('personality-type', 'personality', '性格診断', 'あなたの性格タイプ診断',
  '6つの簡単な質問に答えるだけで、あなたの性格タイプや強みがわかります。',
  '性格タイプ診断｜あなたの性格が1分でわかる',
  '簡単な質問に答えるだけで、あなたの性格タイプや特徴を診断します。',
  '6問', '約1分', 1)
RETURNING id INTO p_id;

INSERT INTO questions (diagnosis_id, display_order, text) VALUES (p_id, 1, '新しいことを始めるときは？') RETURNING id INTO q_id;
INSERT INTO choices (question_id, display_order, text, scores) VALUES
  (q_id, 1, '直感で動く', '{"intuition": 2}'),
  (q_id, 2, 'しっかり調べる', '{"logic": 2}');

INSERT INTO questions (diagnosis_id, display_order, text) VALUES (p_id, 2, '人といるときの自分は？') RETURNING id INTO q_id;
INSERT INTO choices (question_id, display_order, text, scores) VALUES
  (q_id, 1, 'エネルギーをもらう', '{"extrovert": 2}'),
  (q_id, 2, '一人の方が楽', '{"introvert": 2}');

INSERT INTO questions (diagnosis_id, display_order, text) VALUES (p_id, 3, '問題が起きたときは？') RETURNING id INTO q_id;
INSERT INTO choices (question_id, display_order, text, scores) VALUES
  (q_id, 1, 'すぐ行動', '{"action": 2}'),
  (q_id, 2, 'まず考える', '{"logic": 1}');

INSERT INTO questions (diagnosis_id, display_order, text) VALUES (p_id, 4, '友達からよく言われるのは？') RETURNING id INTO q_id;
INSERT INTO choices (question_id, display_order, text, scores) VALUES
  (q_id, 1, '明るい・ノリがいい', '{"extrovert": 1, "emotion": 1}'),
  (q_id, 2, '落ち着いている', '{"introvert": 1, "logic": 1}');

INSERT INTO questions (diagnosis_id, display_order, text) VALUES (p_id, 5, '決断するときは？') RETURNING id INTO q_id;
INSERT INTO choices (question_id, display_order, text, scores) VALUES
  (q_id, 1, '気持ち重視', '{"emotion": 2}'),
  (q_id, 2, '理屈重視', '{"logic": 2}');

INSERT INTO questions (diagnosis_id, display_order, text) VALUES (p_id, 6, '休日の過ごし方は？') RETURNING id INTO q_id;
INSERT INTO choices (question_id, display_order, text, scores) VALUES
  (q_id, 1, 'アクティブ', '{"action": 2}'),
  (q_id, 2, 'インドア', '{"introvert": 1}');

INSERT INTO result_types (diagnosis_id, score_key, label, description, reasons, failure_pattern, seven_day_plan, action_free, action_low_cost, action_fastest, service_description, affiliate_link) VALUES
(p_id, 'action', 'リーダー型',
  '行動力が高く、周囲を引っ張る力があるタイプです。',
  '["目標を決めたらすぐ動ける行動力がある", "周囲を巻き込む推進力とカリスマがある", "プレッシャーに強く結果にコミットできる"]',
  'スピードを優先するあまり周囲への確認・相談を省いてしまう。独走してチームが崩れる。',
  '["Day1: 今月の最重要ゴールを1つだけ決める", "Day2: そのゴールを信頼できる人に宣言する", "Day3: 今週やることを3つに絞る", "Day4: 進捗をチェックして詰まりを潰す", "Day5: 周囲に感謝・フィードバックを伝える", "Day6: 小さな成功を記録して自信にする", "Day7: 来週の計画を立てて動き出す"]',
  '毎朝3分、今日の最重要タスクを1つ書く習慣を始める',
  'リーダーシップ系の本を1冊読む（1,500円〜）',
  '副業でチームをまとめるポジションを1件受注する',
  'あなたの行動力を副業・キャリアに活かすおすすめサービス',
  'https://example.com/leader'),

(p_id, 'extrovert', 'ムードメーカー型',
  '明るく、人との関わりの中で力を発揮するタイプです。',
  '["人と関わるときに自然とエネルギーが上がる", "場の空気を読んで明るくする力がある", "人脈を自然と広げていける"]',
  'その場の空気に合わせすぎて自分の意見や本音を言えなくなる。八方美人になって消耗する。',
  '["Day1: 今週会いたい人を1人決める", "Day2: その人にメッセージを送る", "Day3: SNSに自分の意見を1つ投稿する", "Day4: 誰かを笑わせることを意識して過ごす", "Day5: 自分が楽しかったことを日記に書く", "Day6: 苦手な人との接し方を振り返る", "Day7: 自分の強みをSNSで発信する"]',
  'SNSアカウントを作って自分の個性を発信し始める',
  '交流会・コミュニティに参加する（3,000円〜）',
  '自分のキャラを活かしたショート動画を1本作る',
  'あなたの社交性・明るさを副業に活かせるサービス',
  'https://example.com/mood'),

(p_id, 'intuition', 'チャレンジャー型',
  '直感と行動力で新しいことに挑戦できるタイプです。',
  '["新しい環境への適応力が高い", "直感で本質を掴んで動ける", "失敗を恐れず挑戦を続けられる"]',
  '次々と新しいことに手を出し、どれも中途半端になる。「やりかけ」が増えて消耗する。',
  '["Day1: 今やりかけのことをリストアップする", "Day2: その中から1つだけ完成させる", "Day3: 新しく挑戦したいことを書き出す", "Day4: 挑戦の期限を決める", "Day5: 小さく試してみる（MVP思考）", "Day6: 結果を振り返ってメモする", "Day7: 次の挑戦テーマを1つ決める"]',
  'やりかけのことを1つ完結させてから次に進む',
  'オンライン講座で新スキルを1つ習得する（数千円〜）',
  '副業プラットフォームに登録して1件受注を目指す',
  'あなたの挑戦力を収益化できるサービス',
  'https://example.com/challenger'),

(p_id, 'emotion', 'クリエイター型',
  '自分の世界観を大切にしながら発想できるタイプです。',
  '["感性が豊かで独自の世界観を持っている", "感情を表現する力がある", "共感力が高く人の心を動かせる"]',
  'クオリティにこだわりすぎて公開・完成が遅くなる。「もう少し」が続いて結果が出ない。',
  '["Day1: 作りたいものを1つだけ決める", "Day2: 60%の完成度でいいから形にする", "Day3: 誰かに見せてフィードバックをもらう", "Day4: 改善点を1つだけ直す", "Day5: SNSや媒体に投稿・公開する", "Day6: 反応を見て次のネタを考える", "Day7: 次の作品テーマを決めて動き出す"]',
  '完成度60%でいいから今週1つ公開する',
  'Canva ProやAdobe系ツールを使い始める（月1,000円〜）',
  'ストックサービスやSNSで作品を販売・発信する',
  'あなたの創造力を収益化できるクリエイター向けサービス',
  'https://example.com/creator'),

(p_id, 'introvert', 'サポーター型',
  '相手の気持ちに寄り添い、支えることが得意なタイプです。',
  '["相手の気持ちを敏感に察知できる", "縁の下で着実に貢献できる", "信頼関係を時間をかけて丁寧に築ける"]',
  '人の期待に応えようとしすぎて自分のキャパを超える。NOが言えず疲弊してしまう。',
  '["Day1: 今週誰かのために何をしたかを書き出す", "Day2: 断れなかったことを1つ振り返る", "Day3: 自分がやりたいことを書き出す", "Day4: 小さなNOを練習する", "Day5: 自分への感謝・ねぎらいを言葉にする", "Day6: サポート力を活かせる仕事を調べる", "Day7: 自分の得意なサポートを言語化する"]',
  '自分の得意なサポートをSNSで発信し始める',
  'コーチング・傾聴の入門書を読む（1,500円〜）',
  'ランサーズなどでサポート系の仕事を1件受ける',
  'あなたのサポート力を仕事にできるサービス',
  'https://example.com/supporter'),

(p_id, 'logic', 'プランナー型',
  '落ち着いて考え、計画的に進めるのが得意なタイプです。',
  '["リスクを先読みして準備できる", "情報を整理して計画に落とし込める", "論理的に考えて確実に進められる"]',
  '完璧な計画を作ろうとして動き出しが遅くなる。「準備中」のまま機会を逃してしまう。',
  '["Day1: 今月のゴールを1つ決める", "Day2: ゴールまでの行動を3ステップに分解する", "Day3: 最初の1歩だけ実行する", "Day4: 実行した結果を振り返る", "Day5: 計画を1箇所だけ修正する", "Day6: 次のステップを実行する", "Day7: 1週間の進捗をまとめて記録する"]',
  '紙1枚に今月のゴールと行動計画を書いてみる',
  'Notionで自分専用のプランニングテンプレを作る（無料〜）',
  '副業・転職の具体的なロードマップをAIに作ってもらう',
  'あなたの計画力を活かせるキャリア・副業サービス',
  'https://example.com/planner');

-- =============================================
-- 副業診断
-- =============================================
INSERT INTO diagnoses (slug, category, category_label, title, description, seo_title, seo_description, question_count_label, duration_label, display_order)
VALUES ('sidejob-type', 'sidejob', '副業診断', '向いてる副業診断',
  '6つの質問に答えるだけで、あなたに向いている副業タイプがわかります。',
  '副業診断｜あなたに向いている副業が1分でわかる',
  '簡単な質問に答えるだけで、あなたに向いている副業タイプを診断します。',
  '6問', '約1分', 2)
RETURNING id INTO s_id;

INSERT INTO questions (diagnosis_id, display_order, text) VALUES (s_id, 1, '副業に使える時間は？') RETURNING id INTO q_id;
INSERT INTO choices (question_id, display_order, text, scores) VALUES
  (q_id, 1, '平日もコツコツ使える', '{"steady": 2}'),
  (q_id, 2, '休日にまとめて使いたい', '{"active": 2}');

INSERT INTO questions (diagnosis_id, display_order, text) VALUES (s_id, 2, '得意なのは？') RETURNING id INTO q_id;
INSERT INTO choices (question_id, display_order, text, scores) VALUES
  (q_id, 1, '文章を書くこと', '{"writing": 2}'),
  (q_id, 2, '人と話すこと', '{"communication": 2}');

INSERT INTO questions (diagnosis_id, display_order, text) VALUES (s_id, 3, '副業で重視したいのは？') RETURNING id INTO q_id;
INSERT INTO choices (question_id, display_order, text, scores) VALUES
  (q_id, 1, '安定して続けやすいこと', '{"steady": 2}'),
  (q_id, 2, '短期間で大きく稼げる可能性', '{"active": 2}');

INSERT INTO questions (diagnosis_id, display_order, text) VALUES (s_id, 4, '働き方の好みは？') RETURNING id INTO q_id;
INSERT INTO choices (question_id, display_order, text, scores) VALUES
  (q_id, 1, '一人で進めたい', '{"solo": 2}'),
  (q_id, 2, '人と関わりながら進めたい', '{"communication": 2}');

INSERT INTO questions (diagnosis_id, display_order, text) VALUES (s_id, 5, '新しいことに対しては？') RETURNING id INTO q_id;
INSERT INTO choices (question_id, display_order, text, scores) VALUES
  (q_id, 1, 'まず調べてから始めたい', '{"steady": 1, "solo": 1}'),
  (q_id, 2, 'とりあえずやってみたい', '{"active": 2}');

INSERT INTO questions (diagnosis_id, display_order, text) VALUES (s_id, 6, '理想の副業スタイルは？') RETURNING id INTO q_id;
INSERT INTO choices (question_id, display_order, text, scores) VALUES
  (q_id, 1, '在宅で完結したい', '{"solo": 2}'),
  (q_id, 2, '人脈や営業力を活かしたい', '{"communication": 2}');

INSERT INTO result_types (diagnosis_id, score_key, label, description, reasons, failure_pattern, seven_day_plan, action_free, action_low_cost, action_fastest, service_description, affiliate_link) VALUES
(s_id, 'steady', 'コツコツ型副業向き',
  '地道に積み上げる作業が得意で、継続型の副業と相性が良いタイプです。',
  '["継続する力が副業の最大の武器になる", "毎日少しずつ積み上げる作業が苦にならない", "安定感があり長期案件に向いている"]',
  '成果が出るまでの時間に焦って途中でやめてしまう。最初の1〜3ヶ月が一番危険。',
  '["Day1: 始める副業を1つだけ決める", "Day2: 最初の小さな目標を設定する", "Day3: 15分だけ取り組んでみる", "Day4: 継続記録をつける仕組みを作る", "Day5: 同じ副業をしている人のSNSをフォローする", "Day6: 1ヶ月後のゴールを書く", "Day7: 毎日の作業時間を習慣に組み込む"]',
  'ブログ・SNSを開設して毎日1投稿から始める',
  'アフィリエイト講座に参加する（数千円〜）',
  'クラウドワークスで継続案件を1件獲得する',
  'コツコツ型に向いている副業・学習サービス',
  'https://example.com/steady'),

(s_id, 'active', '行動型副業向き',
  'まず動いて経験を積むのが得意で、実践しながら伸びる副業に向いています。',
  '["まず動いて実践から学ぶスタイルが得意", "スピード感を持って取り組める", "失敗を恐れず次に活かせる"]',
  '衝動的に始めて準備不足のまま進む。クレームや低評価をもらって自信を失う。',
  '["Day1: 副業プラットフォームに登録する", "Day2: プロフィールを完成させる", "Day3: 案件に5件応募する", "Day4: 返信が来た案件に丁寧に対応する", "Day5: 初案件を受注する（金額より経験優先）", "Day6: 納品して評価をもらう", "Day7: 改善点を振り返り次の案件に活かす"]',
  '今日クラウドワークスに登録してプロフィールを書く',
  'Webライター・デザイン入門講座を受ける（数千円〜）',
  '単価より実績優先で今週中に1件受注する',
  '行動力を活かしてすぐ始められる副業サービス',
  'https://example.com/action'),

(s_id, 'writing', 'ライティング副業向き',
  '文章で価値を伝える力があり、記事作成やコンテンツ制作系の副業と相性が良いです。',
  '["文章で分かりやすく伝える力がある", "読み手の気持ちを考えた表現ができる", "継続してコンテンツを生み出せる"]',
  '単価の安い案件ばかり受けてしまい時給が低いまま疲弊する。単価交渉ができない。',
  '["Day1: ライタープロフィールを書く", "Day2: 得意ジャンルを3つ決める", "Day3: サンプル記事を1本書く", "Day4: クラウドワークスに登録して応募する", "Day5: 初案件を受注する", "Day6: 丁寧に納品して評価をもらう", "Day7: 単価を少しずつ上げる計画を立てる"]',
  'noteやブログに記事を1本書いてポートフォリオにする',
  'Webライター講座を受講する（1万円前後）',
  '今週クラウドワークスで1件受注を目指す',
  'ライター・コンテンツ系副業を始めるためのサービス',
  'https://example.com/writing'),

(s_id, 'communication', 'コミュニケーション型副業向き',
  '人と関わることが得意で、営業・接客・相談対応系の副業に向いています。',
  '["人との会話から信頼を作るのが得意", "話を引き出してニーズを掴める", "口コミ・紹介で仕事が広がりやすい"]',
  '頼まれると断れず安い単価のまま仕事を引き受けすぎてしまう。労働収入の上限にはまる。',
  '["Day1: 自分が得意な人との関わり方を書き出す", "Day2: コーチング・相談業について調べる", "Day3: 無料モニターを1人募集してみる", "Day4: 30分のセッションを実施する", "Day5: フィードバックをもらって改善する", "Day6: 有料化の価格設定を考える", "Day7: SNSで自分のサービスを告知する"]',
  'SNSで「無料相談受け付けます」と発信してみる',
  'コーチング入門講座を受ける（数千円〜）',
  'ストアカやタイムチケットに出品して即収益化',
  'コミュ力を活かした副業を始めるサービス',
  'https://example.com/communication'),

(s_id, 'solo', '在宅ワーク型副業向き',
  '一人で集中して進めるのが得意で、在宅で完結する副業と相性が良いです。',
  '["一人で集中して高品質な成果を出せる", "静かな環境でパフォーマンスが上がる", "自分のペースで管理できる"]',
  '案件が途切れると収入がゼロになる。営業が苦手で仕事を取り続けられない。',
  '["Day1: 在宅でできる得意なことを書き出す", "Day2: 副業プラットフォームに登録する", "Day3: プロフィールと実績ページを作る", "Day4: 1件応募してみる", "Day5: 作業環境を整える（通知オフ等）", "Day6: 初案件を完成させて納品する", "Day7: 継続依頼をもらうための関係を作る"]',
  'ポートフォリオサイトを無料で作成する（Notion等）',
  '在宅ワーク向けスキル講座を受講する（数千円〜）',
  '得意なスキルで今週中に1件受注を目指す',
  '在宅ワーク型副業を始めるためのサービス',
  'https://example.com/remote');

-- =============================================
-- 強み診断
-- =============================================
INSERT INTO diagnoses (slug, category, category_label, title, description, seo_title, seo_description, question_count_label, duration_label, display_order)
VALUES ('strength-type', 'strength', '強み診断', 'あなたの強み診断',
  '6つの質問に答えるだけで、あなたの強みや活かし方がわかります。',
  '強み診断｜あなたの強みや得意分野が1分でわかる',
  '簡単な質問に答えるだけで、あなたの強みや活かし方を診断します。',
  '6問', '約1分', 3)
RETURNING id INTO t_id;

INSERT INTO questions (diagnosis_id, display_order, text) VALUES (t_id, 1, '周りからよく言われるのは？') RETURNING id INTO q_id;
INSERT INTO choices (question_id, display_order, text, scores) VALUES
  (q_id, 1, '行動力がある', '{"action": 2}'),
  (q_id, 2, '気配りができる', '{"support": 2}');

INSERT INTO questions (diagnosis_id, display_order, text) VALUES (t_id, 2, '得意なことは？') RETURNING id INTO q_id;
INSERT INTO choices (question_id, display_order, text, scores) VALUES
  (q_id, 1, '人と話すこと', '{"communication": 2}'),
  (q_id, 2, 'コツコツ続けること', '{"steady": 2}');

INSERT INTO questions (diagnosis_id, display_order, text) VALUES (t_id, 3, '問題が起きたときは？') RETURNING id INTO q_id;
INSERT INTO choices (question_id, display_order, text, scores) VALUES
  (q_id, 1, 'すぐ行動する', '{"action": 2}'),
  (q_id, 2, '冷静に分析する', '{"logic": 2}');

INSERT INTO questions (diagnosis_id, display_order, text) VALUES (t_id, 4, '仕事で評価されるのは？') RETURNING id INTO q_id;
INSERT INTO choices (question_id, display_order, text, scores) VALUES
  (q_id, 1, 'スピード感', '{"action": 1}'),
  (q_id, 2, '丁寧さ', '{"steady": 2}');

INSERT INTO questions (diagnosis_id, display_order, text) VALUES (t_id, 5, '人との関係で大事にするのは？') RETURNING id INTO q_id;
INSERT INTO choices (question_id, display_order, text, scores) VALUES
  (q_id, 1, '信頼関係', '{"support": 2}'),
  (q_id, 2, '楽しさ', '{"communication": 2}');

INSERT INTO questions (diagnosis_id, display_order, text) VALUES (t_id, 6, '自分の強みはどちらに近い？') RETURNING id INTO q_id;
INSERT INTO choices (question_id, display_order, text, scores) VALUES
  (q_id, 1, '論理的思考', '{"logic": 2}'),
  (q_id, 2, '共感力', '{"support": 2}');

INSERT INTO result_types (diagnosis_id, score_key, label, description, reasons, failure_pattern, seven_day_plan, action_free, action_low_cost, action_fastest, service_description, affiliate_link) VALUES
(t_id, 'action', '行動力タイプ',
  'まず動いて成果を作るのが得意な、推進力のあるタイプです。',
  '["考えるより動く方が得意でスピードがある", "実践の中から学ぶ能力が高い", "挑戦への抵抗が少なく場数を踏める"]',
  '勢いで動いてミスが増える。計画なしに突き進んで後から修正コストが大きくなる。',
  '["Day1: 今週やることを3つに絞る", "Day2: 最も重要な1つに集中して動く", "Day3: 動く前に5分だけ考える習慣をつける", "Day4: 今日の行動を夜に振り返る", "Day5: ミスした原因を1つメモする", "Day6: 改善した行動を試す", "Day7: 週の成果と学びをまとめる"]',
  '毎日5分、行動記録をつけてPDCAを回す',
  'プロジェクト管理ツール（Notion等）を導入する',
  '副業で小さなプロジェクトをリードする仕事を取る',
  '行動力を収益化できるキャリア・副業サービス',
  'https://example.com/action-strength'),

(t_id, 'support', 'サポートタイプ',
  '周囲を支え、気配りや共感で価値を出せるタイプです。',
  '["周囲の変化や感情に敏感に気づける", "縁の下の力持ちとして信頼される", "丁寧で安心感のある仕事ができる"]',
  '自分より相手を優先しすぎて本来の力を発揮できないポジションに甘んじてしまう。',
  '["Day1: 自分が得意なサポートを3つ書く", "Day2: そのサポートで喜んでくれた人を思い出す", "Day3: 自分の強みをSNSで1つ発信する", "Day4: コーチングや教育系の仕事を調べる", "Day5: 無料モニターを1人募集する", "Day6: セッションを実施して振り返る", "Day7: 自分のサービスの価格設定を考える"]',
  '自分の得意なサポートをSNSで発信し始める',
  'コーチング・傾聴の入門書を読む（1,500円〜）',
  'ストアカに出品して今週中に1件セッションを行う',
  'サポート力を仕事にできるサービス',
  'https://example.com/support-strength'),

(t_id, 'communication', 'コミュニケーションタイプ',
  '人と関わる中で力を発揮し、会話や調整が得意なタイプです。',
  '["会話から信頼関係を短期間で作れる", "複数の意見を整理してまとめる力がある", "人の話を引き出す傾聴力がある"]',
  '全員に合わせようとしすぎて八方美人になる。自分のポジションが曖昧になり消耗する。',
  '["Day1: 自分の得意な会話スタイルを言語化する", "Day2: 得意な人との関わり方をSNSで発信する", "Day3: 苦手な場面をリストアップして対策を考える", "Day4: 自分の意見を1つだけ発信してみる", "Day5: 誰かのファシリテーションをしてみる", "Day6: 振り返りをして改善点を見つける", "Day7: コミュ力を活かせるポジションを調べる"]',
  'SNSで自分の意見・考えを毎日1投稿する',
  'コミュニケーション・話し方の書籍を読む（1,500円〜）',
  '営業代行や相談業として今週1件試す',
  'コミュ力を仕事にできるキャリア・副業サービス',
  'https://example.com/communication-strength'),

(t_id, 'steady', '継続力タイプ',
  'コツコツ積み上げて成果につなげる、安定感のあるタイプです。',
  '["小さな積み上げを苦と思わずに続けられる", "長期的な目線でコツコツ実力をつけられる", "安定して信頼される成果を出せる"]',
  '変化への対応が遅く時代の流れに乗り遅れることがある。新しいことへの初動が遅い。',
  '["Day1: 今継続しているいいことを書き出す", "Day2: 今年身につけたいスキルを1つ決める", "Day3: そのスキルの学習を15分だけ始める", "Day4: 新しい情報源（本・SNS）を1つ追加する", "Day5: 変化に対応した先輩事例を調べる", "Day6: 自分の継続力が活きる場面を考える", "Day7: 来月の学習計画を1枚にまとめる"]',
  '毎日15分の学習習慣をスマホのリマインダーで設定する',
  'Udemyなどで専門スキルの講座を受講する（セール時1,000円〜）',
  '今の継続力が活きる副業案件に今週応募する',
  '継続力を活かせるスキルアップ・副業サービス',
  'https://example.com/steady-strength'),

(t_id, 'logic', '分析力タイプ',
  '物事を整理して考え、冷静に判断できるタイプです。',
  '["感情に左右されず事実とデータで判断できる", "物事の本質・構造を見抜く力がある", "複雑な問題をシンプルに整理できる"]',
  '分析・考察が長くなりすぎて行動が遅れる。完璧な答えを求めすぎて機会を逃す。',
  '["Day1: 今分析できている自分の強みを書き出す", "Day2: 「60点でも行動する」ルールを決める", "Day3: 小さな決断を素早くする練習をする", "Day4: 自分の分析力が活かせる仕事を調べる", "Day5: データ・分析系の副業案件を探す", "Day6: 1件だけ応募してみる", "Day7: 結果を振り返り次の行動を決める"]',
  'Googleアナリティクスや無料ツールで分析を練習する',
  'Pythonやデータ分析の入門講座を受ける（数千円〜）',
  'データ分析・リサーチ系の副業案件に今週応募する',
  '分析力を収益化できるデータ・コンサル系サービス',
  'https://example.com/logic-strength');

END $$;
