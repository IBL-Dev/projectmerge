import React, { useState } from "react";
import "./DetailedViewModal.css";

function DetailedViewModal({ applicant, onClose, onStatusUpdate }) {
  const [notes, setNotes] = useState("");

  const handleStatusChange = async (newStatus) => {
    try {
      // Update status logic here
      await onStatusUpdate(applicant._id, newStatus);
      onClose();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{applicant.name}</h2>
          <button onClick={onClose} className="close-btn">
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="applicant-details">
            <p>
              <strong>Position:</strong> {applicant.jobTitle}
            </p>
            <p>
              <strong>Email:</strong> {applicant.email}
            </p>
            <p>
              <strong>Status:</strong> {applicant.status}
            </p>
          </div>

          <div className="review-notes">
            <h3>Review Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your review notes here..."
            />
          </div>

          <div className="decision-buttons">
            <button
              onClick={() => handleStatusChange("shortlisted")}
              className="btn-success"
            >
              Shortlist
            </button>
            <button
              onClick={() => handleStatusChange("rejected")}
              className="btn-danger"
            >
              Reject
            </button>
            <button
              onClick={() => handleStatusChange("reviewing")}
              className="btn-warning"
            >
              Request Resubmission
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailedViewModal;
