var commentEntry = document.getElementById('input2');
var nameEntry = document.getElementById('input1');
var nameCharacterMeter = document.getElementById('name-character-meter');
var commentCharacterMeter = document.getElementById('comment-character-meter');
var userName = document.getElementById('user-name');
var userComment = document.getElementById('user-comment');
var submitButton = document.getElementById('submit-button');
var commentImage = document.getElementById('comment-image');
var checkboxMale = document.getElementById('checkbox-male');
var checkboxFemale = document.getElementById('checkbox-female');
var checkboxUndeclared = document.getElementById('checkbox-undeclared');

var indexNumber = 0;

var allComments = ['Never have I tasted so delicious a libation'];
var allNames = ['Dudeman'];
var allImages = ['comment_face'];
var maleImages = ['comment_face', 'comment_face_male00'];
var femaleImages = ['comment_face_female00'];
var genderNeutralImages = ['comment_face_undeclared00'];
var allNamesParsed = JSON.parse(localStorage.getItem('allNames'));
var allCommentsParsed = JSON.parse(localStorage.getItem('allComments'));
<<<<<<< HEAD
var checkboxMale = document.getElementById('checkbox-male');
var checkboxFemale = document.getElementById('checkbox-female');
var checkboxUndeclared = document.getElementById('checkbox-undeclared');
=======
var allImagesParsed = JSON.parse(localStorage.getItem('allImages'));
>>>>>>> 13ca2ebad102b4d0315e03771d44fff70e9a2c90

if (JSON.parse(localStorage.getItem('allComments')) === null){
  var allCommentsParsed = [];
}
if (JSON.parse(localStorage.getItem('allNames')) === null){
  var allNamesParsed = [];
}
if (JSON.parse(localStorage.getItem('allImages')) === null){
  var allImagesParsed = [];
}

userComment.textContent = '"' + allComments[0] + '"';
userName.textContent = ' - ' + allNames[0];
commentImage.src = 'images/' + allImages[0] + '.png';

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

  if (checkboxMale.checked === true){
    commentImage.src = 'images/' + maleImages[0] + '.png';
    allImages.push(maleImages[0]);
  }

  if (checkboxFemale.checked === true){
    commentImage.src = 'images/' + femaleImages[0] + '.png';
    allImages.push(femaleImages[0]);
  }

  if (checkboxUndeclared.checked === true){
    commentImage.src = 'images/' + genderNeutralImages[0] + '.png';
    allImages.push(genderNeutralImages[0]);
  }

  allComments.push(commentEntry.value);
  allNames.push(nameEntry.value);

  allNamesStringified = JSON.stringify(allNames);
  allCommentsStringified = JSON.stringify(allComments);
  allImagesStringified = JSON.stringify(allImages);

  localStorage.setItem('allNames', allNamesStringified);
  localStorage.setItem('allComments', allCommentsStringified);
  localStorage.setItem('allImages', allImagesStringified);

  allNamesParsed = JSON.parse(localStorage.getItem('allNames'));
  allCommentsParsed = JSON.parse(localStorage.getItem('allComments'));
  allImagesParsed = JSON.parse(localStorage.getItem('allImages'));

  userComment.innerText = '"' + allCommentsParsed[(allCommentsParsed.length - 1) || 0] + '"';
  userName.innerText = ' - ' + allNamesParsed[(allNamesParsed.length - 1) || 0];
  commentImage.src = 'images/' + allImagesParsed[(allImagesParsed.length - 1) || 0] + '.png';

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
    allImagesParsed = [allImages[0]];
    console.log(allImagesParsed);

    userComment.innerText = '"' + allCommentsParsed + '"';
    userName.innerText = ' - ' + allNamesParsed;
    commentImage.src = 'images/' + allImagesParsed[0] + '.png';
    indexNumber += 1;
  }
  else {
    userComment.innerText = '"' + allCommentsParsed[indexNumber] + '"';
    userName.innerText = ' - ' + allNamesParsed[indexNumber];
    commentImage.src = 'images/' + allImagesParsed[indexNumber] + '.png';
    console.log(commentImage.src);
    indexNumber += 1;
  }
}

function checkboxMaleSelect (){
<<<<<<< HEAD
  checkboxfemale.checked = false;
  checkboxUndeclared.checked = false;
}

window.setInterval(pullCommentsFromStorage, 4000);

checkboxMale.addEventListener('focus',checkboxMaleSelect);
=======
  checkboxFemale.checked = false;
  checkboxUndeclared.checked = false;
}

function checkboxFemaleSelect (){
  checkboxMale.checked = false;
  checkboxUndeclared.checked = false;
}

function checkboxUndeclaredSelect (){
  checkboxFemale.checked = false;
  checkboxMale.checked = false;
}

window.setInterval(pullCommentsFromStorage, 3000);

checkboxMale.addEventListener('click',checkboxMaleSelect);
checkboxFemale.addEventListener('click',checkboxFemaleSelect);
checkboxUndeclared.addEventListener('click',checkboxUndeclaredSelect);
>>>>>>> 13ca2ebad102b4d0315e03771d44fff70e9a2c90

nameEntry.addEventListener('focus', nameFieldReset);
nameEntry.addEventListener('keydown', pushNameCharacters);
commentEntry.addEventListener('focus', commentFieldReset);
commentEntry.addEventListener('keydown', pushCommentCharacters);
submitButton.addEventListener('click', submitButtonEvent);
