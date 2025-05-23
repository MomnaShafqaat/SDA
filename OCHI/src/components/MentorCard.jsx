import React, { useState } from 'react';
import studentService from '../services/studentServices';
import { useAuth0 } from '@auth0/auth0-react';
import paymentService from "../services/paymentService";

const MentorCard = ({ mentor }) => {
  const { picture, name, ratings, skills, isVerified, _id } = mentor;
  const [sendRequest, setSendRequest] = useState(mentor?.requested);
  const { isAuthenticated } = useAuth0();
  const storedRole = localStorage.getItem("user_role");

  const handleRequest = () => {
    studentService.sendRequest(_id);
    setSendRequest(true);
  };

  const handlePayment = (e) => {
    e.stopPropagation();
    paymentService.makePayment(_id);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-xl ${
          i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
<div className="flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 w-72 mx-4 my-4">      <div className="relative mb-4">
        <img
          src={picture}
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/128';
          }}
        />
        {isVerified && (
          <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1.5">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2 truncate max-w-full px-2">
        {name}
      </h3>

      <div className="flex items-center mb-4">
        <div className="flex items-center mr-2">{renderStars(ratings.average)}</div>
        <span className="text-sm text-gray-500">
          ({ratings.count} reviews)
        </span>
      </div>

      <div className="w-full mb-4 flex-grow">  {/* Changed here */}
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


      {isAuthenticated && (
        <div className="w-full space-y-3 mt-auto">  {/* Added mt-auto here */}
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

          {storedRole === 'student' && (
            <button
              onClick={handlePayment}
              className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors"
            >
              Subscribe ($0.99/month)
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MentorCard;