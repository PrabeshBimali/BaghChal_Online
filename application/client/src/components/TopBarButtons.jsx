import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AccountContext } from '../contexts/UserContext';


const buttonStyle = {
  backgroundColor: '#525357',
  fontWeight: 'bold',
  fontSize: '1.2em',
  padding: '5px',
  borderRadius: '5px',
  color: '#E9E9E9',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
}

export function RegisterButton() {

  const { user } = useContext(AccountContext)


  if(!user.loggedIn){
    return (<Link to="/register" style={buttonStyle} className='register_button'>
              Register
            </Link>);
  }

  return ""
  
}



export function LoginButton() {

  const { user } = useContext(AccountContext)


  const loginStyle = {...buttonStyle}
  loginStyle.backgroundColor = '#E02A2A'

  if(!user.loggedIn){
    return (<Link to="/login" style={loginStyle} className='login_button'>
              Sign In
            </Link>);
  }

  return ""

  
}

