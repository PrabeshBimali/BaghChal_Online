import Board from "./simpleBoard"

const INF = 10000000

export default class Ai{
    constructor(){
        this.depth = 5
    }

    staticEvaluation(board){
        const end = board.isGameOver()

        if(!end){
            return 2.25 * board.trappedBaghs - 1.8 * board.killedGoats
        }


        const winner = board.findWinner()

        if(winner === "goat"){
            return INF
        }else if(winner === "bagh"){
            return -INF
        }else{
            return 0
        }
    }


    minimax(board, depth, maxPlayer, alpha=-INF, beta=INF){
        if(depth === 0 || board.isGameOver()){
            return [0, this.staticEvaluation(board)]
        }

        if(maxPlayer){
            let maxEval = -INF * 10
            let bestMove = 0


            let allMoves = board.generateAllMoves("goat")

            for(let move of allMoves){
                let tmpBoard = Object.assign(Object.create(Object.getPrototypeOf(board)), board)
                tmpBoard.move(move[0], move[1])

                const eval_ = this.minimax(tmpBoard, depth-1, false, alpha, beta)[1]

                if(eval_ > maxEval){
                    maxEval = eval_
                    bestMove = move
                }

                alpha = Math.max(alpha, eval_)

                if(beta < alpha){
                    break
                }
            
            return [bestMove, maxEval]
            }
        }else{
            let minEval = INF * 10
            let bestMove = 0


            for(let move of board.generateAllMoves("bagh")){
                console.log("happens")
                let tmpBoard = Object.assign(Object.create(Object.getPrototypeOf(board)), board)
            
                tmpBoard.move(move[0], move[1])

                const eval_ = this.minimax(tmpBoard, depth-1, true, alpha, beta)[1]

                if(eval_ < minEval){
                    minEval = eval_
                    bestMove = move
                }

                beta = Math.max(beta, eval_)

                if(beta <= alpha){
                    break
                }


            return [bestMove, minEval]
            
            }
        }    
    }

    bestBaghMoves(board){
        
        return this.minimax(board, this.depth, false)[0]
    }

    bestGoatMoves(board){

        return this.minimax(board, this.depth, true)[0]
    }

    getBestMoves(board, killedGoats, unusedGoats, trappedBaghs, turn){
        let simpleBoard = new Board(board, killedGoats, unusedGoats, trappedBaghs)
        if(turn === "goat"){
            return this.bestGoatMoves(simpleBoard)
        }else{
            return this.bestBaghMoves(simpleBoard)
        }
    }
}


