import {useState, useEffect, useContext} from "react";
import "./Lobby.css";
import { SocketContext } from "../../contexts/SocketContext";

function TableData(props) {

  const socket = useContext(SocketContext)

  function joinGame(event){
    event.preventDefault()
    console.log(props.data)
    socket.emit('join_game', props.data)
  }

  return (
    <tbody onClick={joinGame}>
      <tr>
        <td>{props.data.username}</td>
        <td>{props.data.side}</td>
        <td>{props.data.type}</td>
        <td>17:00:26</td>
      </tr>
    </tbody>
  );
}

export default function CurrentGames() {

  const socket = useContext(SocketContext)

  const [ lobbies, setLobbies ] = useState([])

  useEffect(() => {
    const getLobbies = async () => {
      try{
        await socket.on("lobby_update", (data) => {
          setLobbies(data)
        })
      }catch(error){
        console.log(error)
      } 
    }
    getLobbies()
  }, [socket])
  

  return (
    <div className="lobby_container">
      <table className="lobby_table">
        <thead>
          <tr>
            <td>Username</td>
            <td>Opponent's Side</td>
            <td>Type</td>
            <td>Created At</td>
          </tr>
        </thead>

        {lobbies.map((values, index) => 
          <TableData key={index} data={values}/>
        )}
      </table>
    </div>
  );
}
