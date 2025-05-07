import React from "react";
import "./FilterBar.css";

function FilterBar({ filters, onFilterChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="filter-bar">
      <div className="search-box">
        <input
          type="text"
          name="search"
          placeholder="Search by name or position..."
          value={filters.search}
          onChange={handleChange}
        />
      </div>

      <div className="filter-group">
        <select name="status" value={filters.status} onChange={handleChange}>
          <option value="all">All Status</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="reviewing">Under Review</option>
          <option value="rejected">Rejected</option>
          <option value="assignment_sent">Assignment Sent</option>
          <option value="assignment_completed">Assignment Completed</option>
        </select>

        <select name="sortBy" value={filters.sortBy} onChange={handleChange}>
          <option value="dateApplied">Date Applied</option>
          <option value="status">Status</option>
          <option value="score">Score</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
