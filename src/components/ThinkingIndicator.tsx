import React from 'react';
import { Bot as BotIcon } from 'lucide-react';

interface ThinkingIndicatorProps {
  status: string;
  primaryColor: string;
}

const ThinkingIndicator: React.FC<ThinkingIndicatorProps> = ({ status, primaryColor }) => {
  return (
    <div className="flex justify-start">
      <div className="flex items-end max-w-[80%] flex-row">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${primaryColor} text-white mr-2`}>
          <BotIcon size={20} className="animate-pulse" />
        </div>
        <div className="rounded-2xl px-4 py-3 bg-white dark:bg-gray-800 rounded-tl-none shadow-sm">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 text-sm">
            <span>{status}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThinkingIndicator;