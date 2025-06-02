// src/services/reportService.js
import GenericService from './genericService';

class ReportService extends GenericService {
  constructor() {
    super();
    this.baseUrl = 'http://localhost:5000/api/';
  }

  // Admin: Get all reports
 getAllReports = async () => {
    const token = localStorage.getItem("jwt_token");
    if (!token) throw new Error("No token found for admin");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

return this.getWithConfig(`${this.baseUrl}report/reports`, { headers });
  };


  //warn
  
 // src/services/reportService.js
warnUser = async (userId, message) => {
  const token = localStorage.getItem("jwt_token");
  if (!token) throw new Error("No token found");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const body = { message };

  return this.post(`${this.baseUrl}report/warn/${userId}`, body, { headers });
};





  //notify the mentor


 getNotifications = async () => {
  const token = localStorage.getItem("jwt_token");
  if (!token) throw new Error("No token found");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

return this.get(`${this.baseUrl}report/notifications`, { headers });
};


}


const reportService = new ReportService();
export default reportService;
