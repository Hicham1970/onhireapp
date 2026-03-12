import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

// Composant utilitaire défini à l'extérieur pour éviter le re-rendu et la perte de focus
const InputField = ({ label, name, value, onChange, placeholder, type = "text", className = "", isDark }) => (
    <div className={`space-y-1 ${className}`}>
        <label htmlFor={name} className={`block text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${
                isDark 
                    ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400' 
                    : 'border-slate-300 text-slate-900 placeholder-slate-400'
            }`}
        />
    </div>
);

const VesselParticulars = ({ data, onChange }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...data, [name]: value });
    };

    return (
        <div className="max-w-4xl">
            <h3 className={`text-xl font-bold mb-6 border-b pb-4 ${isDark ? 'text-white border-slate-700' : 'text-slate-800 border-slate-200'}`}>2.0 VESSEL PARTICULARS</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Name of Vessel" name="vesselName" value={data.vesselName} onChange={handleChange} placeholder="MV CHANG HANG BIN HAI" isDark={isDark} />
                <InputField label="Type of Vessel" name="vesselType" value={data.vesselType} onChange={handleChange} placeholder="BULK CARRIER" isDark={isDark} />
                
                <InputField label="Flag / Port of Registry" name="flagRegistry" value={data.flagRegistry} onChange={handleChange} placeholder="SHANGHAI" isDark={isDark} />
                <InputField label="Call Sign" name="callSign" value={data.callSign} onChange={handleChange} placeholder="BUJF" isDark={isDark} />
                
                <InputField label="IMO Number" name="imo" value={data.imo} onChange={handleChange} placeholder="9628764" isDark={isDark} />
                <InputField label="Classifications" name="classifications" value={data.classifications} onChange={handleChange} placeholder="CCS" isDark={isDark} />

                <div className={`md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-lg border ${
                    isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}>
                    <InputField label="Delivered Date / Place Built" name="placeBuilt" value={data.placeBuilt} onChange={handleChange} placeholder="15TH November 2011 / Sanoyas Hishino Meisho Co" isDark={isDark} />
                    <InputField label="Owners" name="owners" value={data.owners} onChange={handleChange} placeholder="Shanghai Ming Wah Shipping Co. Ltd." isDark={isDark} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <InputField label="L.O.A. (m)" name="loa" value={data.loa} onChange={handleChange} placeholder="199.94" isDark={isDark} />
                    <InputField label="L.B.P. (m)" name="lbp" value={data.lbp} onChange={handleChange} placeholder="194.00" isDark={isDark} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="Breadth Molded (m)" name="breadth" value={data.breadth} onChange={handleChange} placeholder="32.26" isDark={isDark} />
                    <InputField label="Depth Molded (m)" name="depthMolded" value={data.depthMolded} onChange={handleChange} placeholder="18.00" isDark={isDark} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="Gross Tonnage (mt)" name="grossTonnage" value={data.grossTonnage} onChange={handleChange} placeholder="33 736" isDark={isDark} />
                    <InputField label="Net Tonnage (mt)" name="netTonnage" value={data.netTonnage} onChange={handleChange} placeholder="19 656" isDark={isDark} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="Summer DWT (mt)" name="summerDeadweight" value={data.summerDeadweight} onChange={handleChange} placeholder="58001.600" isDark={isDark} />
                    <InputField label="Summer Draft (m)" name="summerDraft" value={data.summerDraft} onChange={handleChange} placeholder="12.80" isDark={isDark} />
                </div>
                
                <InputField label="Light Displacement (mt)" name="lightDisplacement" value={data.lightDisplacement} onChange={handleChange} placeholder="11 843" isDark={isDark} />
                <InputField label="Hatches / holds" name="hatchesHolds" value={data.hatchesHolds} onChange={handleChange} placeholder="5/5" isDark={isDark} />
            </div>
        </div>
    );
};

export default VesselParticulars;

