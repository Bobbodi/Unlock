import { supabase } from "../../supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if already logged in on mount
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from("info")
          .select("userName")
          .eq("user_id", session.user.id)
          .single();
        
        if (data?.userName) {
          navigate("/home", { replace: true });
        } else {
          navigate("/info", { replace: true });
        }
      } else {
        setIsCheckingAuth(false);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session && event === 'SIGNED_IN') {
        setIsCheckingAuth(true);
        
        // Check if user has info
        const { data } = await supabase
          .from("info")
          .select("userName")
          .eq("user_id", session.user.id)
          .single();
        
        // Navigate based on info existence
        if (data?.userName) {
          navigate("/home", { replace: true });
        } else {
          navigate("/info", { replace: true });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (isCheckingAuth) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#E5EAFF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "400px",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 0 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffffdd",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              marginBottom: "1rem",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          >
            ✦
          </div>
          <p style={{ color: "#666", fontSize: "0.95rem" }}>Loading...</p>
        </div>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",      
        backgroundColor: "#E5EAFF", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          margin: "4rem auto",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 0 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffffdd",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          WeShare
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "#666",
            marginBottom: "1.5rem",
          }}
        >
          Welcome back! Please log in to continue.
        </p>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#90ABEF",
                  brandAccent: "#90ABEF",
                },
              },
            },
          }}
          providers={[]}
          localization={{
            variables: {
              sign_in: {
                button_label: "Log in", 
              },
            },
          }}
        ></Auth>
      </div>
    </div>
  );
}

export default Login