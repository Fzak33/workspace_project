import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import './Finance.css';

function Finance() {
  const [showModal, setShowModal] = useState(false);
  const [records, setRecords] = useState([
    { employee: 'Ahmed Ali', type: 'Salary', amount: 1200, date: '2025-05-01' },
    { employee: 'Sara Khaled', type: 'Bonus', amount: 300, date: '2025-05-03' },
  ]);
  const [formData, setFormData] = useState({ employee: '', type: '', amount: '', date: '' });
  const [message, setMessage] = useState('');

  const [filterEmployee, setFilterEmployee] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('All Time');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!formData.employee || !formData.type || !formData.amount || !formData.date) {
      setMessage('❌ All fields are required');
      return;
    }
    setRecords([...records, formData]);
    setFormData({ employee: '', type: '', amount: '', date: '' });
    setShowModal(false);
    setMessage('✅ Record added successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  const filterByPeriod = (record) => {
    const today = new Date();
    const recordDate = new Date(record.date);

    if (filterPeriod === 'Last 7 Days') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      return recordDate >= sevenDaysAgo;
    } else if (filterPeriod === 'Last 30 Days') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);
      return recordDate >= thirtyDaysAgo;
    }
    return true;
  };

  const filteredRecords = records.filter((rec) =>
    rec.employee.toLowerCase().includes(filterEmployee.toLowerCase()) &&
    (filterType === '' || rec.type === filterType) &&
    (filterDate === '' || rec.date === filterDate) &&
    filterByPeriod(rec)
  );

  const totalSalaries = filteredRecords.filter(r => r.type === 'Salary').reduce((sum, r) => sum + Number(r.amount), 0);
  const totalBonuses = filteredRecords.filter(r => r.type === 'Bonus').reduce((sum, r) => sum + Number(r.amount), 0);
  const totalDeductions = filteredRecords.filter(r => r.type === 'Deduction').reduce((sum, r) => sum + Number(r.amount), 0);

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredRecords);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Finance Records');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Finance_Records.xlsx');
  };

  return (



    <div className="finance-page">
     <div className="top-bar">
  <h2>Finance</h2>
  <div className="top-actions">
    <button className="new-employee-btn" onClick={() => setShowModal(true)}>
      + New Record
    </button>
    <button className="export-btn" onClick={handleExport}>
      ⬇️ Export
    </button>
  </div>
</div>


      <div className="summary-cards">
        <div className="summary-card">
          <h4>Total Salaries</h4>
          <p>${totalSalaries}</p>
        </div>
        <div className="summary-card">
          <h4>Total Bonuses</h4>
          <p>${totalBonuses}</p>
        </div>
        <div className="summary-card">
          <h4>Total Deductions</h4>
          <p>${totalDeductions}</p>
        </div>
      </div>

      <div className="search-filter-bar">
        <input type="text" placeholder="Filter by employee..." value={filterEmployee} onChange={(e) => setFilterEmployee(e.target.value)} />
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">All Types</option>
          <option value="Salary">Salary</option>
          <option value="Bonus">Bonus</option>
          <option value="Deduction">Deduction</option>
        </select>
        <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
        <select value={filterPeriod} onChange={(e) => setFilterPeriod(e.target.value)}>
          <option value="All Time">All Time</option>
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Last 30 Days">Last 30 Days</option>
        </select>
      </div>

      {message && <div className={`message ${message.startsWith('✅') ? 'success' : 'error'}`}>{message}</div>}

      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((rec, index) => (
            <tr key={index}>
              <td>{rec.employee}</td>
              <td>{rec.type}</td>
              <td>${rec.amount}</td>
              <td>{rec.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add Finance Record</h3>
            </div>
            <div className="modal-body">
              <input name="employee" value={formData.employee} onChange={handleChange} placeholder="Employee Name" />
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="">Select Type</option>
                <option value="Salary">Salary</option>
                <option value="Bonus">Bonus</option>
                <option value="Deduction">Deduction</option>
              </select>
              <input name="amount" type="number" value={formData.amount} onChange={handleChange} placeholder="Amount" />
              <input name="date" type="date" value={formData.date} onChange={handleChange} />
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="add-btn" onClick={handleAdd}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Finance;
