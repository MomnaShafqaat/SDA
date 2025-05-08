import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="bg-gray-700 text-white w-64 min-h-screen p-5">
      <ul className="space-y-4">
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/mentors">Mentors</Link></li>
        <li><Link to="/admin/pending">Pending Applications</Link></li>
        <li><Link to="/admin/reports">Reports</Link></li>
        <li><Link to="/admin/reviews">Reviews</Link></li>
        <li><Link to="/admin/actions-log">Actions Log</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
