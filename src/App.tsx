import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ImpactCounters from './components/ImpactCounters';
import AIPlantTips from './components/AIPlantTips';
import Leaderboard from './components/Leaderboard';
import Community from './components/Community';
import NurseryLocator from './components/NurseryLocator';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <ImpactCounters />
              <AIPlantTips />
              <Community />
            </>
          } />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/ai-tips" element={<AIPlantTips />} />
          <Route path="/nursery-locator" element={<NurseryLocator />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
