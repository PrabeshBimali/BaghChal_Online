import React from 'react'
import './HomepageButtons.css'

export default function HomepageButtons(props) {

  function handleCreateGame(){
    props.setToggleBlackScreenProp(true)
    props.setToggleCreateGamePopupProp(true)
  }

  return (
    <div className='homepage_buttons'>
        <div className='homepage_buttons_container'>
            <button className='homepage_button' onClick={handleCreateGame}>Create New Game</button>
            <button className='homepage_button'>Play with Friend</button>
            <button className='homepage_button'>Play With AI</button>
        </div>
    </div>
  )
}
