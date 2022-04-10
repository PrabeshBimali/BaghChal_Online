const RedisClient = require('../../config/cache')

const getAllLobbiesPromise = async (pattern) => {
    const lobbyKeys = await RedisClient.keys(pattern)

    let redisCommands = lobbyKeys.map(async (val) => {
        return await RedisClient.hgetall(val)
    })

    return Promise.all(redisCommands)
}

async function getAllLobbies(socket){
    try{

        if(socket.request.session.user){
            
            const lobbies = await getAllLobbiesPromise('userlobby*')
            return lobbies
            
        }

    }catch(error){
        console.log('Error while fetching lobbies')
        console.log(error)
        return res.statue(500).json({error: true, message: 'Error in server'})
    }
}

module.exports = getAllLobbies