// import React, { useState, useEffect, useContext, createContext } from 'react';

// // Icons
// const Icons = {
//   Car: () => (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-2-2V8a5 5 0 00-10 0v4l-2 2v4a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-4z" />
//     </svg>
//   ),
//   Dashboard: () => (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//     </svg>
//   ),
//   QR: () => (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
//     </svg>
//   ),
//   Plus: () => (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//     </svg>
//   ),
//   Search: () => (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//     </svg>
//   ),
//   User: () => (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//     </svg>
//   ),
//   Logout: () => (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//     </svg>
//   ),
//   Shield: () => (
//     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//     </svg>
//   ),
//   Eye: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//     </svg>
//   ),
//   Edit: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//     </svg>
//   ),
//   Check: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//     </svg>
//   ),
//   X: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//     </svg>
//   ),
//   AlertTriangle: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//     </svg>
//   ),
//   Camera: () => (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//     </svg>
//   )
// };

// // Auth Context
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate checking for stored auth
//     setTimeout(() => {
//       const storedUser = {
//         id: 1,
//         email: 'officer@trafficpolice.gov',
//         firstName: 'John',
//         lastName: 'Doe',
//         badgeNumber: 'TP001',
//         role: 'OFFICER'
//       };
//       setUser(storedUser);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   const login = async (email, password) => {
//     const mockUser = {
//       id: 1,
//       email: email,
//       firstName: 'John',
//       lastName: 'Doe',
//       badgeNumber: 'TP001',
//       role: 'OFFICER'
//     };
//     setUser(mockUser);
//     return mockUser;
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };

// // Mock data
// const mockVehicles = [
//   {
//     id: 1,
//     numberPlate: 'RAD123A',
//     registration: {
//       ownerName: 'Jane Smith',
//       vehicleMake: 'Toyota',
//       vehicleModel: 'Corolla',
//       yearManufactured: 2022
//     },
//     technicalControls: [{ status: 'VALID', expiryDate: '2025-01-01' }],
//     drivingLicenses: [{ license: { holderName: 'Jane Smith', licenseClass: 'B' } }],
//     createdAt: '2024-01-15'
//   },
//   {
//     id: 2,
//     numberPlate: 'RAD456B',
//     registration: {
//       ownerName: 'John Doe',
//       vehicleMake: 'Honda',
//       vehicleModel: 'Civic',
//       yearManufactured: 2023
//     },
//     technicalControls: [{ status: 'EXPIRED', expiryDate: '2024-06-01' }],
//     drivingLicenses: [{ license: { holderName: 'John Doe', licenseClass: 'B' } }],
//     createdAt: '2024-02-20'
//   },
//   {
//     id: 3,
//     numberPlate: 'RAD789C',
//     registration: {
//       ownerName: 'Mary Johnson',
//       vehicleMake: 'Nissan',
//       vehicleModel: 'Sentra',
//       yearManufactured: 2021
//     },
//     technicalControls: [{ status: 'VALID', expiryDate: '2025-03-15' }],
//     drivingLicenses: [{ license: { holderName: 'Mary Johnson', licenseClass: 'B' } }],
//     createdAt: '2024-03-10'
//   }
// ];

// // Components
// const Header = ({ currentPage, setCurrentPage }) => {
//   const { user, logout } = useAuth();
//   const [showUserMenu, setShowUserMenu] = useState(false);

//   return (
//     <div className="bg-slate-800/70 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-blue-600 rounded-lg">
//                 <Icons.Shield />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-white">Vehicle Registration</h1>
//                 <p className="text-sm text-slate-300">Vehicle Registration System</p>
//               </div>
//             </div>
//           </div>

//           <nav className="hidden md:flex space-x-4">
//             {[
//               { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
//               { id: 'vehicles', label: 'Vehicles', icon: Icons.Car },
//               { id: 'qr-scanner', label: 'QR Scanner', icon: Icons.QR }
//             ].map(item => (
//               <button
//                 key={item.id}
//                 onClick={() => setCurrentPage(item.id)}
//                 className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
//                   currentPage === item.id
//                     ? 'bg-blue-600 text-white shadow-lg'
//                     : 'text-slate-300 hover:text-white hover:bg-slate-700'
//                 }`}
//               >
//                 <item.icon />
//                 <span>{item.label}</span>
//               </button>
//             ))}
//           </nav>

