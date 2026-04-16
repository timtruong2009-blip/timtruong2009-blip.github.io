
function preparing(){

  push();

  imageMode(CENTER);
  // displaying the school girl idle
  textFont("Retro Pixel");
  textAlign(CENTER);
  textSize(height / 30);
  text("School Girl - A Student at School", width/2 , height/4);
  displaySheetStarting(schoolgirlIdle, schoolgirlPixel.w, 6, width/2,height /1.8, buttonScale * 4, 0);

  // displaying the button
  enlargeButton(buttonScale);
  image(survivalButton, windowWidth/2, 644 * buttonScale , 170 * buttonScale * buttonMultiply, 70 * buttonScale * buttonMultiply) ;
  pop();

}