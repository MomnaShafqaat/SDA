import React from 'react';

const MentorCard = ({ mentor }) => {
  return (
    <div className="border p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-bold">{mentor.name}</h2>
      <p>Skills: {mentor.skills.join(', ')}</p>
      <p>Status: {mentor.status}</p>
      <p>Email: {mentor.contactEmail}</p>
      <p>Registered: {new Date(mentor.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default MentorCard;
