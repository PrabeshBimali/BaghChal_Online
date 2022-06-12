const db = require("../config/db")

async function createNewForum(req, res){
    try{
        const { id } = req.session.user
        const { title, markup } = req.body

        const query = 'INSERT INTO discussions (title, description, userid) values($1, $2, $3)'
        await db.query(query, [title, markup, id])

        return res.status(200).json({error: false, payload: {
            message: "Forum Saved!"
        }})


    }catch(error){
        console.log('Error while creating new forum:')
        console.log(error)
        return res.status(500).json({error: true, message: "Internal server Error"})
    }
}


async function getAllForums(req, res){
    try{
        const query = `Select forumid, title, replies, likes, substring(cast(datecreated as text), 1,  10) as datecreated, username 
		from discussions inner join users
		on discussions.userid = users.userid
		order by datecreated desc`

        const forums = await db.query(query)

        if(forums.rowCount <= 0){
            return res.status(204).json({error: false, payload: {message: "No content"}})
        }

        return res.status(200).json({error: false, payload: {
            forums: forums.rows
        }})
        
    }catch(error){
        console.log('Error while selecting forums:')
        console.log(error)
        return res.status(500).json({error: true, message: "Internal server Error"})
    }
}

async function getMyForums(req, res){
    try{

        const {id} = req.session.user

        const query = `Select forumid, title, replies, likes, substring(cast(datecreated as text), 1,  10) as datecreated, username 
		from discussions inner join users
		on discussions.userid = users.userid where discussions.userid = $1
		order by datecreated desc`

        const forums = await db.query(query, [id])

        if(forums.rowCount <= 0){
            return res.status(204).json({error: false, payload: {message: "No content"}})
        }

        return res.status(200).json({error: false, payload: {
            forums: forums.rows
        }})
        
    }catch(error){
        console.log('Error while selecting forums:')
        console.log(error)
        return res.status(500).json({error: true, message: "Internal server Error"})
    }
}


async function getForumDetail(req, res){
    try{

        console.log("Icoming")

        const { forumid } = req.query

        const query = `Select users.userid, forumid, title, description, replies, likes, substring(cast(datecreated as text), 1,  10) as datecreated, username 
		from discussions inner join users
		on discussions.userid = users.userid where forumid = $1`

        const forumDetails = await db.query(query, [forumid])


        if(forumDetails.rowCount <= 0){
            return res.status(204).json({error: false, payload: {message: "No content"}})
        }

        const data = forumDetails.rows[0]

        return res.status(200).json({error: false, payload: { ...data }})

    }catch(error){
        console.log('Error while fetching forum details')
        console.log(error)
        return res.status(500).json({error: true, message: "Internal server error"})
    }
}


async function deleteForum(req, res){
    try{
        const {forumid} = req.query
        const {id} =req.session.user

        const firstQuery = `SELECT userid FROM discussions where forumid=$1`
        const userIdRow = await db.query(firstQuery, [forumid])

        if(userIdRow.rowCount > 0){
            const userid =  userIdRow.rows[0].userid

            if(userid === id){
                const secondQuery = `DELETE FROM discussions WHERE forumid=$1`
                await db.query(secondQuery, [forumid])
                return res.status(200).json({error: false, payload: {message: "Forum Deleted"}})
            }else{
                return res.status(400).json({error: true, message: 'cannot delete others\' forums'})
            }

        }else{
            return res.status(400).json({error: true, message: "Forum does not exist"})
        }
        
    }catch(error){
        console.log("Error While Deleting forum")
        console.log(error)
        return res.status(500).json({error: true, message: "Internal server error"})
    }
}

module.exports = {createNewForum, getAllForums, getMyForums, getForumDetail, deleteForum}