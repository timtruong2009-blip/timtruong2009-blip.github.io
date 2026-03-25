// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// 2d rectangular grid demo


const GRIDSIZE = 20;
const RENDERFRAME = 2;
const OPENGRID = 0;
const CLOSEGRID = 1;
const PLAYER = 9;

let rows;
let cols;
let grid;
let autoplay = false;
let gosper;

let notgood;

let daPlayer = {
  x: 0,
  y: 0
};

function preload(){
  notgood = loadImage("set9/set9-example5.png");
  good = loadImage("set9/set9-example1.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(height/GRIDSIZE);
  cols = Math.floor(width/GRIDSIZE);
  grid = generateRandomGrid(cols, rows);

  grid[daPlayer.y][daPlayer.x] = PLAYER;
}

function draw() {
  background(220);
  if (autoplay && frameCount % RENDERFRAME === 0){
    grid = taketurn();
  }
  
  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX/GRIDSIZE);
  let y = Math.floor(mouseY/GRIDSIZE);

  //self
  toggleCell(x, y);

  //neighbours
  
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(cols, rows);
    grid[daPlayer.y][daPlayer.x] = PLAYER;
  }
  else if (key === "e") {
    grid = generateEmptyGrid(cols, rows);
    grid[daPlayer.y][daPlayer.x] = PLAYER;
  }
  else if (key === " "){
    autoplay = !autoplay;
  }
  else if (key === "s"){
    movePlayer(daPlayer.x, daPlayer.y +1);
  }
  else if (key === "w"){
    movePlayer(daPlayer.x, daPlayer.y -1);
  }
  else if (key === "a"){
    movePlayer(daPlayer.x -1, daPlayer.y );
  }
  else if (key === "d"){
    movePlayer(daPlayer.x +1, daPlayer.y );
  }
  
}

function makeBlack(){
  grid[daPlayer.y][daPlayer.x] = OPENGRID;
}

function movePlayer(x,y){
  if (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length && grid[y][x] !== CLOSEGRID){
    makeBlack();
    daPlayer.x = x;
    daPlayer.y = y;
    grid[daPlayer.y][daPlayer.x] = PLAYER;
  }
  

  
}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the grid
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === OPENGRID) {
      grid[y][x] = 1;
    }
    else if (grid[y][x] === CLOSEGRID) {
      grid[y][x] = 0;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === OPENGRID) {
        image(good, x * GRIDSIZE, y * GRIDSIZE, GRIDSIZE, GRIDSIZE);
      }
      else if (grid[y][x] === CLOSEGRID) {
        image(notgood, x * GRIDSIZE, y * GRIDSIZE, GRIDSIZE, GRIDSIZE);
      }
      else if(grid[y][x] === PLAYER){
        fill("red");
        square(x * GRIDSIZE, y * GRIDSIZE, GRIDSIZE);
      }
      
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
      if (grid[y][x] === CLOSEGRID){
        if (neighbour === 2 || neighbour === 3){
          nextturn[y][x] = CLOSEGRID;
        }
        else{
          nextturn[y][x] = OPENGRID;
        }
      }
      if (grid[y][x] === OPENGRID){
        if (neighbour === 3){
          nextturn[y][x] = CLOSEGRID;
        }
        else{
          nextturn[y][x] = OPENGRID;
        }
      }
      

    }
  }
  return nextturn;
}