import React from 'react';
import { SigmaIcon, MicroscopeIcon, HeartPulseIcon, Code2Icon } from 'lucide-react';

export interface ChatbotData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  userTypes: string[];
  features: string[];
  bgColor: string;
  textColor: string;
}

export const chatbots: ChatbotData[] = [{
  id: 'coding',
  title: 'Deva - Coding Assistant',
  description: 'Your expert pair programmer for algorithms, databases, web dev, and more. Get clean code and clear explanations.',
  icon: <Code2Icon size={24} className="text-white" />,
  userTypes: ['Developers', 'Students', 'Interview Prep'],
  features: ['Generates code in any language', 'Explains complex algorithms', 'Debugs and optimizes your code', 'Structured code & text output'],
  bgColor: 'bg-gradient-to-br from-blue-600 to-indigo-800',
  textColor: 'text-white'
}, {
  id: 'biology',
  title: 'BioBuddy - Biology Tutor',
  description: 'An adaptive AI tutor that makes learning biology engaging and effective, one question at a time.',
  icon: <MicroscopeIcon size={24} className="text-white" />,
  userTypes: ['High School Students', 'College Students', 'Lifelong Learners'],
  features: ['Adaptive question difficulty', 'Encourages critical thinking', 'Personalized feedback', 'Summarizes study sessions'],
  bgColor: 'bg-gradient-to-br from-cyan-500 to-teal-600',
  textColor: 'text-white'
}, {
  id: 'finance',
  title: 'FinBot - Finance Explainer',
  description: 'Demystifying complex financial topics with clear, educational insights. No advice, just knowledge.',
  icon: <SigmaIcon size={24} className="text-white" />,
  userTypes: ['Beginners', 'Students', 'Curious Minds'],
  features: ['Simplifies stocks, bonds, and crypto', 'Uses real-world analogies', 'Educational focus, never advice', 'Built-in safety disclaimers'],
  bgColor: 'bg-gradient-to-br from-yellow-500 to-amber-600',
  textColor: 'text-white'
}, {
  id: 'maternal',
  title: 'WellMom - Health Guide',
  description: 'A warm, empathetic guide for educational support through the journey of maternity.',
  icon: <HeartPulseIcon size={24} className="text-white" />,
  userTypes: ['Expectant Mothers', 'New Parents', 'Partners & Family'],
  features: ['Empathetic & supportive tone', 'Provides general, safe information', 'Focus on well-being and knowledge', 'Always recommends consulting a doctor'],
  bgColor: 'bg-gradient-to-br from-fuchsia-600 to-purple-700',
  textColor: 'text-white'
}];