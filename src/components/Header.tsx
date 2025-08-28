import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trees, Menu, X, Sun, Moon } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<string>(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

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
          <Link to="/plant-health" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Plant Health Scan
          </Link>
          <Link to="/nursery-locator" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Find a Nursery
          </Link>
        </nav>

        <div style={{ display:'flex', alignItems:'center', gap: '0.5rem' }}>
          <button className="cta-button" title="Plant a Tree">
            <Trees className="cta-icon" />
            Plant a Tree
          </button>
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span style={{ marginLeft: 6 }}>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
};

export default Header;
