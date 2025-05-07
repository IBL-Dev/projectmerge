import React, { useState } from "react";
import "./AssignmentManager.css";

function AssignmentManager() {
  const [assignments, setAssignments] = useState([]);

  return (
    <div className="assignment-manager">
      <h2>Assignment Management</h2>
      <div className="assignments-list">
        {assignments.map((assignment) => (
          <div key={assignment._id} className="assignment-item">
            <h4>{assignment.applicantName}</h4>
            <p>Type: {assignment.assignmentType}</p>
            <p>Status: {assignment.status}</p>
            <p>Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
            <div className="assignment-actions">
              <button>View Submission</button>
              <button>Grade Assignment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssignmentManager;
