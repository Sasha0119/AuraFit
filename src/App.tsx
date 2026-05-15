import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts';
import Nutrition from './pages/Nutrition';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import WorkoutTimer from './components/common/WorkoutTimer';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [showTimer, setShowTimer] = useState(false);

  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
        
        {/* Shortcut to toggle timer from anywhere */}
        <button 
          onClick={() => setShowTimer(!showTimer)}
          className="fixed bottom-4 right-4 z-40 p-3 rounded-full gradient-brand text-white shadow-lg lg:bottom-8 lg:right-8 opacity-40 hover:opacity-100 transition-opacity"
        >
          <Zap size={20} />
        </button>

        <AnimatePresence>
          {showTimer && <WorkoutTimer duration={60} onClose={() => setShowTimer(false)} />}
        </AnimatePresence>
      </Router>
    </AppProvider>
  );
}

// Minimal Zap icon used above
const Zap = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} height={size} viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

