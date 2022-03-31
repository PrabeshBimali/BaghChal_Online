import { useState, useEffect, useContext } from 'react';
import "./Homepage.css"
import Topbar from '../components/Topbar' 
import Sidebar from '../components/Sidebar';
import Lobby from '../components/homepage_components/Lobby';
import HomepageButtons from '../components/homepage_components/HomepageButtons';
import BlackScreen from '../components/BlackScreen'
import { SocketContext } from '../contexts/SocketContext';



export default function Homepage() {

  const socket = useContext(SocketContext)

  const [toggleBlackScreen, setToggleBlackScreen] = useState(false)
  const [toggleCreateGamePopup, setToggleCreateGamePopup] = useState(false)

  const [ lobbies, setLobbies ] = useState([])

  useEffect(() => {
    const getLobbies = async () => {
      try{
        await socket.on("get_lobbies", (data) => {
          setLobbies(data)
        })
      }catch(error){
        //console.log(error)
      } 
    }
    getLobbies()
  }, [socket])
  
  return (
    <>
      <BlackScreen toggleBlackScreenProp={toggleBlackScreen} 
      toggleCreateGamePopupProp={toggleCreateGamePopup}
      setToggleBlackScreenProp={setToggleBlackScreen} 
      setToggleCreateGamePopupProp={setToggleCreateGamePopup}
      setLobbiesProp={setLobbies}/>

      <div className="homepage">
        <Topbar/>
        <div className='main_wrapper'>
          <Sidebar/>
          <Lobby lobbiesProp={lobbies}/>
          <HomepageButtons setToggleBlackScreenProp={setToggleBlackScreen}
           setToggleCreateGamePopupProp={setToggleCreateGamePopup}/>
        </div>
      </div>
    </>
  );
}
