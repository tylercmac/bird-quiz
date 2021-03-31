var mainBox = document.querySelector('.mainBox');
var startBox = document.querySelector('#startBox');
var quizBox = document.querySelector('#quizBox');
var questOpts = document.querySelector('#questOpts');
var quizQ = document.querySelector('#quizQ');
var ans1 = document.querySelector('#ans1');
var ans2 = document.querySelector('#ans2');
var ans3 = document.querySelector('#ans3');
var ans4 = document.querySelector('#ans4');
var allDoneBox = document.querySelector('#allDoneBox');
var allDoneH = document.querySelector('#allDoneH');
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
var imgSpot = document.querySelector('#imgSpot');

var img1 = document.createElement('img');
img1.src = 'https://www.allaboutbirds.org/guide/assets/photo/303809061-1280px.jpg';
var img2 = document.createElement('img');
img2.src = 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/60384771/1800';
var img3 = document.createElement('img');
img3.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Mallard2.jpg/1280px-Mallard2.jpg';

var timeLeft = 60;
var playerScore = 0;
var highScoreList = [];
var quizQuestions = [
    {
        question: 'What is the largest bird in North America?',
        answers: [
            {option: 'Bald Eagle', isCorrect: false },
            {option: 'California Condor', isCorrect: true },
            {option: 'Turkey Vulture', isCorrect: false },
            {option: 'Dark-Eyed Junco', isCorrect: false },
        ]
    },
    {
        question: 'What is the purpose of Penguins\'\ black and white coloration?',
        answers: [
            {option: 'Underwater camoflauge', isCorrect: true },
            {option: 'Thermal regulation', isCorrect: false },
            {option: 'Identifier for others ', isCorrect: false },
            {option: 'Because it\'\s cute', isCorrect: false },
        ]
    },
    {
        question: 'What is the top speed of a Peregrine Falcon?',
        answers: [
            {option: '100 mph', isCorrect: false },
            {option: '50 mph', isCorrect: false },
            {option: '180 mph', isCorrect: false },
            {option: '240 mph', isCorrect: true },
        ]
    },
    {
        question: 'How many species of birds are in the US?',
        answers: [
            {option: '104', isCorrect: false },
            {option: '523', isCorrect: false },
            {option: '2371', isCorrect: false },
            {option: '1107', isCorrect: true },
        ]
    },
    {
        question: 'What is this bird?',
        answers: [
            {option: 'American Robin', isCorrect: false },
            {option: 'Eastern Bluebird', isCorrect: true },
            {option: 'House Finch', isCorrect: false },
            {option: 'Blue Jay', isCorrect: false },
        ],
        img: 1,
    },
    {
        question: 'What is this bird?',
        answers: [
            {option: 'Osprey', isCorrect: false },
            {option: 'Golden Eagle', isCorrect: false },
            {option: 'Red-Tailed Hawk', isCorrect: true },
            {option: 'Northern Harrier', isCorrect: false },
        ],
        img: 2,
        
    },
    {
        question: 'What is this bird?',
        answers: [
            {option: 'Mallard', isCorrect: true },
            {option: 'Ruddy Duck', isCorrect: false },
            {option: 'Great Egret', isCorrect: false },
            {option: 'Lesser Green Broadbill', isCorrect: false },
        ],
        img: 3,
        
    },
    {
        question: 'What is a group of owls called?',
        answers: [
            {option: 'A seige', isCorrect: false },
            {option: 'A parliament', isCorrect: true },
            {option: 'A coronation', isCorrect: false },
            {option: 'A bevy', isCorrect: false },
        ],
        
    },

]
var currentIndex = 0;
var highScores = [];
var timesUpMsg = document.createElement('p');
timesUpMsg.textContent = `Time's Up!`;
timesUpMsg.style = 'color: red; font-size: 200%';

img1.classList.add('flex');
img2.classList.add('flex');

