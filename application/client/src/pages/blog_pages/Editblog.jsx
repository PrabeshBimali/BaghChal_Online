import React, { useEffect, useState } from "react";
import {marked} from 'marked';
import DOMpurify from 'dompurify'
import BlogspageLayout from "./BlogspageLayout";
import "./PublishBlog.css";
import { useNavigate, useParams } from "react-router-dom";

export default function Editblog() {
  
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState()
    const [markup, setMarkup] = useState("")
    const [titleError, setTitleError] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const [markupError, setMarkUpError] = useState("")
    
    const navigate = useNavigate()
    const {blogid} = useParams()
  
    const handleChange = (event) => {
  
      event.preventDefault()
      const { value } = event.target
  
      if(event.target.attributes.name.nodeValue === 'title'){
        setTitle(value)
        setTitleError("")
      }
  
      if(event.target.attributes.name.nodeValue === 'description'){
        setDescription(value)
        setDescriptionError("")
      }
  
      if(event.target.attributes.name.nodeValue === 'file'){
        const fileValue = event.target.files[0]
        setFile(fileValue)
      }
  
    }

    
    useEffect(() => {
        async function fetchBlog() {
          try {
            const response = await fetch(
              `http://localhost:5000/blog/detail?blogid=${blogid}`,
              {
                method: "GET",
                mode: "cors",
                credentials: "include",
              }
            );
    
            if (response.ok) {
              const rawData = await response.json();
              const blogData = rawData.payload;
              setMarkup(blogData.markup);
              setTitle(blogData.title);
              setDescription(blogData.description)
            } else {
              const rawData = await response.json();
              console.log(rawData.message);
            }
          } catch (error) {
            console.log("Error while fetching blog details");
            console.log(error);
          }
        }

        fetchBlog()
    }, [])
  
  
    const publishBlog = async (event) => {
  
  
      event.preventDefault()
      try{
  
        const data = new FormData()
        
        data.append('title', title)
        data.append('description', description)
        data.append('file', file)
        data.append('markup', markup)
  
        const response = await fetch('http://localhost:5000/blog/create', {
          mode: 'cors',
          method: 'POST',
          credentials: 'include',
          body: data
        })
  
        if(response.ok){
          setTitle("")
          setDescription("")
          setMarkup("")
          navigate("/blogs/my")
        }else{
          const data = await response.json()
          console.log(data)
          
          if(data.type === 'title') setTitleError(data.message)
  
          if(data.type === 'description') setDescriptionError(data.message)
  
          if(data.type === 'markup') setMarkUpError(data.message)
  
        }
  
      }catch(error){
        console.log('Error while publishing Blog:')
        console.log(error)
      }
  
  
    }
  
    return (
      <BlogspageLayout>
        <div className="publish_blog_container">
          <div className="publish_blog_header">Publish Blog</div>
          <form onSubmit={publishBlog}className="publish_blog_form">
            <div className="publish_blog_form_input_container">
              <label className="publish_blog_form_label">Blog Title</label>
              <input required="true" minLength={10} value={title} className="publish_blog_form_input" name="title" type="text" 
              placeholder="Blog Title Here ..." onChange={handleChange}></input>
              <p className="publish_error">{titleError.length > 0 ? titleError : null}</p>
            </div>
            <div className="publish_blog_form_input_container">
              <label className="publish_blog_form_label">Blog Description</label>
              <textarea required='true' minLength={50} value={description} className="publish_blog_form_input" name="description" 
              placeholder="Blog Description Here ..." onChange={handleChange}></textarea>
              <p className="publish_error">{descriptionError.length > 0 ? descriptionError : null}</p>
            </div>
            <div className="publish_blog_form_input_container">
              <label className="publish_blog_form_label">choose image (Optional):</label>
              <input className="choose_image_input" name="file" type="file" accept="image/*"
               onChange={(event) => {
                const value = event.target.files[0]
                setFile(value)
              }}></input>
              {/* <p className="publish_error">{titleError.length > 0 ? titleError : null}</p> */}
            </div>
            
            <BlogEditor setMarkupProp={setMarkup} setMarkUpError={setMarkUpError}/>
            <p className="publish_error">{markupError.length > 0 ? markupError : null}</p>
            <div className="publish_blog_button_container">
              <button className="publish_blog_button">Publish</button>
            </div>
          </form>
        </div>
      </BlogspageLayout>
    );
}


function BlogEditor(props){

    const [editorInput, setEditorInput] = useState("");
    const [editorOutput, setEditorOutput] = useState("");
  
    function handleChange(e){
      
      const { value } = e.target
  
      setEditorInput(value)
      props.setMarkUpError("")
      
    }
  
    useEffect(()=>{
      const content = ()=>{
        marked.setOptions({
          breaks: true
        })
          return marked(editorInput)
       }
       const parsedMarkup = content()
  
       setEditorOutput(parsedMarkup)
       props.setMarkupProp(parsedMarkup)
  
    }, [editorInput, editorOutput, props])
  
  
    return(
      <div className='editor_wrapper'>
  
          <div className="editor_left">
            <h2>Markup for Blog Body</h2>
            <p className="publish_blog_note">Note: Title from title section above wil be used.</p>
            <textarea required='true' value={editorInput} placeholder="Write your markdown here" className="editor_textarea" 
              onChange={handleChange} name="markup" type="textarea">
            </textarea>
          </div>
          <div className="editor_right">
            <h2>Preview: </h2>
            <p id="preview" dangerouslySetInnerHTML={{__html: DOMpurify.sanitize(editorOutput)}}></p>
          </div>
        </div>
    )
  }
  
  
