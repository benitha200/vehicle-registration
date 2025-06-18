import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, Car, Calendar, MapPin, AlertTriangle, RefreshCw, FileText, Truck } from 'lucide-react';

const DRCVehicleVerification = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [verificationStatus, setVerificationStatus] = useState('verifying');
    
    // Sample vehicle data (in real implementation, this would come from URL params or API based on QR code scan)
    const vehicleData = {
        vehicleId: 'DRC-VEH-2025-001234',
        marqueType: 'TOYOTA LAND CRUISER',
        genre: 'JEEP',
        numeroChassis: 'JTEBZ29J400012394',
        numeroMoteur: '1HD-FTE-0234567',
        anneeFabrication: '2008',
        couleur: 'BLANCHE',
        puissanceFiscale: '14',
        responsableService: 'CHIRIBAGULA',
        dateDelivrance: '15/03/2025',
        lieuDelivrance: 'GOMA-NORD KIVU',
        issuedBy: 'DIRECTION GÉNÉRALE DES TRANSPORTS TERRESTRES',
        province: 'NORD-KIVU',
        status: 'VALID',
        lastVerified: new Date().toISOString()
    };

    const getVehicleTypeIcon = (genre) => {
        switch (genre.toLowerCase()) {
            case 'jeep':
            case 'suv':
                return '🚙';
            case 'berline':
            case 'particulier':
                return '🚗';
            case 'camion':
                return '🚛';
            case 'bus':
                return '🚌';
            case 'moto':
                return '🏍️';
            default:
                return '🚗';
        }
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
            case 'INVALID':
                return 'text-red-600 bg-red-50 border-red-200';
            case 'SUSPENDED':
                return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'STOLEN':
                return 'text-red-600 bg-red-100 border-red-300';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Vérification en cours...</h2>
                        <p className="text-gray-600">Validation des informations du véhicule</p>
                        <div className="mt-4 text-sm text-gray-500">
                            Châssis: {vehicleData.numeroChassis}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-3">
                        <Shield className="w-8 h-8 text-purple-600" />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Système de Vérification des Véhicules
                            </h1>
                            <p className="text-sm text-gray-600">République Démocratique du Congo</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Verification Status */}
                <div className="bg-white rounded-lg shadow-lg mb-6 overflow-hidden">
                    <div className={`px-6 py-4 ${vehicleData.status === 'VALID' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                        <div className="flex items-center gap-3">
                            {vehicleData.status === 'VALID' ? (
                                <CheckCircle className="w-6 h-6" />
                            ) : (
                                <AlertTriangle className="w-6 h-6" />
                            )}
                            <div>
                                <h2 className="text-xl font-bold">
                                    {vehicleData.status === 'VALID' ? 'Véhicule Authentique' : 'Véhicule Non Valide'}
                                </h2>
                                <p className="text-sm opacity-90">
                                    {vehicleData.status === 'VALID' 
                                        ? 'Cette carte d\'identification véhicule est authentique et valide' 
                                        : 'Cette carte d\'identification véhicule n\'est pas valide ou a été signalée'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Vehicle Details */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Vehicle Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <Car className="w-5 h-5" />
                                    Informations du Véhicule
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                                        <div className="text-3xl">{getVehicleTypeIcon(vehicleData.genre)}</div>
                                        <div className="flex-1">
                                            <span className="text-sm font-medium text-gray-500">Marque & Type</span>
                                            <div className="text-lg font-bold text-gray-900">{vehicleData.marqueType}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-500">Numéro de Châssis</span>
                                        <span className="text-lg font-mono font-bold text-purple-700">{vehicleData.numeroChassis}</span>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-500">Genre</span>
                                            <span className="text-base font-semibold text-gray-900">{vehicleData.genre}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-500">Année</span>
                                            <span className="text-base font-semibold text-gray-900">{vehicleData.anneeFabrication}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-500">Numéro de Moteur</span>
                                        <span className="text-base font-mono text-gray-900">{vehicleData.numeroMoteur}</span>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-500">Couleur</span>
                                            <span className="text-base text-gray-900">{vehicleData.couleur}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-500">Puissance Fiscale</span>
                                            <span className="text-base text-gray-900">{vehicleData.puissanceFiscale}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Administrative Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Informations Administratives
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className={`flex flex-col p-3 rounded-lg border ${getStatusColor(vehicleData.status)}`}>
                                        <span className="text-sm font-medium">Statut</span>
                                        <span className="text-base font-semibold">{vehicleData.status}</span>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-500">ID Véhicule</span>
                                        <span className="text-base font-mono text-gray-900">{vehicleData.vehicleId}</span>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-500">Date de Délivrance</span>
                                        <span className="text-base text-gray-900">{vehicleData.dateDelivrance}</span>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-500">Responsable du Service</span>
                                        <span className="text-base font-semibold text-gray-900">{vehicleData.responsableService}</span>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-500">Délivré par</span>
                                        <span className="text-base text-gray-900">{vehicleData.issuedBy}</span>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            Lieu de Délivrance
                                        </span>
                                        <span className="text-base text-gray-900">{vehicleData.lieuDelivrance}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security Features */}
                        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                            <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                Éléments de Sécurité
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Numéro de châssis vérifié</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Données officielles confirmées</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>QR Code authentique</span>
                                </div>
                            </div>
                        </div>

                        {/* Warning Section */}
                        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                                <div className="text-sm text-yellow-800">
                                    <p className="font-semibold mb-1">Important:</p>
                                    <p>En cas de vente de ce véhicule, le cessionnaire et le cédant doivent se rendre dans nos services avec l'attestation de vente, cette carte d'identification, la carte d'assurance et l'identité complète du Responsable du Service de Transport.</p>
                                </div>
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
                            <span>Direction Générale des Transports Terrestres</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                    <button 
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Actualiser la Vérification
                    </button>
                    
                    <button 
                        onClick={() => window.print()}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-sm"
                    >
                        <FileText className="w-4 h-4" />
                        Imprimer le Rapport
                    </button>
                </div>

                {/* Report Issues */}
                <div className="text-center mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800 font-medium mb-2">
                        Signaler un problème avec ce véhicule
                    </p>
                    <p className="text-xs text-red-600">
                        Si vous suspectez que ce véhicule est volé ou que les informations sont frauduleuses, 
                        contactez immédiatement les autorités compétentes ou la Direction Générale des Transports Terrestres.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DRCVehicleVerification;