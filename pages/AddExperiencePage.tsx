
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Experience, Difficulty, ExperienceStatus, Round } from '../types';
import { COMPANIES } from '../data';
import { generateRoundTips, summarizeExperience } from '../services/geminiService';

interface AddExperiencePageProps {
  onAdd: (exp: Experience) => void;
}

const AddExperiencePage: React.FC<AddExperiencePageProps> = ({ onAdd }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    difficulty: Difficulty.MEDIUM,
    date: 'October 24, 2023',
    finalAdvice: '',
    selected: true,
    location: 'Remote / India'
  });

  const [rounds, setRounds] = useState<Round[]>([
    { id: 'r1', name: 'Online Assessment', type: 'Aptitude', description: '', questions: [], insiderTip: '' }
  ]);

  const addRound = () => {
    const newRound: Round = {
      id: `r${rounds.length + 1}`,
      name: `Round ${rounds.length + 1}`,
      type: 'Technical',
      description: '',
      questions: [],
      insiderTip: ''
    };
    setRounds([...rounds, newRound]);
  };

  const removeRound = (id: string) => {
    setRounds(rounds.filter(r => r.id !== id));
  };

  const handleRoundChange = (id: string, field: keyof Round, value: any) => {
    setRounds(rounds.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const getAITip = async (id: string) => {
    const round = rounds.find(r => r.id === id);
    if (!round || !formData.company) return;
    setLoading(true);
    const tip = await generateRoundTips(round.name, formData.company);
    handleRoundChange(id, 'insiderTip', tip);
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const companyObj = COMPANIES.find(c => c.name === formData.company) || COMPANIES[0];
    
    const summary = await summarizeExperience({ ...formData, rounds });

    const newExp: Experience = {
      ...formData,
      id: Date.now().toString(),
      companyLogo: companyObj.logo,
      year: 2024,
      difficulty: formData.difficulty as Difficulty,
      contributor: {
        name: 'Alex Johnson',
        college: 'My University',
        batch: '2025',
        avatar: 'https://picsum.photos/seed/alex/100/100'
      },
      summary,
      rounds,
      status: ExperienceStatus.PENDING,
      likes: 0,
      comments: 0
    };

    onAdd(newExp);
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="max-w-[480px] mx-auto bg-white dark:bg-background-dark min-h-screen flex flex-col shadow-xl">
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b dark:border-gray-800">
        <div className="flex items-center p-4 justify-between h-16">
          <div onClick={() => navigate(-1)} className="flex w-12 items-center cursor-pointer">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </div>
          <h1 className="text-lg font-bold flex-1 text-center">Add Experience</h1>
          <button onClick={() => navigate(-1)} className="w-12 text-[#616f89] text-sm font-medium hover:text-red-500">Cancel</button>
        </div>
      </header>

      <main className="flex-1 pb-32 overflow-y-auto">
        <div className="px-4 py-4 space-y-4">
          <h3 className="text-lg font-bold">Company Information</h3>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Company Name</label>
            <select
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="form-input rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 h-14 px-4 text-base"
            >
              <option value="">Select Company</option>
              {COMPANIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              <option value="Startup">A New Startup</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Job Role</label>
            <input
              type="text"
              placeholder="e.g. Software Engineer Intern"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="form-input rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 h-14 px-4 text-base"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Difficulty</label>
            <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => {
                      const diff = star <= 2 ? Difficulty.EASY : star <= 4 ? Difficulty.MEDIUM : Difficulty.HARD;
                      setFormData({ ...formData, difficulty: diff });
                    }}
                    className={`material-symbols-outlined text-2xl cursor-pointer ${
                      (formData.difficulty === Difficulty.EASY && star <= 2) ||
                      (formData.difficulty === Difficulty.MEDIUM && star <= 4) ||
                      (formData.difficulty === Difficulty.HARD && star <= 5) ? 'text-primary fill-1' : 'text-gray-300'
                    }`}
                  >
                    star
                  </span>
                ))}
              </div>
              <span className="text-primary font-bold">{formData.difficulty}</span>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Interview Rounds</h3>
              <span className="text-xs text-gray-500">{rounds.length} Rounds added</span>
            </div>

            {rounds.map((round, idx) => (
              <div key={round.id} className="p-5 rounded-xl border border-primary/20 bg-primary/5 dark:bg-primary/10 space-y-4 relative">
                <button onClick={() => removeRound(round.id)} className="absolute top-4 right-4 text-red-400">
                  <span className="material-symbols-outlined">delete</span>
                </button>
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-primary text-white size-7 rounded-full flex items-center justify-center font-bold text-xs">{idx + 1}</div>
                  <input
                    className="bg-transparent border-none font-bold text-base focus:ring-0 p-0"
                    value={round.name}
                    onChange={(e) => handleRoundChange(round.id, 'name', e.target.value)}
                  />
                </div>
                
                <textarea
                  placeholder="What happened in this round? (Questions, topics...)"
                  className="w-full rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 p-3 text-sm"
                  rows={3}
                  value={round.description}
                  onChange={(e) => handleRoundChange(round.id, 'description', e.target.value)}
                />

                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Your insider tip..."
                    className="flex-1 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 h-10 px-3 text-xs"
                    value={round.insiderTip}
                    onChange={(e) => handleRoundChange(round.id, 'insiderTip', e.target.value)}
                  />
                  <button
                    onClick={() => getAITip(round.id)}
                    className="h-10 px-3 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg flex items-center text-primary"
                    title="Get AI Tip"
                    disabled={loading}
                  >
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={addRound}
              className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed dark:border-gray-700 rounded-xl text-primary font-bold hover:bg-primary/5 transition-all"
            >
              <span className="material-symbols-outlined">add_circle</span>
              Add Next Round
            </button>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-bold mb-4">Final Words for Juniors</h3>
            <textarea
              placeholder="Share your general strategy or overall advice..."
              className="w-full rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-base"
              rows={4}
              value={formData.finalAdvice}
              onChange={(e) => setFormData({ ...formData, finalAdvice: e.target.value })}
            />
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/95 dark:bg-background-dark/95 backdrop-blur-md p-4 border-t dark:border-gray-800 z-30">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full h-14 bg-primary text-white rounded-xl font-bold text-lg shadow-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center"
        >
          {loading ? 'Processing...' : 'Submit Experience'}
        </button>
        <div className="h-4"></div>
      </footer>
    </div>
  );
};

export default AddExperiencePage;
