import React from 'react'

export default function Footer() {
  return (
    <footer className="footer-custom">
      <div className="container">
        <span>🍽️ Food Tracker — {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
