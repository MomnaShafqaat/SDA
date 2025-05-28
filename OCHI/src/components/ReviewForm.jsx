// components/ReviewForm.jsx
import React from 'react';






const ReviewForm = ({
  rating,
  setRating,
  reviewText,
  setReviewText,
  onClose,
  onSubmit,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-2">Submit a Review</h2>

        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`cursor-pointer text-2xl ${
                i < rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => setRating(i + 1)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Write your review here..."
          rows="4"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
