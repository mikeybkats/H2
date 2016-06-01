
var objectList = [];
var objectListWeekend = [];
var openingSoon = [];
var closingSoon = [];
var options = [5, 10, 15, 20];
var expandCount = 0;

var relaxingFilterSetting = false;
var relaxingOpeningSoon = [];
var relaxingClosingSoon = [];

var upbeatFilterSetting = false;
var upbeatOpeningSoon = [];
var upbeatClosingClosing = [];

var refinedFilterSetting = false;
var refinedOpeningSoon = [];
var refinedClosingSoon = [];

var resultsTable = document.getElementById('results');
//I can't just go through all instances and build to the index dynamically because we want to show the user their locations after they've been sorted. openingSoon and closingSoon allows us to sort the locations prior to display.

// var today = new Date();
var today = 4;

// Testing button for filters... will move soon
var bodyElement = document.getElementById('body');

var refinedFilter = document.getElementById('vibe');
refinedFilter.addEventListener('click', refinedFilterHandler);


var foodFilter = document.getElementById('food');
//foodFilter.addEventListener('click', foodFilterHandler);

var timeFilter = document.getElementById('time');
//timeFilter.addEventListener('click', timeFilterHandler);

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

var stjohns = new Location ('St. Johns', 'stjohns', 'Refined', true, 5, 8, 'http://www.saintjohnsseattle.com/');
var larrysbar = new Location ('Larry\'s Bar', 'larrysbar', 'Refined', true, 6, 9);
var moesbar = new Location ('Moe\'s Bar', 'moesbar', 'Refined', false, 5, 7);
var curlysbar = new Location ('Curly\'s Bar', 'curlysbar', 'Refined', false, 4, 7, true);
var benstavern = new Location ('Ben\'s Tavern', 'benstavern', 'Refined', false, 5, 8);
var jerrystavern = new Location ('Jerry\'s Tavern', 'jerrystavern', 'Upbeat', true, 6, 8);
var conans = new Location ('Conan\'s', 'conans', 'Upbeat', true, 6, 9, true);
var johns = new Location ('John\'s', 'johns', 'Upbeat', false, 7, 9);
var bearkats = new Location ('Bearkat\'s', 'jerrystavern', 'Upbeat', true, 7, 9);
var bishops = new Location ('Bishop\'s', 'conans', 'Upbeat', true, 7, 9, true);
var toms = new Location ('Tom\'s', 'toms', 'Relaxing', true, 8, 9, true);
var dicks = new Location ('Dick\'s', 'dicks', 'Relaxing', false, 8, 9);
var harrys = new Location ('Harry\'s', 'harrys', 'Relaxing', true, 8, 9);
var yomommas = new Location ('YoMommas\'s', 'yomommas', 'Relaxing', true, 8, 9, true);

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
        if ('Refined' === objectList[i].vibe) {
          refinedClosingSoon.push(objectList[i]);
        }
        if ('Relaxing' === objectList[i].vibe) {
          relaxingClosingSoon.push(objectList[i]);
        }
        if ('Upbeat' === objectList[i].vibe) {
          upbeatClosingClosing.push(objectList[i]);
        }
      }
      if (today < objectList[i].start) {
        openingSoon.push(objectList[i]);
        if ('Refined' === objectList[i].vibe) {
          refinedOpeningSoon.push(objectList[i]);
        }
        if ('Relaxing' === objectList[i].vibe) {
          relaxingOpeningSoon.push(objectList[i]);
        }
        if ('Upbeat' === objectList[i].vibe) {
          upbeatOpeningSoon.push(objectList[i]);
        }
      }
    }
  }
  console.log('There are ' + (openingSoon.length + closingSoon.length) + ' available Happy Hours. ' + relaxingOpeningSoon.length + ' are relaxing Happy Hours opening soon. ' + relaxingClosingSoon.length + ' are relaxing Happy Hours closing soon. ' + refinedOpeningSoon.length + ' are refined Happy Hours opening soon. ' + refinedClosingSoon.length + ' are refined Happy Hours closing soon. ' + upbeatOpeningSoon.length + ' are upbeat Happy Hours opening soon. ' + upbeatClosingClosing.length + ' are upbeat Happy Hours closing soon.');
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
};

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
    var newClock = document.createElement('td');
    newLoc.appendChild(newClock);
    var timeinterval = setInterval(function(){
      var closingDate = (new Date()).setHours(arrayUsed[i].end, 0, 0, 0);
      var t = closingDate - (new Date());
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24 );
      var seconds = Math.floor((t / 1000) % 60 );
      var minutes = Math.floor((t / 1000 / 60) % 60 );
      newClock.innerHTML = hours + ':' + minutes + ':' + seconds;
      if(t <= 0){
        clearInterval(timeinterval);
      }
    },1000);
    newClock.style.color = '#cc0000';
  };
  createClock();
};