//           <div className="relative">
//             <button
//               onClick={() => setShowUserMenu(!showUserMenu)}
//               className="flex items-center space-x-3 text-white hover:text-blue-300 transition-colors"
//             >
//               <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//                 <Icons.User />
//               </div>
//               <div className="hidden md:block text-left">
//                 <div className="text-sm font-medium">{user?.firstName} {user?.lastName}</div>
//                 <div className="text-xs text-slate-300">Badge: {user?.badgeNumber}</div>
//               </div>
//             </button>

//             {showUserMenu && (
//               <div className="absolute right-0 mt-2 w-48 bg-slate-800/90 backdrop-blur-md rounded-md shadow-lg py-1 z-50 border border-slate-700">
//                 <button
//                   onClick={() => {
//                     setCurrentPage('profile');
//                     setShowUserMenu(false);
//                   }}
//                   className="flex items-center space-x-2 px-4 py-2 text-sm text-white hover:bg-slate-700 w-full text-left"
//                 >
//                   <Icons.User />
//                   <span>Profile</span>
//                 </button>
//                 <button
//                   onClick={logout}
//                   className="flex items-center space-x-2 px-4 py-2 text-sm text-red-300 hover:bg-red-900/20 w-full text-left"
//                 >
//                   <Icons.Logout />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const LoginForm = () => {
//   const [credentials, setCredentials] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await login(credentials.email, credentials.password);
//     } catch (error) {
//       console.error('Login failed:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
//       <div className="max-w-md w-full mx-4">
//         <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-slate-700">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
//               <Icons.Shield />
//             </div>
//             <h2 className="text-3xl font-bold text-white mb-2">Vehicle Registration</h2>
//             <p className="text-slate-300">Vehicle Registration System</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-slate-300 mb-2">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 value={credentials.email}
//                 onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
//                 className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 placeholder="officer@trafficpolice.gov"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-300 mb-2">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 value={credentials.password}
//                 onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//                 className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
//             >
//               {loading ? 'Signing In...' : 'Sign In'}
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-xs text-slate-400">
//               Demo credentials: officer@trafficpolice.gov / any password
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Dashboard = () => {
//   const stats = [
//     { label: 'Total Vehicles', value: '1,234', change: '+12%', color: 'blue' },
//     { label: 'Valid Registrations', value: '1,156', change: '+8%', color: 'green' },
//     { label: 'Expired Controls', value: '78', change: '-5%', color: 'red' },
//     { label: 'Recent Scans', value: '145', change: '+23%', color: 'purple' }
//   ];

//   return (
//     <div className="space-y-8">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-white">Dashboard</h1>
//           <p className="text-slate-400 mt-2">Overview of vehicle registration system</p>
//         </div>
//         <div className="text-sm text-slate-400">
//           Last updated: {new Date().toLocaleString()}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <div key={index} className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-slate-400 text-sm">{stat.label}</p>
//                 <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
//               </div>
//               <div className={`text-sm px-2 py-1 rounded-full ${
//                 stat.change.startsWith('+') ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
//               }`}>
//                 {stat.change}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-slate-700">
//           <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
//           <div className="space-y-4">
//             {mockVehicles.slice(0, 3).map((vehicle) => (
//               <div key={vehicle.id} className="flex items-center space-x-4 p-3 bg-slate-700/30 rounded-lg">
//                 <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
//                   <Icons.Car />
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-white font-medium">{vehicle.numberPlate}</p>
//                   <p className="text-slate-400 text-sm">{vehicle.registration.ownerName}</p>
//                 </div>
//                 <div className={`px-2 py-1 rounded-full text-xs ${
//                   vehicle.technicalControls[0].status === 'VALID' 
//                     ? 'bg-green-900/30 text-green-400' 
//                     : 'bg-red-900/30 text-red-400'
//                 }`}>
//                   {vehicle.technicalControls[0].status}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-slate-700">
//           <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
//           <div className="grid grid-cols-2 gap-4">
//             <button className="flex flex-col items-center space-y-2 p-4 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-all border border-blue-600/30">
//               <Icons.QR />
//               <span className="text-white text-sm">Scan QR Code</span>
//             </button>
//             <button className="flex flex-col items-center space-y-2 p-4 bg-green-600/20 hover:bg-green-600/30 rounded-lg transition-all border border-green-600/30">
//               <Icons.Plus />
//               <span className="text-white text-sm">Add Vehicle</span>
//             </button>
//             <button className="flex flex-col items-center space-y-2 p-4 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-all border border-purple-600/30">
//               <Icons.Search />
//               <span className="text-white text-sm">Search Records</span>
//             </button>
//             <button className="flex flex-col items-center space-y-2 p-4 bg-orange-600/20 hover:bg-orange-600/30 rounded-lg transition-all border border-orange-600/30">
//               <Icons.AlertTriangle />
//               <span className="text-white text-sm">View Alerts</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const VehicleList = () => {
//   const [vehicles, setVehicles] = useState(mockVehicles);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedVehicle, setSelectedVehicle] = useState(null);
//   const [showAddForm, setShowAddForm] = useState(false);

//   const filteredVehicles = vehicles.filter(vehicle =>
//     vehicle.numberPlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     vehicle.registration.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const VehicleModal = ({ vehicle, onClose }) => (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-slate-700">
//           <div className="flex items-center justify-between">
//             <h3 className="text-xl font-semibold text-white">Vehicle Details</h3>
//             <button
//               onClick={onClose}
//               className="text-slate-400 hover:text-white transition-colors"
//             >
//               <Icons.X />
//             </button>
//           </div>
//         </div>
        
//         <div className="p-6 space-y-6">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="text-slate-400 text-sm">Number Plate</label>
//               <p className="text-white font-semibold text-lg">{vehicle.numberPlate}</p>
//             </div>
//             <div>
//               <label className="text-slate-400 text-sm">Owner Name</label>
//               <p className="text-white">{vehicle.registration.ownerName}</p>
//             </div>
//             <div>
//               <label className="text-slate-400 text-sm">Vehicle Make</label>
//               <p className="text-white">{vehicle.registration.vehicleMake}</p>
//             </div>
//             <div>
//               <label className="text-slate-400 text-sm">Vehicle Model</label>
//               <p className="text-white">{vehicle.registration.vehicleModel}</p>
//             </div>
//             <div>
//               <label className="text-slate-400 text-sm">Year</label>
//               <p className="text-white">{vehicle.registration.yearManufactured}</p>
//             </div>
//             <div>
//               <label className="text-slate-400 text-sm">Technical Control</label>
//               <div className={`inline-flex px-2 py-1 rounded-full text-xs ${
//                 vehicle.technicalControls[0].status === 'VALID' 
//                   ? 'bg-green-900/30 text-green-400' 
//                   : 'bg-red-900/30 text-red-400'
//               }`}>
//                 {vehicle.technicalControls[0].status}
//               </div>
//             </div>
//           </div>
          
//           <div>
//             <label className="text-slate-400 text-sm">License Information</label>
//             <div className="mt-2 p-4 bg-slate-700/30 rounded-lg">
//               <p className="text-white">Holder: {vehicle.drivingLicenses[0].license.holderName}</p>
//               <p className="text-slate-400 text-sm">Class: {vehicle.drivingLicenses[0].license.licenseClass}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-white">Vehicle Records</h1>
//           <p className="text-slate-400 mt-2">Manage vehicle registrations and information</p>
//         </div>
//         <button
//           onClick={() => setShowAddForm(true)}
//           className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
//         >
//           <Icons.Plus />
//           <span>Add Vehicle</span>
//         </button>
//       </div>

//       <div className="flex items-center space-x-4">
//         <div className="relative flex-1 max-w-md">
//           <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
//           <input
//             type="text"
//             placeholder="Search by plate number or owner name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>
//       </div>

//       <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-slate-700/50">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
//                   Number Plate
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
//                   Owner
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
//                   Vehicle
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-700">
//               {filteredVehicles.map((vehicle) => (
//                 <tr key={vehicle.id} className="hover:bg-slate-700/30 transition-colors">
//                   <td className="px-6 py-4">
//                     <div className="flex items-center">
//                       <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
//                         <Icons.Car />
//                       </div>
//                       <div>
//                         <div className="text-white font-medium">{vehicle.numberPlate}</div>
//                         <div className="text-slate-400 text-sm">{vehicle.registration.yearManufactured}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-white">{vehicle.registration.ownerName}</div>
//                     <div className="text-slate-400 text-sm">
//                       License: {vehicle.drivingLicenses[0].license.licenseClass}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-white">{vehicle.registration.vehicleMake}</div>
//                     <div className="text-slate-400 text-sm">{vehicle.registration.vehicleModel}</div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
//                       vehicle.technicalControls[0].status === 'VALID' 
//                         ? 'bg-green-900/30 text-green-400 border border-green-600/30' 
//                         : 'bg-red-900/30 text-red-400 border border-red-600/30'
//                     }`}>
//                       {vehicle.technicalControls[0].status}
//                     </div>
//                     <div className="text-slate-400 text-xs mt-1">
//                       Expires: {vehicle.technicalControls[0].expiryDate}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => setSelectedVehicle(vehicle)}
//                         className="text-blue-400 hover:text-blue-300 transition-colors"
//                         title="View Details"
//                       >
//                         <Icons.Eye />
//                       </button>
//                       <button
//                         className="text-green-400 hover:text-green-300 transition-colors"
//                         title="Edit"
//                       >
//                         <Icons.Edit />
//                       </button>
//                       <button
//                         className="text-purple-400 hover:text-purple-300 transition-colors"
//                         title="Generate QR"
//                       >
//                         <Icons.QR />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {selectedVehicle && (
//         <VehicleModal 
//           vehicle={selectedVehicle} 
//           onClose={() => setSelectedVehicle(null)} 
//         />
//       )}
//     </div>
//   );
// };

// const QRScanner = () => {
//   const [isScanning, setIsScanning] = useState(false);
//   const [scannedData, setScannedData] = useState(null);
//   const [manualInput, setManualInput] = useState('');

//   const handleScan = () => {
//     setIsScanning(true);
//     // Simulate scanning delay
//     setTimeout(() => {
//       const mockScannedVehicle = mockVehicles[0];
//       setScannedData(mockScannedVehicle);
//       setIsScanning(false);
//     }, 2000);
//   };

//   const handleManualLookup = () => {
//     if (manualInput.trim()) {
//       const vehicle = mockVehicles.find(v => 
//         v.numberPlate.toLowerCase().includes(manualInput.toLowerCase())
//       );
//       setScannedData(vehicle || null);
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-3xl font-bold text-white">QR Code Scanner</h1>
//         <p className="text-slate-400 mt-2">Scan vehicle QR codes or search manually</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Scanner Section */}
//         <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-slate-700">
//           <h3 className="text-xl font-semibold text-white mb-4">QR Code Scanner</h3>
          
//           <div className="space-y-4">
//             <div className="aspect-square bg-slate-700/50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-600">
//               {isScanning ? (
//                 <div className="text-center">
//                   <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
//                   <p className="text-white">Scanning...</p>
//                 </div>
//               ) : (
//                 <div className="text-center">
//                   <Icons.Camera className="w-16 h-16 text-slate-400 mx-auto mb-4" />
//                   <p className="text-slate-400">Position QR code in camera view</p>
//                 </div>
//               )}
//             </div>
            
//             <button
//               onClick={handleScan}
//               disabled={isScanning}
//               className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg transition-all"
//             >
//               {isScanning ? 'Scanning...' : 'Start Camera Scan'}
//             </button>
//           </div>
//         </div>

//         {/* Manual Input Section */}
//         <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-slate-700">
//           <h3 className="text-xl font-semibold text-white mb-4">Manual Lookup</h3>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-slate-300 mb-2">
//                 Number Plate
//               </label>
//               <input
//                 type="text"
//                 value={manualInput}
//                 onChange={(e) => setManualInput(e.target.value)}
//                 placeholder="Enter number plate (e.g., RAD123A)"
//                 className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
            
//             <button
//               onClick={handleManualLookup}
//               className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-all"
//             >
//               Search Vehicle
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Results Section */}
//       {scannedData && (
//         <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-slate-700">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-xl font-semibold text-white">Vehicle Information</h3>
//             <div className={`px-3 py-1 rounded-full text-sm font-medium ${
//               scannedData.technicalControls[0].status === 'VALID' 
//                 ? 'bg-green-900/30 text-green-400 border border-green-600/30' 
//                 : 'bg-red-900/30 text-red-400 border border-red-600/30'
//             }`}>
//               {scannedData.technicalControls[0].status}
//             </div>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="space-y-2">
//               <label className="text-slate-400 text-sm">Number Plate</label>
//               <p className="text-white font-semibold text-lg">{scannedData.numberPlate}</p>
//             </div>
//             <div className="space-y-2">
//               <label className="text-slate-400 text-sm">Owner</label>
//               <p className="text-white">{scannedData.registration.ownerName}</p>
//             </div>
//             <div className="space-y-2">
//               <label className="text-slate-400 text-sm">Vehicle</label>
//               <p className="text-white">{scannedData.registration.vehicleMake} {scannedData.registration.vehicleModel}</p>
//             </div>
//             <div className="space-y-2">
//               <label className="text-slate-400 text-sm">Year</label>
//               <p className="text-white">{scannedData.registration.yearManufactured}</p>
//             </div>
//             <div className="space-y-2">
//               <label className="text-slate-400 text-sm">Control Expiry</label>
//               <p className="text-white">{scannedData.technicalControls[0].expiryDate}</p>
//             </div>
//             <div className="space-y-2">
//               <label className="text-slate-400 text-sm">License Class</label>
//               <p className="text-white">{scannedData.drivingLicenses[0].license.licenseClass}</p>
//             </div>
//           </div>
          
