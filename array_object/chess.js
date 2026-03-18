// MAKING ALL THE PIECES AND STARTING POSITION
function allpiecePosition(){
// let pawn = (img = pawnimg, x = 0, y = width - width/8);
  if (! dataforParty.createBoard ){
    for (let amount = 7; amount >= 0; amount --){
      dataforParty.white_all_pieces.push({ x : amount, y :  6, name: "pawn",pawn_go_pace : 2});
    }
    
    // let king = (img = kingimg, x = 0, y = width - width/8);
    dataforParty.white_all_pieces.push({ x : 4, y : 7 , name: "king", did_move: false});
  
    // let queen = (img = queenimg, x = 0, y = width - width/8);
    dataforParty.white_all_pieces.push({ x : 3, y : 7, name: "queen"});
  
    // let knight = (img = knightimg, x = 0, y = width - width/8);
    for (let amount = 1; amount >= 0; amount --){
      dataforParty.white_all_pieces.push({ x : amount*5 + 1, y : 7 , name: "knight"});
    }
  
    // let bishop = ;
    for (let amount = 1; amount >= 0; amount --){
      dataforParty.white_all_pieces.push({ x : amount * 3 + 2, y : 7, name: "bishop"});
    }
  
    // let rook = ;
    for (let amount = 1; amount >= 0; amount --){
      dataforParty.white_all_pieces.push({ x : amount * 7 , y :7, name: "rook", did_move: false});
    }
  
  
    for (let amount = 7; amount >= 0; amount --){
      dataforParty.black_all_pieces.push({ x : amount, y :  1, name: "pawn",pawn_go_pace : -2});
    }
    
    // let king = (img = kingimg, x = 0, y = width - width/8);
    dataforParty.black_all_pieces.push({ x : 4, y : 0 , name: "king", did_move: false});
  
    // let queen = (img = queenimg, x = 0, y = width - width/8);
    dataforParty.black_all_pieces.push({ x : 3, y : 0, name: "queen"});
  
    // let knight = (img = knightimg, x = 0, y = width - width/8);
    for (let amount = 1; amount >= 0; amount --){
      dataforParty.black_all_pieces.push({ x : amount*5 + 1, y : 0 , name: "knight"});
    }
  
    // let bishop = ;
    for (let amount = 1; amount >= 0; amount --){
      dataforParty.black_all_pieces.push({ x : amount * 3 + 2, y : 0, name: "bishop"});
    }
  
    // let rook = ;
    for (let amount = 1; amount >= 0; amount --){
      dataforParty.black_all_pieces.push({ x : amount * 7 , y :0, name: "rook", did_move: false});
    }
    dataforParty.createBoard = true;
  // -------------------------------------------------- make black piece
  }
  // let pawn = (img = pawnimg, x = 0, y = width - width/8);
  
}
  // DRAWING THE CHESS BOARD
function makeBoard(){
  let whatPieceIsIt;
  if (yourRole === "white"){
    for (let item of dataforParty.white_all_pieces){
      // image(item.img, item.x,item.y,square_size,square_size);
      whatPieceIsIt = whoAreYou(item.name, "white");
      image(whatPieceIsIt, item.x * (board_height / 8) ,item.y * (board_height / 8),square_size,square_size);
    }
        
    for (let item of dataforParty.black_all_pieces){
      // image(item.img, item.x,item.y,square_size,square_size);
      whatPieceIsIt = whoAreYou(item.name, "black");
      image(whatPieceIsIt, item.x * (board_height / 8) , item.y * (board_height / 8),square_size,square_size);
    }
  }
  else if (yourRole === "black"){
    for (let item of dataforParty.white_all_pieces){
      // image(item.img, item.x,item.y,square_size,square_size);
      whatPieceIsIt = whoAreYou(item.name, "white");
      image(whatPieceIsIt, Math.abs(item.x - 7) * (board_height / 8) , board_height - square_size * item.y - square_size,square_size,square_size);
    }
        
    for (let item of dataforParty.black_all_pieces){
      // image(item.img, item.x,item.y,square_size,square_size);
      whatPieceIsIt = whoAreYou(item.name, "black");
      image(whatPieceIsIt, Math.abs(item.x - 7) * (board_height / 8) ,board_height - square_size * item.y - square_size,square_size,square_size);
    }
  }
  else{
    fill("black");
    textSize(20);
    text("A match is happening right now", board_height/2, board_height/2);
  }
  
}

