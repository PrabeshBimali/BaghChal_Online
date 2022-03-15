import { Link, useNavigate } from 'react-router-dom';
import {Username, Password, Button} from '../components/login_components/LoginComponents'
import './LoginPage.css'
import { useState, useContext } from 'react';
import { AccountContext } from '../contexts/UserContext';


function ShowError(props){
  if(props.error){
    return <p className='login_error'>{props.error}</p>
  }else{
    return ""
  }
}

export default function LoginPage() {

  const { setUser } = useContext(AccountContext)

  const navigate = useNavigate()

  const userData = {
    "username": "",
    "password": ""
  }
  const [loginData, setLoginData ] = useState(userData);
  const [loginError, setLoginError] = useState("")

  const updateLoginData = (propertyName, value)=>{
    let {...copyUserData} = loginData;
    copyUserData[propertyName] = value;
    setLoginData(copyUserData);
    setLoginError("")
  }

  const handleSubmit =  async (event) => {
    event.preventDefault()
    try{
      const response = await fetch('http://localhost:5000/auth/login', {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...loginData
        })
      })

      if(response.ok){
        const data = await response.json()
        console.log(data)
        setLoginError("")
        const userData = data.payload
        setUser({...userData})
        navigate("/")
      }else{
        const data = await response.json()
        console.log(data)
        setLoginError(data.message)
      }
      
    
    
    }catch(error){
      console.log(`ERROR: ${error}`)
    }
    
  }


  

  return (<div className="login_page">
      <div className='login_form_container'>
        <div className='login_form_title'>Online BaghChal App<br></br>
                                          Sign In
        </div>
          <form className='login_form' onSubmit={handleSubmit}>
            <Username updateFunction={updateLoginData}/>
            <Password updateFunction={updateLoginData}/>
            <Button buttonName='Login'/>
          </form>
          <ShowError error={loginError}/>
          <p className='forget_password'><Link to="/reset" className='link'>Forget Password?</Link></p>
          <p className='want_to_register'>Do not have an account? <Link to="/register" className='link'>Register</Link></p>
      </div>
  </div>);
}
