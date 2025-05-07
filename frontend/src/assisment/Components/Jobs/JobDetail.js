import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import JobConfirmModal from "./components/JobConfirmModal";
import "react-toastify/dist/ReactToastify.css";
import "./JobDetail.css";

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await axios.get(`http://localhost:5002/jobs/${id}`);
      setJob(res.data.job);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching job:", err);
      setError("Failed to fetch job details");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5002/jobs/${id}`);
      toast.success("Job deleted successfully!");
      setTimeout(() => navigate("/dashboard/jobs"), 2000);
    } catch (err) {
      console.error("Error deleting job:", err);
      toast.error("Failed to delete job");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <div className="loading">Loading job details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!job) return <div className="error">Job not found</div>;

  return (
    <div className="job-detail-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="job-detail-header">
        <button
          className="back-btn"
          onClick={() => navigate("/dashboard/jobs")}
        >
          Back to Jobs
        </button>
        <div className="header-actions">
          <button
            className="edit-btn"
            onClick={() => navigate(`/dashboard/jobs/edit/${id}`)}
          >
            Edit Job
          </button>
          <button
            className="delete-btn"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Job
          </button>
        </div>
      </div>

      <JobConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          handleDelete();
          setShowDeleteModal(false);
        }}
        jobTitle={job.title}
        action="delete"
      />

      <div className="job-detail-content">
        <div className="job-header">
          <h1>{job.title}</h1>
          <span className={`status-badge ${job.status.toLowerCase()}`}>
            {job.status}
          </span>
        </div>

        <div className="job-meta">
          <div className="meta-item">
            <strong>Department:</strong> <span>{job.department}</span>
          </div>
          <div className="meta-item">
            <strong>Location:</strong> <span>{job.location}</span>
          </div>
          <div className="meta-item">
            <strong>Job Type:</strong> <span>{job.jobType}</span>
          </div>
          <div className="meta-item">
            <strong>Experience:</strong> <span>{job.experience.min}-{job.experience.max} {job.experience.unit}</span>
          </div>
          <div className="meta-item">
            <strong>Salary Range:</strong> <span>{job.salary.currency} {job.salary.min.toLocaleString()}-{job.salary.max.toLocaleString()}</span>
          </div>
          <div className="meta-item">
            <strong>Application Deadline:</strong> <span>{formatDate(job.deadline)}</span>
          </div>
        </div>

        <div className="job-section">
          <h2>Job Description</h2>
          <p>{job.description}</p>
        </div>

        <div className="job-section">
          <h2>Requirements</h2>
          <ul>
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="job-section">
          <h2>Responsibilities</h2>
          <ul>
            {job.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;