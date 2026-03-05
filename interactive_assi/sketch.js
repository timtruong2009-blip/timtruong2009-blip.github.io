// Interactive scene Assignment
// Tim Truong
// Feb something
//
// info about the chess game:
// what it has: white/black all_pieces, basic movement for all pieces
//              pieces cant go through each other, any scale chess board
//              pawn can eat (no en passant), dark circle so you know where
//              the piece can go, both king can castle if them or the rook have not move
// 
// *Also if the black pieces looks off its cause i cant find any good image
// *This is over 
//              
// Extra for Experts:
// - make the everything with the window scale with each other
// - 


let square_size;

// WHITE PIECES
let pawnimg;
let kingimg;
let queenimg;
let knightimg;
let bishopimg;
let rookimg;

// BLACK PIECES
let b_pawnimg;
let b_kingimg;
let b_queenimg;
let b_knightimg;
let b_bishopimg;
let b_rookimg;

// ALL PIECES
let white_all_pieces = [];
let black_all_pieces = [];

// BOARD HEIGHT
let board_height;

// ALL DIRECTION
let knight_direction = [[-1,2],[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1],[-2,1]];
let queen_direction = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];
let bishop_direction = [[1,1], [-1,1], [-1,-1],[1,-1]];
let rook_direction = [[0,1],[1,0],[0,-1],[-1,0]];
let king_direction = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];
let castle_direction = [[1,0],[-1,0]];

// VARIABLE
let mouse_press_pos;
let current_selected;
let moving_eating;

// COOL VARIABLE
let can_go = false;
let chess_path = [];
let turn = false;
let game_on = true;

// LOADING ALL IMAGE
function preload(){
  pawnimg = loadImage("assets/pawn.png");
  kingimg = loadImage("assets/king.png");
  queenimg = loadImage("assets/queen.png");
  knightimg = loadImage("assets/knight.png");
  bishopimg = loadImage("assets/bishop.png");
  rookimg = loadImage("assets/rook.png");
  
  b_pawnimg = loadImage("assets/black_pawn.png");
  b_kingimg = loadImage("assets/black_king.png");
  b_queenimg = loadImage("assets/black_queen.png");
  b_knightimg = loadImage("assets/black_knight.png");
  b_bishopimg = loadImage("assets/black_bishop.png");
  b_rookimg = loadImage("assets/black_rook.png");
  
  
}

// INITIAL SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);
  check_widthorheight();
  all_pieces_initial();
  
}

// DRAWING THE THING
function draw() {
  check_widthorheight();
  createCanvas(board_height, board_height);
  
  // IF GAME IS NOT ENDED
  if (game_on){
    draw_board();
    make_board();
    if (chess_path.length !== 0){
      drawing_circle_to_where_to_go();
    }
  }
  // IF THE KING IS EATEN
  else{
    textAlign(CENTER);
    fill("black");
    textSize(square_size);
    if (turn){
      text("WHITE WIN", board_height/2,board_height/2);
    }
    else{
      text("BLACK WIN", board_height/2,board_height/2);
    }
  }
    
}

// DRAWING THE CHESS BOARD
function make_board(){
  for (let item of white_all_pieces){
    // image(item.img, item.x,item.y,square_size,square_size);
    image(item.img, item.x * (board_height / 8) ,item.y * (board_height / 8) ,square_size,square_size);
  }

  for (let item of black_all_pieces){
    // image(item.img, item.x,item.y,square_size,square_size);
    image(item.img, item.x * (board_height / 8) ,item.y * (board_height / 8) ,square_size,square_size);
  }
}

// DRAWING THE CHESS PIECES
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

// CHECKING THE WINDOW W/H
function check_widthorheight(){
  if (windowHeight < windowWidth){
    square_size = windowHeight / 8;
    board_height = windowHeight;
  }
  else{
    square_size = windowWidth /8;
    board_height = windowWidth;
  }
}

