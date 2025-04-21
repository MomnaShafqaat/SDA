import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

    const profilePicture = localStorage.getItem("profilePicture");

    return (
        <div className="fixed z-[999] w-full px-20 py-4 font-['Neue_Montreal'] flex justify-between items-center backdrop-blur-md bg-white/10 shadow-lg">
            <div className="logo">
                <NavLink to="/">
                    <img src="/LOGO/mentora.png" alt="Mentora Logo" className="w-32 h-auto object-contain" />
                </NavLink>
            </div>
            <div className="links flex gap-10 items-center">
            <NavLink to="/chatInterface" className={({isActive}) =>
              `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
            }>Chat With Mentor</NavLink>
                <NavLink to="/contact" className={({isActive}) =>
              `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
            }>Contact Us</NavLink>
                <NavLink to="/about" className={({isActive}) =>
              `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
          }>About Us</NavLink>
                

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
                                    onClick={() => {
                                        handleAuth("mentor");
                                        setIsDropdownOpen(false);
                                    }} 
                                    className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 text-left"
                                >
                                    Login as Mentor
                                </button>
                                <button 
                                    onClick={() => {
                                        handleAuth("student");
                                        setIsDropdownOpen(false);
                                    }} 
                                    className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 text-left"
                                >
                                    Login as Student
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <img src={profilePicture} alt="Profile" className="w-10 h-10 rounded-full" />
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
