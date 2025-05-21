import React, { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBell } from 'react-icons/fa';
import mentorService from "../services/mentorServices.jsx";


function Navbar() {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const socketRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) connectSocket();
        else disconnectSocket();
        return () => disconnectSocket();
    }, [isAuthenticated]);

    useEffect(() => {
        const role = localStorage.getItem("user_role");
        setUserRole(role);
    }, []);

    const connectSocket = () => {
        if (!isAuthenticated || socketRef.current?.connected) return;
        socketRef.current = io('http://localhost:5000', { withCredentials: true, autoConnect: true });
        socketRef.current.on('connect', () => console.log('Socket connected:', socketRef.current.id));
        socketRef.current.on('disconnect', () => console.log('Socket disconnected:', socketRef.current.id));
    };

    const disconnectSocket = () => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
        }
    };

    const handleAuth = (role) => {
        localStorage.setItem("user_role", role);
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
    const profilePicture = localStorage.getItem("profilePicture");

    return (
        <div className="fixed z-[999] w-full px-20 py-4 font-['Neue_Montreal'] flex justify-between items-center bg-[#004D46] shadow-lg">
            <NavLink to="/">
                <img src="/LOGO/mentora.png" alt="Mentora Logo" className="w-32 h-auto object-contain" />
            </NavLink>

            <div className="flex gap-10 items-center">
                {isAuthenticated && userRole === "mentor" && (
                    <>
                        <NavLink to="/mentor-dashboard" className="text-white hover:text-orange-400 transition">Dashboard</NavLink>
                        <NavLink to="/chatInterface" className="text-white hover:text-orange-400 transition">Chat with Student</NavLink>
                        <NavLink to="/contact" className="text-white hover:text-orange-400 transition">Contact Us</NavLink>
                        <NavLink to="/about" className="text-white hover:text-orange-400 transition">About Us</NavLink>

                        <button onClick={() => navigate("/mentor-requests")} className="text-orange-300 hover:text-orange-500 transition" title="Mentor Requests">
                            <FaBell size={24} />
                        </button>
                    </>
                )}

                {!isAuthenticated ? (
                    <div className="relative">
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
                            Login
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                                <button onClick={() => { handleAuth("mentor"); setIsDropdownOpen(false); }} className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200">Login as Mentor</button>
                                <button onClick={() => { handleAuth("student"); setIsDropdownOpen(false); }} className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200">Login as Student</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <img
                            src={profilePicture}
                            alt="Profile"
                            className="w-10 h-10 rounded-full cursor-pointer"
                            onClick={() => {
                                const role = localStorage.getItem("user_role");
                                if (role === "mentor") navigate("/mentor-profile");
                            }}
                        />
                            {/* 🔸 Show Request Badge Button for Mentor */}
                            {localStorage.getItem("user_role") === "mentor" && (
                            <button
                            onClick={handleBadgeRequest}                        
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                            >
                                Request Badge
                            </button>
                            )}


                        <button
                            onClick={() => {
                                logout();
                                disconnectSocket();
                                localStorage.removeItem("user_role");
                                navigate("/");
                            }}
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
