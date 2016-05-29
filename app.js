objectList = [];
objectListWeekend = [];
openingSoon = [];
closingSoon = [];
options = [5, 10, 15, 20];
resultsSection = document.getElementById("results")
//I can't just go through all instances and build to the index dynamically because we want to show the user their locations after they've been sorted. openingSoon and closingSoon allows us to sort the locations prior to display.

// var today = new Date();
var today = 1;

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
var benstavern = new Location ('Ben\'s Tavern', 'benstavern', 'Dive', false, 2, 4);
var jerrystavern = new Location ('Jerry\'s Tavern', 'jerrystavern', 'Dive', true, 3, 5);
var conans = new Location ('Conan\'s', 'conans', 'hipster', true, 4, 5, true);

//Creates two arrays for locations opening soon and closing soon
// for (var i = 0; i < objectList.length; i++)
//   if (today.getHours() < objectList[i].end) { //Is happy hour over?
//     if (today.getHours() > objectList[i].start) {//Has happy hour begun?
//         closingSoon.push(objectList[i]);
//       }
//     openingSoon.push(objectList[i]);
//     }
//   }

//***Testing loop*** falsely creates openingSoon array, delete when done
for (var i = 0; i < objectList.length; i++) {
  if (today < objectList[i].end) { //Is happy hour over?
    if (today > objectList[i].start) {//Has happy hour begun?
        closingSoon.push(objectList[i]);
    }
    openingSoon.push(objectList[i]);
  }
}


//Sorts all the arrays
var sortObjectList = function () {
  objectList.sort(function (a, b) {
    return a.start > b.start;
  });
}
sortObjectList();

var sortClosingSoon = function () {
  closingSoon.sort(function (a, b) {
    return a.end > b.end;
  });
}
sortClosingSoon();

var sortOpeningSoon = function () {
  openingSoon.sort(function (a, b) {
    return a.start > b.start;
  });
}
sortOpeningSoon();

//openingSoon Row Builder
var buildOpeningSoonRow = function () {
  var newLoc = document.createElement('div');
  newLoc.id = 'loc' + openingSoon.indexOf(openingSoon[i]);
  resultsSection.appendChild(newLoc);

  var createH3 = function () {
    var h3El = document.createElement('h3');
    h3El.textContent = openingSoon[i].styledname;//Add location name
    newLoc.appendChild(h3El);
  };
  createH3();

  var createP = function () {
    var pEl = document.createElement('p');
    pEl.textContent = openingSoon[i].vibe;//Add location vibe
    newLoc.appendChild(pEl);
  };
  createP();

  var createClock = function () {
    var setTimer = function (){
      //something that pulls in props from an instance and creates a timer
      var newTimer = 'Countdown Timer';
      var newClock = document.createElement('div');
      newClock.textContent = newTimer; //Add location countdown
      newLoc.appendChild(newClock);
    }
    setTimer();
  }
  createClock();
};
// buildOpeningSoonRow();

//Builds first five taking first from openingSoon and then from closingSoon
//This should be wrapped
for (var i = 0; i < openingSoon.length; i++) {
  if (resultsSection.childElementCount < options[0]) {
    buildOpeningSoonRow();
  }
}

// for (var i = 0; i < closingSoon.length; i++) {
//   if (resultsSection.childElementCount < options[0]) {
//     buildClosingSoonRow();
//   }
// }

//The above function should then be repeated but changed to options[1]
//And hooked into an 'expand' event handler
//I may even be able to set a variable inside of the options[var], that I could then just reuse the above function with as an input that will flow through the function aboveFunction(var), whenever I want to expand my options list.




//if they hit the vibe button, I want to resort my array by vibe then display
//if they hit the food button, I want to remove any locations without food