// MAKING ALL THE PIECES AND STARTING POSITION
function all_pieces_initial(){
  // let pawn = (img = pawnimg, x = 0, y = width - width/8);
  for (let amount = 7; amount >= 0; amount --){
    append(white_all_pieces, {img : pawnimg, x : amount, y :  6, name: "pawn",pawn_go_pace : 2});
  }
  
  // let king = (img = kingimg, x = 0, y = width - width/8);
  append(white_all_pieces, {img : kingimg, x : 4, y : 7 , name: "king", did_move: false});

  // let queen = (img = queenimg, x = 0, y = width - width/8);
  append(white_all_pieces, {img : queenimg, x : 3, y : 7, name: "queen"});

  // let knight = (img = knightimg, x = 0, y = width - width/8);
  for (let amount = 1; amount >= 0; amount --){
    append(white_all_pieces, {img : knightimg, x : amount*5 + 1, y : 7 , name: "knight"});
  }

  // let bishop = ;
  for (let amount = 1; amount >= 0; amount --){
    append(white_all_pieces, {img : bishopimg, x : amount * 3 + 2, y : 7, name: "bishop"});
  }

  // let rook = ;
  for (let amount = 1; amount >= 0; amount --){
    append(white_all_pieces, {img : rookimg, x : amount * 7 , y :7, name: "rook", did_move: false});
  }
  // -------------------------------------------------- make black piece

  // let pawn = (img = pawnimg, x = 0, y = width - width/8);
  for (let amount = 7; amount >= 0; amount --){
    append(black_all_pieces, {img : b_pawnimg, x : amount, y :  1, name: "pawn",pawn_go_pace : -2});
  }
  
  // let king = (img = kingimg, x = 0, y = width - width/8);
  append(black_all_pieces, {img : b_kingimg, x : 4, y : 0 , name: "king", did_move: false});

  // let queen = (img = queenimg, x = 0, y = width - width/8);
  append(black_all_pieces, {img : b_queenimg, x : 3, y : 0, name: "queen"});

  // let knight = (img = knightimg, x = 0, y = width - width/8);
  for (let amount = 1; amount >= 0; amount --){
    append(black_all_pieces, {img : b_knightimg, x : amount*5 + 1, y : 0 , name: "knight"});
  }

  // let bishop = ;
  for (let amount = 1; amount >= 0; amount --){
    append(black_all_pieces, {img : b_bishopimg, x : amount * 3 + 2, y : 0, name: "bishop"});
  }

  // let rook = ;
  for (let amount = 1; amount >= 0; amount --){
    append(black_all_pieces, {img : b_rookimg, x : amount * 7 , y :0, name: "rook", did_move: false});
  }
}
  

// WHEN MOUSE IS PRESSED ON BOARD
function mousePressed(){
  mouse_press_pos = {x : floor(mouseX / (board_height / 8)), y : floor(mouseY/ (board_height / 8))};
  // IF A PIECE IS CURRENT SELECTED
  if (current_selected){
    check_chess_path_see_if_can_go();
    if (can_go){
      let deleted_piece;
      
      if (!turn){
        if (current_selected.name === "king"){
          for (let item of white_all_pieces){
            if (item.name === "rook" && current_selected.did_move === false && item.did_move === false && item.x === mouse_press_pos.x  + 1 && item.x === 7 ){
              let rook_pos = white_all_pieces.indexOf(item);
              let king_pos = white_all_pieces.indexOf(current_selected);
              white_all_pieces[rook_pos].x = 5;
              break;
            }
            else if (item.name === "rook" && current_selected.did_move === false && item.did_move === false && item.x >= mouse_press_pos.x -2 && item.x === 0 ){
              let rook_pos = white_all_pieces.indexOf(item);
              white_all_pieces[rook_pos].x = 3;
              mouse_press_pos = {x:2,y:7};
              break;
            }
          }
        }
        
        let pos = white_all_pieces.indexOf(current_selected);
        white_all_pieces[pos].x = mouse_press_pos.x;
        white_all_pieces[pos].y = mouse_press_pos.y;
        for (let item of black_all_pieces){
          if (item.x === mouse_press_pos.x && item.y === mouse_press_pos.y){
            deleted_piece = black_all_pieces.indexOf(item);
            if (item.name === "king"){
              game_on = false;
            }
            black_all_pieces.splice(deleted_piece,1);            
            break;
          }
        }
        
      }
      else{
        if (current_selected.name === "king"){
          for (let item of black_all_pieces){
            if (item.name === "rook" && current_selected.did_move === false && item.did_move === false && item.x === mouse_press_pos.x  + 1 && item.x === 7 ){
              let rook_pos = black_all_pieces.indexOf(item);
              let king_pos = black_all_pieces.indexOf(current_selected);
              black_all_pieces[rook_pos].x = 5;
              black_all_pieces[king_pos].x = 6;
              break;
            }
            else if (item.name === "rook" && current_selected.did_move === false && item.did_move === false && item.x >= mouse_press_pos.x -2 && item.x === 0 ){
              let rook_pos = black_all_pieces.indexOf(item);
              black_all_pieces[rook_pos].x = 3;
              mouse_press_pos = {x:2, y:0};
              break;
            }
          }
        }
        let pos = black_all_pieces.indexOf(current_selected);
        black_all_pieces[pos].x = mouse_press_pos.x;
        black_all_pieces[pos].y = mouse_press_pos.y;
        for (let item of white_all_pieces){
          if (item.x === mouse_press_pos.x && item.y === mouse_press_pos.y){
            deleted_piece = white_all_pieces.indexOf(item);
            if (item.name === "king"){
              game_on = false;
            }
            white_all_pieces.splice(deleted_piece,1);
            
            break;
          }
        }
      } 
      if (current_selected.name === "rook" || current_selected.name === "king"){
        current_selected.did_move = true;
      }
      current_selected = null;
      turn = !turn;
    }
    else{
      current_selected = null;
    }
      
    chess_path = [];
  }
  // IF NOT THEN SELECT A PIECE
  else{
    selecting_piece();
  }
}


