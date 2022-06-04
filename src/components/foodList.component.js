/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Food = (props) => (
  <tr>
    <td>{props.food.username}</td>
    <td>{props.food.foodName}</td>
    <td>{props.food.description}</td>
    <td>{props.food.calories}</td>
    <td>{props.food.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.food._id}>Edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteFood(props.food._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class foodList extends Component {
  constructor(props) {
    super(props);

    this.deleteFood = this.deleteFood.bind(this);

    this.state = {
      foods: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/foods/")
      .then((response) => {
        this.setState({ foods: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteFood(id) {
    axios
      .delete("http://localhost:5000/foods/delete/" + id)
      .then((res) => console.log(res.data));

    this.setState({
      foods: this.state.foods.filter((el) => el._id !== id),
    });
  }

  foodList() {
    return this.state.foods.map((currentfood) => {
      return (
        <Food
          food={currentfood}
          deleteFood={this.deleteFood}
          key={currentfood._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Food Log</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Food</th>
              <th>Description</th>
              <th>Calories</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.foodList()}</tbody>
        </table>
      </div>
    );
  }
}
