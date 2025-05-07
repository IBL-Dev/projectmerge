import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DashboardHome.css";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PendingIcon from "@mui/icons-material/Pending";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

function DashboardHome() {
  const [stats, setStats] = useState({
    totalApplicants: 0,
    activeJobs: 0,
    pendingApplications: 0,
    completedAssignments: 0,
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:5002/api/dashboard/stats"
        );
        setStats(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Sample data for recent applications - replace with real API data later
  const recentApplications = [
    { 
      id: 1, 
      name: "John Doe", 
      position: "Frontend Developer", 
      status: "pending", 
      date: "May 2, 2025" 
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      position: "UI/UX Designer", 
      status: "reviewing", 
      date: "May 1, 2025" 
    },
    { 
      id: 3, 
      name: "Mike Johnson", 
      position: "Backend Developer", 
      status: "shortlisted", 
      date: "Apr 30, 2025" 
    }
  ];

  // Sample data for active jobs - replace with real API data later
  const activeJobs = [
    { id: 1, title: "Frontend Developer", applications: 5, postedDate: "Apr 25, 2025" },
    { id: 2, title: "UI/UX Designer", applications: 3, postedDate: "Apr 28, 2025" },
    { id: 3, title: "Backend Developer", applications: 7, postedDate: "Apr 20, 2025" }
  ];

  // Loading skeleton for stat cards
  const renderSkeletonStat = () => (
    <div className="stat-card" style={{ opacity: 0.7 }}>
      <div className="stat-header">
        <div className="stat-icon" style={{ background: "#f1f5f9" }}></div>
        <div>
          <p className="stat-title" style={{ background: "#f1f5f9", width: "100px", height: "16px" }}></p>
          <h2 className="stat-value" style={{ background: "#f1f5f9", width: "60px", height: "30px", marginTop: "8px" }}></h2>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-home">
      <h1>Dashboard Overview</h1>

      <div className="stats-section">
        {loading ? (
          <>
            {renderSkeletonStat()}
            {renderSkeletonStat()}
            {renderSkeletonStat()}
            {renderSkeletonStat()}
          </>
        ) : (
          <>
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon">
                  <PersonIcon />
                </div>
                <div>
                  <p className="stat-title">Total Applicants</p>
                  <h2 className="stat-value">{stats.totalApplicants}</h2>
                  <div className="stat-change positive">
                    <TrendingUpIcon style={{ fontSize: "1rem" }} />
                    <span>12% increase</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon">
                  <WorkIcon />
                </div>
                <div>
                  <p className="stat-title">Active Jobs</p>
                  <h2 className="stat-value">{stats.activeJobs}</h2>
                  <div className="stat-change positive">
                    <TrendingUpIcon style={{ fontSize: "1rem" }} />
                    <span>5% increase</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon">
                  <PendingIcon />
                </div>
                <div>
                  <p className="stat-title">Pending Applications</p>
                  <h2 className="stat-value">{stats.pendingApplications}</h2>
                  <div className="stat-change negative">
                    <TrendingDownIcon style={{ fontSize: "1rem" }} />
                    <span>3% decrease</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon">
                  <AssignmentIcon />
                </div>
                <div>
                  <p className="stat-title">Completed Assignments</p>
                  <h2 className="stat-value">{stats.completedAssignments}</h2>
                  <div className="stat-change positive">
                    <TrendingUpIcon style={{ fontSize: "1rem" }} />
                    <span>8% increase</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="content-section">
        <div className="recent-applications">
          <div className="section-header">
            <h2>Recent Applications</h2>
            <a href="/applicantDetails" className="view-all">
              View All
            </a>
          </div>
          <div className="application-list">
            {recentApplications.map(app => (
              <div className="application-item" key={app.id}>
                <div className="applicant-info">
                  <h3>{app.name}</h3>
                  <p>{app.position}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", color: "#64748b", fontSize: "0.85rem" }}>
                    <CalendarTodayIcon style={{ fontSize: "0.9rem", marginRight: "0.3rem" }} />
                    {app.date}
                  </div>
                  <span className={`status-indicator ${app.status}`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="recent-applications">
          <div className="section-header">
            <h2>Active Jobs</h2>
            <a href="/jobs" className="view-all">
              View All
            </a>
          </div>
          <div className="application-list">
            {activeJobs.map(job => (
              <div className="application-item" key={job.id}>
                <div className="applicant-info">
                  <h3>{job.title}</h3>
                  <p>{job.applications} applications</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", color: "#64748b", fontSize: "0.85rem" }}>
                    <CalendarTodayIcon style={{ fontSize: "0.9rem", marginRight: "0.3rem" }} />
                    {job.postedDate}
                  </div>
                  <button style={{ 
                    background: "transparent", 
                    border: "none", 
                    cursor: "pointer",
                    color: "#64748b",
                    padding: "0.3rem",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s ease"
                  }}>
                    <MoreHorizIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;