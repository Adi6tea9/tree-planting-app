import React from 'react';
import { Trees, Leaf, Zap, Heart } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Together We Can
              <span className="highlight"> Restore Our Planet</span>
            </h1>
            <p className="hero-description">
              Join our global community in planting trees, reducing carbon footprint, 
              and creating a sustainable future for generations to come. Every tree matters, 
              every action counts.
            </p>
            <div className="hero-actions">
              <button className="primary-button">
                <Trees className="button-icon" />
                Plant Your First Tree
              </button>
              <button className="secondary-button">
                Learn More
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <Trees className="stat-icon" />
                <span className="stat-number">50K+</span>
                <span className="stat-label">Trees Planted</span>
              </div>
              <div className="stat-item">
                <Heart className="stat-icon" />
                <span className="stat-number">10K+</span>
                <span className="stat-label">Active Members</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="nature-illustration">
              <div className="tree-group">
                <Trees className="tree large" />
                <Trees className="tree medium" />
                <Trees className="tree small" />
              </div>
              <div className="leaf-group">
                <Leaf className="leaf leaf-1" />
                <Leaf className="leaf leaf-2" />
                <Leaf className="leaf leaf-3" />
                <Leaf className="leaf leaf-4" />
              </div>
              <div className="energy-indicator">
                <Zap className="energy-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-wave"></div>
    </section>
  );
};

export default Hero;
