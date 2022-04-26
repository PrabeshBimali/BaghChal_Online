import React, {useState} from 'react'
import './Chat.css'


export default function Chat() {


    const val = [{"prabesh": "Fuck you"}, 
    {"AI": "mu me le merra"},
    {"AI": "mu me le merra"},
    {"AI": "mu me le merra"},
    {"AI": "mu me le merrahskfsjjjgsljgsjg sgaaaa"}]
    const [input, setInput] = useState("")
    const [chatError, setChatError] = useState("")

    function handleChat(e){
        e.preventDefault()
        if(input.length > 40){
            setChatError("Only 40 or less characters supported")
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
