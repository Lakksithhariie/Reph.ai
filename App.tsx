import { useState, useEffect } from 'react'; // ← Changed: removed React
import { Landing } from './src/pages/Landing';
import { Editor } from './src/pages/Editor';
import { Login } from './src/pages/Login';
import { Signup } from './src/pages/Signup';

type Route = '/' | '/editor' | '/login' | '/signup' | '/pricing';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>('/');

  // Simple client-side routing
  useEffect(() => {
    const path = window.location.pathname as Route;
    if (['/editor', '/login', '/signup', '/pricing'].includes(path)) {
      setCurrentRoute(path);
    }
  }, []);

  const navigate = (path: string) => {
    setCurrentRoute(path as Route);
    window.history.pushState({}, '', path);
  };

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname as Route);
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Render current route
  switch (currentRoute) {
    case '/':
      return <Landing onNavigate={navigate} />;
    case '/editor':
      return <Editor onNavigate={navigate} />;
    case '/login':
      return <Login onNavigate={navigate} />;
    case '/signup':
      return <Signup onNavigate={navigate} />;
    case '/pricing':
      // For V1, just redirect to editor with modal logic
      navigate('/editor');
      return <Editor onNavigate={navigate} />;
    default:
      return <Landing onNavigate={navigate} />;
  }
}
