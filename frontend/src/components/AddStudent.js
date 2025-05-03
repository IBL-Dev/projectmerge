import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ConsultationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateTime: "",
    projectName: "",
    projectDescription: "",
    issueDescription: "",
    priority: "Low"
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [generatedId, setGeneratedId] = useState("");
  const [showIdModal, setShowIdModal] = useState(false);
  const [copyStatus, setCopyStatus] = useState("Copy ID");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.dateTime) newErrors.dateTime = "Date and time is required";
    if (!formData.projectName.trim()) newErrors.projectName = "Project name is required";
    if (!formData.projectDescription.trim()) newErrors.projectDescription = "Project description is required";
    if (!formData.issueDescription.trim()) newErrors.issueDescription = "Issue description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedId)
      .then(() => {
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus("Copy ID"), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        setCopyStatus("Failed to copy");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:8070/consultation/add", formData);
      setGeneratedId(response.data.consultation._id);
      setShowIdModal(true);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        dateTime: "",
        projectName: "",
        projectDescription: "",
        issueDescription: "",
        priority: "Low"
      });
    } catch (err) {
      console.error("Submission error:", err);
      setErrors({
        submit: err.response?.data?.message || "Failed to submit. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewConsultations = () => {
    navigate("/consultation-form");
  };

  return (
    <div className="container mt-4">
      {/* Success Modal */}
      {showIdModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Consultation Created</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowIdModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Your consultation has been created successfully!</p>
                <p><strong>Consultation ID:</strong></p>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <code className="p-2 bg-light rounded flex-grow-1">{generatedId}</code>
                  <button 
                    onClick={copyToClipboard}
                    className="btn btn-sm btn-outline-primary"
                  >
                    {copyStatus}
                  </button>
                </div>
                <p className="text-muted small">Save this ID for future reference.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={() => setShowIdModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="h4 mb-0">Consultation Request Form</h2>
        </div>
        
        <div className="card-body">
          {submitSuccess && !showIdModal && (
            <div className="alert alert-success alert-dismissible fade show">
              Consultation submitted successfully!
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setSubmitSuccess(false)}
              ></button>
            </div>
          )}

          {errors.submit && (
            <div className="alert alert-danger alert-dismissible fade show">
              {errors.submit}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setErrors(prev => ({ ...prev, submit: "" }))}
              ></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Full Name */}
              <div className="col-md-6">
                <label htmlFor="fullName" className="form-label">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && (
                  <div className="invalid-feedback">{errors.fullName}</div>
                )}
              </div>

              {/* Email Address */}
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  MS Team Email Address <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              {/* Phone Number */}
              <div className="col-md-6">
                <label htmlFor="phone" className="form-label">
                  Phone Number <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength="10"
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>

              {/* Preferred Date & Time */}
              <div className="col-md-6">
                <label htmlFor="dateTime" className="form-label">
                  Preferred Date & Time <span className="text-danger">*</span>
                </label>
                <input
                  type="datetime-local"
                  className={`form-control ${errors.dateTime ? "is-invalid" : ""}`}
                  id="dateTime"
                  name="dateTime"
                  value={formData.dateTime}
                  onChange={handleChange}
                  min={new Date().toISOString().slice(0, 16)}
                />
                {errors.dateTime && (
                  <div className="invalid-feedback">{errors.dateTime}</div>
                )}
              </div>

              {/* Project Name */}
              <div className="col-12">
                <label htmlFor="projectName" className="form-label">
                  Project Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.projectName ? "is-invalid" : ""}`}
                  id="projectName"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                />
                {errors.projectName && (
                  <div className="invalid-feedback">{errors.projectName}</div>
                )}
              </div>

              {/* Project Description */}
              <div className="col-12">
                <label htmlFor="projectDescription" className="form-label">
                  Project Description <span className="text-danger">*</span>
                </label>
                <textarea
                  className={`form-control ${errors.projectDescription ? "is-invalid" : ""}`}
                  id="projectDescription"
                  name="projectDescription"
                  rows="3"
                  value={formData.projectDescription}
                  onChange={handleChange}
                ></textarea>
                {errors.projectDescription && (
                  <div className="invalid-feedback">{errors.projectDescription}</div>
                )}
              </div>

              {/* Issue/Requirement Description */}
              <div className="col-12">
                <label htmlFor="issueDescription" className="form-label">
                  Issue/Requirement Description <span className="text-danger">*</span>
                </label>
                <textarea
                  className={`form-control ${errors.issueDescription ? "is-invalid" : ""}`}
                  id="issueDescription"
                  name="issueDescription"
                  rows="3"
                  value={formData.issueDescription}
                  onChange={handleChange}
                ></textarea>
                {errors.issueDescription && (
                  <div className="invalid-feedback">{errors.issueDescription}</div>
                )}
              </div>

              {/* Priority Level */}
              <div className="col-md-6">
                <label htmlFor="priority" className="form-label">
                  Priority Level
                </label>
                <select
                  className="form-select"
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              {/* Submit Buttons */}
              <div className="col-12 mt-4">
                <button 
                  type="submit" 
                  className="btn btn-primary px-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </button>
                
                <button 
                  type="button" 
                  className="btn btn-outline-secondary ms-3"
                  onClick={handleViewConsultations}
                >
                  View Consultations
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}