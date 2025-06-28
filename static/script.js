document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const retryBtn = document.getElementById('retry-btn');
    const introArea = document.getElementById('intro');
    const questionArea = document.getElementById('question-area');
    const resultArea = document.getElementById('result-area');

    let questions = [];
    let currentQuestionIndex = 0;
    let yesCount = 0;

    startBtn.addEventListener('click', startChecker);
    retryBtn.addEventListener('click', () => {
        introArea.classList.remove('hidden');
        resultArea.classList.add('hidden');
        questionArea.innerHTML = ''; // 質問をクリア
    });

    async function startChecker() {
        introArea.classList.add('hidden');
        questionArea.classList.remove('hidden');
        resultArea.classList.add('hidden');
        currentQuestionIndex = 0;
        yesCount = 0;

        try {
            const response = await fetch('/start');
            const data = await response.json();
            questions = data.questions;
            displayQuestion();
        } catch (error) {
            console.error('質問の取得に失敗しました:', error);
            questionArea.innerHTML = '<p>エラーが発生しました。ページを再読み込みしてください。</p>';
        }
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

    async function showResult() {
        questionArea.classList.add('hidden');
        resultArea.classList.remove('hidden');

        try {
            const response = await fetch('/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ yes_count: yesCount }),
            });
            const data = await response.json();
            document.getElementById('result-title').textContent = data.result_title;
            document.getElementById('result-text').textContent = data.result_text;
            document.getElementById('yes-count-text').textContent = `「はい」の数: ${yesCount} / 10`;

            // 危険度レベルに応じてクラスを削除・追加
            const resultArea = document.getElementById('result-area');
            resultArea.classList.remove('result-low', 'result-medium', 'result-high', 'result-danger');
            if (data.result_level) {
                resultArea.classList.add(`result-${data.result_level}`);
            }
        } catch (error) {
            console.error('診断結果の取得に失敗しました:', error);
            document.getElementById('result-area').innerHTML = '<p>エラーが発生しました。ページを再読み込みしてください。</p>';
        }
    }
});
