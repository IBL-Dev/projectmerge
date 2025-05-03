import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from "../images/img1.jpg";
import image2 from "../images/img2.jpg";
import image3 from "../images/img3.jpg";
import image4 from "../images/img4.jpg";  // Ensure this is a different image if possible


const Home = () => {
    const navigate = useNavigate();
    const [hoveredConsultant, setHoveredConsultant] = useState(null);

    const handleBookClick = () => {
        navigate('/add');
    };

    const handleConsultantClick = (consultantId) => {
        // Navigate to the corresponding consultant page based on ID
        switch(consultantId) {
            case 1:
                navigate('/thilina');
                break;
            case 2:
                navigate('/thamindu');
                break;
            case 3:
                navigate('/sakila');
                break;
            case 4:
                navigate('/praveen');
                break;
            default:
                break;
        }
    };

    const consultants = [
        {
            id: 1,
            name: "THILINA SANDAMAL",
            specialization: "Startup & Product Development Consultant",
            image: image1,
            expertise: ["Business Strategy", "Product Development", "Market Research"],
            rating: 4.8
        },
        {
            id: 2,
            name: "Thamindu Sulakshana",
            specialization: "AI & Machine Learning Consultant",
            image: image2,
            expertise: ["Machine Learning", "Deep Learning", "Computer Vision"],
            rating: 4.9
        },
        {
            id: 3,
            name: "Sakila Athapaththu",
            specialization: "Enterprise Software & Web Application Consultant",
            image: image3,
            expertise: ["Web Development", "Enterprise Solutions", "Cloud Computing"],
            rating: 4.7
        },
        {
            id: 4,
            name: "Praveen Liyanage",
            specialization: "IoT & Embedded Systems Consultant",
            image: image4,
            expertise: ["Embedded Systems", "IoT Solutions", "Hardware Design"],
            rating: 4.6
        }
    ];

    const features = [
        {
            icon: "clock",
            title: "Flexible Scheduling",
            description: "Book consultations at your convenience with our flexible scheduling system."
        },
        {
            icon: "user-tie",
            title: "Expert Advice",
            description: "Get guidance from industry professionals with years of experience."
        },
        {
            icon: "headset",
            title: "Dedicated Support",
            description: "Our team is here to help you with any questions or concerns."
        }
    ];

    return (
        <div className="container-fluid px-0">
            {/* Hero Section with Gradient Background */}
            <div className="hero-section text-center text-white position-relative overflow-hidden p-5 bg-primary">
                <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100 bg-gradient"></div>
                <div className="position-relative z-1">
                    <h1 className="display-4 fw-bold mb-3">Expert Consultation Services</h1>
                    <p className="lead mb-4 px-md-5">
                        Connect with our industry experts to get professional advice and guidance for your projects.
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                        <button 
                            className="btn btn-light btn-lg px-4 shadow-sm" 
                            onClick={handleBookClick}
                        >
                            Book a Consultation
                        </button>
                       
                    </div>
                </div>
            </div>

            {/* Consultants Grid */}
            <div className="container my-5">
                <h2 className="text-center mb-5 display-6">Our Expert Consultants</h2>
                <div className="row g-4">
                    {consultants.map((consultant) => (
                        <div 
                            key={consultant.id} 
                            className="col-lg-3 col-md-6"
                            onMouseEnter={() => setHoveredConsultant(consultant.id)}
                            onMouseLeave={() => setHoveredConsultant(null)}
                        >
                            <div 
                                className={`card h-100 shadow-sm transition-all ${
                                    hoveredConsultant === consultant.id ? 'shadow-lg scale-105' : ''
                                }`}
                            >
                                <div 
                                    className="card-img-top-container text-center p-3"
                                    onClick={() => handleConsultantClick(consultant.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img
                                        src={consultant.image}
                                        className={`rounded-circle border transition-all ${
                                            hoveredConsultant === consultant.id 
                                                ? 'border-primary border-3' 
                                                : 'border-2'
                                        }`}
                                        alt={consultant.name}
                                        style={{ 
                                            width: '150px', 
                                            height: '150px', 
                                            objectFit: 'cover',
                                            transform: hoveredConsultant === consultant.id 
                                                ? 'scale(1.05)' 
                                                : 'scale(1)'
                                        }}
                                    />
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title fw-bold">{consultant.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        {consultant.specialization}
                                    </h6>
                                    
                                    <div className="mb-3">
                                        <span className="badge bg-warning text-dark">
                                            <i className="fas fa-star me-1"></i> {consultant.rating}
                                        </span>
                                    </div>
                                    
                                    <div className="expertise-tags mb-3">
                                        {consultant.expertise.map((skill, index) => (
                                            <span 
                                                key={index} 
                                                className="badge bg-light text-dark me-1 mb-1"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={handleBookClick}
                                    >
                                        <i className="fas fa-comments me-2"></i> Let's Talk
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features Section */}
            <div className="container my-5">
                <div className="row g-4">
                    {features.map((feature, index) => (
                        <div key={index} className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm hover-lift">
                                <div className="card-body text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <i className={`fas fa-${feature.icon} fa-3x text-primary`}></i>
                                    </div>
                                    <h3 className="h4">{feature.title}</h3>
                                    <p className="text-muted">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;