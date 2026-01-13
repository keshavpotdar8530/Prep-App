
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: 'home', label: 'Home', path: '/' },
    { icon: 'explore', label: 'Explore', path: '/explore' },
    { icon: 'add', label: 'Post', path: '/add', primary: true },
    { icon: 'gavel', label: 'Admin', path: '/admin' },
    { icon: 'person', label: 'Profile', path: '#' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 flex justify-around items-center py-2 pb-6 px-4 z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        if (item.primary) {
          return (
            <div key={item.label} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer">
              <div className="bg-primary size-10 rounded-full flex items-center justify-center text-white -mt-8 shadow-lg shadow-primary/40">
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </div>
          );
        }
        return (
          <button
            key={item.label}
            onClick={() => item.path !== '#' && navigate(item.path)}
            className={`flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-gray-400'}`}
          >
            <span className={`material-symbols-outlined ${isActive ? 'fill-1' : ''}`}>{item.icon}</span>
            <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
