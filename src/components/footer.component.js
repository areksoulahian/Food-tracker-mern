import React, { Component } from "react";
// import { Link } from "react-router-dom";
export default class Footer extends Component {
  render() {
    return (
      <footer className="footer mt-auto bg-dark text-center text-light py-3">
        <div className="container">
          <p className="text-center text-muted">
            This is a full-stack MERN application by Arek
          </p>
        </div>

        <style>
          {`
          .footer{
            margin-top: 1rem;
            padding: 1rem;
            background-color: rgb(235, 195, 64);
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            }
        `}
        </style>
      </footer>
    );
  }
}
