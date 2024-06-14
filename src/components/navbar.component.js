import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              Food-Tracker
            </Link>
            <ul className="navbar-nav">
              <div className="row">
                <div className="col-auto">
                  <li className="nav-item">
                    <Link to="/user" className="nav-link active">
                      Create User
                    </Link>
                  </li>
                </div>
                <div className="col">
                  <li className="nav-item">
                    <Link to="/create" className="nav-link active">
                      Add Food
                    </Link>
                  </li>
                </div>
                <div className="col">
                  <li className="nav-item">
                    <Link to="/foodlist" className="nav-link active">
                      Food List
                    </Link>
                  </li>
                </div>
                <div className="col">
                  <li className="nav-item">
                    <Link to="/about" className="nav-link active">
                      About
                    </Link>
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
