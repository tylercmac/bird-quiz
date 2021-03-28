// if user clicks start
    // quiz element shows
    // timer starts countdown
// when user selects



var mainBox = document.querySelector('.mainBox');
var startBox = document.querySelector('#startBox');
var quizBox = document.querySelector('#quizBox');
var questBox = document.querySelector('#questOpts');
var quizQ = document.querySelector('#quizQ');
var ans1 = document.querySelector('#ans1')
var ans2 = document.querySelector('#ans2')
var ans3 = document.querySelector('#ans3')
var ans4 = document.querySelector('#ans4')
var allDoneBox = document.querySelector('#allDoneBox');
var highScoreBox = document.querySelector('#highScoreBox');
var startBtn = document.querySelector('#startBtn');
var goBackBtn = document.querySelector('#goBack');
var clearHS = document.querySelector('#clearHS');
var timer = document.querySelector('#timer');
var viewScore = document.querySelector('#viewScore');
var highScoreL = document.querySelector('#highScoreL');
var rightOrWrong = document.querySelector('#rightOrWrong');
var results = document.querySelector('#results');

var timeLeft = 60;
var playerScore = 0;
var highScoreList = [];
var quizQuestions = [
    {
        question: 'what is bird?',
        answers: [
            {option: 'not bird', isCorrect: false },
            {option: 'bird', isCorrect: true },
            {option: 'not bird', isCorrect: false },
            {option: 'not bird', isCorrect: false },
        ]
    },
    {
        question: 'what is big bird?',
        answers: [
            {option: 'big bird', isCorrect: true },
            {option: 'not big bird', isCorrect: false },
            {option: 'not big bird', isCorrect: false },
            {option: 'not big bird', isCorrect: false },
        ]
    },
    {
        question: 'what is smol bird?',
        answers: [
            {option: 'not smol bird', isCorrect: false },
            {option: 'not smol bird', isCorrect: false },
            {option: 'not smol bird', isCorrect: false },
            {option: 'smol bird', isCorrect: false },
        ]
    },
    {
        question: 'what is quiet bird?',
        answers: [
            {option: 'not quiet bird', isCorrect: false },
            {option: 'not quiet bird', isCorrect: false },
            {option: 'not quiet bird', isCorrect: false },
            {option: 'quiet bird', isCorrect: true },
        ]
    },
    {
        question: 'what is loud bird?',
        answers: [
            {option: 'not loud bird', isCorrect: false },
            {option: 'not loud bird', isCorrect: false },
            {option: 'loud bird', isCorrect: true },
            {option: 'not loud bird', isCorrect: false },
        ]
    }
]
var randQuestindex = (Math.floor(Math.random() * quizQuestions.length));
var randQuestion = quizQuestions[randQuestindex];

var highScores = [];

console.log(quizQuestions[randQuestindex].answers);
console.log(randQuestindex)


startBtn.addEventListener('click', startGame);
viewScore.addEventListener('click', function() {
    startBox.style.display = 'none';
    quizBox.style.display = 'none';
    highScoreBox.style.display = 'flex';

})
goBackBtn.addEventListener('click', function() {
    highScoreBox.style.display = 'none';
    startBox.style.display = 'flex';
})


function init() {
    quizBox.style.display = 'none';
    allDoneBox.style.display = 'none';
    highScoreBox.style.display = 'none';
    timer.style.display = 'none';
    rightOrWrong.style.display = 'none';
}

function startGame() {
    // startTimer();
    nextQuestion();
    playerScore = 0;
    startBox.style.display = 'none';
    quizBox.style.display = 'flex';
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 60;
    timer.textContent = timeLeft + ' seconds remaining.';
    timer.style.display = 'flex';
    timer = setInterval(function() {
        timeLeft--;
        console.log(timeLeft);
        // timer.textContent = timeLeft + ' seconds remaining.'; not working
        if (timeLeft < 0) {
            clearInterval(timer);
            quizResults();
        }
    }, 1000);
    
}


function nextQuestion() {
    resetQuestion();
    displayQuestion(randQuestion);
}

function displayQuestion(question) {
    quizQ.textContent = question.question;
    question.answers.forEach(answer => {
        let button = document.createElement('button');
        button.textContent = answer.option;
        button.classList.add('li')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        questBox.appendChild(button);
    })
}

function selectAnswer(event) {
    var chosenButton = event.target
    if (chosenButton.dataset.correct) {
        playerScore++;
        rightOrWrong.style.display = 'flex'
        rightOrWrong.textContent = 'Correct!';
    }
    else {
        rightOrWrong.style.display = 'flex';
        rightOrWrong.textContent = 'Incorrect!';
    }
    console.log('this button work')
    console.log(playerScore);
    nextQuestion();
    rightOrWrong.style.display = 'none';
}

function resetQuestion() {
    while (questBox.firstChild) {
        questBox.removeChild(questBox.firstChild)
    }
    randQuestindex = (Math.floor(Math.random() * quizQuestions.length));
    randQuestion = quizQuestions[randQuestindex];
}

function quizResults() {
    quizBox.style.display = 'none';
    allDoneBox.style.display = 'flex';
    localStorage.setItem('')

}

function addHighScore() {
    allDoneBox.style.display = 'none';
    highScoreBox.style.display = 'flex'; 
    var addHighScore = document.createElement('li');
    highScoreList.push(playerScore);
    addHighScore.textContent = highScoreList[0];
    localStorage.setItem('high scores', highScoreList)
}

init();

