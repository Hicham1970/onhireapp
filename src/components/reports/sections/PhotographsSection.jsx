import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { Camera, Trash2 } from 'lucide-react';

const PhotographsSection = ({ data, onChange }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    
    // Initialisation sécurisée des données
    const hullImages = data?.hullImages || [];
    const forecastleImages = data?.forecastleImages || [];
    const mainDeckImages = data?.mainDeckImages || [];
    const aftDeckImages = data?.aftDeckImages || [];
    const hatchCoversImages = data?.hatchCoversImages || [];
    const wheelHouseImages = data?.wheelHouseImages || [];
    const bridgeDeckImages = data?.bridgeDeckImages || [];
    const lifeboatImages = data?.lifeboatImages || [];
    const engineRoomImages = data?.engineRoomImages || [];
    const bunkerRobImages = data?.bunkerRobImages || [];
    const hullIntro = data?.hullIntro || '';
    const hullOutro = data?.hullOutro || '';
    const forecastleIntro = data?.forecastleIntro || '';
    const mainDeckIntro = data?.mainDeckIntro || '';
    const aftDeckIntro = data?.aftDeckIntro || '';
    const hatchCoversIntro = data?.hatchCoversIntro || '';
    const wheelHouseIntro = data?.wheelHouseIntro || '';
    const bridgeDeckIntro = data?.bridgeDeckIntro || '';
    const lifeboatIntro = data?.lifeboatIntro || '';
    const engineRoomIntro = data?.engineRoomIntro || '';
    const bunkerRobIntro = data?.bunkerRobIntro || '';

    const handleTextChange = (e) => {
        onChange({ ...data, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e, sectionKey) => {
        const files = Array.from(e.target.files);
        const currentImages = data?.[sectionKey] || [];

        const promises = files.map(file => new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    resolve({
                        id: Date.now() + Math.random(),
                        src: event.target.result,
                        file: file,
                        date: new Date().toLocaleDateString(),
                        description: "",
                        width: img.width,
                        height: img.height
                    });
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }));

        Promise.all(promises).then(newImages => {
            onChange({ ...data, [sectionKey]: [...currentImages, ...newImages] });
        });
    };

    const updateImageDescription = (id, text, sectionKey) => {
        const currentImages = data?.[sectionKey] || [];
        const updatedImages = currentImages.map(img => 
            img.id === id ? { ...img, description: text } : img
        );
        onChange({ ...data, [sectionKey]: updatedImages });
    };

    const deleteImage = (id, sectionKey) => {
        const currentImages = data?.[sectionKey] || [];
        const updatedImages = currentImages.filter(img => img.id !== id);
        onChange({ ...data, [sectionKey]: updatedImages });
    };

    const renderImageGrid = (images, sectionKey) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((img, idx) => (
                <div key={img.id} className={`p-4 rounded-xl border flex flex-col gap-3 ${
                    isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}>
                    <div className={`relative aspect-video bg-white rounded-lg overflow-hidden flex items-center justify-center border ${
                        isDark ? 'border-slate-600' : 'border-slate-100'
                    }`}>
                        <img src={img.src} alt={`Photo ${idx + 1}`} className="w-full h-full object-contain" />
                        <button 
                            onClick={() => deleteImage(img.id, sectionKey)}
                            className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm backdrop-blur-sm"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                    <textarea 
                        value={img.description || ""} 
                        onChange={(e) => updateImageDescription(img.id, e.target.value, sectionKey)}
                        placeholder="Photo description..." 
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none ${
                            isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'border-slate-300 text-slate-900 placeholder-slate-400'
                        }`}
                        rows="2"
                    />
                </div>
            ))}
        </div>
    );

    const renderPhotoSection = (title, introKey, introValue, imagesKey, images, introRows) => (
        <div className={`p-6 rounded-xl border shadow-sm space-y-6 ${
            isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
        }`}>
            <h4 className={`text-lg font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{title}</h4>
            
            <textarea
                name={introKey}
                value={introValue}
                onChange={handleTextChange}
                rows={introRows}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y text-sm leading-relaxed ${
                    isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
                placeholder="Enter description..."
            />

            <div className="flex justify-end">
                <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 transition-colors shadow-sm">
                    <Camera className="w-4 h-4" />
                    Add Photos
                    <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, imagesKey)} />
                </label>
            </div>

            {renderImageGrid(images, imagesKey)}
        </div>
    );

    return (
        <div className="max-w-5xl space-y-8">
            <h3 className={`text-xl font-bold border-b pb-4 ${isDark ? 'text-white border-slate-700' : 'text-slate-800 border-slate-200'}`}>20.0 PHOTOGRAPHS</h3>

            {/* 1/ HULL (EXTERNAL) */}
            <div className={`p-6 rounded-xl border shadow-sm space-y-6 ${
                isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
            }`}>
                <h4 className={`text-lg font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>1/ HULL (EXTERNAL)</h4>
                
                {/* Texte d'introduction */}
                <textarea
                    name="hullIntro"
                    value={hullIntro}
                    onChange={handleTextChange}
                    rows="5"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y text-sm leading-relaxed ${
                        isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                    placeholder="Enter introduction text..."
                />

                {/* Bouton d'ajout de photos */}
                <div className="flex justify-end">
                    <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 transition-colors shadow-sm">
                        <Camera className="w-4 h-4" />
                        Add Photos
                        <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'hullImages')} />
                    </label>
                </div>

                {renderImageGrid(hullImages, 'hullImages')}

                {/* Texte de conclusion */}
                <textarea
                    name="hullOutro"
                    value={hullOutro}
                    onChange={handleTextChange}
                    rows="3"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y text-sm leading-relaxed ${
                        isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                    placeholder="Enter concluding text..."
                />
            </div>

            {renderPhotoSection('2/ FORECASTLE', 'forecastleIntro', forecastleIntro, 'forecastleImages', forecastleImages, 8)}
            {renderPhotoSection('3/ MAIN DECK', 'mainDeckIntro', mainDeckIntro, 'mainDeckImages', mainDeckImages, 6)}
            {renderPhotoSection('4/ AFT DECK', 'aftDeckIntro', aftDeckIntro, 'aftDeckImages', aftDeckImages, 6)}
            {renderPhotoSection('5/ HATCH COVERS & CARGO HOLDS', 'hatchCoversIntro', hatchCoversIntro, 'hatchCoversImages', hatchCoversImages, 8)}
            {renderPhotoSection('6/ WHEEL HOUSE', 'wheelHouseIntro', wheelHouseIntro, 'wheelHouseImages', wheelHouseImages, 8)}
            {renderPhotoSection('7/ BRIDGE DECK', 'bridgeDeckIntro', bridgeDeckIntro, 'bridgeDeckImages', bridgeDeckImages, 4)}
            {renderPhotoSection('8/ LIFEBOAT', 'lifeboatIntro', lifeboatIntro, 'lifeboatImages', lifeboatImages, 8)}
            {renderPhotoSection('9/ ENGINE ROOM', 'engineRoomIntro', engineRoomIntro, 'engineRoomImages', engineRoomImages, 10)}
            {renderPhotoSection('10/ VIEW OF THE ACTIVITY MEASURING BUNKER ROB', 'bunkerRobIntro', bunkerRobIntro, 'bunkerRobImages', bunkerRobImages, 4)}
        </div>
    );
};

export default PhotographsSection;

