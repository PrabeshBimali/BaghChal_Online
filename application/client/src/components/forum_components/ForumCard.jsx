import React from 'react'
import './ForumCard.css'
import { BsCalendar } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';



export default function ForumCard(props) {

    const navigate = useNavigate()

    function handleClick(e){
        e.preventDefault()
        navigate(`/forum/${props.data.forumid}`)
    }


  return (
    <div className='forum_card'>
        <div onClick={handleClick} className="forum_card_des">
            {props.data.title}
        </div>
        <div className="forum_card_meta">
            <span><span>Replies:</span>{props.data.replies}</span>
            <span>{props.data.username}</span>
            <span><BsCalendar/>  {props.data.datecreated}</span>
        </div>
    </div>
  )
}