var sectionBuild = function (openingSoonArray, closingSoonArray) {
  // var combinedLength = openingSoonArray.length + closingSoonArray.length;
  for (var i = 0; i < openingSoonArray.length; i++) { //write all the openings
    if (resultsTable.childElementCount < options[expandCount]) {//as long as there's less on the DOM than we have available
      buildOpeningSoonRow(i, openingSoonArray);
    }
  }
  for (var i = 0; i < closingSoonArray.length; i++) {
    if (resultsTable.childElementCount < options[expandCount]) {
      buildClosingSoonRow(i, closingSoonArray);
    }
  }
};

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
function expander (numResults, expandingFromOpeningArray, expandingFromClosingArray) {
  console.log(expandingFromOpeningArray.length);
  if (expandingFromOpeningArray.length + expandingFromClosingArray.length > options[numResults]) {
    var expandButton = document.createElement('button');
    expandButton.id = 'expandButton';
    expandButton.textContent = 'See More';
    var expandDiv = document.getElementById('expandDiv');
    expandDiv.appendChild(expandButton);
    ++expandCount;
    expandButton.addEventListener('click', expandList);
  }
}
expander(expandCount, openingSoon, closingSoon);

function expandList (event) { //This happens when there's more options
  expandDiv.removeChild(expandButton); //Removes button
  while (resultsTable.firstChild) { //While the resultsTable has a first child
    resultsTable.removeChild(resultsTable.firstChild);//Remove all the children
  }
  sectionBuild(expandCount, openingSoon, closingSoon);//Build the section again now that expandCount has been plused up
  expander(expandCount, openingSoon, closingSoon);//Show the button if there's still more
}


// var expandCheck = function (openingSoonArray, closingSoonArray, handler) {
//   console.log('There are ' + (openingSoonArray.length + closingSoonArray.length) + ' available Happy Hours. ' + ' And there are ' + resultsTable.childElementCount + ' Happy Hours on the DOM.');
//
//   if ((openingSoonArray.length + closingSoonArray.length) > resultsTable.childElementCount) {
//     var expandButton = document.createElement('button');
//     expandButton.id = 'expandButton';
//     expandButton.textContent = 'See More';
//     var expandDiv = document.getElementById('expandDiv');
//     console.log('appending button');
//     expandDiv.appendChild(expandButton);
//     expandButton.addEventListener('click', handler);
//   }
// };
//
// var builder = function (openingSoonArray, closingSoonArray, handler) {
//   // if ((openingSoonArray.length + closingSoonArray.length) < options[expandCount]) {
//     // var remaining = ((openingSoonArray.length + closingSoonArray.length) - resultsTable.childElementCount);
//   for (var i = 0; i < (openingSoonArray.length + closingSoonArray.length); i++) {
//     if ((openingSoonArray.length + closingSoonArray.length) < options[expandCount]) {
//       sectionBuild(openingSoonArray, closingSoonArray);
//     }
//   }
//   // }
//   expandCheck(openingSoonArray, closingSoonArray, handler);
//   ++expandCount;
// };
//
// // If
//
// //BUILD INITIAL VIEW
// builder(openingSoon, closingSoon, openingExpandHandler);
//
// //EVENT HANDLERS
// function openingExpandHandler (event) { //This happens when there's more options
//   expandDiv.removeChild(expandButton); //Removes button
//   while (resultsTable.firstChild) { //While the resultsTable has a first child
//     resultsTable.removeChild(resultsTable.firstChild);//Remove all the children
//   }
//   console.log(openingSoon.length + closingSoon.length);
//   builder(openingSoon, closingSoon, openingExpandHandler);
// }

function refinedFilterHandler (event) {
  expandCount = 0;
  while (resultsTable.firstChild) { //While the resultsTable has a first child
    resultsTable.removeChild(resultsTable.firstChild);//Remove all the children
  }
  sectionBuild(expandCount, refinedOpeningSoon, refinedClosingSoon);
}
