import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link,NavLink } from 'react-router-dom'

function Navbar() {
    const { loginWithPopup, logout, user, isAuthenticated } = useAuth0()

    return (
        <div className="fixed z-[999] w-full px-20 py-4 font-['Neue_Montreal'] flex justify-between items-center backdrop-blur-md bg-white/1">
            <div className="logo">
    <NavLink to="/">
        <img 
            src="/LOGO/mentora.png" 
            alt="Mentora Logo" 
            className="w-32 h-auto object-contain" 
        />
    </NavLink>
</div>
           
            <div className="links flex gap-10">
            <NavLink
                to="/contact"
                className={({isActive}) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                }
                >
                Contact US
            </NavLink>
            <NavLink
                to="/about"
                className={({isActive}) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                }
                >
                About Us
            </NavLink>
                {[  "Categories"].map((item, index) => (
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
