import React from 'react';
import { useNavigate } from 'react-router-dom';
import image3 from "../images/img3.jpg";

const Sakila = () => {
    const navigate = useNavigate();

    const handleBookClick = () => {
        navigate('/add');
    };

    const services = [
        {
            icon: "laptop-code",
            title: "Custom Enterprise Software Development",
            description: "Tailored business solutions for automation and efficiency"
        },
        {
            icon: "globe",
            title: "Scalable Web & Mobile Applications",
            description: "High-performance, user-friendly applications for diverse industries"
        },
        {
            icon: "cloud",
            title: "Cloud Migration & Optimization",
            description: "Helping businesses transition to the cloud for improved scalability"
        },
        {
            icon: "link",
            title: "System Integration & API Development",
            description: "Seamless data flow across business applications"
        },
        {
            icon: "shield-alt",
            title: "Security & Compliance Audits",
            description: "Ensuring data protection and regulatory compliance"
        },
        {
            icon: "tachometer-alt",
            title: "Performance Optimization & Scalability",
            description: "Enhancing system performance to handle growing demands"
        }
    ];

    const industries = [
        {
            icon: "money-bill-wave",
            title: "Finance & Banking",
            description: "Secure financial applications, payment gateways, and fraud detection systems"
        },
        {
            icon: "heartbeat",
            title: "Healthcare & Telemedicine",
            description: "HIPAA-compliant platforms, electronic health records integration"
        },
        {
            icon: "shopping-cart",
            title: "E-commerce & Retail",
            description: "Scalable online marketplaces, inventory management solutions"
        },
        {
            icon: "industry",
            title: "Manufacturing & Supply Chain",
            description: "ERP solutions, logistics management applications"
        },
        {
            icon: "graduation-cap",
            title: "Education & E-learning",
            description: "Learning management systems, virtual classrooms"
        },
        {
            icon: "landmark",
            title: "Government & Public Services",
            description: "Secure, compliant, and citizen-focused digital solutions"
        }
    ];

    const skills = [
        "Enterprise Software", "Web Applications", "Mobile Development",
        "Cloud Computing", "System Architecture", "API Design",
        "Security & Compliance", "Database Management"
    ];

    const expertise = [
        "Enterprise Software Development – End-to-end development of business applications tailored to organizational needs",
        "Web Application Development – Scalable, high-performance web applications using modern frameworks (React, Angular, Vue.js)",
        "Mobile App Development – Native & cross-platform mobile apps using Flutter, React Native, Swift, Kotlin",
        "Cloud Computing & DevOps – Cloud-native development, serverless computing, AWS/GCP/Azure deployments",
        "System Architecture & API Design – Microservices architecture, RESTful & GraphQL API design",
        "Enterprise Application Integration (EAI) – Connecting legacy systems with modern applications (ERP, CRM, databases)",
        "Security & Compliance – Implementing secure coding practices, data protection, and compliance with regulations",
        "Database Management & Optimization – SQL & NoSQL databases (PostgreSQL, MySQL, MongoDB, Firebase)"
    ];

    return (
        <div className="container my-5">
            {/* Breadcrumb Navigation */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="/" className="text-decoration-none">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Sakila Athapaththu</li>
                </ol>
            </nav>

            <div className="row">
                {/* Profile Sidebar */}
                <div className="col-lg-4 mb-4">
                    <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
                        <div className="card-body text-center">
                            <div className="position-relative mb-3">
                                <img
                                    src={image3}
                                    className="rounded-circle border"
                                    alt="Sakila Athapaththu"
                                    style={{ 
                                        width: '200px', 
                                        height: '200px', 
                                        objectFit: 'cover',
                                        border: '3px solid #6610f2'
                                    }}
                                />
                                <span className="position-absolute bottom-0 end-0 bg-purple text-white rounded-circle p-2">
                                    <i className="fas fa-check"></i>
                                </span>
                            </div>
                            
                            <h2 className="h4 fw-bold">Sakila Athapaththu</h2>
                            <h3 className="h5 text-muted mb-4">Enterprise Software & Web Application Consultant</h3>
                            
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
                                    4.7/5.0
                                </span>
                            </div>
                            
                            <button 
                                className="btn btn-purple w-100 mb-4 py-2 fw-bold"
                                onClick={handleBookClick}
                                style={{ backgroundColor: '#6610f2', color: 'white' }}
                            >
                                <i className="fas fa-calendar-check me-2"></i> Book Consultation
                            </button>
                            
                            <div className="text-start">
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fas fa-map-marker-alt text-purple me-2 fs-5"></i>
                                    <span>Colombo, Sri Lanka</span>
                                </div>
                                
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fas fa-clock text-purple me-2 fs-5"></i>
                                    <span>Available: Mon-Fri, 9AM-6PM</span>
                                </div>
                                
                                <div className="d-flex align-items-center mb-4">
                                    <i className="fas fa-dollar-sign text-purple me-2 fs-5"></i>
                                    <span>Starting from $120/hour</span>
                                </div>
                                
                                <h4 className="h5 fw-bold mb-3">
                                    <i className="fas fa-briefcase me-2 text-purple"></i>
                                    Professional Background
                                </h4>
                                <ul className="list-unstyled ps-3">
                                    <li className="mb-2 d-flex">
                                        <i className="fas fa-circle text-purple me-2 mt-1" style={{ fontSize: '6px' }}></i>
                                        Software & Technical Engineer | Skill Labs(Team)
                                    </li>
                                    <li className="mb-2 d-flex">
                                        <i className="fas fa-circle text-purple me-2 mt-1" style={{ fontSize: '6px' }}></i>
                                        Trainee Full Stack Engineer
                                    </li>
                                    <li className="mb-3 d-flex">
                                        <i className="fas fa-circle text-purple me-2 mt-1" style={{ fontSize: '6px' }}></i>
                                        Researcher
                                    </li>
                                </ul>
                                
                                <h4 className="h5 fw-bold mb-3">
                                    <i className="fas fa-tools me-2 text-purple"></i>
                                    Key Skills
                                </h4>
                                <div className="d-flex flex-wrap gap-2 mb-4">
                                    {skills.map((skill, index) => (
                                        <span key={index} className="badge bg-light text-dark border">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                
                                <div className="social-links d-flex justify-content-center gap-3 mb-3">
                                    <a href="#" className="text-purple">
                                        <i className="fab fa-linkedin fa-lg"></i>
                                    </a>
                                    <a href="#" className="text-purple">
                                        <i className="fab fa-github fa-lg"></i>
                                    </a>
                                    <a href="#" className="text-purple">
                                        <i className="fas fa-globe fa-lg"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Main Content */}
                <div className="col-lg-8">
                    {/* Profile Summary */}
                    <div className="card shadow-sm mb-4 border-purple">
                        <div className="card-header bg-purple text-white" style={{ backgroundColor: '#6610f2' }}>
                            <h2 className="h4 mb-0">
                                <i className="fas fa-user-tie me-2"></i>
                                Profile Summary
                            </h2>
                        </div>
                        <div className="card-body">
                            <p className="lead fst-italic">
                                "I build scalable, high-performance enterprise solutions that drive digital transformation."
                            </p>
                            <p>
                                As an Enterprise Software & Web Application Consultant, I specialize in designing and implementing robust business applications that optimize operations and enhance efficiency. My expertise spans custom software development, cloud-native solutions, system architecture, and enterprise application integration.
                            </p>
                            <p>
                                With hands-on experience in both web and mobile application development, I guide businesses in selecting the right technologies, building secure and scalable solutions, and ensuring seamless integration between enterprise systems. My approach focuses on delivering cost-effective, efficient, and user-centric solutions that align precisely with business objectives.
                            </p>
                            <div className="achievements mt-4 p-3 bg-light rounded">
                                <h5 className="h6 fw-bold mb-3">
                                    <i className="fas fa-trophy text-warning me-2"></i>
                                    Notable Achievements
                                </h5>
                                <ul className="mb-0">
                                    <li>Developed 20+ enterprise applications for clients across industries</li>
                                    <li>Migrated 15+ legacy systems to modern cloud platforms</li>
                                    <li>Improved system performance by 50-70% for enterprise clients</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    {/* Expertise Section */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-white">
                            <h2 className="h4 mb-0">
                                <i className="fas fa-lightbulb text-warning me-2"></i>
                                Key Skills & Expertise
                            </h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {expertise.map((item, index) => (
                                    <div key={index} className="col-md-6 mb-3">
                                        <div className="d-flex">
                                            <div className="me-3 text-purple">
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
                                <i className="fas fa-concierge-bell text-purple me-2"></i>
                                Consulting Services
                            </h2>
                        </div>
                        <div className="card-body">
                            <div className="row g-3">
                                {services.map((service, index) => (
                                    <div key={index} className="col-md-6">
                                        <div className="card h-100 border-0 shadow-sm-hover">
                                            <div className="card-body">
                                                <div className="d-flex align-items-start">
                                                    <div className="bg-purple bg-opacity-10 p-2 rounded me-3">
                                                        <i className={`fas fa-${service.icon} text-purple`}></i>
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
                                Industries Served
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
                                Client Testimonials
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
                                                "Sakila transformed our legacy inventory system into a modern cloud-based solution that reduced processing time by 65%. Her expertise in enterprise architecture was invaluable."
                                            </p>
                                            <div className="d-flex align-items-center">
                                                <div className="me-3">
                                                    <div className="bg-purple rounded-circle" style={{ width: '40px', height: '40px' }}></div>
                                                </div>
                                                <div>
                                                    <h6 className="mb-0 fw-bold">David Wilson</h6>
                                                    <small className="text-muted">CIO, RetailChain Inc.</small>
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
                                                "The healthcare platform Sakila developed for us not only met all HIPAA requirements but also improved patient data accessibility by 80%. Highly recommended for complex enterprise projects."
                                            </p>
                                            <div className="d-flex align-items-center">
                                                <div className="me-3">
                                                    <div className="bg-purple rounded-circle" style={{ width: '40px', height: '40px' }}></div>
                                                </div>
                                                <div>
                                                    <h6 className="mb-0 fw-bold">Dr. Emily Rodriguez</h6>
                                                    <small className="text-muted">Medical Director, HealthPlus</small>
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

export default Sakila;