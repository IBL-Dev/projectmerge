import React from "react";
import "./ApplicantGrid.css";

function ApplicantGrid({
  applicants,
  viewMode,
  onViewApplicant,
  onAssignTask,
}) {
  return (
    <div className={`applicant-container ${viewMode}`}>
      {applicants.map((applicant) => (
        <div key={applicant._id} className="applicant-card">
          <div className="applicant-header">
            <h3>{applicant.name}</h3>
            <span className={`status-badge ${applicant.status}`}>
              {applicant.status}
            </span>
          </div>

          <div className="applicant-info">
            <p>Position: {applicant.jobTitle}</p>
            <p>Email: {applicant.email}</p>
            {applicant.status === "assignment_sent" && (
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${applicant.progress || 0}%` }}
                ></div>
              </div>
            )}
          </div>

          <div className="action-buttons">
            <button
              onClick={() => window.open(applicant.resumePath, "_blank")}
              className="btn-secondary"
            >
              View CV
            </button>
            <button
              onClick={() => onViewApplicant(applicant)}
              className="btn-primary"
            >
              Review
            </button>
            <button
              onClick={() => onAssignTask(applicant._id)}
              className="btn-outline"
            >
              Assign Task
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ApplicantGrid;
