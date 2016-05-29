objectList = [];
objectListWeekend = [];
openingSoon = [];
closingSoon = [];

//I can't just go through all instances and build to the index dynamically because we want to show the user their locations after they've been sorted. openingSoon and closingSoon allows us to sort the locations prior to display.

var today = new Date();

if (today > 5) {
  console.log('gotta do the weekend list yo');
}

function Location (styledname, name, vibe, food, start, end, weekend, url) {
  this.styledname = styledname;
  this.name = name;
  this.start = start;
  this.end = end;
  this.weekend = weekend;
  this.vibe = vibe;
  this.food = food;
  this.imgPath = 'img/' + this.name + '.png';
  this.url = url;
  this.tallyShown = 0;
  this.tallyClick = 0;
  objectList.push(this);
  if (weekend === true) {
    objectListWeekend.push(this);
  }
};

var stjohns = new Location ('St. Johns', 'stjohns', 'Groovy', true, 5, 8, 'http://www.saintjohnsseattle.com/');
var larrysbar = new Location ('Larry\'s Bar', 'larrysbar', 'Dive', true, 2, 4);
var moesbar = new Location ('Moe\'s Bar', 'moesbar', 'Dive', false, 3, 5);
var curlysbar = new Location ('Curly\'s Bar', 'curlysbar', 'Dive', false, 4, 5, true);

var sortObjectList = function () {
  objectList.sort(function (a, b) {
    return a.start > b.start;
  });
}
sortObjectList();

// var sortClosingSoon = function () {
//   closingSoon.sort(function (a, b) {
//     return a.end > b.end;
//   });
// }
// sortClosingSoon();
//
// var sortOpeningSoon = function () {
//   openingSoon.sort(function (a, b) {
//     return a.start > b.start;
//   });
// }
// sortClosingSoon();



function buildOpeningSoonRow () {
  var firstFiver = document.getElementById('first_fiver');
  var newLoc = document.createElement('div');
  newLoc.id = 'loc' + objectList.indexOf(objectList[i]);
  firstFiver.appendChild(newLoc);

  var createH3 = function () {
    var h3El = document.createElement('h3');
    h3El.textContent = objectList[i].styledname;//Here
    newLoc.appendChild(h3El);
  };
  createH3();

  var createP = function () {
    var pEl = document.createElement('p');
    pEl.textContent = objectList[i].vibe;//Here
    newLoc.appendChild(pEl);
  };
  createP();

  var createClock = function () {
    var setTimer = function (){
      //something that pulls in props from an instance and creates a timer
      var newTimer = 'Countdown Timer';
      var newClock = document.createElement('div');
      newClock.textContent = newTimer;
      newLoc.appendChild(newClock);
    }
    setTimer();
  }
  createClock();
};


//Creates two arrays for locations opening soon and closing soon
for (var i = 0; i < objectList.length; i++)
  if (today.getHours() < objectList[i].end) { //Is happy hour over?
    if (today.getHours() > objectList[i].start) {//Has happy hour begun?
        closingSoon.push(objectList[i]);
      }
    openingSoon.push(objectList[i]);
    }
    buildOpeningSoonRow();
  }



//By default I want to display any locations that have begun happy hour
//Then I want to display any locations that are opening soon

//if they hit the vibe button, I want to resort my array by vibe then display
//if they hit the food button, I want to remove any locations without food
