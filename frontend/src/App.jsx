import React, { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import TourismHub from './pages/TourismHub';
import MusicHub from './pages/MusicHub';
import StoryHub from './pages/StoryHub';
import AdminPortal from './pages/AdminPortal';
import Login from './components/Login';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('dashboard');
  const [userTier, setUserTier] = useState('free');

  useEffect(()=>{
    const t = localStorage.getItem('lumina_theme') || 'light';
    document.documentElement.setAttribute('data-theme', t==='dark' ? 'dark' : 'light');
  },[]);

  if (!token) return <Login setToken={setToken} />;

  return (
    <div className="app-shell">
      <nav>
        <strong>LuminaVerse</strong>
        <button onClick={()=>setPage('dashboard')}>Dashboard</button>
        <button onClick={()=>setPage('tourism')}>Tourism</button>
        <button onClick={()=>setPage('music')}>Music</button>
        <button onClick={()=>setPage('story')}>Story</button>
        <button onClick={()=>setPage('admin')}>Admin</button>
        <div style={{marginLeft:'auto'}}><ThemeToggle /></div>
      </nav>

      <div className="theme-wave" id="theme-wave" style={{opacity:0.9}}></div>

      {page === 'dashboard' && <Dashboard />}
      {page === 'tourism' && <TourismHub />}
      {page === 'music' && <MusicHub userTier={userTier} />}
      {page === 'story' && <StoryHub userTier={userTier} />}
      {page === 'admin' && <AdminPortal />}
    </div>
  );
}