function drawBoard(){
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 === 0) {
          fill(225);
        } 
        else {
          fill(100); 
        }
        
        rect(col * square_size, row * square_size, square_size, square_size);
      }
    }
}
  // Check to see if 
function generateLegalMoves(current_selecting){
  let chess_pathway = [];
  
  if (current_selecting.name === "pawn"){
    
    if (yourRole === "white") {

      let pawn_attacks = [[current_selecting.x + 1, current_selecting.y - 1], [current_selecting.x - 1, current_selecting.y - 1]];
      for (let [x_move, y_move] of pawn_attacks) {
        for (let black of dataforParty.black_all_pieces) {
            if (black.x === x_move && black.y === y_move) {
                append(chess_pathway, { x: x_move, y: y_move });
            }
        }
      }


      let maxSteps = current_selecting.y === 6 ? 2 : 1;

      for (let length = 1; length <= maxSteps; length++) {
        let aiming_x = current_selecting.x;
        let aiming_y = current_selecting.y - length;


        let hit = checkingCollision(aiming_x, aiming_y, current_selecting);

        if (hit !== false || outofBound(aiming_x, aiming_y)) {
            break;
        } 
        else {
          append(chess_pathway, { x: aiming_x, y: aiming_y });
        }
      }
    }
    else if (yourRole === "black"){

      let pawn_weird_attack_thing = [[current_selecting.x +1,current_selecting.y +1],[current_selecting.x -1,current_selecting.y +1]];
      for (let [x_move,y_move] of pawn_weird_attack_thing){
        for (let white of dataforParty.white_all_pieces){
          if (white.x === x_move & white.y === y_move){
            append(chess_pathway, {x:x_move, y:y_move});
          }
        }
      }
      if (current_selecting.y !== 1){
        current_selecting.pawn_go_pace = -1;
      }
      for (let length = -1; length >= current_selecting.pawn_go_pace ; length --){
        aiming_x = current_selecting.x;
        aiming_y = current_selecting.y - length;

        let hm = checkingCollision(aiming_x, aiming_y, current_selecting);
        if (hm !== false && hm.length > 0 || outofBound(aiming_x, aiming_y)) {
            break; 
        } 
        else {
          append(chess_pathway, {x: aiming_x, y: aiming_y});
        }
      }
    }
  }
  
  else if (current_selecting.name === "king"){

    let king_exclusive_chess_path = [];
    for (let [dir_x,dir_y] of king_direction){
      aiming_x = current_selecting.x + dir_x;
      aiming_y = current_selecting.y + dir_y;

      let hm = checkingCollision(aiming_x,aiming_y, current_selecting);
      if (hm){
        for (let item of hm){
          chess_pathway.push(item);
        }
      }

      else if (!hm && !outofBound(aiming_x,aiming_y)){
        append(chess_pathway, {x:aiming_x,y:aiming_y});
      }
    }
    if (current_selecting.did_move === false){
      for (let [dir_x,dir_y] of castle_direction){
        for (let length = 1; length <= 8; length ++){
          aiming_x = current_selecting.x + length * dir_x;
          aiming_y = current_selecting.y;
          if (checkingCollision(aiming_x,aiming_y, current_selecting)){
            break;                
          }
          else{
            append(king_exclusive_chess_path, {x:aiming_x,y:aiming_y});
          }
          
        } 
      }
      if (king_exclusive_chess_path.length === 0){

      }
      else if (king_exclusive_chess_path[king_exclusive_chess_path.length -1].x > 8 || king_exclusive_chess_path[king_exclusive_chess_path.length -1].x < 0){
        king_exclusive_chess_path = [];
      }
      if (king_exclusive_chess_path.length !== 0){
        for (let item of king_exclusive_chess_path){
          append(chess_pathway, {x:item.x, y:item.y});
        }
      }
    }
  }
  else if (current_selecting.name === "queen"){
    for (let item of loopingDirection(queen_direction, current_selecting)){
      chess_pathway.push(item);
    }
    
  }

  else if (current_selecting.name === "knight"){
    for (let [dir_x,dir_y] of knight_direction){
      aiming_x = current_selecting.x + dir_x;
      aiming_y = current_selecting.y + dir_y;

      let hm = checkingCollision(aiming_x,aiming_y, current_selecting);
      if (hm !== false){
        for (let item of hm){
          chess_pathway.push(item);
        }
      }
      
      else if(outofBound(aiming_x,aiming_y)){
        ;
      }
      else{
        append(chess_pathway, {x:aiming_x, y:aiming_y});
      }
      
    }
  }

  else if (current_selecting.name === "bishop"){
    for (let item of loopingDirection(bishop_direction, current_selecting)){
      chess_pathway.push(item);
    }
    
    
  }

  else if (current_selecting.name === "rook"){
    for (let item of loopingDirection(rook_direction, current_selecting)){
      chess_pathway.push(item);
    }
  }
  return chess_pathway;

}
  
