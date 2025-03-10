import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const profilePicture = localStorage.getItem("profilePicture");

    return (
        <div>
            <h1>Welcome to Dashboard</h1>
            {profilePicture && (
                <img 
                    src={profilePicture} 
                    alt="Profile" 
                    width="100" 
                    onClick={() => navigate("/profile")} // Navigate on click
                    style={{ cursor: "pointer" }}
                />
            )}
        </div>
    );
};

export default Dashboard;
