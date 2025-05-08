import React from 'react';

const ReviewCard = ({ review }) => {
  return (
    <div className="border p-4 rounded shadow-md mb-4">
      <h3 className="font-bold">{review.reviewerName}</h3>
      <p>Rating: {review.rating} ⭐</p>
      <p>{review.text}</p>
      <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
    </div>
  );
};

export default ReviewCard;
