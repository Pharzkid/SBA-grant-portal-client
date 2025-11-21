import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Footer from '../components/common/Footer';
import axios from 'axios';

// Placeholder for API URL - needs to be updated when backend is defined
const API_BASE_URL = 'http://localhost:5000/api/auth'; 

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    dob: '',
    address: '',
    state: '',
    country: '',
    mobileNumber: '',
    email: '',
    occupation: '',
    homeNumber: '',
    purpose: '',
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handlePurposeChange = (e) => {
    if (e.target.value.length <= 250) {
      setFormData({ ...formData, purpose: e.target.value });
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Client-Side Validation
    const formValues = Object.values(formData);
    const requiredFieldsFilled = formValues.every(val => val.trim() !== '');

    if (!requiredFieldsFilled || !agreeTerms) {
      setError('All fields required and you must agree to the terms and privacy policy.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setLoading(true);

    try {
        // 2. Registration API Call (Backend will generate random balance)
        // In a real app, you would send only necessary fields.
        const response = await axios.post(`${API_BASE_URL}/register`, formData);
        
        // 3. 1-Minute Loading Delay (Simulated)
        setTimeout(() => {
            setLoading(false);
            
            // Assuming successful registration returns a token and user data
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // 4. Redirect to Dashboard
            navigate('/dashboard');
        }, 60000); // 60,000 milliseconds = 1 minute

    } catch (err) {
        setLoading(false);
        // Handle API errors (e.g., email already exists)
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  // If loading, display spinner page
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="signup-page">
      <header className="auth-header">
        {/* Logo and Branding (Based on Mockup) */}
        <div className="logo-section">
          <img src="/sba_logo.png" alt="SBA Logo" className="sba-logo" />
          <div className="branding-text">U.S. Small Business Administration</div>
        </div>
        <p className="security-message">
          The SBA is dedicated to protecting your data. The steps required to
          register and sign in are necessary to ensure your information will stay safe with us.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="signup-form">
        <h2>SBA Grant Portal Registration</h2>
        
        {/* Row 1: Names */}
        <div className="form-row">
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        </div>
        
        {/* Row 2: DOB & Password */}
        <div className="form-row">
          <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        
        {/* Row 3: Contact */}
        <div className="form-row">
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="mobileNumber" placeholder="Mobile Phone Number" value={formData.mobileNumber} onChange={handleChange} required />
          <input type="text" name="homeNumber" placeholder="Home Phone Number" value={formData.homeNumber} onChange={handleChange} />
        </div>

        {/* Row 4: Location */}
        <div className="form-row">
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
          <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
        </div>
        
        {/* Row 5: Occupation */}
        <div className="form-row">
           <input type="text" name="occupation" placeholder="Occupation" value={formData.occupation} onChange={handleChange} required />
        </div>

        {/* Purpose for Applying (Separate Field) */}
        <label htmlFor="purpose" className="purpose-label">Purpose for Applying (250 characters max)</label>
        <textarea
          id="purpose"
          name="purpose"
          rows="4"
          maxLength="250"
          value={formData.purpose}
          onChange={handlePurposeChange}
          placeholder="Briefly state your purpose for applying..."
          required
        ></textarea>
        <div className="char-count">{formData.purpose.length}/250</div>
        
        {/* Terms and Privacy Checkbox (Separate) */}
        <div className="terms-checkbox">
          <input type="checkbox" id="agreeTerms" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
          <label htmlFor="agreeTerms">I agree to the Terms and Privacy Policy</label>
        </div>

        <button type="submit" className="register-button">Register</button>

        {error && <p className="error-text">{error}</p>}

        <p className="signin-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </form>

      <Footer />
    </div>
  );
};

export default SignUp;