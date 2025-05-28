import React, { useEffect, useState } from 'react';
import AdminNavbar from "../components/admin/AdminNavbar";
import CounterCard from "../components/admin/CounterCard";
import BadgeRequestCard from "../components/admin/BadgeRequestCard";
import axios from 'axios';

const AdminPage = () => {
  const [counts, setCounts] = useState({ mentors: 0, students: 0 });
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchCounts();
    fetchBadgeRequests();
  }, []);


  const fetchCounts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/counts');
      const data = await res.json();
      setCounts(data);
    } catch (error) {
      console.error("Failed to fetch counts:", error);
    }
  };

  const fetchBadgeRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/badge-requests");
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching badge requests:", err);
    }
  };


  const handleDecision = async (mentorId, decision) => {
    try {
      await axios.post(`http://localhost:5000/api/admin/verify-badge/${mentorId}`, { decision });
      
      // Refresh the list after decision
      fetchBadgeRequests();
    } catch (err) {
      console.error(`Error updating badge request for ${mentorId}:`, err);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div style={{ padding: 20 }}>
        <h1 style={{ display: 'flex', justifyContent: 'center' }}>Welcome, Admin</h1>
        <h2 style={{ fontWeight: 20, display: 'flex', justifyContent: 'center' }}>Data Analysis</h2>

        {/* Count Cards */}
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', margin: '2rem 0' }}>
          <CounterCard title="Mentors" count={counts.mentors} />
          <CounterCard title="Students" count={counts.students} />
        </div>

        {/* Badge Requests Table */}
        <h2>Badge Requests</h2>
        {requests.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Profile</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((mentor) => (
                <BadgeRequestCard
                  key={mentor._id}
                  mentor={mentor}
                  onAccept={() => handleDecision(mentor._id, 'accept')}
                  onReject={() => handleDecision(mentor._id, 'reject')}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <p>No pending requests.</p>
        )}
      </div>
    </div>
  );
};

const thStyle = {
  borderBottom: '1px solid #ccc',
  padding: '10px',
  textAlign: 'left',
};

export default AdminPage;
