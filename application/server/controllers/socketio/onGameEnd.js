const RedisClient = require("../../config/cache")
const db = require('../../config/db')

async function onGameEnd(io, socket, data){
    try{
        if(socket.request.session.user){
            const {id, username} = socket.request.session.user

            const {gameId, winner} = data

            const gameInfo = await RedisClient.hgetall(`game:${gameId}`)

            if(gameInfo === undefined) return;

            if(gameInfo.type.toLowerCase() === "casual"){

                await RedisClient.del(`game:${gameId}`)
                return

            }else if(gameInfo.type.toLowerCase() === "ranked"){
                let win = 0

                if(id === gameInfo.creatorid){
                    if(winner.toLowerCase() === gameInfo.creatorside){
                        win = 1
                    }

                    const queryString = `Insert into games(side, opponentname, win, userid, gametime) 
                    values($1, $2, $3, $4, $5)`

                    await db.query(queryString, [gameInfo.creatorside, gameInfo.opponentusername, win, id, gameInfo.time])
                    //await RedisClient.del(`game:${gameId}`)


                }else if(id === gameInfo.opponentid){
                    if(winner.toLowerCase() === gameInfo.opponentside){
                        win = 1
                    }

                    const queryString = `Insert into games(side, opponentname, win, userid, gametime) 
                    values($1, $2, $3, $4, $5)`

                    await db.query(queryString, [gameInfo.opponentside, gameInfo.creatorusername, win, id, gameInfo.time])

                }

                setTimeout(async ()=>{
                    await RedisClient.del(`game:${gameId}`)
                }, 120000)
            
            }
        }
    }catch(error){
        console.log("Error while ending the game")
        console.log(error.message)
    }
    
}

module.exports = onGameEnd