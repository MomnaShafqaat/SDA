import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

    const handleAuth = (role) => {
        localStorage.setItem("user_role", role); //Storing  role locally
        loginWithRedirect({
            authorizationParams: {
                prompt: "login",
                redirect_uri: "http://localhost:3000/callback", 
            },
            appState: { role }, //Send role to Callback.jsx
        });
    };

    return (
        <div className="fixed z-[999] w-full px-20 py-4 font-['Neue_Montreal'] flex justify-between items-center backdrop-blur-md bg-white/1">
            <div className="logo">
                <NavLink to="/">
                    <img src="/LOGO/mentora.png" alt="Mentora Logo" className="w-32 h-auto object-contain" />
                </NavLink>
            </div>
            <div className="links flex gap-10">
                <NavLink to="/contact" className="text-gray-700 hover:text-orange-700">Contact Us</NavLink>
                <NavLink to="/about" className="text-gray-700 hover:text-orange-700">About Us</NavLink>

                {!isAuthenticated ? (
                    <div className="dropdown">
                        <button>Login</button>
                        <div className="dropdown-content">
                            <button onClick={() => handleAuth("mentor")}>Login as Mentor</button>
                            <button onClick={() => handleAuth("student")}>Login as Student</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <img src={user.picture} alt="Profile" className="w-10 h-10 rounded-full" />
                        <button onClick={() => logout()}>Logout</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
