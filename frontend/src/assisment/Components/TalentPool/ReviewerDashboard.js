import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ReviewerDashboard.css";

function ReviewerDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5002/applicants");
        const applicationsData = res.data.applicants || res.data;
        setApplications(
          Array.isArray(applicationsData) ? applicationsData : []
        );
        setError(null);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load applications");
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="reviewer-dashboard">
      <h1>Talent Pool Dashboard</h1>
      {applications.length === 0 ? (
        <div className="no-applications">No applications found</div>
      ) : (
        <div className="applications-grid">
          {applications.map((app) => (
            <div key={app._id} className="application-card">
              <h3>{app.name}</h3>
              <p>Position: {app.jobTitle}</p>
              <p>Status: {app.status}</p>
              <div className="action-buttons">
                <button
                  onClick={() => window.open(app.resumePath, "_blank")}
                  className="btn btn-secondary"
                >
                  View CV
                </button>
                <button
                  onClick={() => navigate(`/review/${app._id}`)}
                  className="btn btn-primary"
                >
                  Review Application
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewerDashboard;
