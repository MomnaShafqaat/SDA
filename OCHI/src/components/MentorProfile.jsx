import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import mentorService from "../services/mentorServices";

function MentorProfile() {
    const { logout } = useAuth0();
    const navigate = useNavigate();
    const location = useLocation();

    const [mentorProfile, setMentorProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const res = await mentorService.getMentorProfile();
                if (res?.data) {
                    setMentorProfile(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch profile", err);
                setMentorProfile(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []); // runs once when component mounts

    const handleCreate = () => {
        navigate('/build-mentor-profile');
    };

    const handleEdit = () => {
     navigate('/build-mentor-profile', { state: { profile: mentorProfile } });
    };

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete your profile?");
        if (!confirmed) return;

        try {
            await mentorService.deleteMentorProfile();
            alert("Profile deleted.");
            logout();
            navigate("/");
        } catch (err) {
            console.error("Error deleting profile", err);
            alert("Failed to delete profile.");
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-orange-600">Mentor Profile</h2>

                {mentorProfile ? (
                    <>
                        <div className="mb-4">
                            <p><strong>Bio:</strong> {mentorProfile.bio || "Not Provided"}</p>
                            <p><strong>Expertise:</strong> {mentorProfile.expertise?.join(", ") || "Not Provided"}</p>
                            <p><strong>Experience:</strong> {mentorProfile.experience != null ? `${mentorProfile.experience} years` : "Not Provided"}</p>
                            <p><strong>Available Slots:</strong> {mentorProfile.availableSlots?.join(", ") || "Not Provided"}</p>
                            <p><strong>Skills:</strong> {mentorProfile.skills?.join(", ") || "Not Provided"}</p>
                            <p> <strong>Qualifications:</strong>
                            {mentorProfile.qualification?.length ? (
                                <ul className="list-disc list-inside ml-4">
                                {mentorProfile.qualification.map((q, idx) => (
                                    <li key={idx}>
                                    <span className="font-medium">{q.institute}</span> : Grade: {q.grade}, 
                                    CV: <a href={q.cv} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{q.cv}</a>
                                    </li>
                                ))}
                                </ul>
                            ) : (
                                <p>Not Provided</p>
                            )}</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={handleEdit}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Edit Profile
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                            >
                                Delete Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                            >
                                Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={handleCreate}
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        >
                            Create Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MentorProfile;
