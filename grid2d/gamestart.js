
function gameStart(){
  checkingWhatFrameAndSwitchBack();

  spawnMonster();

  generateSurrounding();

  spawningCrate();

  healthBar();

  movingMonster();

  schoolgirlAllAnimation();
  
  characterMoving();

  drawingAnimation();

  isPlayerAttacked();

  gui();

  
}

// generate only the square grid displaying on your screen
function generateSurrounding() {
  let gridX = floor(you.x / GRIDSIZE);
  let gridY = floor(you.y / GRIDSIZE);

  let whereInGridx = you.x - gridX * GRIDSIZE;
  let whereInGridy = you.y - gridY * GRIDSIZE;

  let gridOnScreenH = Math.ceil(windowHeight / GRIDSIZE) ;
  let gridOnScreenW = Math.ceil(windowWidth / GRIDSIZE) ;

  let smallestX = gridX - Math.floor(gridOnScreenW/2);
  let smallestY = gridY - Math.floor(gridOnScreenH/2);

  let biggestX = gridX + Math.floor(gridOnScreenW/2) +1;
  let biggestY = gridY + Math.floor(gridOnScreenH/2) +2;

  for (let y = smallestY; y < biggestY; y ++){
    for (let x = smallestX; x < biggestX; x ++){
      let cordX = (x - smallestX) * GRIDSIZE - whereInGridx;
      let cordY = (y - smallestY) * GRIDSIZE - whereInGridy;
      
      if (x < 0 || x > MAPSIZE || y < 0 || y > MAPSIZE){
        fill(MAPCOLOR);
        square(cordX, cordY, GRIDSIZE);
      }
      else{
        image(grass, cordX,cordY , GRIDSIZE, GRIDSIZE);
        if (map[y][x] === 0){
          // grass 
        }
        else if (map[y][x] === 1){
          checkingCrateTouchy(gridX, gridY);
          image(bomb, cordX, cordY, GRIDSIZE, GRIDSIZE);
        }
        else if (map[y][x] === 2){
          checkingCrateTouchy(gridX, gridY);
          fill("black");
          image(medic, cordX, cordY, GRIDSIZE, GRIDSIZE);
        }
        else if (map[y][x] === 3){
          checkingCrateTouchy(gridX, gridY);
          fill("blue");
          square(cordX, cordY, GRIDSIZE);
        }
      }
    }
  }
  drawMonster(smallestX, smallestY, biggestX, biggestY);

}

// -------------------------------------------------The player--------------------------------------------------
// default template for all player
class Player{
  constructor(classes, x, y){
    this.who = classes;
    this.x = x * GRIDSIZE;
    this.y = y * GRIDSIZE;
    this.health = 100;
    this.usingMove = false;
    this.attacking = false;

    this.frameOn = 0;
    this.alive = true;
    
  }
}

// school girl class
class SchoolGirl extends Player{
  constructor(classes, x, y ){
    super(classes,x, y);
    this.currentAction = schoolgirlIdle;
    this.speed = 2;

    this.hitboxRange = 50;
    this.movesRange = 350;
    
    this.cooldown = 2000;
    this.movesCooldown = 10000;
    this.maxhealth = 100;
  }  
}

// making a new school girl
function makePlayer(){
  you = new SchoolGirl("schoolgirl", round(map.length/2), round(map.length/2));
}

// displaying the character in the middle of the screen
function loadingCharacter(numofframe){
  let x = windowWidth/2;
  push();
  if (flip){
    scale(-1,1);
    x = -x;
  }
  imageMode(CENTER);
  displaySheetStarting(you.currentAction, schoolgirlPixel.w, numofframe, x, windowHeight/2, buttonScale, you.frameOn);
  pop();
}

// moving character if pressed
function characterMoving(){
  let prevxy = structuredClone({x: you.x, y: you.y});
  if (!you.usingMove){
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

    if ((you.y !== prevxy.y || you.x !== prevxy.x) && ! you.attacking){
      you.currentAction = schoolgirlRun;
    }
    else if (you.attacking){
      you.currentAction = schoolgirlAttack;
    }
    else{
      you.currentAction = schoolgirlIdle;
    }
  }
}

