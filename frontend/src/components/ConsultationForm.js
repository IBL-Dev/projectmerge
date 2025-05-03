import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function ConsultationForm() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [consultation, setConsultation] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // States for editable fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Pending");
  const [amount, setAmount] = useState(0);

   // NEW STATE VARIABLES FOR THE POPUP - ADD THESE
   const [showIdModal, setShowIdModal] = useState(false);
   const [generatedId, setGeneratedId] = useState("");

  // Fetch consultation details
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.get(
        `http://localhost:8070/consultation/get/${id}`
      );
      const fetchedConsultation = response.data.consultation;

      if (fetchedConsultation.email === email) {
        setConsultation(fetchedConsultation);
        setFullName(fetchedConsultation.fullName);
        setPhone(fetchedConsultation.phone);
        // Convert the date to the correct format for datetime-local input
      const date = new Date(fetchedConsultation.dateTime);
      const formattedDate = date.toISOString().slice(0, 16);
      setDateTime(formattedDate);
        setProjectName(fetchedConsultation.projectName);
        setProjectDescription(fetchedConsultation.projectDescription);
        setIssueDescription(fetchedConsultation.issueDescription);
        setPriority(fetchedConsultation.priority);
        setStatus(fetchedConsultation.status);
        setAmount(fetchedConsultation.amount || 0);
      } else {
        setError("Email does not match the provided ID.");
        setConsultation(null);
      }
    } catch (err) {
      console.error(err);
      setError(
        "Failed to fetch consultation. Please check the ID and try again."
      );
      setConsultation(null);
    }
  };

  // Handle update submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const updatedConsultation = {
        fullName,
        email,
        phone,
        dateTime,
        projectName,
        projectDescription,
        issueDescription,
        priority,
        status,
        amount
      };

      await axios.put(
        `http://localhost:8070/consultation/update/${id}`,
        updatedConsultation
      );

      setSuccessMessage("Consultation updated successfully!");
      setIsEditing(false);
      setConsultation(updatedConsultation);
    } catch (err) {
      console.error(err);
      setError("Failed to update consultation. Please try again.");
    }
  };

  // Handle delete consultation
  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this consultation? This action cannot be undone."
    );
    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:8070/consultation/delete/${id}`);
      setSuccessMessage("Consultation deleted successfully!");
      setConsultation(null);
      setId("");
      setEmail("");
    } catch (err) {
      console.error(err);
      setError("Failed to delete consultation. Please try again.");
    }
  };

  // Generate and download PDF report
  const downloadReport = () => {
    const doc = new jsPDF();
    
    // Report title
    doc.setFontSize(18);
    doc.setTextColor(40, 53, 147);
    doc.text("Consultation Report", 105, 20, { align: 'center' });
    
    // Report metadata
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Report generated: ${new Date().toLocaleString()}`, 14, 30);
    doc.text(`Consultation ID: ${id}`, 14, 35);
    
    // Client Information Table
    autoTable(doc, {
      head: [['Field', 'Value']],
      body: [
        ['Full Name', consultation.fullName],
        ['Email', consultation.email],
        ['Phone', consultation.phone],
        ['Consultation Date', new Date(consultation.dateTime).toLocaleString()],
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

    // Project Information Table
    autoTable(doc, {
      head: [['Field', 'Value']],
      body: [
        ['Project Name', consultation.projectName],
        ['Priority', consultation.priority],
        ['Status', consultation.status],
        ['Amount', `$${consultation.amount?.toFixed(2) || "0.00"}`],
      ],
      startY: doc.lastAutoTable.finalY + 15,
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      }
    });

    // Project Description
    doc.setFontSize(14);
    doc.text("Project Description:", 14, doc.lastAutoTable.finalY + 20);
    doc.setFontSize(11);
    doc.text(consultation.projectDescription, 14, doc.lastAutoTable.finalY + 30, {
      maxWidth: 180
    });

    // Issue Description
    doc.setFontSize(14);
    doc.text("Issue Description:", 14, doc.lastAutoTable.finalY + 50);
    doc.setFontSize(11);
    doc.text(consultation.issueDescription, 14, doc.lastAutoTable.finalY + 60, {
      maxWidth: 180
    });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("This report was generated automatically", 105, 285, { align: 'center' });

    // Save the PDF
    doc.save(`consultation-report-${id}.pdf`);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h1 className="h4 mb-0">Consultation Management</h1>
        </div>

        <div className="card-body">
          {/* Search Form */}
          <form onSubmit={handleSubmit} className="mb-4">
            <h2 className="h5 mb-3">Find Consultation</h2>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="id" className="form-label">
                  Consultation ID
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
                  Email
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
                  <i className="bi bi-search me-2"></i>View Consultation
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

          {/* Consultation Details */}
          {consultation && (
            <div className="mt-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5">Consultation Details</h2>
                <div>
                  {!isEditing && (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn btn-warning me-2"
                      >
                        <i className="bi bi-pencil me-2"></i>Edit
                      </button>
                      <a
                        href="https://teams.microsoft.com/l/chat/0/0?users=it23291850@my.sliit.lk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-success me-2"
                      >
                        <i className="fas fa-comments me-2"></i>Talk with consultant
                      </a>
                      {consultation.status === "Finished" && (
                        <button 
                          onClick={downloadReport}
                          className="btn btn-info me-2"
                        >
                          <i className="bi bi-file-earmark-pdf me-2"></i>Download Report
                        </button>
                      )}
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
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6">
  <label className="form-label">Date and Time</label>
  <input
    type="datetime-local"
    className="form-control"
    value={dateTime}
    onChange={(e) => setDateTime(e.target.value)}
    min={new Date().toISOString().slice(0, 16)}
    required
  />
</div>
                    <div className="col-12">
                      <label className="form-label">Project Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
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
                      <label className="form-label">Issue Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={issueDescription}
                        onChange={(e) => setIssueDescription(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Priority</label>
                      <select
                        className="form-select"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        required
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                      </select>
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
                      <label className="form-label fw-bold">Full Name</label>
                      <p>{consultation.fullName}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Email</label>
                      <p>{consultation.email}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Phone</label>
                      <p>{consultation.phone}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Date and Time
                      </label>
                      <p>{new Date(consultation.dateTime).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label fw-bold">Project Name</label>
                      <p>{consultation.projectName}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Priority</label>
                      <p>
                        <span
                          className={`badge ${
                            consultation.priority === "Low"
                              ? "bg-info"
                              : consultation.priority === "Medium"
                              ? "bg-primary"
                              : consultation.priority === "High"
                              ? "bg-warning"
                              : "bg-danger"
                          }`}
                        >
                          {consultation.priority}
                        </span>
                      </p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Amount</label>
                      <p>LKR {consultation.amount?.toFixed(2) || "0.00"}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Status</label>
                      <p>
                        <span
                          className={`badge ${
                            consultation.status === "Pending"
                              ? "bg-secondary"
                              : consultation.status === "Finished"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {consultation.status}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Project Description
                      </label>
                      <p className="border p-2 rounded">
                        {consultation.projectDescription}
                      </p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Issue Description
                      </label>
                      <p className="border p-2 rounded">
                        {consultation.issueDescription}
                      </p>
                    </div>
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