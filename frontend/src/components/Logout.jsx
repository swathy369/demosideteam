import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate logout process
    localStorage.clear();

    // Redirect to login page after logout delay or immediately
    setTimeout(() => {
      navigate('/login');  // or your login route
    }, 1000);
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
