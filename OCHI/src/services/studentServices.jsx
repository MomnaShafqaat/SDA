import GenericService from './genericService';
class StudentService extends GenericService {
    constructor() {
        super();
        this.baseUrl = 'http://localhost:5000/api/student/';
    }
    
    

    sendRequest = (mentorId)=>{
        console.log(    'Sending request to mentor with ID:', mentorId);

        const token = localStorage.getItem('jwt_token');
        if (!token) {
            console.error('No access token found in local storage.');
            return;
        }

        // const requestBody = {
        //     mentorId,
        // };

        //this.post(`${this.baseUrl}sendRequest/${mentorId}` ,  requestBody, {
        this.post(`${this.baseUrl}sendRequest/${mentorId}`, {}, {

            headers:{
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
    }

    // Get mentors list for the logged-in student
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

}

let studentService = new StudentService();
export default studentService;