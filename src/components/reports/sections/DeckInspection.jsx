import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

const DeckInspection = ({ data, onChange }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const sections = [
        { key: 'forecastle', title: '9.0 FORECASTLE' },
        { key: 'shellPlating', title: '10.0 SHELL PLATING' },
        { key: 'mainDeck', title: '11.0 MAIN DECK' },
        { key: 'poopDeck', title: '12.0 POOP DECK' },
        { key: 'hatchCovers', title: '13.0 HATCH COVER PANELS' }
    ];

    const handleConditionChange = (sectionKey, condition) => {
        onChange({
            ...data,
            [sectionKey]: { ...data[sectionKey], condition }
        });
    };

    const handleCommentChange = (sectionKey, comments) => {
        onChange({
            ...data,
            [sectionKey]: { ...data[sectionKey], comments }
        });
    };

    return (
        <div className="max-w-5xl space-y-8">
            {sections.map((section) => (
                <div key={section.key} className={`p-6 rounded-xl border shadow-sm ${
                    isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                }`}>
                    <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>{section.title}</h3>
                    
                    <div className="mb-4">
                        <span className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Condition</span>
                        <div className="flex gap-4">
                            {['Good', 'Fair', 'Poor'].map((status) => (
                                <label key={status} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={`${section.key}-condition`}
                                        value={status}
                                        checked={data[section.key]?.condition === status}
                                        onChange={() => handleConditionChange(section.key, status)}
                                        className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                                    />
                                    <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{status}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Comments / Observations</label>
                        <textarea
                            value={data[section.key]?.comments || ''}
                            onChange={(e) => handleCommentChange(section.key, e.target.value)}
                            rows="6"
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm leading-relaxed ${
                                isDark 
                                    ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                                    : 'border-slate-300 text-slate-900 placeholder-slate-400'
                            }`}
                            placeholder={`Enter observations for ${section.title}...`}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DeckInspection;

