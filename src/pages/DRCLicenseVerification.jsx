import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, User, Calendar, MapPin, Car, AlertTriangle, RefreshCw } from 'lucide-react';

const DRCLicenseVerification = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [verificationStatus, setVerificationStatus] = useState('verifying');
    
    // Sample license data (in real implementation, this would come from URL params or API)
    const licenseData = {
        licenseNumber: 'AAA25NZSKN',
        holderName: 'JANVIER MAOMBI PATAOLI',
        dateOfBirth: '10/08/1985',
        placeOfBirth: 'BUKAVU',
        nationality: 'CONGOLAISE',
        address: '53, AV. DE LA MISSION C/GOMA',
        issueDate: '15/03/2025',
        expiryDate: '15/03/2028',
        categories: ['A', 'B', 'C', 'D'],
        issuedBy: 'GOUVERNORAT DE PROVINCE NORD-KIVU',
        issuedAt: 'GOMA-NORD KIVU',
        status: 'VALID'
    };

    const categories = {
        'A': { label: '2 ROUES', icon: '🏍️' },
        'B': { label: 'PARTICULIER 3,5 TON MAX / 9+D PAX MAX', icon: '🚗' },
        'C': { label: 'CAMION 3,5 TON+', icon: '🚛' },
        'D': { label: 'BUS 8 PAX +', icon: '🚌' },
        'E': { label: 'SPECIAL', icon: '🚜' }
    };

    useEffect(() => {
        // Simulate verification process
        const timer = setTimeout(() => {
            setIsLoading(false);
            setVerificationStatus('verified');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'VALID':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'EXPIRED':
                return 'text-red-600 bg-red-50 border-red-200';
            case 'SUSPENDED':
                return 'text-orange-600 bg-orange-50 border-orange-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const isExpired = () => {
        const expiryDate = new Date(licenseData.expiryDate.split('/').reverse().join('-'));
        return expiryDate < new Date();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Vérification en cours...</h2>
                        <p className="text-gray-600">Validation des informations du permis de conduire</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-3">
                        <Shield className="w-8 h-8 text-blue-600" />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Système de Vérification des Permis de Conduire
                            </h1>
                            <p className="text-sm text-gray-600">République Démocratique du Congo</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Verification Status */}
                <div className="bg-white rounded-lg shadow-lg mb-6 overflow-hidden">
                    <div className={`px-6 py-4 ${licenseData.status === 'VALID' && !isExpired() ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                        <div className="flex items-center gap-3">
                            {licenseData.status === 'VALID' && !isExpired() ? (
                                <CheckCircle className="w-6 h-6" />
                            ) : (
                                <AlertTriangle className="w-6 h-6" />
                            )}
                            <div>
                                <h2 className="text-xl font-bold">
                                    {licenseData.status === 'VALID' && !isExpired() ? 'Permis Valide' : 'Permis Non Valide'}
                                </h2>
                                <p className="text-sm opacity-90">
                                    {licenseData.status === 'VALID' && !isExpired() 
                                        ? 'Ce permis de conduire est authentique et valide' 
                                        : isExpired() 
                                            ? 'Ce permis de conduire a expiré'
                                            : 'Ce permis de conduire n\'est pas valide'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* License Details */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Informations Personnelles
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-500">Numéro de Permis</span>
                                        <span className="text-lg font-mono font-bold text-gray-900">{licenseData.licenseNumber}</span>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-500">Nom Complet</span>
                                        <span className="text-base font-semibold text-gray-900">{licenseData.holderName}</span>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-500">Date de Naissance</span>
                                            <span className="text-base text-gray-900">{licenseData.dateOfBirth}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-500">Lieu de Naissance</span>
                                            <span className="text-base text-gray-900">{licenseData.placeOfBirth}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-500">Nationalité</span>
                                        <span className="text-base text-gray-900">{licenseData.nationality}</span>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-500">Adresse</span>
                                        <span className="text-base text-gray-900">{licenseData.address}</span>
                                    </div>
                                </div>
                            </div>

                            {/* License Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    Informations du Permis
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className={`flex flex-col p-3 rounded-lg border ${getStatusColor(licenseData.status)}`}>
                                        <span className="text-sm font-medium">Statut</span>
                                        <span className="text-base font-semibold">{licenseData.status}</span>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-500">Date de Délivrance</span>
                                            <span className="text-base text-gray-900">{licenseData.issueDate}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-500">Date d'Expiration</span>
                                            <span className={`text-base font-semibold ${isExpired() ? 'text-red-600' : 'text-gray-900'}`}>
                                                {licenseData.expiryDate}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-500">Délivré par</span>
                                        <span className="text-base text-gray-900">{licenseData.issuedBy}</span>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            Lieu de Délivrance
                                        </span>
                                        <span className="text-base text-gray-900">{licenseData.issuedAt}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Categories Section */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                                <Car className="w-5 h-5" />
                                Catégories Autorisées
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                {Object.entries(categories).map(([catId, catInfo]) => (
                                    <div 
                                        key={catId}
                                        className={`p-4 rounded-lg border-2 transition-all ${
                                            licenseData.categories.includes(catId)
                                                ? 'bg-blue-50 border-blue-300 shadow-sm'
                                                : 'bg-gray-50 border-gray-200 opacity-50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                                                licenseData.categories.includes(catId)
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-300 text-gray-600'
                                            }`}>
                                                {catId}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xl mb-1">{catInfo.icon}</div>
                                                <div className="text-sm font-medium text-gray-800">{catInfo.label}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="text-center text-sm text-gray-600">
                        <p className="mb-2">
                            <strong>Système de Vérification Officiel</strong> - République Démocratique du Congo
                        </p>
                        <p className="mb-4">
                            Cette vérification a été effectuée le {new Date().toLocaleDateString('fr-FR')} à {new Date().toLocaleTimeString('fr-FR')}
                        </p>
                        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                            <span>Ministère des Transports et Voies de Communication</span>
                            <span>•</span>
                            <span>Gouvernorat de Province</span>
                        </div>
                    </div>
                </div>

                {/* Refresh Button */}
                <div className="text-center mt-6">
                    <button 
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Actualiser la Vérification
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DRCLicenseVerification;