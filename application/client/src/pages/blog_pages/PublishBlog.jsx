import React from "react";
import BlogspageLayout from "./BlogspageLayout";
import "./PublishBlog.css";

export default function PublishBlog() {
  return (
    <BlogspageLayout>
      <div className="publish_blog_header">Publish Blog</div>
      <form className="publish_blog_form">
        <div>
          <label className="blog_form_label">Blog Title</label>
          <input type="text" placeholder="Blog Title Here ..."></input>
        </div>
        <div>
          <label className="blog_form_label">Blog Description</label>
          <input
            type="textarea"
            placeholder="Blog Description Here ..."
          ></input>
        </div>
      </form>
    </BlogspageLayout>
  );
}
