import React, { useState, useRef, useEffect } from 'react';
import { Car, FileText, Printer, RefreshCw } from 'lucide-react';
import lion from './../assets/lion.png'
import DGI from './../assets/DGI.png'

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
        signature: null
    });

    const [signaturePreview, setSignaturePreview] = useState(null);
    const printRef = useRef();

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

    const CardFront = () => (
        <div className="relative bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 border border-purple-500 overflow-hidden shadow-lg rounded-lg"
            style={{
                width: '650px',
                height: '500px',
                fontFamily: 'Arial, sans-serif'
            }}>

            {/* Complex background pattern overlay */}
            <div className="absolute inset-0 opacity-30">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="diagonal-lines" patternUnits="userSpaceOnUse" width="4" height="4">
                            <path d="M0,4 L4,0" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.3" />
                        </pattern>
                        <pattern id="dots" patternUnits="userSpaceOnUse" width="8" height="8">
                            <circle cx="4" cy="4" r="0.5" fill="#8b5cf6" opacity="0.2" />
                        </pattern>
                        <pattern id="crosshatch" patternUnits="userSpaceOnUse" width="6" height="6">
                            <path d="M0,0 L6,6 M0,6 L6,0" stroke="#7c3aed" strokeWidth="0.3" opacity="0.4" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
                    <rect width="100%" height="100%" fill="url(#dots)" />
                    <rect width="100%" height="100%" fill="url(#crosshatch)" />
                </svg>
            </div>

            {/* Watermark pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="text-6xl font-bold text-purple-800 transform rotate-45 select-none">
                        <img src={lion} />
                    </div>
                </div>
            </div>

            {/* Header section */}
            <div className="relative text-black p-3 flex items-center justify-between">
                <div className="text-lg font-bold tracking-wide">IDENTIFICATION DU VEHICULE</div>

                {/* Larger circular logo on the right with blend effect */}
                <div className="bg-opacity-30 rounded-full flex items-center justify-center border-2 border-purple-300 shadow-inner backdrop-blur-sm">
                    <img src={DGI} className="w-32 h-32 opacity-80" />
                </div>
            </div>

            <div className="relative z-10">

                <div className="grid grid-cols-2 gap-6 p-4 relative z-20">
                    <div className="space-y-3">
                        <div className="flex items-start">
                            <span className="font-bold text-sm w-32 text-purple-900">MARQUE & TYPE:</span>
                            <span className="text-sm font-medium text-black">{formData.marqueType || 'TOYOTA LAND CRUISER'}</span>
                        </div>
                        <div className="flex items-start">
                            <span className="font-bold text-sm w-32 text-purple-900">GENRE:</span>
                            <span className="text-sm font-medium text-black">{formData.genre || 'JEEP'}</span>
                        </div>
                        <div className="flex items-start">
                            <span className="font-bold text-sm w-32 text-purple-900">N° CHASSIS:</span>
                            <span className="text-sm font-medium text-black">{formData.numeroChassis || 'JTEBZ29J400012394'}</span>
                        </div>
                        <div className="flex items-start">
                            <span className="font-bold text-sm w-32 text-purple-900">N° MOTEUR:</span>
                            <span className="text-sm font-medium text-black">{formData.numeroMoteur || ''}</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-start">
                            <span className="font-bold text-sm w-40 text-purple-900">ANNEE DE FABRICATION:</span>
                            <span className="text-sm font-medium text-black">{formData.anneeFabrication || '2008'}</span>
                        </div>
                        <div className="flex items-start">
                            <span className="font-bold text-sm w-40 text-purple-900">COULEUR:</span>
                            <span className="text-sm font-medium text-black">{formData.couleur || 'BLANCHE'}</span>
                        </div>
                        <div className="flex items-start">
                            <span className="font-bold text-sm w-40 text-purple-900">PUISSANCE FISCALE:</span>
                            <span className="text-sm font-medium text-black">{formData.puissanceFiscale || '14'}</span>
                        </div>
                    </div>
                </div>

                {/* Important remarks section with background DGI watermark */}
                <div className="mt-1">
                    <div className="text-black text-center font-bold text-sm border-b-2 border-t-2 border-purple-800">
                        REMARQUES IMPORTANTES
                    </div>
                    <div className="bg-white bg-opacity-90 border-2 border-purple-500 p-3 relative m-4">

                        {/* Background pattern for remarks section */}
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

                        <div className="relative flex flex-col z-10 text-xs text-black">
                            <div className="flex">
                                {/* Left column (70%) */}
                                <div className="w-[70%] pr-4">
                                    <p className="mb-2">
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
                                <hr size={3} />

                                {/* Right column (30%) with small DGI logo */}
                                <div className="w-[30%] relative">
                                    {/* Small DGI logo in signature area */}
                                    <div className="absolute top-0 right-0 opacity-10">
                                        <img
                                            src={DGI}
                                            className="w-12 h-12 transform rotate-12"
                                            alt="Small DGI Logo"
                                        />
                                    </div>

                                    <div className="flex justify-between items-end mt-4">
                                        <div className="flex-1">
                                            <div className="text-sm font-bold mb-1 text-purple-900">Responsable du service</div>
                                            <div className="text-lg font-bold text-black mb-2">{formData.responsableService || 'CHIRIBAGULA'}</div>
                                            <div className="w-32 h-12 border-2 border-purple-400 bg-white flex items-center justify-center relative">
                                                {formData.signature ? (
                                                    <img src={formData.signature} alt="Signature" className="w-full h-full object-contain p-1" />
                                                ) : (
                                                    <div className="text-xs text-gray-500 italic">Signature</div>
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

    const CardBack = () => {
        const [qrCodeUrl, setQrCodeUrl] = useState('');

        useEffect(() => {
            const vehicleInfo = `${formData.marqueType || 'TOYOTA LAND CRUISER'} - ${formData.numeroChassis || 'JTEBZ29J400012394'}`;
            generateQRCode(vehicleInfo, 120).then(qrUrl => {
                setQrCodeUrl(qrUrl);
            });
        }, [formData]);

        return (
            <div className="relative bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 border border-purple-500 overflow-hidden shadow-lg rounded-lg"
                style={{
                    width: '650px',
                    height: '500px',
                    fontFamily: 'Arial, sans-serif'
                }}>

                {/* Complex background pattern */}
                <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%">
                        <defs>
                            <pattern id="back-diagonal" patternUnits="userSpaceOnUse" width="8" height="8">
                                <path d="M0,0 L8,8 M0,8 L8,0" stroke="#7c3aed" strokeWidth="0.4" />
                            </pattern>
                            <pattern id="back-grid" patternUnits="userSpaceOnUse" width="12" height="12">
                                <path d="M0,0 L12,0 M0,0 L0,12" stroke="#8b5cf6" strokeWidth="0.3" opacity="0.6" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#back-diagonal)" />
                        <rect width="100%" height="100%" fill="url(#back-grid)" />
                    </svg>
                </div>

                {/* Large watermark */}
                <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-6xl font-bold text-purple-800 transform rotate-45 select-none">
                            <img src={lion} className='w' />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
                    <div className="text-center mb-8">
                        <div className="text-2xl font-bold text-purple-800 mb-2 tracking-wide">
                            RÉPUBLIQUE DÉMOCRATIQUE DU CONGO
                        </div>
                        <div className="text-lg font-semibold text-purple-700">
                            MINISTÈRE DES TRANSPORTS ET VOIES DE COMMUNICATION
                        </div>
                    </div>

                    {/* QR Code section */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-32 h-32 bg-white border-2 border-purple-500 flex items-center justify-center mb-4 p-2 shadow-inner">
                            {qrCodeUrl ? (
                                <img
                                    src={qrCodeUrl}
                                    alt="QR Code for vehicle verification"
                                    className="w-full h-full object-contain"
                                    crossOrigin="anonymous"
                                />
                            ) : (
                                <div className="w-28 h-28 bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                                    Loading QR
                                </div>
                            )}
                        </div>
                        <div className="text-sm font-mono tracking-wider text-purple-900 font-bold">
                            {formData.numeroChassis || 'JTEBZ29J400012394'}
                        </div>
                        <div className="text-xs text-purple-700 mt-1 font-medium">
                            Scanner pour vérification
                        </div>
                    </div>

                    {/* Footer information */}
                    <div className="text-center text-purple-800">
                        <div className="text-sm font-bold mb-2">
                            DIRECTION GÉNÉRALE DES TRANSPORTS TERRESTRES
                        </div>
                        <div className="text-xs font-medium">
                            Pour toute vérification, contactez nos services
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
                            Informations du Véhicule
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Marque & Type</label>
                                <input
                                    type="text"
                                    name="marqueType"
                                    value={formData.marqueType}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                                        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 cursor-pointer transition-colors"
                                    >
                                        <Car className="w-4 h-4" />
                                        Choisir Signature
                                    </label>
                                    {signaturePreview && (
                                        <img src={signaturePreview} alt="Signature Preview" className="w-28 h-12 object-contain rounded border" />
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={handlePrint}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
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