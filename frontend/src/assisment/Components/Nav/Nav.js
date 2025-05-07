import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar">
      <h1 className="logo">Skill Lab</h1>
      <ul className="nav-links">
        <li>
          <Link to="/mainhome" className="active home-a">
            <h4>Home</h4>
          </Link>
        </li>
        <li>
          <Link to="/addapp" className="active home-a">
            <h4>Add Applicant</h4>
          </Link>
        </li>
        <li>
          <Link to="/applicantDetails" className="active home-a">
            <h4>Applicant Details</h4>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
