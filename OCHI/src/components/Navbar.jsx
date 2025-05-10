import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, useNavigate} from "react-router-dom";


function Navbar() {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleAuth = (role) => {
        localStorage.setItem("user_role", role); // Store role locally
        loginWithRedirect({
            authorizationParams: {
                prompt: "login",
                redirect_uri: "http://localhost:3000/callback",
            },
            appState: { role }, // Send role to Callback.jsx
        });
    };
    const userRoles = user?.["https://your-app.com/roles"] || [];
    const isAdmin = userRoles.includes("admin");

    return (
        <div className="fixed z-[999] w-full px-20 py-4 font-['Neue_Montreal'] flex justify-between items-center backdrop-blur-md bg-white/10">
            {/* Logo */}
            <div className="logo">
                <NavLink to="/">
                    <img src="/LOGO/mentora.png" alt="Mentora Logo" className="w-32 h-auto object-contain" />
                </NavLink>
            </div>

            {/* Navigation Links */}
            <div className="links flex gap-10 items-center">
                <NavLink to="/contact" className="text-gray-700 hover:text-orange-700">Contact Us</NavLink>
                <NavLink to="/about" className="text-gray-700 hover:text-orange-700">About Us</NavLink>



      {/* Show Admin Dashboard only for authenticated admin users */}
      {isAuthenticated && isAdmin && (
          <button
            onClick={() => navigate("/admin-login")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Admin Dashboard
          </button>
        )}



{/*faltu*/}
   <button onClick={() => navigate("/admin-login")} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition" >Admin no auth </button>
{/*faltu*/}

                {/* Authentication Section */}
                {!isAuthenticated ? (
                    <div className="relative">
                        {/* Login Button */}
                        <button 
                            onClick={toggleDropdown} 
                            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                        >
                            Login
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden">
                                <button 
                                    onClick={() => handleAuth("mentor")} 
                                    className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 text-left"
                                >
                                    Login as Mentor
                                </button>
                                <button 
                                    onClick={() => handleAuth("student")} 
                                    className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 text-left"
                                >
                                    Login as Student
                                </button>

                                <button 
                                    onClick={() => handleAuth("admin-login")} 
                                    className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 text-left"
                                >
                                    Login as Admin
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        {/* User Profile */}
                        <img src={user.picture} alt="Profile" className="w-10 h-10 rounded-full" />

                        {/* Logout Button */}
                        <button 
                            onClick={() => logout()} 
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

    export default Navbar;
