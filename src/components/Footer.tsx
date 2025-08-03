import React from 'react';
import { Trees, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Trees className="footer-logo-icon" />
              <span className="footer-logo-text">EcoAction</span>
            </div>
            <p className="footer-description">
              Join our global mission to restore our planet through tree planting 
              and environmental action. Together, we can make a difference.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook className="social-icon" />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter className="social-icon" />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram className="social-icon" />
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <Youtube className="social-icon" />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/leaderboard">Leaderboard</a></li>
              <li><a href="/community">Community</a></li>
              <li><a href="/ai-tips">AI Plant Tips</a></li>
              <li><a href="/nursery-locator">Find Nurseries</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Get Involved</h3>
            <ul className="footer-links">
              <li><a href="#">Plant a Tree</a></li>
              <li><a href="#">Join Our Mission</a></li>
              <li><a href="#">Volunteer</a></li>
              <li><a href="#">Donate</a></li>
              <li><a href="#">Corporate Partnerships</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span>hello@ecoaction.org</span>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span>123 Green Street, Earth City, EC 12345</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Stay Updated</h3>
            <p className="newsletter-text">
              Subscribe to our newsletter for the latest environmental news and updates.
            </p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button className="newsletter-button">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <div className="footer-credits">
              <p>&copy; 2024 EcoAction. All rights reserved.</p>
              <p>Built with 💚 for a sustainable future</p>
            </div>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-trees">
        <div className="tree-line">
          {[...Array(20)].map((_, index) => (
            <Trees 
              key={index}
              className="footer-tree"
              style={{ 
                left: `${index * 5}%`,
                animationDelay: `${index * 0.1}s`,
                fontSize: `${Math.random() * 10 + 15}px`,
                opacity: 0.3 + Math.random() * 0.3
              }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
