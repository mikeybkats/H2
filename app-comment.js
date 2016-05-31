var commentEntry = document.getElementById('input2');
var nameEntry = document.getElementById('input1');
var nameCharacterMeter = document.getElementById('name-character-meter');
var commentCharacterMeter = document.getElementById('comment-character-meter');
var userName = document.getElementById('user-name');
var userComment = document.getElementById('user-comment');
var submitButton = document.getElementById('submit-button');
var allComments = ['Never have I tasted so delicious a libation'];
var allNames = ['Dudeman'];
var allNamesParsed = JSON.parse(localStorage.getItem('allNames'));
var allCommentsParsed = JSON.parse(localStorage.getItem('allComments'));
var indexNumber = 0;
userComment.textContent = '"' + allComments[0] + '"';
userName.textContent = ' - ' + allNames[0];
// store the all comments on local storage
// make a function to push comments to the comments array

function CharacterCount(title, maxLength) {
  this.title = title;
  this.count = 0;
  this.maxLength = maxLength;
}

var commentBox = new CharacterCount ('comment', 40);
var nameBox = new CharacterCount ('name', 15);

function populateComment (event){
}

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
  allComments.push(commentEntry.value);
  allNames.push(nameEntry.value);
  console.log(allNames);
  console.log(allComments);
  if (commentEntry.value === 'leave a comment'){
    alert('please leave a comment');
    return;
  }
  allNamesStringified = JSON.stringify(allNames);
  allCommentsStringified = JSON.stringify(allComments);
  localStorage.setItem('allNames', allNamesStringified);
  localStorage.setItem('allComments', allCommentsStringified);
  allNamesParsed = JSON.parse(localStorage.getItem('allNames'));
  allCommentsParsed = JSON.parse(localStorage.getItem('allComments'));
  userComment.innerText = '"' + allCommentsParsed[(allCommentsParsed.length - 1) || 0] + '"';
  userName.innerText = ' - ' + allNamesParsed[(allNamesParsed.length - 1) || 0];
}

function pullCommentsFromStorage (){
  var pullUserComments = JSON.parse(localStorage.getItem('allComments'));
  var pullUserNames = JSON.parse(localStorage.getItem('allNames'));

  if (indexNumber === pullUserNames.length){
    indexNumber = 0;
  }

  userComment.innerText = '"' + pullUserComments[indexNumber] + '"';
  userName.innerText = ' - ' + pullUserNames[indexNumber];
  indexNumber += 1;
}

window.setInterval(pullCommentsFromStorage, 4000);
nameEntry.addEventListener('focus', nameFieldReset);
commentEntry.addEventListener('focus', commentFieldReset);
nameEntry.addEventListener('keydown', pushNameCharacters);
commentEntry.addEventListener('keydown', pushCommentCharacters);
submitButton.addEventListener('click', submitButtonEvent);
