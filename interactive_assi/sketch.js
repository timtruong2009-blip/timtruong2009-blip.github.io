// Interactive scene Assignment
// Tim Truong
// Feb something
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let square_size;


let pawnimg;
let kingimg;
let queenimg;
let knightimg;
let bishopimg;
let rookimg;
let all_pieces = [];
let board_height;

let white_king_pos;
function preload(){
  pawnimg = loadImage("assets/pawn.png");
  kingimg = loadImage("assets/king.png");
  queenimg = loadImage("assets/queen.png");
  knightimg = loadImage("assets/knight.png");
  bishopimg = loadImage("assets/bishop.png");
  rookimg = loadImage("assets/rook.png");
  

  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  check_widthorheight();
  make_all_pieces();
  
}

function draw() {
  createCanvas(windowWidth, windowHeight);

  check_widthorheight();

  
  draw_board();
  make_board();

}

function make_board(){
  for (let item of all_pieces){
    // image(item.img, item.x,item.y,square_size,square_size);
    image(item.img, item.x, item.y,square_size,square_size);
    
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


function make_all_pieces(){
  // let pawn = (img = pawnimg, x = 0, y = width - width/8);
  for (let amount = 8; amount >= 0; amount --){
    print(board_height - board_height * amount);
    append(all_pieces, {img : pawnimg, x : board_height - board_height / 8 * amount, y :  board_height - board_height / 8 * 2});
  }
  

  // let king = (img = kingimg, x = 0, y = width - width/8);
  append(all_pieces, {img : kingimg, x : 0, y : 0 });

  // let queen = (img = queenimg, x = 0, y = width - width/8);
  append(all_pieces, {img : queenimg, x : 0, y : 0});

  // let knight = (img = knightimg, x = 0, y = width - width/8);
  append(all_pieces, {img : knightimg, x : 0, y : 0});

  // let bishop = ;
  append(all_pieces, {img : bishopimg, x : 0, y : 0});

  // let rook = ;
  for (let amount = 2; amount >= 0; amount --){
    append(all_pieces, {img : rookimg, x : 0, y :board_height - board_height / 8});
  }
  
  
}


