import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';

function App() {
  return (
    <Router>
      {}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#1a237e' }}>
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            👔 Employee Management System
          </Link>
          <div>
            <Link className="btn btn-outline-light btn-sm me-2" to="/">
              All Employees
            </Link>
            <Link className="btn btn-light btn-sm" to="/add">
              + Add Employee
            </Link>
          </div>
        </div>
      </nav>

      {}
      <div className="container mt-4">
        <Routes>
          <Route path="/"         element={<EmployeeList />} />
          <Route path="/add"      element={<AddEmployee />} />
          <Route path="/edit/:id" element={<EditEmployee />} />
        </Routes>
      </div>

      {}
      <footer className="text-center text-muted mt-5 mb-3">
        <small>Employee Management System &mdash; Spring Boot + React.js + MySQL</small>
      </footer>
    </Router>
  );
}

export default App;
