const RedisClient = require("../../config/cache")
const uuid = require('uuid')

const initializeUser = async (socket)=>{
    if(!socket.request.session.user){
        if(socket.request.session && socket.request.session.anonuser){
            socket.user = { ...socket.request.session.anonuser }
        }else{
            socket.request.session.anonuser = {}
            socket.request.session.anonuser.username = "Anonymous"
            socket.request.session.anonuser.id = uuid.v4()
            socket.user = { ...socket.request.session.anonuser }
        }

        socket.join('anonlobby')

    }else{
        socket.user = { ...socket.request.session.user }
        console.log("joined userlobby")
        socket.join('userlobby')
    }

    socket.join(socket.user.id)

    await RedisClient.hset(
        `user:${socket.user.id}`,
        'username', socket.user.username, 
        'connected', true
    )
}

module.exports = initializeUser