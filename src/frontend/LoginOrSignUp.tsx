import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css'; // Import your CSS file
import collegeAidLogo from '/Users/rohansonthalia/Documents/AIvisor/src/frontend/collegeAid.png';
import bwBackground from '/Users/rohansonthalia/Documents/AIvisor/src/frontend/bwbackground.png';

const LoginOrSignUp = () => {
  return (
    <div className="collegeAidContainer" style={{ backgroundImage: `url(${bwBackground})` }}>
      <div className="buttonsContainer">
        <Link to="/login">
          <button className="loginBtn">Log In</button>
        </Link>
        <Link to="/signup">
          <button className="registerBtn">Register</button>
        </Link>
      </div>
      <div className="logoContainer" style={{ marginTop: '50px' }}>
        <img src={collegeAidLogo} alt="College Logo" className="college-logo" />
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', fontFamily: 'Roboto, sans-serif', marginLeft: '-140px' }}>
        <div>
          <h1 style={{ fontSize: '100px', color: 'black' }}>COLLEGEaiD</h1>
        </div>
        <div style={{ marginLeft: '160px', marginTop: '70px' }}>
          <h3 style={{ fontSize: '30px', color: 'white' }}>Making college applications easier</h3>
        </div>
      </div>
    </div>
  );
};

export default LoginOrSignUp;
