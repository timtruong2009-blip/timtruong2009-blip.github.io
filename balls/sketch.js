// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ball_array = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(0);
  for (let item of ball_array){
    teleport(item);
    item.x += item.dx;
    item.y += item.dy;
    fill(item.color);
    circle(item.x, item.y, item.radius);
    
  }
}
 
function mousePressed(){
  spawn_ball(mouseX, mouseY, [random(255),random(255),random(255)]);
}



function spawn_ball(_x, _y, color){
  
  let ball = {
    x: _x,
    y: _y,
    dx: random(-5,5),
    dy: random(-5,5),
    radius: random(10,40),
    color: color
  };
  ball_array.push(ball);
}

function teleport(the_ball){
  let num = ball_array.indexOf(the_ball);
  if ( the_ball.x - the_ball.radius <= 0){
    ball_array[num].x = width + the_ball.radius;
  }
  if (the_ball.x + the_ball.radius >= width){
    ball_array[num].x = -the_ball.radius;
  }
  if (the_ball.y+ the_ball.radius >= height){
    ball_array[num].y = -the_ball.radius;
  }
  if (the_ball.y- the_ball.radius <= 0){
    ball_array[num].y = height + the_ball.radius;
  }
}