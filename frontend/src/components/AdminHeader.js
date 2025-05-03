import React, { useState } from "react";
import logo from "../images/logo (2).png"; // Import the logo
import { Link } from "react-router-dom";
import "./Header.css"; // Import the custom CSS file

function AdminHeader() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-navy"> {/* Use bg-navy here */}
      <div className="container-fluid">
        {/* Logo on the left */}
        <Link className="navbar-brand" to="/">
          <img
            src={logo} // Use the imported logo
            alt="Logo"
            width="70"
            height="50"
            className="d-inline-block align-text-top"
          />
        </Link>

        {/* Navbar toggler button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNav}
          aria-controls="navbarSupportedContent"
          aria-expanded={isNavOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation panel (centered) */}
        <div
          className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">
                Link
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/">
                    Action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/add">
                    Another
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Home">
                    Something else here
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <span className="nav-link disabled" aria-disabled="true">
                Disabled
              </span>
            </li>
          </ul>

          {/* Dashboard Button on the right */}
          <Link to="/dashboard" className="btn btn-outline-light me-2">
            Dashboard
          </Link>

          {/* Search form on the right */}
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default AdminHeader;