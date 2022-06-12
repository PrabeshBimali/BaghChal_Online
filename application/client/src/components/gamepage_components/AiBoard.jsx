import './Board.css'
import { useEffect, useState } from 'react'
import { createBoard, getValidMoves } from './baghchal/board'
import Piece from './baghchal/piece'
import {move} from './baghchal/move'
import Ai from './baghchal/ai'

export default function AiBoard(props) {  

  const [boardState, setBoardState] = useState(createBoard())

  //const validGoatMoves = getValidMoves(new Piece('goat', -1, -1), boardState)

  const coords = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
                  [1, 0], [1, 1], [1, 2], [1, 3], [1, 4],
                  [2, 0], [2, 1], [2, 2], [2, 3], [2, 4],
                  [3, 0], [3, 1], [3, 2], [3, 3], [3, 4],
                  [4, 0], [4, 1], [4, 2], [4, 3], [4, 4],]

  const [select, setSelect] = useState(new Piece('goat', -1, -1))
  const [validMoves, setValidMoves] = useState([])

  function showValidMoves(){
    if(props.turn === "goat" && props.unusedGoats > 0 && props.turn === props.mySide){
        const validMoves = getValidMoves(new Piece('goat', -1, -1), boardState)
        setValidMoves([...validMoves])
    }else{
        setValidMoves([])
    }
  }

  useEffect(()=>{

    if(props.turn === "goat" && props.mySide === "goat"){
        showValidMoves()
    }

    if(props.turn === props.opponentSide){
        const ai = new Ai()
        const bestMove = ai.getBestMoves(boardState, props.killedGoats, props.unusedGoats, props.trappedTigers, props.turn)
        const returnedData = move(bestMove[0], bestMove[1], boardState, props.unusedGoats, props.killedGoats)
        props.setTurn(returnedData.turn)
        setBoardState(returnedData.boardState)
        props.setTrappedTigers(returnedData.trappedTigers)
        props.setUnusedGoats(returnedData.unusedGoats)
        props.setKilledGoats(returnedData.killedGoats)
        props.setWinner(returnedData.winner)

    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

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
            mySide={props.mySide} setTrappedTigers={props.setTrappedTigers} setUnusedGoats={props.setUnusedGoats} 
            setKilledGoats={props.setKilledGoats} setWinner={props.setWinner}></Valid>)
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

  function handleClick(e){
    e.preventDefault()
    if(props.turn ===  props.mySide){
        const returnedData = move(props.select, [props.coords[0], props.coords[1]], props.boardState, props.unusedGoats, props.killedGoats)
        props.setBoardState(returnedData.boardState)
        props.setTrappedTigers(returnedData.trappedTigers)
        props.setUnusedGoats(returnedData.unusedGoats)
        props.setKilledGoats(returnedData.killedGoats)
        props.setWinner(returnedData.winner)
        props.setTurn(returnedData.turn)
        props.setValidMoves([])

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

