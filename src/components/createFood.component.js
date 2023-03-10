import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const port =
  "https://food-tracker-arek.herokuapp.com" || "http://localhost:5000";

export default class CreateFood extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFoodName = this.onChangeFoodName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCalories = this.onChangeCalories.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      foodName: "",
      // description: "",
      calories: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get(port + "/users/")
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            users: res.data.map((user) => user.username),
          });
        }
      })
      .catch((err) => console.log(err));
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeFoodName = (e) => {
    this.setState({
      foodName: e.target.value,
    });
  };

  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onChangeCalories = (e) => {
    this.setState({
      calories: e.target.value,
    });
  };

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newFood = {
      username: this.state.username,
      foodName: this.state.foodName,
      description: this.state.description,
      calories: this.state.calories,
      date: this.state.date,
    };

    console.log(newFood);

    axios
      .post(port + "/foods/add", newFood)
      .then((res) => console.log(res.data));

    this.setState({
      username: "",
      foodName: "",
      // description: "",
      calories: "",
    });
  };

  render() {
    return (
      <div className="container p-3 bg-light">
        <h3>Create New Food</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Username:
            </label>
            <select
              ref="this.myRef"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map((user) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Food Name:
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.foodName}
              onChange={this.onChangeFoodName}
            />
          </div>

          <div className="form-group">
            <label style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Calories:
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.calories}
              onChange={this.onChangeCalories}
            />
          </div>
          <div className="form-group">
            <label style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Date:
            </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Food"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

// render() {
//   return (
//     <div className="container">
//       <h3>Create New Food</h3>
//       <form onSubmit={this.onSubmit}>
//         <div className="form-group">
//           <label>Username: </label>
//           <select
//             ref="this.myRef"
//             required
//             className="form-control"
//             value={this.state.username}
//             onChange={this.onChangeUsername}
//           >
//             {this.state.users.map((user) => {
//               return (
//                 <option key={user} value={user}>
//                   {user}
//                 </option>
//               );
//             })}
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Food Name: </label>
//           <input
//             type="text"
//             className="form-control"
//             value={this.state.foodName}
//             onChange={this.onChangeFoodName}
//           />
//         </div>

//         {/* <div className="form-group">
//           <label>Description: </label>
//           <input
//             type="text"
//             className="form-control"
//             value={this.state.description}
//             onChange={this.onChangeDescription}
//           />
//         </div> */}

//         <div className="form-group">
//           <label>Calories: </label>
//           <input
//             type="text"
//             className="form-control"
//             value={this.state.calories}
//             onChange={this.onChangeCalories}
//           />
//         </div>
//         <div className="form-group">
//           <label>Date: </label>
//           <div>
//             <DatePicker
//               selected={this.state.date}
//               onChange={this.onChangeDate}
//             />
//           </div>
//         </div>

//         <div className="form-group">
//           <input
//             type="submit"
//             value="Create Food"
//             className="btn btn-primary"
//           />
//         </div>
//       </form>
//     </div>
//   );
// }
// }
