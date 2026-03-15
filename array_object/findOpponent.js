function waitRoom(){
    textAlign(CENTER);
    fill("black");
    textSize(square_size);
    textFont("Verdana")
    text("Waiting for player...", board_height/2,board_height/2)
    
    if (!dataforParty || typeof dataforParty.activePlayer === 'undefined') {
        return; 
    }
    print(dataforParty);
    print(dataforParty.activePlayer);
    if (! connect){
        dataforParty.activePlayer += 1;
        
        connect = true;
    }
    if (dataforParty.activePlayer >= 2){
        gameState = "chess";
    }
}