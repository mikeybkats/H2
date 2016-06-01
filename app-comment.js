var commentEntry = document.getElementById('input2');
var nameEntry = document.getElementById('input1');
var nameCharacterMeter = document.getElementById('name-character-meter');
var commentCharacterMeter = document.getElementById('comment-character-meter');
var userName = document.getElementById('user-name');
var userComment = document.getElementById('user-comment');
var submitButton = document.getElementById('submit-button');
var allComments = ['Never have I tasted so delicious a libation'];
var allNames = ['Dudeman'];
var indexNumber = 0;
var allNamesParsed = JSON.parse(localStorage.getItem('allNames'));
var allCommentsParsed = JSON.parse(localStorage.getItem('allComments'));
var checkboxMale = document.getElementById('checkbox-male');
var checkboxFemale = document.getElementById('checkbox-female');
var checkboxUndeclared = document.getElementById('checkbox-undeclared');

if (JSON.parse(localStorage.getItem('allComments')) === null){
  var allCommentsParsed = [];
}
if (JSON.parse(localStorage.getItem('allNames')) === null){
  var allNamesParsed = [];
}

userComment.textContent = '"' + allComments[0] + '"';
userName.textContent = ' - ' + allNames[0];

// setting up box ChacterCount constructor
function CharacterCount(title, maxLength) {
  this.title = title;
  this.count = 0;
  this.maxLength = maxLength;
}

// setting up character box objects
var commentBox = new CharacterCount ('comment', 40);
var nameBox = new CharacterCount ('name', 15);

function pushCommentCharacters (event){
  commentBox.count = commentEntry.value.length;
  console.log(commentBox.count);
  commentCharacterMeter.textContent = commentBox.count + '/' + commentBox.maxLength;

  if (commentBox.count >= 40){
    commentEntry.value = commentEntry.value.substring(0, 39);
  }
};

function pushNameCharacters (event){
  nameBox.count = nameEntry.value.length;
  nameCharacterMeter.textContent = nameBox.count + '/' + nameBox.maxLength;

  if (nameBox.count >= 15){
    nameEntry.value = nameEntry.value.substring(0, 14);
  }
}

function nameFieldReset (event){
  nameEntry.value = '';
}

function commentFieldReset (event){
  commentEntry.value = '';
}

function submitButtonEvent (event){
  if (commentEntry.value === 'leave a comment' || commentEntry.value === ''){
    alert('please leave a comment');
    return;
  }
  if (nameEntry.value === ''){
    nameEntry.value = 'unknown human';
  }
  allComments.push(commentEntry.value);
  allNames.push(nameEntry.value);
  allNamesStringified = JSON.stringify(allNames);
  allCommentsStringified = JSON.stringify(allComments);
  localStorage.setItem('allNames', allNamesStringified);
  localStorage.setItem('allComments', allCommentsStringified);
  allNamesParsed = JSON.parse(localStorage.getItem('allNames'));
  allCommentsParsed = JSON.parse(localStorage.getItem('allComments'));
  userComment.innerText = '"' + allCommentsParsed[(allCommentsParsed.length - 1) || 0] + '"';
  userName.innerText = ' - ' + allNamesParsed[(allNamesParsed.length - 1) || 0];
  nameEntry.value = 'enter your name';
  commentEntry.value = 'leave a comment';
}

function pullCommentsFromStorage (){
  if (indexNumber >= allCommentsParsed.length){
    indexNumber = 0;
  }
  if (allNamesParsed.length === 0){
    allNamesParsed = ['Dudeman'];
    allCommentsParsed = ['Never have I tasted so delicious a libation'];
    userComment.innerText = '"' + allCommentsParsed + '"';
    userName.innerText = ' - ' + allNamesParsed;
    indexNumber += 1;
  }
  else {
    userComment.innerText = '"' + allCommentsParsed[indexNumber] + '"';
    userName.innerText = ' - ' + allNamesParsed[indexNumber];
    indexNumber += 1;
  }
}

function checkboxMaleSelect (){
  checkboxfemale.checked = false;
  checkboxUndeclared.checked = false;
}

window.setInterval(pullCommentsFromStorage, 4000);

checkboxMale.addEventListener('focus',checkboxMaleSelect);

nameEntry.addEventListener('focus', nameFieldReset);
nameEntry.addEventListener('keydown', pushNameCharacters);
commentEntry.addEventListener('focus', commentFieldReset);
commentEntry.addEventListener('keydown', pushCommentCharacters);
// commentEntry.addEventListener('keydown 13', pushCommentCharacters);
submitButton.addEventListener('click', submitButtonEvent);
