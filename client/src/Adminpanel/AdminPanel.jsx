import React from 'react'
import Admin_nav from './Admin-nav'
import './AdminPanel.css'
import Users from './Users'

const AdminPanel = () => {
  return (
    <div className='adminPanel'>
        <div className="admin-navbar">
      <Admin_nav/>
        </div>

      <Users/>

    </div>
  )
}

export default AdminPanel
