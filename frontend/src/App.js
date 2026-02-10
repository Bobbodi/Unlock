import "./App.css";
import { supabase } from "./supabaseClient";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Info from "./pages/Info/Info";
import Chat from "./pages/Chat/Chat";          
import Profile from "./pages/Profile/Profile";
import Qotd from "./pages/Home/Qotd";

function App() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const authed = !!session;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setChecking(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setChecking(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (checking) return null;

return (
  <Routes>
    <Route path="/" element={session ? <Navigate to="/home" /> : <Login />} />
    <Route path="/login" element={session ? <Navigate to="/info" /> : <Login />} />
    <Route path="/info" element={session ? <Info /> : <Navigate to="/login" />} />
    <Route path="/profile" element={session ? <Profile /> : <Navigate to="/login" />} />
    <Route path="/home" element={session ? <Home /> : <Navigate to="/login" />} />
    <Route path="/chat" element={session ? <ChatPage /> : <Navigate to="/login" />} />
    <Route path="/qotd" element={session ? <Qotd /> : <Navigate to="/login" />} />
  </Routes>
);
}

export default App;
