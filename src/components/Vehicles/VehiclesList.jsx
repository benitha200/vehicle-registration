import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, QrCode, Car, Filter, Download } from 'lucide-react';
import VehicleModal from './VehicleModal';
import { CarIcon } from 'lucide-react';
import { FilterIcon } from 'lucide-react';
import { EyeIcon } from 'lucide-react';
import { Edit2Icon } from 'lucide-react';
import { QrCodeIcon } from 'lucide-react';
import { PlusIcon } from 'lucide-react';

const VehicleList = ({ vehicles }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.numberPlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.registration.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Modern Header Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <CarIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Vehicle Registry
                  </h1>
                  <p className="text-slate-600 text-sm">
                    Comprehensive vehicle management system
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-slate-500">
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>{filteredVehicles.length} vehicles</span>
                </span>
                <span>•</span>
                <span>Last updated: Today</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md border border-slate-200">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Plus className="w-4 h-4" />
                <span>Add Vehicle</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filter Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search by plate number or owner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm text-slate-900 placeholder-slate-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <button className="flex items-center space-x-2 bg-white/80 hover:bg-white text-slate-700 px-4 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md border border-slate-200">
              <FilterIcon className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Modern Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedVehicle(vehicle)}
            >
              {/* Vehicle Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl flex items-center justify-center group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
                    <CarIcon className="w-6 h-6 text-slate-600 group-hover:text-blue-600 transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{vehicle.numberPlate}</h3>
                    <p className="text-sm text-slate-500">{vehicle.registration.yearManufactured}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  vehicle.technicalControls[0].status === 'VALID' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {vehicle.technicalControls[0].status}
                </span>
              </div>

              {/* Vehicle Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Owner</span>
                  <span className="text-sm font-medium text-slate-800 truncate ml-2">{vehicle.registration.ownerName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Vehicle</span>
                  <span className="text-sm font-medium text-slate-800 truncate ml-2">
                    {vehicle.registration.vehicleMake} {vehicle.registration.vehicleModel}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">License Class</span>
                  <span className="text-sm font-medium text-slate-800">
                    Class {vehicle.drivingLicenses[0].license.licenseClass}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVehicle(vehicle);
                    }}
                    className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    title="View Details"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-slate-600 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-all duration-200"
                    title="Edit"
                  >
                    <Edit2Icon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                    title="Generate QR"
                  >
                    <QrCodeIcon className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to view
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredVehicles.length === 0 && (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-white/20 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CarIcon className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No vehicles found</h3>
            <p className="text-slate-600 mb-6">Try adjusting your search criteria or add a new vehicle to get started.</p>
            <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl mx-auto">
              <PlusIcon className="w-4 h-4" />
              <span>Add First Vehicle</span>
            </button>
          </div>
        )}

        {/* Vehicle Modal */}
        {selectedVehicle && (
          <VehicleModal 
            vehicle={selectedVehicle} 
            onClose={() => setSelectedVehicle(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default VehicleList;