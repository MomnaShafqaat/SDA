import GenericService from './genericService';
class MentorService extends GenericService {
    constructor() {
        super();
        this.baseUrl = 'http://localhost:5000/api/mentors/';
    }
    
    getMentors = async (isAuthenticated) =>{
        let token = localStorage.getItem('jwt_token');
        let response ;
        console.log("Token being sent:", token);
        
        if(localStorage.getItem("user_role" === "mentor")){
            return null ;
        }

        if(!isAuthenticated)
        {
            response = await this.get(`${this.baseUrl}`, {}) ;

        }
            
        else{
            let headers = { Authorization: `Bearer ${token}` ,
            'Content-Type': 'application/json',
        } ;
            response = await this.get(`${this.baseUrl}fetchMentors`, {
                headers
            });
        }
        
        console.log("Response from getMentors:", response.data);
        return response ;
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

let mentorService = new MentorService ; 
export default mentorService;