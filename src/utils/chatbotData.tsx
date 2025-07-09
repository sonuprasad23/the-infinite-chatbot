import React from 'react';
import { LineChartIcon, BookOpenIcon, HeartPulseIcon } from 'lucide-react';

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
  id: 'finance',
  title: 'Finance Explainer',
  description: 'Your personal financial advisor and educator, making complex financial concepts simple.',
  icon: <LineChartIcon size={24} className="text-white" />,
  userTypes: ['Students', 'Investors', 'Professionals', 'Business Owners'],
  features: ['Explains complex financial concepts in simple terms', 'Provides investment strategy advice', 'Helps with budgeting and financial planning', 'Offers market trend analysis and insights'],
  bgColor: 'bg-emerald-600',
  textColor: 'text-white'
}, {
  id: 'biology',
  title: 'Biology Tutor',
  description: 'Learn biology concepts at your own pace with personalized explanations and examples.',
  icon: <BookOpenIcon size={24} className="text-white" />,
  userTypes: ['Students', 'Teachers', 'Researchers', 'Science Enthusiasts'],
  features: ['Explains biological concepts with clear examples', 'Helps with homework and exam preparation', 'Provides visual explanations of complex processes', 'Answers questions about recent research and discoveries'],
  bgColor: 'bg-blue-600',
  textColor: 'text-white'
}, {
  id: 'maternal',
  title: 'Maternal Health Guide',
  description: 'Supportive guidance through pregnancy, childbirth, and early parenting stages.',
  icon: <HeartPulseIcon size={24} className="text-white" />,
  userTypes: ['Expectant Parents', 'New Parents', 'Healthcare Providers', 'Caregivers'],
  features: ['Provides evidence-based information on maternal health', 'Offers week-by-week pregnancy guidance', 'Answers questions about infant care and development', 'Connects users with relevant resources and support'],
  bgColor: 'bg-purple-600',
  textColor: 'text-white'
}];