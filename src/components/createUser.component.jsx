import React, { useState } from 'react'

export default function CreateUser() {
  const [username, setUsername] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const user = { username }
    console.log(user)
    try {
      await fetch('/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
    } catch (err) {
      console.error(err)
    }
    setUsername('')
  }

  return (
    <div className="container">
      <h3 className="text-center">Create New User</h3>
      <form onSubmit={onSubmit} className="col-md-6 offset-md-3">
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            required
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Create User" className="btn btn-primary btn-block" />
        </div>
      </form>
    </div>
  )
}
