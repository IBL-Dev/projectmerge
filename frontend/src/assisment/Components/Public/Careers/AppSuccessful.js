import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ApplicationSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { jobTitle } = location.state || { jobTitle: "the position" };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="card shadow-lg border-0" style={{ maxWidth: "500px" }}>
        <div className="card-body text-center p-5">
          <div
            className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center mx-auto mb-4"
            style={{ width: "80px", height: "80px", fontSize: "40px" }}
          >
            ✓
          </div>

          <h1 className="h3 mb-3">Application Submitted!</h1>

          <p className="text-muted mb-2">
            You have successfully applied for <strong>{jobTitle}</strong>.
          </p>
          <p className="text-muted mb-4">
            Our Talent Pool team will get back to you soon.
          </p>

          <div className="mt-4">
            <button
              className="btn btn-primary btn-lg px-4"
              onClick={() => navigate("/")}
            >
              Back to Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationSuccess;
