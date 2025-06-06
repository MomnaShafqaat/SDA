import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import studentService from '../services/studentServices';
import PayButton from './payButton.jsx';
import ReportModal from './reportModal.jsx';
import ReviewForm from './ReviewForm.jsx';
import { useAuth0 } from "@auth0/auth0-react";

function ViewMentors() {
  const [mentors, setMentors] = useState([]);
  //const [showModal, setShowModal] = useState(false);
  const [reportingMentorId, setReportingMentorId] = useState(null);

  const [activeReviewMentor, setActiveReviewMentor] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const { user, isAuthenticated } = useAuth0();
  const auth0Id = user?.sub;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await studentService.getMentors();
        setMentors(response.data.mentors);
        console.log('Fetched mentors:', response.data.mentors);
      } catch (error) {
        console.error('Failed to fetch mentors:', error);
      }
    };
    
    fetchMentors();
  }, []);

  

  const handleReviewSubmit = async (mentorId) => {
    try {
      if (!auth0Id) {
        alert("User not authenticated");
        return;
      }

      await studentService.submitReview(mentorId, { 
        rating,
        reviewText,
        reviewerId:auth0Id
      });

      setRating(0);
      setReviewText('');
      setActiveReviewMentor(null);
      setShowReviewForm(false);
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review.');
    }
  };
  const renderStars = (average) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(average)) {
      // Full star
      stars.push(
        <span key={i} className="text-yellow-400 text-sm">★</span>
      );
    } else if (i === Math.ceil(average) && average % 1 !== 0) {
      // Partial star (optional, or treat as half star if you want)
      stars.push(
        <span key={i} className="text-yellow-400 text-sm opacity-50">★</span>
      );
    } else {
      // Empty star
      stars.push(
        <span key={i} className="text-gray-300 text-sm">★</span>
      );
    }
  }
  return stars;
};

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Mentors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <div
            key={mentor._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-6 flex flex-col items-center"
          >
            <img
              src={mentor.picture || '/default-avatar.png'}
              alt={mentor.name}
              className="w-24 h-24 rounded-lg object-cover border-2 border-white shadow-sm mb-4"
            />
            <h2 className="text-xl font-bold text-gray-900">{mentor.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{mentor.location || 'Remote'}</p>

            {mentor.expertise?.length > 0 && (
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {mentor.expertise.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {mentor.expertise.length > 3 && (
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    +{mentor.expertise.length - 3} more
                  </span>
                )}
              </div>
            )}

            <p className="mt-4 text-gray-600 text-sm text-center line-clamp-2">
              {mentor.bio || 'Experienced professional with a proven track record.'}
            </p>

           <div className="mt-3 text-center">
            <div className="flex items-center justify-center gap-1">
              {renderStars(mentor.ratingSummary?.average || 0)}
            </div>
            <div className="text-sm text-gray-700 mt-1">
              Average Rating: {mentor.ratingSummary?.average?.toFixed(1) || '0.0'}
            </div>
            <div className="text-xs text-gray-500">
              ({mentor.ratingSummary?.count || 0} reviews)
            </div>
          </div>


            <div className="mt-6 flex flex-col gap-3 w-full">
              {/* Use mentor.auth0Id for routes */}
              <button
                onClick={() => navigate(`/mentor-profile/${mentor.auth0Id}`)}
                className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center"
              >
                View Profile
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <button
                onClick={() => navigate(`/chatInterface?mentor=${mentor.auth0Id}`)}
                className="px-4 py-2.5 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
              >
                Chat Now
              </button>

              {/* Use mentor._id for payments and backend operations */}
              {
                mentor.isPayed ? (
                <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2.5 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
              >
                Payed
              </button>
              ) : (
              <PayButton mentorId={mentor._id} accountId={mentor.accountId} />
                )
              }
              

              <button
  onClick={() => setReportingMentorId(mentor._id)}
  className="px-4 py-2.5 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium">
  Report User
</button>

{reportingMentorId === mentor._id && (
  <ReportModal
    reportedId={mentor._id}
    onClose={() => setReportingMentorId(null)}
  />
)}


              <button
                onClick={() => {
                  setActiveReviewMentor(mentor._id); // important: use _id here
                  setShowReviewForm(true);
                }}
                className="w-full mt-2 py-2 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                Write a Review
              </button>

              {showReviewForm && activeReviewMentor === mentor._id && (
                <ReviewForm
                  rating={rating}
                  setRating={setRating}
                  reviewText={reviewText}
                  setReviewText={setReviewText}
                  onSubmit={() => handleReviewSubmit(mentor._id)}
                  onClose={() => {
                    setShowReviewForm(false);
                    setActiveReviewMentor(null);
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewMentors;
