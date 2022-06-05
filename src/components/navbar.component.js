import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Food-Tracker
          </Link>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/foodlist" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">
                  Create Food
                </Link>
              </li>
            </ul>
          </div>
          <ul className="nav navbar-nav">
            <li className="navbar-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="">
              <Link to="/user" className="nav-link">
                Create User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
