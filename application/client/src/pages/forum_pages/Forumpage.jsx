import React, {useState, useEffect} from 'react'
import ForumpageLayout from './ForumpageLayout'
import ForumCard from '../../components/forum_components/ForumCard'

export default function Forumpage() {

  const [allForums, setAllForums] = useState([])

  useEffect(()=>{
    async function getForums(){
      try{
        const response = await fetch('http://localhost:5000/forum/all', {
          mode: 'cors',
          method: 'GET',
          credentials: 'include'
        });

        if(response.ok){
          console.log('ok')
          const data = await response.json()
          setAllForums(data.payload.forums)
        }

      }catch(error){
        console.log('Error while fetching all Forums')
        console.log(error)
      }
    }

    getForums()

  }, [])

  return (
      <ForumpageLayout>
          {
        allForums.map(value => {
          return <ForumCard data={value}/>
        })
      }
      </ForumpageLayout>
    
  )
}
