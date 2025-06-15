import React, { useState, useEffect } from 'react';
import { PlusIcon, AlertTriangle, SearchIcon, QrCode, CarIcon, ArrowLeft, Camera, FileText, Users, Settings } from "lucide-react";
import VehicleForm from '../components/Vehicles/VehicleForm';
import { useNavigate } from 'react-router-dom';

// API Service
const API_BASE_URL = 'http://localhost:3000/api';

const fetchVehicles = async (page = 1, limit = 10, search = '') => {
    const response = await fetch(`${API_BASE_URL}/vehicles?page=${page}&limit=${limit}&search=${search}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    });
    if (!response.ok) throw new Error('Failed to fetch vehicles');
    return await response.json();
};

const fetchVehicleById = async (identifier) => {
    const response = await fetch(`${API_BASE_URL}/vehicles/${identifier}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    if (!response.ok) throw new Error('Failed to fetch vehicle');
    return await response.json();
};

const addVehicle = async (vehicleData) => {
    const response = await fetch(`${API_BASE_URL}/vehicles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(vehicleData)
    });
    if (!response.ok) throw new Error('Failed to add vehicle');
    return await response.json();
};

const addTechnicalControl = async (vehicleId, controlData) => {
    const response = await fetch(`${API_BASE_URL}/vehicles/${vehicleId}/technical-controls`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(controlData)
    });
    if (!response.ok) throw new Error('Failed to add technical control');
    return await response.json();
};

const addLicense = async (vehicleId, licenseData) => {
    const response = await fetch(`${API_BASE_URL}/vehicles/${vehicleId}/licenses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(licenseData)
    });
    if (!response.ok) throw new Error('Failed to add license');
    return await response.json();
};

