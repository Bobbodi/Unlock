import { useNavigate } from "react-router-dom"

const Chat = () => {

    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/home");
    }

    const goToProfile = () => {
        navigate("/profile");
    }

    const goToLogin = () => {
        navigate("/login");
    }


    return (
        <div>
            Chat Page

            <button onClick={goToHome}>Go to Home</button>
            <button onClick={goToProfile}>Go to Profile</button>
            <button onClick={goToLogin}>Go to Login</button>
        </div>
    )
}

export default Chat