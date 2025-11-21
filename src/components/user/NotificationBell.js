import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';

const NotificationBell = ({ notifications = [] }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const unreadCount = notifications.length; // Simple count of all notifications

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="notification-container">
            <button className="notification-bell" onClick={toggleDropdown} aria-label="Notifications">
                <FaBell size={20} />
                {unreadCount > 0 && (
                    <span className="notification-count">{unreadCount}</span>
                )}
            </button>

            {isDropdownOpen && (
                <div className="notification-dropdown">
                    {notifications.length > 0 ? (
                        notifications.map(note => (
                            <div key={note.id} className="notification-item">
                                <p>{note.message}</p>
                            </div>
                        ))
                    ) : (
                        <div className="notification-item no-notes">
                            No new notifications.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationBell;