import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./Nav.css";

function Nav() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div 
        id="sidebar" 
        className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}
      >
        <div className="sidebar-profile">
          <div className="profile-content">
            <img 
              src="https://randomuser.me/api/portraits/men/1.jpg"  
              alt="User Profile" 
              className="profile-image"
            />
            <div className={`profile-info ${sidebarCollapsed ? 'hidden' : ''}`}>
              <h6>John Doe</h6>
              <small>Administrator</small>
              <div className="logout-btn">
                <button onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </button>
              </div>
            </div>
          </div>
          <hr />
          <h3 className={`sidebar-title ${sidebarCollapsed ? 'hidden' : ''}`}>Dashboard</h3>
        </div>
        <ul className="nav-links">
          <li className="nav-item">
            <NavLink 
              to="/overview" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <i className="fas fa-home"></i>
              <span className={`link-text ${sidebarCollapsed ? 'hidden' : ''}`}>Overview</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/invoice" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <i className="fas fa-file-invoice"></i>
              <span className={`link-text ${sidebarCollapsed ? 'hidden' : ''}`}>Invoice</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/cpayment" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <i className="fas fa-user-tie"></i>
              <span className={`link-text ${sidebarCollapsed ? 'hidden' : ''}`}>Consultant Payment</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/ppayment" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <i className="fas fa-project-diagram"></i>
              <span className={`link-text ${sidebarCollapsed ? 'hidden' : ''}`}>Project Payment</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/client" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <i className="fas fa-project-diagram"></i>
              <span className={`link-text ${sidebarCollapsed ? 'hidden' : ''}`}>client payment</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/refunds" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <i className="fas fa-undo-alt"></i>
              <span className={`link-text ${sidebarCollapsed ? 'hidden' : ''}`}>Refunds</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="content-area">
        {/* Top Navigation Bar */}
        <nav className="top-navbar">
          <div className="navbar-content">
            <div className="sidebar-toggle" onClick={toggleSidebar}>
              <i className="fas fa-bars"></i>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
       
      </div>
    </div>
  );
}

export default Nav;