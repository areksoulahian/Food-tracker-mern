import React, { useState, useEffect } from 'react'

export default function CreateFood() {
  const [username, setUsername] = useState('')
  const [foodName, setFoodName] = useState('')
  const [calories, setCalories] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/users/')
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setUsers(data.map((u) => u.username))
        }
      })
      .catch((err) => console.error(err))
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    const newFood = { username, foodName, calories, date: new Date(date) }
    console.log(newFood)
    try {
      await fetch('/foods/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFood),
      })
    } catch (err) {
      console.error(err)
    }
    setUsername('')
    setFoodName('')
    setCalories('')
    setDate(new Date().toISOString().split('T')[0])
  }

  return (
    <div className="container p-3 bg-light">
      <h3>Create New Food</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Username:</label>
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
          <label style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Food Name:</label>
          <input
            type="text"
            className="form-control"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Calories:</label>
          <input
            type="text"
            className="form-control"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Date:</label>
          <div>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Create Food" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}
