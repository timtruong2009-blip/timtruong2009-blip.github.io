function gameStart(){
    displaySheetStarting(you.currentAction, schoolgirlPixel.w, 6, windowWidth/2, windowHeight/2, buttonScale * 2);
}


class Player{
    constructor(classes, x, y){
        this.who = classes;
        this.x = x * gridSize;
        this.y = y * gridSize;
        this.health = 100;
    }
}

class SchoolGirl extends Player{
    constructor(classes, x, y ){
        super(classes,x, y)
        this.currentAction = schoolgirlIdle;
    }

}

function generateSurrounding() {
    
}

function makePlayer(){
    let human = new Player("schoolgirl",round(map.length/2), round(map.length/2));
    you = new SchoolGirl(human.who, round(map.length/2), round(map.length/2));
}






