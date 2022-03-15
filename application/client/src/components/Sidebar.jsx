import React from 'react';
import { BsFillHouseDoorFill } from 'react-icons/bs';
import './Sidebar.css';

export default function Sidebar() {
  return (<div className='sidebar'>
    <div className='sidebar_icon_container'><BsFillHouseDoorFill/><span className='sidebar_icon_text'>Home</span></div>
    <div className='sidebar_icon_container'><BsFillHouseDoorFill/><span className='sidebar_icon_text'>Home</span></div>
    <div className='sidebar_icon_container'><BsFillHouseDoorFill/><span className='sidebar_icon_text'>Home</span></div>
    <div className='sidebar_icon_container'><BsFillHouseDoorFill/><span className='sidebar_icon_text'>Home</span></div>
    <div className='sidebar_icon_container'><BsFillHouseDoorFill/><span className='sidebar_icon_text'>Home</span></div>      
  </div>);
}
