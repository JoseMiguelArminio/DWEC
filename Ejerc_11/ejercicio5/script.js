let questions = [];
let index = 0;
let score = 0;

document.getElementById("start-btn").onclick = function() {
  fetch("questions.json")
    .then(r => r.json())
    .then(data => {
      questions = data;
      showQuestion();
    });
};

function showQuestion() {
  const q = questions[index];

  document.getElementById("quiz-container").innerHTML = `
    <h4>${q.text}</h4>
    ${q.options.map(o =>
      `<div>
        <input type="radio" name="answer" value="${o.id}"> ${o.text}
      </div>`
    ).join("")}
    <button id="next-btn" class="btn btn-primary mt-3">
      ${index < questions.length - 1 ? "Siguiente" : "Finalizar"}
    </button>
  `;

  document.getElementById("next-btn").onclick = checkAnswer;
}

function checkAnswer() {
  const selected = document.querySelector("input[name='answer']:checked");
  if (!selected) return;

  if (selected.value === questions[index].correctAnswer) score++;

  index++;
  if (index < questions.length) showQuestion();
  else showResults();
}

function showResults() {
  document.getElementById("quiz-container").innerHTML = `
    <h3>Resultado final: ${score} / ${questions.length}</h3>
  `;
}
