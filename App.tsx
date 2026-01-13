
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { INITIAL_EXPERIENCES } from './data';
import { Experience, ExperienceStatus } from './types';

// Pages
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import DetailPage from './pages/DetailPage';
import AddExperiencePage from './pages/AddExperiencePage';
import AdminDashboard from './pages/AdminDashboard';

const AppContent: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>(() => {
    const saved = localStorage.getItem('pg-experiences');
    return saved ? JSON.parse(saved) : INITIAL_EXPERIENCES;
  });

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('pg-experiences', JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addExperience = (newExp: Experience) => {
    setExperiences(prev => [newExp, ...prev]);
  };

  const updateExperienceStatus = (id: string, status: ExperienceStatus) => {
    setExperiences(prev => prev.map(exp => exp.id === id ? { ...exp, status } : exp));
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-[#111318] dark:text-white transition-colors duration-200">
      <Routes>
        <Route path="/" element={<HomePage experiences={experiences} setDarkMode={setDarkMode} darkMode={darkMode} />} />
        <Route path="/explore" element={<ExplorePage experiences={experiences} />} />
        <Route path="/detail/:id" element={<DetailPage experiences={experiences} />} />
        <Route path="/add" element={<AddExperiencePage onAdd={addExperience} />} />
        <Route path="/admin" element={<AdminDashboard experiences={experiences} onStatusUpdate={updateExperienceStatus} />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
