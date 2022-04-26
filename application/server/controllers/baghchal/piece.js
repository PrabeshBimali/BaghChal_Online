class Piece{
    constructor(name, x, y){
        this.name = name
        this.x = x
        this.y = y
    }

    get getName(){
        return this.name
    }

    get getX(){
        return this.x
    }

    get getY(){
        return this.y
    }
}

module.exports = Piece