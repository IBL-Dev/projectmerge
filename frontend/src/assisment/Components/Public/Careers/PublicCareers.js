import React, { useState, useEffect } from "react";
import { Search, Filter, MapPin, Briefcase, Building2 } from "lucide-react";
import "./PublicCareers.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function PublicCareers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    department: "",
    location: "",
    jobType: "",
  });

  // Unique departments and locations for filtering
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [jobs, filters]);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5002/jobs");
      const data = await response.json();
      const fetchedJobs = data.jobs;

      setJobs(fetchedJobs);

      // Extract unique departments and locations
      const uniqueDepartments = [
        ...new Set(fetchedJobs.map((job) => job.department)),
      ];
      const uniqueLocations = [
        ...new Set(fetchedJobs.map((job) => job.location)),
      ];

      setDepartments(uniqueDepartments);
      setLocations(uniqueLocations);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = jobs;

    if (filters.search) {
      result = result.filter((job) =>
        job.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.department) {
      result = result.filter((job) => job.department === filters.department);
    }

    if (filters.location) {
      result = result.filter((job) => job.location === filters.location);
    }

    if (filters.jobType) {
      result = result.filter((job) => job.jobType === filters.jobType);
    }

    setFilteredJobs(result);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      department: "",
      location: "",
      jobType: "",
    });
  };

  const scrollToJobs = () => {
    document.getElementById("openPositions").scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleViewDetails = (jobId, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/jobs/${jobId}`);
  };

  return (
    <div className="careers-page">
      {/* Hero Section */}
      <div
        className="hero-section vh-100 d-flex align-items-center justify-content-center text-white text-center"
        style={{
          background: `linear-gradient(135deg, rgba(26, 43, 71, 0.8), rgba(74, 106, 160, 0.8))`,
          marginTop: "-64px",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="display-2 fw-bold mb-4 text-black">Join Our Team</h1>
              <p className="lead fs-4 opacity-75 mb-5">
                Be part of something extraordinary
              </p>
              <button
                onClick={scrollToJobs}
                className="btn btn-light btn-lg custom-btn"
                style={{
                  padding: "15px 40px",
                }}
              >
                View Open Positions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Company Description */}
      <div className="container py-5">
        <h2 className="text-center mb-4">Why Work With Us?</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100 text-center border-0 shadow-sm">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <Building2 size={48} className="text-primary mb-3" />
                <h5 className="card-title text-primary">Innovation</h5>
                <p className="card-text">Work on cutting-edge projects</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 text-center border-0 shadow-sm">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <Briefcase size={48} className="text-primary mb-3" />
                <h5 className="card-title text-primary">Growth</h5>
                <p className="card-text">Continuous learning opportunities</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 text-center border-0 shadow-sm">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <MapPin size={48} className="text-primary mb-3" />
                <h5 className="card-title text-primary">Balance</h5>
                <p className="card-text">Flexible work environment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div id="openPositions" className="container py-5">
        <h2 className="text-center mb-4">Open Positions</h2>

        {/* Filtering Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex flex-wrap gap-3 justify-content-center align-items-center">
              <input
                type="text"
                placeholder="Search jobs..."
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                className="form-control flex-grow-1"
                style={{ maxWidth: "300px" }}
              />
              <select
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                className="form-select"
                style={{ width: "200px" }}
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="form-select"
                style={{ width: "200px" }}
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                className="form-select"
                style={{ width: "200px" }}
              >
                <option value="">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
              <button
                onClick={clearFilters}
                className="btn btn-outline-secondary"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading job opportunities...</p>
          </div>
        ) : (
          <>
            {filteredJobs.length === 0 ? (
              <div className="alert alert-info text-center" role="alert">
                No jobs match your current filters.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover shadow-sm">
                  <thead>
                    <tr>
                      <th
                        className="bg-primary text-white py-3"
                        style={{ padding: "15px" }}
                      >
                        Job Title
                      </th>
                      <th
                        className="bg-primary text-white py-3"
                        style={{ padding: "15px" }}
                      >
                        Department
                      </th>
                      <th
                        className="bg-primary text-white py-3"
                        style={{ padding: "15px" }}
                      >
                        Location
                      </th>
                      <th
                        className="bg-primary text-white py-3"
                        style={{ padding: "15px" }}
                      >
                        Job Type
                      </th>
                      <th
                        className="bg-primary text-white py-3"
                        style={{ padding: "15px" }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.map((job) => (
                      <tr
                        key={job._id}
                        style={{
                          transition: "background-color 0.3s ease",
                          cursor: "pointer",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(74, 106, 160, 0.1)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = "";
                        }}
                      >
                        <td
                          className="fw-bold py-3"
                          style={{ padding: "15px" }}
                        >
                          {job.title}
                        </td>
                        <td className="py-3" style={{ padding: "15px" }}>
                          {job.department}
                        </td>
                        <td className="py-3" style={{ padding: "15px" }}>
                          {job.location}
                        </td>
                        <td
                          className="text-uppercase py-3"
                          style={{ padding: "15px" }}
                        >
                          {job.jobType}
                        </td>
                        <td className="py-3" style={{ padding: "15px" }}>
                          <button
                            onClick={(e) => handleViewDetails(job._id, e)}
                            className="btn btn-primary custom-btn"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add this style tag in your component for the animations */}
      <style>
        {`
          .hero-section {
            animation: fadeIn 1s ease-in-out;
          }
          
          .hero-section h1 {
            animation: fadeInUp 1s ease-in-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .table {
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }

          .custom-btn {
            border-radius: 8px !important;
            padding: 8px 16px !important;
            transition: all 0.3s ease-in-out !important;
            border: none !important;
          }

          .custom-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(var(--bs-primary-rgb), 0.3);
            background-color: var(--bs-secondary) !important;
          }
        `}
      </style>
    </div>
  );
}

export default PublicCareers;
