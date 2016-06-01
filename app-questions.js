var allQuestions = ['Are you looking for a bar with more of a relaxed feeling?', 'Want a place that has 70s Decor?'];
var yesButton = document.getElementById('yes-button');
var noButton = document.getElementById('no-button');
var nextButton = document.getElementById('next-button');
var indexCounter = 0;


var questionArea = document.getElementById('question-id');
var answerArea = document.getElementById('answer-id');


function Questions (location, question, answer) {
  this.location = location;
  this.question = question;
  this.answer = answer;

}
var twoBells = new Questions('Two Bells', 'Want a friendly bar?', 'Try Two Bells');
var bathTubGin = new Questions('Bathtub Gin', 'Want a Speak Easy?', 'Bathtub Gin is your choice');
var theWhiskeyBar = new Questions('The Whiskey Bar', 'Would you like the ultimate whiskey seletion?', 'You\'re only option is The Whiskey Bar');
var amber = new Questions('Amber', 'Want more of a classy environment with dancing as an option?', 'Amber is the environment for you');


var allBars = [twoBells, bathTubGin, theWhiskeyBar, amber];
questionArea.innerText = 'Question: ' + allQuestions[0];
answerArea.innerText = 'Answer: ' ;

// if the index number equals length of array, it must equal to 0

function nextQuestion() {
  //  when user hits the next button, the next question is displayed into the questionArea
  questionArea.innerText = allBars[indexCounter].question;
  indexCounter += 1;
}

if (indexCounter >= 4)

nextButton.addEventListener('click', nextQuestion);
