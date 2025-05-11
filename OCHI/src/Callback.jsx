import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Callback = () => {
    const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
    const navigate = useNavigate();
    console.log("Callback component mounted...");
    useEffect(() => {
        console.log("Callback mounted..."); 

       
        if (isAuthenticated && user) {
            console.log("User authenticated:", user); 

            // Access token is now available JWT token to send to backend to authorize requests
            
            axios.post("http://localhost:5000/api/admin/loginAdmin", { email, password })
  .then((response) => {
    // Handle success (e.g., save the token to localStorage)
  })
  .catch((error) => {
    console.error('Error during admin login:', error.response);
  });


            const storedRole = localStorage.getItem("user_role"); 
            console.log("Stored Role:", storedRole);

            // Send user data to backend for registration
            axios.post("http://localhost:5000/api/user/register", {
                auth0Id: user.sub,
                email: user.email,
                name: user.name,
                role: storedRole,
                picture: user.picture,
            })
            .then((response) => {
                console.log("User registered successfully"); 
                const token = response.data ;
                console.log("Token:", token);
                localStorage.setItem("jwt_token", token); // Store token in local storage
                return axios.get(`http://localhost:5000/api/user/profile/${user.sub}`);
            })
            .then((response) => {
                console.log("User Data:", response.data.user);

                const userRole = response.data.user.role; // Get role from backend
                const picture = response.data.user.picture;
                console.log("Fetched user role:", userRole);
                console.log("Fetched Picture:", picture);

                localStorage.setItem("auth0Id", user.sub);
                localStorage.setItem("profilePicture", picture);
                localStorage.setItem("user_role", userRole); // Save the actual role from backend
                
                if (userRole === "mentor") {
                    navigate("/"); 
                } else {
                    navigate("/"); 
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
