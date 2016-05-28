var deadline = 'December 31 2015 23:59:59 GMT+0200';

// a function that takes a string representing a given end time (as outlined above), and calculate the difference between that time and the current time.

function getTimeRemaining (endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60 );
  var minutes = Math.floor((t / 1000 / 60) % 60 );
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24 );
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

// hold the remaining time until the deadline. The Date.parse() function is native JavaScript that converts a time string into a value in milliseconds.

var t = Date.parse(endtime) - Date.parse(new Date());

// convert the milliseconds to days, hours, minutes, and seconds.
var seconds = Math.floor((t / 1000) % 60);

// With the days, hours, minutes, and seconds prepared, we’re now ready to return the data as a reusable object:
return {
  'total': t,
  'days': days,
  'hours': hours,
  'minutes': minutes,
  'seconds': seconds
};

// This object allows you to call your function and get any of the calculated values. Here’s an example of how you’d get the remaining minutes:
getTimeRemaining(deadline).minutes

// Now that we have a function that spits out the days, hours, minutes, and seconds remaining, we can build our clock. First we’ll create the following HTML element to hold our clock:

<div id="clockdiv"></div>

// Then we’ll write a function that outputs the clock data inside our new div. This function takes two parameters: the id of the element that will contain our clock and the end time of the countdown. Inside the function, we’ll declare a variable called clock and use it to store a reference to our clock container div so that we don’t have to keep querying the DOM.

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var timeinterval = setInterval(function(){
    var t = getTimeRemaining(endtime);
    clock.innerHTML = 'days: ' + t.days + '<br>' +
                      'hours: '+ t.hours + '<br>' +
                      'minutes: ' + t.minutes + '<br>' +
                      'seconds: ' + t.seconds;
    if(t.total<=0){
      clearInterval(timeinterval);
    }
  },1000);
}

// At this point, the only remaining step is to run the clock like so:


initializeClock('clockdiv', deadline);
