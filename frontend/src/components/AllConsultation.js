import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllConsultations() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const getConsultations = async () => {
      try {
        const response = await axios.get("http://localhost:8070/consultation/");
        setConsultations(response.data);
      } catch (err) {
        console.error("Error fetching consultations:", err);
        setError("Failed to load consultations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getConsultations();
  }, []);

  // Filter consultations based on search term and status filter
  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = 
      consultation.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.projectName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "All" || 
      consultation.status?.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Function to get priority badge class
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'Low': return 'bg-info';
      case 'Medium': return 'bg-primary';
      case 'High': return 'bg-warning';
      case 'Critical': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  // Function to get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending': return 'bg-secondary';
      case 'In Progress': return 'bg-warning';
      case 'Completed': return 'bg-success';
      case 'Cancelled': return 'bg-danger';
      default: return 'bg-light text-dark';
    }
  };

  // Function to handle consultation deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this consultation?")) {
      try {
        await axios.delete(`http://localhost:8070/consultation/delete/${id}`);
        setConsultations(consultations.filter(consultation => consultation._id !== id));
      } catch (err) {
        console.error("Error deleting consultation:", err);
        setError("Failed to delete consultation. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-4">
        {error}
        <button 
          className="btn btn-sm btn-outline-danger ms-3" 
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h2 className="h4 mb-0">Consultation Management</h2>
          <Link to="/consultation/add" className="btn btn-light">
            <i className="fas fa-plus me-2"></i>Add New Consultation
          </Link>
        </div>

        <div className="card-body">
          {/* Search and Filter Bar */}
          <div className="row mb-4">
            <div className="col-md-8">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name, email, or project..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select 
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Consultations Table */}
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Date & Time</th>
                  <th>Project</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredConsultations.length > 0 ? (
                  filteredConsultations.map((consultation) => (
                    <tr key={consultation._id}>
                      <td>
                        <strong>{consultation.fullName}</strong>
                      </td>
                      <td>
                        <div>{consultation.email}</div>
                        <small className="text-muted">{consultation.phone}</small>
                      </td>
                      <td>
                        {new Date(consultation.dateTime).toLocaleDateString()}
                        <br />
                        <small className="text-muted">
                          {new Date(consultation.dateTime).toLocaleTimeString()}
                        </small>
                      </td>
                      <td>
                        <strong>{consultation.projectName}</strong>
                        <div 
                          className="text-truncate" 
                          style={{ maxWidth: '150px' }} 
                          title={consultation.projectDescription}
                        >
                          {consultation.projectDescription}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${getPriorityBadgeClass(consultation.priority)}`}>
                          {consultation.priority}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(consultation.status)}`}>
                          {consultation.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link 
                            to={`/consultation/${consultation._id}`} 
                            className="btn btn-sm btn-outline-primary"
                            title="View Details"
                          >
                            <i className="fas fa-eye"></i>
                          </Link>
                          
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(consultation._id)}
                            title="Delete"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      {searchTerm || statusFilter !== "All" ? (
                        `No consultations found matching your criteria`
                      ) : (
                        "No consultations available. Create your first consultation!"
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}