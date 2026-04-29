import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function AddEmployee() {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    firstName:  '',
    lastName:   '',
    email:      '',
    department: '',
    salary:     '',
  });

  const [error, setError] = useState('');

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    if (!employee.firstName || !employee.lastName || !employee.email) {
      setError('First Name, Last Name, and Email are required.');
      setSaving(false);
      return;
    }

    const employeeData = {
      ...employee,
      salary: parseFloat(employee.salary) || 0,
    };

    EmployeeService.createEmployee(employeeData)
      .then(() => {
        alert('Employee added successfully!');
        navigate('/');
      })
      .catch((err) => {
        console.error('Error creating employee:', err);
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Failed to add employee. Please try again.');
        }
        setSaving(false);
      });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm">
          {}
          <div
            className="card-header text-white fw-bold"
            style={{ backgroundColor: '#1a237e' }}
          >
            ➕ Add New Employee
          </div>

          {}
          <div className="card-body p-4">

            {}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="e.g. Rahul"
                  value={employee.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              {}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="e.g. Sharma"
                  value={employee.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              {}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="e.g. rahul.sharma@example.com"
                  value={employee.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {}
              <div className="mb-3">
                <label className="form-label fw-semibold">Department</label>
                <select
                  name="department"
                  className="form-select"
                  value={employee.department}
                  onChange={handleChange}
                >
                  <option value="">-- Select Department --</option>
                  <option value="Engineering">Engineering</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Operations">Operations</option>
                  <option value="IT">IT</option>
                  <option value="Design">Design</option>
                </select>
              </div>

              {}
              <div className="mb-4">
                <label className="form-label fw-semibold">Salary (₹)</label>
                <input
                  type="number"
                  name="salary"
                  className="form-control"
                  placeholder="e.g. 55000"
                  value={employee.salary}
                  onChange={handleChange}
                  min="0"
                />
              </div>

              {}
              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : '💾 Save Employee'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/')}
                >
                  ✖ Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
