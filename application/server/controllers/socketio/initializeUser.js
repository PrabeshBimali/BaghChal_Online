const RedisClient = require("../../config/cache")
const getAllLobbies = require('./getAllLobbies')

const initializeUser = async (io, socket)=>{
    try{
        if(socket.request.session.user){
            socket.user = { ...socket.request.session.user }
            await socket.join('userlobby')
            await socket.join(socket.user.id)
            const lobbies = await getAllLobbies(socket)
            await io.in('userlobby').emit("lobby_update", lobbies) 

            let privateLobbies = await getAllPrivateLobbies(socket.user.id);

            let actualLobbies = privateLobbies.filter(val => val.username)

            await io.in(socket.user.id).emit("private_lobby_update", actualLobbies);

        }else{
            return
        }
    
        await RedisClient.hset(
            `user:${socket.user.id}`,
            'username', socket.user.username, 
            'connected', true,
            'userid', socket.user.id,
            'gameid', null
        )

    }catch(error){
        console.log('Error while initializing user on socket.io:')
        console.log(error)
    }
    
}

async function getAllPrivateLobbies(id){
    const lobbyKeys = await RedisClient.smembers(`invites:${id}`)
    let redisCommands = lobbyKeys.map(async (val) => {
        return await RedisClient.hgetall(val)
    })

    return Promise.all(redisCommands)
}


module.exports = initializeUser