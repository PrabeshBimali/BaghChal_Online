const db = require('../config/db')

async function findUserByUsername(req, res){
    try{
        const {username} = req.query

        const newUsername = username.trim().toLowerCase();

        const queryString = `SELECT userid FROM users where username=$1`

        const userData = await db.query(queryString, [newUsername])

        if(userData.rowCount <= 0){
            res.status(400).json({error: true, message: "Username does not match"})
        }else{
            const data = userData.rows[0]
            res.status(200).json({error: false, payload: { ...data }})
        }

    }catch(error){
        console.log("Error while finding user by username")
        console.log(error.message)
        return res.status(500).json({error: true, message: "Internal server error"})
    }
}

async function getUserDetail(req, res){
    try{
        
        const {id} = req.session.user

        const query = `select userid, username, substring(cast(createddate as text), 1,  10) as 
        datecreated, email from users where userid=$1`
        const data = await db.query(query, [id])

        res.status(200).json({error: false, payload: {user: data.rows[0]}})

    }catch(error){
        console.log("Error while fetching user details")
        console.log(error.message)
        return res.status(500).json({error: true, message: "Internal server error"})
    }
} 


async function updateProfile(req, res){
    try{
        
        const {username, email} = req.body

        const {id} = req.session.user

        let newUsername = username.trim().toLowerCase()
        let newEmail = email.trim().toLowerCase()

        if(!isUsernameValid(newUsername) && !isEmailValid(newEmail)){
            res.status(400).json({error: true, message: "Email and Username invalid"})
        }

        if(!isUsernameValid(newUsername) && isEmailValid(newEmail)){
            const query1 = `update users set email='nooo@gmailcom' where userid=$1`
            await db.query(query1, [id])
            res.status(400).json({error: true, message: "Email Updated Username Invalid"})
        }

        

    }catch(error){
        console.log("Error while fetching user details")
        console.log(error.message)
        return res.status(500).json({error: true, message: "Internal server error"})
    }
}

function isUsernameValid(username){
    if(username.length < 5 || username.length > 50){
        return false
    }

    const pattern = '^([a-z]|[A-Z]|[0-9])*$'
    const regex = RegExp(pattern)

    if(!regex.test(username)){
        return false
    }

    return true
}

function isEmailValid(email){
    const pattern = '^([A-Z]|[a-z]|[0-9]|(\.)){3,80}@([0-9]|[a-z]|[A-Z]){2,30}\.([a-z]|[A-Z]|[0-9]){2,10}$'
    const regex = RegExp(pattern)

    if(!regex.test(email)){
        return false
    }

    return true
}

module.exports = {findUserByUsername, getUserDetail}