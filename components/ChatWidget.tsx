import React, { useState, useRef, useEffect } from 'react';
import { streamGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import ReactMarkdown from 'react-markdown';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: 'Hi! I\'m Heidi. How can I help you optimize your workflow today?',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Create a placeholder for the model response
    const modelMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: modelMessageId,
      role: 'model',
      content: 'Thinking...',
      timestamp: Date.now()
    }]);

    try {
      // We pass the history excluding the last "Thinking..." placeholder
      const history = [...messages, userMessage]; 
      
      await streamGeminiResponse(history, input, (currentText) => {
        setMessages(prev => prev.map(msg => 
          msg.id === modelMessageId 
            ? { ...msg, content: currentText }
            : msg
        ));
      });
      
    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.id === modelMessageId 
          ? { ...msg, content: "Sorry, I encountered an error. Please check your API key or try again." }
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-heidi-dark-card border border-white/10 rounded-2xl shadow-2xl w-[90vw] md:w-96 h-[500px] flex flex-col overflow-hidden transition-all duration-300 animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-heidi-800 to-heidi-600 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <i className="fas fa-robot text-white text-sm"></i>
              </div>
              <h3 className="font-bold text-white">Heidi AI</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-heidi-dark-bg/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-heidi-600 text-white rounded-tr-none'
                      : 'bg-heidi-dark-card border border-white/10 text-gray-200 rounded-tl-none'
                  }`}
                >
                   {/* We assume ReactMarkdown is available or handle it simply */}
                   <div className="prose prose-invert prose-sm max-w-none">
                     <ReactMarkdown>{msg.content}</ReactMarkdown>
                   </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 bg-heidi-dark-card border-t border-white/10">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Heidi about CLI commands..."
                className="w-full bg-heidi-dark-bg border border-white/10 text-white rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:border-heidi-500 focus:ring-1 focus:ring-heidi-500 transition-all placeholder-gray-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`absolute right-2 p-2 rounded-lg ${
                  isLoading || !input.trim() 
                    ? 'text-gray-500 cursor-not-allowed' 
                    : 'text-heidi-400 hover:bg-white/10'
                }`}
              >
                {isLoading ? (
                  <i className="fas fa-circle-notch fa-spin"></i>
                ) : (
                  <i className="fas fa-paper-plane"></i>
                )}
              </button>
            </div>
            <div className="mt-2 text-center">
                <span className="text-[10px] text-gray-500">Powered by Gemini 2.5 Flash</span>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-105 ${
          isOpen 
            ? 'bg-heidi-dark-card border border-white/20 text-white' 
            : 'bg-gradient-to-r from-heidi-500 to-cyan-500 text-white'
        }`}
      >
        <i className={`fas ${isOpen ? 'fa-chevron-down' : 'fa-comment-alt'} text-xl`}></i>
      </button>
    </div>
  );
};

export default ChatWidget;
