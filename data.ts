
import { Experience, Difficulty, ExperienceStatus, Company } from './types';

export const COMPANIES: Company[] = [
  { name: 'Google', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXBPwtxV8km9QKXhP2Sk_vh9QfiYhuI7mJ_3gXejvWn0Zy-yIedg3OC1FcDILpv1IiA8YFNV5kpXk1RNagIuyRPLyaq3rKklGxxbmgfTRLUIQLHoMSxCNW6KJi8jRTuQXjafbk4BabttyMf2I3u4m8Tm1BQ0FTMPOl84dxDu_8TTNKRi5W_ngGvZXSiIcK5wSO4PQpDo70FCtdkNkT6NTlxc1Emai4rrjNx2ICmU-4k-baVhaHgBaR2dNEZJRxwd01ErGEeLXVcjs', isTrending: true },
  { name: 'Amazon', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQlZet06de8Rbr8Rk4YCIBlb_Y6l6-ZcMd5oSmMH7F7b44DblgV0JTv-B-shlo_ebAkZIPCDKqJmGDewxABILAqaxMleYXLKFczgYOotJLYah1uPvNJjXRk1pr7jsRokPV0_lo3_zu1kkbeMBlMV27LChKzcDI0ADaivoo0c01FMeuyAby8lTlNPV-9fSZevxrw4f92URpqAP_2oNgF891pW0kha5-p242zc2fInEBZxkRhhc58yqtERXLTG0zj2tLm7uwXHGdiRw', isTrending: true },
  { name: 'Meta', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIyiJy2LhJCDyq5HrIR-WSRPcNq9q3y9Q99cNGMeJZKakurTNjBzgklebJh-k5SH4XzEXiGMY0ccD_K01FDq_OsANrb9Vl3h-ScIWmPmsv8uR1uiqXXxkTBD8g3V_dMGbXInGqOqt0x_D73iTu_FePMqgwjmuSoiOyrH1KvOGWDQGYyfMJ4vimwWiv9bHUdUnrRQOzeV0QxbL4GOFw9NcbzG4-2PQPuray0MUv1ZkJ3THrHV7I9OGKr14yghjW-rUq-bSpYlTMD6U', isTrending: true },
  { name: 'Microsoft', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMk9ju29p1qR5jusAmFDt0-sVjfVpHZKUWlj5nP8wC7HDChFHpnw7KLqmFzlgG7Y28lH7MQ7lv8ArV1oipDzUmOeMCwWYRk-EYJn51jTMtydVtuvUaE1fc6yfQUnoaf0TADIJ-PVkgVOvaa3yg7Qni9eLSV3mmoHSA-W1BhsePTxPcuPoAL_P-dZ7021S5ifBlxDIRiOHvjdbL2WU8oJdootpy3QdsYkGi1YFxcgQIGIPygn-yfeFUKeXvw2I6d7Tn9xWNhc3QsrE', isTrending: true },
  { name: 'Apple', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOEOWazCHFGHsVRn5TVvLCsH5YmYFn1n6kZOjGA0vyPymKZPTMbJH0CiWLiWqKdFvb_I0B2I5uGkubsIi8yCodRT-2WJHBg9915xd5MRrf61JxAdayTp1mMjUNSYZkKK2VwQIqDgXaaBRHVKS0AlgDW95R6p6Ss2ygoxAXOITHal5v42SR_bkjzoEs61CQj4ELNR-6kPIKMTKiFZFJ7VhlsbGu71Cd3YSVM3Qf2meNKpNpIPYoseredBw8KZsFYnQX0maQ2_c9NIk', isTrending: true }
];

export const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: '1',
    company: 'Google',
    companyLogo: COMPANIES[0].logo,
    role: 'Software Engineer',
    year: 2024,
    date: 'Oct 12, 2023',
    difficulty: Difficulty.MEDIUM,
    selected: true,
    location: 'Mountain View, CA',
    contributor: {
      name: 'Arjun Sharma',
      college: 'IIT Bombay',
      batch: 'CSE \'24',
      avatar: 'https://picsum.photos/seed/arjun/100/100'
    },
    summary: 'The interview process had 3 technical rounds focusing on Data Structures and Algorithms. The system design round was particularly challenging.',
    status: ExperienceStatus.APPROVED,
    likes: 1200,
    comments: 45,
    finalAdvice: 'Use the STAR method for all behavioral answers. Think out loud during coding rounds.',
    rounds: [
      {
        id: 'r1',
        name: 'Aptitude & Assessment',
        type: 'Aptitude',
        duration: '60 Mins',
        description: 'Focused on logical reasoning, quantitative analysis, and basic coding snippets.',
        questions: [
          { id: 'q1', text: 'Probability & Statistics', subText: 'Find the probability of rolling a sum of 7 with two fair dice.' },
          { id: 'q2', text: 'Code Debugging', subText: 'Identify the logic error in a given binary search implementation.' }
        ],
        insiderTip: 'Practice speed math. The time limit is very tight for the quant section.'
      },
      {
        id: 'r2',
        name: 'Technical Coding',
        type: 'Technical',
        duration: '45 Mins',
        description: 'One-on-one coding round via Google Meet. Focused on DSA.',
        questions: [
          { id: 'q3', text: 'LRU Cache Implementation', subText: 'Implement an LRU cache with get and put methods in O(1).' }
        ],
        insiderTip: 'Think out loud. The interviewer cares more about your process than the final code.'
      }
    ]
  },
  {
    id: '2',
    company: 'Amazon',
    companyLogo: COMPANIES[1].logo,
    role: 'SDE-1',
    year: 2024,
    date: 'Sep 28, 2023',
    difficulty: Difficulty.HARD,
    selected: false,
    location: 'Bangalore, IN',
    contributor: {
      name: 'Rahul Verma',
      college: 'NIT Trichy',
      batch: 'ECE \'24',
      avatar: 'https://picsum.photos/seed/rahul/100/100'
    },
    summary: 'Leadership principles are the core. I was asked several behavioral questions that needed STAR format answers. Technicals were moderate.',
    status: ExperienceStatus.PENDING,
    likes: 340,
    comments: 12,
    finalAdvice: 'Read the leadership principles twice before the interview.',
    rounds: [
      {
        id: 'r1',
        name: 'Online Assessment',
        type: 'Aptitude',
        description: 'Standard Amazon OA with 2 coding questions.',
        questions: [{ id: 'q1', text: 'Array Manipulation' }],
        insiderTip: 'Don\'t skip the behavioral assessment part of the OA.'
      }
    ]
  }
];
