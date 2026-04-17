// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Ball{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.dx = random(-5,5);
    this.dy = random(-5,5);

    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.radius = random(50);
  }
  display(){
    noStroke();
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.radius *2);
  }
  move(){
    this.x += this.dx;
    this.y += this.dy;

    if (this.y - this.radius < 0 || this.y + this.radius > windowHeight){
      this.dy *= -1;
    }
    if (this.x - this.radius < 0 || this.x + this.radius > windowWidth){
      this.dx *= -1;
    }
  }
  bounce(otherball){
    let radiusSum = this.radius + otherball.radius;
    let distance = dist(this.x, this.y, otherball.x, otherball.y);
    if (radiusSum > distance){
      let tempx = this.dx;
      let tempy = this.dy;

      this.dy = otherball.dy;
      this.dx = otherball.dx;

      otherball.dx = tempx;
      otherball.dy = tempy;

      this.x += this.dx;
      this.y += this.dy;
    }
  }
}

let allBall = [];
let auto = false;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for (let ball of allBall){
    ball.display();
    ball.move();
    for (let other of allBall){
      if (ball === other){
        continue;
      }
      ball.bounce(other);
    }
  }
  if (auto){
    let newball = new Ball(mouseX, mouseY);
    allBall.push(newball);
  }

  
}
function mousePressed(){
  let newball = new Ball(mouseX, mouseY);
  allBall.push(newball);
}

function keyPressed(){
  if (key === "e"){
    auto = !auto;
  }
  
}