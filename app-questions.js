var allQuestions = ['Are you looking for a bar with more of a relaxed feeling?', 'Want a place that has 70s Decor?'];
var yesButton = document.getElementById('yes-button');
var noButton = document.getElementById('no-button');
var nextButton = document.getElementById('next-button');
var questionSection = document.getElementById('question-section');
var indexCounter = 0;
var maxQuestions = 4;

var questionArea = document.getElementById('question-id');
var answerArea = document.getElementById('answer-id');

function Questions (location, question, answer) {
  this.location = location;
  this.question = question;
  this.answer = answer;

}
var twoBells = new Questions('Two Bells', 'Want a friendly bar?', 'Try Two Bells');
var bathTubGin = new Questions('Bathtub Gin', 'Want a Speak Easy?', 'Bathtub Gin is your choice');
var theWhiskeyBar = new Questions('The Whiskey Bar', 'Would you like the ultimate whiskey selection?', 'You\'re only option is The Whiskey Bar');
var amber = new Questions('Amber', 'Want more of a classy environment with dancing as an option?', 'Amber is the environment for you');

var allBars = [twoBells, bathTubGin, theWhiskeyBar, amber];
// questionArea.innerText = 'H2 Question Area';
questionArea.innerText = 'Question: ' + allBars[indexCounter].question;

// if the index number equals length of array, it must equal to 0

function nextQuestion() {
  //  when user hits the next button, the next question is displayed into the questionArea
  indexCounter += 1;
  if (indexCounter < maxQuestions) {
    answerArea.innerText = '';
    questionArea.innerText = 'Question: ' + allBars[indexCounter].question;
    // indexCounter = 0;
  } else {
    // alert('You have gone through all the questions');
    answerArea.innerText = 'Check the table for other selections';
    nextButton.hidden = true;
    yesButton.hidden = true;
    noButton.hidden = true;
    questionArea.innerText = '';

  }

}
function clickYes() {
  // when user hits the yes button, the answer will appear below
  answerArea.innerText = 'Answer: ' + allBars[indexCounter].answer;
}
function clickNo() {
  // when user clicks the no button, answer will display a nice message
  answerArea.innerText = 'Click the Next button and see if we can\'t find you something better';
}

nextButton.addEventListener('click', nextQuestion);
yesButton.addEventListener('click', clickYes);
noButton.addEventListener('click', clickNo);
