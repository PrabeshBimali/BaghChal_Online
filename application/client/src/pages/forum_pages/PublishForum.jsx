import ForumpageLayout from "./ForumpageLayout";

import React, {useState} from 'react'

export default function PublishForum() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [titleError, setTitleError] = useState("")
    const [descriptionError, setDescriptionError] = useState("")

   function publishForum(e){
       e.preventDefault()
   } 

   function handleChange(event){
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
   }

  return (
    <ForumpageLayout>
        <div className="publish_blog_container">
        <div className="publish_blog_header">Publish Forum</div>
        <form onSubmit={publishForum}className="publish_blog_form">
          <div className="publish_blog_form_input_container">
            <label className="publish_blog_form_label">Title</label>
            <input required="true" minLength={10} value={title} className="publish_blog_form_input" name="title" type="text" 
            placeholder="Blog Title Here ..." onChange={handleChange}></input>
            <p className="publish_error">{titleError.length > 0 ? titleError : null}</p>
          </div>
          <div className="publish_blog_form_input_container">
            <label className="publish_blog_form_label">Description</label>
            <textarea style={{height: '100px'}} required='true' minLength={50} value={description} className="publish_blog_form_input" name="description" 
            placeholder="Blog Description Here ..." onChange={handleChange}></textarea>
            <p className="publish_error">{descriptionError.length > 0 ? descriptionError : null}</p>
          </div>
          <div className="publish_blog_button_container">
            <button className="publish_blog_button">Publish</button>
          </div>
        </form>
      </div>
    </ForumpageLayout>
  )
}
