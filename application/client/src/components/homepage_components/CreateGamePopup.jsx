import { useContext } from 'react'
import { AccountContext } from '../../contexts/UserContext'
import './CreateGamePopup.css'



export default function CreateGamePopup() {

  const { user } = useContext(AccountContext)

  

  function handleSubmit(event){
    
  }


  return (
    <div className='create_game_popup_container'>
      <div className='create_game_popup_header'>
        Create Game
      </div>
      <div className='create_game_popup_select_container'>
        <span className='create_game_popup_select_text'>Choose Side: </span>
        <select className='create_game_popup_select_option'>
          <option>Bagh</option>
          <option>Goat</option>
        </select>
      </div>
      {
        user.loggedIn ? <div className='create_game_popup_select_container'>
        <span className='create_game_popup_select_text'>Choose Type: </span>
        <select className='create_game_popup_select_option'>
          <option>Ranked</option>
          <option>Casual</option>
        </select>
      </div> : null 
      }
      <button className='create_game_popup_button' onClick={handleSubmit}>Create Game</button>
    </div>  
  )  
}
