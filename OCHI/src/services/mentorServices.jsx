import GenericService from './genericService';

class MentorService extends GenericService {
    constructor() {
        super();
        this.baseUrl = 'http://localhost:5000/api/mentors/';
    }

    // Fetch mentors available to a student
    getMentors = async (isAuthenticated) => {
        const token = localStorage.getItem('jwt_token');
        let response;
        console.log('fetchmentors method in mentor services');

        if (localStorage.getItem("user_role") === "mentor") {
            console.log('mentor in fetch mentor services');
            return null;
        }

        console.log("Token being sent:", token);

        if (!isAuthenticated) {
            response = await this.get(`${this.baseUrl}`, {}); // ✅ use backticks
            console.log('not authenticated');
        } else {
            let headers = {
                Authorization: `Bearer ${token}`, // ✅ use backticks
                'Content-Type': 'application/json',
            };
            console.log('sending request to fetchmentors backend');
            response = await this.get(`${this.baseUrl}fetchMentors`, { headers }); // ✅ use backticks
        }

        console.log("Response from getMentors:", response?.data);
        return response;
    };

    // ✅ New: Get current mentor's profile
    getMentorProfile = async () => {
        console.log("Fetching mentor profile...");
        const token = localStorage.getItem('jwt_token');
        const headers = {
            Authorization: `Bearer ${token}`, // ✅ use backticks
            'Cache-Control': 'no-cache',
        };
        return this.get(`${this.baseUrl}profile`, { headers }); // ✅ use backticks
    };

    // Delete mentor profile
    deleteMentorProfile = async () => {
        const token = localStorage.getItem('jwt_token');
        const headers = {
            Authorization: `Bearer ${token}`, // ✅ use backticks
        };
        return this.delete(`${this.baseUrl}profile`, { headers }); // ✅ use backticks
    };

    // Create mentor profile
    createMentorProfile = async (profileData) => {
        const token = localStorage.getItem('jwt_token');
        const headers = {
            Authorization: `Bearer ${token}`, // ✅ use backticks
            'Content-Type': 'application/json',
        };
        return this.post(`${this.baseUrl}profile`, profileData, { headers }); // ✅ use backticks
    };

    // Update mentor profile
    updateMentorProfile = async (profileData) => {
        const token = localStorage.getItem('jwt_token');
        const headers = {
            Authorization: `Bearer ${token}`, // ✅ use backticks
            'Content-Type': 'application/json',
        };
        console.log("Updating mentor profile with data:", profileData);
        return this.post(`${this.baseUrl}profile`, profileData, { headers }); // ✅ use backticks
    };

    // Get mentor requests
    getMentorRequests = () => {
        const token = localStorage.getItem('jwt_token');
        return this.get(`${this.baseUrl}mentorRequests`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    };

    // Update request status (accept/reject)
    updateRequestStatus = (studentId, action) => {
        const token = localStorage.getItem('jwt_token');
        return this.post(`${this.baseUrl}updateRequestStatus/${studentId}`, { action }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    };

    // Get mentees list for the logged-in mentor
    getMentees = async () => {
    const token = localStorage.getItem('jwt_token');
    if (!token) throw new Error("No token found");

    const payload = JSON.parse(atob(token.split('.')[1]));
    const mentorId = payload.id;
    console.log("Mentor ID from token:", mentorId);

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    return this.get(`${this.baseUrl}${mentorId}/mentees`, { headers });
    };

}




const mentorService = new MentorService();
export default mentorService;
