import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  // Extract current page from pathname
  const currentPage = location.pathname.split('/')[1] || 'dashboard';

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar 
        currentPage={currentPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          currentPage={currentPage}
        />
        
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="w-full mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;