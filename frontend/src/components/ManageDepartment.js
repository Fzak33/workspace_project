import React, { useState, useEffect } from 'react';
import './ManageDepartment.css';

function ManageDepartment() {
  const [showModal, setShowModal] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({ name: '', head: '' });
  const [message, setMessage] = useState('');

  // ✅ جلب الأقسام عند تحميل الصفحة
  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/hr-manager/get-departments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setDepartments(data);
    } catch (error) {
      setMessage('❌ Failed to fetch departments');
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // ✅ إضافة قسم جديد
  const handleAddDepartment = async () => {
    if (!newDepartment.name || !newDepartment.head) {
      setMessage('❌ All fields are required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/hr-manager/add-department', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newDepartment),
      });

      if (res.ok) {
        setMessage('✅ Department added successfully');
        setNewDepartment({ name: '', head: '' });
        setShowModal(false);
        fetchDepartments(); // 🔁 تحديث القائمة
      } else {
        const err = await res.json();
        setMessage('❌ ' + (err.message || 'Failed to add department'));
      }
    } catch (error) {
      setMessage('❌ Server error');
    }

    setTimeout(() => setMessage(''), 3000);
  };

  // ✅ حذف قسم
  const handleDelete = async (deptId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/hr-manager/delete-department', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ _id: deptId }),
      });

      if (res.ok) {
        setMessage('❌ Department deleted');
        fetchDepartments(); // 🔁 تحديث القائمة
      } else {
        const err = await res.json();
        setMessage('❌ ' + (err.message || 'Failed to delete department'));
      }
    } catch (error) {
      setMessage('❌ Server error');
    }

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="add-employee">
      <div className="top-bar">
        <h2>Manage Departments</h2>
        <div>
          <button className="new-employee-btn" onClick={() => setShowModal(true)}>
            + New Department
          </button>
        </div>
      </div>

      {message && <div className={`message ${message.startsWith('✅') ? 'success' : 'error'}`}>{message}</div>}

      <table className="employee-table">
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Head of Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept, index) => (
            <tr key={dept._id || index}>
              <td>{dept.name}</td>
              <td>{dept.head}</td>
              <td>
                <span className="action-icon" onClick={() => handleDelete(dept._id)}>🗑️</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add Department</h3>
            </div>
            <div className="modal-body">
            <select
  value={newDepartment.name}
  onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
>
  <option value="">Select Department</option>
  <option value="IT">IT</option>
  <option value="HR">HR</option>
  <option value="Operations">Operations</option>
  <option value="Finance">Finance</option>
  <option value="Sales">Sales</option>
</select>

              <input
                type="text"
                placeholder="Head of Department"
                value={newDepartment.head}
                onChange={(e) => setNewDepartment({ ...newDepartment, head: e.target.value })}
              />
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="add-btn" onClick={handleAddDepartment}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageDepartment;
