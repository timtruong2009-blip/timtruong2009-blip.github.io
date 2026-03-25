// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const MAPSIZE = 400;
const GRIDSIZE = 20;

let map = [];
let currentlySelected = 0;

let survivalStartScreen;
let survivalButton;
const SCREENSCALE = 0.56302521008;
const MAPCOLOR = (158, 124, 119);

let schoolgirlIdle;
let schoolgirlAttack;
let schoolgirlRun;
let schoolgirlPose;
const schoolgirlPixel = {w: 128 , h: 128};
let schoolgirlmulti = 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  map = makeWorld();

  survivalStartScreen = loadImage("School girl/survivorio.jpg");
  survivalButton = loadImage("School girl/survivoributton.jpg");

  schoolgirlIdle = loadImage("School girl/Idle.png");
  schoolgirlAttack = loadImage("School girl/Attack.png");
  schoolgirlRun = loadImage("School girl/Walk.png");
  schoolgirlPose = loadImage("School girl/Idle.png");


}

function draw() {

  displaySheetStarting(schoolgirlIdle, schoolgirlPixel, 6, 0,0, 6);
}

function widthOrHeight(){

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

function gettingScaleFactor(targetW, targetH, size){
  let sw =  width/4 / targetW ;
  let sh =   height/4 / targetH;
  
  return size * Math.min(sw, sh);
}

function displaySheetStarting(classes,classespixel, numofframe, wherex, wherey, multiplier){
  let whichframe = floor(frameCount / 10) % numofframe;
  image(classes, wherex, wherey, 
    classespixel.w *multiplier, 
    classespixel.h *multiplier,
    classespixel.w * whichframe , 0 ,
    classespixel.w, classespixel.h);
}

