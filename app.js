'use strict';

var imgArray = [];

var imgElOne = document.getElementById('image-one');
var imgElTwo = document.getElementById('image-two');
var imgElThree = document.getElementById('image-three');
var maxClicks = 26;
var userClicks = 0;
var totalsOfClicks = document.getElementById('totals');
var myContainer = document.getElementById('container');
var imgIndexArray = [];


function Picture(name, src) {
  this.viewed = 0;
  this.clicked = 0;
  this.src = src;
  this.name = name;

  imgArray.push(this);
}

// local-storage retrieve data from last time logic

var retrievedItems = localStorage.getItem('savedItems');

if (retrievedItems) {
  imgArray = JSON.parse(retrievedItems);
} else {
  new Picture('bag', './img/bag.jpg');
  new Picture('banana', './img/banana.jpg');
  new Picture('bathroom', './img/bathroom.jpg');
  new Picture('boots', './img/boots.jpg');
  new Picture('breakfast', './img/breakfast.jpg');
  new Picture('bubblegum', './img/bubblegum.jpg');
  new Picture('chair', './img/chair.jpg');
  new Picture('cthulhu', './img/cthulhu.jpg');
  new Picture('dog-duck', './img/dog-duck.jpg');
  new Picture('dragon', './img/dragon.jpg');
  new Picture('pen', './img/pen.jpg');
  new Picture('pet-sweep', './img/pet-sweep.jpg');
  new Picture('scissors', './img/scissors.jpg');
  new Picture('shark', './img/shark.jpg');
  new Picture('sweep', './img/sweep.png');
  new Picture('tauntaun', './img/tauntaun.jpg');
  new Picture('unicorn', './img/unicorn.jpg');
  new Picture('usb', './img/usb.gif');
  new Picture('water-can', './img/water-can.jpg');
  new Picture('wine-glass', './img/wine-glass.jpg');
}

// Random Number Generator
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

// This line creates unique pictures each time
function randomPicture() {
  while (imgIndexArray.length > 3) {
    imgIndexArray.pop();
  }
  while (imgIndexArray.length < 6) {
    var imgIndex = randomNumber(imgArray.length);
    while (imgIndexArray.includes(imgIndex)) {
      imgIndex = randomNumber(imgArray.length);
    }
    imgIndexArray.unshift(imgIndex);
  }
}

function renderImages() {

  randomPicture();

  var imgOne = imgArray[imgIndexArray[0]];
  var imgTwo = imgArray[imgIndexArray[1]];
  var imgThree = imgArray[imgIndexArray[2]];

  imgElOne.src = imgOne.src;
  imgElTwo.src = imgTwo.src;
  imgElThree.src = imgThree.src;

  imgElOne.alt = imgOne.name;
  imgElTwo.alt = imgTwo.name;
  imgElThree.alt = imgThree.name;

  imgOne.viewed++;
  imgTwo.viewed++;
  imgThree.viewed++;
}




function eventHandler(event) {
  userClicks++;
  var imgClicked = event.target;

  if (imgClicked === myContainer) {
    alert('Please click an image.');
  }

  if (userClicks === maxClicks) {
    myContainer.removeEventListener('click', eventHandler);
    for (var j = 0; j < imgArray.length; j++) {
      var imgClickedAmount = document.createElement('p');
      imgClickedAmount.textContent = `${imgArray[j].name}, clicked ${imgArray[j].clicked} times, viewed ${imgArray[j].viewed} times.`;
      totalsOfClicks.append(imgClickedAmount);
    }
    showChart();

    // set local storage
    var stringifiedItems = JSON.stringify(imgArray);
    localStorage.setItem('savedItems', stringifiedItems);
  }
  for (var i = 0; i < imgArray.length; i++) {
    if (imgArray[i].name === event.target.alt) {
      imgArray[i].clicked++;
      renderImages();
    }
  }
}

// This is where the chart function lives
function showChart() {
  var clicksArray = [];
  var viewedArray = [];
  var pictureNameArray = [];

  for (var i = 0; i < imgArray.length; i++) {
    clicksArray.push(imgArray[i].clicked);
    viewedArray.push(imgArray[i].viewed);
    pictureNameArray.push(imgArray[i].name);
  }

  var ctx = document.getElementById('chartTotal').getContext('2d');

  var chartData = {
    type: 'bar',
    data: {
      labels: pictureNameArray,
      datasets: [{
        label: '# of Votes',
        data: clicksArray,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }, {
        label: '# of Views',
        data: viewedArray,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };
  var myChart = new Chart(ctx, chartData);
}


myContainer.addEventListener('click', eventHandler);
// imgElOne.addEventListener('click', eventHandler);
// imgElTwo.addEventListener('click', eventHandler);
// imgElThree.addEventListener('click', eventHandler);

renderImages();






