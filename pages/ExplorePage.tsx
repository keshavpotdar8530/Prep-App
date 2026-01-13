
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Experience, Difficulty, JobRole } from '../types';
import BottomNav from '../components/BottomNav';

interface ExplorePageProps {
  experiences: Experience[];
}

const ExplorePage: React.FC<ExplorePageProps> = ({ experiences }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedYears, setSelectedYears] = useState<number[]>([]);

  const filteredExperiences = useMemo(() => {
    return experiences.filter(exp => {
      const matchesSearch = exp.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           exp.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === 'All' || exp.role.includes(selectedRole);
      const matchesYear = selectedYears.length === 0 || selectedYears.includes(exp.year);
      return matchesSearch && matchesRole && matchesYear && exp.status === 'Approved';
    });
  }, [experiences, searchTerm, selectedRole, selectedYears]);

  const toggleYear = (year: number) => {
    setSelectedYears(prev => prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]);
  };

  return (
    <div className="max-w-[480px] mx-auto bg-white dark:bg-background-dark min-h-screen pb-32 shadow-xl">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center p-4 pb-2 justify-between">
          <div onClick={() => navigate(-1)} className="text-[#111318] dark:text-white flex size-10 items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </div>
          <h2 className="text-[#111318] dark:text-white text-lg font-bold flex-1 text-center">Interview Experiences</h2>
          <div className="flex w-10 items-center justify-end">
            <span className="material-symbols-outlined">notifications</span>
          </div>
        </div>
        <div className="px-4 py-3">
          <div className="flex w-full items-stretch rounded-xl bg-gray-100 dark:bg-gray-800 h-12">
            <span className="material-symbols-outlined text-[#616f89] flex items-center pl-4">search</span>
            <input
              className="flex-1 bg-transparent border-none focus:ring-0 px-4 text-base"
              placeholder="Search companies or roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main>
        <div className="flex gap-3 p-4 overflow-x-auto hide-scrollbar whitespace-nowrap">
          {['All', 'Software Engineer', 'Data Analyst', 'Internship', 'Product Manager'].map(role => (
            <div
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`flex h-10 shrink-0 items-center justify-center px-5 rounded-full shadow-sm cursor-pointer transition-colors ${
                selectedRole === role ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 border dark:border-gray-700'
              }`}
            >
              <p className="text-sm font-medium">{role}</p>
            </div>
          ))}
        </div>

        <div className="px-4 mb-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden">
            <details className="border-b dark:border-gray-700 group">
              <summary className="flex cursor-pointer items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-gray-400">calendar_today</span>
                  <p className="text-sm font-semibold">Filter by Year</p>
                </div>
                <span className="material-symbols-outlined text-gray-400 group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="px-4 pb-4 flex flex-wrap gap-2">
                {[2024, 2023, 2022, 2021].map(year => (
                  <span
                    key={year}
                    onClick={() => toggleYear(year)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                      selectedYears.includes(year) ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    {year}
                  </span>
                ))}
              </div>
            </details>
          </div>
        </div>

        <div className="px-4 flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold">Showing {filteredExperiences.length} experiences</h3>
          <button onClick={() => { setSearchTerm(''); setSelectedRole('All'); setSelectedYears([]); }} className="text-primary text-xs font-bold">RESET</button>
        </div>

        <div className="px-4 space-y-4">
          {filteredExperiences.map(exp => (
            <div
              key={exp.id}
              onClick={() => navigate(`/detail/${exp.id}`)}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700 hover:border-primary/30 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-lg bg-gray-50 dark:bg-gray-700 flex items-center justify-center border dark:border-gray-600">
                    <img src={exp.companyLogo} className="w-8 h-8 object-contain" alt="Logo" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base">{exp.company}</h4>
                    <p className="text-gray-500 text-xs">{exp.role} • {exp.year}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${exp.selected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {exp.selected ? 'Selected' : 'Rejected'}
                </span>
              </div>
              <p className="text-sm line-clamp-2 leading-relaxed mb-4 text-gray-600 dark:text-gray-300">{exp.summary}</p>
              <div className="flex items-center justify-between border-t dark:border-gray-700 pt-3">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                    {exp.contributor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-xs text-gray-400">{exp.contributor.name}</span>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <span className="text-xs font-bold">Read Full</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default ExplorePage;
