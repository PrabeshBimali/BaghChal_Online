import React, { useEffect, useState, useContext } from "react";
import HomePageLayout from "./HomePageLayout";
import AiBoard from "../components/gamepage_components/AiBoard";
import "./Gamepage.css";
import { HiStatusOnline } from "react-icons/hi";
import { SocketContext } from "../contexts/SocketContext";
import { AccountContext } from "../contexts/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";

export default function AiGamePage() {
  Modal.setAppElement("#root");

  const navigate = useNavigate();

  const socket = useContext(SocketContext);
  const { user } = useContext(AccountContext);

  const { gameId } = useParams();

  const [gameType, setGameType] = useState("Casual");
  const [opponentName, setOpponentName] = useState("AI");
  const [opponentSide, setOpponentSide] = useState("");
  const [mySide, setMySide] = useState("");
  const [turn, setTurn] = useState("goat");
  const [unusedGoats, setUnusedGoats] = useState(20);
  const [killedGoats, setKilledGoats] = useState(0);
  const [trappedTigers, setTrappedTigers] = useState(0);
  const [winner, setWinner] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const [chooseSidePopUp, setChooseSidePopUp] = useState(true)
  const [chosenSide, setChosenSide] = useState('bagh')

  useEffect(() => {
    if (winner) {
      popup();
    }
  }, [winner]);

  useEffect(() => {
    window.onbeforeunload = (event) => {
      return "1";
    };
  }, []);



  function popup() {
    setShowPopUp(true);
  }

  function goBack(e) {
    e.preventDefault();
    navigate("/");
  }

  useEffect(() => {
    function endGame(winner) {
      if (winner) {
        setTimeout(function () {
          navigate("/");
        }, 30000);
      }
    }

    endGame(winner);
  }, [winner, gameId, socket, navigate]);

  
  function closeAiPopUp(e){
      if(chosenSide.toLowerCase() === "bagh"){
        setMySide("bagh")
        setOpponentSide("goat")
      }else{
          setMySide("goat")
          setOpponentSide("bagh")
      }
      setChooseSidePopUp(false)
  } 


  const customStyles = {
    content: {
      backgroundColor: "rgba(54, 54, 54)",
      width: "250px",
      height: "150px",
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
        isOpen={chooseSidePopUp}
        style={customStyles}
      >
        <div
          className="create_game_popup_header"
          style={{ textAlign: "center" }}
        >
          VS AI
        </div>
        <div
          className="create_game_popup_select_container"
          style={{ margin: "10px 0" }}
        >
          <span className="create_game_popup_select_text">Choose Side: </span>
          <select
            className="create_game_popup_select_option"
            onChange={(e) => setChosenSide(e.target.value)}
          >
            <option>Bagh</option>
            <option>Goat</option>
          </select>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            style={{
              backgroundColor: "#E02A2A",
              color: "#E9E9E9",
              fontWeight: "bold",
              padding: "5px 5px",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
              fontSize: "1.2em",
            }}
            onClick={closeAiPopUp}
          >
            Play
          </button>
        </div>
      </Modal>
      <Modal isOpen={showPopUp} style={customStyles}>
        {winner === mySide && (
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "23px",
              color: "rgb(32, 230, 32)",
            }}
          >
            You win!
          </div>
        )}
        {winner === opponentSide && (
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "23px",
              color: "#E02A2A",
            }}
          >
            You Lose!
          </div>
        )}
        {gameType === "ranked" && (
          <div style={{ textAlign: "center", color: "rgb(32, 230, 32)" }}>
            Game Saved!
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
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
            }}
            onClick={goBack}
          >
            Go Back
          </button>
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "5px",
            fontSize: "10px",
            color: "#E02A2A",
          }}
        >
          You will be automatically redirected!
        </div>
      </Modal>
      <HomePageLayout>
        <div className="gamepage_container">
          <div className="gamepage_left">
            <AiBoard
              turn={turn}
              setTurn={setTurn}
              mySide={mySide}
              killedGoats={killedGoats}
              gameId={gameId}
              trappedTigers={trappedTigers}
              unusedGoats={unusedGoats}
              setKilledGoats={setKilledGoats}
              setTrappedTigers={setTrappedTigers}
              setUnusedGoats={setUnusedGoats}
              setWinner={setWinner}
              opponentSide={opponentSide}
            />
          </div>
          <div className="gamepage_right">
            <div className="current_data">
              <div>
                <div className="your_name_container">
                  <div className="opponent_name">Opponent: {opponentName}</div>
                  <div className="your_name_icon">
                    <HiStatusOnline />
                  </div>
                </div>
                <div className="opponent_side">
                  Opponent side: {opponentSide}
                </div>
              </div>
              <div className="current_data_middle">
                <div className="turn">Turn: {turn}</div>
                <div className="unused_goats">
                  Remaining Goats: {unusedGoats}
                </div>
                <div className="killed_goats">Killed Goats: {killedGoats}</div>
                <div className="trapped_tigers">
                  Trapped Tigers: {trappedTigers}
                </div>
                <div className="game_type">
                  Game Type:{" "}
                  {"Casual"}
                </div>
              </div>
              <div>
                <div className="your_side">Player Side: {mySide}</div>
                <div className="your_name_container">
                  <div className="your_name">Player: {user.username}</div>
                  <div className="your_name_icon">
                    <HiStatusOnline />
                  </div>
                </div>
                {mySide === turn && (
                  <div className="your_turn">It's Your Turn</div>
                )}
                {opponentSide === turn && (
                  <div className="opponent_turn">Opponent's turn</div>
                )}
                {winner === mySide && <div className="you_win">You win</div>}
                {winner === opponentSide && (
                  <div className="you_lose">You lose</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </HomePageLayout>
    </>
  );
}
