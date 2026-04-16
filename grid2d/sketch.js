// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// - I make it so that only the grid surrounding the player is display to avoid lag, the real map is very big

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
let shockwave;

let zombies;
let explosion;
let survivalStartScreen;
let survivalButton;
let grass;
let medic;
let bomb;



// mappy
let map = [];
let currentlySelected = 0;

// map measurement stuff
const MAPSIZE = 400;
const GRIDSIZE = 32;
const MAPCOLOR = "#9e7c77";

// crate variable
const crateSpawnSpeed = 10;
let crateMillis = 0;

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
let playerHitBox = 20;

// some cool variable
let flip = false;
let millistime = 0;
let explosionStart = false;
let lastDamageTick = 0;
let DPSAllow = 200;

let dietime = 0;

// monster and player
let you;
let allMonster = [];
let allMonsterOnScreen = [];
let monsterTimeSpawn = 1000;
const MONSTERSPAWNRANGE = 100;
let monsterSpeed = 1;


let lastSpecialMoves = 0;


// preloading all images
function preload(){
  survivalStartScreen = loadImage("otherImage/survivorio.jpg");
  survivalButton = loadImage("otherImage/survivoributton.jpg");
  zombies =  loadImage("otherImage/zombies.png");
  explosion = loadImage("otherImage/explosion.png");
  grass = loadImage("otherImage/grass.png");
  medic = loadImage("otherImage/medic.png");
  bomb = loadImage("otherImage/bomb.png");

  schoolgirlIdle = loadImage("School girl/Idle.png");
  schoolgirlAttack = loadImage("School girl/Attack.png");
  schoolgirlRun = loadImage("School girl/Walk.png");
  schoolgirlPose = loadImage("School girl/Dialogue.png");
  shockwave = loadImage("School girl/shockwave.png");
}

// setting up the thinggy
function setup() {
  noStroke();
  buttonScale = calculateScale(832);
  createCanvas(windowWidth, windowHeight);
  noSmooth();
}

// drawing the game thingy
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

// creating a new blank world
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

// displaying the character and their animation
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

// resizig the window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// when mouse press activate
function mousePressed(){
  if (gameState === "mainscreen"){
    // main screen start butto
    if (mouseX >= 150 * buttonScale + screenDistanceFromX && mouseX <= 320  * buttonScale + screenDistanceFromX && mouseY >= 610 * buttonScale && mouseY <= 683 * buttonScale){
      gameState = "preparephase";
    }
  }
  else if (gameState === "preparephase"){
    // prepare phase start button
    if (mouseX >= 150 * buttonScale + screenDistanceFromX && mouseX <= 320  * buttonScale + screenDistanceFromX && mouseY >= 610 * buttonScale && mouseY <= 683 * buttonScale){
      map = makeWorld();
      makePlayer();
      gameState = "gamestart";
    }
  }
  else if (gameState === "gamestart"){
    // if press on screen then normal attack
    if (!you.usingMove){
      you.currentAction = schoolgirlAttack;
      you.attacking = true;
      you.frameOn = frameCount;
    }
  }
}

