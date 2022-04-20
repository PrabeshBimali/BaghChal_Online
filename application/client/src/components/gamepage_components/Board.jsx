import './Board.css'
import { useState } from 'react'

export default function Board() {

  const baghInitialPositions = [[0, 0], [4, 0], [0, 4], [4, 4]]

  const [turn, setTurn] = useState("bagh")
  const [select, setSelect] = useState([])

  return(
    <div className="board_container">
      <div className="board">
        {
          baghInitialPositions.map(val  => <Bagh coords={val} turn={turn}/>)
        }
      </div>
    </div>
  )
}

function Bagh(props){

  const xPosition = 20 + props.coords[0] * 120
  const yPosition = 20 + props.coords[1] * 120

  const translate = `translate(${xPosition}px, ${yPosition}px)`

  return(
    <div style={{'transform': `${translate}`}} className='bagh_piece'>

    </div>
  )
}

