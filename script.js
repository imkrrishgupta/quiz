document.addEventListener("DOMContentLoaded", () => {

    const startBtn = document.getElementById("start-btn");
    const nextBtn = document.getElementById("next-btn");
    const restartBtn = document.getElementById("restart-btn");
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const resultContainer = document.getElementById("result-container");
    const scoreDisplay = document.getElementById("score");

    const questions = [
        {
            question: "What is the capital of France?",
            choices: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris",
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Mars", "Venus", "Jupiter", "Saturn"],
            answer: "Mars",
        },
        {
            question: "Who wrote 'Hamlet'?",
            choices: [
                "Charles Dickens",
                "Jane Austen",
                "William Shakespeare",
                "Mark Twain"
            ],
            answer: "William Shakespeare",
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    startBtn.addEventListener("click", startQuiz) // `startQuiz` is a function reference...when somebody clicks on it then we want to execute it....don't use like this `startQuiz()` as it shows execution of the function

    nextBtn.addEventListener("click", () => {
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        }else{
            showResult();
        }
    })

    restartBtn.addEventListener("click", () => {
        currentQuestionIndex = 0;
        score = 0;
        resultContainer.classList.add("hidden");
        startQuiz();
    })

    function startQuiz() {
        startBtn.classList.add("hidden");
        resultContainer.classList.add("hidden");
        questionContainer.classList.remove("hidden");
        showQuestion();
    }

    function showQuestion() {
        nextBtn.classList.add("hidden");
        questionText.textContent = questions[currentQuestionIndex].question;
        choicesList.innerHTML = "" // clear previous choices......because as soon as we go to the next question, the previous choices will still remain there
        questions[currentQuestionIndex].choices.forEach(choice => {
            const li = document.createElement("li");
            li.textContent = choice;
            li.addEventListener("click", () => selectAnswer(choice, li)); // This way of writing the function is used when we want to execute the function while clicking and we have to pass on the parameter too
            choicesList.appendChild(li);
        })
    }

    function selectAnswer(choice, li) {
        const correctAnswer = questions[currentQuestionIndex].answer;
        if (choice === correctAnswer){
            score++;
            li.classList.add("correct");
        }else{
            li.classList.add("incorrect");
        }
        
        nextBtn.classList.remove("hidden");
    }

    function showResult(){
        questionContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");
        scoreDisplay.textContent = `${score} out of ${questions.length}`;
    }
})