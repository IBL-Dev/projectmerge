import React from 'react';
import { Link } from 'react-router-dom';

function User(props) {
  const { 
    id,
    projectTitle,
    customerName,
    customerEmail,
    projectDescription,
    budget,
    timeline,
    additionalRequirements 
  } = props.user || {};

  return (
    <div className="card mb-4 shadow-sm" style={{ border: "none" }}>
      <div className="card-body">
        <h2 className="card-title text-primary mb-3">{projectTitle}</h2>
        
        <div className="row mb-2">
          <div className="col-md-6">
            <p className="mb-1"><strong className="text-muted">Customer Name:</strong> {customerName}</p>
            <p className="mb-1"><strong className="text-muted">Email:</strong> <a href={`mailto:${customerEmail}`}>{customerEmail}</a></p>
          </div>
          <div className="col-md-6">
            <p className="mb-1"><strong className="text-muted">Budget:</strong> <span className="badge bg-success">${budget}</span></p>
            <p className="mb-1"><strong className="text-muted">Timeline:</strong> <span className="badge bg-info">{timeline} weeks</span></p>
          </div>
        </div>

        <div className="mb-3">
          <h6 className="text-muted">Description</h6>
          <p className="card-text" style={{ whiteSpace: "pre-line" }}>{projectDescription}</p>
        </div>

        {additionalRequirements && (
          <div className="mb-3">
            <h6 className="text-muted">Additional Requirements</h6>
            <p className="card-text" style={{ whiteSpace: "pre-line" }}>{additionalRequirements}</p>
          </div>
        )}

        <div className="d-flex justify-content-end">
          <Link to={`/update/${id}`} className="btn btn-outline-primary me-2">
            Update
          </Link>
          <button 
            className="btn btn-outline-danger" 
            onClick={() => props.onDelete && props.onDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default User;