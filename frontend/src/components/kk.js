import React, { useState } from "react";
import axios from "axios";

const ConsultationForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Pending");
  const [amount, setAmount] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [generatedId, setGeneratedId] = useState("");
  const [showIdModal, setShowIdModal] = useState(false);

  const handleCreateConsultation = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const newConsultation = {
        fullName,
        email,
        phone,
        dateTime,
        projectName,
        projectDescription,
        issueDescription,
        priority,
        status,
        amount,
      };

      const response = await axios.post("http://localhost:8070/consultation/add", newConsultation);
      const created = response.data.consultation;

      setGeneratedId(created._id);
      setShowIdModal(true);
      setSuccessMessage("Consultation created successfully!");

      // Optional: Reset form fields
      setFullName("");
      setEmail("");
      setPhone("");
      setDateTime("");
      setProjectName("");
      setProjectDescription("");
      setIssueDescription("");
      setPriority("Low");
      setStatus("Pending");
      setAmount("");

    } catch (err) {
      console.error(err);
      setError("Failed to create consultation.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Submit Consultation Request</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleCreateConsultation}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Preferred Date & Time</label>
          <input type="datetime-local" className="form-control" value={dateTime} onChange={(e) => setDateTime(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Project Name</label>
          <input className="form-control" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Project Description</label>
          <textarea className="form-control" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Issue Description</label>
          <textarea className="form-control" value={issueDescription} onChange={(e) => setIssueDescription(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Priority</label>
          <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
        </div>

        

        

        <button type="submit" className="btn btn-primary">Submit Request</button>
      </form>

      {/* Success Modal */}
      {showIdModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Consultation Created</h5>
                <button type="button" className="btn-close" onClick={() => setShowIdModal(false)}></button>
              </div>
              <div className="modal-body">
  <p>Your consultation has been created successfully.</p>
  <p><strong>Generated Consultation ID:</strong></p>
  <div className="d-flex align-items-center">
    <code>{generatedId}</code>
    <button
      className="btn btn-outline-secondary btn-sm ms-2"
      onClick={() => navigator.clipboard.writeText(generatedId)}
    >
      Copy ID
    </button>
  </div>
</div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowIdModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationForm;
