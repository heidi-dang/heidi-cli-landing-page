import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { loginWithGoogle, logout, subscribeToAuthChanges } from './services/firebaseService';
import { UserProfile } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      if (firebaseUser) {
        // Map Firebase user to our UserProfile type
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          subscriptionTier: 'free', // Default
          createdAt: new Date().toISOString()
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Check console for details.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-heidi-dark-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-heidi-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-heidi-dark-bg text-gray-100 font-sans selection:bg-heidi-500 selection:text-white">
        <Navbar user={user} onLogin={handleLogin} onLogout={handleLogout} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} /> : <Navigate to="/" replace />} 
          />
        </Routes>

        {/* Global Components */}
        <ChatWidget />
        
        {/* Simple Footer */}
        <footer className="bg-black/30 border-t border-white/5 py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Heidi CLI. Open source MIT License.</p>
            <div className="mt-2 space-x-4">
              <a href="#" className="hover:text-heidi-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-heidi-400 transition-colors">Terms</a>
              <a href="https://github.com/heidi-dang/heidi-cli" className="hover:text-heidi-400 transition-colors">GitHub</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
