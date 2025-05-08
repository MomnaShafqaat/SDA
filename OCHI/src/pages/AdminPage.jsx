import React, { useEffect, useState } from 'react';
import AdminNavbar from "../components/admin/AdminNavbar";
import CounterCard from "../components/admin/CounterCard";
import BadgeRequestCard from "../components/admin/BadgeRequestCard";


// Example - correct casing

const AdminPage = () => {
  const [counts, setCounts] = useState({ mentors: 6, students: 6 });
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchCounts();
    fetchRequests();
  }, []);

  const fetchCounts = async () => {
    // Mock or actual API
    const res = await fetch('/api/admin/counts');
    const data = await res.json();
    setCounts(data);
  };

  const fetchRequests = async () => {
    const res = await fetch('/api/admin/badge-requests');
    const data = await res.json();
    setRequests(data.requests);
  };

  const handleDecision = async (id, action) => {
    await fetch(`/api/admin/badge-requests/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decision: action })
    });
    setRequests(requests.filter(r => r._id !== id));
  };

  return (
    <div>
      <AdminNavbar />

      <div style={{ padding: '2rem' }}>
        <h1>Welcome, Admin!</h1>

        {/* Count Cards */}
        <div style={{ display: 'flex', gap: '1rem', margin: '2rem 0' }}>
          <CounterCard title="Mentors" count={counts.mentors} />
          <CounterCard title="Students" count={counts.students} />
        </div>

        {/* Badge Requests */}
        <h2>Badge Requests</h2>
        {requests.length ? (
  requests.map(mentor => (
    <BadgeRequestCard
      key={mentor._id}
      mentor={mentor}
      onAccept={() => handleDecision(mentor._id, 'accept')}
      onReject={() => handleDecision(mentor._id, 'reject')}
      onViewDocument={() => window.open(mentor.documentUrl, '_blank')}
    />
  ))
) : (
  <p>No pending requests.</p>
)}

      </div>
    </div>
  );
};

export default AdminPage;


