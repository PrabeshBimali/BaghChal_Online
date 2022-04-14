import React from 'react'
import './Board.css'

export default function Board() {

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7,8, 9, 9, 9, 9, 9, 9 ,9 ,9 ,9]

  return (
    <div className='board'>
        {
            arr.map((value) => {
                return <Circle/>
            })
        }
    </div>
  )
}

function Circle(){
    return(
        <div className='circle_container'>
            <div className='circle'>

            </div>
        </div>
    )
}
