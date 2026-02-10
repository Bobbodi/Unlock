import './App.css';
import { supabase } from './supabaseClient';
import { useState, useEffect } from "react";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ChatPage from './pages/Chat/Chat';
import Profile from './pages/Profile/Profile';
import Info from "./pages/Info/Info";
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

  //if (!session) return <Login />;

  /*return (
    <Routes>
      <Route path="/" element={session ? <Navigate to="/info" /> : <Login />} />
      <Route path="/login" element={session ? <Navigate to="/info" /> : <Login />} />
      <Route path="/info" element={<Info />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  
  );*/

return (
  <Routes>
    <Route path="/" element={session ? <Navigate to="/home" /> : <Login />} />
    <Route path="/login" element={session ? <Navigate to="/info" /> : <Login />} />
    <Route path="/info" element={session ? <Info /> : <Navigate to="/login" />} />
    <Route path="/profile" element={session ? <Profile /> : <Navigate to="/login" />} />
    <Route path="/home" element={session ? <Home /> : <Navigate to="/login" />} />
    <Route path="/chat" element={session ? <ChatPage /> : <Navigate to="/login" />} />
  </Routes>
);

}

export default App;