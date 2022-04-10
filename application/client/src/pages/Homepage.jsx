import { useState } from 'react';
import HomePageLayout from './HomePageLayout';
import Lobby from '../components/homepage_components/Lobby';
import HomepageButtons from '../components/homepage_components/HomepageButtons';
import BlackScreen from '../components/BlackScreen'



export default function Homepage() {


  const [toggleBlackScreen, setToggleBlackScreen] = useState(false)
  const [toggleCreateGamePopup, setToggleCreateGamePopup] = useState(false)

  
  return (
    <>
      <BlackScreen toggleBlackScreenProp={toggleBlackScreen} 
      toggleCreateGamePopupProp={toggleCreateGamePopup}
      setToggleBlackScreenProp={setToggleBlackScreen} 
      setToggleCreateGamePopupProp={setToggleCreateGamePopup}/>
      <HomePageLayout>
          <Lobby />
          <HomepageButtons setToggleBlackScreenProp={setToggleBlackScreen}
           setToggleCreateGamePopupProp={setToggleCreateGamePopup}/>
      </HomePageLayout>       
    </>
  );
}
