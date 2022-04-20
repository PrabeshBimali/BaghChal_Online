import {useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import './HomePageLayout.css'
import { SocketContext } from '../contexts/SocketContext'


export default function HomePageLayout({children}) {

  const socket = useContext(SocketContext)
  const navigate = useNavigate()

  useEffect(() => {
    
    const joinGame = async () => {
      try{
        await socket.disconnect()
        await socket.connect()
        await socket.on("join_game", (data) => {
          navigate('/game')
        })
      }catch(error){
        console.log(error)
      } 
    }
    joinGame()
  }, [socket, navigate])
  return (
    <>
    <Topbar/>
    
    <div className="homepage">
      <Sidebar/>    
      {children}
    </div>
    </>
    
  )
}
