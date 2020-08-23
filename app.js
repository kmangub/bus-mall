'use strict';

var imgArray = [];

var imgElOne = document.getElementById('image-one');
var imgElTwo = document.getElementById('image-two');
var imgElThree = document.getElementById('image-three');
var maxClicks = 26;
var userClicks = 0;
var totalsOfClicks = document.getElementById('totals');
var myContainer = document.getElementById('container');


function Picture(name, src) {
  this.viewed = 0;
  this.clicked = 0;
  this.src = src;
  this.name = name;

  imgArray.push(this);
}

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


function renderImages() {

  var imgOne = imgArray[randomNumber(imgArray.length)];
  var imgTwo = imgArray[randomNumber(imgArray.length)];
  var imgThree = imgArray[randomNumber(imgArray.length)];

  while (imgOne === imgTwo || imgTwo === imgThree || imgOne === imgThree) {
    imgOne = imgArray[randomNumber(imgArray.length)];
    imgTwo = imgArray[randomNumber(imgArray.length)];
  }


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

function randomNumber(max) {
  return Math.floor(Math.random() * max);
}



function eventHandler(event) {
  userClicks++;
  if (userClicks === maxClicks) {
    myContainer.removeEventListener('click', eventHandler);
    for (var j = 0; j < imgArray.length; j++) {
      var imgClickedAmount = document.createElement('p');
      imgClickedAmount.textContent = `${imgArray[j].name}, clicked ${imgArray[j].clicked} times, viewed ${imgArray[j].viewed} times.`;
      totalsOfClicks.append(imgClickedAmount);
    }
  }
  for (var i = 0; i < imgArray.length; i++) {
    if (imgArray[i].name === event.target.alt) {
      imgArray[i].clicked++;
    }
  }
  renderImages();
}

myContainer.addEventListener('click', eventHandler);
// imgElOne.addEventListener('click', eventHandler);
// imgElTwo.addEventListener('click', eventHandler);
// imgElThree.addEventListener('click', eventHandler);

renderImages();



