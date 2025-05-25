import React, { useEffect, useState } from 'react';
import studentService from '../services/studentServices';
import PayButton from './payButton.jsx';

function ViewMentors() {
  const [mentors, setMentors] = useState([]);

useEffect(() => {
  const fetchMentors = async () => {
    try {
      const response = await studentService.getMentors();
      console.log("🔁 API raw response:", response);
      console.log("✅ Mentors received:", response.data);
      setMentors(response.data.mentors);
    } catch (error) {
      console.error('❌ Failed to fetch mentors:', error);
    }
  };

  fetchMentors();
}, []);


  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
    <h1 className="text-3xl font-bold mb-6 text-center text-[#004D46]">Your Mentors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <>
          <div
            key={mentor._id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition duration-300"
          >
            <img
              src={mentor.profilePicture || '/default-avatar.png'}
              alt={mentor.name}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">{mentor.name}</h2>
            <p className="text-gray-600 text-sm mt-2 text-center">{mentor.bio}</p>
             <PayButton mentorId={mentor._id} accountId={mentor.accountId} />
          </div>
         
          </>
          
        ))}
      </div>
    </div>
  );
}

export default ViewMentors;