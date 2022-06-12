import ForumpageLayout from "./ForumpageLayout";
import {marked} from 'marked';
import DOMpurify from 'dompurify'
import React, {useState, useEffect} from 'react'
import "./PublishForum.css"
import { useNavigate } from "react-router-dom";

export default function PublishForum() {

    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState("")
    const [markup, setMarkup] = useState("")
    const [markupError, setMarkUpError] = useState("")

    const navigate = useNavigate()

   async function publishForum(e){
       e.preventDefault()

       try{
        const data = {}

        data.title = title
        data.markup = markup

        const response = await fetch('http://localhost:5000/forum/create', {
          mode: 'cors',
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...data})
        })

        if(response.ok){
          setTitle("")
          setMarkup("")
          navigate("/forum/my")

        }else{
          const data = await response.json()
          console.log(data)
          
          if(data.type === 'title') setTitleError(data.message)
    
          if(data.type === 'markup') setMarkUpError(data.message)
  
        }

       }catch(error){
         console.log("Error while publishing forum")
         console.log(error.message)
       }
       
   } 

   function handleChange(event){
       event.preventDefault()
       const { value } = event.target
   
      setTitle(value)
      setTitleError("")
      
   }

  return (
    <ForumpageLayout>
        <div className="publish_blog_container">
        <div className="publish_blog_header">Publish Forum</div>
        <form onSubmit={publishForum} className="publish_blog_form">
          <div className="publish_blog_form_input_container">
            <label className="publish_blog_form_label">Title</label>
            <input required="true" minLength={3} maxLength={90} value={title} className="publish_blog_form_input" name="title" type="text" 
            placeholder="Blog Title Here ..." onChange={handleChange}></input>
            <p className="publish_error">{titleError.length > 0 ? titleError : null}</p>
          </div>
          <ForumEditor setMarkupProp={setMarkup} setMarkUpError={setMarkUpError}/>
          <p className="publish_error">{markupError.length > 0 ? markupError : null}</p>
          <div className="publish_blog_button_container">
            <button className="publish_blog_button">Publish</button>
          </div>
        </form>
      </div>
    </ForumpageLayout>
  )
}



function ForumEditor(props){

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

        <div className="forum_editor_left">
          <h2>Markup for Forum Body</h2>
          <p className="publish_blog_note">Note: Title from title section above wil be used.</p>
          <textarea required='true' value={editorInput} placeholder="Write your markdown here" className="forum_editor_textarea" 
            onChange={handleChange} type="textarea">
          </textarea>
        </div>
        <div className="forum_editor_right">
          <h2>Preview: </h2>
          <p id="preview" dangerouslySetInnerHTML={{__html: DOMpurify.sanitize(editorOutput)}}></p>
        </div>
      </div>
  )
}