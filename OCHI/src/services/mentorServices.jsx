import GenericService from './genericService';

class MentorService extends GenericService {
  constructor() {
    super();
    this.baseUrl = 'http://localhost:5000/api/mentors/';
  }


//for admin

  getMentorProfileById = async (mentorId) => {
  const token = localStorage.getItem('jwt_token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return this.get(`${this.baseUrl}${mentorId}`, { headers });
};

  // Fetch mentors available to a student
  getMentors = async (isAuthenticated) => {
    const token = localStorage.getItem('jwt_token');
    const role = localStorage.getItem("user_role");
    let response;

    console.log('fetchMentors method in MentorService');

    if (role === "mentor") {
      console.log('User is a mentor — returning null');
      return null;
    }

    console.log("Token being sent:", token);

    if (!isAuthenticated) {
      console.log('User not authenticated');
      response = await this.get(`${this.baseUrl}`, {});
    } else {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      console.log('Sending request to /fetchMentors');
      response = await this.get(`${this.baseUrl}fetchMentors`, { headers });
    }

    console.log("Response from getMentors:", response?.data);
    return response;
  };

  // Get current mentor's profile
  getMentorProfile = async () => {
    console.log("Fetching mentor profile...");
    const token = localStorage.getItem('jwt_token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
    };
    return this.get(`${this.baseUrl}profile`, { headers });
  };

  // Delete mentor profile
  deleteMentorProfile = async () => {
    const token = localStorage.getItem('jwt_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.delete(`${this.baseUrl}profile`, { headers });
  };

  // Create mentor profile
  createMentorProfile = async (profileData) => {
    const token = localStorage.getItem('jwt_token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    return this.post(`${this.baseUrl}profile`, profileData, { headers });
  };

  // Update mentor profile
  updateMentorProfile = async (profileData) => {
    const token = localStorage.getItem('jwt_token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    console.log("Updating mentor profile with data:", profileData);
    return this.post(`${this.baseUrl}profile`, profileData, { headers });
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

  // Send mentor verification request
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

  // Accept or reject mentee request
  updateRequestStatus = (studentId, action) => {
    const token = localStorage.getItem('jwt_token');
    return this.post(`${this.baseUrl}updateRequestStatus/${studentId}`, { action }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  };


// Get mentor by Auth0 ID
getMentorByAuth0Id = async (auth0Id) => {
  const token = localStorage.getItem('jwt_token');
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  return this.get(`${this.baseUrl}by-auth0/${auth0Id}`, { headers });
};


  //mento badge req status too admin
  getBadgeStatus = async (mentorId) => {
    const token = localStorage.getItem('jwt_token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    return this.get(`${this.baseUrl}badge-status/${mentorId}`, { headers });
  };

 getBadgeMentor = async (mentorId) => {
  try {
    const response = await axios.get(`/api/mentors/${mentorId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching mentor:', error);
    throw error;
  }
};


}




const mentorService = new MentorService();
export default mentorService;
