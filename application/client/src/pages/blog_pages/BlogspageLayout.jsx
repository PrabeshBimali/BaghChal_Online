import './BlogspageLayout.css'
import { NavLink } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'

export default function Blogspage({children}) {
  return (
    <div className='blogspage'>
        <Topbar/>
        <div className='main_wrapper'>
            <Sidebar/>
            <div className='blogspage_wrapper'>
                <div className="blogspage_container">
                    <div className='blogspage_header'>
                        <NavLink to='/blogs' className='blogspage_link' activeStyle={{color: "red"}}>Community Blogs</NavLink>
                        <NavLink to='/blogs/liked' className='blogspage_link' activeStyle={{color: "red"}}>Liked Blogs</NavLink>
                        <NavLink to='/blogs/my' className='blogspage_link'>Your Blogs</NavLink>
                        <NavLink to='/blogs/commented' className='blogspage_link'>Commented Blogs</NavLink>
                        <NavLink to='/blogs/publish' className='blogspage_link'>Publish Blog</NavLink>
                    </div>
                    <div className='blogs_container'>
                        {children}
                    </div>               
                </div>   
            </div>
        </div>
    </div>
    
  )
}
