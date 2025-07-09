import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
interface ChatbotOptionProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  userTypes: string[];
  features: string[];
  bgColor: string;
  textColor: string;
}
const ChatbotOption: React.FC<ChatbotOptionProps> = ({
  id,
  title,
  description,
  icon,
  userTypes,
  features,
  bgColor,
  textColor
}) => {
  return <div className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${bgColor}`}>
      <div className="p-6">
        <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className={`text-xl font-bold mb-2 ${textColor}`}>{title}</h3>
        <p className={`mb-4 ${textColor} opacity-90`}>{description}</p>
        <div className="mb-4">
          <h4 className={`text-sm font-semibold mb-2 ${textColor}`}>
            Perfect for:
          </h4>
          <div className="flex flex-wrap gap-2">
            {userTypes.map((type, index) => <span key={index} className={`text-xs px-2 py-1 rounded-full bg-white bg-opacity-20 ${textColor}`}>
                {type}
              </span>)}
          </div>
        </div>
        <div className="mb-6">
          <h4 className={`text-sm font-semibold mb-2 ${textColor}`}>
            Features:
          </h4>
          <ul className="space-y-1">
            {features.map((feature, index) => <li key={index} className={`text-sm flex items-start ${textColor} opacity-90`}>
                <span className="mr-2">•</span>
                {feature}
              </li>)}
          </ul>
        </div>
        <Link to={`/chatbot/${id}`} className={`inline-flex items-center justify-center w-full py-2 px-4 rounded-lg bg-white bg-opacity-20 ${textColor} font-medium hover:bg-opacity-30 transition-all`}>
          Try it now <ArrowRightIcon size={16} className="ml-1" />
        </Link>
      </div>
    </div>;
};
export default ChatbotOption;