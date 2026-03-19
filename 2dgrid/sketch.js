// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let haha = [[1,0,0,0],
  [1,0,1,0],
  [0,1,0,0],
  [0,0,1,1]
];
let SQUAREDIMENSION = haha.length;
let cellsize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellsize = height/SQUAREDIMENSION;
}

function draw() {
  background(220);
  show();
}
function show(){
  for (let y = 0; y < SQUAREDIMENSION, y ++;){
    for (let x = 0; x < SQUAREDIMENSION, x ++;){
      if (haha[y][x] === 0){
        fill("white");
      }
      else{
        fill("black");
      }
      square(x * cellsize,y * cellsize, cellsize);
    }
  }
}