const container = document.querySelector('.container');
const questionbox = document.querySelector('.question');
const choicesbox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scorecard');
const alert = document.querySelector('.alert');
const startbtn = document.querySelector('.startbtn');
const timer = document.querySelector('.timer');

// store questions
const quiz = [
    {
        question: "Q1. Which HTML tag is used to create a hyperlink?",
        Choices: ["<link>", "<a>", "<href>", "<hyperlink>"],
        Answer: "<a>"
    },
    {
        question: "Q2. Which property is used in CSS to change the text color?",
        Choices: ["background-color", "color", "font-color", "text-color"],
        Answer: "color"
    },
    {
        question: "Q3. In CSS, which unit is relative to the font-size of the parent element?",
        Choices: ["px", "%", "em", "rem"],
        Answer: "em"
    },
    {
        question: "Q4. What is the correct syntax to link an external CSS file in HTML?",
        Choices: ["<style src='style.css'>", "<stylesheet>style.css</stylesheet>", "<link rel='stylesheet' href='style.css'>", "<css link='style.css'>"],
        Answer: "<link rel='stylesheet' href='style.css'>"
    },
    {
        question: "Q5. In JavaScript, how do you write an 'if' statement?",
        Choices: ["f i == 5 then", " if (i == 5)", " if i = 5", "if i == 5 {}"],
        Answer: " if (i == 5)"
    },
    {
        question: "Q6. Which method is used to select an HTML element by its ID in JavaScript?",
        Choices: ["querySelector()", "getElementById()", "getElementsByClassName()", "selectById()"],
        Answer: "getElementById()"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let quizover = false;
let timeleft = 10;
let timerid = null;

// array function to show Questions

const showQuestions = () => {
    const questionsDetail = quiz[currentQuestionIndex];
    questionbox.textContent = questionsDetail.question;
    choicesbox.textContent = '';
    for (let i = 0; i < questionsDetail.Choices.length; i++) {
        const currentChoice = questionsDetail.Choices[i];
        const choicediv = document.createElement('div');
        choicediv.textContent = currentChoice;
        choicediv.classList.add('choice');
        choicesbox.appendChild(choicediv);

        choicediv.addEventListener('click', () => {
            if (choicediv.classList.contains('selected')) {
                choicediv.classList.remove('selected');
            }
            else {
                choicediv.classList.add('selected');
            }
        });
    }
    if (currentQuestionIndex < quiz.length) {
        starttimer();
    }
}

// check answer

const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].Answer) {
        displayalert("Correct Answer!");
        score++;
    } else {
        displayalert(`Wrong Anser! ${quiz[currentQuestionIndex].Answer} is the Correct Answer`);
    }
    timeleft = 10;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    } else {
        showScore();
        stopTimer();
    }
}


// show score

const showScore = () => {
    questionbox.textContent = '';
    choicesbox.textContent = '';
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayalert("You have completed this Quiz")
    nextBtn.textContent = "Play Again";
    quizover = true;
    timer.style.display = "none";
}

// Alert function

const displayalert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = "none";
    }, 2000)
}

// timer

const starttimer = () => {
    clearInterval(timerid);
    timer.textContent = timeleft;
    const countdown = () => {
        timeleft--;
        timer.textContent = timeleft;
        if (timeleft === 0) {
            const confirmuser = confirm("Time up!\n Do you want to play the quiz Again");
            if(confirmuser){
                timeleft = 10;
                startQuiz();
            }else {
                startbtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerid = setInterval(countdown, 1000);
}
// stoptimer

const stopTimer = ()=>{
    clearInterval(timerid);
}

// start button

startbtn.addEventListener('click', () => {
    startbtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

//startquiz

const startQuiz = () => {
    timeleft = 10;
    timer.style.display = "flex";
    showQuestions();

}

// click event
nextBtn.addEventListener('click', () => {
    const SelectChoice = document.querySelector('.choice.selected');
    if (!SelectChoice && nextBtn.textContent === "Next") {
        displayalert("Select your Answer");
        return;
    } if (quizover) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizover = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }

});