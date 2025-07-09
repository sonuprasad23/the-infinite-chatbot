import React, { useEffect, useState, useRef } from 'react';
import { SendIcon, ArrowLeftIcon, BotIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { marked } from 'marked';

const API_BASE_URL = import.meta.env.VITE_API_BACKEND_URL;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatInterfaceProps {
  chatbotId: string;
  chatbotName: string;
  chatbotDescription: string;
  primaryColor: string;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ chatbotId, chatbotName, chatbotDescription, primaryColor, onBack }) => {
  const { darkMode } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState<string>(`shunya_session_${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    setIsTyping(true);
    const welcomeTimer = setTimeout(() => {
      const welcomeMessage: Message = {
        id: `bot_welcome_${Date.now()}`,
        text: `Hello! I'm ${chatbotName}, your specialized assistant for ${chatbotDescription.toLowerCase()}. How can I help you today?`,
        sender: 'bot',
      };
      setMessages([welcomeMessage]);
      setIsTyping(false);
    }, 1200);

    return () => clearTimeout(welcomeTimer);
  }, [chatbotName, chatbotDescription]);
  
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping || !API_BASE_URL) return;

    const userMessage: Message = { id: `user_${Date.now()}`, text: inputValue, sender: 'user' };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    let isFirstChunk = true;
    const botMessageId = `bot_${Date.now()}`;

    const eventSource = new EventSource(`${API_BASE_URL}/chat?` + new URLSearchParams({
        sessionId: sessionId,
        personaId: chatbotId,
        message: currentInput,
    }));
    
    eventSource.onmessage = (event) => {
        if (event.data === "[DONE]") {
            setIsTyping(false);
            eventSource.close();
            return;
        }

        const data = JSON.parse(event.data);

        if (data.error) {
            const errorMessage = `Sorry, an error occurred: ${data.error}`;
            if (isFirstChunk) {
                setIsTyping(false);
                setMessages(prev => [...prev, { id: botMessageId, text: errorMessage, sender: 'bot' }]);
                isFirstChunk = false;
            } else {
                setMessages(prev => prev.map(msg => msg.id === botMessageId ? { ...msg, text: errorMessage } : msg));
            }
            setIsTyping(false);
            eventSource.close();
            return;
        }
        
        if (data.chunk) {
            if (isFirstChunk) {
                setIsTyping(false);
                setMessages(prev => [...prev, { id: botMessageId, text: data.chunk, sender: 'bot' }]);
                isFirstChunk = false;
            } else {
                setMessages(prev => prev.map(msg => 
                    msg.id === botMessageId ? { ...msg, text: msg.text + data.chunk } : msg
                ));
            }
        }
    };

    eventSource.onerror = (err) => {
        console.error("EventSource failed:", err);
        const errorMessage = "Sorry, a connection error occurred. Please check your connection and try again.";
        if (isFirstChunk) {
            setIsTyping(false);
            setMessages(prev => [...prev, { id: botMessageId, text: errorMessage, sender: 'bot' }]);
        } else {
            setMessages(prev => prev.map(msg => msg.id === botMessageId ? { ...msg, text: `${msg.text}\n\n${errorMessage}` } : msg));
        }
        setIsTyping(false);
        eventSource.close();
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getUserAvatarClass = () => {
    return darkMode ? 'bg-indigo-700 text-white' : 'bg-indigo-600 text-white';
  };
  
  const createMarkup = (text: string) => {
    const rawMarkup = marked(text, { gfm: true, breaks: true });
    return { __html: rawMarkup };
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
        <div className={`px-4 py-3 ${primaryColor} text-white flex items-center shadow-md flex-shrink-0`}>
            <button onClick={onBack} className="mr-3 p-1 rounded-full hover:bg-white/20 transition-colors" aria-label="Go back">
                <ArrowLeftIcon size={20} />
            </button>
            <div className="flex-1 text-center">
                <h1 className="font-bold text-xl">{chatbotName}</h1>
                <p className="text-xs text-white/80">AI Assistant</p>
            </div>
            <div className="w-8"></div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
            {messages.map(message => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user' ? getUserAvatarClass() : `${primaryColor} text-white`} ${message.sender === 'user' ? 'ml-2' : 'mr-2'}`}>
                    {message.sender === 'user' ? <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 12c-3.31 0-6 2.69-6 6v2h12v-2c0-3.31-2.69-6-6-6z"/></svg> : <BotIcon size={20} />}
                </div>
                <div className={`rounded-2xl px-4 py-3 prose dark:prose-invert prose-p:my-0 prose-headings:my-0 ${message.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm'}`} dangerouslySetInnerHTML={createMarkup(message.text)}>
                </div>
                </div>
            </div>
            ))}
            {isTyping && (
            <div className="flex justify-start">
                <div className="flex items-end max-w-[80%] flex-row">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${primaryColor} text-white mr-2`}>
                    <BotIcon size={20} />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-white dark:bg-gray-800 rounded-tl-none shadow-sm">
                    <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
                </div>
            </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 flex-shrink-0">
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
            <textarea
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={`Ask ${chatbotName} anything...`}
                className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-800 dark:text-gray-200 resize-none max-h-24 py-1"
                rows={1}
            />
            <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={`p-2 rounded-full transition-colors ${!inputValue.trim() || isTyping ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : `${primaryColor} hover:opacity-80`} text-white`}
            >
                <SendIcon size={18} />
            </button>
            </div>
        </div>
    </div>
  );
};

export default ChatInterface;