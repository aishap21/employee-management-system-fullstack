import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    setLoading(true);
    EmployeeService.getAllEmployees()
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching employees:', err);
        setError('Failed to fetch employees. Make sure the backend is running.');
        setLoading(false);
      });
  };

  const deleteEmployee = (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
    if (confirmDelete) {
      EmployeeService.deleteEmployee(id)
        .then(() => {
          setEmployees(employees.filter((emp) => emp.id !== id));
          alert('Employee deleted successfully!');
        })
        .catch((err) => {
          console.error('Error deleting employee:', err);
          alert('Failed to delete employee.');
        });
    }
  };

  const editEmployee = (id) => {
    navigate(`/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading employees...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-3" role="alert">
        <strong>Error:</strong> {error}
        <br />
        <small>Make sure Spring Boot is running on port 8080.</small>
      </div>
    );
  }

  return (
    <div>
      {}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold" style={{ color: '#1a237e' }}>
          All Employees
        </h3>
        <div>
          <span className="badge bg-primary me-3">
            Total: {employees.length}
          </span>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/add')}
          >
            + Add New Employee
          </button>
        </div>
      </div>

      {}
      {employees.length === 0 ? (
        <div className="alert alert-info text-center">
          No employees found. Click <strong>Add New Employee</strong> to add one!
        </div>
      ) : (
        <div className="table-responsive shadow-sm">
          <table className="table table-striped table-bordered table-hover align-middle">
            <thead style={{ backgroundColor: '#1a237e', color: 'white' }}>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Salary (₹)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{index + 1}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>
                    <span className="badge bg-secondary">
                      {employee.department}
                    </span>
                  </td>
                  <td>₹{employee.salary.toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => editEmployee(employee.id)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteEmployee(
                          employee.id,
                          `${employee.firstName} ${employee.lastName}`
                        )
                      }
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
