import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatbotOption from '../components/ChatbotOption';
import { chatbots } from '../utils/chatbotData.tsx';
import TypingEffect from '../components/TypingEffect';
import { BrainIcon, CodeIcon, CreditCardIcon, UsersIcon, CheckCircleIcon, StarIcon, ZapIcon, ShieldIcon } from 'lucide-react';

const Main: React.FC = () => {
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      {/* Hero Section */}
      <section className="pt-28 pb-20 px-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 opacity-90"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block px-3 py-1 rounded-full bg-white bg-opacity-20 text-white text-sm font-medium mb-6">
            AI-Powered Specialized Assistants
          </div>
          <div className="flex justify-center mb-6">
            <img src="/The_Infinite-removebg-preview.png" alt="The Infinite Logo" className="h-72 w-auto" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <TypingEffect text="Welcome to The Infinite" speed={40} />
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90 mb-8">
            Specialized AI chatbots designed for your unique needs
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="#chatbots" className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-full hover:bg-opacity-90 transition-colors shadow-lg">
              Explore Chatbots
            </a>
            <a href="#demo" className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:bg-opacity-10 transition-colors">
              View Demos
            </a>
          </div>
          <div className="flex justify-center mt-12 space-x-8">
            <div className="flex items-center">
              <StarIcon className="text-yellow-300 mr-2" size={20} />
              <span className="text-white">4.9/5 Rating</span>
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="text-green-300 mr-2" size={20} />
              <span className="text-white">10,000+ Users</span>
            </div>
            <div className="flex items-center">
              <ShieldIcon className="text-blue-300 mr-2" size={20} />
              <span className="text-white">Secure & Private</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
      </section>
      {/* Chatbot Options */}
      <section id="chatbots" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-4">
              <ZapIcon className="text-indigo-600 dark:text-indigo-400" size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Choose Your Infinite Assistant
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our specialized AI chatbots are designed to provide expert
              assistance in specific domains
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
            {chatbots.map(chatbot => <ChatbotOption key={chatbot.id} id={chatbot.id} title={chatbot.title} description={chatbot.description} icon={chatbot.icon} userTypes={chatbot.userTypes} features={chatbot.features} bgColor={chatbot.bgColor} textColor={chatbot.textColor} />)}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
              <StarIcon className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Why Choose The Infinite
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover the features that make our AI chatbots stand out
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
                <BrainIcon className="text-indigo-600 dark:text-indigo-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                Specialized Knowledge
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our chatbots are trained on domain-specific data to provide
                expert-level assistance
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4">
                <ZapIcon className="text-emerald-600 dark:text-emerald-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                Instant Responses
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get immediate answers to your questions with our fast-responding
                AI assistants
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <ShieldIcon className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                Privacy Focused
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your conversations are private and secure with our encrypted
                communication channels
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                <UsersIcon className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                Personalized Experience
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI adapts to your needs and preferences for a tailored
                conversation experience
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Demo Section */}
      <section id="demo" className="py-20 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <CodeIcon className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Try Our Demo Versions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the power of our AI chatbots with different
              subscription plans
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 transition-all duration-300 hover:shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8">
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 transform rotate-45"></div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                Basic
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Experience the core features with our free version
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-600 dark:text-gray-300">
                  <CheckCircleIcon className="mr-2 text-green-500 flex-shrink-0" size={18} />
                  <span>Basic Q&A functionality</span>
                </li>
                <li className="flex items-start text-gray-600 dark:text-gray-300">
                  <CheckCircleIcon className="mr-2 text-green-500 flex-shrink-0" size={18} />
                  <span>Limited daily questions</span>
                </li>
                <li className="flex items-start text-gray-600 dark:text-gray-300">
                  <CheckCircleIcon className="mr-2 text-green-500 flex-shrink-0" size={18} />
                  <span>Standard response time</span>
                </li>
              </ul>
              <button className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                Try Basic
              </button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 transition-all duration-300 hover:shadow-lg border-2 border-indigo-500 transform scale-105 relative z-10">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                Premium
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Enhanced features for serious users
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-600 dark:text-gray-300">
                  <CheckCircleIcon className="mr-2 text-green-500 flex-shrink-0" size={18} />
                  <span>Advanced specialized knowledge</span>
                </li>
                <li className="flex items-start text-gray-600 dark:text-gray-300">
                  <CheckCircleIcon className="mr-2 text-green-500 flex-shrink-0" size={18} />
                  <span>Unlimited questions</span>
                </li>
                <li className="flex items-start text-gray-600 dark:text-gray-300">
                  <CheckCircleIcon className="mr-2 text-green-500 flex-shrink-0" size={18} />
                  <span>Faster response time</span>
                </li>
                <li className="flex items-start text-gray-600 dark:text-gray-300">
                  <CheckCircleIcon className="mr-2 text-green-500 flex-shrink-0" size={18} />
                  <span>Save conversation history</span>
                </li>
              </ul>
              <button className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-colors shadow-md">
                Try Premium
              </button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 transition-all duration-300 hover:shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8">
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 transform rotate-45"></div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                Enterprise
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Custom solutions for organizations
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-600 dark:text-gray-300">
                  <CheckCircleIcon className="mr-2 text-green-500 flex-shrink-0" size={18} />
                  <span>All Premium features</span>
                </li>
                <li className="flex items-start text-gray-600 dark:text-gray-300">
                  <CheckCircleIcon className="mr-2 text-green-500 flex-shrink-0" size={18} />
                  <span>Custom training on your data</span>
                </li>
                <li className="flex items-start text-gray-600 dark:text-gray-300">
                  <CheckCircleIcon className="mr-2 text-green-500 flex-shrink-0" size={18} />
                  <span>API access</span>
                </li>
                <li className="flex items-start text-gray-600 dark:text-gray-300">
                  <CheckCircleIcon className="mr-2 text-green-500 flex-shrink-0" size={18} />
                  <span>Dedicated support</span>
                </li>
              </ul>
              <button className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>;
};

export default Main;