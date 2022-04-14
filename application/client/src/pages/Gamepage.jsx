import React from 'react'
import HomePageLayout from './HomePageLayout'
import Board from '../components/gamepage_components/Board'
import './Gamepage.css'

export default function GamePage() {
  return (
    <HomePageLayout>
        <div className='gamepage_container'>
            <div className='gamepage_left'>
                <Board/>
            </div>
            <div className='gamepage_right'>
                Chat
            </div>
        </div>
    </HomePageLayout>
    
  )
}
