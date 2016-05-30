objectList = [];
objectListWeekend = [];
openingSoon = [];
closingSoon = [];
options = [5, 10, 15, 20];
expandCount = 0;
resultsSection = document.getElementById("results")
//I can't just go through all instances and build to the index dynamically because we want to show the user their locations after they've been sorted. openingSoon and closingSoon allows us to sort the locations prior to display.

// var today = new Date();
var today = 4;

// Testing button for filters... will move soon
var bodyElement = document.getElementById('body');
var diveButton = document.createElement('button');
diveButton.id = 'diveButton';
diveButton.textContent = 'DIVE FILTER';
bodyElement.appendChild(diveButton);
diveButton.addEventListener('click', diveFilter);


// if (today.getDay > 5) {
//   console.log('gotta do the weekend list yo');
// }

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
var larrysbar = new Location ('Larry\'s Bar', 'larrysbar', 'Groovy', true, 6, 9);
var moesbar = new Location ('Moe\'s Bar', 'moesbar', 'Uppity', false, 5, 7);
var curlysbar = new Location ('Curly\'s Bar', 'curlysbar', 'Uppity', false, 4, 7, true);
var benstavern = new Location ('Ben\'s Tavern', 'benstavern', 'Uppity', false, 5, 8);
var jerrystavern = new Location ('Jerry\'s Tavern', 'jerrystavern', 'Hipster', true, 6, 8);
var conans = new Location ('Conan\'s', 'conans', 'Hipster', true, 6, 9, true);
var johns = new Location ('John\'s', 'johns', 'Hipster', false, 7, 9);
var bearkats = new Location ('Bearkat\'s', 'jerrystavern', 'Hipster', true, 7, 9);
var bishops = new Location ('Bishop\'s', 'conans', 'Hipster', true, 7, 9, true);
var toms = new Location ('Tom\'s', 'toms', 'Dive', true, 8, 9, true);
var dicks = new Location ('Dick\'s', 'dicks', 'Dive', false, 8, 9);
var harrys = new Location ('harry\'s', 'harrys', 'Dive', true, 8, 9);
var yomommas = new Location ('YoMommas\'s', 'yomommas', 'Dive', true, 8, 9, true);

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
//Creates opening and closing arrays
function buildOpenCloseArrays () {
  console.log('builing opening and closing array');
  for (var i = 0; i < objectList.length; i++) {
    if (today < objectList[i].end) { //Is happy hour over?
      if (today > objectList[i].start) {//Has happy hour begun?
          closingSoon.push(objectList[i]);
      }
      if (today < objectList[i].start) {
        openingSoon.push(objectList[i]);
      }
    }
  }
  console.log('There are ' + (openingSoon.length + closingSoon.length) + ' available Happy Hours');
}
buildOpenCloseArrays();

//Sorts all the arrays
var sortObjectList = function () {
  objectList.sort(function (a, b) {
    return a.start > b.start;
  });
}
sortObjectList();

var sortClosingSoon = function () {
  console.log('sorting closing array');
  closingSoon.sort(function (a, b) {
    return a.end > b.end;
  });
}
sortClosingSoon();

var sortOpeningSoon = function () {
  console.log('sorting opening array');
  openingSoon.sort(function (a, b) {
    return a.start > b.start;
  });
}
sortOpeningSoon();


//openingSoon Row Builder
var buildOpeningSoonRow = function (i) {
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

  // var createClock = function () {
  //   var setTimer = function (){
  //     //something that pulls in props from an instance and creates a timer
  //     var newTimer = 'Countdown Timer';
  //     var newClock = document.createElement('div');
  //     newClock.textContent = newTimer; //Add location countdown
  //     newLoc.appendChild(newClock);
  //   }
  //   setTimer();
  // }
  // createClock();
};

//closingSoon Row Builder
var buildClosingSoonRow = function (i) {
  var newLoc = document.createElement('div');
  newLoc.id = 'loc' + closingSoon.indexOf(closingSoon[i]);//Prob doesn't need to be numbered
  resultsSection.appendChild(newLoc);

  var createH3 = function () {
    var h3El = document.createElement('h3');
    h3El.textContent = closingSoon[i].styledname;//Add location name
    newLoc.appendChild(h3El);
  };
  createH3();

  var createP = function () {
    var pEl = document.createElement('p');
    pEl.textContent = closingSoon[i].vibe;//Add location vibe
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
      newClock.style.color = "#cc0000";
    }
    setTimer();
  }
  createClock();
};

//Builds first five taking first from openingSoon and then from closingSoon
var sectionBuild = function (numResults) {
  for (var i = 0; i < openingSoon.length; i++) {
    if (resultsSection.childElementCount < options[numResults]) {
      console.log('building openingSoon row with i @ ' + i);
      buildOpeningSoonRow(i); //very interesting that i doesn't automatically scope down into this function.
    }
  }

  for (var i = 0; i < closingSoon.length; i++) {
    console.log('building closingSoon row with i @ ' + i);
    if (resultsSection.childElementCount < options[numResults]) {
      buildClosingSoonRow(i);
    }
  }
}
sectionBuild(0);

//Creates button to expand results based on the amount you want shown
function expander (numResults) {
    if (openingSoon.length + closingSoon.length > options[numResults]) {
    var expandButton = document.createElement('button');
    expandButton.id = 'expandButton';
    expandButton.textContent = 'See More';
    resultsSection.appendChild(expandButton);
    ++expandCount;
    expandButton.addEventListener('click', expandList);
  }
}
expander(expandCount);

function expandList (event) {
  resultsSection.removeChild(expandButton);
  while (resultsSection.firstChild) {
    resultsSection.removeChild(resultsSection.firstChild);
  }
  sectionBuild(expandCount);
  expander(expandCount);
}

// var nodeArray = resultsSection.childNodes;
// console.log(nodeArray[1]);


function diveFilter (event) {
 for (var i = 1; i < resultsSection.childElementCount-2; i++)
  console.log(resultsSection.childNodes[i]);
  if (resultsSection.childNodes[i].childNodes[1].innerHTML === 'Uppity' || 'Groovy' || 'Hipster') {
    resultsSection.removeChild(resultsSection.childNodes[i]);
    console.log('removing ' + resultsSection.childNodes[0].innerHTML);
  }
}

// for (var i = 1; i < nodeArray.length - 2; i++) {
//   var filterMe = nodeArray[i];
//   console.log(filterMe);
// }


//holding = nodeArray[0]
//'Dive' === holding.childNodes[1].innerHTML'
//resultsSection.removeChild(holding)

//if they hit the vibe button, I want to resort my array by vibe then display
//if they hit the food button, I want to remove any locations without food
