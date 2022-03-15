import {LoginButton, RegisterButton} from '../components/TopBarButtons'; 
import TopbarProfile from './TopbarProfile';
import './Topbar.css'

export default function Topbar() {

  
  return <div className="topbar">
      <div className='topbar_title'>
          BaghChal
      </div>
      <div className='topbar_buttons_container'>
        <TopbarProfile/>
        <LoginButton/>
        <RegisterButton/>
      </div>
  </div>;
}
