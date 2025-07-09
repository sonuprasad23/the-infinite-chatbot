import React, { useEffect, useState } from 'react';
interface TypingEffectProps {
  text: string;
  speed?: number;
  className?: string;
}
const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  speed = 30,
  className = ''
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  useEffect(() => {
    // Reset state when text changes
    setDisplayText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed]);
  return <span className={`${className} ${isComplete ? '' : 'after:content-["_|"] after:animate-pulse'}`}>
      {displayText}
    </span>;
};
export default TypingEffect;