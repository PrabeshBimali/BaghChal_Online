import React, { useEffect, useState } from "react";
import {marked} from 'marked';
import DOMpurify from 'dompurify'
import BlogspageLayout from "./BlogspageLayout";
import "./PublishBlog.css";


export default function PublishBlog() {
  return (
    <BlogspageLayout>
      <div className="publish_blog_container">
        <div className="publish_blog_header">Publish Blog</div>
        <form className="publish_blog_form">
          <div className="publish_blog_form_input_container">
            <label className="publish_blog_form_label">Blog Title</label>
            <input type="text" placeholder="Blog Title Here ..."></input>
          </div>
          <div className="publish_blog_form_input_container">
            <label className="publish_blog_form_label">Blog Description</label>
            <textarea className="publish_blog_form_textarea" type="textarea" placeholder="Blog Description Here ..."></textarea>
          </div>
          <BlogEditor/>
          <button>Publish</button>
        </form>
      </div>
    </BlogspageLayout>
  );
}

function BlogEditor(){

  const [editorInput, setEditorInput] = useState("");
  const [editorOutput, setEditorOutput] = useState("");

  function handleChange(e){
    setEditorInput(e.target.value)
    console.log(editorInput)
  }

  useEffect(()=>{
    const content = ()=>{
      marked.setOptions({
        breaks: true
      })
        return marked(editorInput)
     }

     setEditorOutput(content())
     console.log(editorOutput)

  }, [editorInput, editorOutput])


  return(
    <div className='editor_wrapper'>
        <div className="editor_left">
          <h2>Markup for Blog Body</h2>
          <textarea value={editorInput} placeholder="Write your markdown here" className="editor_textarea" 
            onChange={handleChange} type="textarea">
          </textarea>
        </div>
        {/* <div className="editor_right">
          <h2>Preview: </h2>
          <p id="preview" dangerouslySetInnerHTML={{__html: DOMpurify.sanitize(editorOutput)}}></p>
        </div> */}
      </div>
  )
}

// function LoginFirst(){
//   <div className="login_first_container">
//     <div className="login_first_text_container">
//       Sign In to publish
//     </div>
//   </div>
// }
