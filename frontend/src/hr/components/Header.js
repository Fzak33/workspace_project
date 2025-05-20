import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { Employee } from '../../models/employee-model';

function Header() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [employee, setEmployee] = useState(null); // ✅ أضف هذا السطر

  useEffect(() => {
    const stored = localStorage.getItem('employee');
    if (stored) {
      const parsed = JSON.parse(stored);
      const emp = Employee.fromJson(parsed);
      setEmployee(emp);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="header">
      <div className="header-left">
        <h2>WorkSpace HR</h2>
      </div>

      <div className="header-right">
        <div className="profile" onClick={toggleDropdown}>
          <img
            src={employee?.images ? `http://localhost:3000/${employee.images}` : 'https://via.placeholder.com/40'}
            alt="Profile"
            className="profile-img"
          />
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
