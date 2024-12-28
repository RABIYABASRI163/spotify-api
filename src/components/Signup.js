import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Common.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState(''); // Default country code (optional)
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          phoneNumber,
          countryCode, // Include country code if provided
        }),
      });

      if (response.ok) {
        // Handle successful signup (e.g., navigate to verification page)
        console.log('Signup successful!');
        // navigate('/verification'); // Replace with appropriate verification flow
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Sign-up failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }
  };

  const handleSigninRedirect = () => {
    navigate('/signin');
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Your Account</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            id="phoneNumber"
            type="tel" // Use "tel" input type for phone numbers
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="countryCode">Country Code:</label>
          <input
            id="countryCode"
            type="text" // Use "text" input type for optional country code
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
      <button className="signin-redirect-button" onClick={handleSigninRedirect}>
        Already have an account? Sign In
      </button>
    </div>
  );
}

export default Signup;