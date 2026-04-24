// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let newVehi;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // newVehi = new Vehicle("Car", "Bord");
  newVehi = new Car("Bord");
  console.log(newVehi.getName());
  // console.log(newVehi.getType());
}

function draw() {
  background(220);
}

class Vehicle{
  constructor(type, name){
    this.type= type;
    this.name = name;
  }
  getName(){
    return this.name;
  }
  getType(){
    return this.type;
  }
}

class Car extends Vehicle{
  constructor(name){
    super("Car", name);

  }

  getName(){
    return "bs indeed indeed";
  }
}
