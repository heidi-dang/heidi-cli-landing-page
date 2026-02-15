import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import { loginWithGoogle, logout, subscribeToAuthChanges } from './services/firebaseService';
import { UserProfile } from './types';

// Lazy load components to split chunks
const ChatWidget = lazy(() => import('./components/ChatWidget'));
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const LoadingSpinner = () => (
  <div className="min-h-screen bg-heidi-dark-bg flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-heidi-500"></div>
  </div>
);

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState('/'); // Default path

  // Handle Hash Routing
  useEffect(() => {
    const handleHashChange = () => {
      // normalize hash: #/dashboard -> /dashboard. #/ -> /
      const hash = window.location.hash.slice(1);
      setCurrentPath(hash || '/');
      window.scrollTo(0, 0);
    };

    // Set initial path
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Ensure default hash if empty
  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = '/';
    }
  }, []);

  // Redirect if on dashboard without user
  useEffect(() => {
    if (!loading && !user && currentPath === '/dashboard') {
      window.location.hash = '/';
    }
  }, [user, loading, currentPath]);

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
      window.location.hash = '/';
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  // Simple routing logic
  let pageContent;
  if (currentPath === '/dashboard' && user) {
    pageContent = <Dashboard user={user} />;
  } else {
    // Default to Home for / or unknown routes
    pageContent = <Home />;
  }

  return (
    <div className="min-h-screen bg-heidi-dark-bg text-gray-100 font-sans selection:bg-heidi-500 selection:text-white flex flex-col">
      <Navbar user={user} onLogin={handleLogin} onLogout={handleLogout} currentPath={currentPath} />
      
      <Suspense fallback={<LoadingSpinner />}>
        {pageContent}
      </Suspense>

      {/* Global Components - Lazy loaded */}
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
      
      {/* Simple Footer */}
      <footer className="bg-dark-footer border-t border-white/5 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="mb-4">&copy; {new Date().getFullYear()} Heidi CLI. Open source MIT License.</p>
          <div className="flex justify-center items-center space-x-6">
            <a href="#" className="hover:text-heidi-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-heidi-400 transition-colors">Terms</a>
            <div className="h-4 w-px bg-white/10"></div>
            <a 
              href="https://github.com/heidi-dang/heidi-cli" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-heidi-400 transition-colors flex items-center gap-2"
            >
              <i className="fab fa-github"></i> GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;