import React from "react";
import { useNavigate } from "react-router-dom";
import "./BlogCard.css";

export default function BlogCard(props) {
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();
    navigate(`/blogs/${props.blogData.blogid}`)
  }

  return (
    <div className="blog_card" onClick={handleClick}>
      <div className="blog_card_image_container">
        <img
          src="https://img1.etsystatic.com/019/0/9161936/il_fullxfull.564171949_ajso.jpg"
          alt="Baghchal"
        ></img>
      </div>
      <div className="blog_card_body">
        <div className="blog_card_body_heading">{props.blogData.title}</div>
        <div className="blog_card_body_text">{props.blogData.description}</div>
        <div className="blog_card_body_footer">
          <p>Author: {props.blogData.username}</p>
          <p>{props.blogData.datecreated.substring(0, 10)}</p>
        </div>
      </div>
    </div>
  );
}
