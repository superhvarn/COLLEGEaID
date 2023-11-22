import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./LoginPage.css";
import logo from '//Users/rohansonthalia/Documents/AIvisor/src/frontend/collegeAid.png';

export default function Login() {
  const navigate = useNavigate(); // Get the navigate function

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    // Define the data you want to send
    const data = {
      email: email,
      password: password,
    };

    axios.post('http://0.0.0.0:8080/login', data, { // Changed URL to /login
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log('Full Response:', response); // Log the entire response
      if (response.status === 200) {
        console.log('Response Data:', response.data);
        navigate('/quiz'); // Redirect to quiz page
      } else if (response.status === 401) {
        // Invalid username or password
        setError("Invalid username or password");
      } else {
        // Handle other errors
        setError("An error occurred. Please try again.");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setError("An error occurred. Please try again.");
    });
  }

  return (
    <div className="Login">
      <img src={logo} alt="Logo" className="logo" />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      </Form>
    </div>
  );
}
