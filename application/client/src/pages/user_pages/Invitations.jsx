import UserPageLayout from "./UserPageLayout";
import React from "react";
import { useContext } from "react";
import "./Invitations.css"
import { SocketContext } from "../../contexts/SocketContext";
import { InContext } from "../../contexts/InviteContext";

function TableData(props) {
  const socket = useContext(SocketContext);

  function joinGame(event) {
    event.preventDefault();
    socket.emit("join_game", props.data);
  }

  return (
    <tbody onClick={joinGame}>
      <tr>
        <td>{props.data.username}</td>
        <td>{props.data.side}</td>
        <td>{props.data.type}</td>
        <td>{props.data.currenttime}</td>
      </tr>
    </tbody>
  );
}

export default function Invitations() {  

  const {invites} = useContext(InContext)

  return (
    <UserPageLayout>
      <div className="private_lobby_container">
        <table className="private_lobby_table">
          <thead>
            <tr>
              <td>Username</td>
              <td>Opponent's Side</td>
              <td>Type</td>
              <td>Created At</td>
            </tr>
          </thead>

          {invites.map((values, index) => (
            <TableData key={index} data={values} />
          ))}
        </table>
      </div>
    </UserPageLayout>
  );
}
