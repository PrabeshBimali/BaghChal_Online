const RedisClient = require("../../config/cache")

const onDisconnect = async (socket) => {
    if(socket.request.session.user){
        const { id } = socket.request.session.user

        await RedisClient.hset(
            `user:${id}`,
            "connected", false
        )

    }
}

module.exports  = onDisconnect