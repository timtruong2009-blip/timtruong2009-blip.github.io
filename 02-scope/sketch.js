// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let number = 80;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("black");
  stroke("white");
  noLoop();
}


function draw() {
  number = 50;
  
  line(number,0,number,height);

  for (let number = 120; number < 200; number += 2){
    line(number,0,number,height);
    console.log(number);
  }

  drawAnnotherLine();
  drawYetOneMoreLine();

}
function drawAnnotherLine(){
  let number = 320;
  line(number,0, number, height);
}
function drawYetOneMoreLine(){
  line(number+5,0,number +5, height);
}


