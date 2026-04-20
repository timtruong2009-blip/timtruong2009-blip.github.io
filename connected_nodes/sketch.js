// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let allNodes = [];
let auto =false;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  if (auto){
    let newNodes = new Node(mouseX, mouseY);
    allNodes.push(newNodes);
  }

  for (let nod of allNodes){
    nod.update();
    nod.connect(allNodes);
  }
  for (let nod of allNodes){
    nod.display();
  }
  
}


function mousePressed(){
  let newNodes = new Node(mouseX, mouseY);
  allNodes.push(newNodes);
}

function keyPressed(){
  if (key === "e"){
    auto = !auto;
  }
}

class Node{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.xtime = random(1000);
    this.ytime = random(1000);
    this.color = color(random(255), random(255), random(255));
    this.speed = 5;
    this.deltaTime = 0.05;
    this.distance = 200;
  }
  display(){
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }

  update(){
    this.move();
    this.warpAround();
    this.adjustSize();
  }

  move(){
    let dx = noise(this.xtime);
    let dy = noise(this.ytime);

    dx = map(dx, 0, 1, -this.speed, this.speed);
    dy = map(dy, 0, 1, -this.speed, this.speed);

    this.x += dx;
    this.y += dy;

    this.xtime += this.deltaTime;
    this.ytime += this.deltaTime;
  }

  warpAround(){
    if (this.x < 0){
      this.x = width;
    }
    if (this.x > width){
      this.x = 0;
    }
    if (this.y < 0){
      this.y = height;
    }
    if (this.y > height){
      this.y = 0;
    }
  }
  connect(array){
    for (let all of array){
      if (this !== all){
        let disApart = dist(this.x, this.y, all.x, all.y);

        if (disApart < this.distance){
          stroke(this.color);
          line(this.x, this.y, all.x, all.y);
        }
      }
    }
  }

  adjustSize(){
    let mouseDis = dist(mouseX, mouseY, this.x, this.y);
    if (mouseDis < this.distance){
      let daSize = map(mouseDis, 0, this.distance, 50, 15);
      this.radius = daSize;
    }
    else{
      this.radius = 15;
    }

  }

}
