import { Plus, Search, QrCode, AlertTriangle, Zap, ArrowRight } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    { 
      icon: QrCode, 
      label: 'Scan QR Code', 
      description: 'Quick vehicle verification',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    { 
      icon: Plus, 
      label: 'Add Vehicle', 
      description: 'Register new vehicle',
      color: 'green',
      gradient: 'from-green-500 to-green-600'
    },
    { 
      icon: Search, 
      label: 'Search Records', 
      description: 'Find vehicle information',
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600'
    },
    { 
      icon: AlertTriangle, 
      label: 'View Alerts', 
      description: 'Check system alerts',
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-100 p-6">
        <div className="flex items-center space-x-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          <div>
            <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
            <p className="text-sm text-gray-600">Common tasks and shortcuts</p>
          </div>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className="group relative bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-all duration-300 hover:shadow-md border border-transparent hover:border-gray-200"
              >
                <div className="flex items-center space-x-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {action.label}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {action.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-100">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Need help getting started?</p>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
            View User Guide →
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;