// SEE IF WHERE YOU CLICK HAVE A PIECE THERE OR NOT
function selectingPiece(){
  if (yourRole === "white" && ! dataforParty.turn ){
    for (let chess of dataforParty.white_all_pieces){
      if (chess.x === mouse_press_pos.x && chess.y === mouse_press_pos.y){
        current_selected = chess;
        chess_path = generateLegalMoves(current_selected);
        break;
      }
      else{
        current_selected = null;
      }
    }
  }
  else if (yourRole === "black" &&  dataforParty.turn){
    for (let chess of dataforParty.black_all_pieces){
      if (chess.x === mouse_press_pos.x && chess.y === mouse_press_pos.y){
        current_selected = chess;
        chess_path = generateLegalMoves(current_selected);
        break;
      }
      else{
        current_selected = null;
      }
    }
  }
    
}

  // CHECKING THE LOCATION X AND Y TO SEE IF THERE IS ANY OPPOSITE COLOR PIECE THERE
function checkingCollision(x,y, current_selecting){
  let chessthing = [];
  for (let item of dataforParty.black_all_pieces){
    if (item.x === x && item.y === y){
      if (current_selecting.name !== "pawn"){
        if (!dataforParty.turn){
          chessthing.push({x:x, y:y});
        }
        
      }
      return chessthing;
    }
  }
  
  for (let item of dataforParty.white_all_pieces){
    if (item.x === x && item.y === y){
      if (current_selecting.name !== "pawn"){
        if (dataforParty.turn){
          chessthing.push({x:x, y:y});
        }
        
      }
      for (let all of chessthing){
        if (all.x === 5 && all.y === 4){
        }
      }
      
      return chessthing;
    }
  }
  return false;
}
  
// CHECK IF THE POSSIBLE MOVES THAT A PIECE CAN MAKE IS WHERE YOU CLICK IT
function chesspathChecking(){
    if (chess_path.length === 0){
      can_go = false;
    }
    else{
      for (let item of chess_path){
        if (mouse_press_pos.x === item.x && mouse_press_pos.y === item.y){
  
          can_go = true;
          break;
        }
        else{
          can_go = false;
        }
      }
      
    }
}
  
// SHOWING WHERE IS ALL THE LEGAL MOVES YOU CAN MAKE
function showPremove(){
  if (yourRole === "white"){
    for (let item of chess_path){
      fill("black");
      circle(item.x * square_size + square_size /2, item.y * square_size + square_size /2,square_size/4);
    }
  }
  else if (yourRole === "black"){
    for (let item of chess_path){
      fill("black");
      circle(Math.abs(item.x - 7) * square_size + square_size /2, Math.abs(item.y - 7) * square_size + square_size /2,square_size/4);
    }
  }
}
  
