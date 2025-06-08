import React, { useEffect, useState } from 'react';
import MentorCard from './MentorCard';
import { useAuth0 } from '@auth0/auth0-react';
import useAxios from '../hooks/useAxios';
import { motion } from 'framer-motion';

function Featured() {
  const [mentors, setMentors] = useState([]);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const url = isAuthenticated ? 'mentors/fetchMentors' : 'mentors/';
  const { response, loading } = useAxios({ method: 'GET', url });

  useEffect(() => {
    if (Array.isArray(response)) {
      setMentors(response);
    } else {
      setMentors([]);
    }
  }, [getAccessTokenSilently, isAuthenticated, response]);

  if (loading) return <div className="text-center py-20">Loading mentors...</div>;
  if (mentors.length === 0) return <div className="text-center py-20">No Mentors Found</div>;

  // Break mentors into rows of 4
  const rows = [];
  const chunkSize = 4;
  for (let i = 0; i < mentors.length; i += chunkSize) {
    rows.push(mentors.slice(i, i + chunkSize));
  }

  return (
    <div className='w-full py-20 overflow-hidden'>
      {/* Title */}
      <div className='w-full border-b border-zinc-600 pb-10 px-20'>
        <h1 className='text-6xl font-["Neue_Montreal"] tracking-tighter'>
          Featured Mentors
        </h1>
      </div>

      {/* Animated Rows bg-[#104D43]    bg-gradient-to-br from-[#d6ff72] to-[#7ed957] */}
      <div className='px-20 mt-10 space-y-12  bg-[#d6ff72] py-20 '>
        {rows.map((rowMentors, rowIndex) => {
          const direction = rowIndex % 2 === 0 ? -100 : 100;

          return (
            <motion.div
              key={rowIndex}
              className='flex gap-10 w-max'
              animate={{ x: [0, direction, 0] }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: 'linear',
              }}
            >
              {/* Clone cards twice for seamless loop */}
              {[...rowMentors, ...rowMentors].map((mentor, index) => (
                <div
                  key={`${mentor._id}-${index}`}
                  className='w-[300px] h-[60vh] rounded-md overflow-hidden'
                >
                  <MentorCard mentor={mentor} />
                </div>
              ))}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Featured;




//   useEffect(() => {
//     // Fetch mentors from the backend
//     axios.get('http://localhost:5000/api/mentors')
//       .then((response) => {
//         if (Array.isArray(response.data)) {
//           setMentors(response.data);
//         } else {
//           console.error('Expected an array of mentors, but got:', response.data);
//           setMentors([]);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching mentors:', error);
//         setMentors([]);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div className="text-center py-20">Loading mentors...</div>;
//   }

//   if (mentors.length === 0) {
//     return <div className="text-center py-20">No mentors found.</div>;
//   }

//   return (
//     <div className='w-full py-20'>
//       {/* Title Section */}
//       <div className='w-full border-b-[1px] pb-10 border-zinc-600 px-20'>
//         <h1 className='text-6xl font-["Neue_Montreal"] tracking-tighter'>Featured Mentors</h1>
//       </div>

//       {/* Cards Grid */}
//       <div className='px-20 mt-10'>
//         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10'>
//           {mentors.map((mentor) => (
//             <div key={mentor._id} className='cardcontainer h-[60vh] w-full rounded-md overflow-hidden'>
//               <MentorCard mentor={mentor} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Featured;