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
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/foodlist" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link">
                  Add Food
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user" className="nav-link">
                  Create User
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
// OLD CODE NEEDS REVIEW FOR DELETEION

// export default class Navbar extends Component {
//   render() {
//     return (
//       <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
//         <div className="container-fluid">
//           <Link to="/" className="navbar-brand">
//             Food-Tracker
//           </Link>
//           <div className="collpase navbar-collapse">
//             <ul className="navbar-nav mr-auto">
//               <li className="navbar-item">
//                 <Link to="/foodlist" className="nav-link">
//                   Home
//                 </Link>
//               </li>
//               <li className="navbar-item">
//                 <Link to="/create" className="nav-link">
//                   Add Food
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <ul className="nav navbar-nav">
//             <li className="navbar-item">
//               <Link to="/about" className="nav-link">
//                 About
//               </Link>
//             </li>
//             <li className="">
//               <Link to="/user" className="nav-link">
//                 Create User
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     );
//   }
// }
