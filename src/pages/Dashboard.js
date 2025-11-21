import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDashboard from '../components/user/UserDashboard'; // This is the new component
import LoadingSpinner from '../components/common/LoadingSpinner';
import api from '../utils/api'; 
import Footer from '../components/common/Footer';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [withdrawalMessage, setWithdrawalMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to handle sign out (clears token and navigates)
    const handleSignOut = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/signin');
    }, [navigate]);

    // Function to fetch all necessary data
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // 1. Fetch User Data
            const userRes = await api.get('/user/profile');
            const user = userRes.data;
            setUserData(user);

            // 2. Fetch Global Withdrawal Message
            const configRes = await api.get('/user/withdrawal-message');
            setWithdrawalMessage(configRes.data.message);

        } catch (err) {
            console.error("Dashboard data fetch failed:", err);
            setError("Failed to load user data or configuration.");
            
            // If the error is 401 Unauthorized (token expired or invalid), sign out
            if (err.response && err.response.status === 401) {
                handleSignOut();
            }
        } finally {
            setLoading(false);
        }
    }, [handleSignOut]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="error-message-full">Error: {error}</div>;
    }

    return (
        <div className="dashboard-page-container">
            <UserDashboard 
                userData={userData} 
                withdrawalMessage={withdrawalMessage} 
                onSignOut={handleSignOut} 
            />
            <Footer />
        </div>
    );
};

export default DashboardPage;