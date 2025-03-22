import React, { useState } from 'react';
import './AddEmployee.css';

function AddEmployee() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    email: '',
    phoneNumber: '',
    status: '',
    jobTitle: '',
    department: '',
    photo: 'https://via.placeholder.com/30',
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All Departments');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [filterJobTitle, setFilterJobTitle] = useState('All Job Titles');
  const employeesPerPage = 10;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.gender ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.status ||
      !formData.jobTitle ||
      !formData.department
    ) {
      setMessage({ text: 'All fields must be filled!', type: 'error' });
      return false;
    }
    if (!formData.phoneNumber.startsWith('07')) {
      setMessage({ text: 'Phone number must start with 07!', type: 'error' });
      return false;
    }
    if (employees.some((emp) => emp.email === formData.email)) {
      setMessage({ text: 'Email already exists!', type: 'error' });
      return false;
    }
    if (employees.some((emp) => emp.phoneNumber === formData.phoneNumber)) {
      setMessage({ text: 'Phone number already exists!', type: 'error' });
      return false;
    }
    return true;
  };

  const handleAddEmployee = () => {
    if (validateForm()) {
      setEmployees([...employees, formData]);
      resetForm();
      setIsAddModalOpen(false);
      setMessage({ text: 'New employee successfully added!', type: 'success' });
    }
  };

  const handleEditEmployee = (employee) => {
    setCurrentEmployee(employee);
    setFormData(employee);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    setEmployees(
      employees.map((emp) =>
        emp.email === currentEmployee.email ? formData : emp
      )
    );
    resetForm();
    setIsEditModalOpen(false);
    setMessage({ text: 'Employee updated successfully!', type: 'success' });
  };

  const handleDeleteEmployee = () => {
    setEmployees(employees.filter((emp) => !selectedEmployees.includes(emp.email)));
    setSelectedEmployees([]);
    setIsDeleteModalOpen(false);
    setMessage({ text: 'Employee(s) deleted successfully!', type: 'success' });
  };

  const handleCheckboxChange = (email) => {
    setSelectedEmployees((prev) =>
      prev.includes(email)
        ? prev.filter((e) => e !== email)
        : [...prev, email]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEmployees(currentEmployees.map((emp) => emp.email));
    } else {
      setSelectedEmployees([]);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      gender: '',
      email: '',
      phoneNumber: '',
      status: '',
      jobTitle: '',
      department: '',
      photo: 'https://via.placeholder.com/30',
    });
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'All Departments' || emp.department === filterDepartment;
    const matchesStatus = filterStatus === 'All Status' || emp.status === filterStatus;
    const matchesJobTitle = filterJobTitle === 'All Job Titles' || emp.jobTitle === filterJobTitle;
    return matchesSearch && matchesDepartment && matchesStatus && matchesJobTitle;
  });

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="add-employee">
      <div className="top-bar">
        <h2>Manage Employees</h2>
        <div>
          <button className="new-employee-btn" onClick={() => setIsAddModalOpen(true)}>
            + New Employee
          </button>
          {selectedEmployees.length > 0 && (
            <button className="delete-btn" onClick={() => setIsDeleteModalOpen(true)}>
              Delete Employee
            </button>
          )}
        </div>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="search-filter-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="filters">
          <select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)}>
            <option value="All Departments">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Operations">Operations</option>
            <option value="Finance">Finance</option>
            <option value="Sales">Sales</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select value={filterJobTitle} onChange={(e) => setFilterJobTitle(e.target.value)}>
            <option value="All Job Titles">All Job Titles</option>
            <option value="Finance Manager">Finance Manager</option>
            <option value="HR Manager">HR Manager</option>
            <option value="IT Help-desk">IT Help-desk</option>
            <option value="Account Manager">Account Manager</option>
            <option value="Admin Manager">Admin Manager</option>
            <option value="Account Executive">Account Executive</option>
          </select>
        </div>
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" onChange={handleSelectAll} checked={selectedEmployees.length === currentEmployees.length && currentEmployees.length > 0} />
            </th>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Status</th>
            <th>Job Title</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((emp) => (
            <tr key={emp.email}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedEmployees.includes(emp.email)}
                  onChange={() => handleCheckboxChange(emp.email)}
                />
              </td>
              <td>
                <img src={emp.photo} alt={emp.fullName} className="employee-photo" />
                {emp.fullName}
              </td>
              <td>{emp.gender}</td>
              <td>{emp.email}</td>
              <td>
                <span className={`status ${emp.status.toLowerCase().replace(' ', '-')}`}>
                  {emp.status}
                </span>
              </td>
              <td>{emp.jobTitle}</td>
              <td>{emp.department}</td>
              <td>
                <span className="action-icon" onClick={() => handleEditEmployee(emp)}>✏️</span>
                <span className="action-icon">ℹ️</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-footer">
        Showing {indexOfFirstEmployee + 1} to {Math.min(indexOfLastEmployee, filteredEmployees.length)} of {filteredEmployees.length} entries
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            {currentPage} ... {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Employee</h3>
            </div>
            <hr />
            <div className="modal-body">
              <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} />
              <select name="gender" value={formData.gender} onChange={handleInputChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
              <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} />
              <select name="status" value={formData.status} onChange={handleInputChange}>
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
              <select name="jobTitle" value={formData.jobTitle} onChange={handleInputChange}>
                <option value="">Select Job Title</option>
                <option value="Finance Manager">Finance Manager</option>
                <option value="HR Manager">HR Manager</option>
                <option value="IT Help-desk">IT Help-desk</option>
                <option value="Account Manager">Account Manager</option>
                <option value="Admin Manager">Admin Manager</option>
                <option value="Account Executive">Account Executive</option>
              </select>
              <select name="department" value={formData.department} onChange={handleInputChange}>
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Operations">Operations</option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <hr />
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
              <button className="add-btn" onClick={handleAddEmployee}>Add</button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Employee</h3>
            </div>
            <hr />
            <div className="modal-body">
              <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} />
              <select name="gender" value={formData.gender} onChange={handleInputChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
              <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} />
              <select name="status" value={formData.status} onChange={handleInputChange}>
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
              <select name="jobTitle" value={formData.jobTitle} onChange={handleInputChange}>
                <option value="">Select Job Title</option>
                <option value="Finance Manager">Finance Manager</option>
                <option value="HR Manager">HR Manager</option>
                <option value="IT Help-desk">IT Help-desk</option>
                <option value="Account Manager">Account Manager</option>
                <option value="Admin Manager">Admin Manager</option>
                <option value="Account Executive">Account Executive</option>
              </select>
              <select name="department" value={formData.department} onChange={handleInputChange}>
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Operations">Operations</option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <hr />
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
              <button className="add-btn" onClick={handleSaveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Delete this employee Data?</h3>
            </div>
            <hr />
            <div className="modal-body delete-modal-body">
              <span className="delete-icon">👤</span>
              <p>
                You are going to delete {selectedEmployees.length} Employees Data, all of their data will permanently deleted
              </p>
            </div>
            <hr />
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
              <button className="add-btn" onClick={handleDeleteEmployee}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddEmployee;