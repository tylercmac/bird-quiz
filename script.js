// if user clicks start
    // quiz element shows
    // timer starts countdown
// when user selects



var mainBox = document.querySelector('.mainBox');
var startBox = document.querySelector('#startBox');
var quizBox = document.querySelector('#quizBox');
var questOpts = document.querySelector('#questOpts');
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
var timerBox = document.querySelector('#timer');
var viewScore = document.querySelector('#viewScore');
var highScoreL = document.querySelector('#highScoreL');
var rightOrWrong = document.querySelector('#rightOrWrong');
var results = document.querySelector('#results');
var submitBtn = document.querySelector('#submitBtn');
var initForm = document.querySelector('#initForm');
var initials = document.querySelector('#initials');

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
            {option: 'smol bird', isCorrect: true },
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
var currentIndex = 0;
var highScores = [];


startBtn.addEventListener('click', startGame);
viewScore.addEventListener('click', function() {
    startBox.style.display = 'none';
    quizBox.style.display = 'none';
    highScoreBox.style.display = 'flex';
    allDoneBox.style.display = 'none';

})
goBackBtn.addEventListener('click', function() {
    highScoreBox.style.display = 'none';
    startBox.style.display = 'flex';
})

function shuffleQuestions(array) {
    for (i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i +1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function init() {
    startBox.style.display = 'flex';
    quizBox.style.display = 'none';
    allDoneBox.style.display = 'none';
    highScoreBox.style.display = 'none';
    timer.style.display = 'none';
    rightOrWrong.style.display = 'none';
}

function startGame() {
    shuffleQuestions(quizQuestions);
    console.log(quizQuestions);
    startTimer();
    currentIndex = 0;
    nextQuestion();
    playerScore = 0;
    startBox.style.display = 'none';
    quizBox.style.display = 'flex';
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 60;
    timerBox.textContent = timeLeft + ' seconds remaining.';
    timerBox.style.display = 'flex';
    timer = setInterval(function() {
        timeLeft--;
        console.log(timeLeft);
        timerBox.textContent = timeLeft + ' seconds remaining.';
        if (timeLeft < 0) {
            clearInterval(timer);
            quizResults();
            timerBox.textContent = '';
        }
        if (allDoneBox.style.display === 'flex') {
            clearInterval(timer);
            timerBox.textContent = '';
        }
    }, 1000);
    
}


function nextQuestion() {
    resetQuestion();
    displayQuestion(quizQuestions[currentIndex]);
    console.log(quizQuestions[currentIndex]);
}

function displayQuestion(question) {
    // populate quizq with new quiz question
    quizQ.textContent = question.question;
    // for every answer option, create a button with answer on it, assigning a true value to correct answer
    question.answers.forEach(answer => {
        let button = document.createElement('button');
        button.textContent = answer.option;
        button.classList.add('li')
        if (answer.isCorrect) {
            button.dataset.isCorrect = answer.isCorrect
        }
        // if button is clicked, selectanswer function is called
        button.addEventListener('click', selectAnswer)
        questOpts.appendChild(button);
    })
}

function selectAnswer(event) {
    var chosenButton = event.target
    var correct = chosenButton.dataset.isCorrect
    // if the target button contains correct answer, add one to player score and display correct answer.
    if (correct) {
        playerScore++;
        rightOrWrong.style.display = 'flex';
        rightOrWrong.textContent = 'Correct!';
        setTimeout(function(){
            rightOrWrong.style.display = 'none';
        }, 1500);
        console.log('right!')
    }
    else {
        rightOrWrong.style.display = 'flex';
        rightOrWrong.textContent = 'Incorrect!';
        timeLeft -= 10;
        setTimeout(function(){
            rightOrWrong.style.display = 'none';
        }, 1500);
        console.log('wrong!')
    }
    console.log(playerScore);
    // adds one to question index, to go to next q
    currentIndex++;
    // if the current index  is larger than the index of array, end quiz
    if (currentIndex > quizQuestions.length - 1) {
        rightOrWrong.style.display = 'none';
        quizResults();
        return;
    }
    // call next question function
    nextQuestion();
}

function resetQuestion() {
    // as long as theres a child element(button) in questopts, remove it
    while (questOpts.firstChild) {
        questOpts.removeChild(questOpts.firstChild)
    }
}

function quizResults() {
    quizBox.style.display = 'none';
    allDoneBox.style.display = 'flex';
    results.textContent = `Your final score is: ${playerScore}` 
    // localStorage.setItem('currentPlayerScore', playerScore)
}

submitBtn.addEventListener('click', addHighScore);
clearHS.addEventListener('click', clearHighScore);

function addHighScore(e) {
    e.preventDefault();
    // localStorage.setItem('currPlayInit', initials.value);
    startBox.style.display = 'none';
    quizBox.style.display = 'none';
    allDoneBox.style.display = 'none';
    highScoreBox.style.display = 'flex';
    var currPlayInit = initials.value;
    var currentPlayerScore = playerScore;
    // var currPlayInit = localStorage.getItem('currPlayInit');
    // var currentPlayerScore = localStorage.getItem('currentPlayerScore');
    console.log('submit button is working')
    console.log(currPlayInit);
    console.log(currentPlayerScore);
    highScoreList.push({name: currPlayInit, score: currentPlayerScore});
    localStorage.setItem('highScoreList', JSON.stringify(highScoreList));
    var officialHSList = JSON.parse(localStorage.getItem('highScoreList'))
    console.log(highScoreList);
    console.log(officialHSList);
    while (highScoreL.firstChild) {
        highScoreL.removeChild(highScoreL.firstChild)
    }
    // create a list for each object in localstorage high score list, and display it on the page.
    officialHSList.forEach(namescore => {
        let list = document.createElement('li');
        list.textContent = `Initials: ${namescore.name} Score: ${namescore.score}`;
        list.classList.add('li')

        highScoreL.appendChild(list);
    })
    
    // localStorage.setItem('currentPlayerScore', 0)
}

// declares empty array, them swaps local high score list with empty array, and clears every list item in high score list on page.
function clearHighScore(e) {
    var emptyArr = [];
    e.preventDefault();
    highScoreList =  emptyArr;
    console.log(highScoreList);
    localStorage.setItem('highScoreList', emptyArr);
    while (highScoreL.firstChild) {
        highScoreL.removeChild(highScoreL.firstChild)
    }
}

init();

