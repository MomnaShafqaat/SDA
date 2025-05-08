import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';
class GenericService{
    constructor(){}
    get =  async (url, config = {}) =>{

        return  await axios.get(url,config) 
            .then(response => response)
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error;
            });
    } ;

    post = async (url,data, config = {}) => {
            
            return await axios.post(url, data, config)
                .then(response => response)
                .catch(error => {
                    console.error('Error posting data:', error);
                    throw error;
                });
    } ;

   
    

}
export default GenericService;