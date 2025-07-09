import React, { useEffect, useState } from 'react';
interface VoiceRecorderProps {
  isRecording: boolean;
  primaryColor: string;
}
const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  isRecording,
  primaryColor
}) => {
  const [levels, setLevels] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);
  useEffect(() => {
    if (!isRecording) {
      setLevels([0, 0, 0, 0, 0, 0, 0, 0]);
      return;
    }
    const interval = setInterval(() => {
      setLevels(prev => prev.map(() => Math.max(0.3, Math.random() * 0.7 + 0.3)));
    }, 150);
    return () => clearInterval(interval);
  }, [isRecording]);
  if (!isRecording) return null;
  return <div className="flex items-center justify-center space-x-1 py-4">
      {levels.map((level, index) => <div key={index} className={`w-1 rounded-full ${primaryColor.replace('bg-', 'bg-opacity-80 bg-')}`} style={{
      height: `${level * 24}px`,
      transition: 'height 0.15s ease-in-out'
    }} />)}
    </div>;
};
export default VoiceRecorder;