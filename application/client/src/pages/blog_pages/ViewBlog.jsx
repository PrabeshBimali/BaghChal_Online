import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import BlogspageLayout from './BlogspageLayout'
import './ViewBlog.css'

export default function ViewBlog() {

    const [blogDetail, setBlogDetail] = useState({})
    const [markup, setMarkup] = useState("")

    useEffect(() => {
        const pathname = window.location.pathname
        const pattern = /\d+/g
        const blogid = pathname.match(pattern).join()

        async function fetchBlog(){
            try{
                const response = await fetch(`http://localhost:5000/blog/detail?blogid=${blogid}`, {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include'
                })

                if(response.ok){
                    const rawData = await response.json()
                    const blogData = rawData.payload
                    setBlogDetail({...rawData.payload})
                    setMarkup(blogData.markup)
                    
                }else{
                    const rawData = await response.json()
                    console.log(rawData.message)
                }
            }catch(error){
                console.log('Error while fetching blog details')
                console.log(error)
            }
            
        }

        fetchBlog()

    }, [])

  return (
    <BlogspageLayout>
        <div className='view_blog_container'>
            <div className='view_blog_image'>

            </div>
            <div className='view_blog_title_container'>
                <p className='view_blog_title'>{blogDetail.title}</p>
            </div>
            <div className='view_blog_body_container' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(markup)}}>
            </div>
            <div className='view_blog_footer_container'>
                <p>Comments({blogDetail.blogcomments})</p>
            </div>
        </div>
    </BlogspageLayout>
    
  )
}
