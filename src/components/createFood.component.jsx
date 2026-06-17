import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateFood() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [foodName, setFoodName] = useState('')
  const [calories, setCalories] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [users, setUsers] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    fetch('/users/')
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setUsers(data.map((u) => u.username))
      })
      .catch((err) => console.error(err))
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('/foods/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, foodName, calories, date: new Date(date) }),
      })
      setToast('Food added!')
      setTimeout(() => navigate('/foodlist'), 800)
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container">
      {toast && <div className="toast">{toast}</div>}
      <div className="card-custom" style={{ maxWidth: 560, margin: '0 auto' }}>
        <h3 className="card-title"><span>➕</span> Create New Food</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <select required className="form-control" value={username} onChange={(e) => setUsername(e.target.value)}>
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Food Name</label>
            <input type="text" className="form-control" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Calories</label>
            <input type="text" className="form-control" value={calories} onChange={(e) => setCalories(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
            {submitting ? <><span className="spinner" /> Saving…</> : 'Create Food'}
          </button>
        </form>
      </div>
    </div>
  )
}
