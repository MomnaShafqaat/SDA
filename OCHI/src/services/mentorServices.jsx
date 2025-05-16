import GenericService from './genericService';
import axios from 'axios';
class MentorService extends GenericService {
    constructor() {
        super();
        this.baseUrl = 'mentors/';
    }
    
    getMentors = async (isAuthenticated) =>{
        let token = localStorage.getItem('jwt_token');
        let response ;
        console.log("Token being sent:", token);
        if(localStorage.getItem("user_role") === "mentor"){
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
}






let mentorService = new MentorService ; 
export default mentorService;