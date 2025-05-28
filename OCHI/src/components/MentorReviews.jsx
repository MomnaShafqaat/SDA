import React, { useEffect, useState } from 'react';
import studentService from '../services/studentServices'; // adjust the path as needed

const renderStars = (average) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(average)) {
      stars.push(<span key={i} className="text-yellow-400 text-sm">★</span>);
    } else if (i === Math.ceil(average) && average % 1 !== 0) {
      stars.push(<span key={i} className="text-yellow-400 text-sm opacity-50">★</span>);
    } else {
      stars.push(<span key={i} className="text-gray-300 text-sm">★</span>);
    }
  }
  return stars;
};

const MentorReviews = ({ mentorId }) => {
  const [reviews, setReviews] = useState([]);
  const [ratingSummary, setRatingSummary] = useState({ average: 0, count: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await studentService.getMentorReviews(mentorId);
        setReviews(res.data?.reviews || []);
        setRatingSummary(res.data?.ratingSummary || { average: 0, count: 0 });
      } catch (err) {
        setError(err.message || 'Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [mentorId]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
  <div className="mt-3 text-center">
    <div className="flex items-center justify-center gap-1">
      {renderStars(ratingSummary?.average || 0)}
    </div>
    <div className="text-sm text-gray-700 mt-1">
      Average Rating: {ratingSummary?.average?.toFixed(1) || '0.0'}
    </div>
    <div className="text-xs text-gray-500">
      ({ratingSummary?.count || 0} reviews)
    </div>

    <h4 className="mt-4 font-semibold">Reviews</h4>
    {reviews.length === 0 && <p>No reviews yet.</p>}
    <ul className="mt-2">
      {reviews.map((review, idx) => (
        <li key={idx} className="mb-4 text-left">
          <strong>{review.reviewer?.name || 'Anonymous'}</strong> <br />
          <small>{new Date(review.createdAt).toLocaleDateString()}</small>
          <p>{review.review}</p>
        </li>
      ))}
    </ul>
  </div>
);

};

export default MentorReviews;
