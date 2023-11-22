import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '/Users/rohansonthalia/Documents/AIvisor/src/frontend/LoginPage.css';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    if (!validateForm()) {
      setError("Please fill out all fields");
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    axios.post('http://0.0.0.0:8080/register', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status === 200) {
          navigate('/login');
        } else {
          setError("An error occurred. Please try again.");
        }
      })
      .catch(error => {
        setError("An error occurred. Please try again.");
      });
  }

  function clearError() {
    setError("");
  }

  return (
    <div className="container">
      <div className="heading">Sign Up for an Account</div>
      {error && (
        <div className="error-message">
          {error}
          <button onClick={clearError}>X</button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="form">
        <div className="input-field">
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-field">
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="btn-container">
          <button type="submit" className="btn">
            Submit
          </button>
          <div className="acc-text">
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} style={{ color: '#0000ff', cursor: 'pointer' }}>
              Sign In
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
