import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  const socialLinks = [
    { icon: "facebook-f", href: "https://facebook.com" },
    { icon: "twitter", href: "https://twitter.com" },
    { icon: "google", href: "https://google.com" },
    { icon: "instagram", href: "https://instagram.com" },
    { icon: "linkedin", href: "https://linkedin.com" },
    { icon: "github", href: "https://github.com" }
  ];

  const productLinks = [
    { label: "Angular", href: "/products/angular" },
    { label: "React", href: "/products/react" },
    { label: "Vue", href: "/products/vue" },
    { label: "Laravel", href: "/products/laravel" }
  ];

  const usefulLinks = [
    { label: "Pricing", href: "/pricing" },
    { label: "Settings", href: "/settings" },
    { label: "Orders", href: "/orders" },
    { label: "Help", href: "/help" }
  ];

  return (
    <footer className="text-center text-lg-start bg-dark text-light">
      {/* Social Media Section */}
      <section className="d-flex justify-content-center p-4 border-bottom border-secondary">
        <div>
        {socialLinks.map((social, index) => (
  <a 
    key={index} 
    href={social.href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="me-4 text-reset social-icon">
    <i className={`fab fa-${social.icon} fa-lg`}></i>
  </a>
))}

        </div>
        </section>

      {/* Footer Content Section */}
      <section className="py-5">
        <div className="container text-center text-md-start">
          <div className="row mt-3">
            {/* Company Description Column */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Skill Lab
              </h6>
              <p className="text-muted">
                Innovative solutions driving digital transformation. 
                We create cutting-edge technologies that empower businesses 
                and individuals to achieve more.
              </p>
            </div>

            {/* Products Column */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              {productLinks.map((product, index) => (
                <p key={index}>
                  <Link to={product.href} className="text-reset product-link">
                    {product.label}
                  </Link>
                </p>
              ))}
            </div>

            {/* Useful Links Column */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful Links</h6>
              {usefulLinks.map((link, index) => (
                <p key={index}>
                  <Link to={link.href} className="text-reset useful-link">
                    {link.label}
                  </Link>
                </p>
              ))}
            </div>

            {/* Contact Column */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p><i className="fas fa-home me-3"></i> New York, NY 10012, US</p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                info@example.com
              </p>
              <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
              <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright Section */}
      <div 
        className="text-center p-4" 
        style={{ 
          backgroundColor: "rgba(0, 0, 0, 0.1)", 
          borderTop: "1px solid rgba(255,255,255,0.1)" 
        }}
      >
        © {new Date().getFullYear()} Copyright:
        <Link 
          to="/" 
          className="text-reset fw-bold ms-1 copyright-link"
        >
          SkillLab.com
        </Link>
      </div>
    </footer>
  );
}

export default Footer;