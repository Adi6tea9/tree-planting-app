import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ImpactCounters from './components/ImpactCounters';
import Leaderboard from './components/Leaderboard';
import Community from './components/Community';
import NurseryLocator from './components/NurseryLocator';
import Donation from './components/Donation';
import Footer from './components/Footer';
import PlantAnalyzer from './components/PlantAnalyzer';
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
              <Community />
            </>
          } />
          <Route path="/donation" element={<Donation />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/nursery-locator" element={<NurseryLocator />} />
          <Route path="/plant-health" element={<PlantAnalyzer />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
