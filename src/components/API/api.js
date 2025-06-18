// api.js
const API_BASE_URL = 'http://localhost:3000/api';

export const fetchVehicles = async (page = 1, limit = 10, search = '') => {
  const response = await fetch(`${API_BASE_URL}/vehicles?page=${page}&limit=${limit}&search=${search}`);
  if (!response.ok) throw new Error('Failed to fetch vehicles');
  return await response.json();
};

export const fetchVehicleById = async (identifier) => {
  const response = await fetch(`${API_BASE_URL}/vehicles/${identifier}`);
  if (!response.ok) throw new Error('Failed to fetch vehicle');
  return await response.json();
};

export const addVehicle = async (vehicleData) => {
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

export const addTechnicalControl = async (vehicleId, controlData) => {
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

export const addLicense = async (vehicleId, licenseData) => {
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