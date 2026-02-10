import { useNavigate } from "react-router-dom"
import { supabase } from "../../supabaseClient";

const Info = () => {
    const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  }

    const goToHome = () => {
        navigate("/home");
    }

        return (
        <div>
            Personal Information

            <button onClick={handleLogout}>Logout</button>
            <button onClick={goToHome}>Proceed to Home</button>
        </div>
    )

}

export default Info