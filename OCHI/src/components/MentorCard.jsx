import React, { useState } from 'react';
import studentService from '../services/studentServices';
import { useAuth0 } from '@auth0/auth0-react';
import PayButton from './payButton.jsx';

const MentorCard = ({ mentor }) => {
  const { picture, name, ratings, skills, isVerified, _id } = mentor;
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

  const handleSubmitReview = async () => {
    await studentService.submitReview(_id, {
      review: reviewText,
      rating,
    });
    setShowReviewForm(false);
    setReviewText('');
    setRating(0);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-xl ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
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

        {/* Ratings */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center mr-2">{renderStars(ratings.average)}</div>
          <span className="text-sm text-gray-500">({ratings.count} reviews)</span>
        </div>

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

            <button
              onClick={() => setShowReviewForm(true)}
              className="w-full mt-2 py-2 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              Write a Review
            </button>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-2">Submit a Review</h2>

            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`cursor-pointer text-2xl ${
                    i < rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  onClick={() => setRating(i + 1)}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Write your review here..."
              rows="4"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowReviewForm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MentorCard;