// deciding which animation is school girl on rightnow
function schoolgirlAllAnimation(){
  if (you.currentAction === schoolgirlIdle){
    loadingCharacter(6);
  }
  else if (you.currentAction === schoolgirlRun){
    loadingCharacter(12);
  }
  else if (you.currentAction === schoolgirlAttack){
    loadingCharacter(6);
  }
  else if (you.currentAction === schoolgirlPose){
    loadingCharacter(5);

    push();
    translate(windowWidth/2, windowHeight /2);
    imageMode(CENTER);
    image(shockwave,0, 0 , windowHeight, windowHeight);
    pop();
  }
}

// normal attack and hitbox
function normalAttack(){
  let whereHitBox = -1;
  if (flip){
    whereHitBox = structuredClone(-you.hitboxRange +1);;
  }
  for (let i = allMonster.length -1; i >= 0; i--){
    let zomb = allMonster[i];
    if (zomb.x  > you.x + whereHitBox && zomb.x < you.x + you.hitboxRange + whereHitBox && you.y - you.hitboxRange * 1.5 < zomb.y && you.y + you.hitboxRange /1.5 > zomb.y){
      allMonster.splice(i, 1);
    }
  }
}

// special attack and its hit box
function specialAttack(){
  for (let i = allMonster.length -1; i >= 0; i--){
    let zomb = allMonster[i];
    if (zomb.x  > you.x - you.movesRange && zomb.x < you.x + you.movesRange && zomb.y  > you.y - you.movesRange/1.5 && zomb.y < you.y + you.movesRange  ){
      allMonster.splice(i, 1);
    }
  }
}

// if zombie near player x and y then get bite
function isPlayerAttacked(){
  for (let zomb of allMonster){
    if (zomb.x > you.x - playerHitBox && zomb.x < you.x + playerHitBox && zomb.y > you.y - playerHitBox*3 && zomb.y < you.y + playerHitBox ){
      if (lastDamageTick + DPSAllow < millis()){
        you.health -= 1;
        lastDamageTick = millis();
      }
    }
  }
}

// key pressed for special moves
function keyPressed(){
  if (key === "e" && !you.attacking && lastSpecialMoves + you.movesCooldown < millis()){
    lastSpecialMoves = millis();
    specialAttack();
    you.currentAction = schoolgirlPose;
    you.usingMove = true;
    you.frameOn = frameCount;
  }
  if (key === "r" && ! you.alive){
    allMonster = [];
    map = [];
    monsterSpeed = 1;
    gameState = "mainscreen"
  }
}

// -------------------------------------------------The Monster--------------------------------------------------
// spawning monster every monsterTimeSqpawn
function spawnMonster(){
  if (millistime + monsterTimeSpawn < millis()){
    let newMob = {x:floor(random(you.x - MONSTERSPAWNRANGE * GRIDSIZE, you.x + MONSTERSPAWNRANGE * GRIDSIZE)), y:floor(random(you.y - MONSTERSPAWNRANGE * GRIDSIZE, you.y + MONSTERSPAWNRANGE * GRIDSIZE)), speed: random(monsterSpeed, monsterSpeed +2)};
    allMonster.push(newMob);
    millistime = millis();
  }
}

// drawing monster in relative to the player position
function drawMonster(smallestX, smallestY, biggestX, biggestY){
  allMonsterOnScreen = [];
  for (let zomb of allMonster){
    if (zomb.x / GRIDSIZE  > smallestX && zomb.y / GRIDSIZE > smallestY && zomb.x /GRIDSIZE < biggestX && zomb.y / GRIDSIZE < biggestY){
      allMonsterOnScreen.push(zomb);
      push();
      imageMode(CENTER);
      translate(windowWidth / 2, windowHeight / 2);
      translate(zomb.x - you.x , zomb.y - you.y);
      if (zomb.x > you.x){
        scale(-1,1);
      }
      image(zombies, 0 , 0, windowHeight/10,windowHeight/10);

      pop();
    }
  }
}

