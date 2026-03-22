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


// use this if randomizing
const WORLDSIZE = 4000;
const GRIDSIZE = 20;
let theWorld = [];

let vagabondStarterPack;


function preload(){
  vagabondStarterPack = loadImage("Characters/vagabond/vagabond-idle.gif");
}

function setup() {
  makeWorld();
  console.log(theWorld);
  noStroke();
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  // for (let y = 0; y < theWorld.length; y ++){
  //   for (let x = 0; x < theWorld[y].length; x ++){
  //     if (theWorld[y][x] === 1){
  //       fill("black");
  //     }
  //     else{
  //       fill("white");
  //     }
  //     square(x * GRIDSIZE,y* GRIDSIZE, GRIDSIZE);
  //   }
  // }
}


function draw() {
  image(vagabondStarterPack,0,0);
}

function makeWorld(){
  for (let y = 0; y <= WORLDSIZE; y ++){
    let row_x = [];
    for (let x = 0; x <= WORLDSIZE; x ++){
      if (y === 1 || y === WORLDSIZE -1){
        row_x.push(1);
      }
      else{
        row_x.push(0);
      }
    }
    theWorld.push(row_x);
  }
}




