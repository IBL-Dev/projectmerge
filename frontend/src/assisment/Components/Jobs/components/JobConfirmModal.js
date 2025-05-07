import React from "react";
import "./JobConfirmModal.css";

function JobConfirmModal({ isOpen, onClose, onConfirm, jobTitle, action }) {
  if (!isOpen) return null;

  const messages = {
    delete: {
      title: "Confirm Delete",
      message: `Are you sure you want to delete the job posting for "${jobTitle}"?`,
      confirmButton: "Yes, Delete",
      cancelButton: "No, Keep It",
    },
    archive: {
      title: "Confirm Archive",
      message: `Are you sure you want to archive the job posting for "${jobTitle}"?`,
      confirmButton: "Yes, Archive",
      cancelButton: "No, Keep Active",
    },
    // Add more actions as needed
  };

  const currentAction = messages[action] || messages.delete;

  return (
    <div className="job-modal-overlay">
      <div className="job-modal-content">
        <h2>{currentAction.title}</h2>
        <p>{currentAction.message}</p>
        <p className="warning-text">This action cannot be undone.</p>
        <div className="job-modal-buttons">
          <button className="btn-secondary" onClick={onClose}>
            {currentAction.cancelButton}
          </button>
          <button className="btn-danger" onClick={onConfirm}>
            {currentAction.confirmButton}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobConfirmModal;
