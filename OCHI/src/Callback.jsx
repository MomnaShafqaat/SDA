import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import jwtDecode from "jwt-decode";

const Callback = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const processUser = async () => {
      try {
        console.log("Callback component mounted...");

        if (isAuthenticated && user) {
          console.log("User authenticated:", user);

          // Fetch and store Auth0 token
          try {
            const auth0Token = await getAccessTokenSilently();
            console.log("auth0Token is:", auth0Token);
            localStorage.setItem("auth0Token", auth0Token);
          } catch (error) {
            console.error("Error fetching token:", error);
          }

          const storedRole = localStorage.getItem("user_role");
          const auth0Id = user.sub;

          if (storedRole === "admin") {
            const response = await axios.post("http://localhost:5000/api/admin/loginAdmin", {
              email: user.email,
            });

            const adminToken = response.data.token;
            console.log("Admin Token:", adminToken);
            localStorage.setItem("admin_token", adminToken);
            navigate("/admin/dashboard");
          } else {
            // Register user
            const registerRes = await axios.post("http://localhost:5000/api/user/register", {
              auth0Id,
              email: user.email,
              name: user.name,
              role: storedRole,
              picture: user.picture,
            });

            console.log("User registered successfully");
            const token = registerRes.data;
           // console.log("Momina Ahmed wala token",jwtDecode(registerRes.data));
            localStorage.setItem("jwt_token", token);
            localStorage.setItem("auth0Id", user.sub);

            // Get user profile
            const profileRes = await axios.get(
              `http://localhost:5000/api/user/profile/${user.sub}`
            );
            const userData = profileRes.data.user;

            const userRole = userData.role;
            const picture = userData.picture;

            console.log("Fetched user role:", userRole);
            console.log("Fetched Picture:", picture);

            localStorage.setItem("auth0Id", user.sub);
            localStorage.setItem("profilePicture", picture);
            localStorage.setItem("user_role", userRole); // Save the actual role from backend

            if (userRole === "mentor") {
              navigate("/mentor-dashboard");
            } else {
              //console.log("User is not mentor. Navigate as needed.");
              navigate("/");
            }
          }
        } else {
          console.log("User not authenticated yet.");
        }
      } catch (err) {
        console.error("Error in Callback:", err);
      }
    };

    processUser();
  }, [isAuthenticated, getAccessTokenSilently, user, navigate]);

  return <div>Loading...</div>;
};

export default Callback;
