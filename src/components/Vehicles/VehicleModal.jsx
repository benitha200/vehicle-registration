import React from 'react';
import { X, Car, User, Calendar, Shield, FileText, Download, Edit3, QrCode } from 'lucide-react';

const VehicleModal = ({ vehicle, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/20 animate-in slide-in-from-bottom-4 duration-300">
        {/* Modern Header with Gradient */}
        <div className="relative bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Car className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">{vehicle.numberPlate}</h2>
                <p className="text-blue-100 text-lg">
                  {vehicle.registration.vehicleMake} {vehicle.registration.vehicleModel}
                </p>
                <p className="text-blue-200 text-sm">Year: {vehicle.registration.yearManufactured}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-200 group"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
          
          {/* Status Badge */}
          <div className="mt-4 flex items-center space-x-3">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border ${
              vehicle.technicalControls[0].status === 'VALID' 
                ? 'bg-green-500/20 text-green-100 border-green-400/30' 
                : 'bg-red-500/20 text-red-100 border-red-400/30'
            }`}>
              <Shield className="w-4 h-4 inline mr-2" />
              {vehicle.technicalControls[0].status}
            </span>
            <span className="text-blue-100 text-sm">
              Expires: {vehicle.technicalControls[0].expiryDate}
            </span>
          </div>
        </div>
        
        {/* Content with Modern Cards */}
        <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Owner Information Card */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200/50 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Owner Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Full Name</label>
                <p className="text-slate-900 font-medium bg-white/70 rounded-lg px-3 py-2 border border-slate-200">
                  {vehicle.registration.ownerName}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">License Class</label>
                <p className="text-slate-900 font-medium bg-white/70 rounded-lg px-3 py-2 border border-slate-200">
                  Class {vehicle.drivingLicenses[0].license.licenseClass}
                </p>
              </div>
            </div>
          </div>

          {/* Vehicle Specifications Card */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200/50 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Car className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Vehicle Specifications</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Make', value: vehicle.registration.vehicleMake, icon: '🚗' },
                { label: 'Model', value: vehicle.registration.vehicleModel, icon: '⚙️' },
                { label: 'Year', value: vehicle.registration.yearManufactured, icon: '📅' }
              ].map(({ label, value, icon }) => (
                <div key={label} className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 flex items-center space-x-1">
                    <span>{icon}</span>
                    <span>{label}</span>
                  </label>
                  <p className="text-slate-900 font-medium bg-white/70 rounded-lg px-3 py-2 border border-slate-200">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Control Card */}
          <div className="bg-gradient-to-br from-slate-50 to-green-50 rounded-2xl p-6 border border-slate-200/50 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Technical Control Status</h3>
            </div>
            <div className="bg-white/70 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">Current Status</p>
                  <p className={`font-semibold text-lg ${
                    vehicle.technicalControls[0].status === 'VALID' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {vehicle.technicalControls[0].status}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-slate-600 text-sm">Expiry Date</p>
                  <p className="font-medium text-slate-800">{vehicle.technicalControls[0].expiryDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* License Information Card */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200/50 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Driving License Details</h3>
            </div>
            <div className="bg-white/70 rounded-xl p-4 border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-600 text-sm">License Holder</p>
                  <p className="font-medium text-slate-800">{vehicle.drivingLicenses[0].license.holderName}</p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm">License Class</p>
                  <p className="font-medium text-slate-800">Class {vehicle.drivingLicenses[0].license.licenseClass}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Footer with Action Buttons */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 border-t border-slate-200/50 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>Last updated: Today</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-slate-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Close
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-slate-700 transition-all duration-200 shadow-sm hover:shadow-md">
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 border border-blue-300 rounded-xl text-blue-700 transition-all duration-200 shadow-sm hover:shadow-md">
                <QrCode className="w-4 h-4" />
                <span>QR Code</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 rounded-xl text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleModal;