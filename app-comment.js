var commentEntry = document.getElementById('input2');
var nameEntry = document.getElementById('input1');
var nameCharacterMeter = document.getElementById('name-character-meter');
var commentCharacterMeter = document.getElementById('comment-character-meter');
var userName = document.getElementById('user-name');
var userComment = document.getElementById('user-comment');

function CharacterCount(title, maxLength) {
  this.title = title;
  this.count = 0;
  this.maxLength = maxLength;
}

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

nameEntry.addEventListener('keydown', pushNameCharacters);
commentEntry.addEventListener('keydown', pushCommentCharacters);
