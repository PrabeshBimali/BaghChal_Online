const express = require("express")
const http = require("http")
const helmet = require("helmet")
const socket = require('socket.io')
const cors = require('cors')
const { corsConfig,
     expressSession,
      sessionWrap } = require('./controllers/serverController')

const { initializeUser,
        onCreateLobby,
        onDisconnect } = require('./controllers/socketController')


// Importing routes

const authRoutes = require('./routes/authRoutes')
const blogRoutes = require('./routes/blogRoutes')


const app = express()

const server = http.createServer(app)



// Using necessary middlewares


app.use(express.json())
app.use(helmet())
app.use(cors(corsConfig))
app.use(expressSession)


// Endpoints

app.use('/auth', authRoutes)
app.use('/blog', blogRoutes)

// Socket code

const io = socket(server, {cors: corsConfig})
io.use(sessionWrap(expressSession))


io.on('connection', function (socket){
    console.log(`A user with id ${socket.id} connected` )
    console.log(io.engine.clientsCount)
    console.log(socket.request.session.user)
    initializeUser(io, socket)

    socket.on('create_lobby', (data) => {
        onCreateLobby(io, socket, data)
    })

    socket.on('disconnecting', ()=>{
        onDisconnect(socket)
        console.log(`${socket.id} disconnecting..`)
    })

    
})



server.listen(process.env.PORT, ()=>{
    
    console.log(`server running on port: ${process.env.PORT}`)
    
})


