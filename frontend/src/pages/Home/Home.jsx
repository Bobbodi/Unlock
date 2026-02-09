import { useNavigate } from "react-router-dom"

const Home = () => {

    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/login");
    }

    const goToProfile = () => {
        navigate("/profile");
    }

    const goToChat = () => {
        navigate("/chat");
    }

    return (
        <div>
            Home Page

            <button onClick={goToLogin}>Go to Login</button>
            <button onClick={goToProfile}>Go to Profile</button>
            <button onClick={goToChat}>Go to Chat</button>
        </div>
    )
}

export default Home