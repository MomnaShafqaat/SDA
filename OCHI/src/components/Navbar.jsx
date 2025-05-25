import React, { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBell } from 'react-icons/fa';
import mentorService from "../services/mentorServices.jsx";
import { MdLogout } from 'react-icons/md'; // Material Design
import { FaMedal } from 'react-icons/fa';
import DropdownMenu from './DropdownMenu.jsx';
import SearchBar from './Searchbar.jsx';
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
        <div className="fixed z-[999] w-full px-10 py-2 font-['Neue_Montreal'] flex justify-between items-center bg-[#2E7C75]
  ">
            <NavLink to="/">
                <img src="/LOGO/mentora.png" alt="Mentora Logo" className="w-18 h-5 object-contain" />
            </NavLink>
            {
                        userRole === "student" && (
            <>
                <DropdownMenu />
                <SearchBar/>
            </>
                        )}
            <div className="flex gap-7 items-center text-sm">
                

                <>
                    {
    userRole === "student" && (
        <>
            <NavLink 
                to="/student-dashboard" 
                className={({ isActive }) => 
                    `block py-2 pr-4 pl-3 duration-200 text-lg ${
                        isActive ? "text-orange-700" : "text-white-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                }
            >
                Dashboard
            </NavLink>
        </>
    )
}



                    {
                        isAuthenticated && <NavLink to="/chatInterface" className={({ isActive }) =>
                            `block py-2 pr-4 pl-3 duration-200 text-lg ${isActive ? "text-orange-700" : "text-white-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                        }>Chat</NavLink>
                    }


                    <NavLink to="/contact" className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 text-lg ${isActive ? "text-orange-700" : "text-white-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }>Contact Us</NavLink>
                    <NavLink to="/about" className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 text-lg ${isActive ? "text-orange-700" : "text-white-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }>About Us</NavLink>

                </>

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
                    <div className="flex items-center gap-[-6] ">

                                            {
                        userRole === "mentor" && (
                            <>
                                <button onClick={() => navigate("/mentor-requests")} className="text-orange-300 hover:text-orange-500 transition" title="Mentor Requests">
                                    <FaBell size={24} />
                                </button>
                            </>)
                    }

                        {/* 🔸 Show Request Badge Button for Mentor */}
                        {localStorage.getItem("user_role") === "mentor" && (
                            <button
                                onClick={handleBadgeRequest}
                                className="px-4 py-2 "

                            >
                                <FaMedal className="text-orange-300 text-xl" />

                            </button>
                        )}
                        <img
                            src={profilePicture}
                            alt="Profile"
                            className="w-6 h-6 rounded-full cursor-pointer"
                            onClick={() => {
                                const role = localStorage.getItem("user_role");
                                if (role === "mentor") navigate("/mentor-profile");
                                else {
                                    navigate("/student-profile");
                                }
                            }}
                        />


                        <button
                            onClick={() => {
                                logout();
                                disconnectSocket();
                                localStorage.removeItem("user_role");
                                navigate("/");
                            }}
                            className="px-4 py-2 text-white  hover:text-orange transition"
                        >

                            <MdLogout className="text-l" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
