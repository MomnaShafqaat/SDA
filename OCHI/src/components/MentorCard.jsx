import React, { useEffect } from 'react';
import studentService from '../services/studentServices'; // Adjust the import path as necessary
import { useState } from 'react';

const MentorCard = ({ mentor }) => {
  const { picture, name, ratings, skills, isVerified } = mentor;
  //initializes to the field in menotr which 
  //tells if the mentor has already been requested 
  const [sendRequest, setSendRequest] = useState(mentor?.requested); 
  

  const handleRequest = () => {
    const storedRole = localStorage.getItem("user_role");
    console.log("Stored Role:", storedRole);
    console.log("Mentor ID:", mentor._id);
    studentService.sendRequest(mentor._id) //mentor id is sent
    setSendRequest(true);
  };

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
    <div 
    className="border border-gray-200 rounded-lg p-4 text-center w-48 shadow-sm hover:shadow-md transition-shadow duration-200" >
      <img
        src={picture}
        //alt={name}
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
      <button
  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 mt-2"
  onClick={handleRequest}
  disabled={sendRequest}
>
  { 
  sendRequest ? 'Request Sent' : 'Get Mentored'}
</button>

    </div>
  );
};

export default MentorCard;