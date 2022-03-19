import { useState } from 'react';
import "./Homepage.css"
import Topbar from '../components/Topbar' 
import Sidebar from '../components/Sidebar';
import Lobby from '../components/homepage_components/Lobby';
import HomepageButtons from '../components/homepage_components/HomepageButtons';
import BlackScreen from '../components/BlackScreen'



export default function Homepage() {


  const [toggleBlackScreen, setToggleBlackScreen] = useState(false)
  const [toggleCreateGamePopup, setToggleCreateGamePopup] = useState(false)

  const [ lobbies, setLobbies ] = useState([])
  
  return (
    <>
      <BlackScreen toggleBlackScreenProp={toggleBlackScreen} 
      toggleCreateGamePopupProp={toggleCreateGamePopup}
      setToggleBlackScreenProp={setToggleBlackScreen} 
      setToggleCreateGamePopupProp={setToggleCreateGamePopup}/>

      <div className="homepage">
        <Topbar/>
        <div className='main_wrapper'>
          <Sidebar lobbiesProp={lobbies} setLobbiesProp={setLobbies}/>
          <Lobby/>
          <HomepageButtons setToggleBlackScreenProp={setToggleBlackScreen}
           setToggleCreateGamePopupProp={setToggleCreateGamePopup}/>
        </div>
      </div>
    </>
  );
}
