import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ForumpageLayout from "./ForumpageLayout";
import { BsCalendar } from "react-icons/bs";
import { AccountContext } from "../../contexts/UserContext";
import "./ViewForm.css";
import { marked } from "marked";
import DOMPurify from "dompurify";
import ReplyCard from "../../components/forum_components/ReplyCard";

export default function ViewForum() {
  const { user } = useContext(AccountContext);

  const navigate = useNavigate()

  const [forumDetail, setForumDetail] = useState({});
  const [markup, setMarkup] = useState();
  const [replies, setReplies] = useState([])
  const [updated, setUpdated] = useState(false)
  const [reply, setReply] = useState("")

  const { forumid } = useParams();

  useEffect(()=>{

  }, [reply])

  useEffect(() => {
    async function fetchForum() {
      console.log(forumid);
      try {
        const response = await fetch(
          `http://localhost:5000/forum/detail?forumid=${forumid}`,
          {
            method: "GET",
            mode: "cors",
            credentials: "include",
          }
        );

        if (response.ok) {
          const rawData = await response.json();
          const forumData = rawData.payload;
          setForumDetail({ ...rawData.payload });
          setMarkup(forumData.description);
        } else {
          const rawData = await response.json();
          console.log(rawData.message);
        }
      } catch (error) {
        console.log("Error while fetching blog details");
        console.log(error);
      }
    }

    fetchForum();
  }, []);


  useEffect(()=>{
    async function fetchComments(){
        try{

            const response = await fetch(
                `http://localhost:5000/forum/reply/all?forumid=${forumid}`,
                {
                  method: "GET",
                  mode: "cors",
                  credentials: "include",
                }
              );

              if(response.ok){
                const data = await response.json()
                setReplies(data.payload.replies)
              }

        }catch(error){
            console.log("Error while fetching comments")
            console.log(error.message)
        }
    }

    fetchComments()
  }, [updated])

  function deleteForum(e){

    e.preventDefault()

    async function start(){
      try{

        const response = await fetch(
            `http://localhost:5000/forum/delete?forumid=${forumid}`,
            {
              method: "DELETE",
              mode: "cors",
              credentials: "include",
            }
          );
  
          if(response.ok){
              navigate("/forum/my")
          }else{
            const data = await response.json()
            console.log(data)
          }
  
    }catch(error){
        console.log("Error while fetching comments")
        console.log(error.message)
    }
    }
    
    let val = window.confirm("Are you sure?")

    if(val){
      start()
    }

  }

  return (
    <ForumpageLayout>
      <div className="view_blog_container">
        <div className="forum_data_container">
          <div className="view_forum_title_container">
            <div className="forum_metadata_container">
              <p className="blog_metadata">
                <span>User: {forumDetail.username}</span>
                <span>
                  <BsCalendar /> {forumDetail.datecreated}
                </span>
              </p>
              <div className="blog_metadata_buttons">
                {forumDetail.username === user.username && <span onClick={deleteForum}>Delete</span>}
              </div>
            </div>
            <p className="view_blog_title">{forumDetail.title}</p>
          </div>

          <div
            className="view_forum_body_container"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(markup) }}
          ></div>
        </div>
        <div className="replies_container">
          <div className="replies_title">
            Replies({forumDetail.replies})
          </div>
          <hr/>
          {
            replies.map((value, index) => {
              return <ReplyCard data={value} key={index} forumid={forumid} setUpdated={setUpdated} setReply={setReply}/>
            })
          }
        </div>
        <div className="post_reply_container">
          <ForumEditor forumid={forumid} setUpdated={setUpdated} reply={reply}/>
        </div>
      </div>
    </ForumpageLayout>
  );
}

function ForumEditor(props) {
  const [editorInput, setEditorInput] = useState("");
  const [editorOutput, setEditorOutput] = useState("");
  const [markup, setMarkup] = useState("");
  const [replyError, setReplyError] = useState("")


  useEffect(()=>{

    setEditorInput(props.reply)
  }, [props])

  async function handleClick(event){
      
        event.preventDefault()
    try {
        const dataTosend = {}

        dataTosend.replyValue = markup
        dataTosend.forumid = props.forumid


        const response = await fetch('http://localhost:5000/forum/reply/post', {
            mode: 'cors',
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
              },
            body : JSON.stringify({...dataTosend})
        })

        if(response.ok){
            //const data = await response.json()
            setReplyError("")
            setMarkup("")
            setEditorInput("")
            setEditorOutput("")
            alert("Reply posted")
            props.setUpdated(prev => !prev)
        }else{
            const data = await response.json()
            setReplyError(data.message)
            console.log(data.message)
        }


    
      }catch(error){
          console.log("Error while posting a reply")
          console.log(error.message)
      }
  }

  function handleChange(e) {
    const { value } = e.target;

    setEditorInput(value);
    setReplyError("")
  }

  useEffect(() => {
    const content = () => {
      marked.setOptions({
        breaks: true,
      });
      return marked(editorInput);
    };
    const parsedMarkup = content();

    setEditorOutput(parsedMarkup);
    setMarkup(parsedMarkup);
  }, [editorInput, editorOutput, props]);

  return (
    <div className="editor_wrapper">
      <div className="forum_editor_left">
        <h2 style={{ fontSize: "20px" }}>Reply Markup</h2>
        <textarea
          required="true"
          value={editorInput}
          placeholder="Write your markdown here"
          className="forum_editor_textarea"
          onChange={handleChange}
          type="textarea"
        ></textarea>
        <div className="post_reply_btn_container">
          <button className="post_reply_btn" onClick={handleClick}>Reply</button>
        </div>
        <p className="publish_error">{replyError.length > 0 ? replyError : null}</p>
      </div>
      <div className="forum_editor_right">
        <h2 style={{ fontSize: "20px" }}>Preview: </h2>
        <p
          id="preview"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(editorOutput) }}
        ></p>
      </div>
    </div>
  );
}
