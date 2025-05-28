import GenericService from './genericService';
import axios from 'axios'; // required for submitReview

class StudentService extends GenericService {
    constructor() {
        super();
        this.baseUrl = 'http://localhost:5000/api/student/';
    }

    sendRequest = (mentorId) => {
        console.log('Sending request to mentor with ID:', mentorId);
        const token = localStorage.getItem('jwt_token');

        if (!token) {
            console.error('No access token found in local storage.');
            return;
        }

        this.post(`${this.baseUrl}sendRequest/${mentorId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log('Request sent successfully:', response.data);
            })
            .catch(error => {
                console.error('Error sending request:', error);
            });
    };

    getMentors = async () => {
        const token = localStorage.getItem('jwt_token');
        if (!token) throw new Error("No token found");

        const payload = JSON.parse(atob(token.split('.')[1]));
        const studentID = payload.id;
        console.log("Student ID from token:", studentID);

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.get(`${this.baseUrl}${studentID}/mentors`, { headers });
    };

   submitReview = async (mentorId, reviewData) => {
    const token = localStorage.getItem('jwt_token');
    if (!token) throw new Error("No token found for submitReview");

    return axios.post(`http://localhost:5000/api/mentors/${mentorId}/reviews`, reviewData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};

getMentorReviews = async (mentorId) => {
  const token = localStorage.getItem('jwt_token');
  if (!token) throw new Error("No token found for getMentorReviews");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Assuming your backend exposes this endpoint to get mentor details including reviews and ratings
  const response = await this.get(`http://localhost:5000/api/mentors/${mentorId}/reviews`, { headers });
  return response;
};


}

const studentService = new StudentService();
export default studentService;
