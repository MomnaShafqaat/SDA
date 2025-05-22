import React, { useEffect, useState } from 'react';
import mentorService from '../services/mentorServices';

function MentorDashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await mentorService.getMentees();
        setStudents(response.data.mentees);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      }
    };



    
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-#004D46-700">Mentor Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student._id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition duration-300"
          >
            <img
              src={student.profilePicture || '/default-avatar.png'}
              alt={student.name}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">{student.name}</h2>
            <p className="text-gray-600 text-sm mt-2 text-center">{student.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MentorDashboard;
