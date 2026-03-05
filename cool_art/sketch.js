// arty
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



const SIZE = 20;
let tile = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let size = SIZE/2; )
    for (let item of tile){
      let some_tile = spawn_tile(0, height/2, SIZE);
      tile.push(some_tile);
      line(item.x1, item.y1, item.x2, item.y2);
    }
}

function draw() {
}

function spawn_tile(x, y, size){
  let choice = random(100);
  let tiles;
  if (choice < 50){
    tiles = {
      x1: x - size/2,
      y1: y + size/2,
      x2: x + size/2,
      y2: y - size/2,
    };
  }
  else {
    tiles = {
      x1: x - size/2,
      y1: y - size/2,
      x2: x + size/2,
      y2: y + size/2,
    };
  }
  return tiles;
}