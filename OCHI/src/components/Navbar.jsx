import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, useNavigate } from "react-router-dom";
import mentorService from "../services/mentorServices";

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
      appState: { role },
    });
  };

  const handleBadgeRequest = async () => {
    try {
      const auth0Id = localStorage.getItem("auth0Id");
      if (!auth0Id) {
        alert("auth0Id not found in localStorage.");
        return;
      }

      const result = await mentorService.sendVerificationRequest(auth0Id);
      alert(result.message);
    } catch (err) {
      console.error(err);
      alert(err.message || "Error sending badge request");
    }
  };

  const userRoles = user?.["https://your-app.com/roles"] || [];
  const isMentor = localStorage.getItem("user_role") === "mentor";

  return (
    <div className="fixed z-[999] w-full px-20 py-4 font-['Neue_Montreal'] flex justify-between items-center backdrop-blur-md bg-white/10">
      {/* Logo */}
      <div className="logo">
        <NavLink to="/">
          <img
            src="/LOGO/mentora.png"
            alt="Mentora Logo"
            className="w-32 h-auto object-contain"
          />
        </NavLink>
      </div>

      {/* Navigation Links */}
      <div className="links flex gap-10 items-center">
        <NavLink to="/contact" className="text-gray-700 hover:text-orange-700">
          Contact Us
        </NavLink>
        <NavLink to="/about" className="text-gray-700 hover:text-orange-700">
          About Us
        </NavLink>

        {/* Authentication Section */}
        {!isAuthenticated ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
            >
              Login
            </button>

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
                  onClick={() => navigate("/loginAdmin")}
                  className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 text-left"
                >
                  Login as Admin
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* Profile Image */}
            <img
              src={user.picture}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />

            {/* 🔸 Show Request Badge Button for Mentor */}
                    {localStorage.getItem("user_role") === "mentor" && (
                    <button
                    onClick={handleBadgeRequest}                        
                            className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                        Request Badge
                    </button>
                    )}

            {/* Logout */}
            <button
              onClick={() => logout()}
              className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
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
