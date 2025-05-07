import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./JobList.css";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5002/jobs");
      setJobs(res.data.jobs);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to fetch jobs");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      try {
        await axios.delete(`http://localhost:5002/jobs/${id}`);
        setJobs(jobs.filter((job) => job._id !== id));
      } catch (err) {
        console.error("Error deleting job:", err);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatSalary = (min, max, currency) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      maximumFractionDigits: 0,
    });
    
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  if (loading) return <div className="loading">Loading job listings...</div>;
  if (error) return <div className="error">{error}</div>;
  if (jobs.length === 0) {
    return (
      <div className="job-list-container">
        <div className="job-list-header">
          <h1>Job Postings</h1>
          <button
            className="create-job-btn"
            onClick={() => navigate("/dashboard/jobs/create")}
          >
            Create New Job
          </button>
        </div>
        
        <div className="no-jobs">
          <div className="empty-state-icon">📋</div>
          <h3>No Job Postings Yet</h3>
          <p>Create your first job posting to get started with recruitment.</p>
          <button
            className="create-job-btn"
            onClick={() => navigate("/dashboard/jobs/create")}
          >
            Create New Job
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="job-list-container">
      <div className="job-list-header">
        <h1>Job Postings</h1>
        <button
          className="create-job-btn"
          onClick={() => navigate("/dashboard/jobs/create")}
        >
          Create New Job
        </button>
      </div>

      <div className="jobs-grid">
        {jobs.map((job) => (
          <div key={job._id} className="job-card">
            <div className="job-card-header">
              <h2>{job.title}</h2>
              <span className={`status-badge ${job.status.toLowerCase()}`}>
                {job.status}
              </span>
            </div>

            <div className="job-info">
              <p>
                <strong>Department</strong>
                {job.department}
              </p>
              <p>
                <strong>Location</strong>
                {job.location}
              </p>
              <p>
                <strong>Type</strong>
                {job.jobType}
              </p>
              <p>
                <strong>Experience</strong>
                {job.experience.min}-{job.experience.max} {job.experience.unit}
              </p>
              <p>
                <strong>Salary</strong>
                {job.salary && job.salary.min && job.salary.max ? (
                  formatSalary(job.salary.min, job.salary.max, job.salary.currency)
                ) : (
                  "Competitive"
                )}
              </p>
              <p>
                <strong>Deadline</strong>
                {formatDate(job.deadline)}
              </p>
            </div>

            <div className="job-actions">
              <button
                className="view-btn"
                onClick={() => navigate(`/dashboard/jobs/${job._id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobList;