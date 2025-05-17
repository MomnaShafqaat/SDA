import React, { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const socketRef = useRef(null);
    const navigate = useNavigate(); // ✅ Added here

    const connectSocket = () => {
        if (!isAuthenticated || socketRef.current?.connected) return;

        socketRef.current = io('http://localhost:5000', {
            withCredentials: true,
            autoConnect: true,
        });

        socketRef.current.on('connect', () => {
            console.log('Socket connected:', socketRef.current.id);
        });

        socketRef.current.on('disconnect', () => {
            console.log('Socket disconnected : ', socketRef.current.id);
        });
    };

    const disconnectSocket = () => {
        if (socketRef.current) {
            console.log('Socket disconnected :', socketRef.current.id);
            socketRef.current.disconnect();
            socketRef.current = null;
            console.log('Socket connection cleaned up');
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            connectSocket();
        } else {
            disconnectSocket();
        }

        return () => disconnectSocket();
    }, [isAuthenticated]);

    useEffect(() => {
    const role = localStorage.getItem("user_role");
    setUserRole(role);
  }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
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

    const profilePicture = localStorage.getItem("profilePicture");

    return (
        <div className="fixed z-[999] w-full px-20 py-4 font-['Neue_Montreal'] flex justify-between items-center backdrop-blur-md bg-white/10 shadow-lg">
            <div className="logo">
                <NavLink to="/">
                    <img src="/LOGO/mentora.png" alt="Mentora Logo" className="w-32 h-auto object-contain" />
                </NavLink>
            </div>
            <div className="links flex gap-10 items-center">
                <NavLink to="/chatInterface" className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                }>Chat With Mentor</NavLink>
                <NavLink to="/contact" className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                }>Contact Us</NavLink>
                <NavLink to="/about" className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                }>About Us</NavLink>



      {/* Show Admin Dashboard only for authenticated admin users */}
      {isAuthenticated && isAdmin && (
          <button
            onClick={() => navigate("/admin")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Admin Dashboard
          </button>
        )}



{/*faltu*/}
   <button onClick={() => navigate("/admin")} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition" >Admin no auth </button>
{/*faltu*/}

        {/* Requests icon (only for mentors) */}
        {isAuthenticated && userRole === "mentor" && (
          <button
            onClick={() => navigate("/mentor-requests")}
            className="text-orange-600 hover:text-orange-800 transition"
            title="Mentor Requests"
          >
            <FaBell size={24} />
          </button>
        )}

                {/* Authentication Section */}
                {!isAuthenticated ? (
                    <div className="relative">
                        <button onClick={toggleDropdown} className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
                            Login
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden">
                                <button onClick={() => { handleAuth("mentor"); setIsDropdownOpen(false); }} className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 text-left">
                                    Login as Mentor
                                </button>
                                <button onClick={() => { handleAuth("student"); setIsDropdownOpen(false); }} className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 text-left">
                                    Login as Student
                                </button>
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
                                if (role === "mentor") {
                                    navigate("/mentor-profile"); // ✅ Redirect on profile icon click
                                }
                            }}
                        />
                        <button onClick={() => { logout(); disconnectSocket(); }} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
