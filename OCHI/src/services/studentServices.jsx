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
}

let studentService = new StudentService();
export default studentService;