var objectList = [];
var objectListWeekend = [];
var openingSoon = [];
var closingSoon = [];
var options = [5, 10, 15, 20];
var expandCount = 0;

var relaxingOpeningSoon = [];
var relaxingClosingSoon = [];

var upbeatOpeningSoon = [];
var upbeatClosingClosing = [];

var refinedOpeningSoon = [];
var refinedClosingSoon = [];

var resultsTable = document.getElementById('results');
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
  };
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
var harrys = new Location ('Harry\'s', 'harrys', 'Dive', true, 8, 9);
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
  console.log('building opening and closing array');
  for (var i = 0; i < objectList.length; i++) {
    if (today < objectList[i].end) { //Is happy hour over?
      if (today > objectList[i].start) {//Has happy hour begun?
        closingSoon.push(objectList[i]);
        if ('refined' === objectList[i].vibe) {
          refinedClosingSoon.push(objectList[i]);
        }
        if ('relaxing' === objectList[i].vibe) {
          relaxingClosingSoon.push(objectList[i]);
        }
        if ('upbeat' === objectList[i].vibe) {
          upbeatClosingClosing.push(objectList[i]);
        }
      }
      if (today < objectList[i].start) {
        openingSoon.push(objectList[i]);
        if ('refined' === objectList[i].vibe) {
          refinedOpeningSoon.push(objectList[i]);
        }
        if ('relaxing' === objectList[i].vibe) {
          refinedOpeningSoon.push(objectList[i]);
        }
        if ('upbeat' === objectList[i].vibe) {
          refinedOpeningSoon.push(objectList[i]);
        }
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
};
sortObjectList();

var sortAllOpeningSoon = function () {
  console.log('sorting opening array');
  openingSoon.sort(function (a, b) {
    return a.start > b.start;
  });
  relaxingOpeningSoon.sort(function (a, b) {
    return a.start > b.start;
  });
  refinedOpeningSoon.sort(function (a, b) {
    return a.start > b.start;
  });
  upbeatOpeningSoon.sort(function (a, b) {
    return a.start > b.start;
  });
};
sortAllOpeningSoon();

var sortAllClosingSoon = function () {
  console.log('sorting closing array');
  closingSoon.sort(function (a, b) {
    return a.end > b.end;
  });
  relaxingClosingSoon.sort(function (a, b) {
    return a.start > b.start;
  });
  refinedClosingSoon.sort(function (a, b) {
    return a.start > b.start;
  });
  upbeatClosingClosing.sort(function (a, b) {
    return a.start > b.start;
  });
};
sortAllClosingSoon();


//openingSoon Row Builder
var buildOpeningSoonRow = function (i, arrayUsed) {
  var newLoc = document.createElement('tr');
  newLoc.id = 'loc' + arrayUsed.indexOf(arrayUsed[i]);
  resultsTable.appendChild(newLoc);

  var createTdName = function () {
    var tdEl = document.createElement('td');
    tdEl.textContent = arrayUsed[i].styledname;//Add location name
    newLoc.appendChild(tdEl);
  };
  createTdName();

  var createVibe = function () {
    var tdEl = document.createElement('td');
    tdEl.textContent = arrayUsed[i].vibe;//Add location vibe
    newLoc.appendChild(tdEl);
  };
  createVibe();

  // var createClock = function () {
  //   var setTimer = function (){
  //     //something that pulls in props from an instance and creates a timer
  //     var newTimer = 'Countdown Timer';
  //     var newClock = document.createElement('tr');
  //     newClock.textContent = newTimer; //Add location countdown
  //     newLoc.appendChild(newClock);
  //   }
  //   setTimer();
  // }
  // createClock();
};

//closingSoon Row Builder
var buildClosingSoonRow = function (i, arrayUsed) {
  var newLoc = document.createElement('tr');
  newLoc.id = 'loc' + arrayUsed.indexOf(arrayUsed[i]);//Prob doesn't need to be numbered
  resultsTable.appendChild(newLoc);

  var createTdName = function () {
    var tdEl = document.createElement('td');
    tdEl.textContent = arrayUsed[i].styledname;//Add location name
    newLoc.appendChild(tdEl);
  };
  createTdName();

  var createVibe = function () {
    var tdEl = document.createElement('td');
    tdEl.textContent = arrayUsed[i].vibe;//Add location vibe
    newLoc.appendChild(tdEl);
  };
  createVibe();

  var createClock = function () {
    var setTimer = function (){
      //something that pulls in props from an instance and creates a timer
      var newTimer = 'Countdown Timer';
      var newClock = document.createElement('tr');
      newClock.textContent = newTimer; //Add location countdown
      newLoc.appendChild(newClock);
      newClock.style.color = '#cc0000';
    };
    setTimer();
  };
  createClock();
};

//Builds first five taking first from openingSoon and then from closingSoon
var sectionBuild = function (numResults, openingSoonArray, closingSoonArray) {
  for (var i = 0; i < openingSoonArray.length; i++) {
    if (resultsTable.childElementCount < options[numResults]) {
      buildOpeningSoonRow(i, openingSoonArray); //very interesting that i doesn't automatically scope down into this function.
    }
  }

  for (var i = 0; i < closingSoonArray.length; i++) {
    if (resultsTable.childElementCount < options[numResults]) {
      buildClosingSoonRow(i, closingSoonArray);
    }
  }
};
sectionBuild(0, openingSoon, closingSoon);

//Creates button to expand results based on the amount you want shown
function expander (numResults) {
  if (openingSoon.length + closingSoon.length > options[numResults]) {
    var expandButton = document.createElement('button');
    expandButton.id = 'expandButton';
    expandButton.textContent = 'See More';
    var expandDiv = document.getElementById('expandDiv');
    expandDiv.appendChild(expandButton);
    ++expandCount;
    expandButton.addEventListener('click', expandList);
  }
}
expander(expandCount);

function expandList (event) { //This happens when there's more options
  expandDiv.removeChild(expandButton); //Removes button
  while (resultsTable.firstChild) { //While the resultsTable has a first child
    resultsTable.removeChild(resultsTable.firstChild);//Remove all the children
  }
  sectionBuild(expandCount, openingSoon, closingSoon);//Build the section again now that expandCount has been plused up
  expander(expandCount);//Show the button if there's still more
}

//There doesn't seem to be any way to store things from the DOM in order to remove them
//You can't push the DOM elements to an array because they don't show up as removable elements
//You can't store an element in a variable and then remove the element stored in the variable from DOM
//You can't even iterate over the DOM because you can't test the innerHTML text against a string
//No matter where I define the i, or whether I use a while or for loop, the i looses its scope
//This crazy nonsense is the a work in progress

// function diveFilter (event) {
//   console.log('in');
//   var i = 1;
//   while (i < resultsTable.childElementCount + 1) {
//     console.log(i);
//     var checkMe = resultsTable.childNodes[i].childNodes[1].innerHTML;
//     i++;
//     if (checkMe === 'Hipster') {
//       console.log(checkMe === 'Hipster');
//       console.log(resultsTable.childNodes[i - 1]);
//       resultsTable.removeChild(resultsTable.childNodes[i - 1]);
//     }
//   }
// }

// Even with methods available to table elements, once you try to access the DOM from within a For loop everything breaks down.
// function diveFilter (event) {
//   var i = 1;
//   console.log(typeof(resultsTable.childNodes[i].childNodes[i].innerHTML));
//   var store = resultsTable.childNodes[i].childNodes[i].innerHTML;
//   console.log(store === 'Hipster');
//   for (var i = 0; i < resultsTable.childElementCount; i++) {
//     var store = resultsTable.childNodes[i].childNodes[i].innerHTML;
//     if (store === 'Hipster') {
//       resultsTable.deleteRow(resultsTable.childNodes[i]);
//       console.log('Killed it with fire');
//     }
//   }
// }

function diveFilter (event) {
  // var i = 1;
  // console.log(typeof(resultsTable.childNodes[i].childNodes[i].innerHTML));
  // var store = resultsTable.childNodes[i].childNodes[i].innerHTML;
  // console.log(store === 'Hipster');
  // for (var i = 0; i < resultsTable.childElementCount; i++) {
  //   var store = resultsTable.childNodes[i].childNodes[i].innerHTML;
  //   if (store === 'Hipster') {
  //     resultsTable.deleteRow(resultsTable.childNodes[i]);
  //     console.log('Killed it with fire');
  //   }
  // }
  //expandCount = 0;
}

// var buildRelaxingOpeningSoonRow = function (i) {
//   var newLoc = document.createElement('tr');
//   newLoc.id = 'loc' + openingSoon.indexOf(openingSoon[i]);
//   resultsTable.appendChild(newLoc);
//
//   var createTdName = function () {
//     var tdEl = document.createElement('td');
//     tdEl.textContent = openingSoon[i].styledname;//Add location name
//     newLoc.appendChild(tdEl);
//   };
//   createTdName();
//
//   var createVibe = function () {
//     var tdEl = document.createElement('td');
//     tdEl.textContent = openingSoon[i].vibe;//Add location vibe
//     newLoc.appendChild(tdEl);
//   };
//   createVibe();

//if they hit the vibe button, I want to resort my array by vibe then display
//if they hit the food button, I want to remove any locations without food
