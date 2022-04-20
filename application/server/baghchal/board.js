const Piece = require('./piece')
const Point = require('./point')

class Board{
    constructor(){
        this.board = Array()
        this.row = 5
        this.column = 5
        this.killedGoats = 0
        this.trappedBaghs = 0
        this.usedGoats = 0
        this.createBoard()
    }

    createBoard(){
        for(let row = 0; row < this.row; row++){
            this.board.push(Array())
            for(let col = 0; col < this.column; col++){
                if(row === 0 || row === this.row - 1){
                    if(col === 0 || col === this.column - 1){
                        this.board[row].push(new Piece("bagh", row, col))
                    }else{
                        this.board[row].push(0)
                    }
                }else{
                    this.board[row].push(0)
                }
            }
        }
    }

    move(piece, toPosition){
        const fromRow = piece.getX
        const fromCol = piece.getY
        const toRow = toPosition.getX
        const toCol = toPosition.getY

        if(fromRow === -1){
            this.board[toRow][toCol].getName = "goat"
            this.usedGoats++
        }else{
            if(this.board[fromRow][fromCol].getName === "bagh"){
                const commonMoves = this.getCommonMoves(fromRow, fromCol);

                if(!this.isRowColExist(toRow, toCol, commonMoves)){
                    const goatRow = Math.floor((toRow + fromRow)/2)
                    const goatCol = Math.floor((toCol + fromCol)/2)
                    this.board[goatRow][goatCol] = 0
                    this.killedGoats++
                }
                
            }

           this.board[fromRow][fromCol] = 0
           piece.x = toRow
           piece.y = toCol
           this.board[toRow][toCol] = piece
        }

        this.checkTrappedBaghs()


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
            for(let row = 0; row < this.row; row++){
                for(let col = 0; col < this.column; col++){
                    if(this.board[row][col] === 0)
                        moves.add([row, col])
                }
            }
        }else{
            const allMoves = this.getCommonMoves(row, col)

            for(let move of allMoves){
                if(this.board[move[0]][move[1]] === 0)
                    moves.add(move)
            }
        }

        return moves
    }


    getBaghMoves(row, col){
        const allMoves = this.getCommonMoves(row, col)
        const moves = new Set()


        for(const move of allMoves){
            if(this.board[move.getX][move.getY] === 0)
                moves.add(move)

            else if(this.board[move.getX][move.getY].getName === "goat"){
                const goatRow = move.getX
                const goatCol = move.getY
                const rowToAdd = goatRow + (goatRow - row)
                const colToAdd = goatCol + (goatCol - col)

                if(rowToAdd >= 0 && rowToAdd < this.row && colToAdd >= 0 && colToAdd < this.column){
                    if(this.board[rowToAdd][colToAdd] === 0){
                        moves.add(new Point(rowToAdd, colToAdd))
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
            let rowToAdd = row + element[0]
            let colToAdd = col + element[1]

            if(rowToAdd >= 0 && rowToAdd < this.row && colToAdd >= 0 && colToAdd < this.column){
                moves.add(new Point(rowToAdd, colToAdd))
            }
        }

        if((row + col)%2 === 0){
            let rowToAdd = 0
            let colToAdd = 0

            for(const element of diagonalDirections){
                rowToAdd = row + element[0]
                colToAdd = col + element[1]

                if(rowToAdd >= 0 && rowToAdd < this.row && colToAdd >= 0 && colToAdd < this.column){
                    moves.add(new Point(rowToAdd, colToAdd))
                }
            }

            
        }

        return moves
    }

    checkTrappedBaghs(){
        this.trappedBaghs = 0

        for(let row = 0; row < this.row; row++){
            for(let col = 0; col < this.col; col++){
                const piece = this.board[row][col]

                if(piece != 0 && piece.getName === "bagh" ){
                    const moves = this.getBaghMoves(row, col)
                    if(moves.size <= 0) this.trappedBaghs++
                }
            }
        }
    }

    isGameOver(){
        if(this.trappedBaghs >= 4 || this.killedGoats >= 5)
            return true

        return false
    }

    isRowColExist(row, col, commonMoves){
        for(let val of commonMoves){
            if(val.getX === row && val.getY === col) return true
        }

        return false
    }

    printBoard(){
        console.log(" ")
        for(let i = 0; i < this.row; i++){
            let row = ""
            for(let j = 0; j < this.column; j++){
                //console.log(this.board[i][j])
                if(this.board[i][j] === 0){
                    row += '_ '
                }else{
                    if(this.board[i][j].getName === 'bagh'){
                        row += 'B '
                    }else{
                        row += 'G '
                    }
                }
            }
            console.log(row)
        }
    }


}

module.exports = Board