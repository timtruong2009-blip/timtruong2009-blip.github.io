// Image Demo
// Tim 
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cat;
function preload(){
  cat = loadImage("cat.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);


  image(cat,mouseX,mouseY,300,200);
}
