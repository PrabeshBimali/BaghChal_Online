import { useContext, useState, useEffect } from 'react'
import { AccountContext } from '../../contexts/UserContext'
import { SocketContext } from '../../contexts/SocketContext'
import './CreateGamePopup.css'



export default function CreateGamePopup(props) {

  const { setLobbiesProp } = props

  const { user } = useContext(AccountContext)
  const  socket  = useContext(SocketContext)

  const [ side, setSide ] = useState("Bagh")
  const [ type, setType ] = useState("Ranked")

  

  async function handleSubmit(event){
    event.preventDefault()
    const data = {
      side: side, 
      type: type
    }
   await socket.emit('create_lobby',  { ...data } ) 
  }

  

  useEffect(()=>{
    socket.on('lobby_created', (data)=>{
      //console.log("Data")
      setLobbiesProp(data)
    })
  }, [socket, setLobbiesProp])

  // socket.on('wtf', ()=>{
  //   console.log("WTF")
  // })


  return (
    <div className='create_game_popup_container'>
      <div className='create_game_popup_header'>
        Create Game
      </div>
      <div className='create_game_popup_select_container'>
        <span className='create_game_popup_select_text'>Choose Side: </span>
        <select onChange={e=>setSide(e.target.value)} className='create_game_popup_select_option'>
          <option>Bagh</option>
          <option>Goat</option>
        </select>
      </div>
      {
        user.loggedIn ? <div className='create_game_popup_select_container'>
        <span className='create_game_popup_select_text'>Choose Type: </span>
        <select onChange={e=>setType(e.target.value)} className='create_game_popup_select_option'>
          <option>Ranked</option>
          <option>Casual</option>
        </select>
      </div> : null 
      }
      <button className='create_game_popup_button' onClick={handleSubmit}>Create Game</button>
    </div>  
  )  
}