// IF OUT OF BOUND THEN YOU CANT GO OUT
function outofBound(x,y){
    if (x >= 8 || x <= -1 || y >= 8 || y <= -1){
      return true;
    }
    return false;
}
  
// GOT THE DIRECTION IN A LIST AND LOOP THROUGH IT GOING CHECK SQUARE
function loopingDirection(direction, current_selecting){
  let chessthing = [];
  for (let [dir_x,dir_y] of direction){
    for (let length = 1; length <= 8; length ++){
      aiming_x = current_selecting.x + dir_x * length;
      aiming_y = current_selecting.y + dir_y * length;

      let hm = checkingCollision(aiming_x,aiming_y, current_selecting);
      if (hm !== false){
        for (let item of hm){
          chessthing.push(item);
        }
        break;
      }
      else if(outofBound(aiming_x,aiming_y)){
        break;
      }
      else{
        append(chessthing, {x:aiming_x,y:aiming_y});
      }
    }
  }
  return chessthing;
}
  
// EXCLUSIVE FOR THE KING TO TRY AND CASTLE IF THERE IS A ROOK
function findRook(){
    let whos_is_it = null;
    if (!turn){
      whos_is_it = dataforParty.white_all_pieces;
    }
    else{
      whos_is_it = dataforParty.black_all_pieces;
    }
}

// WHEN A CHESS GAME IS HAPPENING
function chessState(){
  if (current_selected){
    chesspathChecking();
    if (can_go){
      let deleted_piece;
      if (dataforParty.checked !== 0){
        let pos;
        let tempoWhite = [...dataforParty.white_all_pieces];
        let tempoBlack = [...dataforParty.black_all_pieces];
        if (!dataforParty.turn){
          pos = tempoWhite.indexOf(current_selected);
          tempoWhite[pos].x = mouse_press_pos.x;
          tempoWhite[pos].y = mouse_press_pos.y;
        }
        else{
          pos = tempoBlack.indexOf(current_selected);
          tempoBlack[pos].x = mouse_press_pos.x;
          tempoBlack[pos].y = mouse_press_pos.y;
        }
        if (isTheKingChecked(!dataforParty.turn, tempoWhite, tempoBlack)){
          print("nononono");
        }
        
      }
      
      if (!dataforParty.turn){
        if (current_selected.name === "king"){

          for (let item of dataforParty.white_all_pieces){
            if (item.name === "rook" && current_selected.did_move === false && item.did_move === false && item.x === mouse_press_pos.x  + 1 && item.x === 7 ){
              let rook_pos = dataforParty.white_all_pieces.indexOf(item);
              let king_pos = dataforParty.white_all_pieces.indexOf(current_selected);
              dataforParty.white_all_pieces[rook_pos].x = 5;
              break;
            }
            else if (item.name === "rook" && current_selected.did_move === false && item.did_move === false && item.x >= mouse_press_pos.x -2 && item.x === 0 ){
              let rook_pos = dataforParty.white_all_pieces.indexOf(item);
              dataforParty.white_all_pieces[rook_pos].x = 3;
              mouse_press_pos = {x:2,y:7};
              break;
            }
          }
        }
        
        let pos = dataforParty.white_all_pieces.indexOf(current_selected);
        dataforParty.white_all_pieces[pos].x = mouse_press_pos.x;
        dataforParty.white_all_pieces[pos].y = mouse_press_pos.y;
        for (let item of dataforParty.black_all_pieces){
          if (item.x === mouse_press_pos.x && item.y === mouse_press_pos.y){
            deleted_piece = dataforParty.black_all_pieces.indexOf(item);
            if (item.name === "king"){
              dataforParty.gameOn = false;
            }
            dataforParty.black_all_pieces.splice(deleted_piece,1);            
            break;
          }
        }
        
      }
      else{
        if (current_selected.name === "king"){
          for (let item of dataforParty.black_all_pieces){
            if (item.name === "rook" && current_selected.did_move === false && item.did_move === false && item.x === mouse_press_pos.x  + 1 && item.x === 7 ){
              let rook_pos = dataforParty.black_all_pieces.indexOf(item);
              let king_pos = dataforParty.black_all_pieces.indexOf(current_selected);
              dataforParty.black_all_pieces[rook_pos].x = 5;
              dataforParty.black_all_pieces[king_pos].x = 6;
              break;
            }
            else if (item.name === "rook" && current_selected.did_move === false && item.did_move === false && item.x >= mouse_press_pos.x -2 && item.x === 0 ){
              let rook_pos = dataforParty.black_all_pieces.indexOf(item);
              dataforParty.black_all_pieces[rook_pos].x = 3;
              mouse_press_pos = {x:2, y:0};
              break;
            }
          }
        }
        let pos = dataforParty.black_all_pieces.indexOf(current_selected);
        dataforParty.black_all_pieces[pos].x = mouse_press_pos.x;
        dataforParty.black_all_pieces[pos].y = mouse_press_pos.y;
        for (let item of dataforParty.white_all_pieces){
          if (item.x === mouse_press_pos.x && item.y === mouse_press_pos.y){
            deleted_piece = dataforParty.white_all_pieces.indexOf(item);
            if (item.name === "king"){
              game_on = false;
            }
            dataforParty.white_all_pieces.splice(deleted_piece,1);
            
            break;
          }
        }
      } 
      if (current_selected.name === "rook" || current_selected.name === "king"){
        current_selected.did_move = true;
      }
      current_selected = null;
      if (isTheKingChecked(dataforParty.turn, dataforParty.white_all_pieces, dataforParty.black_all_pieces)){
        dataforParty.checked = kingIndex;
        print(dataforParty.checked);
      }
      else{
        dataforParty.checked = 0;
      }
      dataforParty.turn = !dataforParty.turn;
      turnStart = !turnStart;
      chess_path = [];
      
    }
    else{
      current_selected = null;
      chess_path = [];
    }
    
    
  }
  // IF NOT THEN SELECT A PIECE
  else{
    selectingPiece();
  }
}

