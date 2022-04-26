const Piece = require('./piece')

const ROW = 5
const COL = 5


export function createBoard(){
    const board = []

    for(let row = 0; row < ROW; row++){
    board.push([])
        for(let col = 0; col < COL; col++){
            if(row === 0 || row === ROW - 1){
                if(col === 0 || col === COL - 1){
                    board[row].push(new Piece("bagh", row, col))
                }else{
                    board[row].push(0)
                }
            }else{
                board[row].push(0)
            }
        }
    }

    return board
}


export function getValidMoves(piece, board){
    if(piece.name === "bagh"){
        return getBaghMoves(piece.x, piece.y, board)
    }else if(piece.name === "goat"){
        return getGoatMoves(piece.x, piece.y, board)
    }
}



function getGoatMoves(row = -1, col = -1, board){
    const moves = new Set()

    if(row === -1){
        for(let row = 0; row < ROW; row++){
            for(let col = 0; col < COL; col++){
                if(board[row][col] === 0)
                    moves.add([row, col])
            }
        }
    }else{
        const allMoves = getCommonMoves(row, col, board)

        for(let move of allMoves){
            if(board[move[0]][move[1]] === 0)
                moves.add(move)
        }
    }

    return moves
}


function getBaghMoves(row, col, board){
    const allMoves = getCommonMoves(row, col, board)
    const moves = new Set()


    for(const move of allMoves){
        if(board[move[0]][move[1]] === 0)
            moves.add(move)

        else if(board[move[0]][move[1]].name === "goat"){
            const goatRow = move[0]
            const goatCol = move[1]
            const rowToAdd = goatRow + (goatRow - row)
            const colToAdd = goatCol + (goatCol - col)

            if(rowToAdd >= 0 && rowToAdd < ROW && colToAdd >= 0 && colToAdd < COL){
                if(board[rowToAdd][colToAdd] === 0){
                    moves.add([rowToAdd, colToAdd])
                }
            }

            
        }
    }

    return moves
}


function getCommonMoves(row, col){
    const moves = new Set()

    const adjacentDirections = new Set([[-1, 0], [0, -1], [1, 0], [0, 1]])
    const diagonalDirections = new Set([[-1, -1], [1, -1], [1, 1], [-1, 1]])

    for(const element of adjacentDirections){
        let rowToAdd = row + element[0]
        let colToAdd = col + element[1]

        if(rowToAdd >= 0 && rowToAdd < ROW && colToAdd >= 0 && colToAdd < COL){
            moves.add([rowToAdd, colToAdd])
        }
    }

    if((row + col)%2 === 0){
        let rowToAdd = 0
        let colToAdd = 0

        for(const element of diagonalDirections){
            rowToAdd = row + element[0]
            colToAdd = col + element[1]

            if(rowToAdd >= 0 && rowToAdd < ROW && colToAdd >= 0 && colToAdd < COL){
                moves.add([rowToAdd, colToAdd])
            }
        }

        
    }

    return moves
}


function isRowColExist(row, col, commonMoves){
    for(let val of commonMoves){
        if(val[0] === row && val[1] === col) return true
    }

    return false
}

export function move(piece, toPosition, board){

    const boardCopy = [...board]
    const fromRow = piece.x
    const fromCol = piece.y
    const toRow = toPosition[0]
    const toCol = toPosition[1]

    if(fromRow === -1){
        piece.x = toRow
        piece.y = toCol
        boardCopy[toRow][toCol] = piece
    }else{
        if(boardCopy[fromRow][fromCol].name === "bagh"){
            const commonMoves = getCommonMoves(fromRow, fromCol, boardCopy);

            if(!isRowColExist(toRow, toCol, commonMoves)){
                const goatRow = Math.floor((toRow + fromRow)/2)
                const goatCol = Math.floor((toCol + fromCol)/2)
                board[goatRow][goatCol] = 0
            }
            
        }

       boardCopy[fromRow][fromCol] = 0
       piece.x = toRow
       piece.y = toCol
       boardCopy[toRow][toCol] = piece
    }

    return boardCopy
}




