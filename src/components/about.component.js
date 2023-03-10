import React, { Component } from "react";

export default class About extends Component {
  render() {
    return (
      <div className="container text-center">
        <h1 className="mb-4">Food Tracker</h1>
        <p className="lead">A full-stack MERN application built with:</p>
        <ul className="list-unstyled">
          <li>MongoDB Atlas - database</li>
          <li>Express - server</li>
          <li>React - front-end framework</li>
          <li>Node.js - back-end framework</li>
          <li>React Router - routing</li>
          <li>Bootstrap - styling</li>
        </ul>
      </div>
    );
  }
}
//   render() {
//     return (
//       <div className="container text-center">
//         <h1>This is a food tracker log application</h1>
//         <p>
//           Full-stack MERN application.
//           <br />
//           MongoDB Atlas is used as the database.
//           <br />
//           Express is used as the server.
//           <br />
//           React is used as the front-end framework. Node.js is used as the
//           back-end framework.
//           <br />
//           React Router is used for routing.
//           <br />
//           Bootstrap is used for styling.
//         </p>
//       </div>
//     );
//   }
// }
