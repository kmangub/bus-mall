'use strict';

var imgArray = [];

var imgElOne = document.getElementById('image-one');
var imgElTwo = document.getElementById('image-two');
var imgElThree = document.getElementById('image-three');

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

function renderImages() {

  var imgOne = imgArray[randomNumber(imgArray.length)];
  var imgTwo = imgArray[randomNumber(imgArray.length)];
  var imgThree = imgArray[randomNumber(imgArray.length)];

  while (imgOne === imgTwo || imgTwo === imgThree || imgOne === imgThree ) {
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

renderImages();
