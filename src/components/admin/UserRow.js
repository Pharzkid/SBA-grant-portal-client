import React from 'react';

const UserRow = ({ user, onSendNotification }) => (
    <tr className="user-row">
        <td>{user.firstName} {user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.balance ? `$${user.balance.toLocaleString('en-US')}` : 'N/A'}</td>
        <td>{user.status || 'Active'}</td>
        <td>
            <button className="action-button" onClick={() => onSendNotification(user._id || user.id)}>
                Send Notification
            </button>
        </td>
    </tr>
);

export default UserRow;