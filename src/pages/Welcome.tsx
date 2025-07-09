import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TypingEffect from '../components/TypingEffect';
const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/main');
    }, 3000);
    // Progress bar animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) return prev + 3.33;
        return 100;
      });
    }, 100);
    return () => {
      clearTimeout(redirectTimer);
      clearInterval(interval);
    };
  }, [navigate]);
  return <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-indigo-950 transition-colors duration-300 w-full">
      <div className="text-center p-8 max-w-lg">
        {/* Added large logo */}
        <div className="flex justify-center mb-8">
          <img src="/white.png" alt="The Infinite Logo" className="h-72 w-auto" /* Added large logo (3x size) */ />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          <TypingEffect text="Hello User, Welcome to The Infinite" speed={40} />
        </h1>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-8 overflow-hidden">
          <div className="bg-indigo-600 h-2 rounded-full transition-all duration-100 ease-out" style={{
          width: `${progress}%`
        }} />
        </div>
        <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm">
          Redirecting to main page...
        </p>
      </div>
    </div>;
};
export default Welcome;