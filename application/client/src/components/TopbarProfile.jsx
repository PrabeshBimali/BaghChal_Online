import { VscAccount } from "react-icons/vsc";
import { useContext } from "react";
import { AccountContext } from "../contexts/UserContext";

export default function TopbarProfile() {


    const { user } = useContext(AccountContext)

    if(user.loggedIn){
        return (
            <>
                <VscAccount style={{color: 'white', fontSize: '25px', fontWeight: 'bold'}} />
                <span style={{color: 'white', fontSize: '20px', fontWeight: 'bold'}} className="topbar_username">{user.username}</span>
            </>
            
        );    
    }

    return ""
  
    
}
