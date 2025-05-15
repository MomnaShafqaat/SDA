import React, { useEffect, useState } from 'react';
import AdminNavbar from "../components/admin/AdminNavbar";
import CounterCard from "../components/admin/CounterCard";
import BadgeRequestCard from "../components/admin/BadgeRequestCard";

const AdminPage = () => {
  const [counts, setCounts] = useState({ mentors: 0, students: 0 });
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchCounts();
    fetchRequests();
  }, []);

  const fetchCounts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/counts');
      console.log("get it");
      const data = await res.json();
      console.log("get it but not converted");

      setCounts(data);
    } catch (error) {
      console.error("Failed to fetch counts:", error);
    }
  };


  const fetchRequests = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/badge-requests');
      const data = await res.json();
      setRequests(data.requests || []);
    } catch (error) {
      console.error("Failed to fetch badge requests:", error);
    }
  };

  const handleDecision = async (id, action) => {
    try {
      await fetch(`http://localhost:5000/api/admin/badge-requests/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision: action })
      });
      setRequests(prev => prev.filter(r => r._id !== id));
    } catch (error) {
      console.error("Failed to update request:", error);
    }
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
