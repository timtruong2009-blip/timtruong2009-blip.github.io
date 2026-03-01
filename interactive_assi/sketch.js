// Interactive scene Assignment
// Tim Truong
// Feb something
//
// info about the chess game:
// what it has: white/black all_pieces, basic movement for all pieces
//              pieces cant go through each other, any scale chess board
// *Also if the black pieces looks off its cause i cant find any good image
//              
// Extra for Experts:
// - make the chess board with the window scale


let square_size;


let pawnimg;
let kingimg;
let queenimg;
let knightimg;
let bishopimg;
let rookimg;

let white_all_pieces = [];
let black_all_pieces = [];

let board_height;

let knight_direction = [[-1,2],[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1],[-2,1]]
let queen_direction = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]]
let bishop_direction = [[1,1], [-1,1], [-1,-1],[1,-1]]
let rook_direction = [[0,1],[1,0],[0,-1],[-1,0]]

let mouse_press_pos;
let current_selected;
let moving_eating;

let can_go = false;
let chess_path;

let turn = false;

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

function setup() {
  createCanvas(windowWidth, windowHeight);
  check_widthorheight();
  all_pieces_initial();
  
}

function draw() {
  createCanvas(windowWidth, windowHeight);

  check_widthorheight();

  
  draw_board();
  make_board();

}

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


function draw_board(){
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 0) {
        fill(255);
      } else {
        fill(100); 
      }
      rect(col * square_size, row * square_size, square_size, square_size);
    }
  }
}

function check_widthorheight(){
  if (height < width){
    square_size = height / 8;
    board_height = height;
  }
  else{
    square_size = width /8;
    board_height = width;
  }
}


function all_pieces_initial(){
  // let pawn = (img = pawnimg, x = 0, y = width - width/8);
  for (let amount = 7; amount >= 0; amount --){
    append(white_all_pieces, {img : pawnimg, x : amount, y :  6, name: "pawn",pawn_go_pace : 2});
  }
  
  // let king = (img = kingimg, x = 0, y = width - width/8);
  append(white_all_pieces, {img : kingimg, x : 4, y : 7 , name: "king"});

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
    append(white_all_pieces, {img : rookimg, x : amount * 7 , y :7, name: "rook"});
  }
// -------------------------------------------------- make black piece

// let pawn = (img = pawnimg, x = 0, y = width - width/8);
  for (let amount = 7; amount >= 0; amount --){
    append(black_all_pieces, {img : b_pawnimg, x : amount, y :  1, name: "pawn",pawn_go_pace : 2});
  }
  
  // let king = (img = kingimg, x = 0, y = width - width/8);
  append(black_all_pieces, {img : b_kingimg, x : 4, y : 0 , name: "king"});

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
    append(black_all_pieces, {img : b_rookimg, x : amount * 7 , y :0, name: "rook"});
  }
}
  


function mousePressed(){
  mouse_press_pos = {x : floor(mouseX / (board_height / 8)), y : floor(mouseY/ (board_height / 8))};
  if (current_selected){
    can_go_eat();
    // assuming there is no one to eat
    if (can_go){
      if (!turn){
        let pos = white_all_pieces.indexOf(current_selected);
        white_all_pieces[pos].x = mouse_press_pos.x;
        white_all_pieces[pos].y = mouse_press_pos.y;
        
      }
      else{
        let pos = black_all_pieces.indexOf(current_selected);
        black_all_pieces[pos].x = mouse_press_pos.x;
        black_all_pieces[pos].y = mouse_press_pos.y;
        
      }
      current_selected = null;
      turn = !turn;
      }
    else{
      current_selected = null;
    }
      

  }
  else{
    selecting_piece();
  }
}



function can_go_eat(){
  chess_path = []
  
  if (current_selected.name === "pawn"){
    
    let black_or_white;
    if (!turn){
      
      black_or_white = 1;
      if (current_selected.y != 6){
        current_selected.pawn_go_pace = 1
        
      }
    }
    else{
      black_or_white = -1;
      if (current_selected.y != 1){
        current_selected.pawn_go_pace = -2;
      }
    }
    
    for (let length = black_or_white; length != current_selected.pawn_go_pace; length += black_or_white){
      aiming_x = current_selected.x;
      aiming_y = current_selected.y - length;
      if (looping_through_all_piece_and_check(aiming_x,aiming_y)){
        break;
      }
      else{
        append(chess_path, {x :aiming_x, y:aiming_y})
      }
    }
  }

  else if (current_selected.name === "king"){
    let dis_x = Math.abs(mouse_press_pos.x - current_selected.x)
    let dis_y = Math.abs(mouse_press_pos.y - current_selected.y)
    if (dis_x <= 1 && dis_y <= 1 && !(dis_x === 0 && dis_y === 0)){
      for (let item of white_all_pieces){
        if (item.x === mouse_press_pos.x && item.y === mouse_press_pos.y){
          can_go = false;
          break;
        }
        else{
          can_go = true;
        }
      }
      
    }
    else{
      can_go = false;
    }
  }

  else if (current_selected.name === "queen"){
    
    for (let [dir_x,dir_y] of queen_direction){
      for (let length = 1; length <= 8; length ++){
        aiming_x = current_selected.x + dir_x * length;
        aiming_y = current_selected.y + dir_y * length;
        if (looping_through_all_piece_and_check(aiming_x,aiming_y)){
          break;
        }
        else{
          append(chess_path, {x:aiming_x,y:aiming_y})
        }
      }
    }
  }

  else if (current_selected.name === "knight"){
    for (let [dir_x,dir_y] of knight_direction){
      aiming_x = current_selected.x + dir_x;
      aiming_y = current_selected.y + dir_y;

      if (!looping_through_all_piece_and_check(aiming_x,aiming_y)){
        append(chess_path, {x:aiming_x, y:aiming_y})
      }
      
    }
    check_chess_path_see_if_can_go();
  }

  else if (current_selected.name === "bishop"){
    for (let [dir_x,dir_y] of bishop_direction){
      for (let length = 1; length <= 8; length ++){
        aiming_x = current_selected.x + dir_x * length;
        aiming_y = current_selected.y + dir_y * length;
        if (looping_through_all_piece_and_check(aiming_x,aiming_y)){
          break;
        }
        else{
          append(chess_path, {x:aiming_x,y:aiming_y})
        }
      }
    }
    
  }

  else if (current_selected.name === "rook"){
    for (let [dir_x,dir_y] of rook_direction){
      for (let length = 1; length <= 8; length ++){
        aiming_x = current_selected.x + dir_x * length;
        aiming_y = current_selected.y + dir_y * length;
        if (looping_through_all_piece_and_check(aiming_x,aiming_y)){
          break;
        }
        else{
          append(chess_path, {x:aiming_x,y:aiming_y})
        }
      }
    }
  }
  check_chess_path_see_if_can_go();
}


function selecting_piece(){
  if (!turn){
    for (let chess of white_all_pieces){
      if (chess.x === mouse_press_pos.x && chess.y === mouse_press_pos.y){
        current_selected = chess;
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
        break;
      }
      else{
        current_selected = null;
      }
    }
  }
    
}

function looping_through_all_piece_and_check(x,y){
  for (let item of white_all_pieces){
    if (item.x === x && item.y === y){
      return true
    }
  }
  return false
}

function check_chess_path_see_if_can_go(){
  print(chess_path)
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
        print("here");
      }
    }
  }
  
}