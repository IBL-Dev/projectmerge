import React from "react";
import "./ConfirmModal.css";

function ConfirmModal({ isOpen, onClose, onConfirm, applicantName }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete {applicantName}'s application?</p>
        <div className="modal-buttons">
          <button className="btn btn-secondary" onClick={onClose}>
            No
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
