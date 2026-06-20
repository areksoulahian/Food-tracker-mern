import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../api'

export default function EditFood() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [foodName, setFoodName] = useState('')
  const [calories, setCalories] = useState('')
  const [date, setDate] = useState('')
  const [users, setUsers] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getFoodById(id).then((data) => {
      setUsername(data.username || '')
      setFoodName(data.foodName || '')
      setCalories(data.calories || '')
      setDate(data.date ? data.date.substring(0, 10) : '')
    }).catch((err) => console.error(err))
      .finally(() => setLoading(false))

    api.getUsers().then((data) => {
      if (data.length > 0) setUsers(data.map((u) => u.username))
    }).catch((err) => console.error(err))
  }, [id])

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.updateFood(id, { username, foodName, calories, date: new Date(date) })
      navigate('/foodlist')
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="card-custom" style={{ maxWidth: 560, margin: '0 auto' }}>
          <div className="state-message">
            <div className="state-icon"><span className="spinner" /></div>
            <p>Loading food entry…</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="card-custom" style={{ maxWidth: 560, margin: '0 auto' }}>
        <h3 className="card-title"><span>✏️</span> Edit Food Log</h3>
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
            <label>Food</label>
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
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success flex-fill" disabled={submitting}>
              {submitting ? <><span className="spinner" /> Saving…</> : 'Update Food'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/foodlist')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
