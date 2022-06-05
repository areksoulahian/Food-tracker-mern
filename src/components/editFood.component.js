import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const port =
  "https://food-tracker-arek.herokuapp.com" || "http://localhost:5000";

export default class EditFood extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCalories = this.onChangeCalories.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      calories: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get(port + "/foods/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          username: res.data.username,
          description: res.data.description,
          calories: res.data.calories,
          date: new Date(res.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(port + "/users/")
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            users: res.data.map((user) => user.username),
          });
        }
      })
      .catch((err) => console.log(err + "axios error"));
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeCalories(e) {
    this.setState({
      calories: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const food = {
      username: this.state.username,
      description: this.state.description,
      calories: this.state.calories,
      date: this.state.date,
    };

    console.log(food);

    axios
      .post(port + "/foods/update" + this.match.params.id, food)
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div className="container-fluid">
        <h3>Edit Food Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
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
          {/* 
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div> */}

          <div className="form-group">
            <label>Calories: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.calories}
              onChange={this.onChangeCalories}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
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
              value="Edit Food log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
