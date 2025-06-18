"use client"

import { useNavigate } from "react-router-dom"
import { BarChart3, Award, AlertTriangle, LogOut } from "lucide-react"

const navItems = [
  { name: "User Counter", id: "user-counter", icon: BarChart3 },
  { name: "Request Badge", id: "badge-requests", icon: Award },
  { name: "Reports", id: "reports", icon: AlertTriangle },
]

const AdminNavbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("jwt_token")
    localStorage.removeItem("user_role")
    localStorage.removeItem("auth0Id")
    navigate("/loginAdmin")
  }

  const scrollToSection = (sectionId) => {
    // Force a small delay to ensure DOM is ready
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const element = document.querySelector(`#${sectionId}`)
        if (element) {
          const rect = element.getBoundingClientRect()
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop
          const targetPosition = rect.top + scrollTop - 100 // 100px offset from top

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        } else {
          // Fallback - just scroll to bottom if reports section
          if (sectionId === "reports") {
            window.scrollTo({
              top: document.body.scrollHeight - window.innerHeight,
              behavior: "smooth",
            })
          }
        }
      })
    })
  }

  return (
    <nav className="bg-gradient-to-r from-emerald-700 to-emerald-800 shadow-lg border-b-2 border-emerald-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-md"></div>
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <p className="text-xs text-emerald-200">Management Dashboard</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-emerald-100 hover:text-white hover:bg-emerald-600 hover:scale-105"
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </button>
              )
            })}
          </div>

          {/* Mobile Menu Button & Logout */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-emerald-100 hover:text-white p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg hover:scale-105"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="md:hidden pb-4">
          <div className="grid grid-cols-1 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-emerald-100 hover:text-white hover:bg-emerald-600 w-full text-left"
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar
