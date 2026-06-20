import React, { useState } from 'react'
import { api } from '../api'

export default function CreateUser() {
  const [username, setUsername] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.createUser({ username })
      setToast(`User "${username}" created!`)
      setUsername('')
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container">
      {toast && <div className="toast">{toast}</div>}
      <div className="card-custom" style={{ maxWidth: 480, margin: '0 auto' }}>
        <h3 className="card-title"><span>👤</span> Create New User</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              required
              className="form-control"
              id="username"
              placeholder="Enter username (min 3 chars)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
            {submitting ? <><span className="spinner" /> Creating…</> : 'Create User'}
          </button>
        </form>
      </div>
    </div>
  )
}
