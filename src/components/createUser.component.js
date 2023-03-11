import React, { Component } from "react";
import axios from "axios";

const port =
  // "https://replit.com/@arekso/FoodTracker" ||
  // "https://food-tracker-arek.herokuapp.com" ||
  "http://localhost:5000";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
    };
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };

    console.log(user);

    axios.post(port + "/users/add", user).then((res) => console.log(res.data));

    this.setState({
      username: "",
    });
  }

  render() {
    return (
      <div className="container">
        <h3 className="text-center">Create New User</h3>
        <form onSubmit={this.onSubmit} className="col-md-6 offset-md-3">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="username"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary btn-block"
            />
          </div>
        </form>
      </div>
    );
  }
}
// Needs review

//   render() {
//     return (
//       <div className="container">
//         <h3>Create New User</h3>
//         <form onSubmit={this.onSubmit}>
//           <div className="form-group">
//             <label>Username: </label>
//             <input
//               type="text"
//               required
//               className="form-control"
//               value={this.state.username}
//               onChange={this.onChangeUsername}
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="submit"
//               value="Create User"
//               className="btn btn-primary"
//             />
//           </div>
//         </form>
//       </div>
//     );
//   }
// }
