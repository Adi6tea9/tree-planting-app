import React, { useState } from 'react';
import { Trees, Heart, Leaf, CheckCircle, CreditCard, Smartphone, Building, ArrowLeft, Zap, Globe, Users, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DonationFormData {
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  location: string;
  paymentMethod: 'upi' | 'card' | 'netbanking';
}

const Donation: React.FC = () => {
  const [treeCount, setTreeCount] = useState(1);
  const [formData, setFormData] = useState<DonationFormData>({
    donorName: '',
    donorEmail: '',
    donorPhone: '',
    location: '',
    paymentMethod: 'upi'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<DonationFormData>>({});

  const pricePerTree = 10;
  const totalAmount = treeCount * pricePerTree;

  const handleQuantityChange = (change: number) => {
    const newCount = treeCount + change;
    if (newCount >= 1) {
      setTreeCount(newCount);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof DonationFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePaymentMethodChange = (method: 'upi' | 'card' | 'netbanking') => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: method
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<DonationFormData> = {};

    if (!formData.donorName.trim()) {
      newErrors.donorName = 'Name is required';
    }

    if (!formData.donorEmail.trim()) {
      newErrors.donorEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.donorEmail)) {
      newErrors.donorEmail = 'Invalid email address';
    }

    if (!formData.donorPhone.trim()) {
      newErrors.donorPhone = 'Phone number is required';
    } else if (!/^[\d\s\+\-\(\)]{10,}$/.test(formData.donorPhone.replace(/\s/g, ''))) {
      newErrors.donorPhone = 'Invalid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          donorName: '',
          donorEmail: '',
          donorPhone: '',
          location: '',
          paymentMethod: 'upi'
        });
        setTreeCount(1);
      }, 5000);
    }, 2000);
  };

  const renderPaymentIcon = (method: string) => {
    switch (method) {
      case 'upi':
        return <Smartphone className="w-5 h-5" />;
      case 'card':
        return <CreditCard className="w-5 h-5" />;
      case 'netbanking':
        return <Building className="w-5 h-5" />;
      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <div className="donation-success">
        <div className="success-content">
          <div className="success-animation">
            <CheckCircle className="success-icon" />
            <Trees className="success-tree" />
          </div>
          <h2>Thank You! 🌳</h2>
          <p>Your donation of <strong>₹{totalAmount}</strong> will plant <strong>{treeCount} tree{treeCount > 1 ? 's' : ''}</strong>!</p>
          <p>You'll receive a confirmation email at <strong>{formData.donorEmail}</strong></p>
          <div className="celebration-emojis">
            {['🌱', '🌳', '🍃', '🌿', '💚'].map((emoji, index) => (
              <span key={index} className={`celebration-emoji emoji-${index}`}>
                {emoji}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="donation-hero">
        <div className="hero-wave"></div>
        <div className="floating-leaves">
          <div className="leaf leaf-1">🍃</div>
          <div className="leaf leaf-2">🌿</div>
          <div className="leaf leaf-3">🍃</div>
          <div className="leaf leaf-4">🌿</div>
        </div>
        <div className="container">
          <div className="donation-hero-content">
            <div className="back-navigation">
              <button onClick={handleBackClick} className="back-btn">
                <ArrowLeft className="back-icon" />
                <span>Back to Home</span>
              </button>
            </div>
            <div className="hero-text">
              <h1 className="donation-title">
                Plant a Tree & 
                <span className="highlight"> Save Our Planet</span>
              </h1>
              <p className="donation-description">
                Join thousands of eco-warriors making a real difference. Your ₹10 contribution 
                plants one tree and helps create a sustainable future for generations to come.
              </p>
              <div className="hero-stats-donation">
                <div className="stat-item-hero">
                  <div className="stat-icon-wrapper">
                    <Trees className="stat-icon-hero" />
                  </div>
                  <div className="stat-content">
                    <span className="stat-number-hero">50K+</span>
                    <span className="stat-label-hero">Trees Planted</span>
                  </div>
                </div>
                <div className="stat-item-hero">
                  <div className="stat-icon-wrapper">
                    <Users className="stat-icon-hero" />
                  </div>
                  <div className="stat-content">
                    <span className="stat-number-hero">10K+</span>
                    <span className="stat-label-hero">Happy Donors</span>
                  </div>
                </div>
                <div className="stat-item-hero">
                  <div className="stat-icon-wrapper">
                    <Globe className="stat-icon-hero" />
                  </div>
                  <div className="stat-content">
                    <span className="stat-number-hero">25+</span>
                    <span className="stat-label-hero">Cities</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-visual-donation">
              <div className="nature-illustration-donation">
                <div className="tree-group-donation">
                  <Trees className="tree-donation large" />
                  <Trees className="tree-donation medium" />
                  <Trees className="tree-donation small" />
                </div>
                <div className="floating-elements">
                  <Zap className="energy-icon-donation" />
                  <Leaf className="leaf-icon-donation leaf-float-1" />
                  <Leaf className="leaf-icon-donation leaf-float-2" />
                  <Heart className="heart-icon-donation" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-showcase">
        <div className="container">
          <div className="section-header">
            <h2>Your Impact Matters</h2>
            <p>See how your contribution creates lasting change</p>
          </div>
          <div className="impact-cards">
            <div className="impact-card">
              <div className="impact-card-icon">
                <Trees />
              </div>
              <h3>Tree Planted</h3>
              <p>Each ₹10 funds one tree sapling, planting, and 2-year maintenance</p>
              <div className="impact-stat">1 Tree = 1 Life</div>
            </div>
            <div className="impact-card">
              <div className="impact-card-icon">
                <Zap />
              </div>
              <h3>CO₂ Absorption</h3>
              <p>Every tree absorbs approximately 22kg of CO₂ annually from atmosphere</p>
              <div className="impact-stat">22kg CO₂/Year</div>
            </div>
            <div className="impact-card">
              <div className="impact-card-icon">
                <Heart />
              </div>
              <h3>Oxygen Generation</h3>
              <p>One mature tree produces enough oxygen for 2 people per day</p>
              <div className="impact-stat">2 People/Day</div>
            </div>
            <div className="impact-card">
              <div className="impact-card-icon">
                <Shield />
              </div>
              <h3>Ecosystem Protection</h3>
              <p>Trees provide habitat for wildlife and prevent soil erosion</p>
              <div className="impact-stat">Life Sanctuary</div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="donation-form-section">
        <div className="container">
          <div className="donation-grid">
            {/* Amount Selection */}
            <div className="amount-card">
              <div className="card-header">
                <h3>Select Trees to Plant</h3>
                <p>₹10 per tree - Simple, transparent, impactful</p>
              </div>
              <div className="tree-selector-modern">
                <button 
                  type="button" 
                  className="qty-btn-modern"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={treeCount <= 1}
                >
                  <span>−</span>
                </button>
                <div className="tree-display">
                  <div className="tree-count-modern">{treeCount}</div>
                  <div className="tree-label">Tree{treeCount > 1 ? 's' : ''}</div>
                </div>
                <button 
                  type="button" 
                  className="qty-btn-modern"
                  onClick={() => handleQuantityChange(1)}
                >
                  <span>+</span>
                </button>
              </div>
              <div className="total-display">
                <div className="total-amount-modern">₹{totalAmount}</div>
                <div className="total-label">Total Donation</div>
              </div>
              <div className="quick-amounts">
                <p>Popular choices:</p>
                <div className="quick-btns">
                  {[1, 5, 10, 25].map((count) => (
                    <button
                      key={count}
                      type="button"
                      className={`quick-btn ${treeCount === count ? 'active' : ''}`}
                      onClick={() => setTreeCount(count)}
                    >
                      {count} tree{count > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Donation Form */}
            <div className="form-card">
              <div className="card-header">
                <h3>Your Details</h3>
                <p>Help us plant trees in your name</p>
              </div>
              <form onSubmit={handleSubmit} className="modern-form">
                <div className="form-row">
                  <div className="form-group-modern">
                    <label htmlFor="donorName">Full Name *</label>
                    <input
                      type="text"
                      id="donorName"
                      name="donorName"
                      value={formData.donorName}
                      onChange={handleInputChange}
                      className={errors.donorName ? 'error' : ''}
                      placeholder="Enter your full name"
                      required
                    />
                    {errors.donorName && <span className="error-text-modern">{errors.donorName}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group-modern">
                    <label htmlFor="donorEmail">Email Address *</label>
                    <input
                      type="email"
                      id="donorEmail"
                      name="donorEmail"
                      value={formData.donorEmail}
                      onChange={handleInputChange}
                      className={errors.donorEmail ? 'error' : ''}
                      placeholder="your@email.com"
                      required
                    />
                    {errors.donorEmail && <span className="error-text-modern">{errors.donorEmail}</span>}
                  </div>
                  <div className="form-group-modern">
                    <label htmlFor="donorPhone">Phone Number *</label>
                    <input
                      type="tel"
                      id="donorPhone"
                      name="donorPhone"
                      value={formData.donorPhone}
                      onChange={handleInputChange}
                      className={errors.donorPhone ? 'error' : ''}
                      placeholder="+91 98765 43210"
                      required
                    />
                    {errors.donorPhone && <span className="error-text-modern">{errors.donorPhone}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group-modern">
                    <label htmlFor="location">Preferred Location (Optional)</label>
                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="location-select"
                    >
                      <option value="">Choose your city</option>
                      <option value="mumbai">Mumbai</option>
                      <option value="delhi">Delhi</option>
                      <option value="bangalore">Bangalore</option>
                      <option value="pune">Pune</option>
                      <option value="hyderabad">Hyderabad</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="payment-section">
                  <h4>Choose Payment Method</h4>
                  <div className="payment-grid">
                    {(['upi', 'card', 'netbanking'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        className={`payment-card ${formData.paymentMethod === method ? 'selected' : ''}`}
                        onClick={() => handlePaymentMethodChange(method)}
                      >
                        <div className="payment-icon">
                          {renderPaymentIcon(method)}
                        </div>
                        <div className="payment-text">
                          {method === 'upi' && 'UPI Payment'}
                          {method === 'card' && 'Credit/Debit Card'}
                          {method === 'netbanking' && 'Net Banking'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="donate-btn-modern"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="processing-state">
                      <div className="spinner-modern"></div>
                      <span>Processing Payment...</span>
                    </div>
                  ) : (
                    <div className="donate-content">
                      <Trees className="donate-icon" />
                      <span>Plant {treeCount} Tree{treeCount > 1 ? 's' : ''} - ₹{totalAmount}</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Donation;
