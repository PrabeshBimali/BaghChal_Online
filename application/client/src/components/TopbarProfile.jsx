import { VscAccount } from "react-icons/vsc";
import { useContext } from "react";
import { AccountContext } from "../contexts/UserContext";
import {useNavigate} from 'react-router-dom'
import { InContext } from "../contexts/InviteContext";

export default function TopbarProfile() {


    const { user } = useContext(AccountContext)

    const navigate = useNavigate()
 
    function toProfile(e){
        e.preventDefault()
        navigate('/user/profile')
        
    }

    if(user.loggedIn){
        return (
            <>
                <VscAccount style={{color: 'white', fontSize: '25px', fontWeight: 'bold'}} />
                <span onClick={toProfile} className="topbar_username">
                    {user.username}
                </span>
                
            </>
            
        );    
    }

    return ""
  
    
}
