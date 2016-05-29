objectList = [];
objectListWeekend = [];
openingSoon = [];
closingSoon = [];

var today = new Date();

if (today > 5) {
  console.log('gonna do the weeekend list');
}

function Location (styledname, name, vibe, start, end, weekend, url) {
  this.styledname = styledname;
  this.name = name;
  this.start = start;
  this.end = end;
  this.weekend = weekend;
  this.vibe = vibe;
  this.imgPath = 'img/' + this.name + '.png';
  this.url = url;
  this.tallyShown = 0;
  this.tallyClick = 0;
  objectList.push(this);
  if (weekend === true) {
    objectListWeekend.push(this);
  }
};

var stjohns = new Location ('St. Johns', 'stjohns', 'Groovy', 5, 8, 'http://www.saintjohnsseattle.com/');
var larrysbar = new Location ('Larry\'s Bar', 'larrysbar', 'Dive', 2, 4);
var moesbar = new Location ('Moe\'s Bar', 'moesbar', 'Dive', 3, 5);
var curlysbar = new Location ('Curly\'s Bar', 'curlysbar', 'Dive', 4, 5, true);

console.dir(objectList.sort(function (a, b) {
  return a.start > b.start;
}));



//Grab the currentTime
//if current object has start time < current time keep going
//then push object to openingSoon Array

//if current object has start time > current time
//then push object to closingSoon Array


function buildRow () {
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

for (var i = 0; i < objectList.length; i++)
  if (objectList[i].start < today.getHours()) {
    if (today.getHours() > objectList[i].end) {
    }
    buildRow();
  }


//I want to populate each row with the

// function that created a clock based on an instance property
// put that clock on a div
// put that div in a clock variable
// return clock to the higher scoped function
// append clock to a parent div


// I need it to create a section
// I need it to append the section to the body

// I need to check the time
// I need to

// I need to create a row function that
  // ceates first row div

// I then need to place a that function into a for loop that does the same thing five times for each instance that matches

// I need to append first row div to section
// I need to create a loop that c
