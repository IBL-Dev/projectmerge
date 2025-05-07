import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Envelope,
  Calendar,
  FileText,
  ChevronUp,
  ChevronDown,
  Plus,
  Search,
  PersonCheck,
  ExclamationTriangleFill,
} from "react-bootstrap-icons";

const ApplicantDetails = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [loadingRows, setLoadingRows] = useState({});
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const res = await axios.get("http://localhost:5002/applicants");
      setApplicants(res.data.applicants);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching applicants:", err);
      setError("Failed to fetch applicants");
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getStatusColor = (status) => {
    const colors = {
      New: "primary",
      "In Review": "warning",
      Shortlisted: "info",
      Rejected: "danger",
      Interview: "info",
      "On Hold": "secondary",
      Hired: "success",
      default: "secondary",
    };
    return colors[status] || "info";
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredApplicants = useMemo(() => {
    return applicants.filter((applicant) => {
      const searchMatch =
        `${applicant.firstName} ${applicant.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (applicant.jobId?.title || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (applicant.email || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      if (activeFilter === "All") return searchMatch;
      return searchMatch && applicant.status === activeFilter;
    });
  }, [applicants, searchTerm, activeFilter]);

  const sortedApplicants = useMemo(() => {
    let sortableItems = [...filteredApplicants];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        // Handle nested objects (like jobId.title)
        let aValue, bValue;
        if (sortConfig.key.includes(".")) {
          const keys = sortConfig.key.split(".");
          aValue = keys.reduce((obj, key) => obj?.[key], a);
          bValue = keys.reduce((obj, key) => obj?.[key], b);
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredApplicants, sortConfig]);

  // Pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentApplicants = sortedApplicants.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(sortedApplicants.length / entriesPerPage);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "500px" }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading applicant data...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger m-5 d-flex align-items-center">
        <ExclamationTriangleFill className="me-3" size={24} />
        <div>
          <h5 className="mb-1">Error Loading Data</h5>
          <p className="mb-0">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="container-fluid p-4 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Talent Pool Dashboard</h2>
          <p className="text-muted mb-0">
            {filteredApplicants.length} total applicants • 
            {activeFilter !== "All" && ` ${filteredApplicants.length} ${activeFilter.toLowerCase()}`}
          </p>
        </div>
        <Link to="/applicants/new" className="btn btn-primary shadow-sm">
          <Plus className="me-2" /> Add New Applicant
        </Link>
      </div>

      <div className="card shadow border-0 mb-4 overflow-hidden">
        <div className="card-header bg-white py-3">
          <div className="row g-3 align-items-center">
            <div className="col-md-7">
              <div className="btn-group btn-group-sm overflow-auto flex-nowrap hide-scrollbar">
                {[
                  "All",
                  "New",
                  "In Review",
                  "Shortlisted",
                  "Interview",
                  "On Hold",
                  "Hired",
                  "Rejected",
                ].map((filter) => (
                  <button
                    key={filter}
                    className={`btn ${
                      activeFilter === filter
                        ? "btn-primary"
                        : "btn-outline-primary"
                    } shadow-sm`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                    {filter !== "All" && (
                      <span className="ms-1 badge rounded-pill bg-light text-dark">
                        {applicants.filter(app => app.status === filter).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-md-5">
              <div className="input-group shadow-sm">
                <span className="input-group-text bg-white border-end-0">
                  <Search className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search by name, position, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          {currentApplicants.length === 0 ? (
            <div className="text-center py-5">
              <PersonCheck size={48} className="text-muted mb-3" />
              <h5>No matching applicants found</h5>
              <p className="text-muted">
                Try adjusting your search criteria or filters
              </p>
              {searchTerm && (
                <button 
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th
                      onClick={() => handleSort("firstName")}
                      style={{ cursor: "pointer" }}
                      className="py-3"
                    >
                      <div className="d-flex align-items-center">
                        Applicant Name
                        {sortConfig.key === "firstName" ? (
                          sortConfig.direction === "asc" ? (
                            <ChevronUp className="ms-1" />
                          ) : (
                            <ChevronDown className="ms-1" />
                          )
                        ) : (
                          <span className="ms-1 opacity-25"><ChevronDown size={14} /></span>
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("jobId.title")}
                      style={{ cursor: "pointer" }}
                      className="py-3"
                    >
                      <div className="d-flex align-items-center">
                        Position
                        {sortConfig.key === "jobId.title" ? (
                          sortConfig.direction === "asc" ? (
                            <ChevronUp className="ms-1" />
                          ) : (
                            <ChevronDown className="ms-1" />
                          )
                        ) : (
                          <span className="ms-1 opacity-25"><ChevronDown size={14} /></span>
                        )}
                      </div>
                    </th>
                    <th className="py-3">Location</th>
                    <th className="py-3">Documents</th>
                    <th className="py-3">Skills Match</th>
                    <th
                      onClick={() => handleSort("status")}
                      style={{ cursor: "pointer" }}
                      className="py-3"
                    >
                      <div className="d-flex align-items-center">
                        Status
                        {sortConfig.key === "status" ? (
                          sortConfig.direction === "asc" ? (
                            <ChevronUp className="ms-1" />
                          ) : (
                            <ChevronDown className="ms-1" />
                          )
                        ) : (
                          <span className="ms-1 opacity-25"><ChevronDown size={14} /></span>
                        )}
                      </div>
                    </th>
                    <th className="py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="border-top-0">
                  {currentApplicants.map((applicant) => (
                    <tr
                      key={applicant._id}
                      className={loadingRows[applicant._id] ? "opacity-50" : ""}
                    >
                      <td className="py-3">
                        <Link
                          to={`/dashboard/applicants/${applicant._id}`}
                          className="text-decoration-none"
                        >
                          <div className="d-flex align-items-center">
                            <div 
                              className="avatar-circle rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3"
                              style={{ 
                                width: "42px", 
                                height: "42px", 
                                backgroundColor: `hsl(${applicant.firstName.charCodeAt(0) * 10}, 70%, 50%)`,
                                fontSize: "16px"
                              }}
                            >
                              {applicant.firstName[0]}
                              {applicant.lastName[0]}
                            </div>
                            <div>
                              <div className="fw-bold text-dark">{`${applicant.firstName} ${applicant.lastName}`}</div>
                              <div className="text-muted small d-flex align-items-center">
                                <Envelope size={12} className="me-1" />
                                {applicant.email}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="fw-semibold">
                              {applicant.jobId
                                ? applicant.jobId.title
                                : "Direct Application"}
                            </div>
                            {applicant.jobId && (
                              <div className="text-muted small">
                                {applicant.jobId.department}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>{applicant.address || "Remote"}</td>
                      <td>
                        <div className="d-flex gap-2">
                          {applicant.resume && (
                            <a
                              href={`${process.env.REACT_APP_BACKEND_URL || ""}${
                                applicant.resume.path
                              }`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-primary rounded-pill"
                            >
                              <FileText className="me-1" /> Resume
                            </a>
                          )}
                          {applicant.coverLetter && (
                            <a
                              href={`${process.env.REACT_APP_BACKEND_URL || ""}${
                                applicant.coverLetter.path
                              }`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-primary rounded-pill"
                            >
                              <FileText className="me-1" /> Cover
                            </a>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="progress flex-grow-1" style={{ height: "8px" }}>
                            <div
                              className={`progress-bar bg-${getProgressColor(applicant.progress || 70)}`}
                              style={{ width: `${applicant.progress || 70}%` }}
                            ></div>
                          </div>
                          <span className="ms-2 small fw-bold">
                            {applicant.progress || 70}%
                          </span>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge bg-${getStatusColor(
                            applicant.status
                          )} bg-opacity-75 text-white rounded-pill px-3 py-2`}
                        >
                          {applicant.status || "New"}
                        </span>
                      </td>
                      <td>
                        <div className="dropdown d-flex justify-content-center">
                          <button
                            className="btn btn-sm btn-outline-secondary rounded-pill dropdown-toggle"
                            data-bs-toggle="dropdown"
                          >
                            Actions
                          </button>
                          <ul className="dropdown-menu shadow border-0">
                            <li>
                              <Link
                                to={`/dashboard/applicants/${applicant._id}`}
                                className="dropdown-item d-flex align-items-center"
                              >
                                <FileText className="me-2 text-primary" /> View Full
                                Application
                              </Link>
                            </li>
                            <li>
                              <button className="dropdown-item d-flex align-items-center">
                                <Envelope className="me-2 text-info" /> Send Message
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item d-flex align-items-center">
                                <Calendar className="me-2 text-success" /> Schedule Interview
                              </button>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <button className="dropdown-item d-flex align-items-center text-danger">
                                <span className="me-2">×</span> Remove
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card-footer bg-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <select
                className="form-select form-select-sm me-2 shadow-sm"
                style={{ width: "auto" }}
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-muted">
                Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, sortedApplicants.length)} of {sortedApplicants.length} entries
              </span>
            </div>
            {totalPages > 1 && (
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button 
                      className="page-link" 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {getPaginationItems(currentPage, totalPages).map((page, index) => (
                    <React.Fragment key={index}>
                      {page === "..." ? (
                        <li className="page-item disabled">
                          <span className="page-link">...</span>
                        </li>
                      ) : (
                        <li className={`page-item ${currentPage === page ? "active" : ""}`}>
                          <button 
                            className="page-link" 
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        </li>
                      )}
                    </React.Fragment>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button 
                      className="page-link" 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to determine progress bar color
const getProgressColor = (progress) => {
  if (progress >= 80) return "success";
  if (progress >= 60) return "info";
  if (progress >= 40) return "primary";
  if (progress >= 20) return "warning";
  return "danger";
};

// Helper function to generate pagination items
const getPaginationItems = (currentPage, totalPages) => {
  let pages = [];
  
  if (totalPages <= 7) {
    // Show all pages
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Always show first and last page
    if (currentPage <= 3) {
      // Current page is near the start
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      // Current page is near the end
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Current page is in the middle
      pages.push(1);
      pages.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    }
  }
  
  return pages;
};

export default ApplicantDetails;