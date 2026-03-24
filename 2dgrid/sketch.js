// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
//
// Credit: 
// - Vagabond character: pixramen on Itch.io
// - Warrior character: Fixels on Itch.io
// - School girl character: Free Game Assets on Itch.io
// - Mage character: LuizMelo on Itch.io
// - Background: 	aamatniekss on Itch.io


// use this if randomizing
const WORLDSIZE = 400;
const GRIDSIZE = 32;

let groundImage;

let theWorld = [];
let gameState = "choosing class";




let vagabondIdle;
let vagabondAttack;
let vagabondDash;
let vagabondRun;
const vagabondPixel = {w: 128 , h: 128};
let vagabondmulti = 3.5;

let warriorIdle;
let warriorAttack;
let warriorRun;
let warriorBlock;
const warriorPixel = {w: 126 , h: 71};
let warriormulti = 3.5;

let mageIdle;
let mageAttack1;
let mageAttack2;
let mageRun;
const magePixel = {w: 231 , h: 190};
let magebondmulti = 2.3;

let schoolgirlIdle;
let schoolgirlAttack;
let schoolgirlRun;
let schoolgirlPose;
const schoolgirlPixel = {w: 128 , h: 128};
let schoolgirlmulti = 2;





let clickpos;
let characterchosen;

function preload(){
  groundImage = loadImage("Characters/TopDownFantasy-Forest/Tiles/Tileset.png");

  vagabondIdle = loadImage("Characters/vagabond/vagabond-idle.gif");
  warriorIdle = loadImage("Characters/warrior/Warrior-idle.png");
  mageIdle = loadImage("Characters/Wizard Pack/Idle.png");
  schoolgirlIdle = loadImage("Characters/School girl/Idle.png");
}

function setup() {
  imageMode(CENTER);
  makeWorld();
  console.log(theWorld);

  createCanvas(windowWidth, windowHeight);
  noSmooth();
  
}


function draw() {
  background(255);
  if (gameState === "choosing class"){
    MakingClassButton();
    for (let i = 0; i < 4; i++){
      print("ya");
      line(width/4 *i, 0, width/4 *i, height);
    }
  }
  else if (gameState === "prepare"){
    
  }
  
}

function makeWorld(){
  for (let y = 0; y <= WORLDSIZE; y ++){
    let row_x = [];
    for (let x = 0; x <= WORLDSIZE; x ++){                  
      row_x.push(Math.round(random(1,3))) ;                
    }                  
    theWorld.push(row_x);                  
  }                  
}                  
                  
class player{                  
  constructor(posx, posy, classChoose, ){                  
    this.x = posx;                  
    this.y = posy;                  
                  
  }                  
}                  
                  
class mage extends player(){                  
                  
}

function mousePressed(){
  clickpos = {x:mouseX, y: mouseY}
  if (gameState === "choosing class"){
    let placedgotPressed = MakingClassButtonPressed();
    if (MakingClassButtonPressed() !== false){
      gameState = "prepare";
    }
  }
  else if (gameState === "prepare"){

  }
}

// hard coded because im in a hurry and all the image have different pixel really weird
function MakingClassButton(){
  biggerwhenHover();

  displaySheetStarting(warriorIdle,warriorPixel,numofframe = 5, wherex = width/8 + 150 , wherey = height/4 - 20, warriormulti);

  // displaySheetStarting(schoolgirlIdle, schoolgirlPixel,numofframe = 6, wherex = width/8 *3 ,wherey = height/2 - 60, schoolgirlmulti);

  // displaySheetStarting(mageIdle, magePixel, numofframe = 5, wherex = width/8 *5, wherey = 0 + height/2 , magebondmulti);

  // displaySheetStarting(vagabondIdle, vagabondPixel, numofframe = vagabondIdle.numFrames(), wherex = width/8 *7 ,wherey = height/2 -150, vagabondmulti);
}

function MakingClassButtonPressed(){
  if (clickpos.x > 0 && clickpos.x < width /4){
    return "warrior";
  }
  else if (clickpos.x > width /4 && clickpos.x < width /4 *2){
    return "schoolgirl";
  }
  else if (clickpos.x > width /4 *2 && clickpos.x < width /4 * 3){
    return "mage";
  }
  else if (clickpos.x > width /4 * 3 && clickpos.x < width){
    return "vagabond";
  }
  else{
    return false;
  }
}

function gettingScaleFactor(targetW, targetH, size){
  let sw =  width/4 / targetW ;
  let sh =   height/4 / targetH;
  
  return size * Math.min(sw, sh);
}

function displaySheetStarting(classes,classespixel, numofframe, wherex, wherey, multiplier){
  let whichframe = floor(frameCount / 10) % numofframe;
  if (classes === vagabondIdle){
    vagabondIdle.setFrame(whichframe);
    image(classes, wherex, wherey,
      classespixel.w * multiplier,
      classespixel.h * multiplier);
  }
  else{
    image(classes, wherex, wherey, 
      gettingScaleFactor(classespixel.w, classespixel.h, classespixel.w) *multiplier, 
      gettingScaleFactor(classespixel.w, classespixel.h, classespixel.h) *multiplier,
      classespixel.w * whichframe , 0 ,
      classespixel.w, classespixel.h);
  }
}

function biggerwhenHover(){
  if (mouseX > 0 && mouseX < width /4){
    warriormulti = 4;
    vagabondmulti = 3.5;
    schoolgirlmulti = 2;
    magebondmulti = 2.3;
  }
  else if (mouseX > width /4 && mouseX < width /4 *2){
    schoolgirlmulti = 2.5;
    magebondmulti = 2.3;
    warriormulti = 3.5;
    vagabondmulti = 3.5;
  }
  else if (mouseX > width /4 *2 && mouseX < width /4 * 3){
    magebondmulti = 3;
    warriormulti = 3.5;
    vagabondmulti = 3.5;
    schoolgirlmulti = 2;
  }
  else if (mouseX > width /4 * 3 && mouseX < width){
    vagabondmulti = 4;
    schoolgirlmulti = 2;
    magebondmulti = 2.3;
    warriormulti = 3.5;
  }

}

