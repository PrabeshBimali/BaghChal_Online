const RedisClient = require('../../config/cache')
const getAllLobbies = require('./getAllLobbies')


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

                const time = new Date()
                const hours = time.getHours()
                const minutes = time.getMinutes()
                
                let newHrs = hours.toString()
                let newMinutes = minutes.toString()

                if(newHrs.length === 1){
                    newHrs = `0${newHrs}`
                }

                if(newMinutes.length === 1){
                    newMinutes = `0${newMinutes}`
                }

                const currentTime = `${newHrs}:${newMinutes}`
    
                await RedisClient.hset(
                    `userlobby:${id}`,
                    'username', `${username}`,
                    'userid', id,
                    'side', `${data.side}`, 
                    'type', `${data.type}`,
                    'currenttime', `${currentTime}`
                )

                await RedisClient.expire(`userlobby:${id}`, 120)
    
                let lobbies = await getAllLobbies(socket)
                await io.in('userlobby').emit("lobby_update", lobbies)

                setTimeout(async ()=>{
                    let lobbies = await getAllLobbies(socket)
                    await io.in('userlobby').emit("lobby_update", lobbies)
                }, 120000)


    
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