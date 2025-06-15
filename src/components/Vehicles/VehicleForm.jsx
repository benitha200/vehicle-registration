import { PlusIcon, ArrowLeft, ClipboardCheck, CreditCard, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

const VehicleForm = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [vehicleId, setVehicleId] = useState(null);
  
  const [formData, setFormData] = useState({ 
    numberPlate: '',
    ownerName: '',
    ownerId: '',
    vehicleMake: '',
    vehicleModel: '',
    yearManufactured: '',
    engineNumber: '',
    chassisNumber: '',
    registrationDate: new Date().toISOString().slice(0, 16)
  });

  const [technicalControlData, setTechnicalControlData] = useState({
    inspectionDate: new Date().toISOString().slice(0, 16),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 16),
    inspectorName: '',
    status: 'VALID',
    notes: ''
  });

  const [licenseData, setLicenseData] = useState({
    licenseNumber: '',
    holderName: '',
    issueDate: new Date().toISOString().slice(0, 16),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().slice(0, 16),
    licenseClass: 'B',
    isPrimaryDriver: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [completedSteps, setCompletedSteps] = useState([]);

  const getAuthToken = () => {
    return localStorage.getItem('authToken') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJPRkZJQ0VSIiwiaWF0IjoxNzQ5Njc1OTg1LCJleHAiOjE3NDk3MDQ3ODV9.ZtQ3869ltMnel-vK13WRuPpJ5PtMDSfKJtAaIVfvTXE';
  };

  const handleVehicleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const token = getAuthToken();
      
      const response = await fetch('http://localhost:3000/api/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          yearManufactured: parseInt(formData.yearManufactured),
          registrationDate: new Date(formData.registrationDate).toISOString()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add vehicle');
      }

      const result = await response.json();
      console.log('Vehicle added successfully:', result);
      
      setVehicleId(result.id);
      setCompletedSteps([...completedSteps, 1]);
      setCurrentStep(2);
      
    } catch (err) {
      console.error('Error adding vehicle:', err);
      setError(err.message || 'Failed to add vehicle. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTechnicalControlSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const token = getAuthToken();
      
      const response = await fetch(`http://localhost:3000/api/vehicles/${vehicleId}/technical-controls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json'
        },
        body: JSON.stringify({
          ...technicalControlData,
          inspectionDate: new Date(technicalControlData.inspectionDate).toISOString(),
          expiryDate: new Date(technicalControlData.expiryDate).toISOString()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add technical control');
      }

      const result = await response.json();
      console.log('Technical control added successfully:', result);
      
      setCompletedSteps([...completedSteps, 2]);
      setCurrentStep(3);
      
    } catch (err) {
      console.error('Error adding technical control:', err);
      setError(err.message || 'Failed to add technical control. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLicenseSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const token = getAuthToken();
      
      const response = await fetch(`http://localhost:3000/api/vehicles/${vehicleId}/licenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json'
        },
        body: JSON.stringify({
          ...licenseData,
          issueDate: new Date(licenseData.issueDate).toISOString(),
          expiryDate: new Date(licenseData.expiryDate).toISOString()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add license');
      }

      const result = await response.json();
      console.log('License added successfully:', result);
      
      setCompletedSteps([...completedSteps, 3]);
      alert('Vehicle registration completed successfully with technical control and license!');
      onBack();
      
    } catch (err) {
      console.error('Error adding license:', err);
      setError(err.message || 'Failed to add license. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (setter) => (e) => {
    setter(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const skipStep = () => {
    if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      alert('Vehicle registration completed successfully!');
      onBack();
    }
  };

  const steps = [
    { number: 1, title: 'Vehicle Details', icon: PlusIcon },
    { number: 2, title: 'Technical Control', icon: ClipboardCheck },
    { number: 3, title: 'License Information', icon: CreditCard }
  ];

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
        
        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = completedSteps.includes(step.number);
              const isCurrent = currentStep === step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                    isCompleted ? 'bg-green-500 text-white' : 
                    isCurrent ? 'bg-blue-500 text-white' : 
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      isCompleted ? 'text-green-600' : 
                      isCurrent ? 'text-blue-600' : 
                      'text-gray-500'
                    }`}>
                      Step {step.number}
                    </p>
                    <p className={`text-xs ${
                      isCompleted ? 'text-green-500' : 
                      isCurrent ? 'text-blue-500' : 
                      'text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-4 ${
                      completedSteps.includes(step.number) ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Step 1: Vehicle Details */}
          {currentStep === 1 && (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PlusIcon className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Add New Vehicle</h2>
                <p className="text-gray-600">Register a new vehicle in the system</p>
              </div>

              <form onSubmit={handleVehicleSubmit} className="max-w-2xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number Plate</label>
                    <input
                      type="text"
                      name="numberPlate"
                      value={formData.numberPlate}
                      onChange={handleChange(setFormData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="RAB123A"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name</label>
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange(setFormData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Owner ID</label>
                    <input
                      type="text"
                      name="ownerId"
                      value={formData.ownerId}
                      onChange={handleChange(setFormData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="1198012345123456"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Make</label>
                    <input
                      type="text"
                      name="vehicleMake"
                      value={formData.vehicleMake}
                      onChange={handleChange(setFormData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Toyota"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Model</label>
                    <input
                      type="text"
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleChange(setFormData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Corolla"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year Manufactured</label>
                    <input
                      type="number"
                      name="yearManufactured"
                      value={formData.yearManufactured}
                      onChange={handleChange(setFormData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="2022"
                      min="1900"
                      max="2025"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Engine Number</label>
                    <input
                      type="text"
                      name="engineNumber"
                      value={formData.engineNumber}
                      onChange={handleChange(setFormData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="1NXBR32E75Z456789"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Chassis Number</label>
                    <input
                      type="text"
                      name="chassisNumber"
                      value={formData.chassisNumber}
                      onChange={handleChange(setFormData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="JTDBT4K3CE123456"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Registration Date</label>
                    <input
                      type="datetime-local"
                      name="registrationDate"
                      value={formData.registrationDate}
                      onChange={handleChange(setFormData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={onBack}
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Adding Vehicle...' : 'Add Vehicle & Continue'}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Step 2: Technical Control */}
          {currentStep === 2 && (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClipboardCheck className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Technical Control Inspection</h2>
                <p className="text-gray-600">Add technical control inspection details</p>
              </div>

              <form onSubmit={handleTechnicalControlSubmit} className="max-w-2xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Inspection Date</label>
                    <input
                      type="datetime-local"
                      name="inspectionDate"
                      value={technicalControlData.inspectionDate}
                      onChange={handleChange(setTechnicalControlData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="datetime-local"
                      name="expiryDate"
                      value={technicalControlData.expiryDate}
                      onChange={handleChange(setTechnicalControlData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Inspector Name</label>
                    <input
                      type="text"
                      name="inspectorName"
                      value={technicalControlData.inspectorName}
                      onChange={handleChange(setTechnicalControlData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Inspector Smith"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      name="status"
                      value={technicalControlData.status}
                      onChange={handleChange(setTechnicalControlData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="VALID">Valid</option>
                      <option value="EXPIRED">Expired</option>
                      <option value="INVALID">Invalid</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <textarea
                      name="notes"
                      value={technicalControlData.notes}
                      onChange={handleChange(setTechnicalControlData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="All systems functioning properly. Minor wear on brake pads noted."
                      rows="3"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={skipStep}
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Skip This Step
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Adding Technical Control...' : 'Add Technical Control & Continue'}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Step 3: License Information */}
          {currentStep === 3 && (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Driving License Information</h2>
                <p className="text-gray-600">Associate a driving license with this vehicle</p>
              </div>

              <form onSubmit={handleLicenseSubmit} className="max-w-2xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={licenseData.licenseNumber}
                      onChange={handleChange(setLicenseData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="DL123456789"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Holder Name</label>
                    <input
                      type="text"
                      name="holderName"
                      value={licenseData.holderName}
                      onChange={handleChange(setLicenseData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date</label>
                    <input
                      type="datetime-local"
                      name="issueDate"
                      value={licenseData.issueDate}
                      onChange={handleChange(setLicenseData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="datetime-local"
                      name="expiryDate"
                      value={licenseData.expiryDate}
                      onChange={handleChange(setLicenseData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">License Class</label>
                    <select
                      name="licenseClass"
                      value={licenseData.licenseClass}
                      onChange={handleChange(setLicenseData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="A">Class A - Motorcycles</option>
                      <option value="B">Class B - Cars</option>
                      <option value="C">Class C - Trucks</option>
                      <option value="D">Class D - Buses</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isPrimaryDriver"
                      checked={licenseData.isPrimaryDriver}
                      onChange={(e) => setLicenseData(prev => ({ ...prev, isPrimaryDriver: e.target.checked }))}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">Primary Driver</label>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={skipStep}
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Skip & Complete
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Adding License...' : 'Complete Registration'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleForm;