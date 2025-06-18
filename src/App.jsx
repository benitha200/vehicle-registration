import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/Auth/AuthContext';
import LoadingScreen from './components/Auth/LoadingScreen';
import LoginForm from './components/Auth/LoginForm';
import DashboardPage from './pages/DashboardPage';
import VehiclesPage from './pages/VehiclesPage';
import QRScannerPage from './pages/QRScannerPage';
import ProfilePage from './pages/ProfilePage';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';

import DRCLicenseGenerator from './pages/DriversLicence';
import DRCLicenseVerification from './pages/DRCLicenseVerification';
import VehicleIdGenerator from './pages/VehicleIdGenerator';
import DRCVehicleVerification from './pages/DRCVehicleVerification';

// Define public paths that don't require authentication
const publicPaths = [
  '/vehicle-registration/licence-generator',
  '/vehicle-registration/licence-verification', 
  '/vehicle-registration/vehicle-id-generator',
  '/vehicle-registration/vehicle-verification'
];

const AppContent = () => {
  const { user, loading, login } = useAuth();
  const location = useLocation();

  const isPublicRoute = publicPaths.includes(location.pathname);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      {/* Public routes - no authentication required */}
      <Route path="/licence-generator" element={<DRCLicenseGenerator />} />
      <Route path="/licence-verification" element={<DRCLicenseVerification />} />
      <Route path="/vehicle-id-generator" element={<VehicleIdGenerator />} />
      <Route path="/vehicle-verification" element={<DRCVehicleVerification />} />

      {/* Protected routes - authentication required */}
      <Route path="/" element={user ? <Layout /> : <LoginForm onLogin={login} />}>
        <Route index element={user ? <Navigate to="/dashboard" replace /> : null} />
        <Route path="dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="vehicles" element={
          <ProtectedRoute>
            <VehiclesPage />
          </ProtectedRoute>
        } />
        <Route path="qr-scanner" element={
          <ProtectedRoute>
            <QRScannerPage />
          </ProtectedRoute>
        } />
        <Route path="profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={
        isPublicRoute ? <Navigate to="/licence-generator" replace /> : 
        user ? <Navigate to="/dashboard" replace /> : <LoginForm onLogin={login} />
      } />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;