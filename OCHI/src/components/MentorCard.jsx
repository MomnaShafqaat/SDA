import React, { useState } from 'react';
import studentService from '../services/studentServices';
import { useAuth0 } from '@auth0/auth0-react';
import PayButton from './payButton.jsx';

const MentorCard = ({ mentor }) => {
  const { picture, name, ratingSummary, skills, isVerified, _id } = mentor;
  const [sendRequest, setSendRequest] = useState(mentor?.requested);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const { isAuthenticated } = useAuth0();
  const storedRole = localStorage.getItem('user_role');

  const handleRequest = () => {
    studentService.sendRequest(_id);
    setSendRequest(true);
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
    <>
      {/* Mentor Card */}
      <div className="flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 w-72 mx-4 my-4 text-center">
        {/* Picture */}
        <div className="relative mb-4 flex justify-center w-full">
          <img
            src={picture}
            alt={name}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/128';
            }}
          />
          {isVerified && (
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1.5">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate max-w-full px-2">{name}</h3>

        {/* Skills */}
        <div className="w-full mb-4">
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Ratings */}
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


        

        {/* Buttons */}
        {isAuthenticated && (
          <div className="w-full space-y-3 mt-auto flex flex-col items-center">
            <button
              onClick={handleRequest}
              disabled={sendRequest}
              className={`w-full py-2 px-4 rounded-xl font-semibold transition-colors ${
                sendRequest
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {sendRequest ? 'Request Sent ✓' : 'Request Mentorship'}
            </button>

            {storedRole === 'student' && mentor.badgeRequest?.status === 'accepted' && (
              <PayButton mentorId={mentor._id} accountId={mentor.accountId} />
            )}
            </div>
        )}
      </div>
    </>
  );
};

export default MentorCard;
