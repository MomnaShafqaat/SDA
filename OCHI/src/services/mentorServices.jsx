import GenericService from './genericService';
class MentorService extends GenericService {
    constructor() {
        super();
        this.baseUrl = 'http://localhost:5000/api/mentors/';
    }
    
    getMentors = async () =>{
        let token = localStorage.getItem('jwt_token');
        let response ;
        console.log("Token being sent:", token);
        if(!token)
        {
            response = await this.get(`${this.baseUrl}`, {}, {}) ;

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

    

}

let mentorService = new MentorService ; 
export default mentorService;