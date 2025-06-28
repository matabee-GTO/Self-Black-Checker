document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const retryBtn = document.getElementById('retry-btn');
    const introArea = document.getElementById('intro');
    const questionArea = document.getElementById('question-area');
    const resultArea = document.getElementById('result-area');

    let questions = [];
    let currentQuestionIndex = 0;
    let yesCount = 0;

    // ---ここから追加---
    const allQuestions = [
        // 真面目な質問
        "休憩時間を取らずに作業を続けてしまうことがよくありますか？",
        "自分の仕事は、他の人には頼みにくいと感じますか？",
        "休日でも、仕事や勉強のことが頭から離れませんか？",
        "体調が少し悪くても、無理して出社や活動をしてしまいますか？",
        "「まだ頑張れる」「もっとできるはずだ」と自分に言い聞かせることが多いですか？",
        "自分のキャパシティを超えていると感じても、頼まれごとを断れませんか？",
        "常に何かをしていないと、落ち着かない気持ちになりますか？",
        "自分の仕事の出来栄えに、完璧を求めてしまいますか？",
        "食事を抜いたり、簡単なもので済ませて作業を優先することがありますか？",
        "自分の時間を楽しむことに、どこか罪悪感を感じますか？",
        "他人の評価が過度に気になりますか？",
        "失敗やミスをすると、自分を強く責めてしまいますか？",
        "「ありがとう」より「すみません」を口にすることが多いですか？",
        "自分の限界がどこにあるのか、わからなくなる時がありますか？",
        "仕事やタスクの締め切りを、自分で前倒ししないと気が済みませんか？",
        "プライベートの予定より、急な仕事を優先してしまいますか？",
        "周囲から「働きすぎ」「頑張りすぎ」と心配されたことがありますか？",
        "寝る直前まで、スマートフォンやPCで仕事関連の情報を見ていますか？",
        "自分の能力以上の目標を設定しがちですか？",
        "問題が発生した時、「自分の責任だ」と一人で抱え込んでしまいますか？",
        "忙しい自分に、どこか満足感や安心感を覚えますか？",
        "趣味や好きなことに使う時間を、もったいないと感じることがありますか？",
        "「ノー」と言うことに強い抵抗がありますか？",
        "自分の努力が足りないから、結果が出ないのだと思いがちですか？",
        "複数のタスクを同時に抱えていないと不安になりますか？",
        "他人の期待に応えなければならない、というプレッシャーを常に感じていますか？",
        "自分の成功や達成を、素直に喜べないことがありますか？",
        "スケジュール帳が埋まっていると、安心しますか？",
        "人に助けを求めるのは「迷惑をかけること」だと感じますか？",
        "十分な睡眠時間を確保できていない日が続いていますか？",
        // ユーモアのある質問
        "「エナジードリンク」は実質、私の血液だ",
        "夢の中でも仕事のプレゼンやデバッグをしている",
        "PCの壁紙がデフォルトのままなのは、変更する時間すら惜しいからだ",
        "「趣味は仕事です」と答えたことがある（しかも本心から）",
        "キーボードの特定のキーだけ異常に摩耗している",
        "太陽の光を最後に浴びたのがいつか思い出せない",
        "ランチタイムは、モニターの前で片手で食べられるものが基本だ",
        "「あと5分だけ…」が、気づくと1時間になっている",
        "休日に何をしていいかわからず、結局仕事関連の調べ物をしてしまう",
        "友人との会話で、つい専門用語や業界の略語を使ってしまい、変な顔をされる",
        "自分のデスク周りが、もはや要塞化している",
        "「定時」という言葉をファンタジー小説の用語だと思っている",
        "アラームを止める時、無意識に「スヌーズ」ではなく「あとで対応」ボタンを探してしまう",
        "自分が人間なのか、それともタスク処理マシンなのか、時々わからなくなる",
        "「お疲れ様です」が口癖すぎて、寝言でも言っているらしい",
        "新しいガジェットを買う理由は、生産性が上がる（かもしれない）からだ",
        "リラックスしようとすると、逆にソワソワしてしまう",
        "自分の名前を呼ばれるより、チャットの通知音に反応する方が早い",
        "「バグ」という言葉を聞くと、虫ではなくプログラムの欠陥が真っ先に思い浮かぶ",
        "週末の予定を聞かれて「PCのメンテナンス」と答えたことがある",
        // そんなやついるの？！な質問
        "シャワーを浴びながら、今日のタスクの段取りを考えている",
        "食事のメニューを考えるより、プロジェクトの構成を考える方が得意だ",
        "「疲れた」と感じるのは、身体ではなくCPUの処理が追いついていないだけだと思っている",
        "オフラインの会議でも、無意識に「ミュート解除」の動作をしてしまう",
        "自分の脳内に、いつでも参照できる仮想のカンバンボードが存在する",
        "「人生」という壮大なプロジェクトの進捗が、常に遅延している気がする",
        "エラーメッセージを見ると、つい「なるほど、完全に理解した（何もわからない）」と呟いてしまう",
        "旅行の計画を立てる時、ガントチャートを作らないと落ち着かない",
        "自動販売機で飲み物を買う時ですら、コストパフォーマンスと処理速度を計算してしまう",
        "友人との約束を、脳内で「イベント」として発火させ、「コールバック」でリマインドしている",
        "自分の部屋が散らかっているのは、最適化されていないキャッシュが溜まっているだけだと考えている",
        "感動的な映画を見ても、「この脚本、ロジックに破綻がないか？」と分析してしまう",
        "カフェインの摂取量を、デプロイの成功率と相関があるグラフで管理している",
        "「バケーション」という言葉は、サーバーのメンテナンス期間か何かだと思っている",
        "日常生活で問題が起きると、まず脳内で「原因の切り分け」から始めてしまう",
        "洋服を選ぶ基準は、着心地やデザインより「PC作業のしやすさ」が最優先だ",
        "自分の体力を「バッテリー残量」として認識しており、常に低電力モードで稼働している",
        "会話中に相手が黙ると、「応答がありません。リクエストがタイムアウトしました」と脳内アナウンスが流れる",
        "道を歩いている時、他の歩行者の動きを予測し、衝突回避の最適ルートを計算している",
        "寝る前に羊を数える代わりに、未解決のバグを数えてしまう"
    ];

    // Fisher-Yates shuffle algorithm
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    // ---ここまで追加---

    startBtn.addEventListener('click', startChecker);
    retryBtn.addEventListener('click', () => {
        introArea.classList.remove('hidden');
        resultArea.classList.add('hidden');
        questionArea.innerHTML = ''; // 質問をクリア
    });

    function startChecker() {
        introArea.classList.add('hidden');
        questionArea.classList.remove('hidden');
        resultArea.classList.add('hidden');
        currentQuestionIndex = 0;
        yesCount = 0;

        // ---ここから修正---
        // サーバーに問い合わせる代わりに、JS内で質問をシャッフルして10個選ぶ
        questions = shuffle([...allQuestions]).slice(0, 10);
        displayQuestion();
        // ---ここまで修正---
    }

    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            questionArea.innerHTML = `
                <div class="question-card">
                    <p>質問 ${currentQuestionIndex + 1}: ${question}</p>
                    <div class="answer-buttons">
                        <button class="answer-btn" data-answer="yes">はい</button>
                        <button class="answer-btn" data-answer="no">いいえ</button>
                    </div>
                </div>
            `;

            document.querySelectorAll('.answer-btn').forEach(button => {
                button.addEventListener('click', handleAnswer);
            });
        } else {
            showResult();
        }
    }

    function handleAnswer(event) {
        if (event.target.dataset.answer === 'yes') {
            yesCount++;
        }
        currentQuestionIndex++;
        displayQuestion();
    }

    function showResult() {
        questionArea.classList.add('hidden');
        resultArea.classList.remove('hidden');

        // ---ここから修正---
        // サーバーに問い合わせる代わりに、JS内で結果を判定する
        let result_title, result_text, result_level;

        if (yesCount <= 2) {
            result_title = "セルフブラック度: 低";
            result_text = "あなたは自分を客観的に見つめ、無理なく活動できているようです。今のペースを大切に、心身の健康を維持してください。";
            result_level = "low";
        } else if (yesCount <= 5) {
            result_title = "セルフブラック度: 中";
            result_text = "少し頑張りすぎてしまう傾向があるかもしれません。意識的に休息を取り、時には人に頼ることも大切です。自分の時間を楽しむことを忘れないでください。";
            result_level = "medium";
        } else if (yesCount <= 8) {
            result_title = "セルフブラック度: 高";
            result_text = "かなり自分を追い込んでいませんか？心身の疲れが溜まっている可能性があります。「何もしない時間」を意識して作り、自分を労ってあげましょう。一人で抱え込まず、周りに相談することも考えてみてください。";
            result_level = "high";
        } else {
            result_title = "セルフブラック度: 危険信号！";
            result_text = "あなたは無意識のうちに自分を極限まで追い込んでいる可能性があります。バーンアウト（燃え尽き症候群）の危険も。今すぐ休息が必要です。専門家や信頼できる人に相談し、働き方や考え方を見直すことを強くお勧めします。";
            result_level = "danger";
        }

        document.getElementById('result-title').textContent = result_title;
        document.getElementById('result-text').textContent = result_text;
        document.getElementById('yes-count-text').textContent = `「はい」の数: ${yesCount} / 10`;

        const resultArea = document.getElementById('result-area');
        resultArea.classList.remove('result-low', 'result-medium', 'result-high', 'result-danger');
        if (result_level) {
            resultArea.classList.add(`result-${result_level}`);
        }
        // ---ここまで修正---
    }
});