// movining the momnster close to the player using math a2 + b2 = c2
function movingMonster() {
  for (let zomb of allMonster) {
    let distancex = you.x - zomb.x;
    let distancey = you.y - zomb.y;
    let totalDistance = dist(you.x, you.y, zomb.x, zomb.y);

    if (totalDistance > 0) {
      zomb.x += distancex / totalDistance * zomb.speed;
      zomb.y += distancey / totalDistance * zomb.speed;
    }
  }
  monsterSpeed += 0.001;
}

// -------------------------------------------------Others--------------------------------------------------
// after 1 cycle then the attack animation stop
function checkingWhatFrameAndSwitchBack(){
  if (you.attacking){
    if (frameCount - you.frameOn >= 60) { 
      you.attacking = false;
      you.currentAction = schoolgirlIdle;
    }
  }
  else if (you.usingMove){
    if (frameCount - you.frameOn >= 50) { 
      you.usingMove = false;
      you.currentAction = schoolgirlIdle;
    }
  }
}

// spawning crate every crateSpawnSpeed
function spawningCrate(){
  if (crateMillis + crateSpawnSpeed < millis()){
    let randomStuff = round(random(0,10));
    let randomPlace = [round(random(MAPSIZE -1)), round(random(MAPSIZE -1))];

    if (randomStuff >= 2){
      map[randomPlace[0]][randomPlace[1]] = 1;
    }
    else if (randomStuff < 2){
      map[randomPlace[0]][randomPlace[1]] = 2;
    }
    crateMillis = millis();
  }
}

// if crate is at player grid or above it one block then activate
function checkingCrateTouchy(gridX, gridY){
  // explosion crate - 20 hp
  if (map[gridY][gridX] === 1 || map[gridY -1][gridX] === 1){
    explosionStart = frameCount;
    you.health -= 20;
    map[gridY][gridX] = 0;
    map[gridY -1][gridX] = 0;
  }
  // healing crate + 10 hp
  if (map[gridY][gridX] === 2 || map[gridY -1][gridX] === 2){
    if (you.health + 10 <= you.maxhealth){
      you.health += 10;
    }
    else{
      you.health = structuredClone(you.maxhealth);
    }
    
    map[gridY][gridX] = 0;
    map[gridY -1][gridX] = 0;
  }
}

// drawing explosion animation everytime the crate explode
function drawingAnimation(){
  if (explosionStart !== false && frameCount - explosionStart < 10){
    push();
    imageMode(CENTER);
    translate(windowWidth/2, windowHeight /2);
    image(explosion, 0 ,0, 1000, 1000);

    pop();
  }
  else if (explosionStart !== false && ! frameCount - explosionStart < 10){
    explosionStart = false;
  }
}

// displaying health bar and stop player when health bar is 0 or less
function healthBar(){
  push();
  fill("white");
  rect(0,0, windowWidth / 200 * you.maxhealth, windowHeight /40);
  if (you.health > 0){
    fill("red");
    rect(windowWidth / 800, windowHeight / 320, windowWidth / 202 * you.health + windowWidth / 800, windowHeight /45 - windowHeight / 160 );
  }
  
  else{
    you.speed = 0;
    you.currentAction = schoolgirlIdle;
    textSize(100);
    textAlign(CENTER);
    you.alive = false;
    text("YOU DIE, R to restart", windowWidth/2,windowHeight /2);
  }
  pop();
}

function gui(){
  let circleSize = windowHeight / 10;

  push();

  fill("black");
  circle(circleSize, windowHeight - circleSize, circleSize);
  fill("white");
  circle(circleSize, windowHeight - circleSize, circleSize * 0.9);

  textAlign(CENTER);
  textSize(circleSize /3);
  fill("black");
  if (lastSpecialMoves + you.movesCooldown < millis()){
    text("ready",circleSize, windowHeight - circleSize/1.15 );

  }
  else{
    text(Math.ceil((lastSpecialMoves + you.movesCooldown - millis()) / 1000),circleSize, windowHeight - circleSize/1.15 );
  }


  pop();
}

