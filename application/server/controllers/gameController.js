const db = require('../config/db')

async function getAllGames(req, res){
    try{
        const {id} = req.session.user

        const query = `select side, opponentname, win, substring(cast(gamedate as text), 1,  10) as gamedate, gametime from games
                        where userid=$1`
        const data = await db.query(query, [id])

        return res.status(200).json({error: false, payload: {games: [...data.rows]}})

    }catch(error){
        console.log("Error while retreiving games")
        console.log(error.message)
        return res.status(500).json({error: true, message: "Internal server Error"})
    }
}


module.exports = {getAllGames}