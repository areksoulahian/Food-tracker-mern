import React, { Component } from "react";

export default class About extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1>This is a food tracker log application</h1>
        <p>
          Full-stack MERN application.
          <br />
          MongoDB Atlas is used as the database.
          <br />
          Express is used as the server.
          <br />
          React is used as the front-end framework. Node.js is used as the
          back-end framework.
          <br />
          React Router is used for routing.
          <br />
          Bootstrap is used for styling.
        </p>
      </div>
    );
  }
}
