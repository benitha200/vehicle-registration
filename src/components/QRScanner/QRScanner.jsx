import { EyeIcon } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { CheckCheck } from "lucide-react";
import { CameraIcon } from "lucide-react";

const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [manualInput, setManualInput] = useState('');

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      const mockScannedVehicle = mockVehicles[0];
      setScannedData(mockScannedVehicle);
      setIsScanning(false);
    }, 2000);
  };

  const handleManualLookup = () => {
    if (manualInput.trim()) {
      const vehicle = mockVehicles.find(v => 
        v.numberPlate.toLowerCase().includes(manualInput.toLowerCase())
      );
      setScannedData(vehicle || null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">QR Code Scanner</h1>
        <p className="text-slate-400 mt-2">Scan vehicle QR codes or search manually</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Scanner Section */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4">QR Code Scanner</h3>
          
          <div className="space-y-4">
            <div className="aspect-square bg-slate-700/50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-600">
              {isScanning ? (
                <div className="text-center">
                  <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-white">Scanning...</p>
                </div>
              ) : (
                <div className="text-center">
                  <CameraIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-400">Position QR code in camera view</p>
                </div>
              )}
            </div>
            
            <button
              onClick={handleScan}
              disabled={isScanning}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg transition-all"
            >
              {isScanning ? 'Scanning...' : 'Start Camera Scan'}
            </button>
          </div>
        </div>

        {/* Manual Input Section */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4">Manual Lookup</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Number Plate
              </label>
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="Enter number plate (e.g., RAD123A)"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={handleManualLookup}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-all"
            >
              Search Vehicle
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {scannedData && (
        <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Vehicle Information</h3>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              scannedData.technicalControls[0].status === 'VALID' 
                ? 'bg-green-900/30 text-green-400 border border-green-600/30' 
                : 'bg-red-900/30 text-red-400 border border-red-600/30'
            }`}>
              {scannedData.technicalControls[0].status}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-slate-400 text-sm">Number Plate</label>
              <p className="text-white font-semibold text-lg">{scannedData.numberPlate}</p>
            </div>
            <div className="space-y-2">
              <label className="text-slate-400 text-sm">Owner</label>
              <p className="text-white">{scannedData.registration.ownerName}</p>
            </div>
            <div className="space-y-2">
              <label className="text-slate-400 text-sm">Vehicle</label>
              <p className="text-white">{scannedData.registration.vehicleMake} {scannedData.registration.vehicleModel}</p>
            </div>
            <div className="space-y-2">
              <label className="text-slate-400 text-sm">Year</label>
              <p className="text-white">{scannedData.registration.yearManufactured}</p>
            </div>
            <div className="space-y-2">
              <label className="text-slate-400 text-sm">Control Expiry</label>
              <p className="text-white">{scannedData.technicalControls[0].expiryDate}</p>
            </div>
            <div className="space-y-2">
              <label className="text-slate-400 text-sm">License Class</label>
              <p className="text-white">{scannedData.drivingLicenses[0].license.licenseClass}</p>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all">
              <EyeIcon />
              <span>View Full Details</span>
            </button>
            <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all">
              <CheckCheck />
              <span>Mark as Checked</span>
            </button>
          </div>
        </div>
      )}

      {scannedData === null && manualInput && (
        <div className="bg-red-900/20 border border-red-600/30 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="text-red-400" />
            <div>
              <h4 className="text-red-400 font-medium">Vehicle Not Found</h4>
              <p className="text-red-300 text-sm">No vehicle found with plate number: {manualInput}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRScanner