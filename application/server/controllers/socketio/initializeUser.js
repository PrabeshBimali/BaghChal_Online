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

module.exports = initializeUser