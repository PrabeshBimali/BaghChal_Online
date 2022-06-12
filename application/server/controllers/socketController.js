const initializeUser = require("./socketio/initializeUser")
const onCreateLobby = require("./socketio/onCreateLobby")
const onDisconnect = require("./socketio/onDisconnect")
const onJoinGame = require("./socketio/onJoinGame")
const onJoinedGame = require("./socketio/onJoinedGame")
const onMove = require('./socketio/onMove')
const onChat = require('./socketio/onChat')
const onGameEnd = require('./socketio/onGameEnd')
const onCreatePrivateLobby = require('./socketio/onCreatePrivateLobby')

module.exports = {
    initializeUser, 
    onCreateLobby,
    onJoinGame,
    onJoinedGame,
    onDisconnect,
    onMove,
    onChat,
    onGameEnd,
    onCreatePrivateLobby
}