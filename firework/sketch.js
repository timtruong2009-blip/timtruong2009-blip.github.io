// Firework OOP demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
class Spark{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.dx = random(-10,10);
    this.dy = random(-10,10);
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.opacity = 255;
  }
  display(){
    noStroke();
    fill(this.r,this.g, this.b, this.opacity);
    circle(this.x, this.y, 10);
  }
  update(){
    this.x += this.dx;
    this.y += this.dy;
    this.opacity -= 1;
  }
  kill(){
    return this.opacity <= 0;
  }
}
let fireWorks = [];
const NUMOFSPARK = 100;
let pressed = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("black");
  for (let fire of fireWorks){
    if (fire.kill()){
      let index = fireWorks.indexOf(fire);
      fireWorks.splice(index,1);
    }
    else{
      fire.display();
      fire.update();
    }
  }
}
function mousePressed (){
  for (let i = 0; i < NUMOFSPARK; i++){
    let newFire = new Spark(mouseX, mouseY);
    fireWorks.push(newFire);
  }
  
}