/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const port =
  // "https://areksoulahian.com/food-tracker" ||
  // "https://food-tracker-arek.herokuapp.com" ||
  "http://localhost:5000";

const Food = (props) => (
  <tr>
    <td>{props.food.username}</td>
    <td>{props.food.foodName}</td>
    {/* <td>{props.food.description}</td> */}
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
      .get(port + "/foods/")
      .then((response) => {
        this.setState({ foods: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteFood(id) {
    axios
      .delete(port + "/foods/delete/" + id)
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
      <div className="container">
        <h3 className="text-center">Food Log</h3>
        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead className="thead-light">
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Food</th>
                {/* <th scope="col" className="d-none d-md-table-cell">
                  Description
                </th> */}
                <th scope="col">Calories</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>{this.foodList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

//   render() {
//     return (
//       <div className="container">
//         <h3 className="text-center">Food Log</h3>
//         <table className="table table-dark" responsive="sm">
//           <thead className="thead-light">
//             <tr>
//               <th scope="col">Username</th>
//               <th scope="col">Food</th>
//               {/* <th id="description" scope="col">
//                 Description
//               </th> */}
//               <th scope="col">Calories</th>
//               <th scope="col">Date</th>
//               <th scope="col">Actions</th>
//             </tr>
//           </thead>
//           <tbody>{this.foodList()}</tbody>
//         </table>
//         <style>
//           {/* {`
//             @media (max-width:650px)
//             {
//               th#description{
//                 display:none;
//               }
//             }
//           `} */}
//         </style>
//       </div>
//     );
//   }
// }
