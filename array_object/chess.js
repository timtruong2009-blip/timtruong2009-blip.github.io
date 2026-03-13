// MAKING ALL THE PIECES AND STARTING POSITION
function allpiecePosition(){
  print(dataforParty.activePlayer);
// let pawn = (img = pawnimg, x = 0, y = width - width/8);
  if (dataforParty.activePlayer < 3){
    if (yourRole === "white"){
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
    }
    
    // -------------------------------------------------- make black piece
  
    // let pawn = (img = pawnimg, x = 0, y = width - width/8);
    else if (yourRole === "black") {
      for (let amount = 7; amount >= 0; amount --){
        dataforParty.black_all_pieces.push({ x : amount, y :  1, name: "pawn",pawn_go_pace : 2});
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
    }
  }
}
  // DRAWING THE CHESS BOARD
function make_board(){
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
      image(whatPieceIsIt, item.x * (board_height / 8) , board_height - square_size * item.y - square_size,square_size,square_size);
    }
        
    for (let item of dataforParty.black_all_pieces){
      // image(item.img, item.x,item.y,square_size,square_size);
      whatPieceIsIt = whoAreYou(item.name, "black");
      image(whatPieceIsIt, item.x * (board_height / 8) ,board_height - square_size * item.y - square_size,square_size,square_size);
    }
  }
  
}

function draw_board(){
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 === 0) {
          fill(255);
        } 
        else {
          fill(100); 
        }
        rect(col * square_size, row * square_size, square_size, square_size);
      }
    }
}
  // Check to see if 
function generateLegalMoves(){
    chess_path = [];
    
    if (current_selected.name === "pawn"){
      if (!dataforParty.turn){
        let pawn_weird_attack_thing = [[current_selected.x +1,current_selected.y -1],[current_selected.x -1,current_selected.y -1]];
        for (let [x_move,y_move] of pawn_weird_attack_thing){
          for (let black of dataforParty.black_all_pieces){
            if (black.x === x_move & black.y === y_move){
              append(chess_path, {x:x_move, y:y_move});
            }
          }
        }
        if (current_selected.y !== 6){
          current_selected.pawn_go_pace = 1;
        }
        for (let length = 1; length <= current_selected.pawn_go_pace ; length ++){
          aiming_x = current_selected.x;
          aiming_y = current_selected.y - length;
          if (checkingCollision(aiming_x,aiming_y)){
            break;
          }
          else if(outofBound(aiming_x,aiming_y)){
            break;
          }
          else{
            append(chess_path, {x :aiming_x, y:aiming_y});
          }
        }
      }
      else{
        let pawn_weird_attack_thing = [[current_selected.x +1,current_selected.y +1],[current_selected.x -1,current_selected.y +1]];
        for (let [x_move,y_move] of pawn_weird_attack_thing){
          for (let white of dataforParty.white_all_pieces){
            if (white.x === x_move & white.y === y_move){
              append(chess_path, {x:x_move, y:y_move});
            }
          }
        }
        if (current_selected.y !== 1){
          current_selected.pawn_go_pace = -1;
        }
        for (let length = -1; length >= current_selected.pawn_go_pace ; length --){
          aiming_x = current_selected.x;
          aiming_y = current_selected.y - length;
          if (checkingCollision(aiming_x,aiming_y)){
            break;
          }
          else if(outofBound(aiming_x,aiming_y)){
            break;
          }
          else{
            append(chess_path, {x :aiming_x, y:aiming_y});
          }
        }
      }
    }
  
    else if (current_selected.name === "king"){
      let king_exclusive_chess_path = [];
      for (let [dir_x,dir_y] of king_direction){
        aiming_x = current_selected.x + dir_x;
        aiming_y = current_selected.y + dir_y;
        if (!checkingCollision(aiming_x,aiming_y) && !outofBound(aiming_x,aiming_y)){
          append(chess_path, {x:aiming_x,y:aiming_y});
        }
      }
      if (current_selected.did_move === false){
        for (let [dir_x,dir_y] of castle_direction){
          for (let length = 1; length <= 8; length ++){
            aiming_x = current_selected.x + length * dir_x;
            aiming_y = current_selected.y;
            if (checkingCollision(aiming_x,aiming_y)){
              break;                
            }
            else{
              append(king_exclusive_chess_path, {x:aiming_x,y:aiming_y});
            }
            
          } 
        }
        print(king_exclusive_chess_path);
        if (king_exclusive_chess_path[king_exclusive_chess_path.length -1].x > 8 || king_exclusive_chess_path[king_exclusive_chess_path.length -1].x < 0){
          print("true");
          king_exclusive_chess_path = [];
        }
        if (king_exclusive_chess_path.length !== 0){
          for (let item of king_exclusive_chess_path){
            append(chess_path, {x:item.x, y:item.y});
          }
        }
      }
    }
    else if (current_selected.name === "queen"){
      
      loopingDirection(queen_direction);
    }
  
    else if (current_selected.name === "knight"){
      for (let [dir_x,dir_y] of knight_direction){
        aiming_x = current_selected.x + dir_x;
        aiming_y = current_selected.y + dir_y;
  
        if (checkingCollision(aiming_x,aiming_y)){
          ;
          
        }
        else if(outofBound(aiming_x,aiming_y)){
          ;
        }
        else{
          append(chess_path, {x:aiming_x, y:aiming_y});
        }
        
      }
      chesspathChecking();
    }
  
    else if (current_selected.name === "bishop"){
      loopingDirection(bishop_direction);
      
    }
  
    else if (current_selected.name === "rook"){
      loopingDirection(rook_direction);
    }
    
}
  
