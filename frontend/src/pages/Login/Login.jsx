import { supabase } from "../../supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/home");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

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
        Welcome back! Please sign in to continue.
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
      ></Auth>
    </div>
    </div>
  );
}

export default Login;
