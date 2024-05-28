import React from 'react'
import './Users.css'
import ReactVirtualizedTable from './ColorTable'
import Admin_nav from './Admin-nav'
const Colors = () => {
  return (
    <div>
      <div className='adminPanel'>
        <div className="admin-navbar">
      <Admin_nav/>
        </div>
        <div className='users'>
        <div className="userHeading">
            <h1>Colors</h1>
            <input type="text" placeholder='Search User' className='search' />
        </div>
        <div className="usersTable">
        <ReactVirtualizedTable/>
        </div>
    </div>

    </div>
   
    </div>
  )
}

export default Colors
