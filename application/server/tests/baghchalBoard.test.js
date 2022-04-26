const Board = require('../baghchal/board')
const Piece = require('../baghchal/piece')

let board = new Board()

board.printBoard()


board.board[3][3] = new Piece('goat', 3, 3)
board.board[2][2] = new Piece('goat', 2, 2)


board.printBoard()

console.log(board.getBaghMoves(4, 4))
board.move(board.board[4][4], [4, 3])
board.printBoard()
console.log(board.board[4][3])
board.move(board.board[4][3], [4,2])

board.board[3][3] = new Piece('goat', 3, 3)
board.printBoard()
// console.log(board.getGoatMoves())

