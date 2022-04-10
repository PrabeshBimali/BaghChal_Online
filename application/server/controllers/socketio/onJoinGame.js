const { v4 } = require('uuid')
const RedisClient = require('../../config/cache')

async function onJoinGame(io, socket, data){
    try {

        const randomRoom = v4()

        if(socket.request.session.user){
            const {id} = socket.request.session.user

            if(id !== data.userid){

                await io.in(id).emit("join_game", randomRoom)
                await io.in(data.userid).emit("join_game", randomRoom)

                await RedisClient.del(`userlobby:${data.userid}`)
                
            }

           
        }
        
    } catch (error) {
        console.log('Error while joining game')
        console.log(error)
    }    
}

module.exports = onJoinGame