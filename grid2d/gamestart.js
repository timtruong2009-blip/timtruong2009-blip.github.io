
function gameStart(){
  generateSurrounding();
  spawnMonster();
  loadingCharacter();
  characterMoving();
  
}


class Player{
  constructor(classes, x, y){
    this.who = classes;
    this.x = x * GRIDSIZE;
    this.y = y * GRIDSIZE;
    this.health = 100;
    this.usingMove = false;
  }
}


class SchoolGirl extends Player{
  constructor(classes, x, y ){
    super(classes,x, y);
    this.currentAction = schoolgirlIdle;
    this.speed = 10;
  }  

}


function generateSurrounding() {
  let gridX = floor(you.x / GRIDSIZE);
  let gridY = floor(you.y / GRIDSIZE);

  let whereInGridx = you.x % GRIDSIZE;
  let whereInGridy = you.y % GRIDSIZE;

  let gridOnScreenH = floor(windowHeight / GRIDSIZE);
  let gridOnScreenW = floor(windowWidth / GRIDSIZE);

  let smallestX = gridX - gridOnScreenW ;
  let smallestY = gridY - gridOnScreenH ;

  let biggestX = gridX + gridOnScreenW;
  let biggestY = gridY + gridOnScreenH

  for (let y = smallestY; y < gridY + gridOnScreenH; y ++){
    for (let x = smallestX; x < gridX + gridOnScreenW; x ++){
      if (x < 0 || x > MAPSIZE || y < 0 || y > MAPSIZE){
        fill(MAPCOLOR);
      }

      else if (map[y][x] === 1){
        fill("black");
      }
      else{
        fill("white");
      }
      square((x - smallestX) * GRIDSIZE - whereInGridx , (y - smallestY) * GRIDSIZE - whereInGridy, GRIDSIZE);
    }
  }

  drawMonster(smallestX, smallestY, biggestX, biggestY);

}


function makePlayer(){
  you = new SchoolGirl("schoolgirl", round(map.length/2), round(map.length/2));
}


function loadingCharacter(){
  let x = windowWidth/2;
  push();
  if (flip === true){
    scale(-1,1);
    x = -x;
  }

  imageMode(CENTER);
  displaySheetStarting(you.currentAction, schoolgirlPixel.w, 6, x, windowHeight/2, buttonScale * 1.2);

  pop();
}


function characterMoving(){

  let prevxy = structuredClone({x: you.x, y: you.y});
  if (keyIsDown(87)){
    you.y -= you.speed;
  }
  if (keyIsDown(65)){
    you.x -= you.speed;
    flip = true;
  }
  if (keyIsDown(83)){
    you.y += you.speed;
  }
  if (keyIsDown(68)){
    you.x += you.speed;
    flip = false;
  }
  
  if ((you.y !== prevxy.y || you.x !== prevxy.x) && ! you.usingMove){
    you.currentAction = schoolgirlRun;
  }
  else if (you.usingMove){
    SchoolgirlMoves();
  }
  else{
    you.currentAction = schoolgirlIdle;
  }
}




function spawnMonster(){
  if (millistime + monsterTimeSpawn < millis()){
    let newMob = {x:floor(random(you.x - MONSTERSPAWNRANGE * GRIDSIZE, you.x + MONSTERSPAWNRANGE * GRIDSIZE)), y:floor(random(you.y - MONSTERSPAWNRANGE * GRIDSIZE, you.y + MONSTERSPAWNRANGE * GRIDSIZE))};
    allMonster.push(newMob);
    millistime = millis();
  }
}

function drawMonster(smallestX, smallestY, biggestX, biggestY){
  for (let zomb of allMonster){
    if (zomb.x / GRIDSIZE  > smallestX && zomb.y / GRIDSIZE > smallestY && zomb.x /GRIDSIZE < biggestX && zomb.y / GRIDSIZE < biggestY){

      push();
      
      imageMode(CENTER);
      translate(windowWidth / 2, windowHeight / 2);
      image(zombies, zomb.x - you.x, zomb.y - you.y, GRIDSIZE *2,GRIDSIZE *2);

      pop();
    }
  }
}

function keyPressed(){
  if (key === "e"){
    you.usingMove = true;
    
  }
}


function SchoolgirlMoves(){
  you.currentAction = schoolgirlAttack;
}


