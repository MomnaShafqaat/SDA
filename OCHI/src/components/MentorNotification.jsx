import React, { useEffect, useState } from 'react';
import ReportService from '@/services/reportServices';

const MentorNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await ReportService.getNotifications();
        console.log('Notification response:', res.data);
        setNotifications(res.data.notifications);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      } finally {
        setLoading(false);
      }
    };

    //if (userId) {
      fetchNotifications();
    //} else {
    //  console.warn("No userId found in localStorage");
    //  setLoading(false);
    //}
  }, []);

  if (loading) return <p className="text-center mt-6">Loading admin notifications...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Your Admin Notifications</h2>
      {notifications.length === 0 ? (
        <p>No admin notifications yet.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((note, index) => (
            <li key={index} className="bg-yellow-100 p-4 rounded-md shadow">
              <p className="text-gray-800">{note.message}</p>
              <span className="text-sm text-gray-500">
                {new Date(note.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MentorNotifications;
