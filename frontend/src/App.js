import "./App.css";
import { supabase } from "./supabaseClient";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Info from "./pages/Info/Info";
import ChatPage from "./pages/Chat/Chat";          
import Profile from "./pages/Profile/Profile";
import Qotd from "./pages/Home/Qotd";

function App() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setChecking(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (checking) return null;

  return (
    <Routes>
      <Route path="/" element={!session ? <Login /> : <Navigate to="/login" replace />} />
      <Route path="/login" element={!session ? <Login /> : <Navigate to="/login" replace />} />
      <Route path="/info" element={session ? <Info /> : <Navigate to="/login" replace />} />
      <Route path="/profile" element={session ? <Profile /> : <Navigate to="/login" replace />} />
      <Route path="/home" element={session ? <Home /> : <Navigate to="/login" replace />} />
      <Route path="/chat" element={session ? <ChatPage /> : <Navigate to="/login" replace />} />
      <Route path="/qotd" element={session ? <Qotd /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App