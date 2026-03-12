import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { Plus, Trash2 } from 'lucide-react';

const VesselCertificates = ({ data, onChange }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const certificates = data || [];

    const updateCertificate = (index, field, value) => {
        const updatedCertificates = [...certificates];
        updatedCertificates[index] = { ...updatedCertificates[index], [field]: value };
        onChange(updatedCertificates);
    };

    const addCertificate = () => {
        onChange([...certificates, { name: '', issueDate: '', expiryDate: '' }]);
    };

    const removeCertificate = (index) => {
        onChange(certificates.filter((_, i) => i !== index));
    };

    return (
        <div className="max-w-5xl">
            <h3 className={`text-xl font-bold mb-6 border-b pb-4 ${isDark ? 'text-white border-slate-700' : 'text-slate-800 border-slate-200'}`}>3.0 VESSEL'S CERTIFICATES</h3>
            
            <div className={`rounded-xl overflow-hidden border shadow-sm ${
                isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
            }`}>
                <table className="w-full text-left text-sm">
                    <thead className={`font-semibold border-b ${isDark ? 'bg-slate-700 text-slate-300 border-slate-600' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                        <tr>
                            <th className="px-4 py-3 w-1/2">CERTIFICATE</th>
                            <th className="px-4 py-3">DATE OF ISSUE</th>
                            <th className="px-4 py-3">DATE OF EXPIRY</th>
                            <th className="px-4 py-3 w-10"></th>
                        </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? 'divide-slate-700' : 'divide-slate-100'}`}>
                        {certificates.map((cert, index) => (
                            <tr key={index} className={`hover:${isDark ? 'bg-slate-700' : 'bg-slate-50'} transition-colors`}>
                                <td className="px-4 py-2">
                                    <input 
                                        type="text" 
                                        value={cert.name} 
                                        onChange={(e) => updateCertificate(index, 'name', e.target.value)}
                                        className={`w-full bg-transparent border-none focus:ring-0 p-0 font-medium placeholder-slate-400 ${
                                            isDark ? 'text-white' : 'text-slate-900'
                                        }`}
                                        placeholder="Certificate Name"
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <input 
                                        type="date" 
                                        value={cert.issueDate} 
                                        onChange={(e) => updateCertificate(index, 'issueDate', e.target.value)}
                                        className={`w-full bg-transparent border-none focus:ring-0 p-0 ${
                                            isDark ? 'text-slate-300' : 'text-slate-600'
                                        }`}
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <input 
                                        type="date" 
                                        value={cert.expiryDate} 
                                        onChange={(e) => updateCertificate(index, 'expiryDate', e.target.value)}
                                        className={`w-full bg-transparent border-none focus:ring-0 p-0 ${
                                            isDark ? 'text-slate-300' : 'text-slate-600'
                                        }`}
                                    />
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button 
                                        onClick={() => removeCertificate(index)}
                                        className={`transition-colors p-1 ${isDark ? 'text-slate-400 hover:text-red-400' : 'text-slate-400 hover:text-red-500'}`}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={`p-3 border-t ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'}`}>
                    <button onClick={addCertificate} className={`flex items-center gap-2 text-sm font-bold transition-colors ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                        <Plus className="w-4 h-4" /> Add Certificate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VesselCertificates;

