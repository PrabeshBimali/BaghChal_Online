const db = require("../config/db")
const crypto = require("crypto")

async function postReply(req, res){
    try{
        const {id} = req.session.user
        const {replyValue, forumid} = req.body

        if(replyValue.length === undefined){
            return res.status(400).json({error: true, message: "Please write something"})
        }

        let data = replyValue.trim()

        if(data.length < 10){
            return res.status(400).json({error: true, message: "Reply should be at least 3 characters long"})
        }

        if(data.length > 10000){
            return res.status(400).json({error: true, message: "reply should be less than 10000 characters"})
        }

        const query1 = `select * from discussions where forumid=$1`
        const forumDetails = await db.query(query1, [forumid])

        if(forumDetails.rowCount <= 0){
            return res.status(400).json({error: true, message: "Discussion does not exist"})
        }

        const repliesid = crypto.randomBytes(16).toString('hex')

        const query = `Insert into replies(repliesid, markup, forumid) values($1, $2, $3)`
        await db.query(query, [repliesid, data, forumid])


        const query2 = `Insert into user_reply(userid, repliesid) values($1, $2)`
        await db.query(query2, [id, repliesid])

        const replies = forumDetails.rows[0].replies + 1

        const query3 = `update discussions set replies=$1 where forumid=$2`
        await db.query(query3, [replies, forumid])



        return res.status(200).json({error: false, payload: {message: "Reply posted!"}})
    }catch(error){
        console.log("Error while posting reply")
        console.log(error.message)
        return res.status(500).json({error: true, message: "Internal server error"})
    }
}

async function getRepliesById(req, res){
    try{

        const {forumid} = req.query

        const query = `select replies.repliesid, username, markup, substring(cast(datecreated as text), 1,  10) as datecreated, user_reply.userid from replies 
        inner join user_reply on replies.repliesid = user_reply.repliesid
        inner join users on user_reply.userid = users.userid 
        where forumid = $1 order by datecreated desc;`


        const commentsDetails = await db.query(query, [forumid])

        const replies = commentsDetails.rows

        return res.status(200).json({error: false, payload: {replies: [...replies]}})

    }catch(error){
        console.log("Error while fetching replies:")
        console.log(error.message)
        return res.status(500).json({error: true, message: "Internal server error"})
    }
}


async function deleteReply(req, res){
    try{
        const {repliesid, forumid} = req.query

        const {id} = req.session.user
        
        const query1 = `Select * from user_reply where repliesid=$1 and userid=$2`
        const rows = await db.query(query1, [repliesid, id])

        if(rows.rowCount > 0){
            const query2 = `Delete from replies where repliesid=$1`
            await db.query(query2, [repliesid])

            const query3 = `select replies from discussions where forumid=$1`
            const blogCommentsArray = await db.query(query3, [forumid])

            const blogComments = blogCommentsArray.rows[0].replies - 1

            const query4 = `update discussions set replies=$1 where forumid=$2`
            await db.query(query4, [blogComments, forumid])

            return res.status(200).json({error: false, payload: {message: "comment deleted"}})
        }else{
            return res.status(400).json({error: true, message: "cannot delete comment"})
        }


    }catch(error){
        console.log('Error while deleting reply')
        console.log(error.message)
        return res.status(500).json({error: true, message: "Internal server error"})
    }
}

module.exports = {postReply, getRepliesById, deleteReply}