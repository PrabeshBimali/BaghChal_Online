import React from 'react'
import HomePageLayout from "../HomePageLayout";
import {NavLink} from "react-router-dom"
import "./UserPageLayout.css"
import { useNavigate } from 'react-router-dom';


export default function UserPageLayout({children}) {

  const navigate = useNavigate()

  async function logout(){
    try{
      const response = await fetch('http://localhost:5000/auth/logout', {
        mode: 'cors',
        method: 'GET',
        credentials: 'include'        
      })

      if(response.ok){
        console.log("WTF")
        navigate("/login")
      }
    }catch(error){
      console.log("Error while logging out")
      console.log(error.message)
    }
  }

  function handleLogout(e){
    e.preventDefault()
    let val = window.confirm("Are you sure?")

    if(val){
      logout()
    }
  }

  return (
    <HomePageLayout>
        <div className="userpage_container">
          <div className="userpage_header">
            <NavLink to="/user/profile" className="userpage_link">
              Profile
            </NavLink>
            <NavLink to="/user/history" className="userpage_link">
              Game History
            </NavLink>
            <NavLink to="/user/invites" className="userpage_link">
              Invitations
            </NavLink>
            <div className='logout_button' onClick={handleLogout}>Logout</div>
          </div>
          <div className="user_container">{children}</div>
        </div>
    </HomePageLayout>
  )
}
