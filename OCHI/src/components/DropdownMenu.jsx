// components/DropdownMenu.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const fields = [
    'Software Engineering',
    'Data Science',
    'Product Management',
    'UX Design',
    'Digital Marketing',
    'Entrepreneurship',
    'Cybersecurity',
    'Cloud Computing',
    'Artificial Intelligence',
    'Machine Learning',
    'Blockchain',
    'DevOps'
  ];

  const handleFieldClick = (field) => {
    navigate(`/mentors?expertise=${encodeURIComponent(field)}`);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-medium max-w-md ">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-3 bg-[#004D46] text-sm font-medium text-white hover:bg-[#003D38] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"        >
          Search by Expertise
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1 max-h-96 overflow-y-auto" role="menu">
            {fields.map((field) => (
              <button
                key={field}
                onClick={() => handleFieldClick(field)}
                className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                {field}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;