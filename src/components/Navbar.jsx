import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-link">Business</Link>
        <Link to="/sales" className="navbar-link">Sales Person</Link>
        <Link to="/shop" className="navbar-link">Shop</Link>
      </div>
    </nav>

  )
}

export default Navbar