import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function ViewConsultation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [consultation, setConsultation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/consultation/get/${id}`);
        setConsultation(response.data.consultation);
        setStatus(response.data.consultation.status || "Pending");
        setAmount(response.data.consultation.amount || 0);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch consultation");
      } finally {
        setLoading(false);
      }
    };
    fetchConsultation();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    setError(null);
    try {
      const updatedConsultation = { ...consultation, status: newStatus };
      await axios.put(`http://localhost:8070/consultation/update/${id}`, updatedConsultation);
      setConsultation(updatedConsultation);
      setStatus(newStatus);
      setSuccessMessage("Status updated successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAmountUpdate = async () => {
    if (isNaN(amount) || amount < 0) {
      setError("Please enter a valid positive amount");
      return;
    }
    
    setIsUpdating(true);
    setError(null);
    try {
      const updatedConsultation = { ...consultation, amount };
      await axios.put(`http://localhost:8070/consultation/update/${id}`, updatedConsultation);
      setConsultation(updatedConsultation);
      setSuccessMessage("Amount updated successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update amount");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this consultation?")) return;

    try {
      await axios.delete(`http://localhost:8070/consultation/delete/${id}`);
      navigate("/consultations", { state: { message: "Consultation deleted successfully!" } });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete consultation");
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'Low': return 'bg-info';
      case 'Medium': return 'bg-primary';
      case 'High': return 'bg-warning';
      case 'Critical': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending': return 'bg-secondary';
      case 'Finished': return 'bg-success';
      case 'Not Seen Yet': return 'bg-danger';
      default: return 'bg-light text-dark';
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
      <div className="container mt-4">
        <div className="alert alert-danger">
          {error}
          <div className="mt-3">
            <Link to="/consultations" className="btn btn-primary">
              Back to Consultations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!consultation) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          Consultation not found
          <div className="mt-3">
            <Link to="/consultations" className="btn btn-primary">
              Back to Consultations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h2 className="h4 mb-0">Consultation Details</h2>
          <Link to="/consultations" className="btn btn-light">
            <i className="fas fa-arrow-left me-2"></i>Back to List
          </Link>
        </div>

        <div className="card-body">
          {successMessage && (
            <div className="alert alert-success alert-dismissible fade show">
              {successMessage}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setSuccessMessage(null)}
              ></button>
            </div>
          )}

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-bold">Full Name</label>
                <p className="form-control-plaintext">{consultation.fullName}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Email</label>
                <p className="form-control-plaintext">{consultation.email}</p>
              </div>
              <div className="mb-3">
  <label className="form-label fw-bold">Phone</label>
  <p className="form-control-plaintext">
    <a 
      href={`https://wa.me/${consultation.phone.replace(/^0/, '94')}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-decoration-none"
    >
      {consultation.phone}
      <i className="fab fa-whatsapp ms-2 text-success"></i>
    </a>
  </p>
</div>
              <div className="mb-3">
                <label className="form-label fw-bold">Date and Time</label>
                <p className="form-control-plaintext">
                  {new Date(consultation.dateTime).toLocaleDateString()} at {' '}
                  {new Date(consultation.dateTime).toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-bold">Project Name</label>
                <p className="form-control-plaintext">{consultation.projectName}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Priority</label>
                <p>
                  <span className={`badge ${getPriorityBadgeClass(consultation.priority)}`}>
                    {consultation.priority}
                  </span>
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Amount (LKR)</label>
                <div className="input-group">
                  <span className="input-group-text"></span>
                  <input
                    type="number"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min="0"
                    step="0.01"
                  />
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleAmountUpdate}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Saving...
                      </>
                    ) : "Save"}
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Status</label>
                <div className="d-flex align-items-center">
                  <span className={`badge ${getStatusBadgeClass(status)} me-3`}>
                    {status}
                  </span>
                  <select
                    className="form-select form-select-sm w-auto"
                    value={status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    disabled={isUpdating}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Finished">Finished</option>
                    <option value="Not Seen Yet">Not Seen Yet</option>
                  </select>
                  {isUpdating && (
                    <div className="spinner-border spinner-border-sm text-primary ms-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Project Description</label>
            <div className="border p-3 rounded bg-light">
              {consultation.projectDescription}
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Issue Description</label>
            <div className="border p-3 rounded bg-light">
              {consultation.issueDescription}
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <a
              href={`https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(consultation.email)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success"
            >
              <i className="fas fa-comments me-2"></i>Let's Talk
            </a>
            <button
              onClick={handleDelete}
              className="btn btn-danger"
            >
              <i className="fas fa-trash me-2"></i>Delete Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}