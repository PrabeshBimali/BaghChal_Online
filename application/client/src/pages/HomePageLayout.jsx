import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import './HomePageLayout.css'

export default function HomePageLayout({children}) {
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
