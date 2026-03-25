// 2d rectangular grid demo


const CELL_SIZE = 20;
const RENDERFRAME = 2;
const DEADCELL = 0;
const LIVECELL = 1;

let rows;
let cols;
let grid;
let autoplay = false;
let gosper;

function preload(){
  gosper = loadJSON("gosper.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(height/CELL_SIZE);
  cols = Math.floor(width/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);
}

function draw() {
  background(220);
  if (autoplay && frameCount % RENDERFRAME === 0){
    grid = taketurn();
  }
  
  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  //self
  toggleCell(x, y);

  //neighbours
  
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(cols, rows);
  }
  else if (key === "e") {
    grid = generateEmptyGrid(cols, rows);
  }
  else if (key === " "){
    autoplay = !autoplay;
  }
  else if (key === "g"){
    grid = gosper;
  }

}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the grid
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === DEADCELL) {
      grid[y][x] = 1;
    }
    else if (grid[y][x] === LIVECELL) {
      grid[y][x] = 0;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === DEADCELL) {
        fill("white");
      }
      else if (grid[y][x] === LIVECELL) {
        fill("black");
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        newGrid[y].push(0);
      }
      else {
        newGrid[y].push(1);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function taketurn(){
  let nextturn = generateEmptyGrid(cols, rows);
  for (let x = 0; x < cols; x ++){
    for (let y = 0; y < rows; y++){
      let neighbour = 0;
      for (let i = -1; i <= 1; i++){
        for (let j = -1; j <= 1; j++){
          if (x + i >= 0 && x+i < cols && y + j >= 0 && y + j < rows){
            neighbour += grid[y + j][x + i];
          }
        }
      }
      // kms
      neighbour -= grid[y][x];
      // apply rules
      if (grid[y][x] === LIVECELL){
        if (neighbour === 2 || neighbour === 3){
          nextturn[y][x] = LIVECELL;
        }
        else{
          nextturn[y][x] = DEADCELL;
        }
      }
      if (grid[y][x] === DEADCELL){
        if (neighbour === 3){
          nextturn[y][x] = LIVECELL;
        }
        else{
          nextturn[y][x] = DEADCELL;
        }
      }
      

    }
  }
  return nextturn;
}