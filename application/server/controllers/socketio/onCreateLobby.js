const RedisClient = require('../../config/cache')



const getAllLobbies = async (pattern) => {
    const lobbyKeys = await RedisClient.keys(pattern)

    let redisCommands = lobbyKeys.map(async (val) => {
        return await RedisClient.hgetall(val)
    })

    return Promise.all(redisCommands)
}

const isDataValid = (data) => {
    if(data){
        if((data.side === "Bagh" || data.side === "Goat") 
        && (data.type === "Ranked" || data.type === "Casual")){
            return true
        }
    }

    return false
}

const onCreateLobby = async (io, socket, data) => {
    if(isDataValid(data)){
        if(socket.request.session.user){

            const { username, id } = socket.request.session.user

            await RedisClient.hset(
                `userlobby:${id}`,
                'username', `${username}`,
                'side', `${data.side}`, 
                'type', `${data.type}`
            )

            const lobbies = await getAllLobbies('userlobby*')
            console.log(lobbies)
            await io.in('userlobby').emit("lobby_created", lobbies)

        }else{
            // TODO
        }
    }else{
        // TODO
    }
}

module.exports = onCreateLobby