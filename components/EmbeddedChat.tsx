import React, { useState, useRef, useEffect } from 'react';
import { streamGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import ReactMarkdown from 'react-markdown';

const EmbeddedChat: React.FC = () => {
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: 'Hello! I am Heidi, running on **Gemini 2.5**. \n\nI can help you analyze logs, fix git conflicts, or generate code. Try asking me something complex!',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    const modelMessageId = (Date.now() + 1).toString();
    const initialModelMessage: ChatMessage = {
      id: modelMessageId,
      role: 'model',
      content: isThinkingMode ? 'Thinking deeply...' : '...',
      timestamp: Date.now()
    };

    // Batch updates to prevent double render/scroll jitter
    setMessages(prev => [...prev, userMessage, initialModelMessage]);
    setInput('');
    setIsLoading(true);

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
          ? { ...msg, content: "Connection error. Please check your API key." }
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0D1117]/60 rounded-xl border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col h-[350px] sm:h-[420px] font-mono text-sm">
      {/* Window Controls & Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161B22]/80 border-b border-white/5 shrink-0 backdrop-blur-sm">
        <div className="flex space-x-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F] hover:bg-[#27C93F]/80 transition-colors"></div>
        </div>
        <div className="text-xs text-gray-500 font-medium select-none hidden sm:flex items-center gap-2 truncate px-2">
          heidi-cli — interactive
        </div>
        <div className="flex items-center shrink-0">
           <button 
             onClick={() => setIsThinkingMode(!isThinkingMode)}
             className={`text-[10px] px-2 py-0.5 rounded border transition-all flex items-center gap-1 ${
               isThinkingMode 
                 ? 'bg-purple-900/30 text-purple-300 border-purple-500/50' 
                 : 'bg-white/5 text-gray-500 border-white/10 hover:text-gray-300'
             }`}
           >
             <i className={`fas fa-brain ${isThinkingMode ? 'animate-pulse' : ''}`}></i>
             <span className="hidden xs:inline">{isThinkingMode ? 'Deep Think ON' : 'Deep Think OFF'}</span>
             <span className="inline xs:hidden">{isThinkingMode ? 'ON' : 'OFF'}</span>
           </button>
        </div>
      </div>
      
      {/* Chat Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar scroll-smooth overscroll-contain"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`group ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block max-w-[90%] ${msg.role === 'user' ? 'text-gray-100' : 'text-gray-300'}`}>
              {msg.role === 'user' && <span className="text-heidi-400 mr-2 select-none">$</span>}
              {msg.role === 'model' && <span className="text-heidi-500 mr-2 select-none font-bold">›</span>}
              
              <div className={`inline-block ${msg.role === 'model' ? 'align-top' : ''}`}>
                 {msg.content === '...' || msg.content === 'Thinking deeply...' ? (
                   <span className="animate-pulse text-gray-500">{msg.content}</span>
                 ) : (
                   <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-pre:bg-[#161b22]/50 prose-pre:border prose-pre:border-white/10 break-words">
                     <ReactMarkdown>{msg.content}</ReactMarkdown>
                   </div>
                 )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#161B22]/80 border-t border-white/5 shrink-0 backdrop-blur-sm">
         <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-heidi-400 select-none font-bold">❯</span>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a command..."
              className="w-full bg-transparent border-none focus:ring-0 text-gray-100 placeholder-gray-600 focus:outline-none py-1 min-w-0"
              style={{ fontSize: '16px' }} 
              disabled={isLoading}
            />
            {isLoading && <i className="fas fa-circle-notch fa-spin text-gray-500 shrink-0"></i>}
         </form>
      </div>
    </div>
  );
};

export default EmbeddedChat;