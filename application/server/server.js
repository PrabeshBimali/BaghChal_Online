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
        onDisconnect, 
        onJoinGame, 
        onJoinedGame, 
        onMove, 
        onChat, 
        onGameEnd,
        onCreatePrivateLobby} = require('./controllers/socketController')


// Importing routes

const authRoutes = require('./routes/authRoutes')
const blogRoutes = require('./routes/blogRoutes')
const userRoutes = require('./routes/userRoutes')
const gameRoutes = require('./routes/gameRoutes')
const forumRoutes = require('./routes/forumRoutes')


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
app.use('/user', userRoutes)
app.use('/game', gameRoutes)
app.use('/forum', forumRoutes)

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

    socket.on('join_game', (data) => {
        onJoinGame(io, socket, data)
    })

    socket.on('joined_game', (data) => {
        onJoinedGame(io, socket, data)
    })

    socket.on('move', (data) => {
        onMove(io, socket, data)
    })

    socket.on('chat', (data) => {
        onChat(io, socket, data)
    })

    socket.on('game_end', (data)=>{
        onGameEnd(io, socket, data)
    })

    socket.on('create_private_lobby', (data)=>{
        onCreatePrivateLobby(io, socket, data)
    })

    socket.on('disconnecting', ()=>{
        onDisconnect(socket)
        console.log(`${socket.id} disconnecting..`)
    })

    
})



server.listen(process.env.PORT, ()=>{
    
    console.log(`server running on port: ${process.env.PORT}`)
    
})