//           <div className="mt-6 flex space-x-4">
//             <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all">
//               <Icons.Eye />
//               <span>View Full Details</span>
//             </button>
//             <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all">
//               <Icons.Check />
//               <span>Mark as Checked</span>
//             </button>
//           </div>
//         </div>
//       )}

//       {scannedData === null && manualInput && (
//         <div className="bg-red-900/20 border border-red-600/30 rounded-xl p-6">
//           <div className="flex items-center space-x-3">
//             <Icons.AlertTriangle className="text-red-400" />
//             <div>
//               <h4 className="text-red-400 font-medium">Vehicle Not Found</h4>
//               <p className="text-red-300 text-sm">No vehicle found with plate number: {manualInput}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const Profile = () => {
//   const { user } = useAuth();
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: user?.firstName || '',
//     lastName: user?.lastName || '',
//     email: user?.email || '',
//     badgeNumber: user?.badgeNumber || ''
//   });

//   const handleSave = () => {
//     // Here you would typically save to a backend
//     setIsEditing(false);
//   };

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
//         <p className="text-slate-400 mt-2">Manage your account information and preferences</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Profile Info */}
//         <div className="lg:col-span-2">
//           <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-slate-700">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-semibold text-white">Personal Information</h3>
//               <button
//                 onClick={() => setIsEditing(!isEditing)}
//                 className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
//               >
//                 <Icons.Edit />
//                 <span>{isEditing ? 'Cancel' : 'Edit'}</span>
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-slate-300 mb-2">
//                   First Name
//                 </label>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     value={formData.firstName}
//                     onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//                     className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 ) : (
//                   <p className="text-white">{user?.firstName}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-300 mb-2">
//                   Last Name
//                 </label>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     value={formData.lastName}
//                     onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//                     className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 ) : (
//                   <p className="text-white">{user?.lastName}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-300 mb-2">
//                   Email Address
//                 </label>
//                 {isEditing ? (
//                   <input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 ) : (
//                   <p className="text-white">{user?.email}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-300 mb-2">
//                   Badge Number
//                 </label>
//                 <p className="text-white">{user?.badgeNumber}</p>
//                 <p className="text-slate-400 text-xs mt-1">Badge number cannot be changed</p>
//               </div>
//             </div>

