import axios from 'axios';


const BASE_URL = 'https://employee-backend-puc2.onrender.com/api/employees';  

const EmployeeService = {

  getAllEmployees: () => {
    return axios.get(BASE_URL);
  },

  getEmployeeById: (id) => {
    return axios.get(`${BASE_URL}/${id}`);
  },

  createEmployee: (employee) => {
    return axios.post(BASE_URL, employee);
  },

  updateEmployee: (id, employee) => {
    return axios.put(`${BASE_URL}/${id}`, employee);
  },

  deleteEmployee: (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
  },
};

export default EmployeeService;
