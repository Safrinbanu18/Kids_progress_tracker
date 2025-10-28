const totalLevels = 5;
let levels = [];

const levelsContainer = document.getElementById("levels-container");
const quizContainer = document.getElementById("quiz-container");
const quizTitle = document.getElementById("quiz-title");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const reward = document.getElementById("reward");

// 🧠 Quiz Questions
const quizData = [
  { question: "What color is the sky?", options: ["Blue", "Green", "Red", "Yellow"], correct: 0 },
  { question: "2 + 2 = ?", options: ["3", "4", "5", "6"], correct: 1 },
  { question: "Which animal says 'Moo'?", options: ["Dog", "Cow", "Cat", "Lion"], correct: 1 },
  { question: "How many days in a week?", options: ["5", "6", "7", "8"], correct: 2 },
  { question: "Which planet do we live on?", options: ["Mars", "Earth", "Jupiter", "Venus"], correct: 1 }
];

// Initialize levels
for (let i = 1; i <= totalLevels; i++) {
  levels.push({ level: i, status: "Yet to Start" });
}
renderLevels();

function renderLevels() {
  levelsContainer.innerHTML = "";

  levels.forEach((lvl, index) => {
    const levelDiv = document.createElement("div");
    levelDiv.classList.add("level");

    const signal = document.createElement("div");
    signal.classList.add("signal");

    if (lvl.status === "Yet to Start") signal.classList.add("red");
    else if (lvl.status === "In Progress") signal.classList.add("yellow");
    else if (lvl.status === "Completed") signal.classList.add("green");

    const title = document.createElement("span");
    title.textContent = `Level ${lvl.level}`;

    const button = document.createElement("button");
    if (lvl.status === "Yet to Start") {
      button.textContent = "Start Quiz";
      button.onclick = () => startLevel(index);
    } else if (lvl.status === "In Progress") {
      button.textContent = "Retry Quiz";
      button.onclick = () => openQuiz(index);
    } else {
      button.textContent = "⭐ Completed";
      button.disabled = true;
    }

    const leftPart = document.createElement("div");
    leftPart.style.display = "flex";
    leftPart.style.alignItems = "center";
    leftPart.appendChild(signal);
    leftPart.appendChild(title);

    levelDiv.appendChild(leftPart);
    levelDiv.appendChild(button);
    levelsContainer.appendChild(levelDiv);
  });
}

function startLevel(index) {
  if (index > 0 && levels[index - 1].status !== "Completed") {
    alert(`⚠️ Complete Level ${index} first!`);
    return;
  }
  levels[index].status = "In Progress";
  renderLevels();
  openQuiz(index);
}

function openQuiz(index) {
  quizContainer.classList.remove("hidden");
  levelsContainer.classList.add("hidden");

  const currentQuiz = quizData[index];
  quizTitle.textContent = `🎯 Level ${index + 1} Quiz`;
  quizQuestion.textContent = currentQuiz.question;
  quizOptions.innerHTML = "";

  currentQuiz.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(i, currentQuiz.correct, index);
    quizOptions.appendChild(btn);
  });
}

function selectAnswer(selected, correct, index) {
  if (selected === correct) {
    levels[index].status = "Completed";
    if (index + 1 < totalLevels) levels[index + 1].status = "Yet to Start";

    // Check if all levels are completed
    const allCompleted = levels.every(lvl => lvl.status === "Completed");
    if (allCompleted) {
      showFinalReward();
    } else {
      showReward();
    }
  } else {
    alert("❌ Oops! Wrong answer. Try again later!");
    exitToDashboard(index);
  }
  renderLevels();
}

// 🚪 Exit quiz on wrong answer
function exitToDashboard(index) {
  quizContainer.classList.add("hidden");
  levels[index].status = "In Progress";
  levelsContainer.classList.remove("hidden");
}

function showReward() {
  quizContainer.classList.add("hidden");
  reward.textContent = "⭐ You earned a star!";
  reward.classList.remove("hidden");

  setTimeout(() => {
    reward.classList.add("hidden");
    levelsContainer.classList.remove("hidden");
  }, 2000);
}

// 🎉 Show final reward for completing all levels
function showFinalReward() {
  quizContainer.classList.add("hidden");
  reward.innerHTML = `🎉 Congratulations! 🎉<br>`;
  
  for (let i = 0; i < 5; i++) {
    const star = document.createElement("span");
    star.textContent = "⭐";
    reward.appendChild(star);
  }

  reward.classList.remove("hidden");

  setTimeout(() => {
    reward.classList.add("hidden");
    levelsContainer.classList.remove("hidden");
  }, 3000);
}
