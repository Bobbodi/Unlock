import './App.css';
import { supabase } from './supabaseClient';
import { useState, useEffect } from "react";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

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

  return session ? <Home /> : <Login />;
}

export default App;