// Check to see if 
function can_go_eat(){
  chess_path = [];
  
  if (current_selected.name === "pawn"){
    if (!turn){
      let pawn_weird_attack_thing = [[current_selected.x +1,current_selected.y -1],[current_selected.x -1,current_selected.y -1]];
      for (let [x_move,y_move] of pawn_weird_attack_thing){
        for (let black of black_all_pieces){
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
        if (looping_through_all_piece_and_check(aiming_x,aiming_y)){
          break;
        }
        else if(check_if_out_of_bound(aiming_x,aiming_y)){
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
        for (let white of white_all_pieces){
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
        if (looping_through_all_piece_and_check(aiming_x,aiming_y)){
          break;
        }
        else if(check_if_out_of_bound(aiming_x,aiming_y)){
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
      if (!looping_through_all_piece_and_check(aiming_x,aiming_y) && !check_if_out_of_bound(aiming_x,aiming_y)){
        append(chess_path, {x:aiming_x,y:aiming_y});
      }
    }
    if (current_selected.did_move === false){
      for (let [dir_x,dir_y] of castle_direction){
        for (let length = 1; length <= 8; length ++){
          aiming_x = current_selected.x + length * dir_x;
          aiming_y = current_selected.y;
          if (looping_through_all_piece_and_check(aiming_x,aiming_y)){
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
    
    check_direction_and_moves(queen_direction);
  }

  else if (current_selected.name === "knight"){
    for (let [dir_x,dir_y] of knight_direction){
      aiming_x = current_selected.x + dir_x;
      aiming_y = current_selected.y + dir_y;

      if (looping_through_all_piece_and_check(aiming_x,aiming_y)){
        ;
        
      }
      else if(check_if_out_of_bound(aiming_x,aiming_y)){
        ;
      }
      else{
        append(chess_path, {x:aiming_x, y:aiming_y});
      }
      
    }
    check_chess_path_see_if_can_go();
  }

  else if (current_selected.name === "bishop"){
    check_direction_and_moves(bishop_direction);
    
  }

  else if (current_selected.name === "rook"){
    check_direction_and_moves(rook_direction);
  }
  
}

// SEE IF WHERE YOU CLICK HAVE A PIECE THERE OR NOT
function selecting_piece(){
  if (!turn){
    for (let chess of white_all_pieces){
      if (chess.x === mouse_press_pos.x && chess.y === mouse_press_pos.y){
        current_selected = chess;
        can_go_eat();
        break;
      }
      else{
        current_selected = null;
      }
    }
  }
  else{
    for (let chess of black_all_pieces){
      if (chess.x === mouse_press_pos.x && chess.y === mouse_press_pos.y){
        current_selected = chess;
        can_go_eat();
        break;
      }
      else{
        current_selected = null;
      }
    }
  }
  
}

// CHECKING THE LOCATION X AND Y TO SEE IF THERE IS ANY OPPOSITE COLOR PIECE THERE
function looping_through_all_piece_and_check(x,y){
  for (let item of white_all_pieces){
    if (item.x === x && item.y === y){
      if (current_selected.name !== "pawn"){
        if (turn){
          append(chess_path, {x:x, y:y});
        }
      }
      return true;
    }
  }
  for (let item of black_all_pieces){
    if (item.x === x && item.y === y){
      if (current_selected.name !== "pawn"){
        if (!turn){
          append(chess_path, {x:x, y:y});
        }
        
      }
      return true;
    }
  }
  return false;
}

// CHECK IF THE POSSIBLE MOVES THAT A PIECE CAN MAKE IS WHERE YOU CLICK IT
function check_chess_path_see_if_can_go(){
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
function drawing_circle_to_where_to_go(){

  for (let item of chess_path){
    fill("black");
    circle(item.x * square_size + square_size /2,item.y * square_size + square_size /2,square_size/4);
  }
}

// IF OUT OF BOUND THEN YOU CANT GO OUT
function check_if_out_of_bound(x,y){
  if (x >= 8 || x <= -1 || y >= 8 || y <= -1){
    return true;
  }
  return false;
}

// GOT THE DIRECTION IN A LIST AND LOOP THROUGH IT GOING CHECK SQUARE
function check_direction_and_moves(direction){
  for (let [dir_x,dir_y] of direction){
    for (let length = 1; length <= 8; length ++){
      aiming_x = current_selected.x + dir_x * length;
      aiming_y = current_selected.y + dir_y * length;
      if (looping_through_all_piece_and_check(aiming_x,aiming_y)){
        break;
      }
      else if(check_if_out_of_bound(aiming_x,aiming_y)){
        break;
      }
      else{
        append(chess_path, {x:aiming_x,y:aiming_y});
      }
    }
  }
}

// EXCLUSIVE FOR THE KING TO TRY AND CASTLE IF THERE IS A ROOK
function finding_rook(){
  let whos_is_it = null;
  if (!turn){
    whos_is_it = white_all_pieces;
  }
  else{
    whos_is_it = black_all_pieces;
  }
  for (let item of whos_is_it){

  }
}