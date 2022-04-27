import React, {useState, useContext} from 'react'
import { SocketContext } from '../../contexts/SocketContext'
import UserContext from '../../contexts/UserContext'
import './Chat.css'


export default function Chat() {

    const socket = useContext(SocketContext)
    //const {user} = useContext(UserContext)

    const val = []
    const [input, setInput] = useState("")
    const [chatError, setChatError] = useState("")

    function handleChat(e){
        e.preventDefault()
        if(input.length > 40){
            setChatError("Only 40 or less characters supported")
        }else{
            const data = {}
            //data.username = user.username
            data.chatData = input
            socket.emit('chat', data)
        }

    }

  return (
    <>
        <div className='chat_body'>
            {val.map((val, index)=>{
                const key = Object.keys(val)[0]
                return <Text key={index} username={key} text={val[key]}/>
            })}
        </div>

        {chatError && <div className='chat_error'>{chatError}</div>}
        <div className="chat_footer">
            
            <input className='chat_input' value={input} type="text" 
                onChange={e=>{
                    setInput(e.target.value)
                    setChatError("")
                }} 
                placeholder='write something...'></input>
            <button className='chat_button' onClick={handleChat}>Chat</button>
        </div>
        
    </>
    
  )
}

function Text(props){
    return(
        <div className='chat_text_container'>
            <span className='chat_username'>{`${props.username} says:`}</span>
            <span className='chat_text'>{props.text}</span>
        </div>
    )
}
