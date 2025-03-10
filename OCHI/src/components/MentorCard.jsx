import React from 'react';

const MentorCard = ({ mentor }) => {
  const { profilePictureUrl, name, ratings, skills, isVerified } = mentor;

  // Function to render rating stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 text-center w-48 shadow-sm hover:shadow-md transition-shadow duration-200">
      <img
        src={profilePictureUrl}
        alt={name}
        className="w-24 h-24 rounded-full object-cover mx-auto mb-3"
      />
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <div className="flex justify-center items-center space-x-1 mb-2">
        {renderStars(ratings.rating)}
        <span className="text-sm text-gray-600">({ratings.average})</span>
      </div>
      <p className="text-sm text-gray-600 mb-2">
        {skills.join(', ')}
      </p>
      {isVerified && (
        <span className="text-sm text-green-600">Verified Mentor</span>
      )}
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 mt-2">
        Get Mentored
      </button>
    </div>
  );
};

export default MentorCard;