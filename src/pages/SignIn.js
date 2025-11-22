import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/common/Footer';
import axios from 'axios';
import api from '../utils/api'; // Assuming you have an api utility file already

// The base URL for authentication API calls
const API_BASE_URL = 'https://sba-grant-portal-server.onrender.com/api/auth';


const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
            
            setLoading(false);
            const { token, user } = response.data;
            
            // Store token and the user object (which includes 'isAdmin')
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // CRITICAL CHANGE: Check the isAdmin flag for immediate redirection
            if (user && user.isAdmin) {
                // If the user is an admin, navigate to the admin dashboard
                navigate('/admin');
            } else {
                // Otherwise, navigate to the user dashboard
                navigate('/dashboard');
            }
            
            // If you have an overall app state update function (like onSignIn in previous examples), call it here
            // onSignIn(); 

        } catch (err) {
            setLoading(false);
            // Handle API errors (e.g., incorrect credentials)
            setError(err.response?.data?.message || 'Login failed. Please check your email and password.');
        }
    };

    return (
        <div className="signin-page">
            <header className="auth-header">
                {/* Logo and Branding (Consistent with SignUp) */}
                <div className="logo-section">
                    <img src="/sba_logo.png" alt="SBA Logo" className="sba-logo" />
                    <div className="branding-text">U.S. Small Business Administration</div>
                </div>
                <p className="security-message">
                    The SBA is dedicated to protecting your data. The steps required to
                    register and sign in are necessary to ensure your information will stay safe with us.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="signin-form">
                <h2>Sign In</h2>
                
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />

                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? 'Logging In...' : 'Sign In'}
                </button>

                {error && <p className="error-text">{error}</p>}

                <div className="auth-links">
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </form>

            <Footer />
        </div>
    );
};

export default SignIn;