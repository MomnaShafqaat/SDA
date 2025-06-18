/*import React, { useEffect, useState } from 'react';
import AdminNavbar from "../components/admin/AdminNavbar";
import CounterCard from "../components/admin/CounterCard";
import BadgeRequestCard from "../components/admin/BadgeRequestCard";
import ReportList from "../components/admin/ReportList"; // Adjust the path if needed

import axios from 'axios';

const AdminPage = () => {
  const [counts, setCounts] = useState({ mentors: 0, students: 0 });
  const [requests, setRequests] = useState([]);
  //const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchCounts();
    fetchBadgeRequests();
   // fetchReports();
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






  const fetchMentorProfile = async (mentorId) => {
  const token = localStorage.getItem('jwt_token');
  try {
   // const res = await axios.get(`http://localhost:5000/api/mentors/${mentorId}`, {
 const res = await axios.get(  `http://localhost:5000/api/mentors/mentor/${mentorId}`,{  
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching mentor profile:", err);
  }
};


  return (
    <div>
      <AdminNavbar />
      <div style={{ padding: 20 }}>
        <h1 style={{ display: 'flex', justifyContent: 'center' }}>Welcome, Admin</h1>
        <h2 style={{ fontWeight: 20, display: 'flex', justifyContent: 'center' }}>Data Analysis</h2>

 
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', margin: '2rem 0' }}>
          <CounterCard title="Mentors" count={counts.mentors} />
          <CounterCard title="Students" count={counts.students} />
        </div>

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

   
        <div className="mt-8">
      <ReportList />
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
*/

"use client"

import { useEffect, useState } from "react"
import AdminNavbar from "../components/admin/AdminNavbar"
import CounterCard from "../components/admin/CounterCard"
import BadgeRequestCard from "../components/admin/BadgeRequestCard"
import ReportList from "../components/admin/ReportList"
import { Award, AlertTriangle } from "lucide-react"
import axios from "axios"

// Simple inline chart component
const UserStatsChart = ({ mentorCount, studentCount }) => {
  const total = mentorCount + studentCount
  const mentorPercentage = total > 0 ? (mentorCount / total) * 100 : 0
  const studentPercentage = total > 0 ? (studentCount / total) * 100 : 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Simple Bar Chart */}
      <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200 shadow-lg">
        <h3 className="text-xl font-bold text-emerald-800 mb-4 text-center">User Distribution</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Mentors</span>
              <span className="text-sm font-medium text-gray-700">{mentorCount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-emerald-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${mentorPercentage}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Students</span>
              <span className="text-sm font-medium text-gray-700">{studentCount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${studentPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Stats */}
      <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200 shadow-lg">
        <h3 className="text-xl font-bold text-emerald-800 mb-4 text-center">Statistics</h3>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600">{total}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-500">{mentorCount}</div>
              <div className="text-xs text-gray-600">Mentors ({mentorPercentage.toFixed(1)}%)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{studentCount}</div>
              <div className="text-xs text-gray-600">Students ({studentPercentage.toFixed(1)}%)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AdminPage = () => {
  const [counts, setCounts] = useState({ mentors: 0, students: 0 })
  const [requests, setRequests] = useState([])

  useEffect(() => {
    fetchCounts()
    fetchBadgeRequests()
  }, [])

  const fetchCounts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/counts")
      const data = await res.json()
      setCounts(data)
    } catch (error) {
      console.error("Failed to fetch counts:", error)
    }
  }

  const fetchBadgeRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/badge-requests")
      setRequests(res.data)
    } catch (err) {
      console.error("Error fetching badge requests:", err)
    }
  }

  // Badge request handling logic from the first file
  const handleDecision = async (mentorId, decision) => {
    try {
      await axios.post(`http://localhost:5000/api/admin/verify-badge/${mentorId}`, { decision })
      // Refresh the list after decision
      fetchBadgeRequests()
    } catch (err) {
      console.error(`Error updating badge request for ${mentorId}:`, err)
    }
  }

  const fetchMentorProfile = async (mentorId) => {
    const token = localStorage.getItem("jwt_token")
    try {
      const res = await axios.get(`http://localhost:5000/api/mentors/mentor/${mentorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.data
    } catch (err) {
      console.error("Error fetching mentor profile:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-stone-100">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">Welcome, Admin</h1>
          <p className="text-emerald-600 text-lg">Manage your platform with comprehensive analytics and controls</p>
        </div>

        {/* User Counter Section */}
        <section id="user-counter" className="pt-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-emerald-800 mb-2">Platform Statistics</h2>
            <p className="text-emerald-600">Overview of your platform's user base</p>
            <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Counter Cards - Using the CounterCard component */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <CounterCard title="Total Mentors" count={counts.mentors} />
            <CounterCard title="Total Students" count={counts.students} />
            <CounterCard title="Badge Requests" count={requests.length} />
            <CounterCard title="Growth Rate" count="+12%" />
          </div>

          {/* Charts Section */}
          <UserStatsChart mentorCount={counts.mentors} studentCount={counts.students} />
        </section>

        {/* Badge Requests Section */}
        <section id="badge-requests" className="pt-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-emerald-800 mb-2">Badge Requests</h2>
            <p className="text-emerald-600">Review and approve mentor verification requests</p>
            <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-emerald-200 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-100 to-emerald-200 px-6 py-4 border-b-2 border-emerald-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-800">Pending Requests</h3>
                  <p className="text-emerald-600 text-sm">Mentor verification requests awaiting approval</p>
                </div>
                {requests.length > 0 && (
                  <div className="ml-auto bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold border border-emerald-400">
                    {requests.length} pending
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              {requests.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-emerald-200">
                        <th className="text-left py-3 px-4 font-bold text-emerald-800">Name</th>
                        <th className="text-left py-3 px-4 font-bold text-emerald-800">Email</th>
                        <th className="text-left py-3 px-4 font-bold text-emerald-800">Profile</th>
                        <th className="text-left py-3 px-4 font-bold text-emerald-800">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((mentor) => (
                        <BadgeRequestCard
                          key={mentor._id}
                          mentor={mentor}
                          onAccept={() => handleDecision(mentor._id, "accept")}
                          onReject={() => handleDecision(mentor._id, "reject")}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Award className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-emerald-800 mb-2">No Pending Requests</h3>
                  <p className="text-emerald-600">All badge requests have been processed.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Reports Section */}
        <section id="reports" className="pt-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-emerald-800 mb-2">Report Management</h2>
            <p className="text-emerald-600">Monitor and manage user reports</p>
            <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-emerald-200 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-100 to-emerald-200 px-6 py-4 border-b-2 border-emerald-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-800">User Reports</h3>
                  <p className="text-emerald-600 text-sm">Review and manage user reports</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <ReportList />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AdminPage
