import React from 'react';
import { useNavigate } from 'react-router-dom';
import image2 from "../images/img2.jpg";

const Thamindu = () => {
    const navigate = useNavigate();

    const handleBookClick = () => {
        navigate('/add');
    };

    const services = [
        {
            icon: "robot",
            title: "AI Strategy & Roadmap Development",
            description: "Helping businesses define and implement AI-driven strategies"
        },
        {
            icon: "brain",
            title: "AI Model Development & Optimization",
            description: "Building and improving machine learning models for accuracy & efficiency"
        },
        {
            icon: "cogs",
            title: "Custom AI Solutions",
            description: "Tailored AI implementations for automation, fraud detection, and more"
        },
        {
            icon: "database",
            title: "Data Processing & Insights",
            description: "Extracting valuable business insights from structured & unstructured data"
        },
        {
            icon: "server",
            title: "AI Infrastructure & Deployment",
            description: "Setting up scalable AI architectures and cloud-based AI solutions"
        },
        {
            icon: "chart-network",
            title: "Explainable AI Implementation",
            description: "Ensuring AI transparency, fairness, and compliance with standards"
        }
    ];

    const industries = [
        {
            icon: "heartbeat",
            title: "Healthcare AI",
            description: "AI-driven diagnostics, medical imaging, predictive patient analytics"
        },
        {
            icon: "money-bill-wave",
            title: "Financial Services",
            description: "Fraud detection, risk modeling, algorithmic trading"
        },
        {
            icon: "shopping-bag",
            title: "Retail & E-commerce",
            description: "Recommendation engines, customer behavior analysis"
        },
        {
            icon: "car",
            title: "Automotive & IoT",
            description: "Autonomous systems, AI-powered IoT applications"
        },
        {
            icon: "bullhorn",
            title: "Marketing Technology",
            description: "Chatbots, AI-powered personalization, ad targeting"
        },
        {
            icon: "industry",
            title: "Manufacturing",
            description: "Predictive maintenance, quality control, supply chain optimization"
        }
    ];

    const skills = [
        "Machine Learning", "Deep Learning", "Computer Vision",
        "Natural Language Processing", "AI Automation", "Data Science",
        "MLOps", "Big Data", "Cloud AI"
    ];

    const expertise = [
        "Machine Learning & Deep Learning – Model training, fine-tuning, and deployment using TensorFlow, PyTorch, Scikit-Learn",
        "Computer Vision – Image classification, object detection, automated image recognition (OpenCV, YOLO, FastAPI)",
        "Natural Language Processing (NLP) – Text analysis, chatbots, sentiment analysis, LLM fine-tuning (Transformers, OpenAI, Hugging Face)",
        "AI-driven Automation – AI-powered process automation, recommendation systems, RPA integration",
        "Data Science & Analytics – Data engineering, feature engineering, predictive analytics, business intelligence",
        "AI Model Deployment & MLOps – Model deployment on AWS, GCP, Azure; CI/CD for ML models; API integration",
        "Big Data & Cloud AI – Scalable AI solutions using Spark, Hadoop, and cloud AI services",
        "Explainable AI (XAI) & Ethical AI – Ensuring AI transparency, fairness, and compliance with industry standards"
    ];

    return (
        <div className="container my-5">
            {/* Breadcrumb Navigation */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="/" className="text-decoration-none">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Thamindu Sulakshana</li>
                </ol>
            </nav>

            <div className="row">
                {/* Profile Sidebar */}
                <div className="col-lg-4 mb-4">
                    <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
                        <div className="card-body text-center">
                            <div className="position-relative mb-3">
                                <img
                                    src={image2}
                                    className="rounded-circle border"
                                    alt="Thamindu Sulakshana"
                                    style={{ 
                                        width: '200px', 
                                        height: '200px', 
                                        objectFit: 'cover',
                                        border: '3px solid #0d6efd'
                                    }}
                                />
                                <span className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2">
                                    <i className="fas fa-check"></i>
                                </span>
                            </div>
                            
                            <h2 className="h4 fw-bold">Thamindu Sulakshana</h2>
                            <h3 className="h5 text-muted mb-4">AI & Machine Learning Consultant</h3>
                            
                            <div className="d-flex justify-content-center align-items-center mb-4">
                                <div className="rating-stars me-2">
                                    {[...Array(5)].map((_, i) => (
                                        <i 
                                            key={i} 
                                            className={`fas fa-star ${i < 4 ? 'text-warning' : 'text-secondary'}`}
                                        ></i>
                                    ))}
                                </div>
                                <span className="badge bg-warning text-dark fs-6">
                                    4.9/5.0
                                </span>
                            </div>
                            
                            <button 
                                className="btn btn-primary w-100 mb-4 py-2 fw-bold"
                                onClick={handleBookClick}
                            >
                                <i className="fas fa-calendar-check me-2"></i> Book Consultation
                            </button>
                            
                            <div className="text-start">
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fas fa-map-marker-alt text-primary me-2 fs-5"></i>
                                    <span>Colombo, Sri Lanka</span>
                                </div>
                                
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fas fa-clock text-primary me-2 fs-5"></i>
                                    <span>Available: Mon-Fri, 9AM-5PM</span>
                                </div>
                                
                                <div className="d-flex align-items-center mb-4">
                                    <i className="fas fa-dollar-sign text-primary me-2 fs-5"></i>
                                    <span>Starting from $120/hour</span>
                                </div>
                                
                                <h4 className="h5 fw-bold mb-3">
                                    <i className="fas fa-briefcase me-2 text-primary"></i>
                                    Professional Background
                                </h4>
                                <ul className="list-unstyled ps-3">
                                    <li className="mb-2 d-flex">
                                        <i className="fas fa-circle text-primary me-2 mt-1" style={{ fontSize: '6px' }}></i>
                                        AI/ML Engineer | Skill Labs(Team)
                                    </li>
                                    <li className="mb-2 d-flex">
                                        <i className="fas fa-circle text-primary me-2 mt-1" style={{ fontSize: '6px' }}></i>
                                        Managing Officer | Skill Labs(Team)
                                    </li>
                                    <li className="mb-3 d-flex">
                                        <i className="fas fa-circle text-primary me-2 mt-1" style={{ fontSize: '6px' }}></i>
                                        Researcher in AI & Machine Learning
                                    </li>
                                </ul>
                                
                                <h4 className="h5 fw-bold mb-3">
                                    <i className="fas fa-tools me-2 text-primary"></i>
                                    Technical Skills
                                </h4>
                                <div className="d-flex flex-wrap gap-2 mb-4">
                                    {skills.map((skill, index) => (
                                        <span key={index} className="badge bg-light text-dark border">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                
                                <div className="social-links d-flex justify-content-center gap-3 mb-3">
                                    <a href="#" className="text-primary">
                                        <i className="fab fa-linkedin fa-lg"></i>
                                    </a>
                                    <a href="#" className="text-primary">
                                        <i className="fab fa-github fa-lg"></i>
                                    </a>
                                    <a href="#" className="text-primary">
                                        <i className="fab fa-kaggle fa-lg"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Main Content */}
                <div className="col-lg-8">
                    {/* Profile Summary */}
                    <div className="card shadow-sm mb-4 border-primary">
                        <div className="card-header bg-primary text-white">
                            <h2 className="h4 mb-0">
                                <i className="fas fa-robot me-2"></i>
                                Profile Summary
                            </h2>
                        </div>
                        <div className="card-body">
                            <p className="lead fst-italic">
                                "I transform businesses through artificial intelligence and machine learning solutions."
                            </p>
                            <p>
                                As an AI & Machine Learning Consultant, I specialize in designing and deploying AI-powered solutions that drive business efficiency and innovation. With expertise in machine learning, deep learning, natural language processing, and computer vision, I help organizations integrate AI into their workflows to optimize decision-making and automate processes.
                            </p>
                            <p>
                                My approach focuses on developing scalable, accurate AI models that deliver real business value. From data collection to model deployment and monitoring, I ensure AI solutions are tailored to each client's specific needs while maintaining ethical standards and explainability.
                            </p>
                            <div className="achievements mt-4 p-3 bg-light rounded">
                                <h5 className="h6 fw-bold mb-3">
                                    <i className="fas fa-trophy text-warning me-2"></i>
                                    Notable Achievements
                                </h5>
                                <ul className="mb-0">
                                    <li>Developed AI models with 95%+ accuracy for Fortune 500 companies</li>
                                    <li>Implemented automation solutions saving clients $2M+ annually</li>
                                    <li>Published research in top-tier AI/ML conferences</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    {/* Expertise Section */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-white">
                            <h2 className="h4 mb-0">
                                <i className="fas fa-microchip text-warning me-2"></i>
                                Technical Expertise
                            </h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {expertise.map((item, index) => (
                                    <div key={index} className="col-md-6 mb-3">
                                        <div className="d-flex">
                                            <div className="me-3 text-primary">
                                                <i className="fas fa-check-circle mt-1"></i>
                                            </div>
                                            <div>
                                                <h5 className="h6 fw-bold mb-1">
                                                    {item.split('–')[0].trim()}
                                                </h5>
                                                <p className="mb-0 small">
                                                    {item.split('–')[1].trim()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Services Section */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-white">
                            <h2 className="h4 mb-0">
                                <i className="fas fa-concierge-bell text-primary me-2"></i>
                                AI Consulting Services
                            </h2>
                        </div>
                        <div className="card-body">
                            <div className="row g-3">
                                {services.map((service, index) => (
                                    <div key={index} className="col-md-6">
                                        <div className="card h-100 border-0 shadow-sm-hover">
                                            <div className="card-body">
                                                <div className="d-flex align-items-start">
                                                    <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                                                        <i className={`fas fa-${service.icon} text-primary`}></i>
                                                    </div>
                                                    <div>
                                                        <h5 className="h6 fw-bold mb-2">{service.title}</h5>
                                                        <p className="small mb-0">{service.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Industries Section */}
                    <div className="card shadow-sm">
                        <div className="card-header bg-white">
                            <h2 className="h4 mb-0">
                                <i className="fas fa-industry text-info me-2"></i>
                                Industries Transformed
                            </h2>
                        </div>
                        <div className="card-body">
                            <div className="row g-3">
                                {industries.map((industry, index) => (
                                    <div key={index} className="col-md-6">
                                        <div className="card h-100 border-0 shadow-sm-hover">
                                            <div className="card-body">
                                                <div className="d-flex align-items-start">
                                                    <div className="bg-info bg-opacity-10 p-2 rounded me-3">
                                                        <i className={`fas fa-${industry.icon} text-info`}></i>
                                                    </div>
                                                    <div>
                                                        <h5 className="h6 fw-bold mb-2">{industry.title}</h5>
                                                        <p className="small mb-0">{industry.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Testimonials Section */}
                    <div className="card shadow-sm mt-4">
                        <div className="card-header bg-white">
                            <h2 className="h4 mb-0">
                                <i className="fas fa-quote-left text-secondary me-2"></i>
                                Client Success Stories
                            </h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="card h-100 border-0 bg-light">
                                        <div className="card-body">
                                            <div className="mb-3">
                                                {[...Array(5)].map((_, i) => (
                                                    <i key={i} className="fas fa-star text-warning me-1"></i>
                                                ))}
                                            </div>
                                            <p className="fst-italic mb-3">
                                                "Thamindu's fraud detection model reduced our false positives by 75% while catching 30% more fraudulent transactions. Game-changing for our fintech platform."
                                            </p>
                                            <div className="d-flex align-items-center">
                                                <div className="me-3">
                                                    <div className="bg-primary rounded-circle" style={{ width: '40px', height: '40px' }}></div>
                                                </div>
                                                <div>
                                                    <h6 className="mb-0 fw-bold">David Rodriguez</h6>
                                                    <small className="text-muted">CFO, PaySecure</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="card h-100 border-0 bg-light">
                                        <div className="card-body">
                                            <div className="mb-3">
                                                {[...Array(5)].map((_, i) => (
                                                    <i key={i} className="fas fa-star text-warning me-1"></i>
                                                ))}
                                            </div>
                                            <p className="fst-italic mb-3">
                                                "The computer vision system Thamindu implemented automated 90% of our quality control process with 99.8% accuracy. Unprecedented in our industry."
                                            </p>
                                            <div className="d-flex align-items-center">
                                                <div className="me-3">
                                                    <div className="bg-primary rounded-circle" style={{ width: '40px', height: '40px' }}></div>
                                                </div>
                                                <div>
                                                    <h6 className="mb-0 fw-bold">Lisa Wang</h6>
                                                    <small className="text-muted">COO, Precision Manufacturing</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Thamindu;