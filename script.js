// if user clicks start
    // quiz element shows
    // timer starts countdown
// when user selects



var mainBox = document.querySelector('.mainBox');
var startBox = document.querySelector('#startBox');
var quizBox = document.querySelector('#quizBox');
var allDoneBox = document.querySelector('#allDoneBox');
var highScoreBox = document.querySelector('#highScoreBox');
var startBtn = document.querySelector('#startBtn');
var timer = document.querySelector('#timer');

var timeLeft = 60;

startBtn.addEventListener('click', startGame);


function init() {
    quizBox.style.display = 'none';
    allDoneBox.style.display = 'none';
    highScoreBox.style.display = 'none';
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 60;
    timer = setInterval(function() {
        timeLeft--;
        console.log(timeLeft);
        if (timeLeft < 0) {
        clearInterval(timer);
        quizResults();
        }
    }, 1000);
    
}

function startGame() {
    startTimer();
    startBox.style.display = 'none';
    quizBox.style.display = 'flex';

}

function quizResults() {
    quizBox.style.display = 'none';
    allDoneBox.style.display = 'flex';
}


init();

