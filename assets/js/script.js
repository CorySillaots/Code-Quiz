//  Global Variables
var secondsLeft = 60;
var highScores = [];
var currentScore = 0;
var initials = '';
var currentQuestion = -1
var timer = "";
// 5 different question pages
var questions = [
{
    "question": "Commonly used data types do NOT include:",
    "choices": ["Strings", "Booleans", "Alerts", "Numbers"],
    "correctChoice": "Alerts"
},


{
    "question": "The condition in an if/else statement is enclosed in:",
    "choices": ["Quotes", "Parenthesis", "Curly Brackets", "Square Brackets"],
    "correctChoice": "Parenthesis"
},


{
    "question": "Arrays in JavaScript can be used to store:",
    "choices": ["Numbers and Strings", "Other Arrays", "Booleans", "All of the above"],
    "correctChoice": "All of the above"
},

{
    "question": "String values must be enclosed within ______ when being assigned to variables",
    "choices": ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
    "correctChoice": "Quotes"
},

{
    "question": "A very useful tool used during development and debugging for printing content to the debugger is:",
    "choices": ["JavaScript", "Terminal Bash", "for loops", "console.log"],
    "correctChoice": "console.log"
},
    ];


// Event listeners
document.getElementById('startButton').addEventListener('click', startQuiz);
document.getElementById('submitButton').addEventListener('click', submitAnswer);
document.getElementById('returnButton').addEventListener('click', returnHome);
document.getElementById('scoresButton').addEventListener('click', viewScores);

//start quiz
function startQuiz() {
    currentScore = 0;
    initials = document.getElementById('initials').value;
    if (initials === '') {
        alert('Please enter your initials');
        return;
    }
    document.getElementById('highScores').classList.add('hidden');
    document.getElementById('main').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    
    //reset currentQuestion to -1 in case they've already run the quiz in this session
    currentQuestion = -1;

    //get the next question and display it
    getNextQuestion();
        
    //start timer
    timer = setInterval(function() {
        secondsLeft--;
        document.getElementById('timer').innerHTML = secondsLeft;
        if (secondsLeft === 0) {
            alert('Time is up!');
            endQuiz(secondsLeft);
        }
    }, 1000);
};
function submitAnswer() {
    //if choice === correct choice then add to score
    //else do not add to score and subtract 10 seconds from timer
    var currentAnswer = document.getElementById('answer').value;
    if (currentAnswer == questions[currentQuestion].correctChoice) {
        currentScore++;
    }
    else{
        secondsLeft -= 10;
    }
    if(currentQuestion < questions.length -1) {
        getNextQuestion();
    }
    else{
        endQuiz();
    }
    

};
function returnHome() {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('highScores').classList.add('hidden');
    document.getElementById('main').classList.remove('hidden');
};
function viewScores() {
   var highScoresList = "";
    //iterate through high scores array and create <li> elements
    if(highScores.length > 0) {
        for (var i = 0; i < highScores.length; i++) {
            highScoresList += "<li> Name: " + highScores[i].initials + " Score: " + highScores[i].score + " Time Left: " + highScores[i].time +"</li>";
        }
    }
    else {
        highScoresList = "<li>No scores yet!</li>";
    }
    document.getElementById('highScoreList').innerHTML = highScoresList;


    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('main').classList.add('hidden');
    document.getElementById('highScores').classList.remove('hidden');


};
function getNextQuestion() {
    currentQuestion++;

    var questionObject = questions[currentQuestion];
    document.getElementById('questionNumber').innerHTML = "Question " + (currentQuestion + 1) + " of " + questions.length;
    document.getElementById('question').innerHTML = questionObject.question;
    var choicesList = "";
    for (var i = 0; i < questionObject.choices.length; i++) {
        choicesList += "<option value='" + questionObject.choices[i] + "'>" + questionObject.choices[i] + "</option>";
    }
    document.getElementById('answer').innerHTML = choicesList;


    //increment currentQuestion, grab JSON object from array, then replace HTML values with the current question and choices


};

function endQuiz(){
    clearInterval(timer);
    
    highScores.push({"initials": initials, "score": currentScore, "time": secondsLeft});
    highScores.sort(function(a, b) {
        return b.score - a.score;
    });

    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('main').classList.add('hidden');
    document.getElementById('highScores').classList.remove('hidden');
    //reset variables
    document.getElementById('initials').value = '';
    secondsLeft = 60;
    document.getElementById('timer').innerHTML = secondsLeft;

    document.getElementById('yourScore').innerHTML = "You Scored: " + currentScore;
    var highScoresList = "";

    if(highScores.length > 0) {
        for (var i = 0; i < highScores.length; i++) {
            highScoresList += "<li> Name: " + highScores[i].initials + " Score: " + highScores[i].score + " Time Left: " + highScores[i].time +"</li>";
        }
    }
    else {
        highScoresList = "<li>No scores yet!</li>";
    }
    document.getElementById('highScoreList').innerHTML = highScoresList;
}





