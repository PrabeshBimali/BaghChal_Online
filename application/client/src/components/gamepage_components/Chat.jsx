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
        if(input.length > 50){
            setChatError("Only 50 or less characters supported")
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

    

    useEffect(() => {

        function handleIncomingChat(chatData){
            setAllChats(val => [...chatData])
        }

        async function onChat(){
            
            try{
                await socket.on('chat', (data) => {
                    handleIncomingChat(data)
                })
            }catch(error){

            }
            
        }

        onChat()
    }, [socket, allChats])

  return (
    <>
        <div className='chat_body'>
            {allChats.map((val, index)=>{
                return <Text key={index} text={val}/>
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

    const [username, setUsername] = useState("")
    const [data, setData] = useState("")

    useEffect(()=>{

        const endIndex = props.text.indexOf(':')
        setUsername(props.text.substring(0, endIndex))
        setData(props.text.substring(endIndex+1, props.text.length))

    }, [props])

    return(
        <div className='chat_text_container'>
            <div className='chat_username'>{`${username} says:`}</div>
            <div className='chat_text'>{data}</div>
        </div>
    )
}
