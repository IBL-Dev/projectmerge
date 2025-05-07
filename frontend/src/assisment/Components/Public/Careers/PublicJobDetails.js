import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
  ListGroup,
  Badge,
} from "react-bootstrap";

function PublicJobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5002/jobs/${id}`);
      setJob(response.data.job);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch job details");
      setLoading(false);
    }
  };

  const handleApply = () => {
    navigate(`/apply/${id}`);
  };

  if (loading)
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );

  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  if (!job)
    return (
      <Container className="mt-5">
        <Alert variant="warning">Job not found</Alert>
      </Container>
    );

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <Row className="align-items-center mb-4">
            <Col md={8}>
              <h1 className="mb-3">{job.title}</h1>
              <Badge bg="primary" className="me-2 mb-2">
                {job.department}
              </Badge>
              <Badge bg="secondary" className="me-2 mb-2">
                {job.location}
              </Badge>
              <Badge bg="light" text="dark" className="me-2 mb-2">
                {job.jobType}
              </Badge>
            </Col>
            <Col md={4} className="text-md-end">
              <Button
                variant="primary"
                size="lg"
                onClick={handleApply}
                className="px-4"
              >
                Apply Now
              </Button>
            </Col>
          </Row>

          <Row className="g-3 mb-4">
            <Col md={4}>
              <div className="p-3 bg-light rounded">
                <h6 className="text-muted mb-2">Experience</h6>
                <p className="mb-0">{`${job.experience.min}-${job.experience.max} ${job.experience.unit}`}</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-3 bg-light rounded">
                <h6 className="text-muted mb-2">Salary Range</h6>
                <p className="mb-0">{`${job.salary.currency} ${job.salary.min}-${job.salary.max}`}</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-3 bg-light rounded">
                <h6 className="text-muted mb-2">Application Deadline</h6>
                <p className="mb-0">
                  {new Date(job.deadline).toLocaleDateString()}
                </p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <h2 className="h4 mb-4">Job Description</h2>
          <p className="mb-0">{job.description}</p>
        </Card.Body>
      </Card>

      <Row className="g-4 mb-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">Requirements</h2>
              <ListGroup variant="flush">
                {job.requirements.map((req, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                    {req}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">Responsibilities</h2>
              <ListGroup variant="flush">
                {job.responsibilities.map((resp, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                    {resp}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="d-flex justify-content-between mt-5">
        <Button
          variant="outline-primary"
          onClick={() => navigate("/")}
          className="px-4"
        >
          Back to Jobs
        </Button>
        <Button variant="primary" onClick={handleApply} className="px-4">
          Apply Now
        </Button>
      </div>
    </Container>
  );
}

export default PublicJobDetail;
