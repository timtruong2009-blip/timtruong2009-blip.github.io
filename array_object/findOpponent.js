function waitRoom(){
    textAlign(CENTER);
    fill("black");
    textSize(square_size);
    textFont("Verdana")
    text("Waiting for player...", board_height/2,board_height/2)
    
    if (!code){
        dataforParty = partyLoadShared("chess arena", {
            white_all_pieces: [],
            black_all_pieces: [],
            activePlayer: 0,
            player1: "",
            player2: "",
            turn: false,
            gameOn: true,
            gameWhereItIs: "chess",
            });
        code = true;
    }
    if (!dataforParty || typeof dataforParty.activePlayer === 'undefined') {
        return; 
    }
    if (! connect){
        dataforParty.activePlayer += 1;
        connect = true;
    }
    if (dataforParty.activePlayer >= 2){
        gameState = "chess";
    }
}