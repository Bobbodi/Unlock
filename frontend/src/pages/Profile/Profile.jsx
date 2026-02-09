import { useNavigate } from "react-router-dom"

const Profile = () => {

    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/home");
    }

    const goToLogin = () => {
        navigate("/login");
    }

    const goToChat = () => {
        navigate("/chat");
    }


    return (
        <div>
            Profile Page

            <button onClick={goToHome}>Go to Home</button>
            <button onClick={goToLogin}>Go to Login</button>
            <button onClick={goToChat}>Go to Chat</button>
        </div>
    )
}

export default Profile