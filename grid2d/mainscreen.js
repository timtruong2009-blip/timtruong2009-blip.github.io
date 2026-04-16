function makeMainScreen(){
  // displaying start screen
  calculateScreenWidth();
  image(survivalStartScreen, screenDistanceFromX, 0, screenWidth , windowHeight);
  
  // displaying button
  push();
  imageMode(CENTER);
  enlargeButton(buttonScale);
  image(survivalButton, windowWidth/2, 644 * buttonScale , 170 * buttonScale * buttonMultiply, 70 * buttonScale * buttonMultiply) ;
  pop();
  
}

// calculating how big the button needs to be
function calculateScreenWidth(){
  screenWidth = windowHeight * SCREENSCALE;
  screenDistanceFromX = windowWidth /2 - screenWidth /2;
}

// calculating how much smaller it needs to be
function calculateScale(scale){
  return windowHeight / scale;
}

// if hover the make button bigger
function enlargeButton(buttonScale){
  if (mouseX >= 150 * buttonScale + screenDistanceFromX && mouseX <= 320  * buttonScale + screenDistanceFromX && mouseY >= 610 * buttonScale && mouseY <= 683 * buttonScale){
    buttonMultiply = 1.1;
  }
  else{
    buttonMultiply = 1;
  }
}