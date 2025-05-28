import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewMentorProfile = () => {
  const { mentorId } = useParams();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviews] = useState([]); // Placeholder for future reviews

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`http://localhost:5000/api/mentors/mentor/${mentorId}`);
        setMentor(response.data);
      } catch (err) {
        setError('Failed to load mentor profile.');
      } finally {
        setLoading(false);
      }
    };

    if (mentorId) {
      fetchMentor();
    }
  }, [mentorId]);

  if (loading) return <div className="max-w-3xl mx-auto p-8 text-center text-gray-700">Loading...</div>;
  if (error) return <div className="max-w-3xl mx-auto p-8 text-center text-red-500">{error}</div>;
  if (!mentor) return <div className="max-w-3xl mx-auto p-8 text-center text-gray-700">Mentor profile not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 font-sans mt-6">
      <header className="flex items-center space-x-6 mb-8">
        <img
          src={mentor.picture || '/default-avatar.png'}
          alt="Mentor Avatar"
          onError={(e) => { e.currentTarget.src = '/default-avatar.png'; }}
          className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{mentor.name || 'Not provided'}</h1>
          <p className="text-gray-600">{mentor.bio || 'Not provided'}</p>
        </div>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">Basic Information</h2>
        <div className="space-y-3">
          <div><span className="font-semibold">Email:</span> {mentor.email || 'Not provided'}</div>
          <div><span className="font-semibold">Experience:</span> {mentor.experience != null ? `${mentor.experience} years` : 'Not provided'}</div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">Expertise & Skills</h2>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {(mentor.expertise && mentor.expertise.length > 0) ? (
              mentor.expertise.map((skill, i) => (
                <span key={i} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">{skill}</span>
              ))
            ) : (
              <span className="text-gray-500">Not provided</span>
            )}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {(mentor.skills && mentor.skills.length > 0) ? (
              mentor.skills.map((skill, i) => (
                <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{skill}</span>
              ))
            ) : (
              <span className="text-gray-500">Not provided</span>
            )}
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">Qualifications</h2>
        {(mentor.qualification && mentor.qualification.length > 0) ? (
          <div className="space-y-4">
            {mentor.qualification.map((q, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded shadow-sm">
                <p><span className="font-semibold">Institution:</span> {q.institute || 'Not provided'}</p>
                <p><span className="font-semibold">Degree:</span> {q.grade || 'Not provided'}</p>
                <p><span className="font-semibold">CV:</span> {q.cv ? 'Attached' : 'Not provided'}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Not provided</p>
        )}
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">Availability</h2>
        <div className="flex flex-wrap gap-2">
          {(mentor.availableSlots && mentor.availableSlots.length > 0) ? (
            mentor.availableSlots.map((slot, i) => (
              <span key={i} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">{slot}</span>
            ))
          ) : (
            <span className="text-gray-500">Not provided</span>
          )}
        </div>
      </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">Ratings</h2>
            <div>
              <span className="font-semibold">Average Rating:</span>{' '}
              {mentor.ratings?.average != null && !isNaN(mentor.ratings.average)
                ? `${mentor.ratings.average}/5`
                : 'Not provided'}{' '}
              ({mentor.ratings?.count ?? 0} ratings)
            </div>
          </section>

      <section>
        <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">Student Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded shadow-sm">
                <p><span className="font-semibold">Student:</span> {r.studentName || 'Anonymous'}</p>
                <p><span className="font-semibold">Rating:</span> {r.rating}/5</p>
                <p><span className="font-semibold">Comment:</span> {r.comment}</p>
                <p><span className="text-sm text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</span></p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ViewMentorProfile;
