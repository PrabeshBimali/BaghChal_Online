const RedisClient = require('../../config/cache')
const getAllLobbies = require('./getAllLobbies')


// const getAllLobbies = async (pattern) => {
//     const lobbyKeys = await RedisClient.keys(pattern)

//     let redisCommands = lobbyKeys.map(async (val) => {
//         return await RedisClient.hgetall(val)
//     })

//     return Promise.all(redisCommands)
// }

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
    try{
        if(isDataValid(data)){
            if(socket.request.session.user){
    
                const { username, id } = socket.request.session.user
    
                await RedisClient.hset(
                    `userlobby:${id}`,
                    'username', `${username}`,
                    'userid', id,
                    'side', `${data.side}`, 
                    'type', `${data.type}`
                )

                await RedisClient.expire(`userlobby:${id}`, 30)
    
                let lobbies = await getAllLobbies(socket)
                console.log(lobbies)
                await io.in('userlobby').emit("lobby_update", lobbies)

                setTimeout(async ()=>{
                    let lobbies = await getAllLobbies(socket)
                    await io.in('userlobby').emit("lobby_update", lobbies)
                }, 30000)


    
            }else{
                // TODO
            }
        }else{
            // TODO
        }
    }catch(error){
        console.log("Error while creating lobby:")
        console.log(error)
    }
    
}

module.exports = onCreateLobby