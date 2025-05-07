import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import "./Applicant.css";

function Applicant({ applicant, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

  if (!applicant) {
    return <h2>No applicant data available</h2>;
  }

  const { _id, name, email, resumePath, jobTitle, status } = applicant;

  // For debugging
  console.log("Applicant data:", applicant);
  console.log("Applicant ID:", _id);

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`http://localhost:5002/applicants/${_id}`);
      if (onDelete) {
        onDelete(_id);
      }
    } catch (err) {
      console.error("Error deleting applicant:", err);
      setError("Failed to delete applicant");
    } finally {
      setIsDeleting(false);
      setShowConfirmModal(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowConfirmModal(false);
  };

  const handleUpdate = () => {
    if (_id) {
      console.log("Navigating to update page with id:", _id);
      navigate(`/applicants/${_id}`);
    } else {
      console.error("No applicant ID available");
    }
  };

  return (
    <div className="applicant-card">
      <br />
      <h2>Name: {name || "N/A"}</h2>
      <h2>Email: {email || "N/A"}</h2>
      <h2>Resume Path: {resumePath || "N/A"}</h2>
      <h2>Job Title: {jobTitle || "N/A"}</h2>
      <h2>Status: {status || "N/A"}</h2>

      <div className="button-group">
        <button
          onClick={handleUpdate}
          className="btn btn-primary"
          style={{ marginRight: "10px" }}
        >
          Update
        </button>

        <button
          onClick={handleDeleteClick}
          className="btn btn-danger"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      {error && <div className="text-danger mt-2">{error}</div>}

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        applicantName={name}
      />
    </div>
  );
}

export default Applicant;
