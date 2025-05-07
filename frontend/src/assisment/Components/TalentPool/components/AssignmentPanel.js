import React from "react";
import "./AssignmentPanel.css";

function AssignmentPanel({ applicants }) {
  const assignmentStats = {
    completed: applicants.filter((app) => app.status === "assignment_completed")
      .length,
    pending: applicants.filter((app) => app.status === "assignment_sent")
      .length,
    failed: applicants.filter((app) => app.status === "assignment_failed")
      .length,
  };

  return (
    <div className="assignment-panel">
      <h2>Assignment Management</h2>
      <div className="assignment-stats">
        <div className="stat-item">
          <span className="stat-label">Completed</span>
          <span className="stat-value">{assignmentStats.completed}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Pending</span>
          <span className="stat-value">{assignmentStats.pending}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Failed</span>
          <span className="stat-value">{assignmentStats.failed}</span>
        </div>
      </div>
    </div>
  );
}

export default AssignmentPanel;
