
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Experience, ExperienceStatus } from '../types';
import BottomNav from '../components/BottomNav';

interface AdminDashboardProps {
  experiences: Experience[];
  onStatusUpdate: (id: string, status: ExperienceStatus) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ experiences, onStatusUpdate }) => {
  const navigate = useNavigate();
  const pending = experiences.filter(e => e.status === ExperienceStatus.PENDING);
  const totalPosts = experiences.length;

  return (
    <div className="max-w-[480px] mx-auto bg-background-light dark:bg-background-dark min-h-screen text-[#111318] dark:text-white">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b dark:border-gray-800">
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">dashboard_customize</span>
            <h1 className="text-lg font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-500">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>
        </div>
      </header>

      <main className="pb-24">
        <div className="p-4">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-bold tracking-tight">Analytics</h2>
            <span className="text-xs text-gray-500">Updated 2m ago</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-5 border dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm col-span-2">
              <p className="text-gray-500 text-sm font-medium">Total Experiences</p>
              <p className="text-3xl font-bold mt-1">{totalPosts}</p>
            </div>
            <div className="rounded-xl p-5 border dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <p className="text-gray-500 text-sm font-medium">Pending Review</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">{pending.length}</p>
                {pending.length > 0 && <span className="flex h-2 w-2 rounded-full bg-orange-500"></span>}
              </div>
            </div>
            <div className="rounded-xl p-5 border dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <p className="text-gray-500 text-sm font-medium">Approved</p>
              <p className="text-2xl font-bold">{experiences.filter(e => e.status === ExperienceStatus.APPROVED).length}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 pb-1 pt-6">
          <h2 className="text-xl font-bold">Moderation Queue</h2>
        </div>

        <div className="space-y-4 p-4">
          {pending.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-8 text-center bg-white dark:bg-gray-900 rounded-2xl">
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">task_alt</span>
              </div>
              <h3 className="text-lg font-bold">All caught up!</h3>
              <p className="text-gray-500 text-sm">There are no pending posts for moderation.</p>
            </div>
          ) : (
            pending.map(exp => (
              <div key={exp.id} className="flex flex-col gap-4 rounded-xl bg-white dark:bg-gray-900 p-4 shadow-sm border dark:border-gray-800">
                <div className="flex gap-4">
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Pending Review</span>
                      <span className="text-gray-400 text-xs">•</span>
                      <span className="text-gray-500 text-xs">{exp.date}</span>
                    </div>
                    <p className="text-base font-bold leading-tight">{exp.role} - {exp.company}</p>
                    <p className="text-gray-500 text-sm">{exp.contributor.name} • {exp.contributor.college}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-xs line-clamp-2">"{exp.summary}"</p>
                  </div>
                  <img src={exp.companyLogo} className="w-20 h-20 rounded-lg object-contain bg-white p-2 border" alt="Logo" />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onStatusUpdate(exp.id, ExperienceStatus.APPROVED)}
                    className="flex-1 flex items-center justify-center rounded-lg h-9 bg-primary text-white gap-2 text-sm font-bold"
                  >
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    Approve
                  </button>
                  <button
                    onClick={() => onStatusUpdate(exp.id, ExperienceStatus.FLAGGED)}
                    className="flex-1 flex items-center justify-center rounded-lg h-9 bg-gray-100 dark:bg-gray-800 text-red-600 gap-2 text-sm font-bold"
                  >
                    <span className="material-symbols-outlined text-lg">flag</span>
                    Flag
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default AdminDashboard;
