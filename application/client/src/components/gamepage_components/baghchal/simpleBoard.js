const Piece = require('./piece')
const deepcopy = require('deepcopy')

class Board{
    constructor(board, killedGoats, unusedGoats, trappedBaghs){
        this.board = []
        this.killedGoats = killedGoats
        this.trappedBaghs = trappedBaghs
        this.unusedGoats = unusedGoats
        this.row = 5
        this.col = 5
        this.createBoard(board)

    }

    createBoard(board){
        for(let row = 0; row < this.row; row++){
            this.board.push([])
            for(let col = 0; col < this.col; col++){
                if(board[row][col] === 0){
                    this.board[row].push(0)
                }else{
                    this.board[row].push(deepcopy(board[row][col]))
                }
            }
        }
    }

    move(piece, toPosition){
        const fromRow = piece.x
        const fromCol = piece.y
        const toRow = toPosition[0]
        const toCol = toPosition[1]

        if(fromRow === -1){
            this.board[toRow][toCol] = new Piece("goat", toRow, toCol)
            this.unusedGoats++
        }else{
            if(this.board[fromRow][fromCol].name === "bagh"){
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
           this.board[toRow][toCol] = deepcopy(piece)
        }

        this.checkTrappedBaghs()


    }

    getValidMoves(piece){
        if(piece.name === "bagh"){
            return this.getBaghMoves(piece.x, piece.y)
        }else if(piece.name === "goat"){
            return this.getGoatMoves(piece.x, piece.y)
        }
    }



    getGoatMoves(row = -1, col = -1){
        const moves = new Set()
        if(row === -1){
            for(let row = 0; row < this.row; row++){
                for(let col = 0; col < this.col; col++){
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
            if(this.board[move[0]][move[1]] === 0)
                moves.add(move)

            else if(this.board[move[0]][move[1]].name === "goat"){
                const goatRow = move[0]
                const goatCol = move[1]
                const rowToAdd = goatRow + (goatRow - row)
                const colToAdd = goatCol + (goatCol - col)

                if(rowToAdd >= 0 && rowToAdd < this.row && colToAdd >= 0 && colToAdd < this.column){
                    if(this.board[rowToAdd][colToAdd] === 0){
                        moves.add([rowToAdd, colToAdd])
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

            if(rowToAdd >= 0 && rowToAdd < this.row && colToAdd >= 0 && colToAdd < this.col){
                moves.add([rowToAdd, colToAdd])
            }
        }

        if((row + col)%2 === 0){
            let rowToAdd = 0
            let colToAdd = 0

            for(const element of diagonalDirections){
                rowToAdd = row + element[0]
                colToAdd = col + element[1]

                if(rowToAdd >= 0 && rowToAdd < this.row && colToAdd >= 0 && colToAdd < this.col){
                    moves.add([rowToAdd, colToAdd])
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

                if(piece !== 0 && piece.name === "bagh" ){
                    const moves = this.getBaghMoves(row, col)
                    if(moves.size <= 0) this.trappedBaghs++
                }
            }
        }
    }

    isGameOver(){
        if(this.trappedBaghs >= 4 || this.killedGoats >= 5){
            return true
        }

        return false
    }

    isRowColExist(row, col, commonMoves){
        for(let val of commonMoves){
            if(val[0] === row && val[1] === col) return true
        }

        return false
    }

    findWinner(){
        if(this.trappedBaghs >= 4){
            return "goat"
        }else if(this.killedGoats >= 5){
            return "bagh"
        }
    
        return ""
    }

    generateAllMoves(piece_name){
        let moves = []

        if(piece_name === "goat"){
            if(this.unusedGoats > 0){
                let possible_moves = this.getGoatMoves()
                for(let move of possible_moves){
                    moves.push([new Piece("goat", -1, -1), [move[0], move[1]]])
                }
            }else{
                for(let row = 0; row < this.row; row++){
                    for(let col = 0; col < this.column; col++){
                        let piece = this.board[row][col]

                        if(piece !== 0){
                            if(piece.name === "goat"){
                                let possible_moves = this.getValidMoves(piece)

                                for(let move of possible_moves){
                                    moves.push([deepcopy(piece), [move[0], move[1]]])
                                }
                            }
                        }
                    }
                }
            }
        }else if(piece_name === "bagh"){


            for(let row = 0; row < this.row; row++){
                for(let col = 0; col < this.col; col++){
                    let piece = this.board[row][col]

                    if(piece !== 0){
                        if(piece.name === "bagh"){
                            let possible_moves = this.getValidMoves(piece)
                            for(let move of possible_moves){
                                moves.push([deepcopy(piece), [move[0], move[1]]])
                            }
                        }
                    }
                }
            }
        }
        return moves

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
                    if(this.board[i][j].name === 'bagh'){
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