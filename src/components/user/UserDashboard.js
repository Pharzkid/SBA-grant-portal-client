import React, { useState } from 'react';
import NotificationBell from './NotificationBell'; 
import { FaSignOutAlt, FaWallet, FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

// --- Withdrawal Modal Component ---
const WithdrawalModal = ({ show, onClose, message }) => {
    if (!show) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="text-xl font-bold text-red-700">Withdrawal Notice</h4>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>
                <div className="modal-body p-4 bg-red-50 border border-red-300 rounded-lg">
                    <p className="font-semibold text-red-800">Important Message from Administrator:</p>
                    <p className="text-sm text-red-700 mt-1 italic">{message}</p>
                </div>
                <div className="modal-footer mt-4 flex justify-end">
                    <button 
                        onClick={onClose} 
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
// ----------------------------


const UserDashboard = ({ userData, withdrawalMessage, onSignOut }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!userData) return null;

    const balance = userData.balance ? userData.balance.toLocaleString('en-US') : '0';
    const status = "Processing"; 
    const statusColor = "bg-yellow-100 text-yellow-800"; 

    const handleWithdrawalClick = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="user-dashboard-main">
            
            {/* --- Header - CRITICAL FIX AREA --- */}
            <header className="user-dashboard-main header">
                <div className="logo-section">
                    <img src="/sba_logo.png" alt="SBA Logo" className="sba-logo" />
                    <span className="branding-text">Grant Portal</span>
                </div>
                <div className="flex items-center space-x-4">
                    <NotificationBell />
                    <button 
                        onClick={onSignOut}
                        className="flex items-center space-x-2 text-red-500 hover:text-red-700 font-medium transition duration-150 text-sm sm:text-base"
                    >
                        <FaSignOutAlt className="w-5 h-5" />
                        <span className="hidden sm:inline">Sign Out</span>
                    </button>
                </div>
            </header>
            {/* --- END CRITICAL FIX AREA --- */}

            {/* --- Welcome Message & Top Cards --- */}
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                Welcome, {userData.firstName}!
            </h2>
            {/* ... rest of the content remains the same ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Balance Card */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 flex items-center">
                    <FaWallet className="w-8 h-8 text-green-500 mr-4" />
                    <div>
                        <p className="text-sm font-medium text-gray-500">Confirmed Grant Balance</p>
                        <p className="text-3xl font-bold text-gray-900">${balance}</p>
                    </div>
                </div>

                {/* Status Card */}
                <div className={`p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 flex items-center ${statusColor}`}>
                    {status === "Processing" ? (
                        <FaExclamationCircle className="w-8 h-8 mr-4" />
                    ) : (
                        <FaCheckCircle className="w-8 h-8 mr-4" />
                    )}
                    <div>
                        <p className="text-sm font-medium">Application Status</p>
                        <p className="text-3xl font-bold">{status}</p>
                    </div>
                </div>
            </div>

            {/* --- Withdrawal Section --- */}
            <section className="bg-white p-6 rounded-xl shadow-lg mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Withdrawal Status & Actions</h3>
                
                <button 
                    onClick={handleWithdrawalClick} // Triggers the modal
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md"
                >
                    Request Withdrawal
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                    Click to check the current status and withdrawal instructions.
                </p>
            </section>

            {/* --- User Details & Definitions --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Info Card */}
                <section className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Your Profile Details</h3>
                    <ul className="text-sm space-y-2 text-gray-600">
                        <li><strong>Name:</strong> {userData.firstName} {userData.lastName}</li>
                        <li><strong>Email:</strong> {userData.email}</li>
                        <li><strong>State/Country:</strong> {userData.state}, {userData.country}</li>
                        <li><strong>Mobile:</strong> {userData.mobileNumber}</li>
                    </ul>
                </section>
                
                {/* Key Definitions Card */}
                <section className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Key Definitions</h3>
                    <ul className="text-sm space-y-2 text-gray-600 list-disc pl-5">
                        <li>**Balance:** The total grant amount approved for your business.</li>
                        <li>**Processing:** Application has been submitted and is under final review.</li>
                        <li>**Withdrawal:** The process of transferring funds to your bank account.</li>
                    </ul>
                </section>
            </div>

            {/* --- The Modal Component --- */}
            <WithdrawalModal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                message={withdrawalMessage}
            />
        </div>
    );
};

export default UserDashboard;