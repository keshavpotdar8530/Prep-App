
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Experience } from '../types';

interface DetailPageProps {
  experiences: Experience[];
}

const DetailPage: React.FC<DetailPageProps> = ({ experiences }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const exp = experiences.find(e => e.id === id);

  if (!exp) return <div className="p-8 text-center">Experience not found</div>;

  return (
    <div className="max-w-[480px] mx-auto bg-white dark:bg-background-dark min-h-screen shadow-lg flex flex-col">
      <header className="sticky top-0 z-10 flex items-center bg-white dark:bg-background-dark p-4 border-b dark:border-gray-800">
        <div onClick={() => navigate(-1)} className="size-12 flex items-center cursor-pointer">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </div>
        <h2 className="text-lg font-bold flex-1 text-center">Experience Details</h2>
        <div className="size-12 flex items-center justify-end">
          <span className="material-symbols-outlined">share</span>
        </div>
      </header>

      <div className="overflow-y-auto flex-1 pb-24">
        <div className="flex p-4 flex-col items-center gap-4">
          <img src={exp.companyLogo} className="size-24 rounded-xl border p-2 bg-white object-contain shadow-md" alt="Logo" />
          <div className="text-center">
            <h1 className="text-[22px] font-bold leading-tight">{exp.role}</h1>
            <p className="text-[#616f89] dark:text-gray-400 text-base">{exp.company} | {exp.year} Batch</p>
            <p className="text-xs text-gray-400 mt-1">Posted on {exp.date}</p>
          </div>
        </div>

        <div className="flex gap-3 px-4 py-2 flex-wrap justify-center">
          <div className="flex h-8 items-center gap-x-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 px-3">
            <span className="material-symbols-outlined text-orange-600 dark:text-orange-400 text-sm">signal_cellular_alt</span>
            <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">{exp.difficulty} Difficulty</p>
          </div>
          <div className={`flex h-8 items-center gap-x-2 rounded-lg px-3 ${exp.selected ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
            <span className={`material-symbols-outlined text-sm ${exp.selected ? 'text-green-600' : 'text-gray-500'}`}>{exp.selected ? 'check_circle' : 'cancel'}</span>
            <p className={`text-sm font-medium ${exp.selected ? 'text-green-600' : 'text-gray-500'}`}>{exp.selected ? 'Selected' : 'Rejected'}</p>
          </div>
          <div className="flex h-8 items-center gap-x-2 rounded-lg bg-primary/10 px-3">
            <span className="material-symbols-outlined text-primary text-sm">location_on</span>
            <p className="text-primary text-sm font-medium">{exp.location}</p>
          </div>
        </div>

        <div className="mt-4 border-y dark:border-gray-800 grid grid-cols-4 px-4">
          <div className="flex flex-col items-center gap-1 py-3 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="rounded-full bg-[#f0f2f4] dark:bg-gray-800 p-2 text-primary">
              <span className="material-symbols-outlined">thumb_up</span>
            </div>
            <p className="text-xs font-medium">{exp.likes}</p>
          </div>
          <div className="flex flex-col items-center gap-1 py-3 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="rounded-full bg-[#f0f2f4] dark:bg-gray-800 p-2">
              <span className="material-symbols-outlined text-gray-600">chat_bubble</span>
            </div>
            <p className="text-xs font-medium">{exp.comments}</p>
          </div>
          <div className="flex flex-col items-center gap-1 py-3 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="rounded-full bg-[#f0f2f4] dark:bg-gray-800 p-2">
              <span className="material-symbols-outlined text-gray-600">bookmark</span>
            </div>
            <p className="text-xs font-medium">Save</p>
          </div>
          <div className="flex flex-col items-center gap-1 py-3 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="rounded-full bg-[#f0f2f4] dark:bg-gray-800 p-2">
              <span className="material-symbols-outlined text-gray-600">share</span>
            </div>
            <p className="text-xs font-medium">Share</p>
          </div>
        </div>

        <h2 className="text-[22px] font-bold px-4 pb-4 pt-6">Round-Wise Breakdown</h2>
        
        <div className="px-6 relative">
          <div className="absolute left-[33px] top-6 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800"></div>
          {exp.rounds.map((round, index) => (
            <div key={round.id} className="relative pl-10 pb-8">
              <div className="absolute left-[-15px] top-0 size-8 rounded-full bg-primary flex items-center justify-center text-white ring-4 ring-white dark:ring-background-dark z-10">
                <span className="material-symbols-outlined text-lg">
                  {round.type === 'Technical' ? 'code' : round.type === 'Aptitude' ? 'psychology' : 'groups'}
                </span>
              </div>
              <div className="bg-background-light dark:bg-gray-900/50 p-4 rounded-xl border dark:border-gray-800 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-base">Round {index + 1}: {round.name}</h3>
                  {round.duration && <span className="text-xs text-gray-500 font-medium">{round.duration}</span>}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{round.description}</p>
                <div className="space-y-2">
                  {round.questions.map(q => (
                    <div key={q.id} className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700">
                      <p className="text-sm font-semibold mb-1">{q.text}</p>
                      {q.subText && <p className="text-xs text-gray-500 italic">{q.subText}</p>}
                    </div>
                  ))}
                </div>
                {round.insiderTip && (
                  <div className="mt-4 flex items-start gap-2 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
                    <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400 text-sm">lightbulb</span>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-yellow-800 dark:text-yellow-300">Insider Tip</p>
                      <p className="text-xs text-yellow-700 dark:text-yellow-400">{round.insiderTip}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-8">
          <div className="bg-gray-50 dark:bg-gray-900/80 rounded-2xl p-4 flex items-center gap-4">
            <img src={exp.contributor.avatar} className="size-12 rounded-full border-2 border-primary" alt="Contributor" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Experience shared by</p>
              <p className="text-sm font-bold">{exp.contributor.name}</p>
              <p className="text-xs text-primary font-medium">{exp.contributor.college} | {exp.contributor.batch}</p>
            </div>
            <button className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg">View Profile</button>
          </div>
        </div>

        <div className="px-4 py-4">
          <h3 className="font-bold mb-2">Final Words for Juniors</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic border-l-4 border-primary/20 pl-4">
            "{exp.finalAdvice}"
          </p>
        </div>
      </div>

      <div className="sticky bottom-0 p-4 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t dark:border-gray-800 flex gap-3">
        <button className="flex-1 bg-primary text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all">
          <span className="material-symbols-outlined">playlist_add</span>
          Add to Prep List
        </button>
      </div>
    </div>
  );
};

export default DetailPage;
