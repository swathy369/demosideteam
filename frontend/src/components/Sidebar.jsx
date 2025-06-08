// src/components/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/logout');
  };

  const navItemStyle = ({ isActive }) => ({
    display: 'block',
    padding: '10px 15px',
    marginBottom: '10px',
    color: isActive ? '#3b82f6' : 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    backgroundColor: isActive ? 'rgba(59,130,246,0.1)' : 'transparent',
    fontWeight: '500'
  });

  return (
    <Box
      sx={{
        width: 220,
        height: '100vh',
        backgroundColor: '#1e293b',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      <Typography variant="h6" sx={{ mb: 4 }}>
        Team Member
      </Typography>

      <NavLink to="/" style={navItemStyle}>Dashboard</NavLink>
      <NavLink to="/tasks" style={navItemStyle}>Tasks</NavLink>
      <NavLink to="/profile" style={navItemStyle}>Profile</NavLink>

      <Button
        variant="contained"
        color="error"
        onClick={handleLogout}
        sx={{ mt: 'auto', fontWeight: 'bold', borderRadius: '6px' }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;
