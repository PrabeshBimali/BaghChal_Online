import React from 'react';
import { ImBlog } from 'react-icons/im'
import { MdNavigation, MdForum, MdHomeFilled } from 'react-icons/md'
import './Sidebar.css';
import { Link } from 'react-router-dom';


export default function Sidebar() {
  return (<div className='sidebar'>
    <div style={{fontSize: "30px"}} className='navigation_icon'>
      <MdNavigation />
    </div>
    <Link className='sidebar_link' to="/">
      <div className='sidebar_icon_container'>
        <MdHomeFilled/>
        <span className='sidebar_icon_text'>Home</span>
      </div>
    </Link>
    <Link className='sidebar_link' to="/blogs">
      <div className='sidebar_icon_container'>
        <ImBlog />
        <span className='sidebar_icon_text'>Blog</span>
      </div>
    </Link>
    <Link className='sidebar_link' to="/forum">
      <div className='sidebar_icon_container'>
        <MdForum />
        <span className='sidebar_icon_text'>Forum</span>
      </div>
    </Link>
    
  </div>);
}
