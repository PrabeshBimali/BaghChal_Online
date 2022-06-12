const RedisClient = require("../../config/cache");

async function onCreatePrivateLobby(io, socket, data) {
  try {
    if (socket.request.session.user) {
      const { username, id } = socket.request.session.user;
      const {userid} = data

      const time = new Date();
      const hours = time.getHours();
      const minutes = time.getMinutes();

      let newHrs = hours.toString();
      let newMinutes = minutes.toString();

      if (newHrs.length === 1) {
        newHrs = `0${newHrs}`;
      }

      if (newMinutes.length === 1) {
        newMinutes = `0${newMinutes}`;
      }

      const currentTime = `${newHrs}:${newMinutes}`;

      await RedisClient.hset(
        `privatelobby:${id}`,
        "username",`${username}`,
        "userid",id,
        "side",`${data.side}`,
        "type",`${data.type}`,
        "currenttime",`${currentTime}`
      );

      await RedisClient.sadd(
          `invites:${userid}`,
          `privatelobby:${id}`
      )

      await RedisClient.expire(`privatelobby:${id}`, 120);

      let lobbies = await getAllPrivateLobbies(userid);

      let actualLobbies = lobbies.filter(val => val.username)

      await io.in(userid).emit("private_lobby_update", actualLobbies);

      setTimeout(async () => {
        await RedisClient.srem(`invites:${userid}`, `privatelobby:${id}`)
        let lobbies = await getAllPrivateLobbies(userid);
        
        actualLobbies = lobbies.filter(val => val.username)

        await io.in(userid).emit("private_lobby_update", actualLobbies);
      }, 120000);

    }
  } catch (error) {
    console.log("Error while create private lobby");
    console.log(error.message);
  }
}

async function getAllPrivateLobbies(id){
    const lobbyKeys = await RedisClient.smembers(`invites:${id}`)
    let redisCommands = lobbyKeys.map(async (val) => {
        return await RedisClient.hgetall(val)
    })

    return Promise.all(redisCommands)
}

module.exports = onCreatePrivateLobby;
