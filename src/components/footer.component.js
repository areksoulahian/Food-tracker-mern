import React, { Component } from "react";
// import { Link } from "react-router-dom";

export default class Footer extends Component {
  render() {
    return (
      <footer className="bg-dark text-center text-light py-3 my-4">
        <p className="text-center text-muted">
          This is a full-stack MERN application by Arek
        </p>

        <style>
          {`
          footer
          {

            }
        `}
        </style>
      </footer>
    );
  }
}
