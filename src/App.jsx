import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'; // ✅ Use HashRouter for GitHub Pages
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

const publicPaths = [
  '/licence-generator',
  '/licence-verification',
  '/vehicle-id-generator',
  '/vehicle-verification'
];

const AppContent = () => {
  const { user, loading, login } = useAuth();
  const location = useLocation();

  const isPublicRoute = publicPaths.includes(location.pathname);

  if (loading) {
    return <LoadingScreen />;
  }

  // ✅ Public routes do not require authentication
  if (isPublicRoute) {
    return (
      <Routes>
        <Route path="/licence-generator" element={<DRCLicenseGenerator />} />
        <Route path="/licence-verification" element={<DRCLicenseVerification />} />
        <Route path="/vehicle-id-generator" element={<VehicleIdGenerator />} />
        <Route path="/vehicle-verification" element={<DRCVehicleVerification />} />
        <Route path="*" element={<Navigate to="/licence-generator" replace />} />
      </Routes>
    );
  }

  // ❌ Not public and user is not logged in → show login form
  if (!user) {
    return <LoginForm onLogin={login} />;
  }

  // ✅ Authenticated, render protected routes
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="vehicles" element={<ProtectedRoute><VehiclesPage /></ProtectedRoute>} />
        <Route path="qr-scanner" element={<ProtectedRoute><QRScannerPage /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Top-level public routes (for SSR or direct access via hash URLs) */}
          <Route path="/licence-generator" element={<DRCLicenseGenerator />} />
          <Route path="/licence-verification" element={<DRCLicenseVerification />} />
          <Route path="/vehicle-id-generator" element={<VehicleIdGenerator />} />
          <Route path="/vehicle-verification" element={<DRCVehicleVerification />} />

          {/* All other routes handled by AppContent */}
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
