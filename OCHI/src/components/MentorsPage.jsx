// pages/MentorsPage.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './Searchbar';
import DropdownMenu from '../components/DropdownMenu';

const MentorsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get filters from URL
//   const expertise = searchParams.get('expertise');
//   const searchQuery = searchParams.get('searchQuery');

//   useEffect(() => {
//     const fetchMentors = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const params = new URLSearchParams();
//         if (expertise) params.append('expertise', expertise);
//         if (searchQuery) params.append('searchQuery', searchQuery);

//         const response = await axios.get(`http://localhost:5000/api/mentors/filteredByExpertise?${params.toString()}`);
//         setMentors(response.data);
//       } catch (error) {
//         console.error('Error fetching mentors:', error);
//         setError('Failed to load mentors. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMentors();
//   }, [expertise, searchQuery]);
const expertise = searchParams.get('expertise');
const nameQuery = searchParams.get('name');

useEffect(() => {
  const fetchMentors = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (expertise) params.append('expertise', expertise);
      if (nameQuery) params.append('name', nameQuery);

      const response = await axios.get(`http://localhost:5000/api/mentors/filteredByExpertise?${params.toString()}`);
      setMentors(response.data);
    } catch (error) {
      console.error('Error fetching mentors:', error);
      setError('Failed to load mentors. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  fetchMentors();
}, [expertise, nameQuery]);

  const getFilterMessage = () => {
    const filters = [];
    if (expertise) filters.push(`Expertise: ${expertise}`);
    if (nameQuery) filters.push(`Search: "${nameQuery}"`);
    return filters.join(' • ');
  };

  const MentorCardSkeleton = () => (
    <div className="animate-pulse bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex p-6">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-lg bg-gray-200"></div>
          <div className="mt-3 w-20 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="ml-6 flex-1 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
          <div className="flex gap-3">
            <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {expertise ? `${expertise} Mentors` : 'All Mentors'}
            </h1>
            <p className="mt-1 text-gray-500">
              {mentors.length} {mentors.length === 1 ? 'mentor' : 'mentors'} available
            </p>
          </div>
          {/* <div className="w-full sm:w-auto flex gap-4">
            <DropdownMenu />
            <SearchBar />
          </div> */}
        </div>

        {/* Active Filters */}
        {getFilterMessage() && (
          <div className="mb-6 bg-indigo-50 p-4 rounded-lg flex items-center justify-between">
            <div className="text-indigo-800">
              <span className="font-medium">Active filters:</span> {getFilterMessage()}
            </div>
            <button 
              onClick={() => navigate('/mentors')}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 p-4 rounded-lg text-red-700 text-center">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 gap-6">
            {[...Array(3)].map((_, i) => <MentorCardSkeleton key={i} />)}
          </div>
        )}

        {/* Empty State */}
        {!loading && mentors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xl text-gray-900 font-medium mb-2">No mentors found</p>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
            <button
              onClick={() => navigate('/mentors')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Browse All Mentors
            </button>
          </div>
        )}

        {/* Mentor Cards */}
        {!loading && mentors.length > 0 && (
          <div className="grid grid-cols-1 gap-6">
            {mentors.map((mentor) => (
              <div
                key={mentor._id}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex p-6">
                  {/* Left Section - Image & Rating */}
                  <div className="flex-shrink-0 w-32">
                    <img
                      src={mentor.picture || '/default-avatar.png'}
                      alt={mentor.name}
                      className="w-24 h-24 rounded-lg object-cover border-2 border-white shadow-sm"
                    />
                    <div className="mt-3 flex items-center justify-center">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span className="ml-1 text-sm font-semibold text-gray-700">
                        {mentor.ratings?.average?.toFixed(1) || '4.5'}
                      </span>
                      <span className="ml-1 text-xs text-gray-500">({mentor.ratings?.count || 12})</span>
                    </div>
                  </div>

                  {/* Middle Section - Details */}
                  <div className="ml-6 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{mentor.name}</h2>
                        <p className="mt-1 text-sm text-gray-500">
                          {mentor.experience}+ years experience • {mentor.location || 'Remote'}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Available Now
                      </span>
                    </div>

                    {/* Expertise Tags */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {mentor.expertise?.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {mentor.expertise?.length > 3 && (
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                          +{mentor.expertise.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Bio Excerpt */}
                    <p className="mt-4 text-gray-600 line-clamp-2 text-sm">
                      {mentor.bio || 'Experienced professional with proven track record in their field...'}
                    </p>
                  </div>

                  {/* Right Section - Buttons */}
                  <div className="ml-6 flex flex-col justify-center gap-3 w-48">
                    <button
                      onClick={() => navigate(`/mentor-profile/${mentor.auth0Id}`)}
                      className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center"
                    >
                      View Profile
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                    <button
                      onClick={() => navigate(`/chatInterface?mentor=${mentor.auth0Id}`)}
                      className="px-4 py-2.5 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
                    >
                      Chat Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorsPage;