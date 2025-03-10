import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const auth0Id = localStorage.getItem("auth0Id"); // Get user ID from storage

        axios.get(`http://localhost:5000/api/user/profile/${auth0Id}`)
            .then((response) => {
                
                setUserData(response.data.user);
            })
            .catch((error) => {
                console.error("Error fetching profile:", error);
            });
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{userData.name}'s Profile</h1>
            <img src={userData.picture} alt="Profile" width="150" />
            <p>Email: {userData.email}</p>
            <p>Role: {userData.role}</p>
        </div>
    );
};

export default Profile;
