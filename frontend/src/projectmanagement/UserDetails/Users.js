import React, { useState, useEffect } from 'react';
import axios from "axios";
import User from '../User/User';
import { useNavigate } from 'react-router-dom';
import '../UserDetails/Users.css';

const URL = "http://localhost:8070/projects";

function Users() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(URL);
      const projectsData = response.data.projects || response.data;
      
      if (Array.isArray(projectsData)) {
        setProjects(projectsData);
        setError(null);
      } else {
        throw new Error("Invalid data format received from server");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects. Please try again later.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project");
      }
    }
  };

  const handleView = (id) => {
    navigate(`/project/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-3">Loading projects...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4">
        <h4 className="alert-heading">Error</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Project Management</h1>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/addproject')}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="alert alert-info">
          No projects found. Click "Add New Project" to create one.
        </div>
      ) : (
        <div className="row g-4">
          {projects.map((project) => (
            <div className="col-md-6 col-lg-4" key={project._id}>
              <div className="card h-100">
                <div className="card-header">
                  <small className="text-muted">Project ID: {project._id}</small>
                </div>
                <div className="card-body">
                  <User 
                    user={{ ...project, id: project._id }}
                    onDelete={handleDelete}
                    onView={handleView}
                  />
                </div>
                <div className="card-footer bg-transparent d-flex justify-content-between">
                  <button 
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleView(project._id)}
                  >
                    <i className="bi bi-eye me-1"></i> View
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleEdit(project._id)}
                  >
                    <i className="bi bi-pencil me-1"></i> Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;