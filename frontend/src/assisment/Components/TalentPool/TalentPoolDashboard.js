import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./TalentPoolDashboard.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function TalentPoolDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Check if screen is mobile on initial load
  useEffect(() => {
    const checkIfMobile = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };
    
    // Check on initial load
    checkIfMobile();
    
    // Set up listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const menuItems = [
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      title: "Add Applicant",
      icon: <PersonAddIcon />,
      path: "/dashboard/addapp",
    },
    {
      title: "All Applicants",
      icon: <PeopleIcon />,
      path: "/dashboard/applicants",
    },
    {
      title: "Jobs",
      icon: <WorkIcon />,
      path: "/dashboard/jobs",
    },
    {
      title: "Assignments",
      icon: <AssignmentIcon />,
      path: "/dashboard/assignments",
    },
    {
      title: "Settings",
      icon: <SettingsIcon />,
      path: "/dashboard/settings",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeSidebar();
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>Talent Pool</h2>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`nav-item ${window.location.pathname === item.path ? "active" : ""}`}
              onClick={() => handleNavigation(item.path)}
            >
              {item.icon}
              <span>{item.title}</span>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="nav-item logout">
            <LogoutIcon />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Toggle Button - Always visible */}
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        aria-expanded={isSidebarOpen}
      >
        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Overlay - Only for mobile */}
      {isSidebarOpen && window.innerWidth < 768 && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? "with-sidebar" : "full-width"}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default TalentPoolDashboard;