import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function ProjectDetails() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // States for editable fields
  const [projectTitle, setProjectTitle] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [budget, setBudget] = useState(0);
  const [timeline, setTimeline] = useState("");
  const [additionalRequirements, setAdditionalRequirements] = useState("");
  const [status, setStatus] = useState("Pending");

  // Fetch project details
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.get(`http://localhost:8070/projects/${id}`);
      const fetchedProject = response.data.project;

      if (fetchedProject.customerEmail === email) {
        setProject(fetchedProject);
        setProjectTitle(fetchedProject.projectTitle);
        setCustomerName(fetchedProject.customerName);
        setCustomerEmail(fetchedProject.customerEmail);
        setProjectDescription(fetchedProject.projectDescription);
        setBudget(fetchedProject.budget);
        setTimeline(fetchedProject.timeline);
        setAdditionalRequirements(fetchedProject.additionalRequirements || "");
        setStatus(fetchedProject.status);
      } else {
        setError("Email does not match the provided project ID.");
        setProject(null);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch project. Please check the ID and try again.");
      setProject(null);
    }
  };

  // Handle update submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const updatedProject = {
        projectTitle,
        customerName,
        customerEmail,
        projectDescription,
        budget,
        timeline,
        additionalRequirements,
        status
      };

      await axios.put(
        `http://localhost:8070/projects/${id}`,
        updatedProject
      );

      setSuccessMessage("Project updated successfully!");
      setIsEditing(false);
      setProject(updatedProject);
    } catch (err) {
      console.error(err);
      setError("Failed to update project. Please try again.");
    }
  };

  // Handle delete project
  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this project? This action cannot be undone."
    );
    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:8070/projects/${id}`);
      setSuccessMessage("Project deleted successfully!");
      setProject(null);
      setId("");
      setEmail("");
    } catch (err) {
      console.error(err);
      setError("Failed to delete project. Please try again.");
    }
  };

  // Generate and download PDF report
  const downloadReport = () => {
    const doc = new jsPDF();
    
    // Report title
    doc.setFontSize(18);
    doc.setTextColor(40, 53, 147);
    doc.text("Project Report", 105, 20, { align: 'center' });
    
    // Report metadata
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Report generated: ${new Date().toLocaleString()}`, 14, 30);
    doc.text(`Project ID: ${id}`, 14, 35);
    
    // Client Information Table
    autoTable(doc, {
      head: [['Field', 'Value']],
      body: [
        ['Project Title', project.projectTitle],
        ['Customer Name', project.customerName],
        ['Customer Email', project.customerEmail],
        ['Budget', `$${project.budget?.toFixed(2) || "0.00"}`],
        ['Timeline', project.timeline],
        ['Status', project.status],
      ],
      startY: 45,
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      }
    });

    // Project Description
    doc.setFontSize(14);
    doc.text("Project Description:", 14, doc.lastAutoTable.finalY + 20);
    doc.setFontSize(11);
    doc.text(project.projectDescription, 14, doc.lastAutoTable.finalY + 30, {
      maxWidth: 180
    });

    // Additional Requirements
    if (project.additionalRequirements) {
      doc.setFontSize(14);
      doc.text("Additional Requirements:", 14, doc.lastAutoTable.finalY + 50);
      doc.setFontSize(11);
      doc.text(project.additionalRequirements, 14, doc.lastAutoTable.finalY + 60, {
        maxWidth: 180
      });
    }

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("This report was generated automatically", 105, 285, { align: 'center' });

    // Save the PDF
    doc.save(`project-report-${id}.pdf`);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h1 className="h4 mb-0">Project Management</h1>
        </div>

        <div className="card-body">
          {/* Search Form */}
          <form onSubmit={handleSubmit} className="mb-4">
            <h2 className="h5 mb-3">Find Project</h2>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="id" className="form-label">
                  Project ID
                </label>
                <input
                  type="text"
                  id="id"
                  className="form-control"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Customer Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-search me-2"></i>View Project
                </button>
              </div>
            </div>
          </form>

          {/* Messages */}
          {error && (
            <div className="alert alert-danger alert-dismissible fade show">
              {error}
              <button
                type="button"
                className="btn-close"
                onClick={() => setError("")}
              ></button>
            </div>
          )}
          {successMessage && (
            <div className="alert alert-success alert-dismissible fade show">
              {successMessage}
              <button
                type="button"
                className="btn-close"
                onClick={() => setSuccessMessage("")}
              ></button>
            </div>
          )}

          {/* Project Details */}
          {project && (
            <div className="mt-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5">Project Details</h2>
                <div>
                  {!isEditing && (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn btn-warning me-2"
                      >
                        <i className="bi bi-pencil me-2"></i>Edit
                      </button>
                      <button 
                        onClick={downloadReport}
                        className="btn btn-info me-2"
                      >
                        <i className="bi bi-file-earmark-pdf me-2"></i>Download Report
                      </button>
                      <button onClick={handleDelete} className="btn btn-danger">
                        <i className="bi bi-trash me-2"></i>Delete
                      </button>
                    </>
                  )}
                </div>
              </div>

              {isEditing ? (
                // Edit Form
                <form onSubmit={handleUpdate}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Project Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Customer Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Customer Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Budget</label>
                      <input
                        type="number"
                        className="form-control"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Timeline</label>
                      <input
                        type="text"
                        className="form-control"
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label">Project Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Additional Requirements</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={additionalRequirements}
                        onChange={(e) => setAdditionalRequirements(e.target.value)}
                      />
                    </div>
                    <div className="col-12 d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-secondary me-2"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                // View Mode
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label fw-bold">Project Title</label>
                      <p>{project.projectTitle}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Customer Name</label>
                      <p>{project.customerName}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Customer Email</label>
                      <p>{project.customerEmail}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Budget</label>
                      <p>${project.budget?.toFixed(2) || "0.00"}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label fw-bold">Timeline</label>
                      <p>{project.timeline}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Status</label>
                      <p>
                        <span
                          className={`badge ${
                            project.status === "Pending"
                              ? "bg-secondary"
                              : project.status === "In Progress"
                              ? "bg-primary"
                              : "bg-success"
                          }`}
                        >
                          {project.status}
                        </span>
                      </p>
                    </div>
                    {project.assignedDeveloper && (
                      <div className="mb-3">
                        <label className="form-label fw-bold">Assigned Developer</label>
                        <p>{project.assignedDeveloper.name || "Developer ID: " + project.assignedDeveloper}</p>
                      </div>
                    )}
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Project Description
                      </label>
                      <p className="border p-2 rounded">
                        {project.projectDescription}
                      </p>
                    </div>
                    {project.additionalRequirements && (
                      <div className="mb-3">
                        <label className="form-label fw-bold">
                          Additional Requirements
                        </label>
                        <p className="border p-2 rounded">
                          {project.additionalRequirements}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}