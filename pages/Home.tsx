import React, { useState } from 'react';
import { FeatureCardProps } from '../types';
import EmbeddedChat from '../components/EmbeddedChat';

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-heidi-dark-card/40 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:bg-heidi-dark-card/60 hover:border-heidi-500/30 transition-all duration-300 group h-full hover:shadow-lg hover:shadow-heidi-500/5 hover:-translate-y-1">
    <div className="h-12 w-12 rounded-xl bg-heidi-500/10 flex items-center justify-center mb-4 group-hover:bg-heidi-500/20 group-hover:scale-110 transition-all duration-300">
      <i className={`fas ${icon} text-2xl text-heidi-400 group-hover:text-heidi-300`}></i>
    </div>
    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-heidi-100 transition-colors">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">{description}</p>
  </div>
);

const InstallSnippet: React.FC = () => {
  const [method, setMethod] = useState<'curl' | 'pipx' | 'pip'>('curl');
  const [copied, setCopied] = useState(false);

  const commands = {
    curl: 'bash -c "$(curl -fsSL https://raw.githubusercontent.com/heidi-dang/heidi-cli/main/install.sh)"',
    pipx: 'pipx install heidi-cli',
    pip: 'pip install heidi-cli'
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(commands[method]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0 mb-8 font-mono text-sm">
      {/* Install Box */}
      <div className="bg-[#0D1117]/80 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md shadow-xl">
        {/* Tabs */}
        <div className="flex border-b border-white/5 bg-white/5">
          {(['curl', 'pipx', 'pip'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`px-4 py-2 text-xs font-medium transition-colors border-r border-white/5 ${
                method === m 
                  ? 'bg-heidi-500/10 text-heidi-400' 
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        
        {/* Command Display */}
        <div className="p-4 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors" onClick={handleCopy}>
          <div className="flex items-center overflow-x-auto custom-scrollbar">
            <span className="text-heidi-500 mr-3 select-none">$</span>
            <code className="text-gray-200 whitespace-nowrap">{commands[method]}</code>
          </div>
          <button 
            className="ml-3 text-gray-500 group-hover:text-white transition-colors focus:outline-none"
            title="Copy to clipboard"
          >
            <i className={`fas ${copied ? 'fa-check text-green-400' : 'fa-copy'}`}></i>
          </button>
        </div>
      </div>

      {/* Quickstart Lines */}
      <div className="mt-3 pl-4 space-y-1.5 text-xs text-gray-500 border-l-2 border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 select-none">$</span>
          <span className="text-gray-400">heidi setup</span>
          <span className="text-gray-600 italic ml-2 hidden sm:inline"># configure api keys</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 select-none">$</span>
          <span className="text-gray-400">heidi doctor</span>
          <span className="text-gray-600 italic ml-2 hidden sm:inline"># check environment</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 select-none">$</span>
          <span className="text-gray-400">heidi --plain "hello"</span>
          <span className="text-gray-600 italic ml-2 hidden sm:inline"># ci/cd safe mode</span>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-heidi-600/20 rounded-full blur-[80px] lg:blur-[120px] -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-cyan-600/10 rounded-full blur-[80px] lg:blur-[120px] -z-10 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left z-10 animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-heidi-500/10 border border-heidi-500/20 text-heidi-300 text-xs sm:text-sm font-medium mb-6 lg:mb-8 hover:bg-heidi-500/20 transition-colors cursor-default">
                <span className="flex h-2 w-2 rounded-full bg-heidi-400 mr-2 animate-pulse"></span>
                v2.1 Stable &bull; Python Native
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
                The Terminal-Safe <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-heidi-400 via-emerald-400 to-cyan-400">
                  AI Companion
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 mb-8 lg:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                Built in Python with robust rendering policies. Fast, clean output that works in CI and never leaves your terminal in a bad state.
              </p>
              
              <InstallSnippet />

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <a 
                  href="https://github.com/heidi-dang/heidi-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-xl font-medium transition-all flex items-center justify-center backdrop-blur-sm group"
                >
                  <i className="fab fa-github mr-2 text-xl group-hover:text-heidi-400 transition-colors"></i> View Source
                </a>
                <div className="flex items-center gap-2 group cursor-not-allowed select-none px-2">
                  <span className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">Read Documentation</span>
                  <span className="text-[10px] font-bold bg-heidi-500/10 text-heidi-400 px-2 py-0.5 rounded-full border border-heidi-500/20">COMING SOON</span>
                </div>
              </div>
              
              <div className="mt-8 lg:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-6 text-gray-500 text-sm">
                <span className="flex items-center hover:text-gray-300 transition-colors"><i className="fab fa-python text-lg mr-2 text-heidi-500"></i> Python 3.9+</span>
                <span className="flex items-center hover:text-gray-300 transition-colors"><i className="fab fa-apple text-lg mr-2"></i> macOS</span>
                <span className="flex items-center hover:text-gray-300 transition-colors"><i className="fab fa-linux text-lg mr-2"></i> Linux</span>
                <span className="flex items-center hover:text-gray-300 transition-colors"><i className="fab fa-windows text-lg mr-2"></i> WSL2</span>
              </div>
            </div>
            
            {/* Hero Visual - Embedded Chat */}
            <div className="relative z-10 lg:pl-10 animate-fade-in-up mt-8 lg:mt-0" style={{animationDelay: '0.2s'}}>
              <div className="absolute inset-0 bg-gradient-to-r from-heidi-500 to-cyan-500 rounded-3xl blur-2xl opacity-20 transform rotate-3 scale-95"></div>
              <EmbeddedChat />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-black/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-white mb-4">Intelligent & Robust</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
              Heidi combines Gemini 2.5's reasoning with a battle-tested rendering engine designed for real-world engineering environments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard 
              icon="fa-shield-alt"
              title="Terminal-Safe Output"
              description="RenderPolicy prevents broken ANSI states. Heidi automatically detects non-TTY environments and simplifies output, ensuring your terminal cursor never gets frozen."
            />
            <FeatureCard 
              icon="fa-server"
              title="CI/CD Friendly"
              description="Use --plain for stripped output or --json for strict JSON mode. Perfect for integrating AI checks into your GitHub Actions or GitLab CI pipelines."
            />
            <FeatureCard 
              icon="fa-bolt"
              title="Instant Debugging"
              description="Pipe stderr directly to Heidi. She parses stack traces, identifies the root cause in your code, and offers a fix—all without leaving the CLI."
            />
            <FeatureCard 
              icon="fa-code"
              title="Automation Ready"
              description="Script complex workflows with natural language. Heidi translates your intent into safe, executable shell commands or Python scripts."
            />
          </div>
        </div>
      </section>

       {/* CLI Demo/Visual Section */}
       <section className="py-20 border-y border-white/5 bg-heidi-dark-bg/50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-heidi-dark-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-heidi-500/10 blur-[100px] rounded-full"></div>
              
              <div className="grid lg:grid-cols-2">
                 <div className="p-8 lg:p-12 flex flex-col justify-center relative z-10">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">Designed for Reliability</h3>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                      We know how annoying it is when CLI tools break your terminal. Heidi prioritizes safety and predictability above all else.
                    </p>
                    <ul className="space-y-4">
                       {[
                         "Graceful degradation in simple terminals",
                         "--no-color flag for strict log compliance",
                         "--debug flag for verbose tracebacks",
                         "Pure JSON mode for machine consumption"
                       ].map((item, i) => (
                         <li key={i} className="flex items-center text-gray-300 group hover:text-white transition-colors">
                            <div className="h-6 w-6 rounded-full bg-heidi-500/10 flex items-center justify-center mr-3 group-hover:bg-heidi-500/20 transition-colors flex-shrink-0">
                                <i className="fas fa-check text-xs text-heidi-400"></i>
                            </div>
                            {item}
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="bg-black/50 p-8 lg:p-12 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
                    <div className="text-center relative z-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                       <div className="inline-flex items-center justify-center h-20 w-20 lg:h-24 lg:w-24 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 mb-6 shadow-2xl shadow-heidi-900/50">
                         <i className="fas fa-terminal text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-heidi-400 to-emerald-600"></i>
                       </div>
                       <h4 className="text-xl lg:text-2xl font-bold text-white mb-2">Universal Compatibility</h4>
                       <p className="text-gray-400 text-sm max-w-xs mx-auto">
                         Runs seamlessly on any platform that supports Python 3.9+
                       </p>
                    </div>
                 </div>
              </div>
            </div>
         </div>
       </section>
    </div>
  );
};

export default Home;