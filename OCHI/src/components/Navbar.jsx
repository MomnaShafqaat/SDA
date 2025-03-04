import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function Navbar() {
    const { loginWithPopup, logout, user, isAuthenticated } = useAuth0()

    return (
        <div className="fixed z-[999] w-full px-20 py-4 font-['Neue_Montreal'] flex justify-between items-center backdrop-blur-md bg-white/1">
            <div className="logo">
                <img src="/LOGO/mentora.png" alt="Mentora Logo" className="w-32 h-auto object-contain" />
            </div>

            <div className="links flex gap-10">
                {["Contact us", "About Us", "Categories"].map((item, index) => (
                    <a key={index} >
                        {item}
                    </a>
                ))}
                
                {!isAuthenticated ? (
                    <button  onClick={() => loginWithPopup()}  style={{  cursor: 'pointer' }} >
                        Login 
                    </button>
                ) : (
                    <>
                        <div>
                            <img
                                src={user.picture}
                                alt="Profile"
                                style={{ width: "40px", height: "40px", borderRadius: "50%", cursor: 'pointer' }}
                            />
                        </div>
                        <div>
                            <button onClick={() => logout()}>Logout</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar
