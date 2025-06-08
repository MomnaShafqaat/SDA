import React, { useState } from 'react';
import studentService from '../services/studentServices';
import { useAuth0 } from '@auth0/auth0-react';
import PayButton from './payButton.jsx';

const MentorCard = ({ mentor }) => {
  const { picture, name, ratingSummary, skills, isVerified, _id } = mentor;
  const [sendRequest, setSendRequest] = useState(mentor?.requested);
  const { isAuthenticated } = useAuth0();
  const storedRole = localStorage.getItem('user_role');

  const handleRequest = () => {
    studentService.sendRequest(_id);
    setSendRequest(true);
  };

  const renderStars = (average) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-yellow-400 text-base ${i <= average ? '' : 'opacity-30'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="relative w-[300px] min-h-[360px] bg-white border-2-[#104D43]  rounded-3xl p-6 mt-8  shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col items-center">
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full overflow-hidden border-[5px] border-white shadow-xl bg-[#104D43]  -mt-2">
        <img
          src={picture}
          alt={name}
          onError={(e) => (e.target.src = 'https://via.placeholder.com/128')}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-gray-800 mt-4 truncate">{name}</h3>

      {/* Badges */}
      <div className="flex flex-wrap justify-center gap-2 mt-1">
        {isVerified && (
          <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow">
            Verified
          </span>
        )}
        {mentor.hasBadge && (
          <span className="bg-orange-400 text-white text-xs px-3 py-1 rounded-md shadow">
            Top Mentor
          </span>
        )}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Rating */}
      <div className="text-center mt-4">
        <div className="flex justify-center">{renderStars(ratingSummary?.average || 0)}</div>
        <p className="text-sm text-gray-600 mt-1">
          {ratingSummary?.average?.toFixed(1) || '0.0'} ({ratingSummary?.count || 0} reviews)
        </p>
      </div>

      {/* Buttons */}
      {isAuthenticated && (
        <div className="w-full mt-auto">
          <button
            onClick={handleRequest}
            disabled={sendRequest}
            className={`mt-6 w-full py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              sendRequest
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
            }`}
          >
            {sendRequest ? 'Request Sent ✓' : 'Request Mentorship'}
          </button>

          {storedRole === 'student' && mentor.badgeRequest?.status === 'accepted' && (
            <div className="mt-3">
              <PayButton mentorId={mentor._id} accountId={mentor.accountId} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MentorCard;
