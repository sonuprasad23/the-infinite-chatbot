import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Welcome from './pages/Welcome';
import Main from './pages/Main';
import ChatbotPage from './pages/ChatbotPage';
export function App() {
  return <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/main" element={<Main />} />
          <Route path="/chatbot/:id" element={<ChatbotPage />} />
        </Routes>
      </Router>
    </ThemeProvider>;
}