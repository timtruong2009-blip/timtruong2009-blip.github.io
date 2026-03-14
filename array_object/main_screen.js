function makeMainScreen(){
    textAlign(CENTER);
    fill("black");
    textSize(square_size);
    textFont("Verdana")
    text("CHESS", board_height/2,board_height/2)

    textSize(square_size /3)
    text("Press any button to get started", board_height/2,board_height/4 )
    if (keyIsPressed){
        gameState = "finding opponent";
    }
}

