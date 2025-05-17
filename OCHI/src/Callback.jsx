import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Callback = () => {
    const { isAuthenticated, user } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        const processUser = async () => {
            try {
                if (isAuthenticated && user) {
                    console.log("User authenticated:", user);

                    const storedRole = localStorage.getItem("user_role");
                    const auth0Id = user.sub;

                    // If role is admin, send request to /admin/loginAdmin
                    if (storedRole === "admin") {
                        const response = await axios.post("http://localhost:5000/api/admin/loginAdmin", {
                            email: user.email, // get email from Auth0 user
                        });

                        const adminToken = response.data.token;
                        console.log("Admin Token:", adminToken);
                        localStorage.setItem("admin_token", adminToken);
                        navigate("/admin/dashboard"); // or wherever you want admins to go
                    }

                    // For normal users (mentor/student)
                    else {
                        // Register user in your own backend
                        await axios.post("http://localhost:5000/api/user/register", {
                            auth0Id,
                            email: user.email,
                            name: user.name,
                            role: storedRole,
                            picture: user.picture,
                        });

                        // Fetch user profile
                        const profileRes = await axios.get(`http://localhost:5000/api/user/profile/${auth0Id}`);
                        const userData = profileRes.data.user;

                        localStorage.setItem("jwt_token", userData.token);
                        localStorage.setItem("auth0Id", user.sub);
                        localStorage.setItem("profilePicture", userData.picture);
                        localStorage.setItem("user_role", userData.role);

                        navigate("/"); // or route based on role
                    }
                } else {
                    console.log("User not authenticated yet.");
                }
            } catch (err) {
                console.error("Error in Callback:", err);
            }
        };

        processUser();
    }, [isAuthenticated, user, navigate]);

    return <div>Loading...</div>;
};

export default Callback;
