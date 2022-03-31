const RedisClient = require('../../config/cache')


const getAllLobbies = async (pattern) => {
    const lobbyKeys = await RedisClient.keys(pattern)

    let redisCommands = lobbyKeys.map(async (val) => {
        return await RedisClient.hgetall(val)
    })

    return Promise.all(redisCommands)
}

async function onGetLoobbies(io, socket){
    if(socket.request.session.user){

        const { username, id } = socket.request.session.user

        const lobbies = await getAllLobbies('userlobby*')
        console.log(lobbies)
        await io.in(id).emit("get_lobbies", lobbies)

    }
}

module.exports = onGetLoobbies