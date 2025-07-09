import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatInterface from '../components/ChatInterface';
import { chatbots } from '../utils/chatbotData';

const ChatbotPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const chatbot = chatbots.find(bot => bot.id === id);

  if (!chatbot) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Chatbot not found</h1>
        <button onClick={() => navigate('/main')} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
          Return to Assistants
        </button>
      </div>
    );
  }

  const handleBack = () => {
    navigate('/main');
  };

  return (
    <ChatInterface
      chatbotId={chatbot.id}
      chatbotName={chatbot.title}
      chatbotDescription={chatbot.description}
      primaryColor={chatbot.bgColor}
      onBack={handleBack}
    />
  );
};

export default ChatbotPage;