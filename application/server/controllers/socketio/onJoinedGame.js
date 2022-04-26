const RedisClient = require('../../config/cache')

async function onJoinedGame(io, socket, data){
    try{

        if(socket.request.session.user){
            console.log(data)
            const gameId = data
            const  { username, id } = socket.request.session.user

            const gameInfo = await RedisClient.hgetall(`game:${data}`)

            const dataToSend = {}

            dataToSend.killedGoats = 0
            dataToSend.trappedTigers = 0
            dataToSend.unusedGoats = 20

            if(id === gameInfo.creatorid){
                dataToSend.yourSide = gameInfo.creatorside
                dataToSend.opponentName = gameInfo.opponentusername
                dataToSend.opponentSide = gameInfo.opponentside

                await socket.join(gameId)
            }
            else if(id === gameInfo.opponentid){
                dataToSend.yourSide = gameInfo.opponentside
                dataToSend.opponentName = gameInfo.creatorusername
                dataToSend.opponentSide = gameInfo.creatorside

                await socket.join(gameId)
            }

            await io.in(id).emit('joined_game', dataToSend)

        }
        


    }catch(error){
        console.log(`ERROR after user joined the game`)
        console.log(error)
    }
}


module.exports = onJoinedGame