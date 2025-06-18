import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext';
import LoadingScreen from './components/Auth/LoadingScreen';
import LoginForm from './components/Auth/LoginForm';
import DashboardPage from './pages/DashboardPage';
import VehiclesPage from './pages/VehiclesPage';
import QRScannerPage from './pages/QRScannerPage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Common/Header';
import Sidebar from './components/Common/Sidebar';
import { useAuth } from './components/Auth/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Layout from './components/Layout/Layout';
import DRCLicenseGenerator from './pages/DriversLicence';
import DRCLicenseVerification from './pages/DRCLicenseVerification';
import VehicleIdGenerator from './pages/VehicleIdGenerator';
import DRCVehicleVerification from './pages/DRCVehicleVerification';

const AppContent = () => {
  const { user, loading, login } = useAuth();
  const location = useLocation();
  
  // Check if current route is the license generator (unprotected)
  const isPublicRoute = location.pathname === '/licence-generator';
  
  if (loading) {
    return <LoadingScreen />;
  }

  // If it's a public route, render it directly without authentication check
  if (isPublicRoute) {
    return (
      <Routes>
        <Route path="/licence-generator" element={<DRCLicenseGenerator />} />
        <Route path="/licence-verification" element={<DRCLicenseVerification />} />
        <Route path="/vehicle-id-generator" element={<VehicleIdGenerator />} />
      </Routes>
    );
  }

  // For protected routes, check authentication
  if (!user) {
    // return <LoginForm onLogin={login} />;
    // return <DRCLicenseGenerator/>;
    // return <DRCLicenseVerification/>;
    // return <VehicleIdGenerator/>
    return <DRCVehicleVerification/>

  }

  return (
    <Routes>
      {/* Protected Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route 
          path="dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="vehicles" 
          element={
            <ProtectedRoute>
              <VehiclesPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="qr-scanner" 
          element={
            <ProtectedRoute>
              <QRScannerPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
      </Route>
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Unprotected route - accessible to everyone */}
          <Route path="/licence-generator" element={<DRCLicenseGenerator />} />
          
          {/* All other routes go through AppContent for authentication */}
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
