
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
var upbeatClosingSoon = [];

var refinedFilterSetting = false;
var refinedOpeningSoon = [];
var refinedClosingSoon = [];

var resultsTable = document.getElementById('results');

//I can't just go through all instances and build to the index dynamically because we want to show the user their locations after they've been sorted. openingSoon and closingSoon allows us to sort the locations prior to display.
var today = 15;
// var today = new Date();
var foodStyling = false;
var foodFilter = document.getElementById('food');
var timeFilter = document.getElementById('time');
timeFilter.addEventListener('click', timeFilterHandler);
foodFilter.addEventListener('click', foodFilterHandler);

function timeFilterHandler(event) {
  location.reload();
}

// if (today.getDay > 5) {
//   console.log('gotta do the weekend list yo');
// }

function Location (start, end, styledname, vibe, food, url) {
  this.styledname = styledname;
  // this.name = name;
  this.start = start;
  this.end = end;
  // this.weekend = weekend;
  this.vibe = vibe;
  this.food = food;
  // this.imgPath = 'img/' + this.name + '.png';
  this.url = url;
  // this.tallyShown = 0;
  // this.tallyClick = 0;
  objectList.push(this);
  // if (weekend === true) {
  //   objectListWeekend.push(this);
  // };
};

function instantiate () {
  var twoBells = new Location(16, 19, 'The Two Bells', 'Relaxing', true, 'http://thetwobells.com/');
  var bathTubGin = new Location(17, 19, 'Bathtub Gin', 'Relaxing', false, 'http://bathtubginseattle.com/');
  var theWhiskeyBar = new Location(14, 19, 'The Whiskey Bar', 'Refined', true, 'http://thewhiskybar.com/');
  var buckleys = new Location(16, 19, 'Buckleys', 'Upbeat', true, 'http://www.buckleyspubs.com/');
  var elysianBar = new Location(15, 18, 'Elysian Bar', 'Upbeat', true, 'http://www.elysianbrewing.com/');
  var robRoy = new Location(16, 19, 'Rob Roy', 'Refined', true, 'http://www.robroyseattle.com/');
  var rabbitHole = new Location(16, 19, 'Rabbit Hole', 'Upbeat', true, 'http://rabbitholeseattle.com/');
  var pinxto = new Location(22, 24, 'Pinxto', 'Relaxing', true, 'http://www.pintxoseattle.com/');
  var theUpstairs = new Location(17, 21, 'The Upstairs', 'Relaxing', true, 'http://www.theupstairsseattle.com/');
  var lavaLounge = new Location(15, 19, 'Lava Lounge', 'Upbeat', false, 'http://lavaloungeseattle.com/');
  var rendevous = new Location(15, 19, 'Rendevous', 'Upbeat', true, 'http://www.therendezvous.rocks/menu/');
  var belltownPub = new Location(16, 18, 'Belltown Pub', 'Upbeat', true, 'http://belltownpub.com/');
  var shortys = new Location(16, 20, 'Shorty\'s', 'Upbeat', true, 'http://www.shortydog.com/');
  var list = new Location(16, 18, 'List', 'Refined', true, 'http://www.listbelltown.com/');
  var roccos = new Location(13, 19, 'Rocco\'s', 'Relaxing', true, 'http://www.roccosseattle.com/');
  var wakeFieldBar = new Location(16, 20, 'Wakefield Bar', 'Refined', true, 'http://wakefieldbar.com/');
  var fivePoint = new Location(16, 18, 'The 5-point cafe', 'Upbeat', true, 'http://the5pointcafe.com/');
  var amber = new Location(16, 19, 'Amber', 'Refined', true, 'http://www.amberseattle.com/');
  var theCrocodile = new Location(16, 19, 'The Crocodile', 'Upbeat', false, 'http://www.thecrocodile.com/');
  var umiSushi = new Location(16, 18, 'Umi Sake House', 'Relaxing', true, 'http://www.umisakehouse.com/');
}
instantiate();

//Creates two arrays for locations opening soon and closing soon
// for (var i = 0; i < objectList.length; i++)
//   if (today.getHours() < objectList[i].end) { //Is happy hour over?
//     if (today.getHours() > objectList[i].start) {//Has happy hour begun?
//         closingSoon.push(objectList[i]);
//       }
//     openingSoon.push(objectList[i]);
//     }
//   }
buildTableHeader();

function foodStylingSet () {
  if (foodStyling) {
    var hasFood = document.querySelectorAll('.row-highlight');
    var foodIcon = document.getElementById('food');
    foodIcon.style.backgroundColor = '#FF6000';
    for (var i = 0; i < hasFood.length; i++) {
      hasFood[i].style.backgroundColor = '#FF6000';
    }
  }
}

