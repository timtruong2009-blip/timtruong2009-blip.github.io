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

// image and stuff
let schoolgirlIdle;
let schoolgirlAttack;
let schoolgirlRun;
let schoolgirlPose;

let zombies;
let explosion
let survivalStartScreen;
let survivalButton;





let map = [];
let currentlySelected = 0;

// map measurement stuff
const MAPSIZE = 400;
const GRIDSIZE = 32;
const MAPCOLOR = "#9e7c77";

// screen measurement stuff
let screenWidth;
let screenDistanceFromX;
const SCREENSCALE = 0.56302521008;

// button
let gameState = "mainscreen";
let buttonMultiply = 1;
let buttonScale;

// school girl measurement
const schoolgirlPixel = {w: 128 , h: 128};
let schoolgirlmulti = 2;

// some cool variable
let flip = false;
let millistime = 0;

// monster and player
let you;
let allMonster = [];
let monsterTimeSpawn = 1000;
const MONSTERSPAWNRANGE = 10;


function preload(){
  survivalStartScreen = loadImage("otherImage/survivorio.jpg");
  survivalButton = loadImage("otherImage/survivoributton.jpg");
  zombies =  loadImage("otherImage/zombies.png");
  explosion = loadImage("otherImage/explosion.png");

  schoolgirlIdle = loadImage("School girl/Idle.png");
  schoolgirlAttack = loadImage("School girl/Attack.png");
  schoolgirlRun = loadImage("School girl/Walk.png");
  schoolgirlPose = loadImage("School girl/Dialogue.png");
}


function setup() {
  noStroke();
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
      if (random(100) > 50){
        row_x.push(0) ;  
      }
      else{
        row_x.push(1);
      }
                    
    }                  
    world.push(row_x);                  
  }
  return world;               
}


function displaySheetStarting(classes,classespixel, numofframe, wherex, wherey, multiplier, startFrame){
  let whatFrameNow = frameCount - startFrame;
  let whichframe = floor(whatFrameNow / 10) % numofframe;
  if (gameState === "gamestart"){
    if (whichframe >= 4 && you.attacking){
      normalAttack();
    }
  }
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
    if (!you.usingMove){
      you.currentAction = schoolgirlAttack;
      you.attacking = true;
      you.frameOn = frameCount;
    }
      
  }
}

