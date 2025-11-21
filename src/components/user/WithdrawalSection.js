import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Placeholder for API URL to fetch/update the admin-set message
const ADMIN_API_URL = 'http://localhost:5000/api/config/withdrawal-message'; 

const WithdrawalSection = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [withdrawalMessage, setWithdrawalMessage] = useState("withdrawal not possible right, 2.5% Fee not confirmed yet contact us or continue with your agent.");

    useEffect(() => {
        // Fetch the message set by the admin (in a real app)
        const fetchMessage = async () => {
            try {
                // const response = await axios.get(ADMIN_API_URL);
                // setWithdrawalMessage(response.data.message);
                // For now, use the default hardcoded message
            } catch (error) {
                console.error("Could not fetch withdrawal message:", error);
            }
        };
        fetchMessage();
    }, []);

    const handleWithdraw = () => {
        if (!selectedOption) {
            alert("Please select a withdrawal option.");
            return;
        }
        setShowPopup(true);
    };

    const options = [
        "withdraw through direct deposit", 
        "withdraw with card", 
        "link bank account to withdraw"
    ];

    return (
        <div className="withdrawal-section card">
            <h3>Withdrawal Options</h3>
            <div className="options-list">
                {options.map((option) => (
                    <div key={option} className="radio-option">
                        <input
                            type="radio"
                            id={option.replace(/\s/g, '-')}
                            name="withdrawal-option"
                            value={option}
                            checked={selectedOption === option}
                            onChange={() => setSelectedOption(option)}
                        />
                        <label htmlFor={option.replace(/\s/g, '-')}>{option}</label>
                    </div>
                ))}
            </div>

            <button 
                className="withdraw-button" 
                onClick={handleWithdraw}
                disabled={!selectedOption}
            >
                Withdraw
            </button>

            {/* Pop-up Notification */}
            {showPopup && (
                <div className="popup-overlay" onClick={() => setShowPopup(false)}>
                    <div className="withdrawal-popup" onClick={(e) => e.stopPropagation()}>
                        <span className="close-btn" onClick={() => setShowPopup(false)}>&times;</span>
                        <p>{withdrawalMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WithdrawalSection;