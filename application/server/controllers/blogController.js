const db = require('../config/db')

async function createNewBlog(req, res){
    try{
        const { id } = req.session.user
        const { title, description, markup } = req.body
        const { filename } = req.file

        const query = 'INSERT INTO Blogs (title, description, markup, imagename, userid) values($1, $2, $3, $4, $5)'
        await db.query(query, [title, description, markup, filename, id])

        return res.status(200).json({error: false, payload: {
            message: "Blog Saved!"
        }})


    }catch(error){
        console.log('Error while creating new blog:')
        console.log(error)
        return res.status(500).json({error: true, message: "Internal server Error"})
    }
}


async function getAllBlogs(req, res){
    try{
        const query = `Select blogid, title, description, blogcomments, likes, datecreated, username 
		from blogs inner join users
		on blogs.userid = users.userid
		order by datecreated desc`

        const blogs = await db.query(query)

        if(blogs.rowCount <= 0){
            return res.status(204).json({error: false, payload: {message: "No content"}})
        }

        return res.status(200).json({error: false, payload: {
            blogs: blogs.rows
        }})
        
    }catch(error){
        console.log('Error while selecting blogs:')
        console.log(error)
        return res.status(500).json({error: true, message: "Internal server Error"})
    }
}


async function getMyBlogs(req, res){
    try{

        const { username } = req.session.user

        const query = `Select blogid, title, description, blogcomments, likes, datecreated, username 
		from blogs inner join users
		on blogs.userid = users.userid
        where users.username = $1
		order by datecreated desc`

        const blogs = await db.query(query, [username])

        if(blogs.rowCount <= 0){
            return res.status(204).json({error: false, payload: {message: "No content"}})
        }

        return res.status(200).json({error: false, payload: {
            blogs: blogs.rows
        }})

    }catch(error){
        console.log('Error while selecting my blogs')
        console.log(error)
        return res.status(500).json({error: true, message: "Internal server Error"})
    }
}

async function getBlogDetail(req, res){
    try{

        const { blogid } = req.query
        console.log(blogid)

        const query = `Select blogid, title, description, blogcomments, markup, likes, datecreated, username 
		from blogs inner join users
		on blogs.userid = users.userid where blogid = $1`

        const blogDetails = await db.query(query, [blogid])

        if(blogDetails.rowCount <= 0){
            return res.status(204).json({error: false, payload: {message: "No content"}})
        }

        const data = blogDetails.rows[0]

        return res.status(200).json({error: false, payload: { ...data }})

    }catch(error){
        console.log('Error while fetching blog details')
        console.log(error)
        return res.status(500).json({error: true, message: "Internal server error"})
    }
}

async function deleteBlog(req, res){
    try{
        const {blogId} = req.body
        const {id} =req.session.user

        const firstQuery = `SELECT userid FROM blogs where blogId=$1`
        const userIdRow = await db.query(firstQuery, [blogId])

        if(userIdRow.rowCount > 0){
            const userid =  userIdRow.rows[0].userid

            if(userid === id){
                const secondQuery = `DELETE FROM blogs WHERE blogid=$1`
                await db.query(secondQuery, [blogId])
                return res.status(200).json({error: false, payload: {message: "Blog Deleted"}})
            }else{
                return res.status(400).json({error: true, message: 'cannot delete others blogs'})
            }

        }else{
            return res.status(400).json({error: true, message: "Blog does not exist"})
        }
        
    }catch(error){
        console.log("Error While Deleting Blog")
        console.log(error)
        return res.status(500).json({error: true, message: "Internal server error"})
    }
}


module.exports = { createNewBlog, getAllBlogs, getBlogDetail, getMyBlogs, deleteBlog }
