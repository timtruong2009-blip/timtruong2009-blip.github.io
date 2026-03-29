// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Credit: 
// - School girl character: Free Game Assets on Itch.io
// - Starting Screen: Survivor.io
// - Game concept: Survivor.io

// 150,610
// 150,683

// 320,683
// 470,832

// 695

// button size 170 x 70
// 4.5, 6.5

const MAPSIZE = 400;
const GRIDSIZE = 20;

let map = [];
let gridSize = 32;
let currentlySelected = 0;

let survivalStartScreen;
let survivalButton;

const SCREENSCALE = 0.56302521008;
const MAPCOLOR = "#9e7c77";

let screenWidth;
let screenDistanceFromX;

let gameState = "mainscreen";
let buttonMultiply = 1;
let buttonScale;

let schoolgirlIdle;
let schoolgirlAttack;
let schoolgirlRun;
let schoolgirlPose;
const schoolgirlPixel = {w: 128 , h: 128};
let schoolgirlmulti = 2;

let you;

function preload(){
  survivalStartScreen = loadImage("School girl/survivorio.jpg");
  survivalButton = loadImage("School girl/survivoributton.jpg");

  schoolgirlIdle = loadImage("School girl/Idle.png");
  schoolgirlAttack = loadImage("School girl/Attack.png");
  schoolgirlRun = loadImage("School girl/Walk.png");
  schoolgirlPose = loadImage("School girl/Idle.png");

}

function setup() {
  buttonScale = calculateScale(832);
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  map = makeWorld();

  

}

function draw() {
  windowResized();
  background(MAPCOLOR);
  buttonScale = calculateScale(832);
  if (gameState === "mainscreen"){
    makeMainScreen();
  }
  else if (gameState === "preparephase"){
    preparing();

    
  }
  else if (gameState === "gamestart"){
    gameStart();
  }
}




function makeWorld(){
  let world = [];
  for (let y = 0; y <= MAPSIZE; y ++){
    let row_x = [];
    for (let x = 0; x <= MAPSIZE; x ++){                  
      row_x.push(0) ;                
    }                  
    world.push(row_x);                  
  }
  return world;               
}

function displaySheetStarting(classes,classespixel, numofframe, wherex, wherey, multiplier){
  let whichframe = floor(frameCount / 10) % numofframe;
  image(classes, wherex, wherey, 
    classespixel *multiplier, 
    classespixel *multiplier,
    classespixel * whichframe , 50 ,
    classespixel, classespixel);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  if (gameState === "mainscreen"){
    if (mouseX >= 150 * buttonScale + screenDistanceFromX && mouseX <= 320  * buttonScale + screenDistanceFromX && mouseY >= 610 * buttonScale && mouseY <= 683 * buttonScale){
      gameState = "preparephase";
    }
  }
  else if (gameState === "preparephase"){
    if (mouseX >= 150 * buttonScale + screenDistanceFromX && mouseX <= 320  * buttonScale + screenDistanceFromX && mouseY >= 610 * buttonScale && mouseY <= 683 * buttonScale){
      makePlayer();
      gameState = "gamestart";
    }
  }
  else if (gameState === "gamestart"){

  }
}

