import React, { useEffect, useState } from 'react';
import mentorService from '../services/mentorServices';
import { useAuth0 } from '@auth0/auth0-react';

const MentorRequests = () => {
    const [requests, setRequests] = useState([]);
    const { isAuthenticated } = useAuth0();

    const fetchRequests = async () => {
        if (!isAuthenticated) return;

        try {
            const response = await mentorService.getMentorRequests();
            // Your backend returns { pendingRequests: [...] }, so adjust accordingly
            setRequests(response.data.pendingRequests || []);
        } catch (error) {
            console.error('Error fetching mentor requests:', error);
        }
    };

    const handleRequestAction = async (studentId, action) => {
        try {
            const response = await mentorService.updateRequestStatus(studentId, action);
            console.log(`Request ${action} successfully:`, response.data);
            fetchRequests();  // Refresh list after action
        } catch (error) {
            console.error(`Error while ${action} request:`, error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [isAuthenticated]);
    
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4 mt-8">Your Mentor Requests</h2>
            {requests.length === 0 ? (
                <p>No requests sent yet.</p>
            ) : (
                <ul>
                    {requests.map((request) => (
                        <li key={request._id} className="flex items-center justify-between border-b py-2 mb-3">
                            <div>
                                <h3 className="font-semibold">{request.name}</h3>
                                <p>{request.skills?.join(', ')}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleRequestAction(request._id, 'accept')}
                                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleRequestAction(request._id, 'reject')}
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                >
                                    Reject
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MentorRequests;
