const express = require("express")
const http = require("http")
const helmet = require("helmet")
const socket = require('socket.io')
const cors = require('cors')
const { corsConfig, expressSession } = require('./controllers/serverController')


// Importing routes

const authRoutes = require('./routes/authRoutes')


const app = express()

const server = http.createServer(app)



// Using necessary middlewares


app.use(express.json())
app.use(helmet())
app.use(cors(corsConfig))
app.use(expressSession)


// Endpoints

app.use('/auth', authRoutes)


// Socket code

const io = socket(server, {cors: {corsConfig}})

io.on('connection', function (socket){
    console.log(`A user with id ${socket.id} connected` )
    console.log(io.engine.clientsCount)

    socket.on('client', ()=>{
        console.log("Client Event")
    })

    socket.on('disconnecting', ()=>{
        console.log(`${socket.id} disconnecting..`)
        io.emit("disconnected", {id: socket.id})
    })

    
})



server.listen(process.env.PORT, ()=>{
    
    console.log(`server running on port: ${process.env.PORT}`)
    
})


