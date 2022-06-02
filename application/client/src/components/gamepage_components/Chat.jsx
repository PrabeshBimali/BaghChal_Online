import React, {useState, useContext, useEffect} from 'react'
import { SocketContext } from '../../contexts/SocketContext'
import { AccountContext } from '../../contexts/UserContext'
import './Chat.css'


export default function Chat(props) {

    const socket = useContext(SocketContext)
    const {user} = useContext(AccountContext)

    const [input, setInput] = useState("")
    const [chatError, setChatError] = useState("")
    const [allChats, setAllChats] = useState([])

    function handleChat(e){
        e.preventDefault()
        if(input.length > 40){
            setChatError("Only 40 or less characters supported")
        }else if(input.length < 1){
            setChatError("Type something")
        }
        else{
            const data = {}
            data.username = user.username
            data.chatData = input
            data.gameId = props.gameId
            setInput("")
            socket.emit('chat', data)
        }

    }

    function handleIncomingChat(chatData){
        setAllChats(val => [...allChats, chatData])
    }

    useEffect(() => {
        async function onChat(){
            try{
                await socket.on('chat', (data) => {
                    handleIncomingChat(data)
                })
            }catch(error){

            }
            
        }

        onChat()
    }, [socket])

  return (
    <>
        <div className='chat_body'>
            {allChats.map((val, index)=>{
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
