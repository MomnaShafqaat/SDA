import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mentorService from '../services/mentorServices';
import avatar from '../assets/avatar.png';
import ReportModal from './reportModal';

function MentorDashboard() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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
      <h1 className="text-3xl font-bold mb-6 text-center">Mentor Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-6 flex flex-col items-center"
          >
           <img
              src={student.picture || avatar} 
              alt={student.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            />
            <h2 className="text-xl font-bold text-gray-900">{student.name}</h2>

            <div className="mt-6 flex flex-col gap-3 w-full">
            <button
              onClick={(e) => {
              e.stopPropagation(); // Prevent parent onClick from firing
              navigate(`/student-profile/${student._id}`);
            }}
              className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center"
            >
              View Profile
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

              <button
                onClick={() => navigate(`/chatInterface?student=${student._id}`)}
                className="px-4 py-2.5 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
              >
                Chat Now
              </button>

               <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2.5 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
              >
                Report User
              </button>


              {showModal && (
        <ReportModal
          reportedId= {student._id}
          onClose={() => setShowModal(false)}
        />
      )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MentorDashboard;
