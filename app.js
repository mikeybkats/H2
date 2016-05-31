var objectList = [];
var objectListWeekend = [];
var openingSoon = [];
var closingSoon = [];
var options = [5, 10, 15, 20];
var expandCount = 0;
var results = document.getElementById('results');
//I can't just go through all instances and build to the index dynamically because we want to show the user their locations after they've been sorted. openingSoon and closingSoon allows us to sort the locations prior to display
var currentHour = (new Date).getHours();
var currentMinute = (new Date).getMinutes();

// Testing button for filters... will move soon
// var bodyElement = document.getElementById('body');
// var diveButton = document.createElement('button');
// diveButton.id = 'diveButton';
// diveButton.textContent = 'DIVE FILTER';
// bodyElement.appendChild(diveButton);
// diveButton.addEventListener('click', diveFilter);
// if (today.getDay > 5) {
//   console.log('gotta do the weekend list yo');
// }

function Location (start, end, styledName, vibe, food, url) {
  this.styledName = styledName;
  this.start = start;
  this.end = end;
  this.vibe = vibe;
  this.food = food;
  this.imgPath = 'img/' + this.styledName + '.png';
  this.url = url;
  // this.tallyShown = 0;
  // this.tallyClick = 0;
  objectList.push(this);
  // if (weekend === true) {
  //   objectListWeekend.push(this);
  // }
};

//Creates two arrays for locations opening soon and closing soon
// for (var i = 0; i < objectList.length; i++)
//   if (today.getHours() < objectList[i].end) { //Is happy hour over?
//     if (today.getHours() > objectList[i].start) {//Has happy hour begun?
//         closingSoon.push(objectList[i]);
//       }
//     openingSoon.push(objectList[i]);
//     }
//   }

//Creates opening and closing arrays
function buildOpenCloseArrays () {
  console.log('builing opening and closing array');
  for (var i = 0; i < objectList.length; i++) {
    if (currentHour < objectList[i].end) { //Is happy hour over?
      if (currentHour >= objectList[i].start) {//Has happy hour begun?
        closingSoon.push(objectList[i]);
      }
      if (currentHour < objectList[i].start) {
        openingSoon.push(objectList[i]);
      }
    }
  }
  console.log('There are ' + (openingSoon.length + closingSoon.length) + ' available Happy Hours');
}

//Sorts all the arrays
function sortObjectList () {
  objectList.sort(function (a, b) {
    return a.start > b.start;
  });
}

function sortClosingSoon() {
  console.log('sorting closing array');
  closingSoon.sort(function (a, b) {
    return a.end > b.end;
  });
}

function sortOpeningSoon() {
  console.log('sorting opening array');
  openingSoon.sort(function (a, b) {
    return a.start > b.start;
  });
}

function buildResultsHeader() {
  var thEl = document.createElement('th');
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Venue name';
  thEl.appendChild(tdEl);
  tdEl = document.createElement('td');
  tdEl.textContent = 'Vibe';
  thEl.appendChild(tdEl);
  tdEl = document.createElement('td');
  tdEl.textContent = 'Happy Hour Start Time';
  thEl.appendChild(tdEl);
  tdEl = document.createElement('td');
  tdEl.textContent = 'Happy Hour End Time';
  thEl.appendChild(tdEl);
  tdEl = document.createElement('td');
  tdEl.textContent = 'Happy Hour ends in... ';
  thEl.appendChild(tdEl);
  results.appendChild(thEl);
}

//objectList to be replaced with proper array once we've discussed things
// for loop also should be adjusted for expand after we discuss that as well
function buildResults() {
  var trEl = document.createElement('tr');
  for (var i = 0; i < 5; i++) {
    var tdEl = document.createElement('td');
    tdEl.textContent = objectList[i].styledName;
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = objectList[i].vibe;
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = (parseInt(objectList[i].start) - 12) + ':00pm';
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = (parseInt(objectList[i].end) - 12) + ':00pm';
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    // If/else statement to calculate time remaining by subtracting currentHour/instance.start||end
    // and currentMinute from instance.end and concatentating the string for table output too lazy atm
    if (currentHour > objectList[i].start) {
//
    }
    trEl.appendChild(tdEl);
  }
  results.appendChild(trEl);
}

// Need to adjust after discussing object arguments and filters, maybe need to add more input fields to html file
function addNewLocation(event) {
  var name = event.target.name.value;
  var start = parseInt(event.target.start.value);
  var end = parseInt(event.target.end.value);
  var vibe = event.target.vibe.value;
  var food = event.target.food.value;
  var bool;
  if (food === 'true') {
    bool = true;
  } else {
    bool = false;
  }
  var add = new Location(start, end, name, vibe, bool);
  var lsAdd = JSON.stringify(objectList);
  localStorage.setItem('locationsArray', lsAdd);
}

// function removeFood(event) {
//   for ()
// }

// Might need to change the for loop to set each property if those don't seem to be set properly
if (localStorage.getItem('locationsArray') !== null) {
  var list = localStorage.getItem('locationsArray');
  list = JSON.parse(list);
  for (var i = 0; i < list.length; i++) {
    objectList[i] = list[i];
  }
} else {
  var twoBells = new Location(16, 19, 'The Two Bells', 'vibe', true, 'http://thetwobells.com/');
  var bathTubGin = new Location(17, 19, 'Bathtub Gin', 'vibe', false, 'http://bathtubginseattle.com/');
  var theWhiskeyBar = new Location(14, 19, 'The Whiskey Bar', 'vibe', true, 'http://thewhiskybar.com/');
  var elysianBar = new Location(15, 18, 'Elysian Bar', 'vibe', true, 'http://www.elysianbrewing.com/');
  // var buckleys = new Location(0, 23, 'Buckleys', 'vibe', true, 'http://www.buckleyspubs.com/');
  // var buckleys = new Location(0, 23, 'Buckleys', 'vibe', true, 'http://www.buckleyspubs.com/');
  // var buckleys = new Location(0, 23, 'Buckleys', 'vibe', true, 'http://www.buckleyspubs.com/');
  // var buckleys = new Location(0, 23, 'Buckleys', 'vibe', true, 'http://www.buckleyspubs.com/');
  // var buckleys = new Location(0, 23, 'Buckleys', 'vibe', true, 'http://www.buckleyspubs.com/');

}

buildOpenCloseArrays();
sortObjectList();
sortClosingSoon();
sortOpeningSoon();

buildResultsHeader();
buildResults();

document.getElementById('form').addEventListener('submit', addNewLocation);

// function diveFilter (event) {
//
// }

//if they hit the vibe button, I want to resort my array by vibe then display
//if they hit the food button, I want to remove any locations without food
document.getElementById('food').addEventListener('click', removeFood);
