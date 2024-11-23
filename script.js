const questions = [
    {
        question: "What is Kanye West's first name?",
        answers: [
            { text: "Kanye", correct: true },
            { text: "West", correct: false },
            { text: "Jay", correct: false },
            { text: "Sean", correct: false },
        ]
    },
    {
        question: "Which Kanye West song features the line 'Now I ain't saying she a gold digger'? ",
        answers: [
            { text: "Gold Digger", correct: true },
            { text: "Stronger", correct: false },
            { text: "Heartless", correct: false },
            { text: "Good Life", correct: false },
        ]
    },
    {
        question: "What year was Kanye West's album 'Graduation' released?",
        answers: [
            { text: "2007", correct: true },
            { text: "2005", correct: false },
            { text: "2008", correct: false },
            { text: "2006", correct: false },
        ]
    },
    {
        question: "Which Kanye West album features the song 'Runaway'?",
        answers: [
            { text: "My Beautiful Dark Twisted Fantasy", correct: true },
            { text: "Graduation", correct: false },
            { text: "The Life of Pablo", correct: false },
            { text: "808s & Heartbreak", correct: false },
        ]
    },
    {
        question: "What is the name of the tour Kanye West co-headlined with Jay-Z in 2011?",
        answers: [
            { text: "Watch the Throne Tour", correct: true },
            { text: "Glow in the Dark Tour", correct: false },
            { text: "Saint Pablo Tour", correct: false },
            { text: "Yeezus Tour", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
