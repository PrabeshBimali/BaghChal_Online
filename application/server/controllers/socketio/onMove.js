const {move} = require('../baghchal/board')

async function onMove(io, socket, data){
    try{
        //console.log(data.boardState)
        const dataToSend = move(data.selectedPiece, data.destination, data.boardState, data.unusedGoats, data.killedGoats)
        io.in(data.gameId).emit('move', dataToSend)

    }catch(error){
        console.log('Error while moving')
        console.log(error)
    }
}

module.exports = onMove