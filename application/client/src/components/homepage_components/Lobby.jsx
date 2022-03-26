import React from "react";
import "./Lobby.css";

function TableData(props) {
  return (
    <tbody>
      <tr>
        <td>{props.data.username}</td>
        <td>{props.data.side}</td>
        <td>{props.data.type}</td>
        <td>17:00:26</td>
      </tr>
    </tbody>
  );
}

export default function CurrentGames(props) {
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

        {props.lobbiesProp.map((values, index) => 
          <TableData key={index} data={values}/>
        )}
      </table>
    </div>
  );
}
