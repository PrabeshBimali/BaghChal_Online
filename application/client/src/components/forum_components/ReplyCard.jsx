import React, { useContext } from "react";
import "./ReplyCard.css";
import { BsCalendar } from "react-icons/bs";
import { AccountContext } from "../../contexts/UserContext";
import DOMPurify from 'dompurify'; 


export default function ReplyCard(props) {

  const {user} = useContext(AccountContext)

  function newReply(){
    props.setReply("")
    props.setReply(`To @${user.username}:`)
  }

  async function deleteReply(){
    try{

        const response = await fetch(
            `http://localhost:5000/forum/reply/delete?repliesid=${props.data.repliesid}&forumid=${props.forumid}`,
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
    <>
      <div className="reply_card_container">
        <div className="reply_card_metadata">
          <span>{props.data.username}</span>
          <span><BsCalendar/><span>{props.data.datecreated}</span></span>
        </div>
        <div className="reply_card_content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.data.markup) }}>
        </div>
        <div className="reply_card_footer">
          <span onClick={deleteReply}>{user.username === props.data.username && "Delete"}</span>
          <span onClick={newReply}>Reply</span>
        </div>
      </div>
    </>
  );
}
