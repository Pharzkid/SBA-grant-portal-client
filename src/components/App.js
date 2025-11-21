import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from '../pages/SignUp'; 
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import AdminDashboard from './admin/AdminDashboard'; 
import LoadingSpinner from './common/LoadingSpinner'; 
import '../styles/App.css'; 


// Component to protect user routes
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

// Component to protect admin routes (Robust Check)
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user'); // Get the raw string user data
  
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // Safely parse the user string
  let user = null;
  try {
    user = JSON.parse(userString);
  } catch (e) {
    console.error("Failed to parse user data from local storage:", e);
  }

  // --- ROBUST ADMIN CHECK ---
  // Checks if user exists AND if the isAdmin property is strictly true (boolean) 
  // OR the string "true" (as local storage stores values as strings).
  const isAdmin = user && (user.isAdmin === true || user.isAdmin === 'true');


  if (!isAdmin) {
    // If the user is not identified as admin, redirect to the user dashboard
    return <Navigate to="/dashboard" replace />; 
  }

  return children;
};


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/signup" replace />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/loading" element={<LoadingSpinner />} />

          {/* Protected User Route */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* Protected Admin Route */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />

          {/* Redirect any unmatched path to signin */}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;