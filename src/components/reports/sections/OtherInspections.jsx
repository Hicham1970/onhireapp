import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

const OtherInspections = ({ data, onChange }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const handleChange = (e) => {
        onChange({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-5xl space-y-8">
            {/* 17.0 */}
            <div>
                <h3 className={`text-xl font-bold mb-4 border-b pb-2 ${isDark ? 'text-white border-slate-700' : 'text-slate-800 border-slate-200'}`}>17.0 DECK MACHINERY</h3>
                <p className={`text-sm mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Winches, Windlasses, Cranes, etc.</p>
                <textarea
                    name="deckMachinery"
                    value={data.deckMachinery || ''}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y text-sm leading-relaxed ${
                        isDark ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400' : 'border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                    placeholder="Enter deck machinery details..."
                />
            </div>

            {/* 18.0 */}
            <div>
                <h3 className={`text-xl font-bold mb-4 border-b pb-2 ${isDark ? 'text-white border-slate-700' : 'text-slate-800 border-slate-200'}`}>18.0 ENGINE ROOM</h3>
                <textarea
                    name="engineRoom"
                    value={data.engineRoom || ''}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y text-sm leading-relaxed ${
                        isDark ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400' : 'border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                    placeholder="Enter engine room details..."
                />
            </div>

            {/* 19.0 */}
            <div>
                <h3 className={`text-xl font-bold mb-4 border-b pb-2 ${isDark ? 'text-white border-slate-700' : 'text-slate-800 border-slate-200'}`}>19.0 BRIDGE/ACCOMMODATION/GALLEY</h3>
                <textarea
                    name="bridgeAccommodation"
                    value={data.bridgeAccommodation || ''}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y text-sm leading-relaxed ${
                        isDark ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400' : 'border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                    placeholder="Enter bridge, accommodation and galley details..."
                />
            </div>
        </div>
    );
};

export default OtherInspections;

