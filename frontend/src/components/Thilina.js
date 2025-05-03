import React from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from "../images/img1.jpg";

const Thilina = () => {
    const navigate = useNavigate();

    const handleBookClick = () => {
        navigate('/add');
    };

    const services = [
        {
            icon: "rocket",
            title: "MVP Development & Rapid Prototyping",
            description: "Bringing ideas to life with lean product development approaches"
        },
        {
            icon: "chart-line",
            title: "Scalable Software Solutions",
            description: "Ensuring your product grows with increasing users and demand"
        },
        {
            icon: "cogs",
            title: "Tech Stack Advisory & Architecture Planning",
            description: "Selecting the best technologies for long-term success"
        },
        {
            icon: "palette",
            title: "UI/UX & Customer Experience Strategy",
            description: "Designing user-friendly and high-converting interfaces"
        },
        {
            icon: "bolt",
            title: "Performance & Security Optimization",
            description: "Enhancing app speed, efficiency, and data security"
        },
        {
            icon: "handshake",
            title: "Investor Pitch & Go-to-Market Strategy",
            description: "Assisting in pitch deck creation, funding strategies, and market entry"
        }
    ];

    const industries = [
        {
            icon: "laptop-code",
            title: "Tech Startups & SaaS Platforms",
            description: "Web & mobile applications, SaaS solutions, and cloud-based platforms"
        },
        {
            icon: "shopping-cart",
            title: "E-commerce & Marketplaces",
            description: "Scalable online stores, multi-vendor platforms, and payment integration"
        },
        {
            icon: "coins",
            title: "Fintech & Banking",
            description: "Secure digital payment systems, trading platforms, and AI-driven finance solutions"
        },
        {
            icon: "heartbeat",
            title: "Healthcare & Telemedicine",
            description: "HIPAA-compliant apps, remote health monitoring, and AI-powered diagnostics"
        },
        {
            icon: "graduation-cap",
            title: "EdTech & E-learning",
            description: "Learning management systems (LMS), virtual classrooms, and interactive educational platforms"
        },
        {
            icon: "robot",
            title: "AI & Automation Startups",
            description: "AI-powered applications, automation tools, and data-driven decision-making systems"
        }
    ];

    const skills = [
        "MVP Development", "Software Scalability", "Performance Optimization",
        "UI/UX Design", "Tech Stack Selection", "Cloud & DevOps",
        "Agile Development", "Growth Strategies"
    ];

    const expertise = [
        "MVP Development & Prototyping – Rapid development of Minimum Viable Products (MVPs) for validation and market testing",
        "Software Architecture & Scalability – Designing robust and scalable architectures to support business growth",
        "Performance Optimization – Improving application efficiency, load times, and server performance",
        "Tech Stack Selection – Choosing the right front-end, back-end, database, and cloud technologies for optimal development",
        "UI/UX Design & Product Strategy – Creating intuitive and user-friendly interfaces for better engagement",
        "Cloud & DevOps Integration – Optimizing deployment pipelines, CI/CD automation, and cloud scalability",
        "Agile Development & Project Management – Implementing Agile/Scrum methodologies for iterative and fast-paced development",
        "Monetization & Growth Strategies – Helping startups define pricing models, revenue streams, and growth hacking strategies"
    ];

    return (
        <div className="container my-5">
            {/* Breadcrumb Navigation */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="/" className="text-decoration-none">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">THILINA SANDAMAL</li>
                </ol>
            </nav>

            <div className="row">
                {/* Profile Sidebar */}
                <div className="col-lg-4 mb-4">
                    <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
                        <div className="card-body text-center">
                            <div className="position-relative mb-3">
                                <img
                                    src={image1}
                                    className="rounded-circle border"
                                    alt="THILINA SANDAMAL"
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
                            
                            <h2 className="h4 fw-bold">THILINA SANDAMAL</h2>
                            <h3 className="h5 text-muted mb-4">Startup & Product Development Consultant</h3>
                            
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
                                    4.8/5.0
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
                                    <span>Starting from $99/hour</span>
                                </div>
                                
                                <h4 className="h5 fw-bold mb-3">
                                    <i className="fas fa-briefcase me-2 text-primary"></i>
                                    Professional Background
                                </h4>
                                <ul className="list-unstyled ps-3">
                                    <li className="mb-2 d-flex">
                                        <i className="fas fa-circle text-primary me-2 mt-1" style={{ fontSize: '6px' }}></i>
                                        EXECUTIVE TEAM LEAD | Skill Labs(Team)
                                    </li>
                                    <li className="mb-2 d-flex">
                                        <i className="fas fa-circle text-primary me-2 mt-1" style={{ fontSize: '6px' }}></i>
                                        Marketing Manager | Tachyon(Pvt)
                                    </li>
                                    <li className="mb-3 d-flex">
                                        <i className="fas fa-circle text-primary me-2 mt-1" style={{ fontSize: '6px' }}></i>
                                        Trainee AI/ML Engineer
                                    </li>
                                </ul>
                                
                                <h4 className="h5 fw-bold mb-3">
                                    <i className="fas fa-tools me-2 text-primary"></i>
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
                                    <a href="#" className="text-primary">
                                        <i className="fab fa-linkedin fa-lg"></i>
                                    </a>
                                    <a href="#" className="text-primary">
                                        <i className="fab fa-twitter fa-lg"></i>
                                    </a>
                                    <a href="#" className="text-primary">
                                        <i className="fab fa-github fa-lg"></i>
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
                                <i className="fas fa-user-tie me-2"></i>
                                Profile Summary
                            </h2>
                        </div>
                        <div className="card-body">
                            <p className="lead fst-italic">
                                "I help startups and businesses turn ideas into scalable, market-ready products."
                            </p>
                            <p>
                                As a Startup & Product Development Consultant, I specialize in transforming concepts into viable digital products. With expertise spanning MVP development, software architecture, UI/UX design, and performance optimization, I guide startups through the entire product lifecycle.
                            </p>
                            <p>
                                My approach focuses on selecting optimal technology stacks, streamlining development processes, and ensuring scalability while maintaining quality. I'm passionate about empowering entrepreneurs with robust, user-friendly solutions that align with their vision and drive business growth.
                            </p>
                            <div className="achievements mt-4 p-3 bg-light rounded">
                                <h5 className="h6 fw-bold mb-3">
                                    <i className="fas fa-trophy text-warning me-2"></i>
                                    Notable Achievements
                                </h5>
                                <ul className="mb-0">
                                    <li>Helped 50+ startups launch successful MVPs</li>
                                    <li>Increased product scalability for 30+ businesses</li>
                                    <li>Improved application performance by 40-60% for clients</li>
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
                                                "Thilina transformed our startup's vision into a market-ready product in just 3 months. His expertise in MVP development was invaluable."
                                            </p>
                                            <div className="d-flex align-items-center">
                                                <div className="me-3">
                                                    <div className="bg-primary rounded-circle" style={{ width: '40px', height: '40px' }}></div>
                                                </div>
                                                <div>
                                                    <h6 className="mb-0 fw-bold">Sarah Johnson</h6>
                                                    <small className="text-muted">CEO, TechStart Inc.</small>
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
                                                "The architectural guidance we received helped us scale our platform to handle 10x more users without performance issues."
                                            </p>
                                            <div className="d-flex align-items-center">
                                                <div className="me-3">
                                                    <div className="bg-primary rounded-circle" style={{ width: '40px', height: '40px' }}></div>
                                                </div>
                                                <div>
                                                    <h6 className="mb-0 fw-bold">Michael Chen</h6>
                                                    <small className="text-muted">CTO, ScaleFast</small>
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

export default Thilina;