function whoAreYou(name, who){
  if (who === "white"){
    if (name === "pawn"){
      return pawnimg;
    }
    else if (name === "king"){
      return kingimg;
    }
    else if (name === "queen"){
      return queenimg;
    }
    else if (name === "bishop"){
      return bishopimg;
    }
    else if (name === "knight"){
      return knightimg;
    }
    else if (name === "rook"){
      return rookimg;
    }
  }
  else{
    if (name === "pawn"){
      return b_pawnimg;
    }
    else if (name === "king"){
      return b_kingimg;
    }
    else if (name === "queen"){
      return b_queenimg;
    }
    else if (name === "bishop"){
      return b_bishopimg;
    }
    else if (name === "knight"){
      return b_knightimg;
    }
    else if (name === "rook"){
      return b_rookimg;
    }
  }
}

function isTheKingChecked(when, allwhite, allblack){
  notAvailable = [];
  print(when);
  
  if (!when){
    kingIndex = allblack[allblack.findIndex(item => item.name === "king")];
    
    for (let item of allwhite){
      let allPiecespossiblemove = generateLegalMoves(item);
      for (let path of allPiecespossiblemove){
        if (path.x === kingIndex.x && path.y === kingIndex.y){
          return true;
        }
      }
    }
  }
  else{
    print("check");
    kingIndex = allwhite[allwhite.findIndex(item => item.name === "king")];
    
    for (let item of allblack){
      let allPiecespossiblemove = generateLegalMoves(item);
      for (let path of allPiecespossiblemove){
        if (path.x === kingIndex.x && path.y === kingIndex.y){
          print("its true");
          return true;
        }
      }
    }
  } 
  
  return false;
}

