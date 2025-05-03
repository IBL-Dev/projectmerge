import React from 'react';
import { useNavigate } from 'react-router-dom';
import image3 from "../images/img4.jpg";

const Praveen = () => {
    const navigate = useNavigate();

    const handleBookClick = () => {
        navigate('/add');
    };

    const services = [
        {
            icon: "project-diagram",
            title: "IoT System Architecture & Design",
            description: "Defining hardware & software requirements for connected solutions"
        },
        {
            icon: "microchip",
            title: "Firmware Development & Optimization",
            description: "Writing efficient, low-power firmware for embedded devices"
        },
        {
            icon: "brain",
            title: "Edge AI & Real-time Processing",
            description: "Implementing AI-powered decision-making at the edge"
        },
        {
            icon: "wifi",
            title: "IoT Device Connectivity & Protocols",
            description: "Selecting and implementing the right communication protocols"
        },
        {
            icon: "link",
            title: "Enterprise IoT Integration",
            description: "Connecting IoT devices with business applications and cloud"
        },
        {
            icon: "lock",
            title: "IoT Security Audits & Compliance",
            description: "Ensuring data integrity and protection against cyber threats"
        }
    ];

    const industries = [
        {
            icon: "city",
            title: "Smart Cities & Infrastructure",
            description: "IoT-powered traffic management, smart lighting, and monitoring"
        },
        {
            icon: "heartbeat",
            title: "Healthcare & Medical Devices",
            description: "Wearable health monitors and smart medical devices"
        },
        {
            icon: "industry",
            title: "Industrial IoT (IIoT) & Manufacturing",
            description: "Predictive maintenance, automation, and asset tracking"
        },
        {
            icon: "tractor",
            title: "Agriculture & Precision Farming",
            description: "Climate monitoring, automated irrigation, and smart greenhouses"
        },
        {
            icon: "home",
            title: "Smart Homes & Buildings",
            description: "Home automation, energy management, and security systems"
        },
        {
            icon: "car",
            title: "Automotive & Transportation",
            description: "Connected vehicles, fleet management, and smart logistics"
        }
    ];

    const skills = [
        "IoT Architecture", "Embedded Firmware", "Edge Computing", 
        "Wireless Protocols", "Cloud IoT Platforms", "IoT Security",
        "Real-time Systems", "Predictive Analytics"
    ];

    const expertise = [
        "IoT Architecture & System Design – Planning and implementing scalable, secure IoT infrastructures",
        "Embedded Firmware Development – Programming microcontrollers (ARM, ESP32, STM32, Arduino, Raspberry Pi)",
        "Edge Computing Solutions – Optimizing data processing at the edge for reduced latency",
        "Wireless Communication Protocols – Expertise in LoRa, MQTT, Zigbee, BLE, Wi-Fi, and 5G",
        "Cloud & IoT Platforms – Integration with AWS IoT, Google Cloud IoT, Microsoft Azure IoT Hub",
        "IoT Security & Data Privacy – Implementing encryption and secure authentication",
        "Predictive Analytics & AI for IoT – Machine learning for predictive maintenance and automation",
        "Smart Device Integration – Enabling communication between IoT devices and enterprise systems"
    ];

    return (
        <div className="container my-5">
            {/* Breadcrumb Navigation */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="/" className="text-decoration-none">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Praveen Liyanage</li>
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
                                    alt="Praveen Liyanage"
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
                            
                            <h2 className="h4 fw-bold">Praveen Liyanage</h2>
                            <h3 className="h5 text-muted mb-4">IoT & Embedded Systems Consultant</h3>
                            
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
                                    <span>Starting from $89/hour</span>
                                </div>
                                
                                <h4 className="h5 fw-bold mb-3">
                                    <i className="fas fa-briefcase me-2 text-primary"></i>
                                    Professional Background
                                </h4>
                                <ul className="list-unstyled ps-3">
                                    <li className="mb-2 d-flex">
                                        <i className="fas fa-circle text-primary me-2 mt-1" style={{ fontSize: '6px' }}></i>
                                        IoT & Embedded System Developer | Skill Labs(Team)
                                    </li>
                                    <li className="mb-2 d-flex">
                                        <i className="fas fa-circle text-primary me-2 mt-1" style={{ fontSize: '6px' }}></i>
                                        Trainee AI/ML Engineer
                                    </li>
                                    <li className="mb-3 d-flex">
                                        <i className="fas fa-circle text-primary me-2 mt-1" style={{ fontSize: '6px' }}></i>
                                        Researcher
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
                                        <i className="fab fa-github fa-lg"></i>
                                    </a>
                                    <a href="#" className="text-primary">
                                        <i className="fab fa-researchgate fa-lg"></i>
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
                                <i className="fas fa-microchip me-2"></i>
                                Profile Summary
                            </h2>
                        </div>
                        <div className="card-body">
                            <p className="lead fst-italic">
                                "I design and implement intelligent, connected solutions that transform businesses."
                            </p>
                            <p>
                                As an IoT & Embedded Systems Consultant, I specialize in creating cutting-edge connected solutions that bridge the physical and digital worlds. My expertise spans IoT architecture, embedded firmware development, edge computing, and smart device integration, enabling businesses to leverage the power of connected technologies.
                            </p>
                            <p>
                                From sensor networks to real-time embedded systems, I provide end-to-end IoT solutions that encompass hardware-software integration, data processing, and cloud connectivity. My approach ensures businesses achieve operational efficiency, predictive capabilities, and automation while maintaining robust security and scalability.
                            </p>
                            <div className="achievements mt-4 p-3 bg-light rounded">
                                <h5 className="h6 fw-bold mb-3">
                                    <i className="fas fa-trophy text-warning me-2"></i>
                                    Notable Achievements
                                </h5>
                                <ul className="mb-0">
                                    <li>Designed 20+ commercial IoT solutions across industries</li>
                                    <li>Optimized firmware reducing power consumption by 35% in embedded devices</li>
                                    <li>Implemented edge AI solutions reducing cloud data transfer by 60%</li>
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
                                                "Praveen's IoT architecture transformed our manufacturing process, reducing downtime by 40% through predictive maintenance."
                                            </p>
                                            <div className="d-flex align-items-center">
                                                <div className="me-3">
                                                    <div className="bg-primary rounded-circle" style={{ width: '40px', height: '40px' }}></div>
                                                </div>
                                                <div>
                                                    <h6 className="mb-0 fw-bold">David Wilson</h6>
                                                    <small className="text-muted">Operations Director, IndusTech</small>
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
                                                "The edge computing solution Praveen implemented reduced our data transfer costs by 60% while improving response times."
                                            </p>
                                            <div className="d-flex align-items-center">
                                                <div className="me-3">
                                                    <div className="bg-primary rounded-circle" style={{ width: '40px', height: '40px' }}></div>
                                                </div>
                                                <div>
                                                    <h6 className="mb-0 fw-bold">Emma Rodriguez</h6>
                                                    <small className="text-muted">CTO, SmartAgro</small>
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

export default Praveen;