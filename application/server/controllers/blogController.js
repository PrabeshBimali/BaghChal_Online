const db = require('../config/db')

async function createNewBlog(req, res){
    try{
        const { id } = req.session.user
        const { title, description, markup } = req.body
        const { filename } = req.file

        const insertString = 'INSERT INTO Blogs (title, description, markup, imagename, userid) values($1, $2, $3, $4, $5)'
        await db.query(insertString, [title, description, markup, filename, id])

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
        const selectQuery = `Select blogid, title, description, blogcomments, likes, datecreated, username 
		from blogs inner join users
		on blogs.userid = users.userid
		order by datecreated desc`

        const blogs = await db.query(selectQuery)

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

        const selectQuery = ``
        const blogs = db.query(selectQuery)

        return res.status(200).json({error: false, payload: {
            blogs: (await blogs).rows
        }})

    }catch(error){
        console.log('Error while selecting my blogs')
        console.log(error)
        return res.status(500).json({error: true, message: "Internal server Error"})
    }
}


module.exports = { createNewBlog, getAllBlogs }
