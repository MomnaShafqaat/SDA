import React from 'react';
import { useNavigate } from 'react-router-dom';

const BadgeRequestCard = ({ mentor, onAccept, onReject }) => {
  const navigate = useNavigate();

 // const handleViewProfile = () => {
 //   navigate('/mentor-profile', { state: { mentorId: mentor._id } });
 // };

const handleViewProfile = () => {
navigate(`/admin/mentor-profile/${mentor._id}`);

};

  const handleAccept = () => {
    const confirmed = window.confirm(`Are you sure you want to accept ${mentor.name}'s badge request?`);
    if (confirmed) onAccept();
  };

  const handleReject = () => {
    const confirmed = window.confirm(`Are you sure you want to reject ${mentor.name}'s badge request?`);
    if (confirmed) onReject();
  };


  return (
    <tr className="border-b border-gray-400 hover:bg-gray-50 transition duration-200">
      <td className="px-6 py-4 font-semibold text-gray-800">{mentor.name}</td>
      <td className="px-6 py-4 text-gray-600">{mentor.email}</td>
      <td className="px-6 py-2">
        <button
          onClick={handleViewProfile}
          className="bg-[#004D43] hover:bg-[#003730] text-white text-sm font-medium px-5 py-2 rounded-full shadow-md transition-all duration-200"
        >
          View Profile
        </button>
      </td>
      <td className="px-6 py-4 flex items-center space-x-3">
        <button
          onClick={handleAccept}
          className="bg-green-700 hover:bg-green-600 text-white text-sm font-medium px-5 py-2 rounded-full shadow-sm transition-all duration-200"
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="bg-red-700 hover:bg-red-600 text-white text-sm font-medium px-5 py-2 rounded-full shadow-sm transition-all duration-200"
        >
          Reject
        </button>
      </td>
    </tr>
  );
};

export default BadgeRequestCard;
