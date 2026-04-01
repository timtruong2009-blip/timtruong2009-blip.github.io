function gameStart(){

  spawnMonster();
  generateSurrounding();
  loadingCharacter();
  characterMoving();
  
}


class Player{
  constructor(classes, x, y){
    this.who = classes;
    this.x = x * GRIDSIZE;
    this.y = y * GRIDSIZE;
    this.health = 100;
  }
}

class SchoolGirl extends Player{
  constructor(classes, x, y ){
    super(classes,x, y);
    this.currentAction = schoolgirlIdle;
  }  

}

function generateSurrounding() {
  let gridX = floor(you.x / GRIDSIZE);
  let gridY = floor(you.y / GRIDSIZE);

  let whereInGridx = you.x % GRIDSIZE;
  let whereInGridy = you.y % GRIDSIZE;

  let gridOnScreenH = floor(windowHeight / GRIDSIZE);
  let gridOnScreenW = floor(windowWidth / GRIDSIZE);

  let smallestX = gridX - gridOnScreenW;
  let smallestY = gridY - gridOnScreenH;

  for (let y = gridY - gridOnScreenH; y < gridY + gridOnScreenH; y ++){
    for (let x = gridX - gridOnScreenW; x < gridX + gridOnScreenW; x ++){
      if (map[y][x] === 1){
        fill("black");
      }
      else{
        fill("white");
      }
      square((x - smallestX) * GRIDSIZE - whereInGridx , (y - smallestY) * GRIDSIZE - whereInGridy, GRIDSIZE);
    }
  }
}
function makePlayer(){
  let human = new Player("schoolgirl",round(map.length/2), round(map.length/2));
  you = new SchoolGirl(human.who, round(map.length/2), round(map.length/2));
}

function loadingCharacter(){
  let x = windowWidth/2;
  push();
  if (flip === true){
    scale(-1,1);
    x = -x;
  }

  imageMode(CENTER);
  displaySheetStarting(you.currentAction, schoolgirlPixel.w, 6, x, windowHeight/2, buttonScale);

  pop();
}

function characterMoving(){
  if (keyIsDown(87)){
    you.y -= 1;
  }
  if (keyIsDown(65)){
    you.x -= 1;
    flip = true;
  }
  if (keyIsDown(83)){
    you.y += 1;
  }
  if (keyIsDown(68)){
    you.x += 1;
    flip = false;
  }
  if (keyIsPressed){
    you.currentAction = schoolgirlRun;
  }
  else{
    you.currentAction = schoolgirlIdle;
  }
}

class Monster{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}



function spawnMonster(){
  if (millistime + monsterTimeSpawn < millis()){
    
    millistime = millis();
  }
}

