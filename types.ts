
export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard'
}

export enum ExperienceStatus {
  PENDING = 'Pending Review',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  FLAGGED = 'Flagged'
}

export enum JobRole {
  SDE = 'Software Engineer',
  DATA_ANALYST = 'Data Analyst',
  INTERN = 'Internship',
  PM = 'Product Manager'
}

export interface Round {
  id: string;
  name: string;
  duration?: string;
  description: string;
  questions: { id: string; text: string; subText?: string }[];
  insiderTip?: string;
  type: 'Technical' | 'Aptitude' | 'HR' | 'System Design' | 'Other';
}

export interface Experience {
  id: string;
  company: string;
  companyLogo: string;
  role: string;
  year: number;
  date: string;
  difficulty: Difficulty;
  selected: boolean;
  location: string;
  contributor: {
    name: string;
    college: string;
    batch: string;
    avatar: string;
  };
  summary: string;
  rounds: Round[];
  status: ExperienceStatus;
  likes: number;
  comments: number;
  finalAdvice: string;
}

export interface Company {
  name: string;
  logo: string;
  isTrending: boolean;
}
