import GenericService from './genericService';

class AdminService extends GenericService {
  constructor() {
    super();
    this.baseUrl = 'http://localhost:5000/api/admin/';
  }

  // Fetch admin dashboard counts
  getCounts = async () => {
    return await this.get(`${this.baseUrl}counts`);
  }
}

  getMentorProfileById = async (mentorId) => {
    const token = localStorage.getItem('jwt_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.get(`${this.baseUrl}mentor-profile/${mentorId}`, { headers });
  };


const adminService = new AdminService();
export default adminService;
