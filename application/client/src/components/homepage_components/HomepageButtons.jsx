import React, { useContext, useState } from "react";
import "./HomepageButtons.css";
import Modal from "react-modal";
import { SocketContext } from "../../contexts/SocketContext";
import {v4} from "uuid"
import {useNavigate} from 'react-router-dom'

export default function HomepageButtons(props) {
  const [friendPopUp, setFriendPopUp] = useState(false);
  const [inviteSide, setInviteSide] = useState("Bagh");
  const [inviteUser, setInviteUser] = useState("");
  const [inviteError, setInviteError] = useState("");
  const [userFound, setUserFound] = useState(false);

  const navigate = useNavigate()

  const socket = useContext(SocketContext);

  Modal.setAppElement("#root");

  function handleCreateGame() {
    props.setToggleBlackScreenProp(true);
    props.setToggleCreateGamePopupProp(true);
  }

  function showFriendPopUp(e) {
    e.preventDefault();
    setFriendPopUp(true);
  }

  function closeFriendPopUp() {
    setFriendPopUp(false);
    setUserFound(false);
    setInviteError("");
    setInviteUser("");
  }


  function redirectToAi(e){
    e.preventDefault()
    const randomVal = v4()
    navigate(`/ai/${randomVal}`)
  }

  async function handleInvite(e) {
    e.preventDefault();

    const data = {};

    data.side = inviteSide;
    data.type = "casual";

    const response = await fetch(
      `http://localhost:5000/user/finduser?username=${inviteUser}`,
      {
        mode: "cors",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const resdata = await response.json();
      data.userid = resdata.payload.userid;
      setInviteError("");
      setUserFound(true);
      setInviteUser("");
      socket.emit("create_private_lobby", data);
    } else {
      const resdata = await response.json();
      setInviteError(resdata.message);
      setUserFound(false);
    }
  }

  const customStyles = {
    content: {
      backgroundColor: "rgba(54, 54, 54)",
      width: "350px",
      height: "250px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      outline: "none",
      border: "none",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  };


  return (
    <>
      
      <Modal
        isOpen={friendPopUp}
        style={customStyles}
        onRequestClose={closeFriendPopUp}
      >
        <div
          className="create_game_popup_header"
          style={{ textAlign: "center" }}
        >
          Invite Friend
        </div>
        <div
          className="create_game_popup_select_container"
          style={{ margin: "10px 0" }}
        >
          <span className="create_game_popup_select_text">Choose Side: </span>
          <select
            className="create_game_popup_select_option"
            onChange={(e) => setInviteSide(e.target.value)}
          >
            <option>Bagh</option>
            <option>Goat</option>
          </select>
        </div>
        <div className="create_game_popup_select_container">
          <span className="create_game_popup_select_text">Username: </span>
          <input
            onChange={(e) => {
              setInviteUser(e.target.value);
              setInviteError("");
            }}
            style={{
              padding: "5px 10px",
              backgroundColor: "#322f2f",
              border: "solid 1px #999",
              borderRadius: "5px",
              fontSize: "15px",
              color: "#ccc",
            }}
          ></input>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <button
            style={{
              backgroundColor: "#E02A2A",
              color: "#E9E9E9",
              fontWeight: "bold",
              padding: "10px 5px",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
              fontSize: "1.2em",
            }}
            onClick={handleInvite}
          >
            Invite
          </button>
        </div>
        {inviteError && (
          <div
            style={{
              fontSize: "15px",
              maxWidth: "80%",
              margin: "10px auto",
              textAlign: "center",
              color: "red",
            }}
          >
            {inviteError}
          </div>
        )}

        {userFound && (
          <div
            style={{
              fontSize: "15px",
              maxWidth: "80%",
              margin: "10px auto",
              textAlign: "center",
              color: "rgb(32, 230, 32)",
            }}
          >
            {"Invite sent!"}
          </div>
        )}
      </Modal>
      <div className="homepage_buttons">
        <div className="homepage_buttons_container">
          <button className="homepage_button" onClick={handleCreateGame}>
            Create New Game
          </button>
          <button className="homepage_button" onClick={showFriendPopUp}>
            Play with Friend
          </button>
          <button className="homepage_button" onClick={redirectToAi}>
            Play With AI
          </button>
        </div>
      </div>
    </>
  );
}
