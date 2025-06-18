"use client"

import { useEffect, useState } from "react"
import mentorService from "../services/mentorServices"
import avatar from "../assets/avatar.png"
import ReportModal from "./reportModal"
import { useNavigate } from "react-router-dom"

function MentorDashboard() {
  const [students, setStudents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await mentorService.getMentees()
        setStudents(response.data.mentees)
      } catch (error) {
        console.error("Failed to fetch students:", error)
      }
    }

    fetchStudents()
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-800 via-emerald-800 to-slate-900 p-4 sm:p-6 lg:p-8">
      {/* Fixed Container with Rounded Edges */}
      <div className="w-full h-full bg-gradient-to-br from-stone-50 to-amber-50/30 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        {/* Fixed Header */}
        <div className="flex-shrink-0 px-6 py-8 bg-white/50 backdrop-blur-sm border-b border-white/20">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">Mentor Dashboard</h1>
            <p className="text-slate-600 text-base sm:text-lg">Connect with your mentees and track their progress</p>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
            {students.map((student, index) => (
              <div
                key={student._id}
                className="group relative bg-white backdrop-blur-sm rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-white/50 overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Decorative gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/6 via-merald-700/6 to-orange-700/6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Card Content */}
                <div className="relative p-6 flex flex-col items-center">
                  {/* Avatar Section */}
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-orange-100 p-1 shadow-lg">
                      <img
                        src={student.picture || avatar}
                        alt={student.name}
                        className="w-full h-full rounded-xl object-cover"
                      />
                    </div>
                    {/* Online indicator */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-3 border-white shadow-sm">
                      <div className="w-full h-full bg-emerald-400 rounded-full animate-pulse" />
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <h2 className="text-lg font-semibold text-slate-800 mb-1">{student.name}</h2>
                    {student.email && <p className="text-sm text-slate-500 mb-2">{student.email}</p>}
                    {student.course && (
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-emerald-100 to-orange-100 text-emerald-700 text-xs font-medium rounded-full">
                        {student.course}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 w-full">
                    <button
                      onClick={(e) => {
                        e.stopPropagation() // Prevent parent onClick from firing
                        navigate(`/student-profile/${student._id}`)
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 font-medium shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] group/btn"
                    >
                      View Profile
                      <svg
                        className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => navigate(`/chatInterface?student=${student._id}`)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-medium shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02]"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      Chat Now
                    </button>

                    <button
                      onClick={() => setShowModal(true)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-slate-200 text-slate-600 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 font-medium hover:scale-[1.02]"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                        />
                      </svg>
                      Report User
                    </button>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-orange-500/10 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {students.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-orange-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No mentees yet</h3>
              <p className="text-slate-600">Your mentees will appear here once they're assigned to you.</p>
            </div>
          )}
        </div>
      </div>

      {/* Report Modal */}
      {showModal && <ReportModal reportedId={students.find(() => true)?._id} onClose={() => setShowModal(false)} />}
    </div>
  )
}

export default MentorDashboard
