const RedisClient = require("../../config/cache")

async function onChat(io, socket, data){

    try{
        if(socket.request.session.user){
            const key = `chat:${data.gameId}`
            const dataToSave = `${data.username}:${data.chatData}`

            await RedisClient.rpush(key, dataToSave)

            const dataToSend = await RedisClient.lrange(key, 0, -1)


            io.in(data.gameId).emit('chat', dataToSend)
        }

    }catch(error){
        console.log("Error while Chatting!")
        console.log(error.message)
    }
    
}

module.exports = onChat