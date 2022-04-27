import React from 'react'
import ForumpageLayout from './ForumpageLayout'

export default function Forumpage() {
  return (
      <ForumpageLayout>
          <table className='forumpage_table'>
            <thead>
              <td>Topic</td>
              <td>Replies</td>
              <td>User</td>
            </thead>
          </table>
      </ForumpageLayout>
    
  )
}
