import './App.css';
import { supabase } from './supabaseClient';
import { useState, useEffect } from "react";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Chat from './pages/Chat/Chat';
import Profile from './pages/Profile/Profile';
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) return <Login />;

  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/home" replace />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;