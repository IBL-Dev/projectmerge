import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  Tab,
  Tabs,
  Badge,
  Form,
  Modal,
  Spinner,
  ProgressBar,
  Row,
  Col,
  Container,
  ListGroup,
  Alert
} from "react-bootstrap";
import {
  ArrowLeft,
  Envelope,
  Calendar,
  FileText,
  CheckCircle,
  PersonFill,
  BuildingFill,
  TelephoneFill,
  GeoAltFill,
  Linkedin,
  Globe,
  PencilSquare,
  Clock,
  XCircleFill,
  CheckCircleFill
} from "react-bootstrap-icons";

const ApplicantProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [assignmentData, setAssignmentData] = useState({
    title: "",
    description: "",
    deadline: "",
  });
  const [assignments, setAssignments] = useState([]);
  const [submittingAssignment, setSubmittingAssignment] = useState(false);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const res = await axios.get(`http://localhost:5002/applicants/${id}`);
        setApplicant(res.data.applicant);
        setLoading(false);
      } catch (err) {
        setError("Failed to load applicant data");
        setLoading(false);
      }
    };

    const fetchAssignments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5002/assignments?assignedTo=${id}`
        );
        setAssignments(res.data);
      } catch (err) {
        console.error("Failed to load assignments", err);
      }
    };

    fetchApplicant();
    fetchAssignments();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setStatusUpdateLoading(true);
    try {
      await axios.patch(`http://localhost:5002/applicants/${id}`, {
        status: newStatus,
      });
      setApplicant({ ...applicant, status: newStatus });
      // Show toast notification here if you have a toast system
    } catch (err) {
      console.error("Error updating status:", err);
      // Show error notification
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    setSubmittingAssignment(true);
    try {
      const newAssignment = {
        ...assignmentData,
        assignedTo: id,
        deadline: assignmentData.deadline
          ? new Date(assignmentData.deadline)
          : null,
      };
      const res = await axios.post(
        `http://localhost:5002/assignments`,
        newAssignment
      );
      setAssignments([...assignments, res.data]);
      setShowAssignmentModal(false);
      setAssignmentData({ title: "", description: "", deadline: "" });
      // Show success toast notification
    } catch (err) {
      console.error("Error creating assignment:", err);
      // Show error toast notification
    } finally {
      setSubmittingAssignment(false);
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <div className="text-center">
          <Spinner animation="border" variant="primary" style={{ width: "3rem", height: "3rem" }} />
          <p className="mt-3 text-muted">Loading applicant data...</p>
        </div>
      </div>
    );
    
  if (error) return (
    <Container className="py-5">
      <Alert variant="danger">
        <Alert.Heading>Error Loading Data</Alert.Heading>
        <p>{error}</p>
        <div className="d-flex justify-content-end">
          <Button variant="outline-danger" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </Alert>
    </Container>
  );
  
  if (!applicant) return (
    <Container className="py-5">
      <Alert variant="warning">
        <Alert.Heading>Applicant Not Found</Alert.Heading>
        <p>We couldn't find the applicant you're looking for.</p>
        <div className="d-flex justify-content-end">
          <Button variant="outline-warning" onClick={() => navigate(-1)}>
            Return to Talent Pool
          </Button>
        </div>
      </Alert>
    </Container>
  );

  // Format application date
  const formattedDate = new Date(applicant.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Container fluid className="py-4 px-4 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate(-1)} 
          className="d-flex align-items-center"
        >
          <ArrowLeft className="me-2" /> Back to Talent Pool
        </Button>
        
        <div>
          <Badge 
            bg={getStatusColor(applicant.status)} 
            className="fs-6 py-2 px-3"
            style={{ fontWeight: "500" }}
          >
            {applicant.status}
          </Badge>
        </div>
      </div>

      <Row className="g-4">
        {/* Left Sidebar */}
        <Col lg={4}>
          <Card className="shadow-sm mb-4 border-0 rounded-3">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <div 
                  className="avatar-circle-lg mb-3 mx-auto d-flex justify-content-center align-items-center bg-primary text-white"
                  style={{ width: "100px", height: "100px", borderRadius: "50%", fontSize: "2rem" }}
                >
                  {applicant.firstName[0]}
                  {applicant.lastName[0]}
                </div>
                <h3 className="fw-bold mb-1">
                  {applicant.firstName} {applicant.lastName}
                </h3>
                <p className="text-muted mb-3">
                  {applicant.jobId ? applicant.jobId.title : "Direct Applicant"}
                </p>
              </div>

              <div className="d-grid gap-2 mb-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="d-flex align-items-center justify-content-center"
                  onClick={() => setShowAssignmentModal(true)}
                >
                  <FileText className="me-2" /> Assign Task
                </Button>
                <div className="d-flex gap-2">
                  <Button 
                    variant="outline-primary" 
                    className="flex-grow-1 d-flex align-items-center justify-content-center"
                  >
                    <Envelope className="me-2" /> Message
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    className="flex-grow-1 d-flex align-items-center justify-content-center"
                  >
                    <Calendar className="me-2" /> Interview
                  </Button>
                </div>
              </div>

              <hr className="my-4" />

              <div>
                <h5 className="fw-bold mb-3">Contact Information</h5>
                <ListGroup variant="flush" className="mb-4">
                  <ListGroup.Item className="px-0 py-2 border-0 d-flex">
                    <div className="me-3 text-primary">
                      <PersonFill size={20} />
                    </div>
                    <div>
                      <div className="text-muted small">Full Name</div>
                      <div>{applicant.firstName} {applicant.lastName}</div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 py-2 border-0 d-flex">
                    <div className="me-3 text-primary">
                      <Envelope size={20} />
                    </div>
                    <div>
                      <div className="text-muted small">Email</div>
                      <div><a href={`mailto:${applicant.email}`} className="text-decoration-none">{applicant.email}</a></div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 py-2 border-0 d-flex">
                    <div className="me-3 text-primary">
                      <TelephoneFill size={20} />
                    </div>
                    <div>
                      <div className="text-muted small">Phone</div>
                      <div><a href={`tel:${applicant.phoneNumber}`} className="text-decoration-none">{applicant.phoneNumber}</a></div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 py-2 border-0 d-flex">
                    <div className="me-3 text-primary">
                      <GeoAltFill size={20} />
                    </div>
                    <div>
                      <div className="text-muted small">Address</div>
                      <div>{applicant.address}</div>
                    </div>
                  </ListGroup.Item>
                </ListGroup>

                {(applicant.linkedIn || applicant.portfolio) && (
                  <>
                    <h5 className="fw-bold mb-3">Professional Links</h5>
                    <ListGroup variant="flush">
                      {applicant.linkedIn && (
                        <ListGroup.Item className="px-0 py-2 border-0 d-flex">
                          <div className="me-3 text-primary">
                            <Linkedin size={20} />
                          </div>
                          <div>
                            <div className="text-muted small">LinkedIn</div>
                            <div>
                              <a 
                                href={applicant.linkedIn} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-decoration-none"
                              >
                                View Profile
                              </a>
                            </div>
                          </div>
                        </ListGroup.Item>
                      )}
                      {applicant.portfolio && (
                        <ListGroup.Item className="px-0 py-2 border-0 d-flex">
                          <div className="me-3 text-primary">
                            <Globe size={20} />
                          </div>
                          <div>
                            <div className="text-muted small">Portfolio</div>
                            <div>
                              <a 
                                href={applicant.portfolio}
                                target="_blank"
                                rel="noreferrer"
                                className="text-decoration-none"
                              >
                                View Portfolio
                              </a>
                            </div>
                          </div>
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>

          <Card className="shadow-sm border-0 rounded-3">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3">Documents</h5>
              <div className="d-grid gap-2">
                {applicant.resume && (
                  <Button
                    variant="outline-dark"
                    className="d-flex align-items-center justify-content-center text-start"
                    as="a"
                    href={`${process.env.REACT_APP_BACKEND_URL || ""}${
                      applicant.resume.path
                    }`}
                    target="_blank"
                  >
                    <FileText className="me-2" /> 
                    <div>
                      <div>Resume</div>
                      <small className="text-muted">PDF Document</small>
                    </div>
                    <div className="ms-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                        <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                      </svg>
                    </div>
                  </Button>
                )}
                {applicant.coverLetter && (
                  <Button
                    variant="outline-dark"
                    className="d-flex align-items-center justify-content-center text-start"
                    as="a"
                    href={`${process.env.REACT_APP_BACKEND_URL || ""}${
                      applicant.coverLetter.path
                    }`}
                    target="_blank"
                  >
                    <FileText className="me-2" />
                    <div>
                      <div>Cover Letter</div>
                      <small className="text-muted">PDF Document</small>
                    </div>
                    <div className="ms-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                        <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                      </svg>
                    </div>
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Main Content */}
        <Col lg={8}>
          <Card className="shadow-sm border-0 rounded-3">
            <Card.Body className="p-0">
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-0 nav-fill"
                fill
              >
                <Tab eventKey="details" title="Profile Details">
                  <div className="p-4">
                    <Row className="mb-4">
                      <Col md={6}>
                        <Card className="bg-light border-0 h-100">
                          <Card.Body className="p-4">
                            <h5 className="fw-bold mb-3 d-flex align-items-center">
                              <PersonFill className="me-2 text-primary" />
                              Personal Information
                            </h5>
                            <div className="text-muted mb-1">Full Name</div>
                            <p className="mb-3">{applicant.firstName} {applicant.lastName}</p>
                            
                            <div className="text-muted mb-1">Email</div>
                            <p className="mb-3">{applicant.email}</p>
                            
                            <div className="text-muted mb-1">Phone</div>
                            <p className="mb-3">{applicant.phoneNumber}</p>
                            
                            <div className="text-muted mb-1">Address</div>
                            <p className="mb-0">{applicant.address}</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={6}>
                        <Card className="bg-light border-0 h-100">
                          <Card.Body className="p-4">
                            <h5 className="fw-bold mb-3 d-flex align-items-center">
                              <BuildingFill className="me-2 text-primary" />
                              Application Details
                            </h5>
                            {applicant.jobId ? (
                              <>
                                <div className="text-muted mb-1">Position</div>
                                <p className="mb-3">{applicant.jobId.title}</p>
                                
                                <div className="text-muted mb-1">Department</div>
                                <p className="mb-3">{applicant.jobId.department}</p>
                                
                                <div className="text-muted mb-1">Applied On</div>
                                <p className="mb-0">{formattedDate}</p>
                              </>
                            ) : (
                              <>
                                <div className="alert alert-info mb-0">
                                  <p className="mb-0">Direct Application (No specific job)</p>
                                </div>
                              </>
                            )}
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    <div className="mt-4">
                      <Card className="bg-light border-0">
                        <Card.Body className="p-4">
                          <h5 className="fw-bold mb-3">Additional Information</h5>
                          <div className="text-muted mb-1">Message from Applicant</div>
                          <div className="p-3 bg-white rounded border">
                            {applicant.message || <em>No additional message provided</em>}
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </Tab>

                <Tab eventKey="status" title="Status & Evaluation">
                  <div className="p-4">
                    <Card className="bg-light border-0 mb-4">
                      <Card.Body className="p-4">
                        <h5 className="fw-bold mb-3">Application Status</h5>
                        <p className="text-muted mb-3">Update the applicant's current status in the recruitment process</p>
                        
                        <div className="d-flex flex-wrap gap-2">
                          {statusUpdateLoading ? (
                            <div className="d-flex align-items-center">
                              <Spinner animation="border" size="sm" className="me-2" />
                              <span>Updating status...</span>
                            </div>
                          ) : (
                            ["New", "In Review", "Shortlisted", "Interview", "Rejected"].map((status) => (
                              <Button
                                key={status}
                                variant={
                                  applicant.status === status
                                    ? getStatusColor(status)
                                    : "outline-" + getStatusColor(status)
                                }
                                onClick={() => handleStatusChange(status)}
                                className="px-4 py-2"
                              >
                                {applicant.status === status && <CheckCircle className="me-2" />}
                                {status}
                              </Button>
                            ))
                          )}
                        </div>
                      </Card.Body>
                    </Card>

                    <Card className="bg-light border-0">
                      <Card.Body className="p-4">
                        <h5 className="fw-bold mb-4">Skills Evaluation</h5>
                        
                        <div className="mb-4">
                          <div className="d-flex justify-content-between mb-2">
                            <span className="fw-medium">Technical Skills Match</span>
                            <span className="fw-bold">85%</span>
                          </div>
                          <ProgressBar 
                            now={85} 
                            variant="success" 
                            className="progress-lg" 
                            style={{ height: "12px", borderRadius: "6px" }}
                          />
                          <div className="mt-2 text-muted small">
                            Based on job requirements and resume analysis
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="d-flex justify-content-between mb-2">
                            <span className="fw-medium">Cultural Fit</span>
                            <span className="fw-bold">70%</span>
                          </div>
                          <ProgressBar 
                            now={70} 
                            variant="info" 
                            className="progress-lg" 
                            style={{ height: "12px", borderRadius: "6px" }}
                          />
                          <div className="mt-2 text-muted small">
                            Based on application materials and initial assessment
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label className="fw-medium">Evaluation Notes</Form.Label>
                              <Form.Control 
                                as="textarea" 
                                rows={4} 
                                placeholder="Add your evaluation notes here..."
                                className="border-0 shadow-sm"
                              />
                            </Form.Group>
                            <div className="text-end">
                              <Button variant="primary">
                                <PencilSquare className="me-2" />
                                Save Evaluation
                              </Button>
                            </div>
                          </Form>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </Tab>

                <Tab eventKey="assignments" title="Tasks & Assignments">
                  <div className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="fw-bold mb-0">Assignments</h5>
                      <Button
                        variant="primary"
                        onClick={() => setShowAssignmentModal(true)}
                        className="d-flex align-items-center"
                      >
                        <FileText className="me-2" /> New Assignment
                      </Button>
                    </div>

                    {assignments.length > 0 ? (
                      <div className="assignment-list">
                        {assignments.map((assignment, index) => (
                          <Card 
                            key={assignment._id} 
                            className={`border-0 shadow-sm mb-3 ${
                              assignment.status === "completed" ? "border-start border-5 border-success" : "border-start border-5 border-warning"
                            }`}
                          >
                            <Card.Body className="p-4">
                              <div className="d-flex justify-content-between align-items-start">
                                <div>
                                  <h5 className="fw-bold mb-2">{assignment.title}</h5>
                                  <p className="text-muted mb-3">{assignment.description}</p>
                                  
                                  <div className="d-flex align-items-center">
                                    <div className="me-4 d-flex align-items-center text-muted">
                                      <Clock className="me-1" />
                                      <span>
                                        {assignment.deadline
                                          ? new Date(assignment.deadline).toLocaleDateString('en-US', {
                                              year: 'numeric',
                                              month: 'short',
                                              day: 'numeric'
                                            })
                                          : "No deadline"}
                                      </span>
                                    </div>
                                    
                                    <Badge
                                      bg={assignment.status === "completed" ? "success" : "warning"}
                                      className="d-flex align-items-center"
                                    >
                                      {assignment.status === "completed" ? (
                                        <>
                                          <CheckCircleFill className="me-1" size={12} />
                                          Completed
                                        </>
                                      ) : (
                                        <>
                                          <Clock className="me-1" size={12} />
                                          Pending
                                        </>
                                      )}
                                    </Badge>
                                  </div>
                                </div>
                                
                                {assignment.status === "completed" && (
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    className="ms-auto"
                                    onClick={() =>
                                      alert(
                                        `Reviewing assignment: ${assignment.title}`
                                      )
                                    }
                                  >
                                    Review Submission
                                  </Button>
                                )}
                              </div>
                            </Card.Body>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Card className="border-0 bg-light text-center p-5">
                        <Card.Body>
                          <div className="mb-3">
                            <FileText size={48} className="text-muted" />
                          </div>
                          <h5>No Assignments Yet</h5>
                          <p className="text-muted mb-4">
                            Create your first assignment to evaluate this candidate's skills
                          </p>
                          <Button
                            variant="primary"
                            onClick={() => setShowAssignmentModal(true)}
                          >
                            <FileText className="me-2" /> Create Assignment
                          </Button>
                        </Card.Body>
                      </Card>
                    )}
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Assignment Modal */}
      <Modal
        show={showAssignmentModal}
        onHide={() => setShowAssignmentModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>Create New Assignment</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAssignmentSubmit}>
          <Modal.Body className="pt-2 pb-4">
            <p className="text-muted mb-4">
              Create a task to evaluate {applicant.firstName}'s skills and suitability for the role.
            </p>
            <Form.Group className="mb-4">
              <Form.Label className="fw-medium">Assignment Title</Form.Label>
              <Form.Control
                type="text"
                value={assignmentData.title}
                onChange={(e) =>
                  setAssignmentData({
                    ...assignmentData,
                    title: e.target.value,
                  })
                }
                placeholder="e.g., Coding Challenge, Design Task, etc."
                className="py-2"
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="fw-medium">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={assignmentData.description}
                onChange={(e) =>
                  setAssignmentData({
                    ...assignmentData,
                    description: e.target.value,
                  })
                }
                placeholder="Provide clear instructions about the assignment..."
                className="py-2"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Deadline</Form.Label>
              <Form.Control
                type="date"
                value={assignmentData.deadline}
                onChange={(e) =>
                  setAssignmentData({
                    ...assignmentData,
                    deadline: e.target.value,
                  })
                }
                className="py-2"
                required
              />
              <Form.Text className="text-muted">
                Choose a reasonable deadline to give the candidate enough time to complete the task.
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button
              variant="outline-secondary"
              onClick={() => setShowAssignmentModal(false)}
              disabled={submittingAssignment}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              disabled={submittingAssignment}
              className="d-flex align-items-center"
            >
              {submittingAssignment ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Assigning...
                </>
              ) : (
                <>
                  <CheckCircle className="me-2" /> Assign Task
                </>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

// Helper function from your existing code
const getStatusColor = (status) => {
  const colors = {
    New: "primary",
    "In Review": "warning",
    Shortlisted: "success",
    Rejected: "danger",
    Interview: "info",
  };
  return colors[status] || "secondary";
};

export default ApplicantProfile;
