var objectList = [];
var objectListWeekend = [];
var openingSoon = [];
var closingSoon = [];
var options = [5, 10, 15, 20];
var expandCount = 0;
var expandButton = document.getElementById('expand');
var results = document.getElementById('results');
var id;
//I can't just go through all instances and build to the index dynamically because we want to show the user their locations after they've been sorted. openingSoon and closingSoon allows us to sort the locations prior to display.

var currentHour = (new Date).getHours();
var currentMinute = (new Date).getMinutes();
var currentSecond = (new Date).getSeconds();

function Location (startTime, end, styledName, vibe, food, url) {
  this.styledName = styledName;
  this.startTime = startTime;
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
      if (currentHour >= objectList[i].startTime) {//Has happy hour begun?
        closingSoon.push(objectList[i]);
      }
      if (currentHour < objectList[i].startTime) {
        openingSoon.push(objectList[i]);
      }
    }
  }
  console.log('There are ' + (openingSoon.length + closingSoon.length) + ' available Happy Hours');
}

//Sorts all the arrays
function sortObjectList () {
  objectList.sort(function (a, b) {
    return a.startTime < b.startTime;
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
    return a.startTime < b.startTime;
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

function buildResults() {
  buildResultsHeader();
  var counter = 0;
  var remainder = options[expandCount] - closingSoon.length;
  if ((openingSoon.length + closingSoon.length) < options[expandCount]) {
    options[expandCount] = openingSoon.length + closingSoon.length;
  }
  for (var i = 0; i < options[expandCount]; i++) {
    if (i < closingSoon.length) {
      console.log(i + ' ' + closingSoon.length);
      var trEl = document.createElement('tr');
      var tdEl = document.createElement('td');
      tdEl.textContent = closingSoon[i].styledName;
      trEl.appendChild(tdEl);
      tdEl = document.createElement('td');
      tdEl.textContent = closingSoon[i].vibe;
      trEl.appendChild(tdEl);
      tdEl = document.createElement('td');
      tdEl.textContent = (parseInt(closingSoon[i].startTime) - 12) + ':00pm';
      trEl.appendChild(tdEl);
      tdEl = document.createElement('td');
      tdEl.textContent = (parseInt(closingSoon[i].end) - 12) + ':00pm';
      trEl.appendChild(tdEl);
      tdEl = document.createElement('td');
      id = 'clock' + i;
      tdEl.setAttribute('id', id);
      trEl.appendChild(tdEl);
      initializeClock(id, i);
      results.appendChild(trEl);
    } else {
      var trEl = document.createElement('tr');
      var tdEl = document.createElement('td');
      tdEl.textContent = openingSoon[counter].styledName;
      trEl.appendChild(tdEl);
      tdEl = document.createElement('td');
      tdEl.textContent = openingSoon[counter].vibe;
      trEl.appendChild(tdEl);
      tdEl = document.createElement('td');
      tdEl.textContent = (parseInt(openingSoon[counter].startTime) - 12) + ':00pm';
      trEl.appendChild(tdEl);
      tdEl = document.createElement('td');
      tdEl.textContent = (parseInt(openingSoon[counter].end) - 12) + ':00pm';
      trEl.appendChild(tdEl);
      results.appendChild(trEl);
      counter += 1;
    }
  }
}

function initializeClock(id, i) {
  var timeinterval = setInterval(function(){
    var closingDate = new Date();
    closingDate.setHours(closingSoon[i].end, 0, 0, 0);
    var currentTime = new Date();
    var t = closingDate - currentTime;
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24 );
    var seconds = Math.floor((t / 1000) % 60 );
    var minutes = Math.floor((t / 1000 / 60) % 60 );
    document.getElementById(id).innerHTML = hours + ':' + minutes + ':' + seconds;
    if(t <= 0){
      clearInterval(timeinterval);
    }
  },1000);
}

// Need to adjust after discussing object arguments and filters, maybe need to add more input fields to html file
function addNewLocation(event) {
  var name = event.target.name.value;
  var startTime = parseInt(event.target.startTime.value);
  var end = parseInt(event.target.end.value);
  var vibe = event.target.vibe.value;
  var food = event.target.food.value;
  var bool;
  if (food === 'true') {
    bool = true;
  } else {
    bool = false;
  }
  var add = new Location(startTime, end, name, vibe, bool);
  var lsAdd = JSON.stringify(objectList);
  localStorage.setItem('locationsArray', lsAdd);
}

function expandList(event) {
  expandCount += 1;
  if (closingSoon.length + openingSoon.length <= options[expandCount]) {
    options[expandCount] = closingSoon.length + openingSoon.length;
    expandButton.hidden = true;
  }
  results.innerHTML = '';
  sortOpeningSoon();
  buildResults();
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
  var buckleys = new Location(16, 19, 'Buckleys', 'vibe', true, 'http://www.buckleyspubs.com/');
  var elysianBar = new Location(15, 18, 'Elysian Bar', 'vibe', true, 'http://www.elysianbrewing.com/');
  var robRoy = new Location(16, 19, 'Rob Roy', 'vibe', true, 'http://www.robroyseattle.com/');
  var rabbitHole = new Location(16, 19, 'Rabbit Hole', 'vibe', true, 'http://rabbitholeseattle.com/');
  var pinxto = new Location(22, 24, 'Pinxto', 'vibe', true, 'http://www.pintxoseattle.com/');
  var theUpstairs = new Location(17, 21, 'The Upstairs', 'vibe', true, 'http://www.theupstairsseattle.com/');
  var lavaLounge = new Location(15, 19, 'Lava Lounge', 'vibe', false, 'http://lavaloungeseattle.com/');
  var rendevous = new Location(15, 19, 'Rendevous', 'vibe', true, 'http://www.therendezvous.rocks/menu/');
  var belltownPub = new Location(16, 18, 'Belltown Pub', 'vibe', true, 'http://belltownpub.com/');
  var shortys = new Location(16, 20, 'Shorty\'s', 'vibe', true, 'http://www.shortydog.com/');
  var list = new Location(16, 18, 'List', 'vibe', true, 'http://www.listbelltown.com/');
  var roccos = new Location(11, 19, 'Rocco\'s', 'vibe', true, 'http://www.roccosseattle.com/');
  var wakeFieldBar = new Location(16, 20, 'Wakefield Bar', 'vibe', true, 'http://wakefieldbar.com/');
  var fivePoint = new Location(16, 18, 'The 5-point cafe', 'vibe', true, 'http://the5pointcafe.com/');
  var amber = new Location(16, 19, 'Amber', 'vibe', true, 'http://www.amberseattle.com/');
  var theCrocodile = new Location(16, 19, 'The Crocodile', 'vibe', false, 'http://www.thecrocodile.com/');
  var umiSushi = new Location(16, 18, 'Umi Sushi & Sake Bar Restaurant', 'vibe', true, 'http://www.umisakehouse.com/');

}

buildOpenCloseArrays();
sortObjectList();
sortClosingSoon();
sortOpeningSoon();
buildResults();

document.getElementById('addLocation').addEventListener('submit', addNewLocation);
expandButton.addEventListener('click', expandList);

// function diveFilter (event) {
//
// }

//if they hit the vibe button, I want to resort my array by vibe then display
//if they hit the food button, I want to remove any locations without food
// document.getElementById('food').addEventListener('click', removeFood);
