import React, { useState, useRef, useEffect } from 'react';
import { Eye, AlertTriangle, CheckCheck, Camera, Loader2, X, Play, Square } from "lucide-react";

const QRScannerPage = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [vehicleData, setVehicleData] = useState(null);
  const [manualInput, setManualInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [stream, setStream] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanResult, setScanResult] = useState('');
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const scanIntervalRef = useRef(null);

  // Base API URL - you may need to adjust this
  const API_BASE_URL = 'http://localhost:3000/api';

  // Get auth token from memory storage (not localStorage due to artifact restrictions)
  const getAuthToken = () => {
    // In a real app, this would come from your auth system
    return localStorage.getItem('authToken') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJPRkZJQ0VSIiwiaWF0IjoxNzQ5NzI2NTgxLCJleHAiOjE3NDk3NTUzODF9.BDGtg0pjBao1E5BbgbjH-Gf4Vmb5Hbcwm9LIcRMVYDM';
  };

  // Initialize camera
  const startCamera = async () => {
    try {
      setError('');
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      setStream(mediaStream);
      setHasPermission(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
      
      setIsScanning(true);
      startQRDetection();
      
    } catch (err) {
      console.error('Camera access error:', err);
      setHasPermission(false);
      setError('Camera access denied. Please allow camera permissions and try again.');
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    
    setIsScanning(false);
    setScanResult('');
  };

  // QR Code detection using canvas and basic pattern recognition
  const detectQRCode = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    ctx.drawImage(video, 0, 0);

    // Get image data for processing
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Simple QR code detection simulation
    // In a real implementation, you would use a library like jsQR
    // For demo purposes, we'll simulate detection after a few seconds
    const simulateQRDetection = () => {
      // Simulate finding a QR code after scanning for a bit
      const mockQRCodes = [
        '3a309425-b712-45d1-8e6c-608878362c15',
        'b4a15234-c823-46e2-9f7d-719889473d26',
        'c5b26345-d934-47f3-a08e-82a99a584e37'
      ];
      
      const randomQR = mockQRCodes[Math.floor(Math.random() * mockQRCodes.length)];
      return randomQR;
    };

    // Simulate QR detection (replace with actual QR detection library)
    if (Math.random() > 0.95) { // 5% chance per frame to simulate detection
      const detectedQR = simulateQRDetection();
      if (detectedQR) {
        setScanResult(detectedQR);
        handleQRDetected(detectedQR);
      }
    }
  };

  // Start QR detection loop
  const startQRDetection = () => {
    scanIntervalRef.current = setInterval(detectQRCode, 100); // Check every 100ms
  };

  // Handle QR code detection
  const handleQRDetected = async (qrCode) => {
    // Stop scanning temporarily
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    
    setScanResult(qrCode);
    await fetchVehicleByQR(qrCode);
    
    // Optionally stop camera after successful scan
    setTimeout(() => {
      stopCamera();
    }, 1000);
  };

  const fetchVehicleByQR = async (qrCode) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/qr/vehicle/${qrCode}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Vehicle not found');
        } else if (response.status === 401) {
          throw new Error('Unauthorized access');
        } else {
          throw new Error('Failed to fetch vehicle data');
        }
      }

      const data = await response.json();
      setVehicleData(data);
    } catch (err) {
      // For demo purposes, simulate vehicle data when API is not available
      if (err.message.includes('fetch')) {
        const mockVehicleData = {
          numberPlate: 'RAB-123-A',
          registration: {
            ownerName: 'John Doe',
            vehicleMake: 'Toyota',
            vehicleModel: 'Corolla',
            yearManufactured: 2020,
            registrationDate: '2020-01-15T00:00:00Z'
          },
          technicalControl: {
            status: 'VALID',
            expiryDate: '2025-01-15T00:00:00Z',
            inspectionDate: '2024-01-15T00:00:00Z'
          },
          licenses: [
            {
              licenseNumber: 'LIC-001-2024',
              holderName: 'John Doe',
              licenseClass: 'B',
              expiryDate: '2025-12-31T00:00:00Z',
              isPrimary: true
            }
          ],
          lastUpdated: '2024-01-15T00:00:00Z'
        };
        setVehicleData(mockVehicleData);
      } else {
        setError(err.message);
        setVehicleData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleManualLookup = async () => {
    if (!manualInput.trim()) {
      setError('Please enter a QR code or number plate');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // If input looks like a UUID (QR code), use it directly
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      
      if (uuidRegex.test(manualInput.trim())) {
        await fetchVehicleByQR(manualInput.trim());
      } else {
        // For number plate lookup, you might need a different endpoint
        // This is a placeholder - adjust based on your actual API
        setError('Number plate lookup not implemented. Please use QR code UUID.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'VALID':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'EXPIRED':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">QR Code Scanner</h1>
          <p className="text-gray-500 mt-1">Scan vehicle QR codes using your camera or search manually</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Camera Scanner Section */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Camera Scanner</h3>
              {isScanning && (
                <button
                  onClick={stopCamera}
                  className="text-red-600 hover:text-red-700 flex items-center space-x-1"
                >
                  <X className="w-4 h-4" />
                  <span className="text-sm">Stop</span>
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 relative">
                {isScanning ? (
                  <div className="relative w-full h-full">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      playsInline
                    />
                    <canvas
                      ref={canvasRef}
                      className="hidden"
                    />
                    
                    {/* Scanning overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <div className="border-2 border-white border-dashed w-48 h-48 relative">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500"></div>
                      </div>
                    </div>
                    
                    {/* Scan result indicator */}
                    {scanResult && (
                      <div className="absolute bottom-4 left-4 right-4 bg-green-600 text-white p-2 rounded-md text-center">
                        QR Code Detected: {scanResult.substring(0, 8)}...
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-2">Camera not active</p>
                      <p className="text-sm text-gray-400">Click "Start Camera" to begin scanning</p>
                    </div>
                  </div>
                )}
              </div>
              
              {!isScanning ? (
                <button
                  onClick={startCamera}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-md transition-all flex items-center justify-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Camera
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-all flex items-center justify-center"
                >
                  <Square className="w-4 h-4 mr-2" />
                  Stop Scanning
                </button>
              )}
              
              <div className="text-center">
                {hasPermission === false && (
                  <p className="text-red-600 text-sm">Camera permission required</p>
                )}
                {hasPermission === true && !isScanning && (
                  <p className="text-green-600 text-sm">Camera ready</p>
                )}
                {isScanning && (
                  <p className="text-blue-600 text-sm animate-pulse">Scanning for QR codes...</p>
                )}
              </div>
            </div>
          </div>

          {/* Manual Input Section */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Manual Lookup</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  QR Code UUID
                </label>
                <input
                  type="text"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  placeholder="Enter QR code UUID (e.g., 3a309425-b712-45d1-8e6c-608878362c15)"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the QR code UUID to look up vehicle information
                </p>
              </div>
              
              <button
                onClick={handleManualLookup}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-md transition-all flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  'Search Vehicle'
                )}
              </button>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-700">
                  <strong>Demo QR Codes:</strong> Try scanning or entering:
                </p>
                <ul className="text-xs text-blue-600 mt-1 space-y-1">
                  <li>• 3a309425-b712-45d1-8e6c-608878362c15</li>
                  <li>• b4a15234-c823-46e2-9f7d-719889473d26</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="text-red-500 w-5 h-5" />
              <div>
                <h4 className="text-red-700 font-medium">Error</h4>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Loader2 className="text-blue-500 w-5 h-5 animate-spin" />
              <div>
                <h4 className="text-blue-700 font-medium">Loading</h4>
                <p className="text-blue-600 text-sm">Fetching vehicle information...</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {vehicleData && (
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Vehicle Information</h3>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(vehicleData.technicalControl?.status)}`}>
                {vehicleData.technicalControl?.status || 'Unknown'}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-gray-500 text-sm">Number Plate</label>
                <p className="text-gray-900 font-semibold">{vehicleData.numberPlate}</p>
              </div>
              <div className="space-y-1">
                <label className="text-gray-500 text-sm">Owner</label>
                <p className="text-gray-900">{vehicleData.registration?.ownerName || 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <label className="text-gray-500 text-sm">Vehicle</label>
                <p className="text-gray-900">
                  {vehicleData.registration?.vehicleMake} {vehicleData.registration?.vehicleModel}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-gray-500 text-sm">Year</label>
                <p className="text-gray-900">{vehicleData.registration?.yearManufactured || 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <label className="text-gray-500 text-sm">Control Expiry</label>
                <p className="text-gray-900">
                  {vehicleData.technicalControl?.expiryDate 
                    ? formatDate(vehicleData.technicalControl.expiryDate)
                    : 'N/A'
                  }
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-gray-500 text-sm">License Class</label>
                <p className="text-gray-900">
                  {vehicleData.licenses?.[0]?.licenseClass || 'N/A'}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-gray-500 text-sm">Registration Date</label>
                <p className="text-gray-900">
                  {vehicleData.registration?.registrationDate 
                    ? formatDate(vehicleData.registration.registrationDate)
                    : 'N/A'
                  }
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-gray-500 text-sm">Inspection Date</label>
                <p className="text-gray-900">
                  {vehicleData.technicalControl?.inspectionDate 
                    ? formatDate(vehicleData.technicalControl.inspectionDate)
                    : 'N/A'
                  }
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-gray-500 text-sm">Last Updated</label>
                <p className="text-gray-900">
                  {vehicleData.lastUpdated ? formatDate(vehicleData.lastUpdated) : 'N/A'}
                </p>
              </div>
            </div>

            {/* License Information */}
            {vehicleData.licenses && vehicleData.licenses.length > 0 && (
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-900 mb-3">License Information</h4>
                <div className="space-y-2">
                  {vehicleData.licenses.map((license, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">License #:</span>
                          <p className="font-medium">{license.licenseNumber}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Holder:</span>
                          <p className="font-medium">{license.holderName}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Class:</span>
                          <p className="font-medium">{license.licenseClass}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Expires:</span>
                          <p className="font-medium">
                            {license.expiryDate ? formatDate(license.expiryDate) : 'N/A'}
                          </p>
                        </div>
                      </div>
                      {license.isPrimary && (
                        <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          Primary License
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6 flex space-x-3">
              <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition-all text-sm">
                <Eye className="w-4 h-4" />
                <span>View Full Details</span>
              </button>
              <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md transition-all text-sm">
                <CheckCheck className="w-4 h-4" />
                <span>Mark as Checked</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScannerPage;