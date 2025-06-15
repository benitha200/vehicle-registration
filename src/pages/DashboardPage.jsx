import React from 'react';
import StatsCards from '../components/Dashboard/StatsCards';
import QuickActions from '../components/Dashboard/QuickActions';
import RecentActivity from '../components/Dashboard/RecentActivity';

const DashboardPage = () => {
  return (
     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
      {/* <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-light text-blue-900">Welcome back, Officer</h2>
          <p className="text-blue-900 text-sm mt-1">
            Here's what's happening with your system today.
          </p>
        </div>
      </div> */}
      <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Welcome back, Officer
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Here's what's happening with your system today.</p>
          </div>
        </div>

      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
    </div>

  );
};

export default DashboardPage;
