import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserProfile } from '../types';
import Logo from './Logo';

interface NavbarProps {
  user: UserProfile | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogin, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 bg-heidi-dark-bg/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo className="h-9 w-9" textSize="text-2xl" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/') ? 'text-heidi-400 bg-white/5' : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Home
                </Link>
                <a
                  href="https://github.com/heidi-dang/heidi-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Docs
                </a>
                {user && (
                  <Link
                    to="/dashboard"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/dashboard') ? 'text-heidi-400 bg-white/5' : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {user.photoURL ? (
                      <img className="h-8 w-8 rounded-full border border-heidi-500" src={user.photoURL} alt="User" />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-heidi-600 flex items-center justify-center text-xs font-bold">
                        {user.displayName?.charAt(0) || 'U'}
                      </div>
                    )}
                    <span className="text-sm text-gray-300">{user.displayName}</span>
                  </div>
                  <button
                    onClick={onLogout}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={onLogin}
                  className="bg-heidi-600 hover:bg-heidi-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg shadow-heidi-500/20 transition-all transform hover:scale-105"
                >
                  Login / Sign Up
                </button>
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
        <div className="md:hidden bg-heidi-dark-card border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-white/5"
            >
              Home
            </Link>
            {user && (
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
              >
                Dashboard
              </Link>
            )}
             <a
                  href="https://github.com/heidi-dang/heidi-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
                >
                  Docs
            </a>
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
                <button
                  onClick={() => { onLogin(); setIsOpen(false); }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-heidi-400 hover:bg-white/5"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;