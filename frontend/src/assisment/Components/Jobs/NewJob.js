import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./NewJob.css";

function NewJob() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: [""],
    responsibilities: [""],
    jobType: "Full-time",
    location: "",
    salary: {
      min: "",
      max: "",
      currency: "LKR",
    },
    experience: {
      min: "",
      max: "",
      unit: "years",
    },
    status: "active",
    deadline: "",
    postedBy: "",
    department: "",
  });

  // Field validation states
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Fetch job details if editing
  useEffect(() => {
    if (isEditing) {
      fetchJob();
    }
  }, [id]);

  // Fetch job data
  const fetchJob = async () => {
    setFormLoading(true);
    try {
      const res = await axios.get(`http://localhost:5002/jobs/${id}`);
      setFormData(res.data.job);
      toast.info("Job details loaded successfully");
    } catch (err) {
      console.error("Error fetching job:", err);
      toast.error("Failed to fetch job details");
    } finally {
      setFormLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Mark field as touched for validation
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
      
      // Validate field
      validateField(name, value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      
      // Validate field
      validateField(name, value);
    }
  };

  // Handle blur event for validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, value);
  };

  // Validate a single field
  const validateField = (name, value) => {
    let newErrors = { ...errors };
    
    // Title validation
    if (name === "title") {
      if (!value.trim()) {
        newErrors.title = "Job title is required";
      } else if (value.trim().length < 3) {
        newErrors.title = "Job title must be at least 3 characters";
      } else {
        delete newErrors.title;
      }
    }
    
    // Description validation
    if (name === "description") {
      if (!value.trim()) {
        newErrors.description = "Job description is required";
      } else if (value.trim().length < 20) {
        newErrors.description = "Please provide a more detailed description";
      } else {
        delete newErrors.description;
      }
    }
    
    // Department validation
    if (name === "department") {
      if (!value.trim()) {
        newErrors.department = "Department is required";
      } else {
        delete newErrors.department;
      }
    }
    
    // Location validation
    if (name === "location") {
      if (!value.trim()) {
        newErrors.location = "Location is required";
      } else {
        delete newErrors.location;
      }
    }
    
    // Salary validation
    if (name === "salary.min" || name === "salary.max") {
      const min = name === "salary.min" ? parseInt(value) : parseInt(formData.salary.min);
      const max = name === "salary.max" ? parseInt(value) : parseInt(formData.salary.max);
      
      if (isNaN(min) || min <= 0) {
        newErrors["salary.min"] = "Minimum salary must be greater than 0";
      } else {
        delete newErrors["salary.min"];
      }
      
      if (isNaN(max) || max <= 0) {
        newErrors["salary.max"] = "Maximum salary must be greater than 0";
      } else if (!isNaN(min) && min > 0 && max > 0 && min > max) {
        newErrors["salary.max"] = "Maximum salary must be greater than minimum";
      } else {
        delete newErrors["salary.max"];
      }
    }
    
    // Experience validation
    if (name === "experience.min" || name === "experience.max") {
      const min = name === "experience.min" ? parseInt(value) : parseInt(formData.experience.min);
      const max = name === "experience.max" ? parseInt(value) : parseInt(formData.experience.max);
      
      if (isNaN(min) || min < 0) {
        newErrors["experience.min"] = "Minimum experience must be valid";
      } else {
        delete newErrors["experience.min"];
      }
      
      if (isNaN(max) || max < 0) {
        newErrors["experience.max"] = "Maximum experience must be valid";
      } else if (!isNaN(min) && min >= 0 && max >= 0 && min > max) {
        newErrors["experience.max"] = "Maximum experience must be greater than minimum";
      } else {
        delete newErrors["experience.max"];
      }
    }
    
    // Deadline validation
    if (name === "deadline") {
      const deadlineDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (!value) {
        newErrors.deadline = "Deadline is required";
      } else if (deadlineDate < today) {
        newErrors.deadline = "Deadline must be a future date";
      } else {
        delete newErrors.deadline;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle array changes (requirements and responsibilities)
  const handleArrayChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
    
    // Validate the array
    validateArray(field, [...formData[field].map((item, i) => i === index ? value : item)]);
  };

  // Validate array fields
  const validateArray = (field, array) => {
    let newErrors = { ...errors };
    
    if (array.every(item => !item.trim())) {
      newErrors[field] = `At least one ${field.slice(0, -1)} is required`;
    } else {
      delete newErrors[field];
    }
    
    setErrors(newErrors);
  };

  // Add new field to array
  const addArrayField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  // Remove field from array
  const removeArrayField = (field, index) => {
    if (formData[field].length > 1) {
      const newArray = formData[field].filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        [field]: newArray,
      }));
      
      // Validate the updated array
      validateArray(field, newArray);
    } else {
      toast.info(`At least one ${field.slice(0, -1)} is required`);
    }
  };

  // Validate entire form
  const validateForm = (data) => {
    let newErrors = {};
    let isValid = true;
    
    // Check for empty required fields
    if (!data.title?.trim()) {
      newErrors.title = "Job title is required";
      isValid = false;
    }
    
    if (!data.description?.trim()) {
      newErrors.description = "Job description is required";
      isValid = false;
    }
    
    if (!data.department?.trim()) {
      newErrors.department = "Department is required";
      isValid = false;
    }
    
    if (!data.location?.trim()) {
      newErrors.location = "Location is required";
      isValid = false;
    }

    // Validate requirements and responsibilities
    if (!data.requirements?.length || data.requirements.every((req) => !req.trim())) {
      newErrors.requirements = "At least one requirement is required";
      isValid = false;
    }
    
    if (!data.responsibilities?.length || data.responsibilities.every((resp) => !resp.trim())) {
      newErrors.responsibilities = "At least one responsibility is required";
      isValid = false;
    }

    // Validate salary range
    const salaryMin = parseInt(data.salary.min);
    const salaryMax = parseInt(data.salary.max);
    
    if (isNaN(salaryMin) || salaryMin <= 0) {
      newErrors["salary.min"] = "Please enter a valid minimum salary";
      isValid = false;
    }
    
    if (isNaN(salaryMax) || salaryMax <= 0) {
      newErrors["salary.max"] = "Please enter a valid maximum salary";
      isValid = false;
    } else if (salaryMin > salaryMax) {
      newErrors["salary.max"] = "Maximum salary must be greater than minimum";
      isValid = false;
    }

    // Validate experience range
    const expMin = parseInt(data.experience.min);
    const expMax = parseInt(data.experience.max);
    
    if (isNaN(expMin) || expMin < 0) {
      newErrors["experience.min"] = "Please enter a valid minimum experience";
      isValid = false;
    }
    
    if (isNaN(expMax) || expMax < 0) {
      newErrors["experience.max"] = "Please enter a valid maximum experience";
      isValid = false;
    } else if (expMin > expMax) {
      newErrors["experience.max"] = "Maximum experience must be greater than minimum";
      isValid = false;
    }

    // Validate deadline
    if (!data.deadline) {
      newErrors.deadline = "Application deadline is required";
      isValid = false;
    } else {
      const deadlineDate = new Date(data.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadlineDate < today) {
        newErrors.deadline = "Deadline must be a future date";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Clean the data
      const cleanedData = {
        ...formData,
        requirements: formData.requirements.filter((req) => req.trim()),
        responsibilities: formData.responsibilities.filter((resp) => resp.trim()),
        title: formData.title.trim(),
        description: formData.description.trim(),
        department: formData.department.trim(),
        location: formData.location.trim(),
      };

      // Validate the form data
      const isValid = validateForm(cleanedData);
      
      if (!isValid) {
        toast.error("Please correct the errors in the form");
        setIsSubmitting(false);
        return;
      }

      // Format data according to backend expectations
      const jobData = {
        title: cleanedData.title,
        description: cleanedData.description,
        department: cleanedData.department,
        requirements:
          cleanedData.requirements.length > 0 ? cleanedData.requirements : [""],
        responsibilities:
          cleanedData.responsibilities.length > 0
            ? cleanedData.responsibilities
            : [""],
        jobType: cleanedData.jobType,
        location: cleanedData.location,
        salary: {
          min: parseInt(cleanedData.salary.min) || 0,
          max: parseInt(cleanedData.salary.max) || 0,
          currency: "LKR",
        },
        experience: {
          min: parseInt(cleanedData.experience.min) || 0,
          max: parseInt(cleanedData.experience.max) || 0,
          unit: "years",
        },
        deadline: new Date(cleanedData.deadline).toISOString(),
        status: cleanedData.status || "active",
        postedBy: "TalentPool",
      };
      
      // Show loading toast
      const loadingToastId = toast.loading(
        isEditing ? "Updating job..." : "Creating job..."
      );

      let response;
      if (isEditing) {
        response = await axios.put(`http://localhost:5002/jobs/${id}`, jobData);
      } else {
        response = await axios.post(
          "http://localhost:5002/jobs/create",
          jobData
        );
      }

      if (response.status === 200 || response.status === 201) {
        // Update loading toast to success
        toast.update(loadingToastId, {
          render: isEditing ? "Job updated successfully!" : "Job created successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        
        setTimeout(() => navigate("/dashboard/jobs"), 2000);
      }
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        data: error.response?.data?.error,
      });

      // More specific error messages
      if (error.message.includes("deadline")) {
        toast.error("Please select a future date for the deadline");
      } else if (error.message.includes("salary")) {
        toast.error("Please enter valid salary range");
      } else if (error.message.includes("experience")) {
        toast.error("Please enter valid experience range");
      } else {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            `Error ${isEditing ? "updating" : "creating"} job`
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format the date for the date input field
  const getFormattedDate = (date) => {
    if (!date) return "";
    try {
      return date.split("T")[0];
    } catch (error) {
      return "";
    }
  };

  // Determine if a field has an error
  const hasError = (fieldName) => {
    return touched[fieldName] && errors[fieldName];
  };

  // Determine form section completion status
  const getSectionStatus = (section) => {
    switch (section) {
      case "basic":
        return !errors.title && !errors.description && !errors.department && 
               formData.title && formData.description && formData.department;
      case "requirements":
        return !errors.requirements && !errors.responsibilities &&
               formData.requirements.some(req => req.trim()) && 
               formData.responsibilities.some(resp => resp.trim());
      case "details":
        return !errors.location && !errors["salary.min"] && !errors["salary.max"] &&
               !errors["experience.min"] && !errors["experience.max"] && !errors.deadline &&
               formData.location && formData.salary.min && formData.salary.max &&
               formData.experience.min && formData.experience.max && formData.deadline;
      default:
        return false;
    }
  };

  if (formLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="job-form-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>{isEditing ? "Edit Job Posting" : "Create New Job Posting"}</h1>

      <form onSubmit={handleSubmit}>
        <div className={`form-section ${getSectionStatus("basic") ? "section-complete" : ""}`}>
          <h2>Basic Information</h2>

          <div className={`form-group ${hasError("title") ? "has-error" : ""}`}>
            <label htmlFor="title">Job Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter job title"
              required
            />
            {hasError("title") && <div className="error-message">{errors.title}</div>}
          </div>

          <div className={`form-group ${hasError("department") ? "has-error" : ""}`}>
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter department"
              required
            />
            {hasError("department") && <div className="error-message">{errors.department}</div>}
          </div>

          <div className={`form-group ${hasError("description") ? "has-error" : ""}`}>
            <label htmlFor="description">Job Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Provide a detailed description of the job"
              required
              rows="4"
            />
            {hasError("description") && <div className="error-message">{errors.description}</div>}
          </div>
        </div>

        <div className={`form-section ${getSectionStatus("requirements") ? "section-complete" : ""}`}>
          <h2>Requirements & Responsibilities</h2>

          <div className={`form-group ${errors.requirements ? "has-error" : ""}`}>
            <label>Requirements</label>
            {formData.requirements.map((req, index) => (
              <div key={index} className="array-input">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => handleArrayChange(index, "requirements", e.target.value)}
                  placeholder={`Requirement ${index + 1}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeArrayField("requirements", index)}
                  className="remove-btn"
                  disabled={formData.requirements.length === 1}
                >
                  Remove
                </button>
              </div>
            ))}
            {errors.requirements && <div className="error-message">{errors.requirements}</div>}
            <button
              type="button"
              onClick={() => addArrayField("requirements")}
              className="add-btn"
            >
              Add Requirement
            </button>
          </div>

          <div className={`form-group ${errors.responsibilities ? "has-error" : ""}`}>
            <label>Responsibilities</label>
            {formData.responsibilities.map((resp, index) => (
              <div key={index} className="array-input">
                <input
                  type="text"
                  value={resp}
                  onChange={(e) => handleArrayChange(index, "responsibilities", e.target.value)}
                  placeholder={`Responsibility ${index + 1}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeArrayField("responsibilities", index)}
                  className="remove-btn"
                  disabled={formData.responsibilities.length === 1}
                >
                  Remove
                </button>
              </div>
            ))}
            {errors.responsibilities && <div className="error-message">{errors.responsibilities}</div>}
            <button
              type="button"
              onClick={() => addArrayField("responsibilities")}
              className="add-btn"
            >
              Add Responsibility
            </button>
          </div>
        </div>

        <div className={`form-section ${getSectionStatus("details") ? "section-complete" : ""}`}>
          <h2>Job Details</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="jobType">Job Type</label>
              <select
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>

            <div className={`form-group ${hasError("location") ? "has-error" : ""}`}>
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Job location"
                required
              />
              {hasError("location") && <div className="error-message">{errors.location}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Salary Range (LKR)</label>
              <div className="range-inputs">
                <input
                  type="number"
                  name="salary.min"
                  value={formData.salary.min}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Min"
                  required
                  className={hasError("salary.min") ? "input-error" : ""}
                />
                <span>-</span>
                <input
                  type="number"
                  name="salary.max"
                  value={formData.salary.max}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Max"
                  required
                  className={hasError("salary.max") ? "input-error" : ""}
                />
              </div>
              {hasError("salary.min") && <div className="error-message">{errors["salary.min"]}</div>}
              {hasError("salary.max") && <div className="error-message">{errors["salary.max"]}</div>}
            </div>

            <div className="form-group">
              <label>Experience Required (Years)</label>
              <div className="range-inputs">
                <input
                  type="number"
                  name="experience.min"
                  value={formData.experience.min}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Min"
                  required
                  className={hasError("experience.min") ? "input-error" : ""}
                />
                <span>-</span>
                <input
                  type="number"
                  name="experience.max"
                  value={formData.experience.max}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Max"
                  required
                  className={hasError("experience.max") ? "input-error" : ""}
                />
              </div>
              {hasError("experience.min") && <div className="error-message">{errors["experience.min"]}</div>}
              {hasError("experience.max") && <div className="error-message">{errors["experience.max"]}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className={`form-group ${hasError("deadline") ? "has-error" : ""}`}>
              <label htmlFor="deadline">Application Deadline</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={getFormattedDate(formData.deadline)}
                onChange={handleChange}
                onBlur={handleBlur}
                min={new Date().toISOString().split("T")[0]}
                required
              />
              {hasError("deadline") && <div className="error-message">{errors.deadline}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="active">Active</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending Review</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isSubmitting || Object.keys(errors).length > 0}
          >
            {isSubmitting ? (
              <span>
                {isEditing ? "Updating..." : "Creating..."}
              </span>
            ) : (
              <span>
                {isEditing ? "Update Job" : "Create Job"}
              </span>
            )}
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/dashboard/jobs")}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewJob;