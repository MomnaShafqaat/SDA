"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import studentService from "../services/studentServices"
import PayButton from "./payButton.jsx"
import ReportModal from "./reportModal.jsx"
import ReviewForm from "./ReviewForm.jsx"
import { useAuth0 } from "@auth0/auth0-react"

function ViewMentors() {
  const [mentors, setMentors] = useState([])
  const [reportingMentorId, setReportingMentorId] = useState(null)
  const [activeReviewMentor, setActiveReviewMentor] = useState(null)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const { user, isAuthenticated } = useAuth0()
  const auth0Id = user?.sub

  const navigate = useNavigate()

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await studentService.getMentors()
        setMentors(response.data.mentors)
        console.log("Fetched mentors:", response.data.mentors)
      } catch (error) {
        console.error("Failed to fetch mentors:", error)
      }
    }

    fetchMentors()
  }, [])

  const handleReviewSubmit = async (mentorId) => {
    try {
      if (!auth0Id) {
        alert("User not authenticated")
        return
      }

      await studentService.submitReview(mentorId, {
        rating,
        reviewText,
        reviewerId: auth0Id,
      })

      setRating(0)
      setReviewText("")
      setActiveReviewMentor(null)
      setShowReviewForm(false)
      alert("Review submitted successfully!")
    } catch (error) {
      console.error("Failed to submit review:", error)
      alert("Failed to submit review.")
    }
  }

  const renderStars = (average) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(average)) {
        // Full star
        stars.push(
          <span key={i} className="text-yellow-400 text-sm">
            ★
          </span>,
        )
      } else if (i === Math.ceil(average) && average % 1 !== 0) {
        // Partial star
        stars.push(
          <span key={i} className="text-yellow-400 text-sm opacity-50">
            ★
          </span>,
        )
      } else {
        // Empty star
        stars.push(
          <span key={i} className="text-gray-300 text-sm">
            ★
          </span>,
        )
      }
    }
    return stars
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-800 via-emerald-800 to-slate-900 p-4 sm:p-6 lg:p-8">
      {/* Fixed Container with Rounded Edges */}
      <div className="w-full h-full bg-gradient-to-br from-stone-50 to-amber-50/30 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        {/* Fixed Header */}
        <div className="flex-shrink-0 px-6 py-8 bg-white/50 backdrop-blur-sm border-b border-white/20">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">Your Mentors</h1>
            <p className="text-slate-600 text-base sm:text-lg">
              Connect with experienced professionals to guide your journey
            </p>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
            {mentors.map((mentor, index) => (
              <div
                key={mentor._id}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-white/50 overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Decorative gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Card Content */}
                <div className="relative p-6 flex flex-col items-center">
                  {/* Avatar Section */}
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-orange-100 p-1 shadow-lg">
                      <img
                        src={mentor.picture || "/default-avatar.png"}
                        alt={mentor.name}
                        className="w-full h-full rounded-xl object-cover"
                      />
                    </div>
                    {/* Online indicator */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-3 border-white shadow-sm">
                      <div className="w-full h-full bg-emerald-400 rounded-full animate-pulse" />
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <h2 className="text-lg font-semibold text-slate-800 mb-1">{mentor.name}</h2>
                    <p className="text-sm text-slate-500 mb-3">{mentor.location || "Remote"}</p>

                    {/* Expertise Tags */}
                    {mentor.expertise?.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-2 mb-3">
                        {mentor.expertise.slice(0, 3).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="inline-block px-3 py-1 bg-gradient-to-r from-emerald-100 to-orange-100 text-emerald-700 text-xs font-medium rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {mentor.expertise.length > 3 && (
                          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                            +{mentor.expertise.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Bio */}
                    <p className="text-sm text-slate-600 text-center line-clamp-2 mb-4">
                      {mentor.bio || "Experienced professional with a proven track record."}
                    </p>

                    {/* Rating Section */}
                    <div className="bg-white/60 rounded-xl p-3 mb-4">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        {renderStars(mentor.ratingSummary?.average || 0)}
                      </div>
                      <div className="text-sm font-medium text-slate-700">
                        {mentor.ratingSummary?.average?.toFixed(1) || "0.0"}
                      </div>
                      <div className="text-xs text-slate-500">({mentor.ratingSummary?.count || 0} reviews)</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 w-full">
                    <button
                      onClick={() => navigate(`/mentor-profile/${mentor.auth0Id}`)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 font-medium shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] group/btn"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
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
                      onClick={() => navigate(`/chatInterface?mentor=${mentor.auth0Id}`)}
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

                    {/* Payment Button */}
                    {mentor.isPayed ? (
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium shadow-lg shadow-green-500/25 cursor-default">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Paid
                      </button>
                    ) : (
                      <div className="w-full">
                        <PayButton mentorId={mentor._id} accountId={mentor.accountId} />
                      </div>
                    )}

                    <button
                      onClick={() => setReportingMentorId(mentor._id)}
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

                    <button
                      onClick={() => {
                        setActiveReviewMentor(mentor._id)
                        setShowReviewForm(true)
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02]"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                      Write a Review
                    </button>

                    {/* Report Modal */}
                    {reportingMentorId === mentor._id && (
                      <ReportModal reportedId={mentor._id} onClose={() => setReportingMentorId(null)} />
                    )}

                    {/* Review Form */}
                    {showReviewForm && activeReviewMentor === mentor._id && (
                      <ReviewForm
                        rating={rating}
                        setRating={setRating}
                        reviewText={reviewText}
                        setReviewText={setReviewText}
                        onSubmit={() => handleReviewSubmit(mentor._id)}
                        onClose={() => {
                          setShowReviewForm(false)
                          setActiveReviewMentor(null)
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-orange-500/10 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {mentors.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-orange-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No mentors available</h3>
              <p className="text-slate-600">Check back later for available mentors to guide your journey.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewMentors
