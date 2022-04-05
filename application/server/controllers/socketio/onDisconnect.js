const RedisClient = require("../../config/cache")

const onDisconnect = async (socket) => {
    try{
        if(socket.request.session.user){
            const { id } = socket.request.session.user
    
            await RedisClient.hset(
                `user:${id}`,
                "connected", false
            )
    
        }
    }catch(error){
        console.log('Error while Disconnecting from socket:')
        console.log(error)
    }
    
}

module.exports  = onDisconnect