// SEE IF WHERE YOU CLICK HAVE A PIECE THERE OR NOT
function selectingPiece(){
    if (!dataforParty.turn){
      for (let chess of dataforParty.white_all_pieces){
        if (chess.x === mouse_press_pos.x && chess.y === mouse_press_pos.y){
          current_selected = chess;
          generateLegalMoves();
          break;
        }
        else{
          current_selected = null;
        }
      }
    }
    else{
      for (let chess of dataforParty.black_all_pieces){
        if (chess.x === mouse_press_pos.x && chess.y === mouse_press_pos.y){
          current_selected = chess;
          generateLegalMoves();
          break;
        }
        else{
          current_selected = null;
        }
      }
    }
    
}

  // CHECKING THE LOCATION X AND Y TO SEE IF THERE IS ANY OPPOSITE COLOR PIECE THERE
function checkingCollision(x,y){
    for (let item of dataforParty.white_all_pieces){
      if (item.x === x && item.y === y){
        if (current_selected.name !== "pawn"){
          if (dataforParty.turn){
            append(chess_path, {x:x, y:y});
          }
        }
        return true;
      }
    }
    for (let item of dataforParty.black_all_pieces){
      if (item.x === x && item.y === y){
        if (current_selected.name !== "pawn"){
          if (!dataforParty.turn){
            append(chess_path, {x:x, y:y});
          }
          
        }
        return true;
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
  
    for (let item of chess_path){
      fill("black");
      circle(item.x * square_size + square_size /2,item.y * square_size + square_size /2,square_size/4);
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
function loopingDirection(direction){
    for (let [dir_x,dir_y] of direction){
      for (let length = 1; length <= 8; length ++){
        aiming_x = current_selected.x + dir_x * length;
        aiming_y = current_selected.y + dir_y * length;
        if (checkingCollision(aiming_x,aiming_y)){
          break;
        }
        else if(outofBound(aiming_x,aiming_y)){
          break;
        }
        else{
          append(chess_path, {x:aiming_x,y:aiming_y});
        }
      }
    }
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
    for (let item of whos_is_it){
  
    }
}

// WHEN A CHESS GAME IS HAPPENING
function chessState(){
  if (current_selected){
    chesspathChecking();
    if (can_go){
      let deleted_piece;
      
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
              game_on = false;
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
      dataforParty.turn = !dataforParty.turn;
    }
    else{
      current_selected = null;
    }
      
    chess_path = [];
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


