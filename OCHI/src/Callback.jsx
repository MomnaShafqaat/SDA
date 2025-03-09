import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Callback = () => {
    const { isAuthenticated, user } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Callback mounted..."); 

        if (isAuthenticated && user) {
            console.log("User authenticated:", user); 

            const storedRole = localStorage.getItem("user_role"); 
            console.log("Stored Role:", storedRole);

            // Send user data to backend for registration
            axios.post("http://localhost:5000/api/user/register", {
                auth0Id: user.sub,
                email: user.email,
                name: user.name,
                role: storedRole,
            })
            .then(() => {
                console.log("User registered successfully"); 
                return axios.get(`http://localhost:5000/api/user/profile/${user.sub}`);
            })
            .then((response) => {
                const userRole = response.data.role;
                console.log("Fetched user role:", userRole); 

                if (userRole === "mentor") {
                    navigate("/"); //  Redirect mentor dashboard
                } else {
                    navigate("/"); //in future redirect to student dashboard
                }
            })
            .catch((error) => {
                console.error("Error processing authentication:", error);
            });
        } else {
            console.log("User not authenticated yet."); 
        }
    }, [isAuthenticated, user]);

    return <div>Loading...</div>;
};

export default Callback;
