"use client"

import { useRef, useState, useEffect } from "react"
import { io } from "socket.io-client"
import { useAuth0 } from "@auth0/auth0-react"
import { NavLink, useNavigate } from "react-router-dom"
import { FaBell } from "react-icons/fa"
import mentorService from "../services/mentorServices.jsx"
import { MdLogout } from "react-icons/md"
import { FaMedal } from "react-icons/fa"

function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const socketRef = useRef(null)
  const navigate = useNavigate()
  const [mentorData, setMentorData] = useState(null)
  const [badgeRequested, setBadgeRequested] = useState(false)

  useEffect(() => {
    if (isAuthenticated) connectSocket()
    else disconnectSocket()
    return () => disconnectSocket()
  }, [isAuthenticated])

  useEffect(() => {
    const role = localStorage.getItem("user_role")
    setUserRole(role)
  }, [])

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const auth0Id = localStorage.getItem("auth0Id")
        if (!auth0Id) return
        const mentor = await mentorService.getMentorByAuth0Id(auth0Id)
        setMentorData({
          hasBadge: mentor.hasBadge,
        })
      } catch (error) {
        console.error("Error fetching mentor data:", error)
      }
    }

    const role = localStorage.getItem("user_role")
    setUserRole(role)

    if (role === "mentor" && isAuthenticated) {
      fetchMentorData()
    }
  }, [isAuthenticated, badgeRequested])

  const connectSocket = () => {
    if (!isAuthenticated || socketRef.current?.connected) return
    socketRef.current = io("http://localhost:5000", { withCredentials: true, autoConnect: true })
    socketRef.current.on("connect", () => console.log("Socket connected:", socketRef.current.id))
    socketRef.current.on("disconnect", () => console.log("Socket disconnected:", socketRef.current.id))
  }

  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.disconnect()
      socketRef.current = null
    }
  }

  const handleAuth = (role) => {
    localStorage.setItem("user_role", role)
    loginWithRedirect({
      authorizationParams: {
        prompt: "login",
        redirect_uri: "http://localhost:3000/callback",
      },
      appState: { role },
    })
  }

  const handleBadgeRequest = async () => {
    const confirmed = window.confirm("Are you sure you want to request a badge? This action cannot be undone.")
    if (!confirmed) return
    try {
      const auth0Id = localStorage.getItem("auth0Id")
      if (!auth0Id) {
        alert("auth0Id not found in localStorage.")
        return
      }

      const result = await mentorService.sendVerificationRequest(auth0Id)
      alert(result.message)

      setBadgeRequested((prev) => !prev)
    } catch (err) {
      console.error(err)
      alert(err.message || "Error sending badge request")
    }
  }

  const profilePicture = localStorage.getItem("profilePicture")

  return (
    <nav className="fixed top-0 left-0 right-0 z-[999] bg-[#2d5a4a] shadow-lg">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img src="/LOGO/mentora.png" alt="Mentora Logo" className="h-5 w-auto" />
        </NavLink>

        {/* Compact Search Section for Students */}
        {userRole === "student" && (
          <div className="flex items-center gap-2">
            {/* Compact Expertise Filter */}
            <div className="relative">
              <select className="h-8 px-3 pr-8 bg-[#1e4a42] text-white text-xs border border-[#3a6b5d] rounded-md focus:outline-none focus:border-orange-400 appearance-none cursor-pointer">
                <option value="">All Skills</option>
                <option value="react">React</option>
                <option value="nodejs">Node.js</option>
                <option value="python">Python</option>
                <option value="design">Design</option>
              </select>
              <svg
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Compact Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search mentors..."
                className="h-8 w-64 pl-8 pr-3 bg-[#1e4a42] text-white text-xs placeholder-gray-300 border border-[#3a6b5d] rounded-md focus:outline-none focus:border-orange-400"
              />
              <svg
                className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {userRole === "student" && (
            <>
              <NavLink
                to="/student-dashboard"
                className={({ isActive }) =>
                  `text-xs font-medium transition-colors ${
                    isActive ? "text-orange-400" : "text-white hover:text-orange-300"
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/cv-analyzer"
                className={({ isActive }) =>
                  `text-xs font-medium transition-colors ${
                    isActive ? "text-orange-400" : "text-white hover:text-orange-300"
                  }`
                }
              >
                CV Analyzer
              </NavLink>
            </>
          )}

          {isAuthenticated && (
            <NavLink
              to="/chatInterface"
              className={({ isActive }) =>
                `text-xs font-medium transition-colors ${
                  isActive ? "text-orange-400" : "text-white hover:text-orange-300"
                }`
              }
            >
              Chat
            </NavLink>
          )}

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-xs font-medium transition-colors ${
                isActive ? "text-orange-400" : "text-white hover:text-orange-300"
              }`
            }
          >
            Contact
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-xs font-medium transition-colors ${
                isActive ? "text-orange-400" : "text-white hover:text-orange-300"
              }`
            }
          >
            About
          </NavLink>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-3 py-1.5 bg-orange-500 text-white text-xs font-medium rounded hover:bg-orange-600 transition-colors"
              >
                Login
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-xl border border-gray-200 py-1">
                  <button
                    onClick={() => {
                      handleAuth("mentor")
                      setIsDropdownOpen(false)
                    }}
                    className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 text-xs"
                  >
                    Login as Mentor
                  </button>
                  <button
                    onClick={() => {
                      handleAuth("student")
                      setIsDropdownOpen(false)
                    }}
                    className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 text-xs"
                  >
                    Login as Student
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Mentor Actions */}
              {userRole === "mentor" && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => navigate("/mentor-requests")}
                    className="p-1.5 text-white hover:text-orange-300 transition-colors"
                    title="Mentor Requests"
                  >
                    <FaBell size={14} />
                  </button>
                  {!mentorData?.hasBadge && (
                    <button
                      onClick={handleBadgeRequest}
                      className="p-1.5 text-white hover:text-orange-300 transition-colors"
                      title="Request Badge"
                    >
                      <FaMedal size={14} />
                    </button>
                  )}
                </div>
              )}

              {/* Compact User Profile */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const role = localStorage.getItem("user_role")
                    navigate(role === "mentor" ? "/mentor-profile" : "/student-profile")
                  }}
                  className="flex items-center gap-2 text-white hover:text-orange-300 transition-colors"
                >
                  <div className="relative">
                    <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    {mentorData?.hasBadge && (
                      <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-400 rounded-full border border-white"></div>
                    )}
                  </div>
                  <div className="text-left hidden lg:block">
                    <div className="text-xs font-medium truncate max-w-32">{user?.email}</div>
                    <div className="text-[10px] text-gray-300 capitalize">{userRole}</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    logout()
                    disconnectSocket()
                    localStorage.removeItem("user_role")
                    navigate("/")
                  }}
                  className="p-1.5 text-white hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <MdLogout size={14} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
