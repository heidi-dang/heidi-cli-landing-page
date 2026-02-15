import React, { useState, useEffect, useRef } from 'react';
import { UserProfile } from '../types';
import Logo from './Logo';

interface NavbarProps {
  user: UserProfile | null;
  onLogin: () => void;
  onLogout: () => void;
  currentPath: string;
}

const languages = [
  { code: 'EN', name: 'English', flag: '🇺🇸' },
  { code: 'VI', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'JP', name: '日本語', flag: '🇯🇵' },
  { code: 'ZH', name: '中文', flag: '🇨🇳' },
  { code: 'ES', name: 'Español', flag: '🇪🇸' },
  { code: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'KR', name: '한국어', flag: '🇰🇷' },
  { code: 'RU', name: 'Русский', flag: '🇷🇺' },
  { code: 'PT', name: 'Português', flag: '🇵🇹' },
  { code: 'HI', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'AR', name: 'العربية', flag: '🇸🇦' },
  { code: 'IT', name: 'Italiano', flag: '🇮🇹' },
  { code: 'TR', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'NL', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'PL', name: 'Polski', flag: '🇵🇱' },
  { code: 'SV', name: 'Svenska', flag: '🇸🇪' },
  { code: 'TH', name: 'ไทย', flag: '🇹🇭' },
  { code: 'ID', name: 'Bahasa Indo', flag: '🇮🇩' },
  { code: 'MS', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'TL', name: 'Filipino', flag: '🇵🇭' },
  { code: 'UK', name: 'Українська', flag: '🇺🇦' },
  { code: 'EL', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'CS', name: 'Čeština', flag: '🇨🇿' },
  { code: 'DA', name: 'Dansk', flag: '🇩🇰' },
  { code: 'FI', name: 'Suomi', flag: '🇫🇮' },
  { code: 'HE', name: 'עברית', flag: '🇮🇱' },
  { code: 'HU', name: 'Magyar', flag: '🇭🇺' },
  { code: 'NO', name: 'Norsk', flag: '🇳🇴' },
  { code: 'RO', name: 'Română', flag: '🇷🇴' },
];

const Navbar: React.FC<NavbarProps> = ({ user, onLogin, onLogout, currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]);
  const langMenuRef = useRef<HTMLDivElement>(null);
  
  const isActive = (path: string) => currentPath === path;

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 shadow-lg' 
        : 'bg-transparent border-b border-transparent py-2'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
              <Logo className="h-9 w-9" textSize="text-2xl" />
            </a>
            <div className="hidden md:block">
              <div className="ml-12 flex items-baseline space-x-1">
                <a
                  href="#/"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive('/') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Home
                </a>
                <a
                  href="https://github.com/heidi-dang/heidi-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  Docs
                </a>
                <a
                  href="https://deepmind.google/technologies/gemini/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5 group"
                >
                  <i className="fas fa-sparkles text-xs text-heidi-400 group-hover:animate-pulse"></i>
                  Gemini 2.5
                </a>
                {user && (
                  <a
                    href="#/dashboard"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive('/dashboard') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Dashboard
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              
              {/* Language Selector */}
              <div className="relative" ref={langMenuRef}>
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-all"
                >
                  <i className="fas fa-globe"></i>
                  <span className="text-sm font-medium">{currentLang.code}</span>
                  <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}></i>
                </button>

                {isLangOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-[#0f172a] border border-white/10 rounded-xl shadow-xl overflow-hidden animate-fade-in z-50 ring-1 ring-black ring-opacity-5">
                    <div className="max-h-80 overflow-y-auto custom-scrollbar py-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setCurrentLang(lang);
                            setIsLangOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-white/5 transition-colors ${
                            currentLang.code === lang.code ? 'text-heidi-400 bg-white/5' : 'text-gray-300'
                          }`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span>{lang.name}</span>
                          {currentLang.code === lang.code && <i className="fas fa-check ml-auto text-xs"></i>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-white/10"></div>

              {user ? (
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3 group cursor-default">
                    {user.photoURL ? (
                      <img className="h-8 w-8 rounded-full border border-heidi-500/50 group-hover:border-heidi-400 transition-colors" src={user.photoURL} alt="User" />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-heidi-600 to-heidi-800 flex items-center justify-center text-xs font-bold border border-white/10">
                        {user.displayName?.charAt(0) || 'U'}
                      </div>
                    )}
                    <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">{user.displayName}</span>
                  </div>
                  <button
                    onClick={onLogout}
                    className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5 hover:border-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <a
                    href="https://app.heidiai.com.au/?from=landing"
                    title="Continue with Google or GitHub"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Login
                  </a>
                  <a
                    href="https://app.heidiai.com.au/?from=landing"
                    title="Continue with Google or GitHub"
                    className="bg-white hover:bg-gray-100 text-black px-5 py-2 rounded-lg text-sm font-bold shadow-lg shadow-white/5 transition-all transform hover:-translate-y-0.5"
                  >
                    Sign Up
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0f172a] border-b border-white/10 animate-fade-in max-h-[90vh] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-white/5"
            >
              Home
            </a>
            {user && (
              <a
                href="#/dashboard"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
              >
                Dashboard
              </a>
            )}
             <a
                  href="https://github.com/heidi-dang/heidi-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
                >
                  Docs
            </a>
            <a
                  href="https://deepmind.google/technologies/gemini/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-2"
                >
                  <i className="fas fa-sparkles text-heidi-400"></i>
                  Gemini 2.5
            </a>

            {/* Mobile Language Selector */}
            <div className="px-3 py-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Language</div>
              <div className="max-h-48 overflow-y-auto custom-scrollbar border border-white/5 rounded-lg bg-black/20 p-2">
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang);
                        setIsOpen(false);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                        currentLang.code === lang.code 
                          ? 'bg-heidi-600/20 text-heidi-400 border border-heidi-600/30' 
                          : 'text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="truncate">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 pb-3 border-t border-white/10">
              {user ? (
                 <div className="flex items-center px-5 space-x-3" onClick={onLogout}>
                    <div className="flex-shrink-0">
                      {user.photoURL ? (
                        <img className="h-10 w-10 rounded-full" src={user.photoURL} alt="" />
                      ) : (
                         <div className="h-10 w-10 rounded-full bg-heidi-600 flex items-center justify-center">
                            {user.displayName?.charAt(0)}
                         </div>
                      )}
                    </div>
                    <div>
                      <div className="text-base font-medium leading-none text-white">{user.displayName}</div>
                      <div className="text-sm font-medium leading-none text-gray-400 mt-1">Sign out</div>
                    </div>
                 </div>
              ) : (
                <div className="px-3 space-y-3">
                  <a
                    href="https://app.heidiai.com.au/?from=landing"
                    className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-gray-300 border border-white/10 hover:bg-white/5"
                  >
                    Login
                    <span className="block text-xs text-gray-500 font-normal mt-0.5">Continue with Google or GitHub</span>
                  </a>
                  <a
                    href="https://app.heidiai.com.au/?from=landing"
                    className="block w-full text-center px-3 py-2 rounded-md text-base font-bold text-black bg-white hover:bg-gray-100"
                  >
                    Sign Up
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;