const initializeUser = require("./socketio/initializeUser")
const onCreateLobby = require("./socketio/onCreateLobby")
const onGetLobbies = require("./socketio/onGetLobbies")
const onDisconnect = require("./socketio/onDisconnect")

module.exports = {
    initializeUser, 
    onCreateLobby,
    onGetLobbies,
    onDisconnect
}