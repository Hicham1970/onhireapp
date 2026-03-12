import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

const ShipPersonnel = ({ data, onChange }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const handleChange = (e) => {
        onChange({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-800'}`}>1.0 SHIP PERSONNEL</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="masterName" className={`block text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Master's Name</label>
                    <input 
                        type="text" 
                        id="masterName" 
                        name="masterName" 
                        value={data.masterName || ''} 
                        onChange={handleChange} 
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                            isDark 
                                ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400' 
                                : 'border-slate-300 text-slate-900 placeholder-slate-400'
                        }`} 
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="chiefEngineer" className={`block text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Chief Engineer</label>
                    <input 
                        type="text" 
                        id="chiefEngineer" 
                        name="chiefEngineer" 
                        value={data.chiefEngineer || ''} 
                        onChange={handleChange} 
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                            isDark 
                                ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400' 
                                : 'border-slate-300 text-slate-900 placeholder-slate-400'
                        }`} 
                    />
                </div>
                <div className="space-y-2 col-span-2">
                    <label htmlFor="crewList" className={`block text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Crew List / Comments</label>
                    <textarea 
                        id="crewList" 
                        name="crewList" 
                        rows="4" 
                        value={data.crewList || ''} 
                        onChange={handleChange} 
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                            isDark 
                                ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400' 
                                : 'border-slate-300 text-slate-900 placeholder-slate-400'
                        }`} 
                        placeholder="Enter crew details or any comments..."
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default ShipPersonnel;

