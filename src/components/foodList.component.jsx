import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'

const Food = ({ food, onDelete }) => (
  <tr>
    <td>{food.username}</td>
    <td>{food.foodName}</td>
    <td><span className="calorie-badge">{food.calories}</span></td>
    <td>{food.date?.substring(0, 10)}</td>
    <td>
      <Link to={`/edit/${food.id}`} className="action-link edit">Edit</Link>
      <span className="text-muted mx-1">|</span>
      <a href="#" className="action-link delete" onClick={(e) => { e.preventDefault(); onDelete(food.id) }}>Delete</a>
    </td>
  </tr>
)

export default function FoodList() {
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFoods = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.getFoods()
      setFoods(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchFoods() }, [fetchFoods])

  const deleteFood = async (id) => {
    try {
      await api.deleteFood(id)
      setFoods((prev) => prev.filter((el) => el.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container">
      <div className="card-custom">
        <h3 className="card-title">
          <span>📋</span> Food Log
        </h3>
        {loading ? (
          <div className="state-message">
            <div className="state-icon"><span className="spinner" /></div>
            <p>Loading food entries…</p>
          </div>
        ) : foods.length === 0 ? (
          <div className="state-message">
            <div className="state-icon">🍽️</div>
            <p>No food entries yet.</p>
            <Link to="/create" className="btn btn-primary mt-3">Add your first food</Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table-custom">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Food</th>
                  <th>Calories</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {foods.map((food) => (
                  <Food key={food.id || food.username + food.foodName} food={food} onDelete={deleteFood} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
