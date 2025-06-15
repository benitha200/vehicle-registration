import { ArrowDownIcon, ArrowUpIcon, Car, CheckCircle, AlertCircle, Activity } from 'lucide-react';

const StatsCards = () => {
  const stats = [
    { 
      label: 'Total Vehicles', 
      value: '1,234', 
      change: '+12%', 
      trend: 'up',
      icon: Car,
      color: 'blue',
      bgGradient: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Valid Registrations', 
      value: '1,156', 
      change: '+8%', 
      trend: 'up',
      icon: CheckCircle,
      color: 'green',
      bgGradient: 'from-green-500 to-green-600'
    },
    { 
      label: 'Expired Controls', 
      value: '78', 
      change: '-5%', 
      trend: 'down',
      icon: AlertCircle,
      color: 'red',
      bgGradient: 'from-red-500 to-red-600'
    },
    { 
      label: 'Recent Scans', 
      value: '145', 
      change: '+23%', 
      trend: 'up',
      icon: Activity,
      color: 'purple',
      bgGradient: 'from-purple-500 to-purple-600'
    }
  ];

  const getColorClasses = (color, trend) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      green: 'text-green-600 bg-green-50 border-green-200',
      red: 'text-red-600 bg-red-50 border-red-200',
      purple: 'text-purple-600 bg-purple-50 border-purple-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
          >
            {/* Icon Header */}
            <div className={`bg-gradient-to-r ${stat.bgGradient} p-4`}>
              <div className="flex items-center justify-between">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-white`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpIcon className="w-4 h-4" />
                  ) : (
                    <ArrowDownIcon className="w-4 h-4" />
                  )}
                  <span className="text-sm font-semibold">{stat.change}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <p className="text-sm font-medium text-gray-600 mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>

            {/* Hover Effect Line */}
            <div className={`h-1 bg-gradient-to-r ${stat.bgGradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
