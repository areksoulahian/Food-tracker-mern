import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function EditFood() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [foodName, setFoodName] = useState('')
  const [calories, setCalories] = useState('')
  const [date, setDate] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`/foods/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username || '')
        setFoodName(data.foodName || '')
        setCalories(data.calories || '')
        setDate(data.date ? data.date.substring(0, 10) : '')
      })
      .catch((err) => console.error(err))

    fetch('/users/')
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setUsers(data.map((u) => u.username))
        }
      })
      .catch((err) => console.error(err))
  }, [id])

  const onSubmit = async (e) => {
    e.preventDefault()
    const food = { username, foodName, calories, date: new Date(date) }
    console.log(food)
    try {
      await fetch(`/foods/update/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(food),
      })
    } catch (err) {
      console.error(err)
    }
    navigate('/')
  }

  return (
    <div className="container">
      <h3>Edit Food Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <select
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Food:</label>
          <input
            type="text"
            className="form-control"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Calories:</label>
          <input
            type="text"
            className="form-control"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <div>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group d-flex justify-content-end">
          <button type="submit" className="btn btn-primary mr-2">Edit Food Log</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
