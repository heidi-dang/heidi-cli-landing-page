import React from 'react';
import { FeatureCardProps } from '../types';

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-heidi-dark-card/50 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:border-heidi-500/30 transition-all duration-300 group h-full">
    <div className="h-12 w-12 rounded-lg bg-heidi-500/10 flex items-center justify-center mb-4 group-hover:bg-heidi-500/20 transition-colors">
      <i className={`fas ${icon} text-2xl text-heidi-400`}></i>
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
  </div>
);

const CodeBlock = () => (
  <div className="bg-black/80 rounded-xl border border-white/10 p-5 font-mono text-sm shadow-2xl backdrop-blur-md relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 text-xs text-gray-600 font-bold">BASH</div>
    <div className="flex space-x-2 mb-6">
      <div className="w-3 h-3 rounded-full bg-red-500"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div className="w-3 h-3 rounded-full bg-green-500"></div>
    </div>
    <div className="space-y-3">
      <div className="flex flex-wrap">
        <span className="text-pink-500 mr-2 select-none">$</span>
        <span className="text-white">pipx install heidi-cli</span>
      </div>
      <div className="flex">
        <span className="text-green-500">✓ Installed heidi-cli v2.1.0</span>
      </div>
      
      <div className="flex flex-wrap mt-4">
        <span className="text-pink-500 mr-2 select-none">$</span>
        <span className="text-white">heidi doctor --plain</span>
      </div>
      <div className="text-yellow-200 font-mono text-xs opacity-90">
        {`{ "status": "healthy", "runtime": "python3.11", "ci_mode": false }`}
      </div>

      <div className="flex flex-wrap mt-4">
        <span className="text-pink-500 mr-2 select-none">$</span>
        <span className="text-white">heidi ask "Fix my git rebase"</span>
      </div>
      <div className="text-cyan-400">
        &gt; Analyzing git state... <br/>
        &gt; Found conflict in <span className="text-white underline">src/main.py</span>
      </div>
    </div>
  </div>
);

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-heidi-500/20 rounded-full blur-[120px] -z-10 opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-heidi-500/10 border border-heidi-500/20 text-heidi-400 text-sm font-medium mb-6">
                <span className="flex h-2 w-2 rounded-full bg-heidi-400 mr-2 animate-pulse"></span>
                v2.1 Stable &bull; Python Native
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
                The Terminal-Safe <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-heidi-400 to-cyan-400">
                  AI Companion
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Built in Python with robust rendering policies. Fast, clean output that works in CI and never leaves your terminal in a bad state.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-heidi-600 hover:bg-heidi-500 text-white rounded-xl font-bold shadow-lg shadow-heidi-500/25 transition-all transform hover:-translate-y-1 flex items-center justify-center">
                  <i className="fas fa-download mr-2"></i> Install via pipx
                </button>
                <a 
                  href="https://github.com/heidi-dang/heidi-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all flex items-center justify-center"
                >
                  <i className="fab fa-github mr-2"></i> View Source
                </a>
              </div>
              
              <div className="mt-8 flex items-center justify-center lg:justify-start text-gray-500 text-sm space-x-6">
                <span className="flex items-center"><i className="fab fa-python text-lg mr-2"></i> Python 3.9+</span>
                <span className="flex items-center"><i className="fab fa-apple text-lg mr-2"></i> macOS</span>
                <span className="flex items-center"><i className="fab fa-linux text-lg mr-2"></i> Linux</span>
                <span className="flex items-center"><i className="fab fa-windows text-lg mr-2"></i> WSL2</span>
              </div>
            </div>
            
            {/* Hero Visual */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-heidi-500 to-cyan-500 rounded-2xl blur-lg opacity-20 transform rotate-3 scale-105"></div>
              <CodeBlock />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Intelligent & Robust</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Heidi combines Gemini 2.5's reasoning with a battle-tested rendering engine designed for real-world engineering environments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
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
       <section className="py-20 border-y border-white/5">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-heidi-dark-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="grid lg:grid-cols-2">
                 <div className="p-12 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-white mb-6">Designed for Reliability</h3>
                    <p className="text-gray-400 mb-6">
                      We know how annoying it is when CLI tools break your terminal. Heidi prioritizes safety and predictability.
                    </p>
                    <ul className="space-y-4">
                       {[
                         "Graceful degradation in simple terminals",
                         "--no-color flag for strict log compliance",
                         "--debug flag for verbose tracebacks",
                         "Pure JSON mode for machine consumption"
                       ].map((item, i) => (
                         <li key={i} className="flex items-center text-gray-300">
                            <i className="fas fa-check-circle text-heidi-500 mr-3"></i>
                            {item}
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="bg-black/50 p-12 flex items-center justify-center border-l border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <div className="text-center relative z-10">
                       <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 mb-6 shadow-xl">
                         <i className="fas fa-terminal text-4xl text-heidi-400"></i>
                       </div>
                       <h4 className="text-xl font-bold text-white mb-2">Universal Compatibility</h4>
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