import React, { useContext, useState } from 'react';
import './RegisterPage.css'
import {Username, Email, Password, Button} from '../components/login_components/LoginComponents';
import {Link, useNavigate} from 'react-router-dom';
import { AccountContext } from '../contexts/UserContext';


function ShowError(props){
  if(props.error){
    return <p className='register_error'>{props.error}</p>
  }else{
    return ""
  }
}

export default function RegisterPage() {

  const { setUser } = useContext(AccountContext)

  const navigate = useNavigate()


  const userData = {
    "username": "",
    "email": "",
    "password": ""
  }
  const [registerData, setRegisterData ] = useState(userData);
  const [registerError, setRegisterError] = useState("")

  const updateRegisterData = (propertyName, value)=>{
    let {...copyUserData} = registerData;
    copyUserData[propertyName] = value;
    setRegisterData(copyUserData);
    setRegisterError("")
  }

  const handleSubmit =  async (event) => {
    event.preventDefault()
    try{
      const response = await fetch('http://localhost:5000/auth/register', {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...registerData
        })
      })

      if(response.ok){
        const data = await response.json()
        console.log(data)
        setRegisterError("")
        const userData = data.payload
        setUser({...userData})
        navigate("/")
      }else{
        const data = await response.json()
        setRegisterError(data.message)
      }
      
    
    
    }catch(error){
      console.log(`Error while signing up: ${error}`)
    }
    
  }




  return (
    <div className='register_page'>
        <div className='register_form_container'>
            <div className='register_form_title'>
                Online BaghChal<br></br>
                Register
            </div>
            <form className='register_form' onSubmit={handleSubmit}>
                <Username updateFunction={updateRegisterData}/>
                <Email updateFunction={updateRegisterData}/>
                <Password updateFunction={updateRegisterData}/>
                <Button buttonName='Register'/>
            </form>
            <ShowError error={registerError}/>
            <p className='already_have_account'>Have an account? <Link to='/login' className='link'>Sign In</Link></p>
        </div>
    </div>
  );
}
