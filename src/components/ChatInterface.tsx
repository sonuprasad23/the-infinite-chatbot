import React, { useEffect, useState, useRef } from 'react';
import { Send as SendIcon, ArrowLeft as ArrowLeftIcon, Bot as BotIcon, User as UserIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { marked } from 'marked';
import CodeBlock from './CodeBlock';
import ThinkingIndicator from './ThinkingIndicator';

const API_BASE_URL = import.meta.env.VITE_API_BACKEND_URL || 'http://127.0.0.1:5001';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  explanation: string;
  code?: string;
  language?: string;
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
  const [streamingMessage, setStreamingMessage] = useState<Message | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [thinkingStatus, setThinkingStatus] = useState<string | null>(null);
  const [sessionId] = useState<string>(`infinite_session_${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const welcomeMessage: Message = {
      id: `bot_welcome_${Date.now()}`,
      explanation: `Hello! I'm **${chatbotName}**. ${chatbotDescription} How can I assist you today?`,
      sender: 'bot',
    };
    setMessages([welcomeMessage]);
  }, [chatbotName, chatbotDescription]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage, thinkingStatus]);
  
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: Message = { id: `user_${Date.now()}`, explanation: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    
    const currentInput = inputValue;
    setInputValue('');
    setIsProcessing(true);
    if (chatbotId === 'coding') {
      setThinkingStatus("Initializing...");
    }

    const eventSource = new EventSource(`${API_BASE_URL}/chat?` + new URLSearchParams({
        sessionId: sessionId,
        personaId: chatbotId,
        message: currentInput,
    }));
    
    eventSource.onmessage = (event) => {
        if (event.data === "[DONE]") {
            setIsProcessing(false);
            setThinkingStatus(null);
            setStreamingMessage(prev => {
              if (prev) setMessages(current => [...current, prev]);
              return null;
            });
            eventSource.close();
            return;
        }
        
        const data = JSON.parse(event.data);

        if (data.status) {
            setThinkingStatus(data.status);
            return;
        }

        if (data.error) {
            const errorMsg = { id: `bot_error_${Date.now()}`, sender: 'bot' as const, explanation: `Sorry, an error occurred: ${data.error}`};
            setMessages(prev => [...prev, errorMsg]);
            setStreamingMessage(null);
            setIsProcessing(false);
            setThinkingStatus(null);
            eventSource.close();
            return;
        }

        setThinkingStatus(null); // A content chunk has arrived, stop showing "thinking"

        if (chatbotId === 'coding') {
            if (data.content) {
                setStreamingMessage({ id: `bot_${Date.now()}`, sender: 'bot', ...data.content });
            }
        } else { // Handle streaming text for other bots
            if (data.explanation_chunk) {
                setStreamingMessage(prev => {
                    if (prev) {
                        return { ...prev, explanation: prev.explanation + data.explanation_chunk };
                    }
                    return { id: `bot_${Date.now()}`, sender: 'bot', explanation: data.explanation_chunk };
                });
            }
        }
    };

    eventSource.onerror = (err) => {
        console.error("EventSource failed:", err);
        const errorMsg = { id: `bot_error_${Date.now()}`, sender: 'bot' as const, explanation: "Sorry, a connection error occurred." };
        setMessages(prev => [...prev, errorMsg]);
        setStreamingMessage(null);
        setIsProcessing(false);
        setThinkingStatus(null);
        eventSource.close();
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }
  };
  
  const createMarkup = (text: string) => ({ __html: marked(text, { gfm: true, breaks: true }) });

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
            {/* Render completed messages from history */}
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start max-w-[85%] md:max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${(message.sender === 'user' ? (darkMode ? 'bg-indigo-700' : 'bg-indigo-600') : primaryColor)} text-white ${message.sender === 'user' ? 'ml-2' : 'mr-2'}`}>
                        {message.sender === 'user' ? <UserIcon size={24} /> : <BotIcon size={20} />}
                    </div>
                    <div className={`rounded-2xl ${message.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm'}`}>
                        {message.explanation && <div className="px-4 py-3 prose dark:prose-invert max-w-none prose-p:my-0" dangerouslySetInnerHTML={createMarkup(message.explanation)} />}
                        {message.code && <CodeBlock code={message.code} language={message.language || ''} />}
                    </div>
                </div>
              </div>
            ))}

            {/* Render the currently streaming message */}
            {streamingMessage && (
                <div className={`flex justify-start`}>
                    <div className={`flex items-start max-w-[85%] md:max-w-[80%] flex-row`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${primaryColor} text-white mr-2`}>
                            <BotIcon size={20} />
                        </div>
                        <div className={`rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm`}>
                            {streamingMessage.explanation && <div className="px-4 py-3 prose dark:prose-invert max-w-none prose-p:my-0" dangerouslySetInnerHTML={createMarkup(streamingMessage.explanation)} />}
                            {streamingMessage.code && <CodeBlock code={streamingMessage.code} language={streamingMessage.language || ''} />}
                        </div>
                    </div>
                </div>
            )}
            
            {isProcessing && thinkingStatus && <ThinkingIndicator status={thinkingStatus} primaryColor={primaryColor} />}
            
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
                    disabled={isProcessing}
                />
                <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isProcessing}
                    className={`p-2 rounded-full transition-colors ${!inputValue.trim() || isProcessing ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : `${primaryColor} hover:opacity-80`} text-white`}
                >
                    <SendIcon size={18} />
                </button>
            </div>
        </div>
    </div>
  );
};

export default ChatInterface;