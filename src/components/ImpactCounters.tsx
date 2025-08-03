import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { Trees, Wind, Droplets, Zap } from 'lucide-react';

interface CounterData {
  id: string;
  icon: React.ReactNode;
  value: number;
  label: string;
  unit: string;
  color: string;
}

const ImpactCounters: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const counters: CounterData[] = [
    {
      id: 'trees',
      icon: <Trees className="counter-icon" />,
      value: 52847,
      label: 'Trees Planted',
      unit: '',
      color: '#22c55e'
    },
    {
      id: 'carbon',
      icon: <Wind className="counter-icon" />,
      value: 158541,
      label: 'Carbon Footprint Reduced',
      unit: 'kg',
      color: '#3b82f6'
    },
    {
      id: 'pollution',
      icon: <Zap className="counter-icon" />,
      value: 89234,
      label: 'Pollution Reduced',
      unit: 'kg',
      color: '#f59e0b'
    },
    {
      id: 'oxygen',
      icon: <Droplets className="counter-icon" />,
      value: 1205678,
      label: 'Oxygen Increased',
      unit: 'L',
      color: '#06b6d4'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('impact-counters');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="impact-counters" className="impact-counters">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Global Impact</h2>
          <p className="section-description">
            Together, we're making a real difference for our planet. 
            Here's the impact we've achieved so far.
          </p>
        </div>
        
        <div className="counters-grid">
          {counters.map((counter) => (
            <div key={counter.id} className="counter-card">
              <div className="counter-content">
                <div className="counter-icon-wrapper" style={{ color: counter.color }}>
                  {counter.icon}
                </div>
                <div className="counter-number">
                  {isVisible ? (
                    <CountUp
                      end={counter.value}
                      duration={2.5}
                      separator=","
                      useEasing={true}
                    />
                  ) : (
                    0
                  )}
                  {counter.unit && <span className="counter-unit">{counter.unit}</span>}
                </div>
                <div className="counter-label">{counter.label}</div>
              </div>
              <div className="counter-pulse" style={{ backgroundColor: counter.color }}></div>
            </div>
          ))}
        </div>
        
        <div className="impact-visual">
          <div className="impact-trees">
            {[...Array(15)].map((_, index) => (
              <Trees 
                key={index} 
                className={`floating-tree tree-${index + 1}`} 
                style={{ 
                  animationDelay: `${index * 0.3}s`,
                  color: '#22c55e',
                  opacity: 0.6 - (index * 0.02)
                }} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactCounters;
