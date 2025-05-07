import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Container,
  Form,
  Button,
  Card,
  Alert,
  Spinner,
  Row,
  Col,
  ProgressBar,
  Badge,
} from "react-bootstrap";
import {
  ArrowLeft,
  Upload,
  Send,
  Person,
  Briefcase,
  FileEarmarkText,
  ChatLeftText,
  CheckCircleFill,
  ExclamationCircleFill,
  Link45deg,
  GeoAlt,
  Telephone,
  Envelope,
  Globe,
  ExclamationTriangleFill,
} from "react-bootstrap-icons";

function AddApp() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    linkedIn: "",
    portfolio: "",
    message: "",
    jobId: jobId || "",
  });

  // Add validation states
  const [validation, setValidation] = useState({
    firstName: { isValid: true, message: "" },
    lastName: { isValid: true, message: "" },
    email: { isValid: true, message: "" },
    phoneNumber: { isValid: true, message: "" },
    address: { isValid: true, message: "" },
  });

  // Add form touched state
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    address: false,
  });

  const [files, setFiles] = useState({
    resume: null,
    coverLetter: null,
  });

  const [fileErrors, setFileErrors] = useState({
    resume: "",
    coverLetter: "",
  });

  // Form completion tracking
  const [formProgress, setFormProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("personal");

  useEffect(() => {
    if (jobId) {
      fetchJobDetails();
    }
    
    // Calculate initial form progress
    calculateFormProgress();
  }, [jobId]);

  // Update progress whenever inputs or files change
  useEffect(() => {
    calculateFormProgress();
  }, [inputs, files]);

  const calculateFormProgress = () => {
    let completedFields = 0;
    let totalRequiredFields = 5; // firstName, lastName, email, phoneNumber, address, resume
    
    if (inputs.firstName && validation.firstName.isValid) completedFields++;
    if (inputs.lastName && validation.lastName.isValid) completedFields++;
    if (inputs.email && validation.email.isValid) completedFields++;
    if (inputs.phoneNumber && validation.phoneNumber.isValid) completedFields++;
    if (inputs.address && validation.address.isValid) completedFields++;
    if (files.resume) completedFields++;
    
    setFormProgress(Math.floor((completedFields / totalRequiredFields) * 100));
  };

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5002/jobs/${jobId}`);
      setJobDetails(response.data.job);
    } catch (err) {
      console.error("Error fetching job details:", err);
    }
  };

  // Validation functions
  const validateFirstName = (value) => {
    if (!value.trim()) {
      return { isValid: false, message: "First name is required" };
    }
    if (value.trim().length < 2) {
      return { isValid: false, message: "First name must be at least 2 characters" };
    }
    if (!/^[a-zA-Z\s'-]+$/.test(value)) {
      return { isValid: false, message: "First name can only contain letters, spaces, hyphens, and apostrophes" };
    }
    return { isValid: true, message: "" };
  };

  const validateLastName = (value) => {
    if (!value.trim()) {
      return { isValid: false, message: "Last name is required" };
    }
    if (value.trim().length < 2) {
      return { isValid: false, message: "Last name must be at least 2 characters" };
    }
    if (!/^[a-zA-Z\s'-]+$/.test(value)) {
      return { isValid: false, message: "Last name can only contain letters, spaces, hyphens, and apostrophes" };
    }
    return { isValid: true, message: "" };
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      return { isValid: false, message: "Email is required" };
    }
    // RFC 5322 compliant email regex
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(value)) {
      return { isValid: false, message: "Please enter a valid email address" };
    }
    return { isValid: true, message: "" };
  };

  const validatePhoneNumber = (value) => {
    if (!value.trim()) {
      return { isValid: false, message: "Phone number is required" };
    }
    // Allow for multiple formats with or without country code
    const phoneRegex = /^(\+\d{1,3}\s?)?(\(\d{1,4}\)\s?)?[\d\s.-]{7,15}$/;
    if (!phoneRegex.test(value)) {
      return { isValid: false, message: "Please enter a valid phone number" };
    }
    return { isValid: true, message: "" };
  };

  const validateAddress = (value) => {
    if (!value.trim()) {
      return { isValid: false, message: "Address is required" };
    }
    if (value.trim().length < 10) {
      return { isValid: false, message: "Please enter a complete address" };
    }
    return { isValid: true, message: "" };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate on change if field has been touched
    if (touched[name]) {
      let validationResult;
      switch (name) {
        case "firstName":
          validationResult = validateFirstName(value);
          break;
        case "lastName":
          validationResult = validateLastName(value);
          break;
        case "email":
          validationResult = validateEmail(value);
          break;
        case "phoneNumber":
          validationResult = validatePhoneNumber(value);
          break;
        case "address":
          validationResult = validateAddress(value);
          break;
        default:
          break;
      }

      if (validationResult) {
        setValidation(prev => ({
          ...prev,
          [name]: validationResult
        }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate on blur
    let validationResult;
    switch (name) {
      case "firstName":
        validationResult = validateFirstName(value);
        break;
      case "lastName":
        validationResult = validateLastName(value);
        break;
      case "email":
        validationResult = validateEmail(value);
        break;
      case "phoneNumber":
        validationResult = validatePhoneNumber(value);
        break;
      case "address":
        validationResult = validateAddress(value);
        break;
      default:
        break;
    }

    if (validationResult) {
      setValidation(prev => ({
        ...prev,
        [name]: validationResult
      }));
    }
  };

  const validateFile = (file, type) => {
    if (!file) {
      if (type === "resume") {
        return "Resume is required";
      }
      return "";
    }

    if (file.type !== "application/pdf") {
      return "Only PDF files are allowed";
    }

    if (file.size > 5 * 1024 * 1024) {
      return "File size must be less than 5MB";
    }

    return "";
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    const file = selectedFiles[0];
    const error = validateFile(file, name);

    setFileErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    if (!error) {
      setFiles((prev) => ({
        ...prev,
        [name]: file,
      }));
    }
  };

  const validateForm = () => {
    // Validate all fields
    const firstNameValidation = validateFirstName(inputs.firstName);
    const lastNameValidation = validateLastName(inputs.lastName);
    const emailValidation = validateEmail(inputs.email);
    const phoneValidation = validatePhoneNumber(inputs.phoneNumber);
    const addressValidation = validateAddress(inputs.address);

    // Set validation results
    setValidation({
      firstName: firstNameValidation,
      lastName: lastNameValidation,
      email: emailValidation,
      phoneNumber: phoneValidation,
      address: addressValidation
    });

    // Set all fields as touched
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      address: true
    });

    // Check if all validations passed
    return (
      firstNameValidation.isValid &&
      lastNameValidation.isValid &&
      emailValidation.isValid &&
      phoneValidation.isValid &&
      addressValidation.isValid &&
      !fileErrors.resume
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    const isValid = validateForm();
    
    if (!isValid) {
      toast.error("Please correct the errors in the form before submitting.");
      // Scroll to personal info section if there are errors
      setActiveSection("personal");
      return;
    }
    
    setLoading(true);

    const formData = new FormData();
    Object.keys(inputs).forEach((key) => {
      formData.append(key, inputs[key]);
    });

    formData.append("resume", files.resume);
    if (files.coverLetter) {
      formData.append("coverLetter", files.coverLetter);
    }

    console.log("Form Data Contents:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5002/applicants",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Server response:", response.data);

      if (response.data) {
        navigate("/application-success", {
          state: { jobTitle: jobDetails?.title || "the position" },
        });

        toast.success("Application submitted successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (err) {
      console.error("Full error:", err);
      console.error("Error response:", err.response?.data);
      toast.error(
        err.response?.data?.message || "Error submitting application"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 bg-light">
      <ToastContainer />
  

      <Card className="border-0 shadow mb-4 overflow-hidden">
        <div className="bg-primary text-white p-4">
          <h1 className="h3 mb-2">Submit Your Application</h1>
          <p className="mb-0 text-white-50">
            Please fill in all required fields marked with an asterisk (*)
          </p>
        </div>

        {jobDetails && (
          <Alert variant="info" className="m-3 border-start border-info border-4 d-flex align-items-center">
            <Briefcase className="me-3 text-info fs-4" />
            <div>
              <p className="mb-0">
                Applying for: <strong>{jobDetails.title}</strong>
                {jobDetails.department && (
                  <span className="ms-2 text-muted">
                    • {jobDetails.department}
                  </span>
                )}
              </p>
            </div>
          </Alert>
        )}

        <Card.Body className="p-4">
          <div className="mb-4">
            <ProgressBar 
              now={formProgress} 
              variant={formProgress === 100 ? "success" : "primary"} 
              className="mb-2" 
              style={{ height: "8px" }}
            />
            <div className="d-flex justify-content-between">
              <span className="small text-muted">Application Progress</span>
              <span className="small fw-bold">{formProgress}%</span>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2 mb-4">
            <Button 
              variant={activeSection === "personal" ? "primary" : "outline-primary"} 
              size="sm" 
              onClick={() => setActiveSection("personal")}
              className="rounded-pill"
            >
              <Person className="me-2" /> Personal Info
            </Button>
            <Button 
              variant={activeSection === "professional" ? "primary" : "outline-primary"} 
              size="sm" 
              onClick={() => setActiveSection("professional")}
              className="rounded-pill"
            >
              <Link45deg className="me-2" /> Professional Profiles
            </Button>
            <Button 
              variant={activeSection === "documents" ? "primary" : "outline-primary"} 
              size="sm" 
              onClick={() => setActiveSection("documents")}
              className="rounded-pill"
            >
              <FileEarmarkText className="me-2" /> Documents
            </Button>
            <Button 
              variant={activeSection === "message" ? "primary" : "outline-primary"} 
              size="sm" 
              onClick={() => setActiveSection("message")}
              className="rounded-pill"
            >
              <ChatLeftText className="me-2" /> Additional Message
            </Button>
          </div>

          <Form onSubmit={handleSubmit} noValidate>
            {/* Personal Information */}
            <Card 
              className={`mb-4 border-0 shadow-sm ${activeSection !== "personal" ? "d-none" : ""}`}
            >
              <Card.Body>
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                    <Person className="text-primary fs-4" />
                  </div>
                  <h2 className="h5 mb-0">Personal Information</h2>
                </div>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="firstName">
                      <Form.Label className="fw-semibold">
                        First Name <span className="text-danger">*</span>
                      </Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                          <Person className="text-muted" />
                        </span>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={inputs.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          isInvalid={touched.firstName && !validation.firstName.isValid}
                          className={`border-start-0 shadow-none ${touched.firstName && validation.firstName.isValid ? "is-valid" : ""}`}
                          placeholder="Enter your first name"
                        />
                        <Form.Control.Feedback type="invalid">
                          {validation.firstName.message}
                        </Form.Control.Feedback>
                      </div>
                      {touched.firstName && validation.firstName.isValid && (
                        <div className="text-success small mt-1">
                          <CheckCircleFill className="me-1" size={12} /> Looks good!
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="lastName">
                      <Form.Label className="fw-semibold">
                        Last Name <span className="text-danger">*</span>
                      </Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                          <Person className="text-muted" />
                        </span>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={inputs.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          isInvalid={touched.lastName && !validation.lastName.isValid}
                          className={`border-start-0 shadow-none ${touched.lastName && validation.lastName.isValid ? "is-valid" : ""}`}
                          placeholder="Enter your last name"
                        />
                        <Form.Control.Feedback type="invalid">
                          {validation.lastName.message}
                        </Form.Control.Feedback>
                      </div>
                      {touched.lastName && validation.lastName.isValid && (
                        <div className="text-success small mt-1">
                          <CheckCircleFill className="me-1" size={12} /> Looks good!
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label className="fw-semibold">
                        Email <span className="text-danger">*</span>
                      </Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                          <Envelope className="text-muted" />
                        </span>
                        <Form.Control
                          type="email"
                          name="email"
                          value={inputs.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          isInvalid={touched.email && !validation.email.isValid}
                          className={`border-start-0 shadow-none ${touched.email && validation.email.isValid ? "is-valid" : ""}`}
                          placeholder="name@example.com"
                        />
                        <Form.Control.Feedback type="invalid">
                          {validation.email.message}
                        </Form.Control.Feedback>
                      </div>
                      {touched.email && validation.email.isValid && (
                        <div className="text-success small mt-1">
                          <CheckCircleFill className="me-1" size={12} /> Valid email format
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="phoneNumber">
                      <Form.Label className="fw-semibold">
                        Phone Number <span className="text-danger">*</span>
                      </Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                          <Telephone className="text-muted" />
                        </span>
                        <Form.Control
                          type="tel"
                          name="phoneNumber"
                          value={inputs.phoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          isInvalid={touched.phoneNumber && !validation.phoneNumber.isValid}
                          className={`border-start-0 shadow-none ${touched.phoneNumber && validation.phoneNumber.isValid ? "is-valid" : ""}`}
                          placeholder="+1 (555) 123-4567"
                        />
                        <Form.Control.Feedback type="invalid">
                          {validation.phoneNumber.message}
                        </Form.Control.Feedback>
                      </div>
                      {touched.phoneNumber && validation.phoneNumber.isValid && (
                        <div className="text-success small mt-1">
                          <CheckCircleFill className="me-1" size={12} /> Valid phone format
                        </div>
                      )}
                      <div className="text-muted small mt-1">
                        <i>Format examples: +1 (555) 123-4567, 555-123-4567, 5551234567</i>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group controlId="address">
                      <Form.Label className="fw-semibold">
                        Address <span className="text-danger">*</span>
                      </Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                          <GeoAlt className="text-muted" />
                        </span>
                        <Form.Control
                          type="text"
                          name="address"
                          value={inputs.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          isInvalid={touched.address && !validation.address.isValid}
                          className={`border-start-0 shadow-none ${touched.address && validation.address.isValid ? "is-valid" : ""}`}
                          placeholder="Enter your full address"
                        />
                        <Form.Control.Feedback type="invalid">
                          {validation.address.message}
                        </Form.Control.Feedback>
                      </div>
                      {touched.address && validation.address.isValid && (
                        <div className="text-success small mt-1">
                          <CheckCircleFill className="me-1" size={12} /> Address looks complete
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                
                {/* Form validation status summary */}
                {(touched.firstName || touched.lastName || touched.email || touched.phoneNumber || touched.address) && 
                  !validation.firstName.isValid || !validation.lastName.isValid || !validation.email.isValid || 
                  !validation.phoneNumber.isValid || !validation.address.isValid ? (
                  <Alert variant="warning" className="mt-4">
                    <div className="d-flex">
                      <ExclamationTriangleFill className="mt-1 me-2 text-warning" />
                      <div>
                        <p className="mb-0">Please correct the errors in the form to continue.</p>
                      </div>
                    </div>
                  </Alert>
                ) : null}
                
                <div className="d-flex justify-content-end mt-4">
                  <Button 
                    variant="primary" 
                    className="rounded-pill px-4"
                    onClick={() => {
                      // Validate before moving to next section
                      const personalInfoValid = 
                        validateFirstName(inputs.firstName).isValid && 
                        validateLastName(inputs.lastName).isValid && 
                        validateEmail(inputs.email).isValid && 
                        validatePhoneNumber(inputs.phoneNumber).isValid && 
                        validateAddress(inputs.address).isValid;
                        
                      if (personalInfoValid) {
                        setActiveSection("professional");
                      } else {
                        // Mark all fields as touched to show validation
                        setTouched({
                          firstName: true,
                          lastName: true,
                          email: true,
                          phoneNumber: true,
                          address: true
                        });
                        
                        // Update validation
                        setValidation({
                          firstName: validateFirstName(inputs.firstName),
                          lastName: validateLastName(inputs.lastName),
                          email: validateEmail(inputs.email),
                          phoneNumber: validatePhoneNumber(inputs.phoneNumber),
                          address: validateAddress(inputs.address)
                        });
                        
                        toast.warning("Please fill all required fields correctly before proceeding.", {
                          position: "top-center"
                        });
                      }
                    }}
                  >
                    Next <ArrowLeft className="ms-2 rotate-180" />
                  </Button>
                </div>
              </Card.Body>
            </Card>

            {/* Professional Profiles */}
            <Card 
              className={`mb-4 border-0 shadow-sm ${activeSection !== "professional" ? "d-none" : ""}`}
            >
              <Card.Body>
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-info bg-opacity-10 p-3 rounded-circle me-3">
                    <Link45deg className="text-info fs-4" />
                  </div>
                  <h2 className="h5 mb-0">Professional Profiles</h2>
                </div>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="linkedIn">
                      <Form.Label className="fw-semibold">LinkedIn Profile (Optional)</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                          <Link45deg className="text-muted" />
                        </span>
                        <Form.Control
                          type="url"
                          name="linkedIn"
                          value={inputs.linkedIn}
                          onChange={handleChange}
                          className="border-start-0 shadow-none"
                          placeholder="https://linkedin.com/in/yourprofile"
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="portfolio">
                      <Form.Label className="fw-semibold">Portfolio/Website (Optional)</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                          <Globe className="text-muted" />
                        </span>
                        <Form.Control
                          type="url"
                          name="portfolio"
                          value={inputs.portfolio}
                          onChange={handleChange}
                          className="border-start-0 shadow-none"
                          placeholder="https://yourportfolio.com"
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex justify-content-between mt-4">
                  <Button 
                    variant="outline-primary" 
                    className="rounded-pill px-4"
                    onClick={() => setActiveSection("personal")}
                  >
                    <ArrowLeft className="me-2" /> Previous
                  </Button>
                  <Button 
                    variant="primary" 
                    className="rounded-pill px-4"
                    onClick={() => setActiveSection("documents")}
                  >
                    Next <ArrowLeft className="ms-2 rotate-180" />
                  </Button>
                </div>
              </Card.Body>
            </Card>

            {/* Documents */}
            <Card 
              className={`mb-4 border-0 shadow-sm ${activeSection !== "documents" ? "d-none" : ""}`}
            >
              <Card.Body>
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                    <FileEarmarkText className="text-success fs-4" />
                  </div>
                  <h2 className="h5 mb-0">Documents</h2>
                </div>
                <Row className="g-4">
                  <Col md={6}>
                    <div className={`card border-1 ${files.resume ? "border-success bg-success bg-opacity-10" : "border-dashed"} h-100`}>
                      <div className="card-body text-center p-4">
                        <Form.Group controlId="resume">
                          <div className="mb-3">
                            {files.resume ? (
                              <CheckCircleFill className="text-success fs-1 mb-3" />
                            ) : (
                              <FileEarmarkText className="text-muted fs-1 mb-3" />
                            )}
                            <Form.Label className="fw-semibold d-block">
                              Resume/CV <span className="text-danger">*</span>
                            </Form.Label>
                            <p className="text-muted small mb-3">
                              PDF format only, maximum file size: 5MB
                            </p>
                          </div>

                          {files.resume ? (
                            <div className="mb-3 d-flex align-items-center justify-content-center">
                              <span className="bg-white p-2 rounded shadow-sm text-truncate" style={{ maxWidth: "200px" }}>
                                <Upload className="me-2 text-success" />
                                {files.resume.name}
                              </span>
                            </div>
                          ) : null}

                          <div className="d-grid">
                            <Form.Control
                              type="file"
                              name="resume"
                              accept=".pdf"
                              onChange={handleFileChange}
                              required
                              isInvalid={!!fileErrors.resume}
                              className="d-none"
                            />
                            <Button 
                              variant={files.resume ? "outline-success" : "outline-primary"} 
                              onClick={() => document.getElementById("resume").click()}
                              className="rounded-pill"
                            >
                              {files.resume ? "Change File" : "Upload Resume"}
                            </Button>
                          </div>
                          
                          {fileErrors.resume && (
                            <div className="text-danger small mt-2">
                              <ExclamationCircleFill className="me-1" />
                              {fileErrors.resume}
                            </div>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className={`card border-1 ${files.coverLetter ? "border-success bg-success bg-opacity-10" : "border-dashed"} h-100`}>
                      <div className="card-body text-center p-4">
                        <Form.Group controlId="coverLetter">
                          <div className="mb-3">
                            {files.coverLetter ? (
                              <CheckCircleFill className="text-success fs-1 mb-3" />
                            ) : (
                              <FileEarmarkText className="text-muted fs-1 mb-3" />
                            )}
                            <Form.Label className="fw-semibold d-block">
                              Cover Letter (Optional)
                            </Form.Label>
                            <p className="text-muted small mb-3">
                              PDF format only, maximum file size: 5MB
                            </p>
                          </div>

                          {files.coverLetter ? (
                            <div className="mb-3 d-flex align-items-center justify-content-center">
                              <span className="bg-white p-2 rounded shadow-sm text-truncate" style={{ maxWidth: "200px" }}>
                                <Upload className="me-2 text-success" />
                                {files.coverLetter.name}
                              </span>
                            </div>
                          ) : null}

                          <div className="d-grid">
                            <Form.Control
                              type="file"
                              name="coverLetter"
                              accept=".pdf"
                              onChange={handleFileChange}
                              isInvalid={!!fileErrors.coverLetter}
                              className="d-none"
                            />
                            <Button 
                              variant={files.coverLetter ? "outline-success" : "outline-primary"} 
                              onClick={() => document.getElementById("coverLetter").click()}
                              className="rounded-pill"
                            >
                              {files.coverLetter ? "Change File" : "Upload Cover Letter"}
                            </Button>
                          </div>
                          
                          {fileErrors.coverLetter && (
                            <div className="text-danger small mt-2">
                              <ExclamationCircleFill className="me-1" />
                              {fileErrors.coverLetter}
                            </div>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="d-flex justify-content-between mt-4">
                  <Button 
                    variant="outline-primary" 
                    className="rounded-pill px-4"
                    onClick={() => setActiveSection("professional")}
                  >
                    <ArrowLeft className="me-2" /> Previous
                  </Button>
                  <Button 
                    variant="primary" 
                    className="rounded-pill px-4"
                    onClick={() => setActiveSection("message")}
                  >
                    Next <ArrowLeft className="ms-2 rotate-180" />
                  </Button>
                </div>
              </Card.Body>
            </Card>

            {/* Message */}
            <Card 
              className={`mb-4 border-0 shadow-sm ${activeSection !== "message" ? "d-none" : ""}`}
            >
              <Card.Body>
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-warning bg-opacity-10 p-3 rounded-circle me-3">
                    <ChatLeftText className="text-warning fs-4" />
                  </div>
                  <h2 className="h5 mb-0">Additional Message</h2>
                </div>
                <Form.Group controlId="message">
                  <Form.Label className="fw-semibold">Message to the Talent Team (Optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={inputs.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Share any additional information about your application..."
                    className="shadow-none"
                  />
                  <div className="text-muted mt-2 small d-flex justify-content-between">
                    <span>Tell us why you're interested in this position and what makes you a great fit.</span>
                    <span>{inputs.message.length} characters</span>
                  </div>
                </Form.Group>
                
                <div className="d-flex justify-content-between mt-4">
                  <Button 
                    variant="outline-primary" 
                    className="rounded-pill px-4"
                    onClick={() => setActiveSection("documents")}
                  >
                    <ArrowLeft className="me-2" /> Previous
                  </Button>
                  <div></div>
                </div>
              </Card.Body>
            </Card>

            {/* Application Summary & Submit Section */}
            <Card className={`border-0 shadow-sm ${activeSection === "message" ? "" : "d-none"}`}>
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="p-2 rounded-circle bg-primary text-white me-3">
                    <CheckCircleFill className="fs-5" />
                  </div>
                  <h3 className="h5 mb-0">Application Summary</h3>
                </div>
                
                <div className="mb-4">
                  <div className="d-flex flex-wrap gap-3">
                    <div className="bg-light rounded p-3">
                      <div className="small text-muted">Name</div>
                      <div className="fw-semibold">
                        {inputs.firstName || "___"} {inputs.lastName || "___"}
                      </div>
                    </div>
                    
                    <div className="bg-light rounded p-3">
                      <div className="small text-muted">Email</div>
                      <div className="fw-semibold">
                        {inputs.email || "___"}
                      </div>
                    </div>
                    
                    <div className="bg-light rounded p-3">
                      <div className="small text-muted">Phone</div>
                      <div className="fw-semibold">
                        {inputs.phoneNumber || "___"}
                      </div>
                    </div>
                    
                    <div className="bg-light rounded p-3">
                      <div className="small text-muted">Resume</div>
                      <div className="fw-semibold">
                        {files.resume ? (
                          <span className="text-success">Uploaded</span>
                        ) : (
                          <span className="text-danger">Required</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-light rounded p-3">
                      <div className="small text-muted">Cover Letter</div>
                      <div className="fw-semibold">
                        {files.coverLetter ? (
                          <span className="text-success">Uploaded</span>
                        ) : (
                          <span className="text-muted">Optional</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <Alert variant="light" className="mb-4 border">
                  <div className="d-flex">
                    <ExclamationCircleFill className="text-primary mt-1 me-2" />
                    <div>
                      <p className="mb-0">
                        By submitting this application, you confirm that all the information provided is accurate to the best of your knowledge. Your data will be processed according to our <a href="#" className="text-decoration-none">privacy policy</a>.
                      </p>
                    </div>
                  </div>
                </Alert>

                <div className="d-flex justify-content-between">
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate("/")}
                    disabled={loading}
                    className="rounded-pill px-4"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loading || !files.resume}
                    className="rounded-pill px-4 shadow-sm"
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="me-2" /> Submit Application
                      </>
                    )}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

// Helper class for rotating icons
const styles = document.createElement('style');
styles.innerHTML = `
  .rotate-180 {
    transform: rotate(180deg);
  }
  .border-dashed {
    border-style: dashed !important;
  }
`;
document.head.appendChild(styles);

export default AddApp;