import React, {useEffect, useState} from 'react'
import UserPageLayout from './UserPageLayout'
import {GiTigerHead, GiGoat} from 'react-icons/gi'
import {BsCheck} from  'react-icons/bs'
import { ImCross } from 'react-icons/im'
import './GameHistory.css'


function TableData(props) {

  const sideStyle  = {display: "flex", alignItems: "center", gap: "5px", justifyContent: "center"}

  return (
    <tbody>
      <tr>
        <td>{props.data.side === "bagh" ? <div style={sideStyle}><GiTigerHead style={{color: "#999"}}></GiTigerHead> <span>Tiger</span></div> 
                                        : <div style={sideStyle}><GiGoat style={{color: "#999"}}></GiGoat> <span>Goat</span></div>}</td>
        <td>{props.data.opponentname}</td>
        <td>{props.data.win === 1 ? <BsCheck style={{color: "rgb(21, 216, 21)", fontSize: "25px"}}></BsCheck>:<ImCross style={{color: "red", fontSize: "15px", fontWeight: "normal"}}></ImCross>}</td>
        <td>{props.data.gamedate}</td>
        <td>{props.data.gametime}</td>
      </tr>
    </tbody>
  );
}


export default function GameHistory() {

  const [allGames, setAllGames] = useState([])

  useEffect(()=>{

    async function fetchGames(){
        try{
          const response = await fetch('http://localhost:5000/game/all', {
          mode: 'cors',
          method: 'GET',
          credentials: 'include'        
        })


        if(response.ok){
          const data = await response.json()
          setAllGames(data.payload.games)
        }
      }catch(error){
        console.log(error.message)
      }
      

    }

    fetchGames()
  }, [])

  return (
    <UserPageLayout>
        <div className="history_container">
        <table className="history_table">
          <thead>
            <tr>
              <td>Side</td>
              <td>Opponent</td>
              <td>Win</td>
              <td>Date</td>
              <td>Time (In 24hrs)</td>
            </tr>
          </thead>
          {
            allGames.map((value, index)=>{
              return <TableData key={index} data={value}></TableData>
            })
          }
        </table>
        </div>
    </UserPageLayout>
    )
}
