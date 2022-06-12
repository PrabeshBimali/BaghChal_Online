import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import BlogspageLayout from "./BlogspageLayout";
import "./ViewBlog.css";
import { BsCalendar } from "react-icons/bs";
import CommentCard from "../../components/blogpage_components/CommentCard";
import { AccountContext } from "../../contexts/UserContext";

export default function ViewBlog() {
  const [blogDetail, setBlogDetail] = useState({});
  const [markup, setMarkup] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [commentError, setCommentError] = useState("")
  const [success, setSuccess] = useState("")
  const [comments, setComments] = useState([])
  const [updated, setUpdated] = useState(false)

  const navigate = useNavigate()

  const {user} = useContext(AccountContext)


  const { blogId } = useParams();

  function handleChange(e) {
    e.preventDefault();
    setCommentValue(e.target.value);
    setCommentError("")
    setSuccess("")
  }

  async function postComment(event) {
      event.preventDefault()
    try {
        const dataTosend = {}

        dataTosend.commentValue = commentValue
        dataTosend.blogId = blogId


        const response = await fetch('http://localhost:5000/blog/comment/post', {
            mode: 'cors',
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
              },
            body : JSON.stringify({...dataTosend})
        })

        if(response.ok){
            const data = await response.json()
            setSuccess(data.payload.message)
            setCommentError("")
            setCommentValue("")
            setUpdated(prev => !prev)
        }else{
            const data = await response.json()
            setCommentError(data.message)
        }


    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await fetch(
          `http://localhost:5000/blog/detail?blogid=${blogId}`,
          {
            method: "GET",
            mode: "cors",
            credentials: "include",
          }
        );

        if (response.ok) {
          const rawData = await response.json();
          const blogData = rawData.payload;
          setBlogDetail({ ...rawData.payload });
          setMarkup(blogData.markup);
        } else {
          const rawData = await response.json();
          console.log(rawData.message);
        }
      } catch (error) {
        console.log("Error while fetching blog details");
        console.log(error);
      }
    }

    fetchBlog();
  }, []);


  function handleEdit(){
    navigate(`/blogs/edit/${blogId}`)
  }

  useEffect(()=>{
    async function fetchComments(){
        try{

            const response = await fetch(
                `http://localhost:5000/blog/comment/all?blogId=${blogId}`,
                {
                  method: "GET",
                  mode: "cors",
                  credentials: "include",
                }
              );

              if(response.ok){
                const data = await response.json()
                setComments(data.payload.comments)
              }

        }catch(error){
            console.log("Error while fetching comments")
            console.log(error.message)
        }
    }

    fetchComments()
  }, [updated])

  async function deleteBlog(){
    try{

      const response = await fetch(
          `http://localhost:5000/blog/delete?blogid=${blogId}`,
          {
            method: "DELETE",
            mode: "cors",
            credentials: "include",
          }
        );

        if(response.ok){
            navigate("/blogs/my")
        }else{
          const data = await response.json()
          console.log(data)
        }

  }catch(error){
      console.log("Error while fetching comments")
      console.log(error.message)
  }
  }

  return (
    <BlogspageLayout>
      <div className="view_blog_container">
        <div className="view_blog_image"></div>
        <div className="view_blog_title_container">
          <p className="view_blog_title">{blogDetail.title}</p>
          <div className="blog_metadata_container">
          <p className="blog_metadata">
            <span>User: {blogDetail.username}</span>
            <span>
              <BsCalendar /> {blogDetail.datecreated}
            </span>
          </p>
          <div className="blog_metadata_buttons">
            {/* {blogDetail.username === user.username && <span onClick={handleEdit}>Edit</span>} */}
            {blogDetail.username === user.username && <span onClick={deleteBlog}>Delete</span>}
          </div>
          </div>
          </div>

        <div
          className="view_blog_body_container"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(markup) }}
        ></div>
        <div className="view_blog_footer_container">
          <div className="comment_title">
            Comments({blogDetail.blogcomments})
          </div>
          <div className="post_comment_container">
            <textarea onChange={handleChange} value={commentValue}></textarea>
            <div className="post_comment_button_container">
              <button onClick={postComment} className="post_comment_button">
                Post
              </button>
              
            </div>
            {success && <p className="comment_success">{success}</p>}
            {commentError && <p className="comment_error">{commentError}</p>}
            <div className="comments_container">
                {
                    comments.map((value, index) => {
                        return <CommentCard key={index} data={value} blogId={blogId} setUpdated={setUpdated}></CommentCard>
                    })
                }
            </div>
          </div>
        </div>
      </div>
    </BlogspageLayout>
  );
}
