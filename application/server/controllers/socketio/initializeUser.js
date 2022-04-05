const RedisClient = require("../../config/cache")
const onGetLobbies = require("./onGetLobbies")

const initializeUser = async (io, socket)=>{
    try{
        if(!socket.request.session.user){
       
        }else{
            socket.user = { ...socket.request.session.user }
            await socket.join('userlobby')
            await socket.join(socket.user.id)
            await onGetLobbies(io, socket)
            
        }
    
        await RedisClient.hset(
            `user:${socket.user.id}`,
            'username', socket.user.username, 
            'connected', true
        )
    }catch(error){
        console.log('Error while initializing user on socket.io:')
        console.log(error)
    }
    
}

module.exports = initializeUser