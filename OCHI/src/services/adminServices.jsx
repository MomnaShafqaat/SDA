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

const adminService = new AdminService();
export default adminService;
