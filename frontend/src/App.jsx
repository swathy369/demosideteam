// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Tasks from "./components/Tasks";
import Logout from "./components/Logout";

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: "24px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;