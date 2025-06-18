"use client"

import { useEffect, useState } from "react"
import mentorService from "../services/mentorServices"
import { useAuth0 } from "@auth0/auth0-react"
import MentorNotifications from "./MentorNotification"

const MentorRequests = () => {
  const [requests, setRequests] = useState([])
  const { isAuthenticated } = useAuth0()

  const fetchRequests = async () => {
    if (!isAuthenticated) return

    try {
      const response = await mentorService.getMentorRequests()
      setRequests(response.data.pendingRequests || [])
    } catch (error) {
      console.error("Error fetching mentor requests:", error)
    }
  }

  const handleRequestAction = async (studentId, action) => {
    try {
      const response = await mentorService.updateRequestStatus(studentId, action)
      console.log(`Request ${action} successfully:`, response.data)
      fetchRequests() // Refresh list
    } catch (error) {
      console.error(`Error while ${action} request:`, error)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [isAuthenticated])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-800 via-emerald-800 to-slate-900 p-4 sm:p-6 lg:p-8">
      {/* Fixed Container with Rounded Edges */}
      <div className="w-full h-full bg-gradient-to-br from-stone-50 to-amber-50/30 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        {/* Fixed Header */}
        <div className="flex-shrink-0 px-6 py-8 bg-white/50 backdrop-blur-sm border-b border-white/20">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">Mentor Dashboard</h2>
            <p className="text-slate-600 text-base sm:text-lg">Manage your mentoring requests and notifications</p>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Notifications Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-white/50 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-5 5v-5zM9 7H4l5-5v5zM12 12l8-8M12 12l-8 8M12 12V4M12 12H4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">Notifications</h3>
                </div>
                <MentorNotifications />
              </div>
            </div>

            {/* Requests Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-white/50 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-slate-800">Your Mentor Requests</h2>
                  {requests.length > 0 && (
                    <span className="ml-auto bg-gradient-to-r from-emerald-100 to-orange-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                      {requests.length} pending
                    </span>
                  )}
                </div>

                {requests.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-orange-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                      <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">No requests yet</h3>
                    <p className="text-slate-600">
                      New mentoring requests will appear here when students reach out to you.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {requests.map((request, index) => (
                      <div
                        key={request._id}
                        className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-white/50 overflow-hidden"
                        style={{
                          animationDelay: `${index * 100}ms`,
                        }}
                      >
                        {/* Decorative gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-orange-100 rounded-xl flex items-center justify-center">
                                  <svg
                                    className="w-6 h-6 text-emerald-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-slate-800">{request.name}</h3>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {request.skills?.map((skill, skillIndex) => (
                                      <span
                                        key={skillIndex}
                                        className="inline-block px-3 py-1 bg-gradient-to-r from-emerald-100 to-orange-100 text-emerald-700 text-xs font-medium rounded-full"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 ml-6">
                              <button
                                onClick={() => handleRequestAction(request._id, "accept")}
                                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 font-medium shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                Accept
                              </button>
                              <button
                                onClick={() => handleRequestAction(request._id, "reject")}
                                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                                Reject
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Decorative corner accent */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-orange-500/10 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MentorRequests
