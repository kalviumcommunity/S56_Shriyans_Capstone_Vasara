import React from 'react'
import './Users.css'

const Users = () => {
  return (
    <div className='users'>
        <div className="userHeading">
            <h1>Users</h1>
            <input type="text" placeholder='Search User' className='search' />
        </div>
    </div>
  )
}

export default Users
