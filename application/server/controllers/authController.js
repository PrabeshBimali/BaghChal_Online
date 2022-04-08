const bcrypt = require('bcrypt')
const validateUser = require('./authentication/validateUser')
const db = require('../config/db')

async function registerUser(req, res){
    try{


        // First check whether username, email, and password are valid 

        const validate = validateUser(req.body);


        if(validate.valid === false){
            return res.status(400).json({error: true, message: validate.message, code: 400 })
        }

        const {username, email, password} = req.body;

        username = username.trim().toLowerCase()
        email = email.trim().toLowerCase()
        password = password.trim()

        // check whether username and email already exists

        let results = await db.query('SELECT username FROM users WHERE username=$1', [username]);
        if(results.rowCount >= 1) return res.status(409).json({error: true, message: "Username already exists"});
        
        results = await db.query('SELECT username FROM users WHERE email=$1', [email]);
        if(results.rowCount >= 1) return res.status(409).json({error: true, message: "Email already exists"});



        // hash the password using bcrypt with password and generated salt
        
        const salt = await bcrypt.genSalt(12);

        const hashedPassword = await bcrypt.hash(password, salt)



        // save username, email, and hashed password on the database

        await db.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', [username, hashedPassword, email])

        const id = await db.query('Select userId FROM users WHERE username=$1', [username])



        // Save signed up user in the session

        req.session.user = {
            id: id.rows[0].userid,
            username: username
        }



        return res.status(201).json({error: false, payload: {username: username, loggedIn: true}})

        

    }catch(error){
        console.log(`Server Error: ${error.message}`)
        return res.status(500).json({error: true, message: "Internal server Error"})
    }
}






async function loginUser(req, res){


    try{

        // First check whether username, email, and password are valid 

        const validate = validateUser(req.body);


        if(validate.valid === false){
            return res.status(400).json({error: true, message: validate.message, code: 400 })
        }
        
        let {username, password} = req.body;

        username = username.trim().toLowerCase()
        password = password.trim()

        // Check whether username exists


        const loginDetails = await db.query('SELECT userId, username, password FROM users WHERE username=$1', [username]);

        if(loginDetails.rowCount < 1) return res.status(400).json({error: true, message: "Username or password inorrect"})



        // Check whether password match

        const isSamePassword = await bcrypt.compare(password, loginDetails.rows[0].password);

        if(isSamePassword){


            // Save username and id on session

            req.session.user = {
                id: loginDetails.rows[0].userid,
                username: username
            }

            return res.status(201).json({error: false, 
                payload: { loggedIn: true, username: username, userId: req.session.user.id}})
            
        }else{
            return res.status(400).json({error: true, message: "username or password inorrect"})
        }
        
    }catch(error){
        console.log(`Server Error: ${error.message}`)
        return res.status(500).json({error: true, message: "Internal server Error"})
    }
}


function isAuthenticated(req, res){
    if(req.session.user){
        if(req.session.user.username.toLowerCase() !== "anonymous"){
            return res.status(200).json({error: false, 
                payload: {loggedIn: true, username: req.session.user.username, userId: req.session.user.id}})
        }
    }

    return res.status(400).json({error: true, message: "Not logged in"})
}

function isAuthenticatedMiddleware(req, res, next){
    if(req.session.user){
        if(req.session.user.username && req.session.user.id){
            next()
        }else{
            return res.status(400).json({error: true, message: "Not logged in"})
        }
    }else{
        return res.status(400).json({error: true, message: "Not logged in"})
    }

    
}

module.exports = {registerUser, loginUser, isAuthenticated, isAuthenticatedMiddleware}