const db = require('../config/db')
const crypto = require('crypto')

async function postComment(req, res){
    try{
        const {id} = req.session.user
        const {commentValue, blogId} = req.body

        if(commentValue.length === undefined){
            return res.status(400).json({error: true, message: "Please write something"})
        }

        let data = commentValue.trim()

        if(data.length < 3){
            return res.status(400).json({error: true, message: "Comment should be at least 3 characters long"})
        }

        if(data.length > 1000){
            return res.status(400).json({error: true, message: "Comment should be less than 1000 characters"})
        }

        const query1 = `select * from blogs where blogid=$1`
        const blogDetails = await db.query(query1, [blogId])

        if(blogDetails.rowCount <= 0){
            return res.status(400).json({error: true, message: "Blog does not exist"})
        }

        const commentid = crypto.randomBytes(16).toString('hex')

        const query = `Insert into blog_comments(commentid, commentdata, blogid) values($1, $2, $3)`
        await db.query(query, [commentid, data, blogId])


        const query2 = `Insert into user_comment(userid, commentid) values($1, $2)`
        await db.query(query2, [id, commentid])

        const blogComments = blogDetails.rows[0].blogcomments + 1

        const query3 = `update blogs set blogcomments=$1 where blogid=$2`
        await db.query(query3, [blogComments, blogId])



        return res.status(200).json({error: false, payload: {message: "comment posted!"}})

    }catch(error){
        console.log('Error while Posting new comment:')
        console.log(error)
        return res.status(500).json({error: true, message: "Internal server Error"})
    }
}


async function getCommentsById(req, res){
    try{

        const {blogId} = req.query

        const query = `select blog_comments.commentid, username, commentdata, substring(cast(datecreated as text), 1,  10) as datecreated, user_comment.userid from blog_comments 
        inner join user_comment on blog_comments.commentid = user_comment.commentid 
        inner join users on user_comment.userid = users.userid 
        where blogid = $1 order by datecreated desc;`


        const commentsDetails = await db.query(query, [blogId])

        const comments = commentsDetails.rows

        return res.status(200).json({error: false, payload: {comments: [...comments]}})

    }catch(error){
        console.log("Error while fetching comments:")
        console.log(error.message)
        return res.status(500).json({error: true, message: "Internal server error"})
    }
}


async function deleteComment(req, res){
    try{
        const {commentid, blogid} = req.query

        const {id} = req.session.user
        
        const query1 = `Select * from user_comment where commentid=$1 and userid=$2`
        const rows = await db.query(query1, [commentid, id])

        if(rows.rowCount > 0){
            const query2 = `Delete from blog_comments where commentid=$1`
            await db.query(query2, [commentid])

            const query3 = `select blogcomments from blogs where blogid=$1`
            const blogCommentsArray = await db.query(query3, [blogid])

            const blogComments = blogCommentsArray.rows[0].blogcomments - 1

            const query4 = `update blogs set blogcomments=$1 where blogid=$2`
            await db.query(query4, [blogComments, blogid])

            return res.status(200).json({error: false, payload: {message: "comment deleted"}})
        }else{
            return res.status(400).json({error: true, message: "cannot delete comment"})
        }


    }catch(error){
        console.log('Error while deleting comment')
        console.log(error.message)
        return res.status(500).json({error: true, message: "Internal server error"})
    }
}


module.exports = {postComment, getCommentsById, deleteComment}