startBtn.addEventListener('click', startGame);
viewScore.addEventListener('click', function() {
    startBox.style.display = 'none';
    quizBox.style.display = 'none';
    highScoreBox.style.display = 'flex';
    allDoneBox.style.display = 'none';
    
});
goBackBtn.addEventListener('click', function() {
    if (timeLeft < 60 && timeLeft > -1) {
            highScoreBox.style.display = 'none';
            quizBox.style.display = 'flex';
            startBox.style.display = 'none';
        } else {
            highScoreBox.style.display = 'none';
            quizBox.style.display = 'none';
            startBox.style.display = 'flex';
        };
});
submitBtn.addEventListener('click', addHighScore);
clearHS.addEventListener('click', clearHighScore);

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
    rightOrWrong.style.display = 'flex';
    rightOrWrong.textContent = '';
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
            allDoneH.style.display = 'none';
            allDoneBox.insertBefore(timesUpMsg, allDoneBox.childNodes[0]);
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
    while (imgSpot.firstChild) {
        imgSpot.removeChild(imgSpot.firstChild)
    }
    // populate quizq with new quiz question
    quizQ.textContent = question.question;
    if (question.img === 1) {
        imgSpot.classList.add('flex');
        imgSpot.appendChild(img1);
    } else if (question.img === 2) {
        imgSpot.appendChild(img2);
        imgSpot.classList.add('flex');
    } else if (question.img === 3) {
        imgSpot.appendChild(img3);
        imgSpot.classList.add('flex');
    } 
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
        rightOrWrong.textContent = 'Correct!';
        rightOrWrong.style.cssText = 'color: #0ce00c';
        setTimeout(function(){
            rightOrWrong.textContent = '';
        }, 1500);
        console.log('right!')
    }
    else {
        rightOrWrong.textContent = 'Incorrect! -10 seconds.';
        rightOrWrong.style.cssText = 'color: red';
        timeLeft -= 10;
        setTimeout(function(){
            rightOrWrong.textContent = '';
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
    highScoreBox.style.display = 'none';
    results.textContent = `Your final score is: ${playerScore}` 
    if (timeLeft > 0) {
        allDoneBox.removeChild(timesUpMsg);
    } 
}

function addHighScore(e) {
    e.preventDefault();
    if (initials.value === '') {
        alert('You must enter your initials');
        return;
    }
    allDoneH.style.display = 'flex';
    highScoreL.style.display = 'block';
    startBox.style.display = 'none';
    quizBox.style.display = 'none';
    allDoneBox.style.display = 'none';
    highScoreBox.style.display = 'flex';
    var currTime;
    if (timeLeft < 0) {
        currTime = 0;
    } else {
        currTime = timeLeft;
    }
    var currPlayInit = initials.value;
    var currentPlayerScore = playerScore;
    highScoreList.push({name: currPlayInit, score: currentPlayerScore, time: currTime});
    localStorage.setItem('highScoreList', JSON.stringify(highScoreList));
    var officialHSList = JSON.parse(localStorage.getItem('highScoreList'));

    //array methods - sort, map, reduce, filter

    officialHSList.sort((a, b) => {
        if (a.score > b.score) {
            // -1 moves to left
            return -1
        }
    });

    console.log(officialHSList);
    while (highScoreL.firstChild) {
        highScoreL.removeChild(highScoreL.firstChild)
    }
    // create a list for each object in localstorage high score list, and display it on the page.
    officialHSList.forEach(namescore => {
        let list = document.createElement('li');
        list.textContent = `Initials: "${namescore.name}" | Score: ${namescore.score} | Time Left: ${namescore.time}`;
        list.classList.add('li')

        highScoreL.appendChild(list);
    })
    timeLeft = 60;
    console.log(timeLeft);
}

// declares empty array, them swaps local high score list with empty array, and clears every list item in high score list on page.
function clearHighScore(e) {
    var emptyArr = [];
    e.preventDefault();
    highScoreList =  emptyArr;
    console.log(highScoreList);
    highScoreL.style.display = 'none';
    localStorage.setItem('highScoreList', emptyArr);
    while (highScoreL.firstChild) {
        highScoreL.removeChild(highScoreL.firstChild)
    }
}

init();
