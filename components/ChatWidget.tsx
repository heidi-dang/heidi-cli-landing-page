import React, { useState, useRef, useEffect } from 'react';
import { streamGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import ReactMarkdown from 'react-markdown';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isThinkingMode, setIsThinkingMode] = useState(false);
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
      content: isThinkingMode ? 'Thinking deeply...' : '...',
      timestamp: Date.now()
    }]);

    try {
      const history = [...messages, userMessage]; 
      
      await streamGeminiResponse(history, input, (currentText) => {
        setMessages(prev => prev.map(msg => 
          msg.id === modelMessageId 
            ? { ...msg, content: currentText }
            : msg
        ));
      }, { useThinking: isThinkingMode });
      
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
        <div className="glass border border-white/10 rounded-2xl shadow-2xl w-[90vw] md:w-96 h-[550px] flex flex-col overflow-hidden transition-all duration-300 animate-fade-in-up origin-bottom-right">
          {/* Header */}
          <div className="bg-gradient-to-r from-heidi-900/90 to-heidi-800/90 p-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/10">
                <i className="fas fa-robot text-heidi-300 text-sm"></i>
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Heidi AI</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] text-gray-300">Online</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsThinkingMode(!isThinkingMode)}
                className={`text-xs px-2 py-1 rounded-md border transition-all flex items-center gap-1.5 ${
                  isThinkingMode 
                    ? 'bg-purple-500/20 text-purple-200 border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.2)]' 
                    : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                }`}
                title={isThinkingMode ? "Disable Deep Thinking" : "Enable Gemini 3 Pro Deep Thinking"}
              >
                <i className={`fas fa-brain ${isThinkingMode ? 'text-purple-300 animate-pulse' : ''}`}></i>
                <span className="hidden sm:inline">{isThinkingMode ? 'Deep Think' : 'Fast'}</span>
              </button>

              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                {msg.role === 'model' && (
                  <div className="w-8 h-8 rounded-full bg-heidi-900/80 border border-white/10 flex items-center justify-center mr-2 flex-shrink-0 text-xs text-heidi-400 font-bold">
                    H
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-heidi-600 to-heidi-700 text-white rounded-tr-none'
                      : 'bg-[#1e293b] border border-white/5 text-gray-200 rounded-tl-none'
                  }`}
                >
                   {msg.content === '...' || msg.content === 'Thinking deeply...' ? (
                     <div className="flex items-center space-x-2 h-5">
                       {isThinkingMode && <i className="fas fa-brain text-purple-400 text-xs animate-pulse"></i>}
                       <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                       </div>
                     </div>
                   ) : (
                     <div className="prose prose-invert prose-sm max-w-none leading-relaxed">
                       <ReactMarkdown>{msg.content}</ReactMarkdown>
                     </div>
                   )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 bg-[#1e293b]/50 border-t border-white/10 backdrop-blur-md">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isThinkingMode ? "Ask a complex question..." : "Ask about commands..."}
                className={`w-full bg-black/30 border text-white rounded-full pl-5 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 transition-all placeholder-gray-500 ${
                  isThinkingMode 
                    ? 'border-purple-500/30 focus:border-purple-500/50 focus:ring-purple-500/20' 
                    : 'border-white/10 focus:border-heidi-500/50 focus:ring-heidi-500/20'
                }`}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`absolute right-2 p-2 rounded-full w-9 h-9 flex items-center justify-center transition-all ${
                  isLoading || !input.trim() 
                    ? 'text-gray-500 cursor-not-allowed bg-transparent' 
                    : isThinkingMode 
                      ? 'text-white bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-500/20'
                      : 'text-white bg-heidi-600 hover:bg-heidi-500 shadow-lg'
                }`}
              >
                {isLoading ? (
                  <i className="fas fa-circle-notch fa-spin text-xs"></i>
                ) : (
                  <i className="fas fa-arrow-up text-xs"></i>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center justify-center transition-all transform hover:scale-105 hover:rotate-3 ${
          isOpen 
            ? 'bg-heidi-dark-card border border-white/20 text-white rotate-180' 
            : 'bg-gradient-to-r from-heidi-500 to-emerald-600 text-white animate-bounce-slow'
        }`}
      >
        <i className={`fas ${isOpen ? 'fa-chevron-down' : 'fa-comment-alt'} text-xl`}></i>
      </button>
    </div>
  );
};

export default ChatWidget;