import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardUser from './pages/DashboardUser';
import DashboardAdmin from './pages/DashboardAdmin';
import CreateSurvey from './pages/CreateSurvey';
import AdminDashboard from './pages/AdminDashboard';
import Edit from './pages/Edit';
import User from './pages/User';
import Users from './pages/Users';
import Onhire from './pages/Onhire';
import EditSurvey from './pages/EditSurvey';
import Notfound from './pages/Notfound';
import { useAuth } from './context/AuthContext';

function App() {
  const { currentUser, userData, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && window.location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Chargement...</div>;
  }

  return (
    <>
      <Navbar />
      <Alert />
      <Routes>
        <Route path="/" element={currentUser ? <Navigate to="/dashboard" /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardUser />} />
        <Route path="/create-survey" element={<CreateSurvey />} />
        <Route path="/admin" element={userData?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/dashboard" /> } />
        <Route path="/admin/dashboard" element={userData?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/dashboard" /> } />
        <Route path="/admin/*" element={userData?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/dashboard" /> } />
        <Route path="/onhire" element={<Onhire />} />
        <Route path="/edit-survey/:surveyId" element={<EditSurvey />} />
        <Route path="/admin/edit-survey/:userId/:surveyId" element={<EditSurvey />} />
        <Route path="/create-survey" element={<CreateSurvey />} />
        <Route path="/users/:username/edit" element={<Edit />} />
        <Route path="/users/:username" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<Notfound />} />

      </Routes>
    </>
  );
}

export default App;

