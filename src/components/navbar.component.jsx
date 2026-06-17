import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/foodlist', label: 'Food Log' },
  { to: '/create', label: 'Add Food' },
  { to: '/user', label: 'Create User' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="navbar navbar-expand-md navbar-custom">
      <div className="container">
        <Link to="/" className="navbar-brand text-white" onClick={() => setOpen(false)}>
          <span className="brand-icon">🍽️</span> FoodTracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {open && <div className="sidebar-overlay d-md-none" onClick={() => setOpen(false)} />}
        <div className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            {links.map((link) => (
              <li className="nav-item" key={link.to}>
                <Link
                  to={link.to}
                  className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
