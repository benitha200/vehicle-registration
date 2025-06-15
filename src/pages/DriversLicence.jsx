// import React, { useState, useRef } from 'react';
// import { Camera, FileText, Printer, PenLine } from 'lucide-react';
// import flag from './../assets/flag.png'

// const categories = [
//     { id: 'A', label: '2 ROUES', icon: '🏍️' },
//     { id: 'B', label: 'PARTICULIER 3,5 TON MAX / 9+D PAX MAX', icon: '🚗' },
//     { id: 'C', label: 'CAMION 3,5 TON+', icon: '🚛' },
//     { id: 'D', label: 'BUS 8 PAX +', icon: '🚌' },
//     { id: 'E', label: 'SPECIAL', icon: '🚜' }
// ];

// const DRCLicenseGenerator = () => {
//     const [formData, setFormData] = useState({
//         nom: '',
//         prenom: '',
//         dateNaissance: '',
//         lieuNaissance: '',
//         nationalite: 'CONGOLAISE',
//         adresse: '',
//         licenseNumber: '',
//         dateDelivrance: '',
//         dateExpiration: '',
//         categories: [],
//         photo: null,
//         signature: null,
//     });

//     const [photoPreview, setPhotoPreview] = useState(null);
//     const [signaturePreview, setSignaturePreview] = useState(null);
//     const printRef = useRef();

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleCategoryChange = (category) => {
//         setFormData(prev => ({
//             ...prev,
//             categories: prev.categories.includes(category)
//                 ? prev.categories.filter(c => c !== category)
//                 : [...prev.categories, category]
//         }));
//     };

//     const handlePhotoUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 setPhotoPreview(e.target.result);
//                 setFormData(prev => ({
//                     ...prev,
//                     photo: e.target.result
//                 }));
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleSignatureUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 setSignaturePreview(e.target.result);
//                 setFormData(prev => ({
//                     ...prev,
//                     signature: e.target.result
//                 }));
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handlePrint = () => {
//         window.print();
//     };

//     const formatDate = (date) => {
//         if (!date) return '';
//         return new Date(date).toLocaleDateString('fr-FR');
//     };

//     const Barcode = ({ value }) => (
//         <div className="flex flex-col items-center mt-2">
//             <div className="flex">
//                 {Array.from({ length: 20 }, (_, i) => (
//                     <div key={i} className="bg-black w-0.5 h-6 mr-0.5" />
//                 ))}
//             </div>
//             <div className="text-xs mt-1 font-mono">
//                 {value || 'AAA25NZSKN'}
//             </div>
//         </div>
//     );

//     const cardFont = `'Arial Narrow', Arial, 'Roboto Condensed', sans-serif`;

//     const CardFront = () => (
//         <div className="relative bg-gradient-to-br from-blue-50 to-cyan-100 border border-gray-300"
//             style={{
//                 width: '600px',
//                 height: '450px',
//                 fontFamily: cardFont,
//                 fontSize: '9px'
//             }}>
//             {/* Background pattern - diagonal crosshatch */}
//             <div className="absolute inset-0 opacity-15">
//                 <svg width="100%" height="100%">
//                     <defs>
//                         <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="8" height="8">
//                             <path d="m0,8 l8,-8 M-2,2 l4,-4 M6,10 l4,-4" stroke="#0ea5e9" strokeWidth="0.5" />
//                             <path d="m0,0 l8,8 M-2,6 l4,4 M6,-2 l4,4" stroke="#0ea5e9" strokeWidth="0.5" />
//                         </pattern>
//                     </defs>
//                     <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
//                 </svg>
//             </div>

//             {/* Top section with flag and categories */}
//             <div className="flex justify-between items-start p-3 pb-2">
//                 {/* DRC Flag */}
                // <img
                //     src={flag}
                //     alt="Flag"
                //     className="w-26 h-16 border border-gray-400 object-cover"
                // />

//                 {/* Categories display */}
//                 <div className="bg-gray-800 text-white px-4 py-2 rounded">
//                     <div className="font-bold text-xl tracking-wider text-center">
//                         {formData.categories.length ? formData.categories.join('') : 'ABCD'}
//                     </div>
//                     <div className="text-xs text-center mt-1">CATÉGORIES</div>
//                 </div>
//             </div>

//             {/* Header */}
//             <div className="text-center px-3 mb-3">
//                 <div className="text-sm font-bold text-gray-800 mb-1">RÉPUBLIQUE DÉMOCRATIQUE DU CONGO</div>
//                 <div className="text-sm font-bold text-red-600">PERMIS DE CONDUIRE NATIONAL - DRIVING LICENCE</div>
//             </div>

//             {/* Main content area */}
//             <div className="px-4">

//                 <div className="flex gap-4">

//                     <div className='flex flex-col justify-between'>
//                         {/* Photo */}
//                         <div className="w-24 h-28 bg-white border-2 border-gray-400 flex items-center justify-center flex-shrink-0">
//                             {formData.photo ? (
//                                 <img src={formData.photo} alt="Photo" className="w-full h-full object-cover" />
//                             ) : (
//                                 <div className="text-xs text-gray-500 text-center">Photo</div>
//                             )}
//                         </div>
//                         {/* Signature area */}
//                         <div className="text-center">
//                             <div className="w-24 h-12 bg-white border border-gray-400 flex items-center justify-center mb-1">
//                                 {formData.signature ? (
//                                     <img src={formData.signature} alt="Signature" className="w-full h-full object-contain" />
//                                 ) : (
//                                     <div className="text-xs text-gray-500">Signature</div>
//                                 )}
//                             </div>
//                             <div className="text-xs font-semibold">Signature du titulaire</div>
//                             <div className="text-xs font-mono mt-1">N° 000000001</div>
//                         </div>
//                     </div>


//                     {/* Personal information - left column */}
//                     <div className="flex-1 space-y-2">
//                         <div className="flex">
//                             <span className="font-semibold text-xs w-32">NOM/NAME:</span>
//                             <span className="text-xs font-bold flex-1">{formData.nom || 'JANVIER'}</span>
//                         </div>
//                         <div className="flex">
//                             <span className="font-semibold text-xs w-32">PRÉNOM/FIRSTNAME:</span>
//                             <span className="text-xs flex-1">{formData.prenom || 'MAOMBI PATAOLI'}</span>
//                         </div>
//                         <div className="flex">
//                             <span className="font-semibold text-xs w-32">DATE ET LIEU DE NAISSANCE/DATE & PLACE OF BIRTH:</span>
//                             <span className="text-xs flex-1">
//                                 {formData.dateNaissance ? formatDate(formData.dateNaissance) : '10/08/1985'} {formData.lieuNaissance || 'BUKAVU'}
//                             </span>
//                         </div>
//                         <div className="flex">
//                             <span className="font-semibold text-xs w-32">NATIONALITÉ/NATIONALITY:</span>
//                             <span className="text-xs flex-1">{formData.nationalite || 'CONGOLAISE'}</span>
//                         </div>
//                         <div className="flex">
//                             <span className="font-semibold text-xs w-32">N° DE DÉLIVRANCE/ID N°:</span>
//                             <span className="text-xs flex-1">00URU6100655</span>
//                         </div>

//                         {/* Address */}
//                         <div className="mt-3 flex">
//                             <span className="font-semibold text-xs w-40">ADRESSE/HOME ADDRESS:</span>
//                             <span className="text-xs flex-1">{formData.adresse || '53, AV. DE LA MISSION C/GOMA'}</span>
//                         </div>

//                         {/* Remarks */}
//                         <div className="mt-2 flex">
//                             <span className="font-semibold text-xs w-40">REMARQUES ET RESTRICTIONS/REMARKS & RESTRICTIONS:</span>
//                             <span className="text-xs flex-1">AUCUNE</span>
//                         </div>

//                         {/* Bottom section with dates and signature */}
//                         <div className="flex justify-between items-end mt-4">
//                             <div className="space-y-2">
//                                 <div>
//                                     <span className="font-semibold text-xs">DATE DE DÉLIVRANCE/DATE OF DELIVERY:</span>
//                                     <div className="text-xs font-semibold">{formData.dateDelivrance ? formatDate(formData.dateDelivrance) : '15/03/2025'}</div>
//                                 </div>
//                                 <div>
//                                     <span className="font-semibold text-xs">DATE D'ÉCHÉANCE/DATE OF EXPIRY:</span>
//                                     <div className="text-xs font-semibold">{formData.dateExpiration ? formatDate(formData.dateExpiration) : '15/03/2028'}</div>
//                                 </div>
//                             </div>


//                         </div>
//                     </div>

//                     {/* License number - right side */}
//                     <div className="flex flex-col items-center text-center">
//                         <div className="font-semibold text-xs mb-2">PERMIS N°/LICENCE N°:</div>
//                         <div className="text-sm font-bold bg-white px-3 py-2 border border-gray-400">
//                             {formData.licenseNumber || 'AAA25NZSKN'}
//                         </div>
//                     </div>
//                 </div>


//             </div>
//         </div>
//     );

//     const CardBack = () => (
//         <div className="relative bg-gradient-to-br from-blue-50 to-cyan-100 border border-gray-300"
//             style={{
//                 width: '600px',
//                 height: '450px',
//                 fontFamily: cardFont,
//                 fontSize: '9px'
//             }}>
//             {/* Lion Watermark */}
//             <div className="absolute top-2 right-2 text-yellow-400 opacity-20 text-4xl">
//                 🦁
//             </div>

//             {/* Lion silhouette */}
//             <div className="absolute bottom-2 left-2 text-yellow-600 opacity-30 text-6xl">
//                 🦁
//             </div>

//             {/* Left: Delivery info, Lion, Barcode */}
//             <div className="flex h-full">
//                 <div className="w-1/2 p-2 space-y-2">
//                     {/* Lion circle */}
//                     <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-xl">
//                         🦁
//                     </div>

//                     <div>
//                         <div className="font-semibold text-xs">DÉLIVRÉ À/DELIVERY AT:</div>
//                         <div className="text-xs">GOMA-NORD KIVU</div>
//                     </div>

//                     <div>
//                         <div className="font-semibold text-xs">DÉLIVRÉ PAR/DELIVERY BY:</div>
//                         <div className="text-xs">GOUVERNORAT DE PROVINCE</div>
//                         <div className="text-xs">NORD-KIVU REP. DEM. DU CONGO</div>
//                     </div>

//                     <div className="mt-4">
//                         <Barcode value={formData.licenseNumber} />
//                     </div>
//                 </div>

//                 {/* Right: Categories */}
//                 <div className="w-1/2 p-2">
//                     <div className="font-semibold text-xs mb-2">VALABLE POUR CATÉGORIES / VALID FOR CATEGORIES</div>
//                     <div className="space-y-1">
//                         {categories.map(cat => (
//                             <div key={cat.id} className={`flex items-center gap-2 p-1 rounded ${formData.categories.includes(cat.id) ? 'bg-blue-200' : 'bg-gray-100'
//                                 }`}>
//                                 <div className={`w-4 h-4 rounded flex items-center justify-center text-xs font-bold ${formData.categories.includes(cat.id) ? 'bg-blue-600 text-white' : 'bg-gray-300'
//                                     }`}>
//                                     {cat.id}
//                                 </div>
//                                 <div className="text-xs flex-1">{cat.label}</div>
//                                 <div className="text-sm">{cat.icon}</div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* CGO badge */}
//                     <div className="absolute bottom-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
//                         CGO
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-gray-50 p-4">
//             <div className="max-w-8xl mx-auto">
//                 <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
//                     Générateur de Permis de Conduire - RDC
//                 </h1>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                     {/* Form Section */}
//                     <div className="bg-white shadow-lg rounded-lg p-6">
//                         <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//                             <FileText className="w-5 h-5" />
//                             Informations du Permis
//                         </h2>

//                         <div className="space-y-4">
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
//                                     <input
//                                         type="text"
//                                         name="nom"
//                                         value={formData.nom}
//                                         onChange={handleInputChange}
//                                         className="w-full p-2 border border-gray-300 rounded-md"
//                                         placeholder="JANVIER"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
//                                     <input
//                                         type="text"
//                                         name="prenom"
//                                         value={formData.prenom}
//                                         onChange={handleInputChange}
//                                         className="w-full p-2 border border-gray-300 rounded-md"
//                                         placeholder="MAOMBI PATAOLI"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Date de Naissance</label>
//                                     <input
//                                         type="date"
//                                         name="dateNaissance"
//                                         value={formData.dateNaissance}
//                                         onChange={handleInputChange}
//                                         className="w-full p-2 border border-gray-300 rounded-md"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Lieu de Naissance</label>
//                                     <input
//                                         type="text"
//                                         name="lieuNaissance"
//                                         value={formData.lieuNaissance}
//                                         onChange={handleInputChange}
//                                         className="w-full p-2 border border-gray-300 rounded-md"
//                                         placeholder="BUKAVU"
//                                     />
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Nationalité</label>
//                                 <input
//                                     type="text"
//                                     name="nationalite"
//                                     value={formData.nationalite}
//                                     onChange={handleInputChange}
//                                     className="w-full p-2 border border-gray-300 rounded-md"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
//                                 <textarea
//                                     name="adresse"
//                                     value={formData.adresse}
//                                     onChange={handleInputChange}
//                                     className="w-full p-2 border border-gray-300 rounded-md"
//                                     rows="2"
//                                     placeholder="53, AV. DE LA MISSION GOMA"
//                                 />
//                             </div>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de Permis</label>
//                                     <input
//                                         type="text"
//                                         name="licenseNumber"
//                                         value={formData.licenseNumber}
//                                         onChange={handleInputChange}
//                                         className="w-full p-2 border border-gray-300 rounded-md"
//                                         placeholder="AAA25NZSKN"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Date de Délivrance</label>
//                                     <input
//                                         type="date"
//                                         name="dateDelivrance"
//                                         value={formData.dateDelivrance}
//                                         onChange={handleInputChange}
//                                         className="w-full p-2 border border-gray-300 rounded-md"
//                                     />
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Date d'Expiration</label>
//                                 <input
//                                     type="date"
//                                     name="dateExpiration"
//                                     value={formData.dateExpiration}
//                                     onChange={handleInputChange}
//                                     className="w-full p-2 border border-gray-300 rounded-md"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Catégories</label>
//                                 <div className="space-y-2">
//                                     {categories.map(cat => (
//                                         <label key={cat.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={formData.categories.includes(cat.id)}
//                                                 onChange={() => handleCategoryChange(cat.id)}
//                                                 className="w-4 h-4"
//                                             />
//                                             <span className="text-lg">{cat.icon}</span>
//                                             <span className="font-semibold">{cat.id}</span>
//                                             <span className="text-sm">{cat.label}</span>
//                                         </label>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
//                                 <div className="flex items-center gap-4">
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={handlePhotoUpload}
//                                         className="hidden"
//                                         id="photo-upload"
//                                     />
//                                     <label
//                                         htmlFor="photo-upload"
//                                         className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
//                                     >
//                                         <Camera className="w-4 h-4" />
//                                         Choisir Photo
//                                     </label>
//                                     {photoPreview && (
//                                         <img src={photoPreview} alt="Preview" className="w-16 h-16 object-cover rounded border" />
//                                     )}
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Signature</label>
//                                 <div className="flex items-center gap-4">
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={handleSignatureUpload}
//                                         className="hidden"
//                                         id="signature-upload"
//                                     />
//                                     <label
//                                         htmlFor="signature-upload"
//                                         className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer"
//                                     >
//                                         <PenLine className="w-4 h-4" />
//                                         Choisir Signature
//                                     </label>
//                                     {signaturePreview && (
//                                         <img src={signaturePreview} alt="Signature Preview" className="w-28 h-12 object-contain rounded border" />
//                                     )}
//                                 </div>
//                             </div>

//                             <button
//                                 onClick={handlePrint}
//                                 className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
//                             >
//                                 <Printer className="w-4 h-4" />
//                                 Imprimer le Permis
//                             </button>
//                         </div>
//                     </div>

//                     {/* Preview Section */}
//                     <div className="w-full bg-white shadow-lg rounded-lg p-6">
//                         <h2 className="text-xl font-semibold mb-4">Aperçu du Permis</h2>
//                         {/* Card Preview */}
//                         <div className="space-y-4">
//                             <div>
//                                 <h3 className="text-sm font-medium mb-2">Recto</h3>
//                                 <CardFront />
//                             </div>
//                             <div>
//                                 <h3 className="text-sm font-medium mb-2">Verso</h3>
//                                 <CardBack />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Print Layout */}
//                 <div ref={printRef} className="print-only">
//                     <div className="page-break">
//                         <CardFront />
//                     </div>
//                     <div className="page-break">
//                         <CardBack />
//                     </div>
//                 </div>
//             </div>

//             {/* Print CSS */}
//             <style jsx>{`
//         @media print {
//           body * {
//             visibility: hidden;
//           }
          
//           .print-only,
//           .print-only * {
//             visibility: visible;
//           }
          
//           .print-only {
//             position: absolute;
//             left: 0;
//             top: 0;
//             width: 100%;
//           }
          
//           .page-break {
//             page-break-after: always;
//             margin: 0;
//             padding: 0;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             min-height: 100vh;
//           }
          
//           .page-break:last-child {
//             page-break-after: avoid;
//           }
          
//           @page {
//             size: A4;
//             margin: 1cm;
//           }
//         }
//       `}</style>
//         </div>
//     );
// };

// export default DRCLicenseGenerator;

import React, { useState, useRef, useEffect } from 'react';
import { Camera, FileText, Printer, PenLine, RefreshCw } from 'lucide-react';
import flag from './../assets/flag.png'

const categories = [
    { id: 'A', label: '2 ROUES', icon: '🏍️' },
    { id: 'B', label: 'PARTICULIER 3,5 TON MAX / 9+D PAX MAX', icon: '🚗' },
    { id: 'C', label: 'CAMION 3,5 TON+', icon: '🚛' },
    { id: 'D', label: 'BUS 8 PAX +', icon: '🚌' },
    { id: 'E', label: 'SPECIAL', icon: '🚜' }
];

const DRCLicenseGenerator = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        dateNaissance: '',
        lieuNaissance: '',
        nationalite: 'CONGOLAISE',
        adresse: '',
        licenseNumber: '',
        dateDelivrance: '',
        dateExpiration: '',
        categories: [],
        photo: null,
        signature: null,
    });

    const [photoPreview, setPhotoPreview] = useState(null);
    const [signaturePreview, setSignaturePreview] = useState(null);
    const printRef = useRef();

    // Function to generate license number
    const generateLicenseNumber = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        
        // Generate 3 random letters
        let licenseNum = '';
        for (let i = 0; i < 3; i++) {
            licenseNum += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        
        // Add current year (last 2 digits)
        licenseNum += new Date().getFullYear().toString().slice(-2);
        
        // Add 6 random characters (mix of letters and numbers)
        for (let i = 0; i < 6; i++) {
            const useNumber = Math.random() > 0.5;
            if (useNumber) {
                licenseNum += numbers.charAt(Math.floor(Math.random() * numbers.length));
            } else {
                licenseNum += letters.charAt(Math.floor(Math.random() * letters.length));
            }
        }
        
        return licenseNum;
    };

    // Auto-generate license number on component mount
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            licenseNumber: generateLicenseNumber()
        }));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategoryChange = (category) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category]
        }));
    };

    const handleGenerateNewLicense = () => {
        setFormData(prev => ({
            ...prev,
            licenseNumber: generateLicenseNumber()
        }));
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoPreview(e.target.result);
                setFormData(prev => ({
                    ...prev,
                    photo: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
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

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('fr-FR');
    };

    const Barcode = ({ value }) => (
        <div className="flex flex-col items-center mt-2">
            <div className="flex">
                {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className="bg-black w-0.5 h-6 mr-0.5" />
                ))}
            </div>
            <div className="text-xs mt-1 font-mono">
                {value || 'AAA25NZSKN'}
            </div>
        </div>
    );

    const cardFont = `'Arial Narrow', Arial, 'Roboto Condensed', sans-serif`;

    const CardFront = () => (
        <div className="relative bg-gradient-to-br from-blue-50 to-cyan-100 border border-gray-300"
            style={{
                width: '600px',
                height: '450px',
                fontFamily: cardFont,
                fontSize: '9px'
            }}>
            {/* Background pattern - diagonal crosshatch */}
            <div className="absolute inset-0 opacity-15">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="8" height="8">
                            <path d="m0,8 l8,-8 M-2,2 l4,-4 M6,10 l4,-4" stroke="#0ea5e9" strokeWidth="0.5" />
                            <path d="m0,0 l8,8 M-2,6 l4,4 M6,-2 l4,4" stroke="#0ea5e9" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
                </svg>
            </div>

            {/* Top section with flag and categories */}
            <div className="flex justify-between items-start p-3 pb-2">
                {/* DRC Flag */}
                                <img
                    src={flag}
                    alt="Flag"
                    className="w-26 h-16 border border-gray-400 object-cover"
                />

                {/* Categories display */}
                <div className="bg-gray-800 text-white px-4 py-2 rounded">
                    <div className="font-bold text-xl tracking-wider text-center">
                        {formData.categories.length ? formData.categories.join('') : 'ABCD'}
                    </div>
                    <div className="text-xs text-center mt-1">CATÉGORIES</div>
                </div>
            </div>

            {/* Header */}
            <div className="text-center px-3 mb-3">
                <div className="text-sm font-bold text-gray-800 mb-1">RÉPUBLIQUE DÉMOCRATIQUE DU CONGO</div>
                <div className="text-sm font-bold text-red-600">PERMIS DE CONDUIRE NATIONAL - DRIVING LICENCE</div>
            </div>

            {/* Main content area */}
            <div className="px-4">

                <div className="flex gap-4">

                    <div className='flex flex-col justify-between'>
                        {/* Photo */}
                        <div className="w-24 h-28 bg-white border-2 border-gray-400 flex items-center justify-center flex-shrink-0">
                            {formData.photo ? (
                                <img src={formData.photo} alt="Photo" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-xs text-gray-500 text-center">Photo</div>
                            )}
                        </div>
                        {/* Signature area */}
                        <div className="text-center">
                            <div className="w-24 h-12 bg-white border border-gray-400 flex items-center justify-center mb-1">
                                {formData.signature ? (
                                    <img src={formData.signature} alt="Signature" className="w-full h-full object-contain" />
                                ) : (
                                    <div className="text-xs text-gray-500">Signature</div>
                                )}
                            </div>
                            <div className="text-xs font-semibold">Signature du titulaire</div>
                            <div className="text-xs font-mono mt-1">N° 000000001</div>
                        </div>
                    </div>


                    {/* Personal information - left column */}
                    <div className="flex-1 space-y-2">
                        <div className="flex">
                            <span className="font-semibold text-xs w-32">NOM/NAME:</span>
                            <span className="text-xs font-bold flex-1">{formData.nom || 'JANVIER'}</span>
                        </div>
                        <div className="flex">
                            <span className="font-semibold text-xs w-32">PRÉNOM/FIRSTNAME:</span>
                            <span className="text-xs flex-1">{formData.prenom || 'MAOMBI PATAOLI'}</span>
                        </div>
                        <div className="flex">
                            <span className="font-semibold text-xs w-32">DATE ET LIEU DE NAISSANCE/DATE & PLACE OF BIRTH:</span>
                            <span className="text-xs flex-1">
                                {formData.dateNaissance ? formatDate(formData.dateNaissance) : '10/08/1985'} {formData.lieuNaissance || 'BUKAVU'}
                            </span>
                        </div>
                        <div className="flex">
                            <span className="font-semibold text-xs w-32">NATIONALITÉ/NATIONALITY:</span>
                            <span className="text-xs flex-1">{formData.nationalite || 'CONGOLAISE'}</span>
                        </div>
                        <div className="flex">
                            <span className="font-semibold text-xs w-32">N° DE DÉLIVRANCE/ID N°:</span>
                            <span className="text-xs flex-1">00URU6100655</span>
                        </div>

                        {/* Address */}
                        <div className="mt-3 flex">
                            <span className="font-semibold text-xs w-40">ADRESSE/HOME ADDRESS:</span>
                            <span className="text-xs flex-1">{formData.adresse || '53, AV. DE LA MISSION C/GOMA'}</span>
                        </div>

                        {/* Remarks */}
                        <div className="mt-2 flex">
                            <span className="font-semibold text-xs w-40">REMARQUES ET RESTRICTIONS/REMARKS & RESTRICTIONS:</span>
                            <span className="text-xs flex-1">AUCUNE</span>
                        </div>

                        {/* Bottom section with dates and signature */}
                        <div className="flex justify-between items-end mt-4">
                            <div className="space-y-2">
                                <div>
                                    <span className="font-semibold text-xs">DATE DE DÉLIVRANCE/DATE OF DELIVERY:</span>
                                    <div className="text-xs font-semibold">{formData.dateDelivrance ? formatDate(formData.dateDelivrance) : '15/03/2025'}</div>
                                </div>
                                <div>
                                    <span className="font-semibold text-xs">DATE D'ÉCHÉANCE/DATE OF EXPIRY:</span>
                                    <div className="text-xs font-semibold">{formData.dateExpiration ? formatDate(formData.dateExpiration) : '15/03/2028'}</div>
                                </div>
                            </div>


                        </div>
                    </div>

                    {/* License number - right side */}
                    <div className="flex flex-col items-center text-center">
                        <div className="font-semibold text-xs mb-2">PERMIS N°/LICENCE N°:</div>
                        <div className="text-sm font-bold bg-white px-3 py-2 border border-gray-400">
                            {formData.licenseNumber || 'AAA25NZSKN'}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );

    const CardBack = () => (
        <div className="relative bg-gradient-to-br from-blue-50 to-cyan-100 border border-gray-300"
            style={{
                width: '600px',
                height: '450px',
                fontFamily: cardFont,
                fontSize: '9px'
            }}>
            {/* Lion Watermark */}
            <div className="absolute top-2 right-2 text-yellow-400 opacity-20 text-4xl">
                🦁
            </div>

            {/* Lion silhouette */}
            <div className="absolute bottom-2 left-2 text-yellow-600 opacity-30 text-6xl">
                🦁
            </div>

            {/* Left: Delivery info, Lion, Barcode */}
            <div className="flex h-full">
                <div className="w-1/2 p-2 space-y-2">
                    {/* Lion circle */}
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-xl">
                        🦁
                    </div>

                    <div>
                        <div className="font-semibold text-xs">DÉLIVRÉ À/DELIVERY AT:</div>
                        <div className="text-xs">GOMA-NORD KIVU</div>
                    </div>

                    <div>
                        <div className="font-semibold text-xs">DÉLIVRÉ PAR/DELIVERY BY:</div>
                        <div className="text-xs">GOUVERNORAT DE PROVINCE</div>
                        <div className="text-xs">NORD-KIVU REP. DEM. DU CONGO</div>
                    </div>

                    <div className="mt-4">
                        <Barcode value={formData.licenseNumber} />
                    </div>
                </div>

                {/* Right: Categories */}
                <div className="w-1/2 p-2">
                    <div className="font-semibold text-xs mb-2">VALABLE POUR CATÉGORIES / VALID FOR CATEGORIES</div>
                    <div className="space-y-1">
                        {categories.map(cat => (
                            <div key={cat.id} className={`flex items-center gap-2 p-1 rounded ${formData.categories.includes(cat.id) ? 'bg-blue-200' : 'bg-gray-100'
                                }`}>
                                <div className={`w-4 h-4 rounded flex items-center justify-center text-xs font-bold ${formData.categories.includes(cat.id) ? 'bg-blue-600 text-white' : 'bg-gray-300'
                                    }`}>
                                    {cat.id}
                                </div>
                                <div className="text-xs flex-1">{cat.label}</div>
                                <div className="text-sm">{cat.icon}</div>
                            </div>
                        ))}
                    </div>

                    {/* CGO badge */}
                    <div className="absolute bottom-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                        CGO
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Générateur de Permis de Conduire - RDC
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Informations du Permis
                        </h2>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                    <input
                                        type="text"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        placeholder="JANVIER"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                                    <input
                                        type="text"
                                        name="prenom"
                                        value={formData.prenom}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        placeholder="MAOMBI PATAOLI"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de Naissance</label>
                                    <input
                                        type="date"
                                        name="dateNaissance"
                                        value={formData.dateNaissance}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Lieu de Naissance</label>
                                    <input
                                        type="text"
                                        name="lieuNaissance"
                                        value={formData.lieuNaissance}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        placeholder="BUKAVU"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nationalité</label>
                                <input
                                    type="text"
                                    name="nationalite"
                                    value={formData.nationalite}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                                <textarea
                                    name="adresse"
                                    value={formData.adresse}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    rows="2"
                                    placeholder="53, AV. DE LA MISSION GOMA"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de Permis (Auto-généré)</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            name="licenseNumber"
                                            value={formData.licenseNumber}
                                            onChange={handleInputChange}
                                            className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-50"
                                            placeholder="AAA25NZSKN"
                                            readOnly
                                        />
                                        <button
                                            onClick={handleGenerateNewLicense}
                                            className="px-3 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 flex items-center"
                                            title="Générer nouveau numéro"
                                        >
                                            <RefreshCw className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de Délivrance</label>
                                    <input
                                        type="date"
                                        name="dateDelivrance"
                                        value={formData.dateDelivrance}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date d'Expiration</label>
                                <input
                                    type="date"
                                    name="dateExpiration"
                                    value={formData.dateExpiration}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Catégories</label>
                                <div className="space-y-2">
                                    {categories.map(cat => (
                                        <label key={cat.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                                            <input
                                                type="checkbox"
                                                checked={formData.categories.includes(cat.id)}
                                                onChange={() => handleCategoryChange(cat.id)}
                                                className="w-4 h-4"
                                            />
                                            <span className="text-lg">{cat.icon}</span>
                                            <span className="font-semibold">{cat.id}</span>
                                            <span className="text-sm">{cat.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="hidden"
                                        id="photo-upload"
                                    />
                                    <label
                                        htmlFor="photo-upload"
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                                    >
                                        <Camera className="w-4 h-4" />
                                        Choisir Photo
                                    </label>
                                    {photoPreview && (
                                        <img src={photoPreview} alt="Preview" className="w-16 h-16 object-cover rounded border" />
                                    )}
                                </div>
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
                                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer"
                                    >
                                        <PenLine className="w-4 h-4" />
                                        Choisir Signature
                                    </label>
                                    {signaturePreview && (
                                        <img src={signaturePreview} alt="Signature Preview" className="w-28 h-12 object-contain rounded border" />
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={handlePrint}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
                            >
                                <Printer className="w-4 h-4" />
                                Imprimer le Permis
                            </button>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Aperçu du Permis</h2>
                        {/* Card Preview */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium mb-2">Recto</h3>
                                <CardFront />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium mb-2">Verso</h3>
                                <CardBack />
                            </div>
                        </div>
                    </div>
                </div>

<div>
    <br/>
    <h2 className='text-2xl'>Print layout</h2>
</div>
                {/* Print Layout */}
                <div ref={printRef} className="print-only">
                    <div className="page-break">
                        <CardFront />
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

export default DRCLicenseGenerator;