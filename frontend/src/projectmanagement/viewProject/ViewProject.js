import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

const URL = "http://localhost:8070/projects";

function ViewProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('Pending');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProject = async () => {
      try {
        if (!id) throw new Error("No project ID provided");

        setLoading(true);
        setError(null);
        
        const response = await axios.get(`${URL}/${id}`);
        const projectData = response.data.project || response.data;
        
        if (!projectData) throw new Error("Project data not found");
        if (isMounted) {
          setProject(projectData);
          setStatus(projectData.status || 'Pending');
        }
        
      } catch (error) {
        console.error("Error:", error);
        if (isMounted) {
          setError(error.message || "Failed to load project");
          setProject(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProject();
    return () => { isMounted = false; };
  }, [id]);

  const handleBack = () => navigate(-1);
  const handleRetry = () => {
    setError(null);
    setLoading(true);
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    
    try {
      setIsUpdating(true);
      
      // Prepare the update data with all required fields
      const updateData = {
        ...project,
        status: newStatus
      };

      // Remove MongoDB's internal fields that shouldn't be sent
      delete updateData._id;
      delete updateData.__v;
      delete updateData.createdAt;
      delete updateData.updatedAt;

      const response = await axios.put(`${URL}/${id}`, updateData);
      
      // Update local state with the response
      setProject(response.data);
    } catch (error) {
      console.error("Error updating status:", error);
      alert(`Failed to update status: ${error.response?.data?.message || error.message}`);
      // Revert to previous status if update fails
      setStatus(project.status);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return (
    <div className="text-center p-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p>Loading project details...</p>
    </div>
  );

  if (error) return (
    <div className="container mt-5">
      <div className="alert alert-danger">
        <h4>Error</h4>
        <p>{error}</p>
        <div className="d-flex gap-2">
          <button className="btn btn-secondary" onClick={handleBack}>
            Back
          </button>
          <button className="btn btn-primary" onClick={handleRetry}>
            Retry
          </button>
        </div>
      </div>
    </div>
  );

  if (!project) return (
    <div className="container mt-5">
      <div className="alert alert-warning">
        <h4>Not Found</h4>
        <p>Project not found</p>
        <button className="btn btn-secondary" onClick={handleBack}>
          Back to Projects
        </button>
      </div>
    </div>
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Project Details</h1>
        <button className="btn btn-outline-secondary" onClick={handleBack}>
          Back to Projects
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-light">
          <h2 className="mb-1">{project.projectTitle || 'Untitled Project'}</h2>
          <small className="text-muted">Project ID: {project._id}</small>
        </div>

        <div className="card-body">
          {/* Basic Information Section */}
          <div className="mb-4">
            <h4 className="mb-3">Basic Information</h4>
            <div className="row">
              <div className="col-md-6 mb-3">
                <h6>Customer Name</h6>
                <p>{project.customerName || 'Not specified'}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Customer Email</h6>
                <p>
                  {project.customerEmail ? (
                    <a href={`mailto:${project.customerEmail}`}>
                      {project.customerEmail}
                    </a>
                  ) : 'Not specified'}
                </p>
              </div>
            </div>
            <div className="mb-3">
              <h6>Project Description</h6>
              <p className="text-muted">
                {project.projectDescription || 'No description available'}
              </p>
            </div>
          </div>

          {/* Status Section */}
          <div className="mb-4">
            <h4 className="mb-3">Project Status</h4>
            <div className="row align-items-center">
              <div className="col-md-6 mb-3">
                <div className="input-group">
                  <select
                    className={`form-select ${
                      status === 'Completed' ? 'border-success' :
                      status === 'In Progress' ? 'border-warning' :
                      'border-secondary'
                    }`}
                    value={status}
                    onChange={handleStatusChange}
                    disabled={isUpdating}
                  >           
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  {isUpdating && (
                    <span className="input-group-text">
                      <div className="spinner-border spinner-border-sm text-primary" role="status">
                        <span className="visually-hidden">Updating...</span>
                      </div>
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <span className={`badge rounded-pill ${
                  status === 'Completed' ? 'bg-success' :
                  status === 'In Progress' ? 'bg-warning' :
                  'bg-secondary'
                }`}>
                  Current Status: {status}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <h6>Budget</h6>
              <p>${project.budget?.toLocaleString() || 'Not specified'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h6>Timeline</h6>
              <p>{project.timeline || 'Not specified'}</p>
            </div>
          </div>

          {/* Additional Requirements */}
          {project.additionalRequirements && (
            <div className="mb-4">
              <h4 className="mb-3">Additional Requirements</h4>
              <p>{project.additionalRequirements}</p>
            </div>
          )}

          {/* Assigned Developer */}
          {project.assignedDeveloper && (
            <div className="mb-4">
              <h4 className="mb-3">Assigned Developer</h4>
              <p>{project.assignedDeveloper.name || 'Developer assigned'}</p>
            </div>
          )}
        </div>

        <div className="card-footer text-muted">
          Last updated: {formatDate(project.updatedAt)}
        </div>
      </div>
    </div>
  );
}

export default ViewProject;