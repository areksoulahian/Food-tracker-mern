import React, { Component } from "react";
// import { Link } from "react-router-dom";

export default class Footer extends Component {
  render() {
    return (
      <footer
        className="footer mt-auto py-3 bg-light"
        style={{ position: "fixed", bottom: 0, width: "100%" }}
      >
        <div className="container">
          <span className="text-muted">Arek food tracker project</span>
        </div>
      </footer>
    );
  }
}
