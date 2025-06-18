import { Car, Clock, Eye, MoreVertical } from 'lucide-react';

const mockVehicles = [
  {
    id: 1,
    numberPlate: 'RAD123A',
    ownerName: 'Jane Smith',
    status: 'VALID',
    lastScan: '2 minutes ago',
    location: 'Downtown'
  },
  {
    id: 2,
    numberPlate: 'RAD456B',
    ownerName: 'John Doe',
    status: 'EXPIRED',
    lastScan: '15 minutes ago',
    location: 'Airport Road'
  },
  {
    id: 3,
    numberPlate: 'RAD789C',
    ownerName: 'Mary Johnson',
    status: 'VALID',
    lastScan: '1 hour ago',
    location: 'City Center'
  },
  {
    id: 4,
    numberPlate: 'RAD321D',
    ownerName: 'Robert Wilson',
    status: 'PENDING',
    lastScan: '2 hours ago',
    location: 'Industrial Zone'
  }
];

const RecentActivity = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'VALID':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'EXPIRED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
            <p className="text-sm text-gray-600 mt-1">Latest vehicle scans and updates</p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Eye className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-gray-100">
        {mockVehicles.map((vehicle, index) => (
          <div
            key={vehicle.id}
            className="p-6 hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Vehicle Icon */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-gray-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                {/* Vehicle Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-lg font-bold text-gray-900">{vehicle.numberPlate}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{vehicle.ownerName}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{vehicle.lastScan}</span>
                    </div>
                    <span>•</span>
                    <span>{vehicle.location}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded-lg transition-all">
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
          View all activity →
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;