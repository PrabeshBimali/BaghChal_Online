import React from 'react';
import CreateGamePopup from './homepage_components/CreateGamePopup';

export default function BlackScreen(props) {

  function handleClick(e){
    e.preventDefault()
    if(e.target.className === 'black_screen'){
      props.setToggleBlackScreenProp(false)
      props.setToggleCreateGamePopupProp(false)
    }
    
  }

  const style = {
    position: 'fixed',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    height: '100%',
    zIndex: '50',
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center'
  }

  if(props.toggleBlackScreenProp){
    return (
      <div style={style} className='black_screen' onClick={handleClick}>
        <CreateGamePopup setLobbiesProp={props.setLobbiesProp}/>
      </div>
    );
  }

  return ""
  
  
}