//             {isEditing && (
//               <div className="mt-6 flex space-x-4">
//                 <button
//                   onClick={handleSave}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
//                 >
//                   Save Changes
//                 </button>
//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-all"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="space-y-6">
//           <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-slate-700">
//             <h3 className="text-lg font-semibold text-white mb-4">Activity Summary</h3>
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-slate-400">Vehicles Processed</span>
//                 <span className="text-white font-medium">142</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-slate-400">QR Codes Scanned</span>
//                 <span className="text-white font-medium">89</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-slate-400">Reports Generated</span>
//                 <span className="text-white font-medium">23</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-slate-700">
//             <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
//             <div className="space-y-3">
//               <div className="flex items-center space-x-3">
//                 <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                 <span className="text-slate-300 text-sm">Database Connected</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                 <span className="text-slate-300 text-sm">API Services Online</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
//                 <span className="text-slate-300 text-sm">Sync Pending</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const LoadingScreen = () => (
//   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
//     <div className="text-center">
//       <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
//         <Icons.Shield />
//       </div>
//       <div className="animate-pulse">
//         <div className="w-32 h-4 bg-slate-700 rounded mx-auto mb-2"></div>
//         <div className="w-24 h-3 bg-slate-800 rounded mx-auto"></div>
//       </div>
//     </div>
//   </div>
// );

