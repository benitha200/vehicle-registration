// import { Bell, User, Menu, ChevronDown, LogOut, Settings, UserCircle } from 'lucide-react';
// import React, { useState, useRef, useEffect } from 'react';
// import { useAuth } from '../Auth/AuthContext';

// const Header = ({ onMenuClick, currentPage, setCurrentPage }) => {
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [notifications, setNotifications] = useState([
//     { id: 1, message: 'Nouveau véhicule enregistré', time: '2 min ago', unread: true },
//     { id: 2, message: 'Rapport mensuel disponible', time: '1h ago', unread: true },
//     { id: 3, message: 'Mise à jour système terminée', time: '3h ago', unread: true }
//   ]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const { user, logout } = useAuth();
//   const userMenuRef = useRef(null);
//   const notificationRef = useRef(null);

//   const pageTitles = {
//     dashboard: 'Tableau de Bord',
//     vehicles: 'Registre des Véhicules',
//     'qr-scanner': 'Scanner QR Code',
//     profile: 'Paramètres du Profil'
//   };

//   // Get unread notification count
//   const unreadCount = notifications.filter(n => n.unread).length;

//   // Close menus when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
//         setShowUserMenu(false);
//       }
//       if (notificationRef.current && !notificationRef.current.contains(event.target)) {
//         setShowNotifications(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleNotificationClick = () => {
//     setShowNotifications(!showNotifications);
//   };

//   const markNotificationAsRead = (id) => {
//     setNotifications(prev => 
//       prev.map(notification => 
//         notification.id === id 
//           ? { ...notification, unread: false }
//           : notification
//       )
//     );
//   };

//   const markAllAsRead = () => {
//     setNotifications(prev => 
//       prev.map(notification => ({ ...notification, unread: false }))
//     );
//   };

//   const handleProfileClick = () => {
//     setCurrentPage('profile');
//     setShowUserMenu(false);
//   };

//   const handleSettingsClick = () => {
//     // You can add a settings page or modal here
//     console.log('Settings clicked');
//     setShowUserMenu(false);
//   };

//   const handleLogout = () => {
//     logout();
//     setShowUserMenu(false);
//   };

//   // Generate user initials for avatar
//   const getUserInitials = () => {
//     if (user?.firstName && user?.lastName) {
//       return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
//     }
//     return user?.email ? user.email[0].toUpperCase() : 'U';
//   };

//   return (
//     <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-sm z-50 sticky top-0">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Left side - Menu and Title */}
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={onMenuClick}
//               className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-500/20"
//             >
//               <Menu className="w-5 h-5" />
//             </button>
            
//             <div className="flex items-center space-x-3">
//               <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full hidden sm:block"></div>
//               <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 tracking-tight">
//                 {pageTitles[currentPage]}
//               </h1>
//             </div>
//           </div>

//           {/* Right side - Notifications and User Menu */}
//           <div className="flex items-center space-x-3">
//             {/* Notifications */}
//             <div className="relative" ref={notificationRef}>
//               <button 
//                 onClick={handleNotificationClick}
//                 className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
//               >
//                 <Bell className="w-5 h-5" />
//                 {unreadCount > 0 && (
//                   <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-500 rounded-full border-2 border-white animate-pulse">
//                     {unreadCount > 9 ? '9+' : unreadCount}
//                   </span>
//                 )}
//               </button>

//               {/* Notification Dropdown */}
//               {showNotifications && (
//                 <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200/50 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
//                   <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
//                     <h3 className="font-medium text-slate-800">Notifications</h3>
//                     {unreadCount > 0 && (
//                       <button 
//                         onClick={markAllAsRead}
//                         className="text-xs text-blue-600 hover:text-blue-700 font-medium"
//                       >
//                         Marquer tout lu
//                       </button>
//                     )}
//                   </div>
//                   <div className="max-h-64 overflow-y-auto">
//                     {notifications.length > 0 ? (
//                       notifications.map((notification) => (
//                         <div 
//                           key={notification.id}
//                           className={`px-4 py-3 hover:bg-slate-50 cursor-pointer border-l-2 ${
//                             notification.unread ? 'border-blue-500 bg-blue-50/30' : 'border-transparent'
//                           }`}
//                           onClick={() => markNotificationAsRead(notification.id)}
//                         >
//                           <div className="flex items-start space-x-3">
//                             <div className={`w-2 h-2 rounded-full mt-2 ${
//                               notification.unread ? 'bg-blue-500' : 'bg-gray-300'
//                             }`}></div>
//                             <div className="flex-1">
//                               <p className={`text-sm ${
//                                 notification.unread ? 'font-medium text-slate-900' : 'text-slate-700'
//                               }`}>
//                                 {notification.message}
//                               </p>
//                               <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
//                             </div>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="px-4 py-8 text-center text-slate-500">
//                         <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
//                         <p className="text-sm">Aucune notification</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* User Menu */}
//             <div className="relative" ref={userMenuRef}>
//               <button
//                 onClick={() => setShowUserMenu(!showUserMenu)}
//                 className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 border border-transparent hover:border-slate-200"
//               >
//                 {/* User Avatar */}
//                 <div className="relative">
//                   <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-md text-sm font-medium">
//                     {getUserInitials()}
//                   </div>
//                   <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
//                 </div>

//                 {/* User Info */}
//                 <div className="hidden md:block text-left">
//                   <div className="text-sm font-medium text-slate-800 leading-tight">
//                     {user?.firstName || 'Prénom'} {user?.lastName || 'Nom'}
//                   </div>
//                   <div className="text-xs text-slate-500 leading-tight">
//                     {user?.badgeNumber ? `Badge: ${user.badgeNumber}` : user?.role || 'Agent'}
//                   </div>
//                 </div>

//                 <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
//               </button>

//               {/* Dropdown Menu */}
//               {showUserMenu && (
//                 <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200/50 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
//                   {/* User Info Header */}
//                   <div className="px-4 py-3 border-b border-gray-100">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
//                         {getUserInitials()}
//                       </div>
//                       <div>
//                         <div className="font-medium text-slate-800 text-sm">
//                           {user?.firstName || 'Prénom'} {user?.lastName || 'Nom'}
//                         </div>
//                         <div className="text-xs text-slate-500">
//                           {user?.email || `Badge: ${user?.badgeNumber || 'N/A'}`}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Menu Items */}
//                   <div className="py-1">
//                     <button 
//                       onClick={handleProfileClick}
//                       className="flex items-center w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors duration-150"
//                     >
//                       <UserCircle className="w-4 h-4 mr-3 text-slate-400" />
//                       Votre Profil
//                     </button>
//                     <button 
//                       onClick={handleSettingsClick}
//                       className="flex items-center w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors duration-150"
//                     >
//                       <Settings className="w-4 h-4 mr-3 text-slate-400" />
//                       Paramètres
//                     </button>
//                   </div>

//                   {/* Sign Out */}
//                   <div className="border-t border-gray-100 py-1">
//                     <button 
//                       onClick={handleLogout}
//                       className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150"
//                     >
//                       <LogOut className="w-4 h-4 mr-3" />
//                       Se Déconnecter
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '../Auth/AuthContext';

const Header = ({ onMenuClick }) => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Get page title from pathname
  const getPageTitle = (pathname) => {
    const page = pathname.split('/')[1] || 'dashboard';
    switch (page) {
      case 'dashboard': return 'Dashboard';
      case 'vehicles': return 'Vehicles';
      case 'qr-scanner': return 'QR Scanner';
      case 'profile': return 'Profile';
      default: return 'Dashboard';
    }
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
          
          <h1 className="text-2xl font-semibold text-gray-800">
            {pageTitle}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm"
            />
          </div>
          
          {/* Notifications */}
          <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>
          
          {/* User profile */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">
              {user?.name || 'User'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;