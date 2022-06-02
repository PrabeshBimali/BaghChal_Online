import React, { useEffect, useState, useContext } from 'react'
import HomePageLayout from './HomePageLayout'
import Board from '../components/gamepage_components/Board'
import Chat from '../components/gamepage_components/Chat'
import './Gamepage.css'
import {HiStatusOnline} from 'react-icons/hi'
import { SocketContext } from '../contexts/SocketContext'
import { AccountContext } from '../contexts/UserContext'
import { Link, useParams, useNavigate } from 'react-router-dom'


export default function GamePage() {

  const socket = useContext(SocketContext)
  const {user} = useContext(AccountContext)

  const {gameId} = useParams()

  const [opponentName, setOpponentName] = useState("")
  const [opponentSide, setOpponentSide] = useState("")
  const [mySide, setMySide] = useState("")
  const [turn, setTurn] = useState("goat")
  const [unusedGoats, setUnusedGoats] = useState(20)
  const [killedGoats, setKilledGoats] = useState(0)
  const [trappedTigers, setTrappedTigers] = useState(0)
  const [winner, setWinner] = useState("")

  
  useEffect(()=>{
    window.onbeforeunload = (event) => "1"
    // window.onunload = (event) => {

    // }
  }, [])

  useEffect(()=>{
    async function joinedGame(){
      try{
        await socket.emit('joined_game', gameId) 
        await socket.on('joined_game', (data)=>{
          setOpponentName(data.opponentName)
          setOpponentSide(data.opponentSide)
          setMySide(data.yourSide)
          setKilledGoats(data.killedGoats)
          setTrappedTigers(data.trappedTigers)
          setUnusedGoats(data.unusedGoats)
        }) 
      }catch(error){
        console.log("")
      }  
    }

    joinedGame() 
  }, [socket, gameId])


  

  return (
    <HomePageLayout>
        <div className='gamepage_container'>
            <div className='gamepage_left'>
                <Board turn={turn} setTurn={setTurn} mySide={mySide}
                 killedGoats={killedGoats} gameId={gameId} trappedTigers={trappedTigers} 
                 unusedGoats={unusedGoats} setKilledGoats={setKilledGoats} setTrappedTigers={setTrappedTigers} 
                 setUnusedGoats={setUnusedGoats} setWinner={setWinner}
                 />
                 {winner && <Link className='go_back' to='/'>Go Back</Link>}
            </div>
            <div className='gamepage_right'>
                <div className="current_data">
                  <div>
                    <div className='your_name_container'>
                      <div className="opponent_name">Opponent: {opponentName}</div>
                      <div className="your_name_icon"><HiStatusOnline/></div>
                    </div>
                    <div className="opponent_side">Opponent side: {opponentSide}</div>
                  </div>
                  <div className='current_data_middle'>
                    <div className="turn">Turn: {turn}</div>
                    <div className="unused_goats">Remaining Goats: {unusedGoats}</div>
                    <div className="killed_goats">Killed Goats: {killedGoats}</div>
                    <div className="trapped_tigers">Trapped Tigers: {trappedTigers}</div>
                  </div>
                  <div>
                    <div className="your_side">Player Side: {mySide}</div>
                    <div className="your_name_container">
                      <div className="your_name">Player: {user.username}</div>
                      <div className="your_name_icon"><HiStatusOnline/></div>
                    </div>
                    {mySide === turn && <div className='your_turn'>It's Your Turn</div>}
                    {opponentSide === turn && <div className='opponent_turn'>Opponent's turn</div>}
                    {winner === mySide && <div className='you_win'>You win</div>}
                    {winner === opponentSide && <div className='you_lose'>You lose</div>}
                  </div>
                </div>
                <div className="chat_container">
                  <Chat gameId={gameId}/>
                </div>
            </div>
        </div>
    </HomePageLayout>
    
  )
}