// QR Scanner Page Component
const QRScannerPage = ({ onBack }) => {
    const [isScanning, setIsScanning] = useState(false);
    const [scannedData, setScannedData] = useState(null);
    const [error, setError] = useState(null);

    const handleStartScan = async () => {
        setIsScanning(true);
        setError(null);

        try {
            // In a real app, you would integrate with a QR scanner library
            // For demo purposes, we'll simulate scanning and then fetch the vehicle data
            const plateNumber = 'RAD456B'; // Simulated scanned plate
            const vehicle = await fetchVehicleById(plateNumber);

            setScannedData({
                plateNumber: vehicle.numberPlate,
                vehicleType: `${vehicle.registration?.vehicleMake || ''} ${vehicle.registration?.vehicleModel || ''}`.trim(),
                status: vehicle.technicalControls?.[0]?.status === 'VALID' ? 'Valid Registration' : 'Registration Issue'
            });
        } catch (err) {
            setError('Failed to fetch vehicle data. Please try again.');
            console.error('Scan failed:', err);
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Dashboard
                </button>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <QrCode className="w-8 h-8 text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">QR Code Scanner</h2>
                        <p className="text-gray-600">Scan vehicle QR codes to quickly access registration information</p>
                    </div>

                    <div className="max-w-md mx-auto">
                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
                                <p className="text-red-600 font-medium">{error}</p>
                            </div>
                        )}

                        {!isScanning && !scannedData && (
                            <div className="text-center">
                                <div className="w-64 h-64 border-4 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-auto mb-6">
                                    <Camera className="w-16 h-16 text-gray-400" />
                                </div>
                                <button
                                    onClick={handleStartScan}
                                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                                >
                                    Start Scanning
                                </button>
                            </div>
                        )}

                        {isScanning && (
                            <div className="text-center">
                                <div className="w-64 h-64 bg-blue-50 border-4 border-blue-200 rounded-lg flex items-center justify-center mx-auto mb-6">
                                    <div className="animate-pulse">
                                        <QrCode className="w-16 h-16 text-blue-600" />
                                    </div>
                                </div>
                                <p className="text-blue-600 font-medium">Scanning in progress...</p>
                            </div>
                        )}

                        {scannedData && (
                            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                                <div className="text-center mb-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <CarIcon className="w-6 h-6 text-green-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-green-800">Scan Successful!</h3>
                                </div>
                                <div className="space-y-2">
                                    <p><span className="font-medium">Plate Number:</span> {scannedData.plateNumber}</p>
                                    <p><span className="font-medium">Vehicle:</span> {scannedData.vehicleType}</p>
                                    <p><span className="font-medium">Status:</span> {scannedData.status}</p>
                                </div>
                                <button
                                    onClick={() => setScannedData(null)}
                                    className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Scan Another
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Add Vehicle Page Component
const AddVehiclePage = ({ onBack, onAddVehicle }) => {
    const [formData, setFormData] = useState({
        numberPlate: '',
        ownerName: '',
        ownerId: '',
        vehicleMake: '',
        vehicleModel: '',
        yearManufactured: '',
        engineNumber: '',
        chassisNumber: '',
        registrationDate: new Date().toISOString().split('T')[0]
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        const newErrors = {};
        if (!formData.numberPlate) newErrors.numberPlate = 'Number plate is required';
        if (!formData.ownerName) newErrors.ownerName = 'Owner name is required';
        if (!formData.vehicleMake) newErrors.vehicleMake = 'Vehicle make is required';
        if (!formData.vehicleModel) newErrors.vehicleModel = 'Vehicle model is required';
        if (!formData.yearManufactured) newErrors.yearManufactured = 'Year is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await onAddVehicle({
                numberPlate: formData.numberPlate,
                ownerName: formData.ownerName,
                ownerId: formData.ownerId,
                vehicleMake: formData.vehicleMake,
                vehicleModel: formData.vehicleModel,
                yearManufactured: parseInt(formData.yearManufactured),
                engineNumber: formData.engineNumber,
                chassisNumber: formData.chassisNumber,
                registrationDate: new Date(formData.registrationDate).toISOString()
            });
        } catch (error) {
            alert('Failed to add vehicle: ' + error.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-green-600 hover:text-green-800 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Dashboard
                </button>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <PlusIcon className="w-8 h-8 text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Add New Vehicle</h2>
                        <p className="text-gray-600">Register a new vehicle in the system</p>
                    </div>

                    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Plate Number*</label>
                                <input
                                    type="text"
                                    name="numberPlate"
                                    value={formData.numberPlate}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border ${errors.numberPlate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                                    placeholder="RAD123A"
                                />
                                {errors.numberPlate && <p className="mt-1 text-sm text-red-600">{errors.numberPlate}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name*</label>
                                <input
                                    type="text"
                                    name="ownerName"
                                    value={formData.ownerName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border ${errors.ownerName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                                    placeholder="John Doe"
                                />
                                {errors.ownerName && <p className="mt-1 text-sm text-red-600">{errors.ownerName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Owner ID</label>
                                <input
                                    type="text"
                                    name="ownerId"
                                    value={formData.ownerId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="1198012345123456"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Make*</label>
                                <input
                                    type="text"
                                    name="vehicleMake"
                                    value={formData.vehicleMake}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border ${errors.vehicleMake ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                                    placeholder="Toyota"
                                />
                                {errors.vehicleMake && <p className="mt-1 text-sm text-red-600">{errors.vehicleMake}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Model*</label>
                                <input
                                    type="text"
                                    name="vehicleModel"
                                    value={formData.vehicleModel}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border ${errors.vehicleModel ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                                    placeholder="Corolla"
                                />
                                {errors.vehicleModel && <p className="mt-1 text-sm text-red-600">{errors.vehicleModel}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Year Manufactured*</label>
                                <input
                                    type="number"
                                    name="yearManufactured"
                                    value={formData.yearManufactured}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border ${errors.yearManufactured ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                                    placeholder="2022"
                                    min="1900"
                                    max={new Date().getFullYear()}
                                />
                                {errors.yearManufactured && <p className="mt-1 text-sm text-red-600">{errors.yearManufactured}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Engine Number</label>
                                <input
                                    type="text"
                                    name="engineNumber"
                                    value={formData.engineNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="1NXBR32E75Z456789"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Chassis Number</label>
                                <input
                                    type="text"
                                    name="chassisNumber"
                                    value={formData.chassisNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="JTDBT4K3CE123456"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Registration Date</label>
                                <input
                                    type="date"
                                    name="registrationDate"
                                    value={formData.registrationDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-6">
                            <button
                                type="button"
                                onClick={onBack}
                                className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-lg"
                            >
                                Add Vehicle
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Search Records Page Component
const SearchRecordsPage = ({ onBack, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        try {
            const results = await onSearch(searchQuery);
            setSearchResults(results);
        } catch (error) {
            console.error('Search failed:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Dashboard
                </button>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <SearchIcon className="w-8 h-8 text-purple-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Search Records</h2>
                        <p className="text-gray-600">Find vehicles by plate number, owner name, or vehicle make</p>
                    </div>

                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Enter plate number, owner name, or vehicle make..."
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                required
                            />
                            <button
                                type="submit"
                                disabled={isSearching}
                                className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-lg disabled:opacity-50"
                            >
                                {isSearching ? 'Searching...' : 'Search'}
                            </button>
                        </div>
                    </form>

                    {searchResults.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900">Search Results ({searchResults.length})</h3>
                            {searchResults.map((vehicle) => (
                                <div key={vehicle.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-lg font-semibold text-gray-900">{vehicle.numberPlate}</h4>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${vehicle.technicalControls?.[0]?.status === 'VALID'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {vehicle.technicalControls?.[0]?.status || 'UNKNOWN'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Owner</p>
                                            <p className="font-medium">{vehicle.registration?.ownerName || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Vehicle</p>
                                            <p className="font-medium">
                                                {vehicle.registration?.vehicleMake || 'N/A'} {vehicle.registration?.vehicleModel || ''}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Year</p>
                                            <p className="font-medium">{vehicle.registration?.yearManufactured || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Control Expires</p>
                                            <p className="font-medium">
                                                {vehicle.technicalControls?.[0]?.expiryDate || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Alerts Page Component
const AlertsPage = ({ onBack }) => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                // In a real app, you would fetch alerts from an API endpoint
                // For now, we'll simulate fetching alerts
                setTimeout(() => {
                    setAlerts([
                        { id: 1, type: 'EXPIRED', message: 'Technical control expired for RAD456B', plate: 'RAD456B', date: '2024-06-01' },
                        { id: 2, type: 'EXPIRING', message: 'Technical control expiring soon for RAD789C', plate: 'RAD789C', date: '2025-03-15' },
                        { id: 3, type: 'MISSING', message: 'Missing license information for RAD999D', plate: 'RAD999D', date: '2024-01-01' }
                    ]);
                    setLoading(false);
                }, 500);
            } catch (error) {
                console.error('Failed to fetch alerts:', error);
                setLoading(false);
            }
        };

        fetchAlerts();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-6">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-orange-600 hover:text-orange-800 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Dashboard
                </button>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-8 h-8 text-orange-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">System Alerts</h2>
                        <p className="text-gray-600">Monitor important notifications and system warnings</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {alerts.map((alert) => (
                                <div key={alert.id} className={`rounded-lg p-6 border-l-4 ${alert.type === 'EXPIRED' ? 'bg-red-50 border-red-500' :
                                        alert.type === 'EXPIRING' ? 'bg-yellow-50 border-yellow-500' :
                                            'bg-blue-50 border-blue-500'
                                    }`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <AlertTriangle className={`w-5 h-5 ${alert.type === 'EXPIRED' ? 'text-red-600' :
                                                        alert.type === 'EXPIRING' ? 'text-yellow-600' :
                                                            'text-blue-600'
                                                    }`} />
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${alert.type === 'EXPIRED' ? 'bg-red-100 text-red-800' :
                                                        alert.type === 'EXPIRING' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {alert.type}
                                                </span>
                                            </div>
                                            <p className="text-gray-900 font-medium mb-1">{alert.message}</p>
                                            <p className="text-sm text-gray-500">Vehicle: {alert.plate} • Date: {alert.date}</p>
                                        </div>
                                        <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">
                                            Resolve
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Vehicle List Component
const VehicleList = ({ vehicles, loading }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Vehicles</h3>
            {vehicles.length === 0 ? (
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
                    <p className="text-gray-600">No vehicles found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {vehicles.map((vehicle) => (
                        <div key={vehicle.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <CarIcon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">{vehicle.numberPlate}</h4>
                                        <p className="text-gray-600">
                                            {vehicle.registration?.vehicleMake || 'Unknown'} {vehicle.registration?.vehicleModel || ''}
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-4 py-2 rounded-full text-sm font-medium ${vehicle.technicalControls?.[0]?.status === 'VALID'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                    {vehicle.technicalControls?.[0]?.status || 'UNKNOWN'}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Owner</p>
                                    <p className="font-medium text-gray-900">{vehicle.registration?.ownerName || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Year</p>
                                    <p className="font-medium text-gray-900">{vehicle.registration?.yearManufactured || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">License Class</p>
                                    <p className="font-medium text-gray-900">
                                        {vehicle.drivingLicenses?.[0]?.license?.licenseClass || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Control Expires</p>
                                    <p className="font-medium text-gray-900">
                                        {vehicle.technicalControls?.[0]?.expiryDate || 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Main Dashboard Component
const VehiclesPage = () => { // Remove setCurrentPage prop
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState([
        { label: 'Total Vehicles', value: '0', change: '+0%', color: 'blue', icon: CarIcon },
        { label: 'Valid Registrations', value: '0', change: '+0%', color: 'green', icon: FileText },
        { label: 'Expired Controls', value: '0', change: '+0%', color: 'red', icon: AlertTriangle },
        { label: 'Recent Scans', value: '0', change: '+0%', color: 'purple', icon: QrCode }
    ]);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await fetchVehicles(1, 10);
                setVehicles(data.vehicles);

                // Update stats based on real data
                const totalVehicles = data.pagination.total;
                const validRegistrations = data.vehicles.filter(v =>
                    v.technicalControls?.some(tc => tc.status === 'VALID')
                ).length;
                const expiredControls = data.vehicles.filter(v =>
                    v.technicalControls?.some(tc => tc.status === 'EXPIRED')
                ).length;

                setStats([
                    { ...stats[0], value: totalVehicles.toString() },
                    { ...stats[1], value: validRegistrations.toString() },
                    { ...stats[2], value: expiredControls.toString() },
                    stats[3] // Keep recent scans as is for now
                ]);
            } catch (error) {
                console.error('Error loading vehicles:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (currentPage === 'qr-scanner') {
        return <QRScannerPage onBack={() => setCurrentPage('dashboard')} />;
    }

    if (currentPage === 'add-vehicle') {
        return <VehicleForm
            onBack={() => setCurrentPage('dashboard')}
            onAddVehicle={async (newVehicle) => {
                try {
                    await addVehicle(newVehicle);
                    // Refresh the vehicle list
                    const data = await fetchVehicles(1, 10);
                    setVehicles(data.vehicles);
                    setCurrentPage('dashboard');
                } catch (error) {
                    alert('Failed to add vehicle: ' + error.message);
                }
            }}
        />;
    }

    if (currentPage === 'search-records') {
        return <SearchRecordsPage
            onBack={() => setCurrentPage('dashboard')}
            onSearch={async (query) => {
                try {
                    const data = await fetchVehicles(1, 10, query);
                    return data.vehicles;
                } catch (error) {
                    console.error('Search failed:', error);
                    return [];
                }
            }}
        />;
    }

    if (currentPage === 'alerts') {
        return <AlertsPage onBack={() => setCurrentPage('dashboard')} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                            Vehicle Registry
                        </h1>
                        <p className="text-gray-600 mt-2 text-lg">Comprehensive vehicle registration management system</p>
                    </div>
                    <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-200">
                        <p className="text-sm text-gray-500">Last updated</p>
                        <p className="font-medium text-gray-900">{new Date().toLocaleString()}</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color === 'blue' ? 'bg-blue-100' :
                                            stat.color === 'green' ? 'bg-green-100' :
                                                stat.color === 'red' ? 'bg-red-100' :
                                                    'bg-purple-100'
                                        }`}>
                                        <IconComponent className={`w-6 h-6 ${stat.color === 'blue' ? 'text-blue-600' :
                                                stat.color === 'green' ? 'text-green-600' :
                                                    stat.color === 'red' ? 'text-red-600' :
                                                        'text-purple-600'
                                            }`} />
                                    </div>
                                    <div className={`text-sm px-3 py-1 rounded-full font-semibold ${stat.change.startsWith('+')
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                        {stat.change}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Vehicle List */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <VehicleList vehicles={vehicles} loading={loading} />
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                        <div className="space-y-4">
                            <button
                                onClick={() => setCurrentPage('qr-scanner')}
                                className="w-full flex items-center gap-4 p-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                                    <QrCode className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold">Scan QR Code</p>
                                    <p className="text-blue-100 text-sm">Quick vehicle lookup</p>
                                </div>
                            </button>

                            <button
                                onClick={() => setCurrentPage('add-vehicle')}
                                className="w-full flex items-center gap-4 p-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                                    <PlusIcon className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold">Add Vehicle</p>
                                    <p className="text-green-100 text-sm">Register new vehicle</p>
                                </div>
                            </button>

                            <button
                                onClick={() => setCurrentPage('search-records')}
                                className="w-full flex items-center gap-4 p-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                                    <SearchIcon className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold">Search Records</p>
                                    <p className="text-purple-100 text-sm">Find vehicle data</p>
                                </div>
                            </button>

                            <button
                                onClick={() => setCurrentPage('alerts')}
                                className="w-full flex items-center gap-4 p-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold">View Alerts</p>
                                    <p className="text-orange-100 text-sm">System notifications</p>
                                </div>
                            </button>
                        </div>

                        {/* Additional Quick Stats - Now with real data */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-4">Today's Activity</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 text-sm">Total Vehicles</span>
                                    <span className="font-semibold text-green-600">{stats[0].value}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 text-sm">Valid Registrations</span>
                                    <span className="font-semibold text-blue-600">{stats[1].value}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 text-sm">Expired Controls</span>
                                    <span className="font-semibold text-orange-600">{stats[2].value}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Section - Now with real data */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent System Activity</h3>
                    <div className="space-y-4">
                        {vehicles.slice(0, 3).map((vehicle, index) => (
                            <div
                                key={vehicle.id}
                                className={`flex items-center gap-4 p-4 rounded-lg border ${index === 0 ? 'bg-green-50 border-green-200' :
                                        index === 1 ? 'bg-blue-50 border-blue-200' :
                                            'bg-orange-50 border-orange-200'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index === 0 ? 'bg-green-100' :
                                        index === 1 ? 'bg-blue-100' :
                                            'bg-orange-100'
                                    }`}>
                                    {index === 0 ? (
                                        <PlusIcon className={`w-5 h-5 ${index === 0 ? 'text-green-600' : ''}`} />
                                    ) : index === 1 ? (
                                        <QrCode className={`w-5 h-5 ${index === 1 ? 'text-blue-600' : ''}`} />
                                    ) : (
                                        <AlertTriangle className={`w-5 h-5 ${index === 2 ? 'text-orange-600' : ''}`} />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">
                                        {index === 0 ? 'New vehicle registered' :
                                            index === 1 ? 'QR code scanned' :
                                                'Technical control expiring'}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {vehicle.numberPlate} - {vehicle.registration?.vehicleMake} {vehicle.registration?.vehicleModel} •
                                        {index === 0 ? ` Registered on ${new Date(vehicle.createdAt).toLocaleDateString()}` :
                                            index === 1 ? ' Verified recently' :
                                                ` Expires on ${vehicle.technicalControls?.[0]?.expiryDate || 'N/A'}`}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehiclesPage;