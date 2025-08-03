import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trees, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <Trees className="logo-icon" />
          <span className="logo-text">EcoAction</span>
        </Link>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/leaderboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Leaderboard
          </Link>
          <Link to="/community" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Community
          </Link>
          <Link to="/ai-tips" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Plant Growth AI Tips
          </Link>
          <Link to="/nursery-locator" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Find a Nursery
          </Link>
        </nav>

        <button className="cta-button">
          <Trees className="cta-icon" />
          Plant a Tree
        </button>

        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
};

export default Header;
