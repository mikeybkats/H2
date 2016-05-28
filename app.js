objectList = [];

function Location (styledname, named, vibe, started, end) {
  this.styledname = styledname;
  this.named = named;
  this.stared = 0;
  this.end = 0;
  this.vibe = vibe;
  this.imgPath = 'img/' + this.named + '.png';
  this.tallyShown = 0;
  this.tallyClick = 0;
  console.log('objectcreated');
  objectList.push(this);
};

var stjohns = new Location ('St. Johns', 'stjohns', 'groovy', 5, 8);

console.log(objectList);

var firstFiver = document.getElementById('first_fiver');
var location = document.createElement('div');
location.id = objectList.length - 1;
firstFiver.appendChild(location);

var element1 = function () {
  var h3Tag = document.createElement('h3');
  h3Tag.textContent = objectList[0].styledname;
  location.appendChild(h3Tag);
};
element1();

var element2 = function () {
  var pTag = document.createElement('p');
  pTag.textContent = objectList[0].vibe;
  location.appendChild(pTag);
};
element2();

// I need it to create a section
// I need it to append the section to the body

// I need to check the time
// I need to

// I need to create a row function that
  // ceates first row div

// I then need to place a that function into a for loop that does the same thing five times for each instance that matches

// I need to append first row div to section
// I need to create a loop that c
