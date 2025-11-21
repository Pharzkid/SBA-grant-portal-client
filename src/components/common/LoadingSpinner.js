import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-page">
      <div className="auth-header">
        {/* Logo and Branding */}
        <div className="logo-section">
          <img src="/sba_logo.png" alt="SBA Logo" className="sba-logo" />
          <div className="branding-text">U.S. Small Business Administration</div>
        </div>
      </div>
      <div className="loading-content">
        <h1>Account Creation In Progress</h1>
        <p>We are creating your profile and it may take a minute. Thank you for your patience!</p>
        <div className="spinner"></div> {/* Uses CSS for the spinner animation */}
      </div>
    </div>
  );
};

export default LoadingSpinner;