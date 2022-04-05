import React from 'react'
import './BlogCard.css'

export default function BlogCard(props) {
  return (
    <div className='blog_card'>
        <div className='blog_card_image_container'>
            <img src="https://img1.etsystatic.com/019/0/9161936/il_fullxfull.564171949_ajso.jpg" alt="Baghchal"></img>
        </div>
        <div className='blog_card_body'>
            <div className='blog_card_body_heading'>
                { props.blogData.heading }
            </div>
            <div className='blog_card_body_text'>
                { props.blogData.body }
            </div>
            <div className='blog_card_body_footer'>
                <p>Author: { props.blogData.author }</p>
                <p>{ props.blogData.publishedDate }</p>
            </div>
        </div>
    </div>
  )
}
