// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const SQUARESIZE = 80;
let rows;
let column;
let grid;

function setup() {
  createCanvas(windowWidth, windowHeight);
  widthorheight();
  grid = randomthing(rows, column,0,1);
  print(grid);
}

function draw() {
  background(220);
  drawgrid();
  

}

function widthorheight(){
  rows = floor(height/SQUARESIZE);
  column = floor(width/SQUARESIZE);
}
function drawgrid(){
  for (let y = 0; y <= rows; y ++){
    for (let x = 0; x <= column ; x ++){
      fill(255 - grid[y][x] * 255);
      square(SQUARESIZE * x, SQUARESIZE * y,SQUARESIZE);
    }
  }
}

function randomthing(row,col, min, max){
  let newgrid = [];
  for (let i = 0; i <= row; i++){
    let newrow = [];
    for (let e = 0; e <= col; e++){
      newrow.push(Math.round(random(min,max)));
    }
    newgrid.push(newrow);
  }
  
  return newgrid;
}

function mousePressed(){
  let pos = {x: floor(mouseY / SQUARESIZE), y :floor(mouseX / SQUARESIZE)};
  togglecell(pos);
  directionstuff(pos);
  
  
}

function keyPressed(){
  if (key === "e"){
    grid = randomthing(rows, column, 0,0);
  }
}

function togglecell(pos){
  let it;
  print(pos);
  if (grid.length  >= pos.x){
    if (grid[pos.x].length  >= pos.y){
      it = grid[pos.x][pos.y];
      if (it === 1){
        grid[pos.x][pos.y] = 0;
      }
      else{
        grid[pos.x][pos.y] = 1;
      }
    }
  }
  
  

}


function directionstuff(pos){
  togglecell({x:pos.x + 1, y:pos.y});
  togglecell({x:pos.x - 1, y:pos.y});
  togglecell({x:pos.x, y:pos.y + 1});
  togglecell({x:pos.x, y:pos.y - 1});
}
