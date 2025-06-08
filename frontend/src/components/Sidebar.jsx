import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth tokens or user data from localStorage/sessionStorage here
    localStorage.clear();
    // Redirect to login page or landing page after logout
    navigate('/logout');
  };

  return (
    <div style={{
      width: '220px',
      height: '100vh',
      backgroundColor: '#1e293b',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ marginBottom: '40px', fontSize: '24px', fontWeight: 'bold' }}>
        Team Member
      </div>

      <nav style={{ flexGrow: 1 }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            display: 'block',
            padding: '10px 15px',
            marginBottom: '10px',
            color: isActive ? '#3b82f6' : 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            backgroundColor: isActive ? 'rgba(59,130,246,0.1)' : 'transparent'
          })}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/tasks"
          style={({ isActive }) => ({
            display: 'block',
            padding: '10px 15px',
            marginBottom: '10px',
            color: isActive ? '#3b82f6' : 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            backgroundColor: isActive ? 'rgba(59,130,246,0.1)' : 'transparent'
          })}
        >
          Tasks
        </NavLink>
        <NavLink
          to="/profile"
          style={({ isActive }) => ({
            display: 'block',
            padding: '10px 15px',
            marginBottom: '10px',
            color: isActive ? '#3b82f6' : 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            backgroundColor: isActive ? 'rgba(59,130,246,0.1)' : 'transparent'
          })}
        >
          Profile
        </NavLink>
      </nav>

      <button
        onClick={handleLogout}
        style={{
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          padding: '10px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: 'auto'
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
