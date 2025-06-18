
import React, { useState, useRef, useEffect } from 'react';
import { Car, FileText, LockIcon, Printer, RefreshCw, User } from 'lucide-react';
import dgiLogo from './../assets/DGI.png'

const VehicleIdGenerator = () => {
    const [formData, setFormData] = useState({
        marqueType: '',
        genre: '',
        numeroChassis: '',
        numeroMoteur: '',
        anneeFabrication: '',
        couleur: '',
        puissanceFiscale: '',
        responsableService: '',
        signature: null,
        proprietaire: '',
        adresse: '',
        numeroImmatriculation: '',
        numeroPlaque: '',
        dateImmatriculation: '',
        usage: 'Personnel'
    });

    const [signaturePreview, setSignaturePreview] = useState(null);
    const printRef = useRef();

    // Lion logo placeholder (you'll need to replace with actual image)
    const lionLogo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='50' font-size='40' text-anchor='middle' x='50'%3E🦁%3C/text%3E%3C/svg%3E";

    // DGI logo placeholder (you'll need to replace with actual image)  
    // const dgiLogo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23666'/%3E%3Ctext y='55' font-size='20' text-anchor='middle' x='50' fill='white'%3EDGI%3C/text%3E%3C/svg%3E";

    const generateQRCode = (text, size = 120) => {
        const baseUrl = 'https://benitha200.github.io/vehicle-registration/#/vehicle-verification';
        const fullUrl = `${baseUrl}?q=${encodeURIComponent(text)}`;
        return new Promise((resolve) => {
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(fullUrl)}&bgcolor=ffffff&color=000000`;
            resolve(qrUrl);
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignatureUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSignaturePreview(e.target.result);
                setFormData(prev => ({
                    ...prev,
                    signature: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePrint = () => {
        window.print();
    };
    const CardFront = () => {
        const [qrCodeUrl, setQrCodeUrl] = useState('');

        useEffect(() => {
            const vehicleInfo = `${formData.marqueType || 'TOYOTA LAND CRUISER'} - ${formData.numeroChassis || 'JTEBZ29J400012394'}`;
            generateQRCode(vehicleInfo, 80).then(qrUrl => {
                setQrCodeUrl(qrUrl);
            });
        }, [formData]);

        return (
            <div className="relative bg-gradient-to-br from-fuchsia-100 via-fuchsia-200 to-fuchsia-100 overflow-hidden shadow-lg rounded-xl"
                style={{
                    width: '650px',
                    height: '450px',
                    fontFamily: 'Arial, sans-serif'
                }}>

                {/* Background pattern */}
                <div className="absolute inset-0 opacity-15">
                    <svg width="100%" height="100%">
                        <defs>
                            <pattern id="back-lines" patternUnits="userSpaceOnUse" width="30" height="30">
                                <path d="M0,0 L30,30 M0,30 L30,0" stroke="#7c3aed" strokeWidth="0.5" opacity="0.3" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#back-lines)" />
                    </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full">
                    {/* Header */}
                    <div className="text-center mb-1 border-b-2 border-fuchsia-900">
                        <div className="text-lg font-bold text-purple-700 pt-4 mb-1">
                            RÉPUBLIQUE DÉMOCRATIQUE DU CONGO
                        </div>
                        <div className="text-base font-bold text-black-800 mb-2">
                            CERTIFICAT D'IMMATRICULATION
                        </div>
                        <div className="text-sm font-semibold text-black-700">
                            IDENTIFICATION DU PROPRIÉTAIRE
                        </div>

                    </div>

                    {/* Main content grid */}
                    <div>
                        <div className='text-center'>
                            <div className="text-sm text-black-600 mt-1 font-bold">
                                DGI00/2022/001990594
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {/* Left column - Owner info */}
                            <div className="col-span-2 space-y-1 gap-2 p-4">
                                <div className="flex items-start gap-2">
                                    <span className="text-sm text-black-900 uppercase">Noms (ou Rais. Soc.):</span>
                                    <span className="text-sm font-semibold text-black">{formData.proprietaire || 'Mr BAGAYAMUKWE TADJI GUSTAVE'}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-sm text-black-900 uppercase">Adresse Phys:</span>
                                    <span className="text-sm font-semibold text-black">{formData.adresse || 'DU PLATEAU Q/Nyalukemba CIBANDA BUKAVU'}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-sm  text-black-900 uppercase">N° Impôt:</span>
                                    <span className="text-sm font-semibold text-black">{formData.numeroImmatriculation || 'A2036989D'}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-sm uppercase text-black-900">Date de 1ère Mise en Circ.:</span>
                                    <span className="text-sm font-semibold text-black">{formData.dateImmatriculation || '2022'}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-sm uppercase text-black-900">Usage:</span>
                                    <span className="text-sm font-semibold text-black">{formData.usage}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-sm uppercase text-black-900">N° Plaque:</span>
                                    <span className="text-sm font-semibold text-black">{formData.numeroPlaque || '0830AE22'}</span>
                                </div>
                                <div className="mt-4">
                                    <span className="text-sm text-black">Fait à Bukavu, le {new Date().toLocaleDateString('fr-FR')}</span>
                                </div>
                            </div>

                            {/* Right column - QR code and stamp */}
                            <div className="flex flex-col items-center justify-between">
                                {/* QR Code */}
                                <div className="flex flex-col items-center mb-6">
                                    <div className="w-28 h-28 bg-white border border-fuchsia-800 flex items-center justify-center p-1">
                                        {qrCodeUrl ? (
                                            <img
                                                src={qrCodeUrl}
                                                alt="QR Code"
                                                className="w-full h-full object-contain"
                                                crossOrigin="anonymous"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                                                QR
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* DGI Logo */}
                                <div className="flex flex-col items-center">
                                    <div className="w-32 h-32 flex items-center justify-center p-1">
                                        <img src={dgiLogo} className="w-full h-full opacity-60" alt="DGI in stamp" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <div className="text-sm text-fuchsia-800 font-medium">
                            Pour toute vérification, contactez la Direction Générale des Impôts
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const CardBack = () => {

        return (
            <div className="relative bg-gradient-to-br from-fuchsia-100 via-fuchsia-200 to-fuchsia-100 overflow-hidden shadow-lg rounded-xl"
                style={{
                    width: '650px',
                    height: '450px',
                    fontFamily: 'Arial, sans-serif'
                }}>

                {/* Enhanced background patterns */}
                <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%">
                        <defs>
                            <pattern id="diagonal-lines" patternUnits="userSpaceOnUse" width="20" height="20">
                                <path d="M0,20 L20,0" stroke="#8b5cf6" strokeWidth="0.8" opacity="0.3" />
                            </pattern>
                            <pattern id="dots" patternUnits="userSpaceOnUse" width="10" height="10">
                                <circle cx="5" cy="5" r="0.5" fill="#7c3aed" opacity="0.2" />
                            </pattern>
                            <pattern id="diamonds" patternUnits="userSpaceOnUse" width="15" height="15">
                                <path d="M0,7.5 L7.5,0 L15,7.5 L7.5,15 Z" fill="none" stroke="#6d28d9" strokeWidth="0.5" opacity="0.2" />
                            </pattern>
                            <pattern id="waves" patternUnits="userSpaceOnUse" width="40" height="20">
                                <path d="M0,10 Q10,15 20,10 T40,10" fill="none" stroke="#9333ea" strokeWidth="0.5" opacity="0.1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
                        <rect width="100%" height="100%" fill="url(#dots)" />
                        <rect width="100%" height="100%" fill="url(#diamonds)" />
                        <rect width="100%" height="100%" fill="url(#waves)" />
                    </svg>
                </div>

                {/* DGI Logo positioned to span both header and main section */}
                <div className="absolute top-0 right-4 z-30 bg-opacity-30 rounded-full flex items-center justify-center shadow-inner backdrop-blur-lg"
                    style={{
                        width: '128px',
                        height: '128px',
                        top: '0.75rem' // Position so 30% is in header (4rem height)
                    }}>
                    <img src={dgiLogo} className="w-32 h-32 opacity-100" alt="DGI Logo" />
                </div>

                {/* Header section with reduced height */}
                <div className="relative text-black p-3 flex items-center justify-between h-16 border-b-2 border-fuchsia-800">
                    <div className="text-lg font-bold tracking-wide">IDENTIFICATION DU VEHICULE</div>
                    {/* Logo space reserved but logo is positioned absolutely */}
                    <div style={{ width: '128px' }}></div>
                </div>

                {/* Main content */}
                <div className="relative z-10">
                    <div className="grid grid-cols-1 gap-6 p-2 relative z-20" style={{ paddingRight: '140px' }}>
                        <div className="space-y-1">
                            <div className="flex items-start gap-2">
                                <span className="font-bold text-sm text-black-900">MARQUE & TYPE:</span>
                                <span className="text-sm font-medium text-black">{formData.marqueType || 'TOYOTA LAND CRUISER'}</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="font-bold text-sm text-black-900">GENRE:</span>
                                <span className="text-sm font-medium text-black">{formData.genre || 'JEEP'}</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="font-bold text-sm text-black-900">N° CHASSIS:</span>
                                <span className="text-sm font-medium text-black">{formData.numeroChassis || 'JTEBZ29J400012394'}</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="font-bold text-sm text-black-900">N° MOTEUR:</span>
                                <span className="text-sm font-medium text-black">{formData.numeroMoteur || ''}</span>
                            </div>

                            <div className="flex items-start gap-2">
                                <span className="font-bold text-sm text-black-900">ANNEE DE FABRICATION:</span>
                                <span className="text-sm font-medium text-black">{formData.anneeFabrication || '2008'}</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="font-bold text-sm text-black-900">COULEUR:</span>
                                <span className="text-sm font-medium text-black">{formData.couleur || 'BLANCHE'}</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="font-bold text-sm text-black-900">PUISSANCE FISCALE:</span>
                                <span className="text-sm font-medium text-black">{formData.puissanceFiscale || '14'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Important remarks section */}
                    <div className="mt-1">
                        <div className="text-black text-center font-bold text-sm border-b-2 border-t-2 border-fuchsia-800">
                            REMARQUES IMPORTANTES
                        </div>
                        <div className="bg-white bg-opacity-90 border-2 border-fuchsia-900 p-3 relative m-3">
                            <div className="absolute inset-0 opacity-5">
                                <svg width="100%" height="100%">
                                    <defs>
                                        <pattern id="remarks-pattern" patternUnits="userSpaceOnUse" width="10" height="10">
                                            <circle cx="5" cy="5" r="1" fill="#8b5cf6" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#remarks-pattern)" />
                                </svg>
                            </div>

                            <div className="relative flex flex-col z-10 text-sm text-black">
                                <div className="flex">
                                    <div className="w-[70%] pr-4">
                                        <p className="mb-2 text-xs">
                                            En cas de vente du présent du véhicule, le cessionnaire et le cédant
                                            doivent se rendre dans nos services avec: attestation de vente,
                                            cette carte d'identification, la carte d'assurance, identité
                                            complète du Responsable du Service de Transport.
                                            Cette carte doit être REMISE de la main à la main du cédant au
                                            cessionnaire lors de la cession.
                                            A cette date, le cessionnaire doit à avoir validé et présenté certifié aux
                                            fins de vérification, cette carte et les numéros du coupé et du
                                            châssis pour éviter le trafic clandestin.
                                        </p>
                                    </div>
                                    <div className="w-[30%] relative">
                                        <div className="absolute top-0 right-0 opacity-10">
                                            <img src={dgiLogo} className="w-8 h-8" alt="Small DGI Logo" />
                                        </div>
                                        <div className="flex justify-between items-end mt-4">
                                            <div className="flex-1">
                                                <div className="text-sm font-bold mb-1 text-black-900">Responsable du service</div>
                                                <div className="text-lg font-bold text-black mb-2">{formData.responsableService || 'CHIRIBAGULA'}</div>
                                                <div className="w-32 h-12 border-2 border-fuchsia-900 bg-white flex items-center justify-center relative">
                                                    {formData.signature ? (
                                                        <img src={formData.signature} alt="Signature" className="w-full h-full object-contain p-1" />
                                                    ) : (
                                                        <div className="text-sm text-gray-500 italic">Signature</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Générateur de Carte d'Identification Véhicule - RDC
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Informations du Véhicule et Propriétaire
                        </h2>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Propriétaire</label>
                                    <input
                                        type="text"
                                        name="proprietaire"
                                        value={formData.proprietaire}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                                        placeholder="Mr BAGAYAMUKWE TADJI GUSTAVE"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">N° Immatriculation</label>
                                    <input
                                        type="text"
                                        name="numeroImmatriculation"
                                        value={formData.numeroImmatriculation}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                                        placeholder="A2036989D"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse Physique</label>
                                <input
                                    type="text"
                                    name="adresse"
                                    value={formData.adresse}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                                    placeholder="DU PLATEAU Q/Nyalukemba CIBANDA BUKAVU"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">N° Plaque</label>
                                    <input
                                        type="text"
                                        name="numeroPlaque"
                                        value={formData.numeroPlaque}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                                        placeholder="0830AE22"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Immatriculation</label>
                                    <input
                                        type="text"
                                        name="dateImmatriculation"
                                        value={formData.dateImmatriculation}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                                        placeholder="2022"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Usage</label>
                                <select
                                    name="usage"
                                    value={formData.usage}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                                >
                                    <option value="Personnel">Personnel</option>
                                    <option value="Commercial">Commercial</option>
                                    <option value="Transport">Transport</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Marque & Type</label>
                                <input
                                    type="text"
                                    name="marqueType"
                                    value={formData.marqueType}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                                    placeholder="TOYOTA LAND CRUISER"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                                    <input
                                        type="text"
                                        name="genre"
                                        value={formData.genre}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                                        placeholder="JEEP"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Année de Fabrication</label>
                                    <input
                                        type="text"
                                        name="anneeFabrication"
                                        value={formData.anneeFabrication}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                                        placeholder="2008"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de Châssis</label>
                                <input
                                    type="text"
                                    name="numeroChassis"
                                    value={formData.numeroChassis}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                                    placeholder="JTEBZ29J400012394"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de Moteur</label>
                                <input
                                    type="text"
                                    name="numeroMoteur"
                                    value={formData.numeroMoteur}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                                    placeholder="Numéro de moteur"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Couleur</label>
                                    <input
                                        type="text"
                                        name="couleur"
                                        value={formData.couleur}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                                        placeholder="BLANCHE"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Puissance Fiscale</label>
                                    <input
                                        type="text"
                                        name="puissanceFiscale"
                                        value={formData.puissanceFiscale}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                                        placeholder="14"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Responsable du Service</label>
                                <input
                                    type="text"
                                    name="responsableService"
                                    value={formData.responsableService}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                                    placeholder="CHIRIBAGULA"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Signature</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleSignatureUpload}
                                        className="hidden"
                                        id="signature-upload"
                                    />
                                    <label
                                        htmlFor="signature-upload"
                                        className="flex items-center gap-2 px-4 py-2 bg-fuchsia-900 text-white rounded-md hover:bg-fuchsia-600 cursor-pointer transition-colors"
                                    >
                                        <LockIcon className="w-4 h-4" />
                                        Choisir Signature
                                    </label>
                                    {signaturePreview && (
                                        <img src={signaturePreview} alt="Signature Preview" className="w-28 h-12 object-contain rounded border" />
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={handlePrint}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-fuchsia-800 text-white rounded-md hover:bg-fuchsia-700 transition-colors"
                            >
                                <Printer className="w-4 h-4" />
                                Imprimer la Carte
                            </button>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Aperçu de la Carte</h2>
                        <div className="space-y-1">
                            <div className='m-0 p-0'>
                                <h3 className="text-sm font-medium mb-2">Recto</h3>
                                <div className="transform scale-90 origin-top-left">
                                    <CardFront />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium mb-2">Verso</h3>
                                <div className="transform scale-90 origin-top-left">
                                    <CardBack />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br />
                <span className='text-2xl m-3 h2 uppercase'> Print Preview</span>
                <br />

                {/* Print Layout */}
                <div ref={printRef} className="print-only">
                    <div className="page-break">
                        <CardFront />
                        <br />
                    </div>
                    <div className="page-break">
                        <CardBack />
                    </div>
                </div>
            </div>

            {/* Print CSS */}
            <style jsx>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    
                    .print-only,
                    .print-only * {
                        visibility: visible;
                    }
                    
                    .print-only {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    
                    .page-break {
                        page-break-after: always;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                    }
                    
                    .page-break:last-child {
                        page-break-after: avoid;
                    }
                    
                    @page {
                        size: A4;
                        margin: 1cm;
                    }
                }
            `}</style>
        </div>
    );
};

export default VehicleIdGenerator;