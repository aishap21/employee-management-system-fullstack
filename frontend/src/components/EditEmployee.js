import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function EditEmployee() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    firstName:  '',
    lastName:   '',
    email:      '',
    department: '',
    salary:     '',
  });

  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const [saving,  setSaving]  = useState(false);

  useEffect(() => {
    EmployeeService.getEmployeeById(id)
      .then((response) => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching employee:', err);
        setError('Employee not found or server error.');
        setLoading(false);
      });
  }, [id]);

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

    const employeeData = {
      ...employee,
      salary: parseFloat(employee.salary) || 0,
    };

    EmployeeService.updateEmployee(id, employeeData)
      .then(() => {
        alert('Employee updated successfully!');
        navigate('/');
      })
      .catch((err) => {
        console.error('Error updating employee:', err);
        setError('Failed to update employee. Please try again.');
        setSaving(false);
      });
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading employee data...</p>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm">
          {}
          <div
            className="card-header text-white fw-bold"
            style={{ backgroundColor: '#e65100' }}
          >
            ✏️ Edit Employee (ID: {id})
          </div>

          {}
          <div className="card-body p-4">

            {}
            {error && (
              <div className="alert alert-danger">{error}</div>
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
                  value={employee.firstName || ''}
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
                  value={employee.lastName || ''}
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
                  value={employee.email || ''}
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
                  value={employee.department || ''}
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
                  value={employee.salary || ''}
                  onChange={handleChange}
                  min="0"
                />
              </div>

              {}
              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? 'Updating...' : '🔄 Update Employee'}
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

export default EditEmployee;
