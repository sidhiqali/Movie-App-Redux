import React from 'react'
import './Header.scss'
import user from '../../image/user.png'
function Header() {
  return (
    <div className="header">
      <div className="logo">Movie App</div>
      <div className="logo-img">
        <img src={user} alt="user" />
      </div>
    </div>
  )
}

export default Header
