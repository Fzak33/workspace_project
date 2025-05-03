import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // تأكد أنك أنشأت هذا الملف لتنسيق الصفحة

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
  
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      const text = await response.text(); // ← نستخدم text بدال json
      console.log('Raw response text:', text);
  
      let data;
      try {
        data = JSON.parse(text); // نحولها يدويًا
      } catch (jsonErr) {
        console.error('❌ Failed to parse JSON from backend', jsonErr);
        setErrorMsg('Invalid response from server.');
        return;
      }
  
      console.log('Parsed response:', data);
  
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        console.log('✅ Token saved to localStorage:', data.token);
        navigate('/dashboard');
      } else {
        console.warn('⚠️ No token found in response or login failed');
        setErrorMsg(data.message || 'Invalid credentials. Please try again.');
      }
  
    } catch (error) {
      console.error('❌ Fetch error:', error);
      setErrorMsg('Something went wrong. Please try again later.');
    }
  };
  

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
