import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateUser() {
    const [inputs, setInputs] = useState({
        projectTitle: "",
        customerName: "",
        customerEmail: "",
        projectDescription: "",
        budget: "",
        timeline: "",
        additionalRequirements: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();

    console.log("UpdateUser mounted with ID:", id);

     



    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true);
                console.log("Fetching project with ID:", id);
                
                if (!/^[0-9a-fA-F]{24}$/.test(id)) {
                    throw new Error('Invalid project ID format');
                }

                const response = await axios.get(`http://localhost:8070/projects/${id}`);
                console.log("API Response:", response);

                if (!response.data) {
                    throw new Error('Empty response data');
                }

                const projectData = response.data;
                
                setInputs({
                    projectTitle: projectData.projectTitle || "",
                    customerName: projectData.customerName || "",
                    customerEmail: projectData.customerEmail || "",
                    projectDescription: projectData.projectDescription || "",
                    budget: projectData.budget || "",
                    timeline: projectData.timeline || "",
                    additionalRequirements: projectData.additionalRequirements || "",
                });
            } catch (error) {
                console.error("Detailed error:", {
                    message: error.message,
                    response: error.response?.data,
                    stack: error.stack
                });
                setError(`Error: ${error.response?.data?.message || error.message}`);
            } finally {
                setLoading(false);
            }
        };

       if(id) fetchProject();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting update:", inputs);
            const response = await axios.put(`http://localhost:8070/projects/${id}`, inputs);
            console.log("Update response:", response);
            
            if (response.status >= 200 && response.status < 300) {
                alert("Project updated successfully!");
                navigate('/users');
            } else {
                throw new Error(`Server returned status ${response.status}`);
            }
        } catch (error) {
            console.error("Update Error:", error);
            alert(`Failed to update project: ${error.message}`);
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading project details...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="alert alert-danger m-4" role="alert">
            {error}
        </div>
    );

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
                    <div className="card border-0 shadow-lg">
                        <div className="card-header bg-primary text-white py-3">
                            <h2 className="text-center mb-0 fw-bold">Update Project Deils</h2>
                        </div>
                        <div className="card-body p-5">
                            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                                {/* Project Title */}
                                <div className="mb-4">
                                    <label htmlFor="projectTitle" className="form-label fw-semibold">
                                        Project Title <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg border-2 border-primary-subtle"
                                        id="projectTitle"
                                        name="projectTitle"
                                        onChange={handleChange}
                                        value={inputs.projectTitle}
                                        required
                                        placeholder="Enter project title"
                                    />
                                    <div className="invalid-feedback">Please provide a project title.</div>
                                </div>
                                
                                {/* Customer Info Row */}
                                <div className="row g-3 mb-4">
                                    <div className="col-md-6">
                                        <label htmlFor="customerName" className="form-label fw-semibold">
                                            Customer Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control border-2 border-primary-subtle"
                                            id="customerName"
                                            name="customerName"
                                            onChange={handleChange}
                                            value={inputs.customerName}
                                            required
                                            placeholder="Customer full name"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="customerEmail" className="form-label fw-semibold">
                                            Customer Email <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control border-2 border-primary-subtle"
                                            id="customerEmail"
                                            name="customerEmail"
                                            onChange={handleChange}
                                            value={inputs.customerEmail}
                                            required
                                            placeholder="customer@example.com"
                                        />
                                    </div>
                                </div>
                                
                                {/* Project Description */}
                                <div className="mb-4">
                                    <label htmlFor="projectDescription" className="form-label fw-semibold">
                                        Project Description <span className="text-danger">*</span>
                                    </label>
                                    <textarea
                                        className="form-control border-2 border-primary-subtle"
                                        id="projectDescription"
                                        name="projectDescription"
                                        rows="5"
                                        onChange={handleChange}
                                        value={inputs.projectDescription}
                                        required
                                        placeholder="Describe the project in detail..."
                                    />
                                </div>
                                
                                {/* Budget & Timeline Row */}
                                <div className="row g-3 mb-4">
                                    <div className="col-md-6">
                                        <label htmlFor="budget" className="form-label fw-semibold">
                                            Budget ($) <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-primary-subtle">$</span>
                                            <input
                                                type="number"
                                                className="form-control border-2 border-primary-subtle border-start-0"
                                                id="budget"
                                                name="budget"
                                                onChange={handleChange}
                                                value={inputs.budget}
                                                min="0"
                                                required
                                                placeholder="Estimated budget"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="timeline" className="form-label fw-semibold">
                                            Timeline <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control border-2 border-primary-subtle"
                                            id="timeline"
                                            name="timeline"
                                            onChange={handleChange}
                                            value={inputs.timeline}
                                            required
                                            placeholder="e.g., 2 weeks, 1 month"
                                        />
                                    </div>
                                </div>
                                
                                {/* Additional Requirements */}
                                <div className="mb-4">
                                    <label htmlFor="additionalRequirements" className="form-label fw-semibold">
                                        Additional Requirements
                                    </label>
                                    <textarea
                                        className="form-control border-2 border-primary-subtle"
                                        id="additionalRequirements"
                                        name="additionalRequirements"
                                        rows="3"
                                        onChange={handleChange}
                                        value={inputs.additionalRequirements}
                                        placeholder="Any special requirements or notes..."
                                    />
                                </div>
                                
                                {/* Submit Button */}
                                <div className="d-grid gap-2 mt-4">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg py-3 fw-bold shadow-sm"
                                    >
                                        <i className="bi bi-save-fill me-2"></i>
                                        Update Project
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateUser;