import React from 'react'
import './Users.css'
import ReactVirtualizedTable from './UserTable'
import Admin_nav from './Admin-nav'

const Users = () => {
  return (
    <div>
      <div className='adminPanel'>
        <div className="admin-navbar">
      <Admin_nav/>
        </div>
        <div className='users'>
        <div className="userHeading">
            <h1>Users</h1>
            <input type="text" placeholder='Search User' className='search' />
        </div>
        <div className="usersTable">
        <ReactVirtualizedTable/>
        {/* <iframe src="https://shriyansjindal5.retool.com/apps/Vasara%20Users" width="100%" height="800px"></iframe> */}
        </div>
    </div>

    </div>
   
    </div>
  )
}

export default Users
