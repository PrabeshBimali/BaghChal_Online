import React, { useContext } from 'react'
import "./CommentCard.css"
import { AccountContext } from '../../contexts/UserContext'
import {CgProfile} from 'react-icons/cg'

export default function CommentCard(props) {

    const {user} = useContext(AccountContext)

    async function deleteComment(){
        try{

            const response = await fetch(
                `http://localhost:5000/blog/comment/delete?commentid=${props.data.commentid}&blogid=${props.blogId}`,
                {
                  method: "DELETE",
                  mode: "cors",
                  credentials: "include",
                }
              );

              if(response.ok){
                  props.setUpdated(prev => !prev)
              }

        }catch(error){
            console.log("Error while fetching comments")
            console.log(error.message)
        }
    }

  return (
    <div className='comment_card'>
        <div className='comment_card_header'>
            <span style={{display: "flex", alignItems: "center", gap: "5px"}}><CgProfile/>{props.data.username}</span>
            <span style={{fontWeight: "normal"}}>{props.data.datecreated}</span>
        </div>
        <div className='comment_card_body'>
            {props.data.commentdata}
        </div>
        <div className='comment_card_footer'>
            {user.username === props.data.username && <span onClick={deleteComment} className='comment_delete'>Delete</span>}
        </div>
    </div>
  )
}
