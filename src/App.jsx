import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import OnHire from './pages/Onhire';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Edit from './pages/Edit';
import User from './pages/User';
import Users from './pages/Users';
import Notfound from './pages/Notfound';
import { useAuth } from './context/AuthContext';

function App() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && window.location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  return (
    <>
      <Navbar />
      <Alert />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onhire" element={<OnHire />}>
          <Route index element={<OnHire tab="dashboard" />} />
          <Route path="dashboard" element={<OnHire tab="dashboard" />} />
          <Route path="surveys" element={<OnHire tab="surveys" />} />
          <Route path="vessels" element={<OnHire tab="vessels" />} />
          <Route path="ai" element={<OnHire tab="ai" />} />
          <Route path="pictures" element={<OnHire tab="pictures" />} />
          <Route path="settings" element={<OnHire tab="settings" />} />
          <Route path="users" element={<OnHire tab="users" />} />
        </Route>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/users/:username/edit" element={<Edit />} />
        <Route path="/users/:username" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;

