import React from "react";
import "./StatsOverview.css";

function StatsOverview({ applicants }) {
  const stats = {
    total: applicants.length,
    shortlisted: applicants.filter((app) => app.status === "shortlisted")
      .length,
    underReview: applicants.filter((app) => app.status === "reviewing").length,
    rejected: applicants.filter((app) => app.status === "rejected").length,
    completedAssignments: applicants.filter(
      (app) => app.status === "assignment_completed"
    ).length,
  };

  return (
    <div className="stats-overview">
      <div className="stat-card total">
        <h3>Total Applicants</h3>
        <span className="stat-number">{stats.total}</span>
      </div>
      <div className="stat-card shortlisted">
        <h3>Shortlisted</h3>
        <span className="stat-number">{stats.shortlisted}</span>
      </div>
      <div className="stat-card under-review">
        <h3>Under Review</h3>
        <span className="stat-number">{stats.underReview}</span>
      </div>
      <div className="stat-card rejected">
        <h3>Rejected</h3>
        <span className="stat-number">{stats.rejected}</span>
      </div>
      <div className="stat-card completed">
        <h3>Completed Assignments</h3>
        <span className="stat-number">{stats.completedAssignments}</span>
      </div>
    </div>
  );
}

export default StatsOverview;
