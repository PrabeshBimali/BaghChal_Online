const Piece = require('./piece')
const Point = require('./point')

class Board{
    constructor(){
        this.board = Array()
        this.row, this.column = 5
        this.killedGoats = 0
        this.trappedBaghs = 0
        this.usedGoats = 0
        this.createBoard()
    }

    createBoard(){
        for(let row = 0; row < this.row; row++){
            this.board.push(Array())
            for(let col = 0; col < this.column; col++){
                if(row === 0 || row < this.row - 1){
                    if(col === 0 || col < this.column - 1){
                        this.board[row].push(Piece("bagh", row, col))
                    }else{
                        this.board[row].push(0)
                    }
                }else{
                    this.board[row].push(0)
                }
            }
        }
    }

    move(fromPosition, toPosition){
        const fromRow = fromPosition.getX
        const fromCol = fromPosition.getY
        const toRow = toPosition.getX
        const toCol = toPosition.getY

        if(fromRow === -1){
            this.board[toRow][toCol].getName = "goat"
            this.usedGoats++
        }else{
            if(this.board[fromRow][fromCol].getName === "bagh"){
                
            }

            [this.board[fromRow][fromCol], this.board[toRow][toCol]] = [this.board[fromRow][fromCol], this.board[toRow][toCol]]
        }


    }

    getValidMoves(piece){
        if(piece.getName === "bagh"){
            return this.getBaghMoves(piece.getX, piece.getY)
        }else if(piece.getName === "goat"){
            return this.getGoatMoves(piece.getX, piece.getY)
        }
    }



    getGoatMoves(row = -1, col = -1){
        const moves = new Set()

        if(row === -1){
            for(const row = 0; row < this.row; row++){
                for(const col = 0; col < this.col; col++){
                    if(this.board[row][col] === 0)
                        moves.add(Point(row, col))
                }
            }
        }else{
            const allMoves = this.getCommonMoves(row, col)

            for(const move of allMoves){
                if(this.board[move.getX][move.getY] === 0)
                    moves.add(move)
            }
        }

        return moves
    }


    getBaghMoves(row, col){
        const allMoves = self.getCommonMoves(row, col)
        const moves = new Set()


        for(const move of allMoves){
            if(this.board[move.getX][move.getY] === 0)
                moves.add(move)

            else if(this.board[move.getX][move.getY].getName === "goat"){
                const goatRow = move.getX
                const goatCol = move.getY
                const rowToAdd = goatRow + (goatRow - row)
                const colToAdd = goatCol + (goatCol - col)

                if(rowToAdd >= 0 && rowToAdd < this.row && colToAdd >= 0 && colToAdd < this.col){
                    if(this.board[rowToAdd][colToAdd] === 0){
                        moves.add(move)
                    }
                }

                
            }
        }

        return moves
    }

    getCommonMoves(row, col){
        const moves = new Set()

        const adjacentDirections = new Set([[-1, 0], [0, -1], [1, 0], [0, 1]])
        const diagonalDirections = new Set([[-1, -1], [1, -1], [1, 1], [-1, 1]])

        for(const element of adjacentDirections){
            rowToAdd = row + element[0]
            colToAdd = col + element[1]

            if(rowToAdd >= 0 && rowToAdd < this.row && colToAdd >= 0 && colToAdd < this.col){
                moves.add(Point(rowToAdd, colToAdd))
            }
        }

        if((row + col)%2 === 0){
            for(const element of diagonalDirections){
                rowToAdd = row + element[0]
                colToAdd = col + element[1]
            }

            if(rowToAdd >= 0 && rowToAdd < this.row && colToAdd >= 0 && colToAdd < this.col){
                moves.add(Point(rowToAdd, colToAdd))
            }
        }

        return moves
    }

    checkTrappedBaghs(){
        this.trappedBaghs = 0

        for(const row = 0; row < this.row; row++){
            for(const col = 0; col < this.col; col++){
                const piece = self.board[row][col]

                if(piece != 0 && piece.getName === "bagh" ){
                    const moves = this.getBaghMoves(row, col)
                    if(moves.size <= 0) this.trappedBaghs++
                }
            }
        }
    }

    isGameOver(){
        if(self.trappedBaghs >= 4 || self.killedGoats >= 5)
            return true

        return false
    }

    printBoard(){
        
    }


}

module.exports = Board