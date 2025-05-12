// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Optional styling

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
      body: JSON.stringify({ email, password }),
    });

    const text = await response.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error('Invalid JSON:', err);
      setErrorMsg('Invalid response from server.');
      return;
    }

    if (response.ok && data.role) {
      // Store role in localStorage
      localStorage.setItem('role', data.role); // Store role
 localStorage.setItem('token', data.token); 
      // Redirect based on role
      if (data.role === 'hr manager') {
        navigate('/hr/dashboard'); // HR app
      } else if (data.role === 'employee') {
        navigate('/employee'); // Employee app
      } else {
        setErrorMsg('Invalid role.');
      }
    } else {
      setErrorMsg(data.message || 'Invalid credentials.');
    }
  } catch (err) {
    console.error('Login error:', err);
    setErrorMsg('Something went wrong. Try again.');
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
