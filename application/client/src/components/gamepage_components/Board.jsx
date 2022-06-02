import './Board.css'
import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../../contexts/SocketContext'
import { createBoard, getValidMoves } from './baghchal/board'
import Piece from './baghchal/piece'

export default function Board(props) {

  const socket = useContext(SocketContext)

  

  const [boardState, setBoardState] = useState(createBoard())

  const validGoatMoves = getValidMoves(new Piece('goat', -1, -1), boardState)

  const coords = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
                  [1, 0], [1, 1], [1, 2], [1, 3], [1, 4],
                  [2, 0], [2, 1], [2, 2], [2, 3], [2, 4],
                  [3, 0], [3, 1], [3, 2], [3, 3], [3, 4],
                  [4, 0], [4, 1], [4, 2], [4, 3], [4, 4],]

  const [select, setSelect] = useState(new Piece('goat', -1, -1))
  const [validMoves, setValidMoves] = useState([...validGoatMoves])

  

  useEffect(()=>{
    async function onMove(){
      try{
        await socket.on('move', (data) => {
          //console.log(data.boardState)
          setBoardState(data.boardState)
          props.setTrappedTigers(data.trappedTigers)
          props.setKilledGoats(data.killedGoats)
          props.setUnusedGoats(data.unusedGoats)


          if(data.winner){
            props.setWinner(data.winner)
            props.setTurn("Game Over")
            return
          }

          props.setTurn(data.turn)

          



          if(data.turn === 'goat' && data.unusedGoats > 0 && props.mySide === 'goat'){
            const validMoves = getValidMoves(new Piece('goat', -1, -1), data.boardState)
            setValidMoves([...validMoves])
            setSelect(new Piece('goat', -1, -1))
          }else{
            setValidMoves(undefined)
          }

          
        })
      }catch(error){

      }
    }
    onMove()
  }, [socket, props])

  function removeValidMoves(e){
    e.preventDefault()
    if(e.target.className !== 'bagh_piece' 
      && e.target.className !== 'valid_circle' 
      && e.target.className !== 'goat_piece' 
      && props.turn !== 'goat' ){
      setValidMoves(undefined)
    }
    
  }

  return(
    <div className="board_container" onClick={removeValidMoves}>
      <div className="board">
        {
          (validMoves && props.mySide === props.turn) && validMoves.map((val, index) => <Valid key={index} coords={val} setSelect={setSelect} 
            setValidMoves={setValidMoves} setTurn={props.setTurn} select={select} boardState={boardState} 
            setBoardState={setBoardState} turn={props.turn} killedGoats={props.killedGoats}
            trappedTigers={props.trappedTigers} unusedGoats={props.unusedGoats} gameId={props.gameId} 
            mySide={props.mySide}></Valid>)
        }

        {
          coords.map((val, index)  => {
           if(boardState[val[0]][val[1]] !== 0){
             if(boardState[val[0]][val[1]].name === 'bagh'){
               return <Bagh key={index} coords={[val[0], val[1]]} 
                boardState={boardState} setSelect={setSelect} setValidMoves={setValidMoves} turn={props.turn} 
                mySide={props.mySide}></Bagh>
             }
             else if(boardState[val[0]][val[1]].name === 'goat'){
              return <Goat key={index} coords={[val[0], val[1]]} 
              boardState={boardState} setSelect={setSelect} setValidMoves={setValidMoves} turn={props.turn}
              mySide={props.mySide} unusedGoats={props.unusedGoats}></Goat>
             }
           }
           return ""

          })
        }
      </div>
    </div>
  )
}

function Bagh(props){

  function handleClick(e){
    e.preventDefault()
    if(props.turn === 'bagh' && props.mySide === 'bagh'){
      props.setSelect(props.boardState[props.coords[0]][props.coords[1]])
      const validMoves = getValidMoves(props.boardState[props.coords[0]][props.coords[1]], props.boardState)
      props.setValidMoves([...validMoves])
    }
    
  }

  const xPosition = 20 + props.coords[0] * 120
  const yPosition = 20 + props.coords[1] * 120

  const translate = `translate(${xPosition}px, ${yPosition}px)`

  return(
    <div style={{'transform': `${translate}`}} className='bagh_piece' onClick={handleClick}>

    </div>
  )
}

function Goat(props){

  function handleClick(e){
    e.preventDefault()
    if(props.turn === 'goat' && props.unusedGoats <= 0 && props.mySide === 'goat'){
      props.setSelect(props.boardState[props.coords[0]][props.coords[1]])
      const validMoves = getValidMoves(props.boardState[props.coords[0]][props.coords[1]], props.boardState)
      props.setValidMoves([...validMoves])
    }
    
  }

  const xPosition = 20 + props.coords[0] * 120
  const yPosition = 20 + props.coords[1] * 120

  const translate = `translate(${xPosition}px, ${yPosition}px)`

  return(
    <div style={{'transform': `${translate}`}} className='goat_piece' onClick={handleClick}>

    </div>
  )
}


function Valid(props){

  const socket = useContext(SocketContext)

  function handleClick(e){
    e.preventDefault()
    if(props.turn === 'bagh' && props.mySide === 'bagh'){
      socket.emit('move', {
        gameId: props.gameId,
        boardState: props.boardState,
        selectedPiece: props.select,
        destination: [props.coords[0], props.coords[1]],
        turn: props.turn,
        killedGoats: props.killedGoats,
        trappedTigers: props.trappedTigers,
        unusedGoats: props.unusedGoats
      })
    }
    else if(props.turn === 'goat' && props.mySide === 'goat'){
      socket.emit('move', {
        gameId: props.gameId,
        boardState: props.boardState,
        selectedPiece: props.select,
        destination: [props.coords[0], props.coords[1]],
        turn: props.turn,
        killedGoats: props.killedGoats,
        trappedTigers: props.trappedTigers,
        unusedGoats: props.unusedGoats
      })
    }
    
  }

  const xPosition = 20 + props.coords[0] * 120
  const yPosition = 20 + props.coords[1] * 120

  const translate = `translate(${xPosition}px, ${yPosition}px)`

  return(
    <div style={{'transform': `${translate}`}} className='valid_circle' onClick={handleClick}>

    </div>
  )
}

