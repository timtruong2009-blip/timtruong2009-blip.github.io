// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// use this if hard code
// let haha = [[1,0,0,0],
//   [1,0,1,0],
//   [0,1,0,0],
//   [0,0,1,1]
// ];

// let SQUAREDIMENSION = haha.length;


// use this if randomizing
let haha;
let SQUAREDIMENSION = 10;
let cellsize;
let mouse_press_pos;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width < height){
    cellsize = width/SQUAREDIMENSION;
  }
  else{
    cellsize = height/SQUAREDIMENSION;
  }
  haha = randomGrid(SQUAREDIMENSION, SQUAREDIMENSION);

}

function draw() {
  background(220);
  show();
}
function show(){
  for (let y = 0; y < SQUAREDIMENSION; y ++){
    for (let x = 0; x < SQUAREDIMENSION; x ++){
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

function mousePressed(){
  mouse_press_pos = {x : floor(mouseX / cellsize), y : floor(mouseY/ cellsize)};
  if (haha[mouse_press_pos.y][mouse_press_pos.x] === 1){
    haha[mouse_press_pos.y][mouse_press_pos.x] = 0;
  }
  else{
    haha[mouse_press_pos.y][mouse_press_pos.x] = 1;
  }
}

function randomGrid(col, row){
  let array = [];
  for (let y = 0; y < row; y ++){
    array.push([]);
    for (let x = 0; x < col; x++){
      if (random(100) < 50){
        array[y].push(1);
      }
      else{
        array[y].push(0);
      }
    }
  }
  return array;
}
