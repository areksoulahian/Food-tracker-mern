import React from 'react'

const techs = [
  { icon: '⚛️', name: 'React' },
  { icon: '🟢', name: 'Express' },
  { icon: '💚', name: 'Node.js' },
  { icon: '🧭', name: 'React Router' },
  { icon: '🎨', name: 'Bootstrap' },
  { icon: '⚡', name: 'Vite' },
]

export default function About() {
  return (
    <div className="container">
      <div className="card-custom" style={{ maxWidth: 620, margin: '0 auto' }}>
        <h3 className="card-title"><span>ℹ️</span> About Food Tracker</h3>
        <p className="lead mb-3">
          Track your daily meals and calories with ease.
        </p>
        <ol className="list-unstyled" style={{ lineHeight: 2 }}>
          <li>1️⃣ <strong>Create a user</strong> — set up your profile</li>
          <li>2️⃣ <strong>Add a food item</strong> — log what you ate</li>
          <li>3️⃣ <strong>Check the food log</strong> — review your entries</li>
        </ol>
        <hr className="my-3" />
        <p className="fw-semibold mb-3">Built with:</p>
        <div className="about-grid">
          {techs.map((t) => (
            <div key={t.name} className="tech-item">
              <span className="tech-icon">{t.icon}</span>
              {t.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