//***Testing loop*** falsely creates openingSoon array, delete when done
//Creates opening and closing arrays
// Need to add .getHours() to today's to run in real time
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
          upbeatClosingSoon.push(objectList[i]);
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
  console.log('There are ' + (openingSoon.length + closingSoon.length) + ' available Happy Hours. ' + relaxingOpeningSoon.length + ' are relaxing Happy Hours opening soon. ' + relaxingClosingSoon.length + ' are relaxing Happy Hours closing soon. ' + refinedOpeningSoon.length + ' are refined Happy Hours opening soon. ' + refinedClosingSoon.length + ' are refined Happy Hours closing soon. ' + upbeatOpeningSoon.length + ' are upbeat Happy Hours opening soon. ' + upbeatClosingSoon.length + ' are upbeat Happy Hours closing soon.');
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
  upbeatClosingSoon.sort(function (a, b) {
    return a.start > b.start;
  });
};
sortAllClosingSoon();

var buildOpeningSoonRow = function (i, arrayUsed) {
  var newLoc = document.createElement('tr');
  if (arrayUsed[i].food) {
    newLoc.setAttribute('class', 'row-highlight');
  }
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

  var createStart = function() {
    var tdEl = document.createElement('td');
    tdEl.textContent = (arrayUsed[i].start - 12) + ':00pm';//Add location vibe
    newLoc.appendChild(tdEl);
  };
  createStart();

  var createEnd = function() {
    var tdEl = document.createElement('td');
    tdEl.textContent = (arrayUsed[i].end - 12) + ':00pm '; //Add location vibe
    newLoc.appendChild(tdEl);
  };
  createEnd();

};

var buildClosingSoonRow = function (i, arrayUsed) {
  var newLoc = document.createElement('tr');
  if (arrayUsed[i].food) {
    newLoc.setAttribute('class', 'row-highlight');
  }
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

  var createStart = function() {
    var tdEl = document.createElement('td');
    tdEl.textContent = (arrayUsed[i].start - 12) + ':00pm';
    newLoc.appendChild(tdEl);
  };
  createStart();

  var createEnd = function() {
    var tdEl = document.createElement('td');
    tdEl.textContent = (arrayUsed[i].end - 12) + ':00pm';//Add location vibe
    newLoc.appendChild(tdEl);
  };
  createEnd();

  var createClock = function () {
    var newClock = document.createElement('td');
    newLoc.appendChild(newClock);
    var timeinterval = setInterval(function(){
      var closingDate = new Date();
      var currentTimeFake = new Date();
      currentTimeFake.setHours(today);
      closingDate.setHours(arrayUsed[i].end, 0, 0, 0);
      var t = closingDate - currentTimeFake;
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24 );
      var seconds = Math.floor((t / 1000) % 60 );
      var minutes = Math.floor((t / 1000 / 60) % 60 );
      newClock.innerHTML = hours + ':' + minutes + ':' + seconds;
      if(t < 0){
        clearInterval(timeinterval);
        newLoc.removeChild(newClock);
      }
    },1000);
    newClock.style.color = '#cc0000';
  };
  createClock();
};

//Builds first five taking first from openingSoon and then from closingSoon
var sectionBuild = function (numResults, openingSoonArray, closingSoonArray) {
  for (var i = 0; i < closingSoonArray.length; i++) {
    if (resultsTable.childElementCount - 1 < options[numResults]) {
      buildClosingSoonRow(i, closingSoonArray);
    }
  }
  for (var i = 0; i < openingSoonArray.length; i++) {
    if (resultsTable.childElementCount - 1 < options[numResults]) {
      buildOpeningSoonRow(i, openingSoonArray); //very interesting that i doesn't automatically scope down into this function.
    }
  }
};
sectionBuild(0, openingSoon, closingSoon);

//Creates button to expand results based on the amount you want shown
function expander (numResults, expandingFromOpeningArray, expandingFromClosingArray) {
  var buttonContainer = document.getElementById('expandDiv');
  if (buttonContainer.firstChild) {
    buttonContainer.removeChild(buttonContainer.firstChild); //Removes button
  }
  console.log(expandingFromOpeningArray.length);
  if (expandingFromOpeningArray.length + expandingFromClosingArray.length > options[numResults]) {
    var expandButton = document.createElement('button');
    expandButton.id = 'expandButton';
    expandButton.setAttribute('class', 'button-seemore');
    expandButton.textContent = 'SEE MORE';
    var expandDiv = document.getElementById('expandDiv');
    expandDiv.setAttribute('class', 'expand-div');
    expandDiv.appendChild(expandButton);
    ++expandCount;
    expandButton.addEventListener('click', expandList);
  }
}
expander(expandCount, openingSoon, closingSoon);

function expandList (event) { //This happens when there's more options
  console.log(expandDiv);
  expandDiv.removeChild(document.getElementById('expandButton')); //Removes button
  while (resultsTable.firstChild) { //While the resultsTable has a first child
    resultsTable.removeChild(resultsTable.firstChild);//Remove all the children
  }
  buildTableHeader();
  var currentClosingArray;
  var currentOpeningArray;
  if (refinedFilterSetting) {
    currentClosingArray = refinedClosingSoon;
    currentOpeningArray = refinedOpeningSoon;
  } else if (relaxingFilterSetting) {
    currentClosingArray = relaxingClosingSoon;
    currentOpeningArray = relaxingOpeningSoon;
  } else if (upbeatFilterSetting) {
    currentClosingArray = upbeatClosingSoon;
    currentOpeningArray = upbeatOpeningSoon;
  } else {
    currentOpeningArray = openingSoon;
    currentClosingArray = closingSoon;
  }
  sectionBuild(expandCount, currentOpeningArray, currentClosingArray);//Build the section again now that expandCount has been plused up
  foodStylingSet();
  expander(expandCount, currentOpeningArray, currentClosingArray);//Show the button if there's still more
}

