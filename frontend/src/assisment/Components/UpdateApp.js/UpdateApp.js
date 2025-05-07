import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateApp.css";

function UpdateApp() {
  const [inputs, setInputs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        setLoading(true);
        console.log("Fetching data for id:", id); // Debug log
        const res = await axios.get(`http://localhost:5002/applicants/${id}`);
        console.log("API Response:", res.data); // Debug log

        // Check if we have data and set it properly
        if (res.data) {
          // If the data is nested under 'applicant' property
          const applicantData = res.data.applicant || res.data;
          setInputs(applicantData);
          setError(null);
        } else {
          setError("No applicant data received");
        }
      } catch (err) {
        console.error("Error fetching applicant:", err);
        setError(`Failed to load applicant data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHandler();
    }
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting:", inputs);
      // First update the data
      await axios.put(`http://localhost:5002/applicants/${id}`, {
        name: inputs.name,
        email: inputs.email,
        resumePath: inputs.resumePath,
        jobTitle: inputs.jobTitle,
        status: inputs.status,
      });

      // Then navigate to the applicant details page (which shows all applicants)
      history("/applicantDetails");
    } catch (err) {
      setError(`Failed to update applicant: ${err.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Update Applicant</h1>

      {inputs ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={inputs.name || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="jobTitle" className="form-label">
              Job Title
            </label>
            <input
              type="text"
              className="form-control"
              id="jobTitle"
              name="jobTitle"
              value={inputs.jobTitle || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="resumePath" className="form-label">
              Resume Path
            </label>
            <input
              type="text"
              className="form-control"
              id="resumePath"
              name="resumePath"
              value={inputs.resumePath || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              className="form-select"
              id="status"
              name="status"
              value={inputs.status || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="reviewing">Reviewing</option>
              <option value="interviewed">Interviewed</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Update Applicant
          </button>
        </form>
      ) : (
        <div>No applicant data available</div>
      )}
    </div>
  );
}

export default UpdateApp;
