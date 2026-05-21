// recursive_circle
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawCircle(windowWidth/2, windowWidth/2);
}


function drawCircle(x,radius){
  let fillColor = map(radius, width/2, 50, 255, 75);
  fill(fillColor);
  circle(x, windowHeight/2, radius * 2);

  let maxRad = map(mouseX,0,width, width/2, 50);
  if (radius > maxRad){
    drawCircle(x - radius/2,radius/2) ;
    drawCircle(x + radius/2, radius /2);
  }
  else{
    return;
  }
}