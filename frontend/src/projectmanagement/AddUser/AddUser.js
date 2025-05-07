import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddUser() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    id: Date.now(),// or generate unique ID changed
    projectTitle: "",
    customerName: "",
    customerEmail: "",
    projectDescription: "",
    budget: "",
    timeline: "",
    additionalRequirements: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!inputs.projectTitle.trim()) {
      newErrors.projectTitle = "Project title is required";
    } else if (inputs.projectTitle.trim().length < 5) {
      newErrors.projectTitle = "Project title must be at least 5 characters";
    } else if (inputs.projectTitle.trim().length > 100) {
      newErrors.projectTitle = "Project title cannot exceed 100 characters";
    }
    
    if (!inputs.customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(inputs.customerName)) {
      newErrors.customerName = "Name should contain only letters and spaces";
    }
    
    if (!inputs.customerEmail.trim()) {
      newErrors.customerEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.customerEmail)) {
      newErrors.customerEmail = "Please enter a valid email address";
    }
    
    if (!inputs.projectDescription.trim()) {
      newErrors.projectDescription = "Project description is required";
    } else if (inputs.projectDescription.trim().length < 20) {
      newErrors.projectDescription = "Description should be at least 20 characters";
    } else if (inputs.projectDescription.trim().length > 1000) {
      newErrors.projectDescription = "Description cannot exceed 1000 characters";
    }
    
    if (!inputs.budget) {
      newErrors.budget = "Budget is required";
    } else if (isNaN(inputs.budget)) {
      newErrors.budget = "Budget must be a number";
    } else if (inputs.budget < 0) {
      newErrors.budget = "Budget cannot be negative";
    } else if (inputs.budget > 10000000) {
      newErrors.budget = "Budget cannot exceed $10,000,000";
    }
    
    if (!inputs.timeline.trim()) {
      newErrors.timeline = "Timeline is required";
    } else if (!/^(\d+\s*(days?|weeks?|months?)|[a-zA-Z\s]+)$/i.test(inputs.timeline)) {
      newErrors.timeline = "Please enter a valid timeline (e.g., 2 weeks, 1 month)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      await axios.post("http://localhost:8070/projects", {
        id: inputs.id,
        projectTitle: inputs.projectTitle,
        customerName: inputs.customerName,
        customerEmail: inputs.customerEmail,
        projectDescription: inputs.projectDescription,
        budget: Number(inputs.budget),
        timeline: inputs.timeline,
        additionalRequirements: inputs.additionalRequirements,
      });
      history('/projectdetails');
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "2rem 0" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ 
          border: "none", 
          borderRadius: "0.5rem", 
          boxShadow: "0 0.5rem 1rem rgba(35, 25, 25, 0.15)"
        }}>
          <div style={{ 
            backgroundColor: "#001f3f", 
            color: "white", 
            padding: "1rem",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem"
          }}>
            <h2 style={{ margin: 0, textAlign: "center", fontWeight: "bold" }}>
              Create New Project
            </h2>
          </div>
          <div style={{ padding: "2rem" }}>
            <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>
                  Project Title <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    border: `2px solid ${errors.projectTitle ? "#dc3545" : "#001f3f"}`,
                    fontSize: "1rem"
                  }}
                  value={inputs.projectTitle}
                  onChange={handleChange}
                  name="projectTitle"
                  placeholder="Enter project title"
                />
                {errors.projectTitle && (
                  <div style={{ color: "#dc3545", marginTop: "0.25rem" }}>
                    {errors.projectTitle}
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>
                    Customer Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      borderRadius: "0.25rem",
                      border: `2px solid ${errors.customerName ? "#dc3545" : "#001f3f"}`,
                      fontSize: "1rem"
                    }}
                    value={inputs.customerName}
                    onChange={handleChange}
                    name="customerName"
                    placeholder="Full name"
                  />
                  {errors.customerName && (
                    <div style={{ color: "#dc3545", marginTop: "0.25rem" }}>
                      {errors.customerName}
                    </div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>
                    Customer Email <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="email"
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      borderRadius: "0.25rem",
                      border: `2px solid ${errors.customerEmail ? "#dc3545" : "#001f3f"}`,
                      fontSize: "1rem"
                    }}
                    value={inputs.customerEmail}
                    onChange={handleChange}
                    name="customerEmail"
                    placeholder="example@domain.com"
                  />
                  {errors.customerEmail && (
                    <div style={{ color: "#dc3545", marginTop: "0.25rem" }}>
                      {errors.customerEmail}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>
                  Project Description <span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    border: `2px solid ${errors.projectDescription ? "#dc3545" : "#001f3f"}`,
                    fontSize: "1rem",
                    minHeight: "120px"
                  }}
                  value={inputs.projectDescription}
                  onChange={handleChange}
                  name="projectDescription"
                  placeholder="Describe your project in detail..."
                />
                {errors.projectDescription && (
                  <div style={{ color: "#dc3545", marginTop: "0.25rem" }}>
                    {errors.projectDescription}
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>
                    Budget ($) <span style={{ color: "red" }}>*</span>
                  </label>
                  <div style={{ display: "flex" }}>
                    <span style={{
                      padding: "0.5rem",
                      backgroundColor: "#001f3f",
                      color: "white",
                      borderTopLeftRadius: "0.25rem",
                      borderBottomLeftRadius: "0.25rem"
                    }}>$</span>
                    <input
                      type="number"
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        borderTopRightRadius: "0.25rem",
                        borderBottomRightRadius: "0.25rem",
                        border: `2px solid ${errors.budget ? "#dc3545" : "#001f3f"}`,
                        borderLeft: "none",
                        fontSize: "1rem"
                      }}
                      value={inputs.budget}
                      onChange={handleChange}
                      name="budget"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.budget && (
                    <div style={{ color: "#dc3545", marginTop: "0.25rem" }}>
                      {errors.budget}
                    </div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>
                    Timeline <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      borderRadius: "0.25rem",
                      border: `2px solid ${errors.timeline ? "#dc3545" : "#001f3f"}`,
                      fontSize: "1rem"
                    }}
                    value={inputs.timeline}
                    onChange={handleChange}
                    name="timeline"
                    placeholder="e.g., 2 weeks, 1 month"
                  />
                  {errors.timeline && (
                    <div style={{ color: "#dc3545", marginTop: "0.25rem" }}>
                      {errors.timeline}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>
                  Additional Requirements
                </label>
                <textarea
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    border: "2px solid #001f3f",
                    fontSize: "1rem",
                    minHeight: "100px"
                  }}
                  value={inputs.additionalRequirements}
                  onChange={handleChange}
                  name="additionalRequirements"
                  placeholder="Any special requirements or notes..."
                />
              </div>

              <div style={{ 
                display: "flex", 
                justifyContent: "space-between",
                marginTop: "2rem"
              }}>
                <button
                  type="button"
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "0.25rem",
                    border: "2px solid #001f3f",
                    backgroundColor: "transparent",
                    color: "#001f3f",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                  onClick={() => history(-1)}
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "0.25rem",
                    border: "none",
                    backgroundColor: "#001f3f",
                    color: "white",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Project..." : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;