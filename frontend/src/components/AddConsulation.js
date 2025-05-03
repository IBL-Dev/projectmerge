import React, { useState } from "react";
import axios from "axios";

export default function ConsultationForm() {
  // State variables
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [priority, setPriority] = useState("Low");

  function sendData(e) {
    e.preventDefault();

    const newConsultation = {
      fullName,
      email,
      phone,
      dateTime,
      projectName,
      projectDescription,
      issueDescription,
      priority
    };

    axios
      .post("http://localhost:8070/consultation/add", newConsultation)
      .then(() => {
        alert("Consultation request submitted!");
        // Reset form fields
        setFullName("");
        setEmail("");
        setPhone("");
        setDateTime("");
        setProjectName("");
        setProjectDescription("");
        setIssueDescription("");
        setPriority("Low");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container mt-4">
      <h2>Consultation Request Form</h2>
      <form onSubmit={sendData}>
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        {/* Email Address */}
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {/* Preferred Date & Time */}
        <div className="form-group">
          <label htmlFor="dateTime">Preferred Date & Time</label>
          <input
            type="datetime-local"
            className="form-control"
            id="dateTime"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </div>

        {/* Project Name */}
        <div className="form-group">
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            className="form-control"
            id="projectName"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>

        {/* Project Description */}
        <div className="form-group">
          <label htmlFor="projectDescription">Project Description</label>
          <textarea
            className="form-control"
            id="projectDescription"
            placeholder="Briefly describe your project"
            rows="3"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Issue/Requirement Description */}
        <div className="form-group">
          <label htmlFor="issueDescription">Issue/Requirement Description</label>
          <textarea
            className="form-control"
            id="issueDescription"
            placeholder="Describe the issue or requirement"
            rows="3"
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Priority Level */}
        <div className="form-group">
          <label htmlFor="priority">Priority Level</label>
          <select
            className="form-control"
            id="priority"
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

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-3">
          Submit Consultation Request
        </button>
      </form>
    </div>
  );
}
