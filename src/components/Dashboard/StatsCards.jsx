import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

const StatsCards = () => {
  const stats = [
    { label: 'Total Vehicles', value: '1,234', change: '+12%', trend: 'up' },
    { label: 'Valid Registrations', value: '1,156', change: '+8%', trend: 'up' },
    { label: 'Expired Controls', value: '78', change: '-5%', trend: 'down' },
    { label: 'Recent Scans', value: '145', change: '+23%', trend: 'up' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white p-4 rounded-lg border border-blue-200 shadow-xs hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-blue-700 uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl font-semibold text-blue-900 mt-1">{stat.value}</p>
            </div>
            <div className={`flex items-center space-x-1 ${
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.trend === 'up' ? (
                <ArrowUpIcon className="w-3 h-3" />
              ) : (
                <ArrowDownIcon className="w-3 h-3" />
              )}
              <span className="text-xs font-medium">{stat.change}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
