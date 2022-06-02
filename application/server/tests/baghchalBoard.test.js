const Board = require('../controllers/baghchal/board2')
const Piece = require('../controllers/baghchal/piece')

let board = new Board()




// board.printBoard()
// console.log(" ")
board.board[3][3] = new Piece('goat', 3, 3)
board.printBoard()
console.log("")
board.move(board.board[4][4], [2, 2])
console.log(" ")
board.printBoard()
console.log(" ")

// console.log(board.getBaghMoves(4, 4,))
// console.log(" ")


//board.printBoard()

// console.log(board.getBaghMoves(4, 4))
// board.move(board.board[4][4], [4, 3])
// board.printBoard()
// console.log(board.board[4][3])
// board.move(board.board[4][3], [4,2])

// board.board[3][3] = new Piece('goat', 3, 3)
// board.printBoard()
// // console.log(board.getGoatMoves())

