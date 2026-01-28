import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { saveFullReport } from '../../api/api';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Save, X, Loader
// Importez vos composants de section ici (nous les créerons à l'étape 3 et 4)
import ShipPersonnel from './sections/ShipPersonnel';
import PicturesReport from '../PicturesReport'; // Le composant photo adapté

const reportSections = [
    { id: 'shipPersonnel', title: '1.0 SHIP PERSONNEL' },
    { id: 'vesselParticulars', title: '2.0 VESSEL PARTICULARS' },
    // ... Ajoutez les 18 autres sections ici
    { id: 'photographs', title: '20.0 PHOTOGRAPHS' },
    { id: 'robActivity', title: '21.0 ROB ACTIVITY' },
];

const FullReport = ({ vessel, onCancel, onSaved }) => {
    const { currentUser } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [activeSection, setActiveSection] = useState(reportSections[0].id);
    const [isSaving, setIsSaving] = useState(false);

    // État centralisé pour toutes les données du rapport
    const [reportData, setReportData] = useState({
        vesselId: vessel.id,
        vesselName: vessel.name,
        status: 'draft',
        createdAt: new Date().toISOString(),
        shipPersonnel: { masterName: '', chiefEngineer: '' },
        vesselParticulars: {},
        // ... états initiaux pour chaque section
        photographs: [], // Pour les images
        robActivity: {},
    });

    // Fonction pour mettre à jour une section de données
    const handleDataChange = (section, data) => {
        setReportData(prev => ({ ...prev, [section]: data }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // 1. Traiter et uploader les images
            const uploadedImages = await processAndUploadImages(reportData.photographs, vessel);

            // 2. Préparer les données finales du rapport
            const finalReportData = {
                ...reportData,
                photographs: uploadedImages, // Remplacer les données locales par les URLs finales
                updatedAt: new Date().toISOString(),
            };

            // 3. Sauvegarder dans la Realtime Database
            await saveFullReport(currentUser.uid, finalReportData);

            alert('Rapport sauvegardé avec succès !');
            onSaved(); // Appeler la fonction de rappel pour fermer ou naviguer
        } catch (error) {
            console.error("Erreur lors de la sauvegarde du rapport complet :", error);
            alert("Une erreur est survenue. Voir la console pour les détails.");
        } finally {
            setIsSaving(false);
        }
    };

    // La logique de traitement d'image, déplacée depuis PicturesReport.jsx
    const processAndUploadImages = (images, vessel) => {
        const surveyDate = new Date().toLocaleDateString();
        return Promise.all(
            images.map(async (image) => {
                const offscreenCanvas = document.createElement('canvas');
                const ctx = offscreenCanvas.getContext('2d');
                const blob = await new Promise((resolve, reject) => {
                    const img = new Image();
                    img.crossOrigin = "anonymous";
                    img.src = image.src;
                    img.onload = () => {
                        offscreenCanvas.width = image.width;
                        offscreenCanvas.height = image.height;
                        ctx.drawImage(img, 0, 0);
                        // ... (toute la logique de dessin sur le canvas) ...
                        ctx.fillText(`${vessel.name} | ${surveyDate}`, offscreenCanvas.width - 20, offscreenCanvas.height - 20);
                        // ...
                        offscreenCanvas.toBlob(resolve, 'image/jpeg', 0.9);
                    };
                    img.onerror = reject;
                });

                const imageRef = ref(storage, `reports/${currentUser.uid}/${vessel.id}/${Date.now()}_${image.file.name}`);
                await uploadBytes(imageRef, blob);
                const downloadURL = await getDownloadURL(imageRef);

                return { url: downloadURL, description: image.description, annotations: image.annotations };
            })
        );
    };

    const renderSectionComponent = () => {
        switch (activeSection) {
            case 'shipPersonnel':
                return <ShipPersonnel data={reportData.shipPersonnel} onChange={(data) => handleDataChange('shipPersonnel', data)} />;
            case 'photographs':
                return <PicturesReport vessel={vessel} images={reportData.photographs} onImagesChange={(updater) => setReportData(prev => ({ ...prev, photographs: updater(prev.photographs) }))} />;
            // Ajoutez un 'case' pour chaque section
            // case 'vesselParticulars':
            //     return <VesselParticulars data={reportData.vesselParticulars} onChange={(data) => handleDataChange('vesselParticulars', data)} />;
            default:
                retu
    };

    return (
        <div className="fixed inset-0 bg-slate-800 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-slate-50 dark:bg-slate-900 w-full max-w-7xl h-[90vh] rounded-2xl shadow-2xl flex overflow-hidden transition-colors duration-300">
                {/* Sidebar de navigation */}e-700 p-4 overflow-y-auto">
                    <h2 className="font-bold text-lg mb-1 text-maritime-900 dark:text-maritime-100">{vessel.name}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Rapport d'inspection</p>
                    <nav className="space-y-1"> (
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === section.id ? 'bg-maritime-100 text-maritime-800 dark:bg-maritime-900 dark:text-maritime-200' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                            >
                                {section.title}
                            </button>
                        ))}
                    </nav>

                {/* Contenu principal */}
                <main className="w-3/4 flex flex-col">
                    <header className="flex justify-end items-center p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                        {/* Toggle Dark Mode */}
                        <button 
                            onClick={toggleTheme} 
                            className="p-2 mr-4 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 transition-colors"
                            title={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 
                        <button onClick={onCancel} className="bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm border border-slate-200 dark:border-slate-600 mr-3">
                            <X className="w-4 h-4" /> Fermer
                        </button>
                        <button onClick={handleSave} disabled={isSaving} className="bg-maritime-600 hover:bg-maritime-700 dark:bg-maritime-700 dark:hover:bg-maritime-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50">
                            {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {isSaving ? 'Sauvegarde...' : 'Sauvegarder le Rapport'}
                        </button>
                    </header>
                    <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                        {renderSectionComponent()}
                    </div>
                </main>
            </div>
    );
};

export default FullReport;
