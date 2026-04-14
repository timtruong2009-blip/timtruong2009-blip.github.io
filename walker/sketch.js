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
    circle(this.x, this.y, 10);
  }
  move(){
    let randum = random(100);
    if (randum > 75){
      this.x += 10;
    }
    else if (randum > 50){
      this.x -= 10;
    }
    else if (randum > 25){
      this.y += 10;
    }
    else if (randum > 0){
      this.y -= 10;
    }
  }
}

let tim;
let mit;

function setup() {
  createCanvas(windowWidth, windowHeight);
  tim = new Walker(windowWidth /2,windowHeight /2,"red");
  mit = new Walker(windowWidth /2,windowHeight /2,"blue");
}

function draw() {
  tim.display();
  tim.move();

  mit.display();
  mit.move();
}
