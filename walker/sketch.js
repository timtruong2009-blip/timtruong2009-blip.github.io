// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Walker{
  constructor(x,y,color){
    this.x = x;
    this.y = y;
    this.color = color;
  }
  display(){
    fill(this.color);
    noStroke();
    circle(this.x, this.y, 5);
  }
  move(){
    let randum = random(100);
    if (randum > 75){
      this.x += 5;
    }
    else if (randum > 50){
      this.x -= 5;
    }
    else if (randum > 25){
      this.y += 5;
    }
    else if (randum > 0){
      this.y -= 5;
    }
  }
}

let allWalker = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // tim = new Walker(windowWidth /2,windowHeight /2,"red");
  // mit = new Walker(windowWidth /4,windowHeight /2,"blue");
}

function draw() {
  if (allWalker.length !== 0){
    for (let walk of allWalker){
      walk.display();
      walk.move();
    }
  }
}

function mousePressed(){
  let tim = new Walker(mouseX,mouseY,color(random(255),random(255),random(255)));
  allWalker.push(tim);
}