// function buildResultsHeader() {
//   var thEl = document.createElement('th');
//   var tdEl = document.createElement('td');
//   tdEl.setAttribute('class', 'table-header');
//   tdEl.textContent = 'Venue name';
//   thEl.appendChild(tdEl);
//   tdEl = document.createElement('td');
//   tdEl.setAttribute('class', 'table-header');
//   tdEl.textContent = 'Vibe';
//   thEl.appendChild(tdEl);
//   tdEl = document.createElement('td');
//   tdEl.setAttribute('class', 'table-header');
//   tdEl.textContent = 'Happy Hour Start Time';
//   thEl.appendChild(tdEl);
//   tdEl = document.createElement('td');
//   tdEl.setAttribute('class', 'table-header');
//   tdEl.textContent = 'Happy Hour End Time';
//   thEl.appendChild(tdEl);
//   tdEl = document.createElement('td');
//   tdEl.setAttribute('class', 'table-header');
//   tdEl.textContent = 'Happy Hour ends in... ';
//   thEl.appendChild(tdEl);
//   resultsTable.appendChild(thEl);
// }

function buildTableHeader () {
  var headerRow = document.createElement('tr');
  resultsTable.appendChild(headerRow);
  var venueHead = document.createElement('td');
  venueHead.textContent = 'VENUE';
  headerRow.appendChild(venueHead);
  var vibeHead = document.createElement('td');
  vibeHead.textContent = 'VIBE';
  headerRow.appendChild(vibeHead);
  var startHead = document.createElement('td');
  startHead.textContent = 'OPENS';
  headerRow.appendChild(startHead);
  var endHead = document.createElement('td');
  endHead.textContent = 'END';
  headerRow.appendChild(endHead);
  var timerHead = document.createElement('td');
  timerHead.textContent = 'TIME REMAINING';
  headerRow.appendChild(timerHead);
}

function filterHandler (event) {
  expandCount = 0;
  var buttonContainer = document.getElementById('expandDiv');
  if (buttonContainer.firstChild) {
    buttonContainer.removeChild(buttonContainer.firstChild); //Removes button
  }

  while (resultsTable.firstChild) { //While the resultsTable has a first child
    resultsTable.removeChild(resultsTable.firstChild);//Remove all the children
  }
  console.log(event.target.value);
  buildTableHeader();
  if (event.target.value === 'refined') {
    refinedFilterSetting = true;
    relaxingFilterSetting = false;
    upbeatFilterSetting = false;
    sectionBuild(expandCount, refinedOpeningSoon, refinedClosingSoon);
    foodStylingSet();
    expander(expandCount, refinedOpeningSoon, refinedClosingSoon);//Show the button if there's still more
  } else if (event.target.value === 'relaxing') {
    relaxingFilterSetting = true;
    refinedFilterSetting = false;
    upbeatFilterSetting = false;
    sectionBuild(expandCount, relaxingOpeningSoon, relaxingClosingSoon);
    foodStylingSet();
    expander(expandCount, relaxingOpeningSoon, relaxingClosingSoon);//Show the button if there's still more
  } else if (event.target.value === 'upbeat') {
    upbeatFilterSetting = true;
    relaxingFilterSetting = false;
    refinedFilterSetting = false;
    sectionBuild(expandCount, upbeatOpeningSoon, upbeatClosingSoon);
    foodStylingSet();
    expander(expandCount, upbeatOpeningSoon, upbeatClosingSoon);//Show the button if there's still more
  } else {
    refinedFilterSetting = false;
    relaxingFilterSetting = false;
    upbeatFilterSetting = false;
    sectionBuild(expandCount, openingSoon, closingSoon);//Build the section again now that expandCount has been plused up
    foodStylingSet();
    expander(expandCount, openingSoon, closingSoon);
  }
}

function foodFilterHandler(event) {
  if (!foodStyling) {
    foodStyling = true;
    var hasFood = document.querySelectorAll('.row-highlight');
    var foodIcon = document.getElementById('food');
    foodIcon.style.backgroundColor = '#FF6000';
    for (var i = 0; i < hasFood.length; i++) {
      hasFood[i].style.backgroundColor = '#FF6000';
    }
  } else {
    foodStyling = false;
    var hasFood = document.querySelectorAll('.row-highlight');
    var foodIcon = document.getElementById('food');
    foodIcon.style.backgroundColor = '#d4bd4b';
    for (var i = 0; i < hasFood.length; i++) {
      hasFood[i].style.backgroundColor = 'white';
    }
  }
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
