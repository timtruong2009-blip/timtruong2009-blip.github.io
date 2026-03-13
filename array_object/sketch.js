// Arrays and object notation
// Tim Truong
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let pos = {x: 0, y: 0};
let square_size;
let yourRole;


let dataforParty;
let activePlayer;

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
let game_on = true;

let gameWhereItIs = "chess";



function preload() {
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
  
  // connect to a p5party server
  partyConnect(
    "wss://demoserver.p5party.org",
    "chess online",
  );
  you = partyLoadMyShared();
  guests = partyLoadGuestShareds();

  // tell p5.party to sync the object
  dataforParty = partyLoadShared("meh", {
    white_all_pieces: [],
    black_all_pieces: [],
    activePlayer: 0,
    player1: "",
    player2: "",
    turn: false,


  });
  
}

function setup() {
  
  dataforParty.activePlayer += 1;
  player1Orplayer2();

  createCanvas(windowWidth, windowHeight);
  updateBoardSize();
  allpiecePosition();
  
  print(dataforParty.white_all_pieces);
  
}
function draw() {
  updateBoardSize();
  createCanvas(board_height, board_height);
  // IF GAME IS NOT ENDED
  if (game_on){
    draw_board();
    make_board();
    if (chess_path.length !== 0){
      showPremove();
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



function updateBoardSize(){
  if (windowHeight < windowWidth){
    square_size = windowHeight / 8;
    board_height = windowHeight;
  }
  else{
    square_size = windowWidth /8;
    board_height = windowWidth;
  }
}
// WHEN MOUSE IS PRESSED ON BOARD
function mousePressed(){
  if (gameWhereItIs === "mainscreen" ){

  }
  
  else if (gameWhereItIs === "chess" ){
    mouse_press_pos = {x : floor(mouseX / (board_height / 8)), y : floor(mouseY/ (board_height / 8))};
    chessState();
  }
  
}

function player1Orplayer2(){
  
  if (partyIsHost()){
    yourRole = "white";
  }
  else if (dataforParty.activePlayer === 2){
    yourRole = "black";
  }
  else {
    you = "spectator";
  }
  print(yourRole);
}