// // Main App Component
// const App = () => {
//   const { user, loading } = useAuth();
//   const [currentPage, setCurrentPage] = useState('dashboard');

//   if (loading) {
//     return <LoadingScreen />;
//   }

//   if (!user) {
//     return <LoginForm />;
//   }

//   const renderPage = () => {
//     switch (currentPage) {
//       case 'dashboard':
//         return <Dashboard />;
//       case 'vehicles':
//         return <VehicleList />;
//       case 'qr-scanner':
//         return <QRScanner />;
//       case 'profile':
//         return <Profile />;
//       default:
//         return <Dashboard />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
//       <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {renderPage()}
//       </main>
//     </div>
//   );
// };

// export default App;


// import React, { useState } from 'react';
// import { AuthProvider } from './components/Auth/AuthContext';
// import LoadingScreen from './components/Auth/LoadingScreen';
// import LoginForm from './components/Auth/LoginForm';
// import DashboardPage from './pages/DashboardPage';
// import VehiclesPage from './pages/VehiclesPage';
// import QRScannerPage from './pages/QRScannerPage';
// import ProfilePage from './pages/ProfilePage';
// import Header from './components/Common/Header';
// import Sidebar from './components/Common/Sidebar';
// import { useAuth } from './components/Auth/AuthContext';

// const AppContent = () => {
//   const { user, loading, login } = useAuth(); // Add login function here
//   const [currentPage, setCurrentPage] = useState('dashboard');
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   if (loading) {
//     return <LoadingScreen />;
//   }

//   if (!user) {
//     // Pass the login function to LoginForm
//     return <LoginForm onLogin={login} />;
//   }

//   const renderPage = () => {
//     switch (currentPage) {
//       case 'dashboard': return <DashboardPage />;
//       case 'vehicles': return <VehiclesPage setCurrentPage={setCurrentPage} />;
//       case 'qr-scanner': return <QRScannerPage />;
//       case 'profile': return <ProfilePage />;
//       default: return <DashboardPage />;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50 font-sans">
//       <Sidebar 
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//         isOpen={sidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//       />
      
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header 
//           onMenuClick={() => setSidebarOpen(true)}
//           currentPage={currentPage}
//           setCurrentPage={setCurrentPage}
//         />
        
//         <main className="flex-1 overflow-y-auto bg-white">
//           <div className="w-full mx-auto">
//             {renderPage()}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   );
// };

// export default App;

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
      </Routes>
    );
  }

  // For protected routes, check authentication
  if (!user) {
    return <LoginForm onLogin={login} />;
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
