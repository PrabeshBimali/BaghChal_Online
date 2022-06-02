async function onChat(io, socket, data){

    const dataToSend = {}

    dataToSend[data.username] = data.chatData

    io.in(data.gameId).emit('chat', dataToSend)
}

module.exports = onChat