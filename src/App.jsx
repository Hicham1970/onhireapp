import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Loader from './components/Loader';
import { useAuth } from './context/AuthContext';
import AdminRoute from './components/AdminRoute';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const DashboardUser = lazy(() => import('./pages/DashboardUser'));
const CreateSurvey = lazy(() => import('./pages/CreateSurvey'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Edit = lazy(() => import('./pages/Edit'));
const User = lazy(() => import('./pages/User'));
const Users = lazy(() => import('./pages/Users'));
const Onhire = lazy(() => import('./pages/Onhire'));
const EditSurvey = lazy(() => import('./pages/EditSurvey'));
const Notfound = lazy(() => import('./pages/Notfound'));
const Reports = lazy(() => import('./pages/Reports'));
const DashboardAdmin = lazy(() => import('./pages/DashboardAdmin'));
const EditReport = lazy(() => import('./pages/EditReport'));


function App() {
  const { currentUser, userData, loading } = useAuth();
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
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={currentUser ? <Navigate to="/dashboard" /> : <Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardUser />} />
          <Route path="/create-survey" element={<CreateSurvey />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/onhire" element={<Onhire />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/edit-survey/:surveyId" element={<EditSurvey />} />
          <Route path="/admin/edit-survey/:userId/:surveyId" element={<EditSurvey />} />
          <Route path="/admin/edit-report/:userId/:reportId" element={<EditReport />} />

          <Route path="/users/:username/edit" element={<Edit />} />
          <Route path="/users/:username" element={<User />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
