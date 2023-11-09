const questions = [
    {
        question : "Who wrote the Mahabharat?",
        answers: [
            {text : "Valmiki", correct: false},
            {text : "Lord Ganesh", correct: true},
            {text : "Vedavyasa", correct: false},
            {text : "Lord Krishna", correct: false},
        ]
    },
    {
        question : "Who were Gatotkacha's parents?",
        answers: [
            {text : "Bheema and Hidimbaa", correct: true},
            {text : "Bheema and Draupadi", correct: false},
            {text : "Bheema and Nritya", correct: false},
            {text : "None of the above", correct: false},
        ]
    },
    {
        question : "Who presented the bow Gandiva to Arjuna?",
        answers: [
            {text : "Varuna", correct: true},
            {text : "Agni", correct: false},
            {text : "Indra", correct: false},
            {text : "Vishnu", correct: false},
        ]
    },
    {
        question : "Who was the First Commander in Chief of the Kaurava Army?",
        answers: [
            {text : "Drona", correct: false},
            {text : "Ashvathama", correct: false},
            {text : "Karna", correct: false},
            {text : "Bheeshma", correct: true},
        ]
    },
    {
        question : " Even after the war was over, someone attempted to take Bheema's life. Who was this?",
        answers: [
            {text : "Dhitarashtra", correct: true},
            {text : "Kripacharya", correct: false},
            {text : "Gandhari", correct: false},
            {text : "Ashvathama", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetstate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);

    });
}

function  resetstate(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetstate();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="play Again";
    nextButton.style.display = "block";
}

function handleNextbutton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",() =>{
    if(currentQuestionIndex < questions.length){
        handleNextbutton();
    }
    else{
        startQuiz();
    }
})

startQuiz();