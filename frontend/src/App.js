import "./App.css";
import { supabase } from "./supabaseClient";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
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
      <Route path="/" element={<Navigate to={authed ? "/home" : "/login"} replace />} />

      <Route
        path="/login"
        element={authed ? <Navigate to="/home" replace /> : <Login />}
      />

      <Route
        path="/home"
        element={authed ? <Home /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/chat"
        element={authed ? <Chat session={session} /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/profile"
        element={authed ? <Profile /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/qotd"
        element={authed ? <Qotd /> : <Navigate to="/login" replace />}
      />

      <Route path="*" element={<Navigate to={authed ? "/home" : "/login"} replace />} />
    </Routes>
  );
}

export default App;
