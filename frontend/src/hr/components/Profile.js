import React, { useEffect, useState } from 'react';
import './Profile.css';
import { Employee } from '../../models/employee-model';

function Profile() {
  const [employee, setEmployee] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('employee');
    if (stored) {
      const parsed = JSON.parse(stored);
      const emp = Employee.fromJson(parsed);
      setEmployee(emp);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewURL(URL.createObjectURL(file)); // فقط للعرض
      setUploadMessage(''); // إعادة تعيين الرسالة
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('images', selectedImage);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/employee/add-image', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setUploadMessage('✅ Image uploaded successfully!');
      } else {
        setUploadMessage('❌ Failed to upload image.');
      }
    } catch (err) {
      console.error('❌ Upload failed:', err);
      setUploadMessage('❌ Upload error.');
    }
  };

  return (
    <div className="profile-page">
      <h2>Profile Settings</h2>
      {employee && (
        <div className="profile-card">
          <div className="profile-image">
            <img
              src={previewURL || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="image-preview"
            />
            <label className="upload-btn">
              Upload New Photo
              <input type="file" accept="image/*" onChange={handleImageChange} hidden />
            </label>

            {selectedImage && (
              <button className="save-btn" onClick={handleImageUpload}>
                Save
              </button>
            )}

            {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
          </div>

          <div className="profile-info">
            <h3>{employee.name}</h3>
            <p>Email: {employee.email}</p>
            <p>Department: {employee.department}</p>
            <p>Position: {employee.position}</p>
            <p>Status: {employee.status}</p>
            <p>Age: {employee.getAge()} years old</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
