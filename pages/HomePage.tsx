
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Experience, Company } from '../types';
import { COMPANIES } from '../data';
import BottomNav from '../components/BottomNav';

interface HomePageProps {
  experiences: Experience[];
  setDarkMode: (val: boolean) => void;
  darkMode: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ experiences, setDarkMode, darkMode }) => {
  const navigate = useNavigate();
  const approvedExperiences = experiences.filter(e => e.status === 'Approved').slice(0, 5);

  return (
    <div className="max-w-[480px] mx-auto bg-white dark:bg-background-dark min-h-screen pb-32 shadow-xl">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 shrink-0 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden border-2 border-primary/20">
              <img src="https://picsum.photos/seed/user1/100/100" className="size-full object-cover" alt="Avatar" />
            </div>
            <div>
              <h2 className="text-[#111318] dark:text-white text-lg font-bold leading-tight">PlacementGuru</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Class of 2025</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex size-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-[#111318] dark:text-white"
            >
              <span className="material-symbols-outlined text-[24px]">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 pt-6 pb-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hi, Alex! 👋</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Ready for your next interview?</p>
      </div>

      <div className="px-4 py-3">
        <div onClick={() => navigate('/explore')} className="flex w-full h-14 items-center rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 cursor-pointer">
          <span className="material-symbols-outlined text-[#616f89] pl-4">search</span>
          <span className="text-[#616f89] px-4">Search companies or roles</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between px-4 pb-3">
          <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Trending Companies</h3>
          <button className="text-primary text-sm font-semibold">See all</button>
        </div>
        <div className="flex w-full overflow-x-auto px-4 hide-scrollbar">
          <div className="flex flex-row items-start justify-start gap-6 pb-2">
            {COMPANIES.map((company) => (
              <div key={company.name} className="flex flex-col items-center gap-2 w-16 group cursor-pointer">
                <div className="p-0.5 rounded-full bg-gradient-to-tr from-primary to-blue-400">
                  <div className="size-16 bg-white dark:bg-gray-800 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900 overflow-hidden">
                    <img src={company.logo} alt={company.name} className="size-8 object-contain" />
                  </div>
                </div>
                <p className="text-[#111318] dark:text-gray-300 text-xs font-medium text-center truncate w-full">{company.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 px-4">
        <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white pb-4">Recommended for You</h3>
        {approvedExperiences.map((exp) => (
          <div
            key={exp.id}
            onClick={() => navigate(`/detail/${exp.id}`)}
            className="bg-white dark:bg-gray-900 rounded-xl p-4 mb-4 shadow-sm border border-gray-100 dark:border-gray-800 cursor-pointer active:scale-[0.98] transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-3">
                <div className="size-12 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center border border-gray-100 dark:border-gray-700">
                  <img src={exp.companyLogo} alt={exp.company} className="size-6 object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-[#111318] dark:text-white">{exp.company} Interview</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{exp.role}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded leading-tight ${
                exp.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                exp.difficulty === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
              }`}>
                {exp.difficulty}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 leading-relaxed">{exp.summary}</p>
            <div className="flex items-center justify-between pt-3 border-t border-gray-50 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <img src={exp.contributor.avatar} className="size-6 rounded-full" alt="User" />
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">by {exp.contributor.name}</span>
              </div>
              <button className="text-primary text-sm font-bold flex items-center gap-1">
                Read More
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

export default HomePage;
