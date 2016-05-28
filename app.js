objectList = [];

function Location (styledname, name, vibe, start, end) {
  this.styledname = styledname;
  this.name = name;
  this.stared = 0;
  this.end = 0;
  this.vibe = vibe;
  this.imgPath = 'img/' + this.name + '.png';
  this.tallyShown = 0;
  this.tallyClick = 0;
  objectList.push(this);
};

var stjohns = new Location ('St. Johns', 'stjohns', 'groovy', 5, 8);

console.log(objectList);

function displayFirstSection () {
  var firstFiver = document.getElementById('first_fiver');
  var newLoc = document.createElement('div');
  newLoc.id = objectList.length - 1;
  firstFiver.appendChild(newLoc);

  var createH3 = function () {
    var h3El = document.createElement('h3');
    h3El.textContent = objectList[0].styledname;
    newLoc.appendChild(h3El);
  };
  createH3();

  var createP = function () {
    var pEl = document.createElement('p');
    pEl.textContent = objectList[0].vibe;
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
displayFirstSection();

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
