import GenericService from './genericService';

class MentorService extends GenericService {
    constructor() {
        super();
        this.baseUrl = 'http://localhost:5000/api/mentors/';
    }

    getMentors = async (isAuthenticated) => {
        let token = localStorage.getItem('jwt_token');
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
    }

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

    // ✅ New: Delete current mentor's profile
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

     sendVerificationRequest = async (auth0Id) => {
    try {
      const response = await this.post(`${this.baseUrl}request-verification/${auth0Id}`, {});
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Something went wrong");
    }
  }
  getMentorRequests = () => {
    const token = localStorage.getItem('jwt_token');
    return this.get(`${this.baseUrl}mentorRequests`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};

updateRequestStatus = (studentId, action) => {
    const token = localStorage.getItem('jwt_token');
    return this.post(`${this.baseUrl}updateRequestStatus/${studentId}`, { action }, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};

}




const mentorService = new MentorService();
export default mentorService;
