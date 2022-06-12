const { v4 } = require('uuid')
const RedisClient = require('../../config/cache')

async function onJoinGame(io, socket, data){
    try {

        const randomRoom = v4()

        if(socket.request.session.user){
            const {id, username} = socket.request.session.user

            if(id !== data.userid){

                let opponentSide

                if(data.side.toLowerCase() === 'bagh'){
                    opponentSide = 'goat'
                }else{
                    opponentSide = 'bagh'
                }

                const time = new Date()

                const hours = time.getHours()
                const minutes = time.getMinutes()

                await RedisClient.hset(
                    `game:${randomRoom}`,
                    'creatorid', `${data.userid}`,
                    'creatorusername', `${data.username}`,
                    'opponentid', `${id}`,
                    'opponentusername', `${username}`,
                    'creatorside', `${data.side.toLowerCase()}`,
                    'opponentside', `${opponentSide}`,
                    'type', `${data.type.toLowerCase()}`,
                    'time', `${hours}:${minutes}`,
                    'ex', 3600
                )

                await io.in(id).emit("join_game", randomRoom)
                await io.in(data.userid).emit("join_game", randomRoom)


                await RedisClient.del(`userlobby:${data.userid}`)
                await RedisClient.del(`userlobby:${id}`)
                await RedisClient.del(`privatelobby:${data.userid}`)
                await RedisClient.del(`privatelobby:${id}`)


                await RedisClient.srem(`invites:${id}`, `privatelobby:${data.userid}`)

                
            }

           
        }
        
    } catch (error) {
        console.log('Error while joining game')
        console.log(error)
    }    
}

module.exports = onJoinGame