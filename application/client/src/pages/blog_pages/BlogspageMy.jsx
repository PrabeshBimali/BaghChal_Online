import {useState, useEffect} from 'react'
import BlogspageLayout from './BlogspageLayout'
import BlogCard from '../../components/blogpage_components/BlogCard'

export default function BlogsPageMy() {

  const [allBlogs, setAllBlogs] = useState([])

  useEffect(()=>{
    async function getBlogs(){
      try{
        const response = await fetch('http://localhost:5000/blog/my', {
          mode: 'cors',
          method: 'GET',
          credentials: 'include'
        });

        if(response.ok){
          console.log('ok')
          const data = await response.json()
          setAllBlogs(data.payload.blogs)
        }

      }catch(error){
        console.log('Error while fetching all blogs')
        console.log(error)
      }
    }

    getBlogs()

  }, [])

  return (
    <BlogspageLayout>
      {
        allBlogs.map(value => {
          return <BlogCard blogData={value}/>
        })
      }
    </BlogspageLayout>
  )
}
