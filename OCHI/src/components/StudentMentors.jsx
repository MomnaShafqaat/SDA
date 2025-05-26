import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import studentService from '../services/studentServices';
import PayButton from './payButton.jsx';

function ViewMentors() {
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await studentService.getMentors();
        setMentors(response.data.mentors);
      } catch (error) {
        console.error('Failed to fetch mentors:', error);
      }
    };

    fetchMentors();
  }, []);

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

            {/* Expertise Tags (Optional fallback) */}
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

            <div className="mt-6 flex flex-col gap-3 w-full">
              <button
                onClick={() => navigate(`/mentor/${mentor.auth0Id}`)}
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

              <PayButton mentorId={mentor._id} accountId={mentor.accountId} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewMentors;
