import React from 'react';

const BalanceSection = ({ balance }) => {
    // Format the balance for display
    const formattedBalance = balance ? 
        `$${balance.toLocaleString('en-US')}` : 
        '$0.00';

    return (
        <div className="balance-status-container">
            {/* Left Box: Status and Amount Confirmed */}
            <div className="balance-card">
                <p className="status-label">Status: Amount Confirmed</p>
                <div className="balance-amount">{formattedBalance}</div>
            </div>

            {/* Right Box: Processing Message (Green Background) */}
            <div className="processing-card green-bg">
                <p>Your application is being processed</p>
                <p>text us directly or continue with your agent</p>
            </div>
        </div>
    );
};

export default BalanceSection;