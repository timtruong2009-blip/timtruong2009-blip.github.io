// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ball_array = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for (let item of ball_array){
    item.x += item.dx;
    item.y += item.dy;
    circle(item.x, item.y, item.radius);
  }
}
 
function mousePressed(){
  spawn_ball();
}



function spawn_ball(){
  let ball = {
    x: random(width),
    y: random(height),
    dx: random(-5,5),
    dy: random(-5,5),
    radius: random(10,40)
  };
  ball_array.push(ball);
}