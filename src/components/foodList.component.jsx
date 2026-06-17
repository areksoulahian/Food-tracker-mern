import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

const Food = ({ food, onDelete }) => (
  <tr>
    <td>{food.username}</td>
    <td>{food.foodName}</td>
    <td>{food.calories}</td>
    <td>{food.date?.substring(0, 10)}</td>
    <td>
      <Link to={`/edit/${food.id}`}>Edit</Link> |{' '}
      <a href="#" onClick={(e) => { e.preventDefault(); onDelete(food.id) }}>Delete</a>
    </td>
  </tr>
)

export default function FoodList() {
  const [foods, setFoods] = useState([])

  const fetchFoods = useCallback(async () => {
    try {
      const res = await fetch('/foods/')
      const data = await res.json()
      setFoods(data)
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => {
    fetchFoods()
  }, [fetchFoods])

  const deleteFood = async (id) => {
    try {
      await fetch(`/foods/${id}`, { method: 'DELETE' })
      setFoods((prev) => prev.filter((el) => el.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container">
      <h3 className="text-center">Food Log</h3>
      <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead className="thead-light">
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Food</th>
              <th scope="col">Calories</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <Food key={food.id} food={food} onDelete={deleteFood} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
