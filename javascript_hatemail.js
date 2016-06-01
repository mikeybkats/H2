
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


// function diveFilter (event) {
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
// }


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
