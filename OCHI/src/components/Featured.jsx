import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MentorCard from './MentorCard';

function Featured() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch mentors from the backend
    axios.get('http://localhost:5000/api/mentors')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setMentors(response.data);
        } else {
          console.error('Expected an array of mentors, but got:', response.data);
          setMentors([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching mentors:', error);
        setMentors([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading mentors...</div>;
  }

  if (mentors.length === 0) {
    return <div className="text-center py-20">No mentors found.</div>;
  }

  return (
    <div className='w-full py-20'>
      {/* Title Section */}
      <div className='w-full border-b-[1px] pb-10 border-zinc-600 px-20'>
        <h1 className='text-6xl font-["Neue_Montreal"] tracking-tighter'>Featured Mentors</h1>
      </div>

      {/* Cards Grid */}
      <div className='px-20 mt-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10'>
          {mentors.map((mentor) => (
            <div key={mentor._id} className='cardcontainer h-[60vh] w-full rounded-md overflow-hidden'>
              <MentorCard mentor={mentor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Featured;