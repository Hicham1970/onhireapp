import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FuelCalculator } from './FuelCalculator';
import { INITIAL_VESSELS } from './constants';
import { ChevronLeft } from 'lucide-react';
import { saveSurvey } from '../api/api';
import { generateSurveyPDF, generateCertificatePDF } from '../utils/pdfSurveyGenerator';

const CreateSurvey = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const calculatorRef = React.useRef(null);

  // Ship Particulars State
  const [shipData, setShipData] = useState({
    name: 'SUNDERS KNIGHT',
    date: '2026-03-05',
    owner: 'china buildings co',
    imo: '9388623',
    time: '2026-03-12T12:00',
    charterer: 'Fertiberia Brazil',
    type: 'ONHIRE SURVEY',
    status: 'Completed',
    placeOfSurvey: 'CASABLANCA PORT BERTH R2',
    callSign: 'AZ9ZE1',
    master: 'Wiliams Andrew',
    placeOfDelivery: 'DLOPS',
    chiefEngineer: 'carlos maringa roubio',
    draftFwd: '10.34',
    draftAft: '12.33',
    voy: '12L/26',
    list: '0',
    erTemp: '31',
    thermometer: 'CIAS',
    // Fuel Timeline
    eosPDate: '2023-04-08',
    eosPTime: '19:00',
    eosPHsfo: '0.000',
    eosPLsfo: '917.806',
    eosPHmdo: '0.000',
    eosPLsmgo: '346.751',
    pobDate: '2023-04-08',
    pobTime: '13:18',
    pobHsfo: '0.000',
    pobLsfo: '905.787',
    pobHmdo: '0.000',
    pobLsmgo: '346.751',
    fweDate: '2023-04-08',
    fweTime: '14:30',
    fweHsfo: '0.000',
    fweLsfo: '905.000',
    fweHmdo: '0.000',
    fweLsmgo: '346.751',
    surveyTimeDate: '2023-04-08',
    surveyTimeTime: '17:00',
    surveyTimeHsfo: '0.000',
    surveyTimeLsfo: '900.720',
    surveyTimeHmdo: '0.000',
    surveyTimeLsmgo: '346.751',
    completionDate: '2023-04-08',
    // Certificates
    portOfRegistry: 'MAJURO',
    grossTons: '24,087',
    netTons: '12,210',
    placeOfRedelivery: 'DLOSP CASABLANCA',
    redeliveryDate: '28.09.2025 - 12:00',
    surveyCompletedDate: 'CASABLANCA - 15:00'
  });

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const handleSave = useCallback(async (entries, finalHFO, finalMGO) => {
    if (!currentUser) {
      alert('Veuillez vous connecter');
      return;
    }
    
    try {
      const surveyData = {
        ...shipData,
        fuelEntries: entries,
        finalHFO,
        finalMGO,
        userId: currentUser.uid,
        createdAt: new Date().toISOString()
      };
      
      const result = await saveSurvey(currentUser.uid, surveyData);
      alert(`Inspection registred  ! ID: ${result.surveyId}`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Save error:', error);
      alert('Registration failed: ' + error.message);
    }
  }, [currentUser, shipData, navigate]);

  const updateShipData = (field, value) => {
    setShipData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 px-4">

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Download PDF Button */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Download PDF & Save</h3>
            <div className="flex gap-4">
              <button 
                onClick={async () => {
                  const calcData = calculatorRef.current?.getCurrentData();
                  if (!calcData) {
                     alert("Veuillez d'abord initialiser le calculateur.");
                     return;
                  }
                  try {
                    await generateSurveyPDF(shipData, calcData);
                  } catch (e) {
                    alert("Erreur lors de la génération du PDF: " + e.message);
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transition-all"
              >
                📄 Download PDF Bunker Survey
              </button>
              <button 
                onClick={async () => {
                  const calcData = calculatorRef.current?.getCurrentData();
                  if (!calcData) {
                    alert("Veuillez remplir le calculateur.");
                    return;
                  }
                  try {
                    await generateCertificatePDF(shipData, calcData);
                  } catch (e) {
                    alert("Erreur certificat PDF: " + e.message);
                  }
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transition-all"
              >
                📜 Download PDF certificate 
              </button>
              <button 
                onClick={async () => {
                  const calcData = calculatorRef.current?.getCurrentData();
                  if (!calcData) {
                    alert("Veuillez remplir le calculateur avant de sauvegarder.");
                    return;
                  }
                  await handleSave(calcData.entries, calcData.hfoTotal, calcData.mgoTotal);
                }}
                className="bg-slate-900 hover:bg-black text-white px-8 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg hover:shadow-xl transition-all"
              >
                💾 Finalize To DataBase
              </button>

            </div>
          </div>


        {/* Header */}
        <div className="flex items-center justify-between">
          <button 
            onClick={handleCancel}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            Back

          </button>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            New Inspection?
          </h1>
          <div className="w-32" />
        </div>

        {/* Ship Particulars Form */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
            Ship Particulars
          </h2>

          {/* Main Particulars - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Name</label>
              <input 
                type="text" 
                value={shipData.name}
                onChange={(e) => updateShipData('name', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white transition-all"
                placeholder="Ship name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">IMO</label>
              <input 
                type="text" 
                value={shipData.imo}
                onChange={(e) => updateShipData('imo', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white font-mono"
                placeholder="IMO Number"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Call Sign</label>
              <input 
                type="text" 
                value={shipData.callSign}
                onChange={(e) => updateShipData('callSign', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white font-mono uppercase"
                placeholder="Call Sign"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Owner</label>
              <input 
                type="text" 
                value={shipData.owner}
                onChange={(e) => updateShipData('owner', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Charterer</label>
              <input 
                type="text" 
                value={shipData.charterer}
                onChange={(e) => updateShipData('charterer', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Master</label>
              <input 
                type="text" 
                value={shipData.master}
                onChange={(e) => updateShipData('master', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>
          </div>

          {/* Survey Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Date</label>
              <input 
                type="date" 
                value={shipData.date}
                onChange={(e) => updateShipData('date', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Survey Type</label>
              <select 
                value={shipData.type}
                onChange={(e) => updateShipData('type', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
              >
                <option>ONHIRE SURVEY</option>
                <option>OFFHIRE SURVEY</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Place of Survey</label>
              <input 
                type="text" 
                value={shipData.placeOfSurvey}
                onChange={(e) => updateShipData('placeOfSurvey', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Draft FWD (m)</label>
              <input 
                type="number" 
                step="0.01"
                value={shipData.draftFwd}
                onChange={(e) => updateShipData('draftFwd', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Draft AFT (m)</label>
              <input 
                type="number" 
                step="0.01"
                value={shipData.draftAft}
                onChange={(e) => updateShipData('draftAft', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Chief Engineer</label>
              <input 
                type="text" 
                value={shipData.chiefEngineer}
                onChange={(e) => updateShipData('chiefEngineer', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>
          </div>

          {/* Certificates Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="dark:text-slate-200">Port of Registry</span>
                  <input 
                    type="text" 
                    value={shipData.portOfRegistry}
                    onChange={(e) => updateShipData('portOfRegistry', e.target.value)}
                    className="w-48 px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 font-mono bg-slate-50 dark:bg-slate-700 dark:text-white"
                  />
                </div>
                <div className="flex justify-between">
                  <span className=" dark:text-slate-200">Gross/Net Tons</span>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={shipData.grossTons}
                      onChange={(e) => updateShipData('grossTons', e.target.value)}
                      className="w-20 px-2 py-2 border rounded-lg font-mono bg-slate-50 dark:text-white dark:bg-slate-700"
                    />
                    <span>/</span>
                    <input 
                      type="text" 
                      value={shipData.netTons}
                      onChange={(e) => updateShipData('netTons', e.target.value)}
                      className="w-20 px-2 py-2 border rounded-lg font-mono bg-slate-50 dark:text-white dark:bg-slate-700"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="dark:text-slate-200">Place of Redelivery</span>
                  <input 
                    type="text" 
                    value={shipData.placeOfRedelivery}
                    onChange={(e) => updateShipData('placeOfRedelivery', e.target.value)}
                    className="w-48 px-3 py-2 dark:text-white border rounded-lg bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text- dark:text-slate-200">Redelivery Date/Time</span>
                  <input 
                    type="text" 
                    value={shipData.redeliveryDate}
                    onChange={(e) => updateShipData('redeliveryDate', e.target.value)}
                    className="w-48 px-3 py-2 dark:text-white border rounded-lg bg-slate-50 dark:bg-slate-700 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fuel Timeline Table */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-xl mb-8">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">F</div>
            Fuel Timeline
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-4 text-left w-48">Event</th>
                  <th className="p-4 text-center">DATE</th>
                  <th className="p-4 text-left">TIME</th>
                  <th className="p-4 text-left">H.S.F.O.</th>
                  <th className="p-4 text-left">L.S.F.O.</th>
                  <th className="p-4 text-left">H.M.D.O.</th>
                  <th className="p-4 text-left">L.S.M.G.O.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">E.O.S.P.</td>
                  <td className="p-4">
                    <input type="date" value={shipData.eosPDate} onChange={(e) => updateShipData('eosPDate', e.target.value)} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 font-mono" />
                  </td>
                  <td className="p-4">
                    <input type="time" value={shipData.eosPTime} onChange={(e) => updateShipData('eosPTime', e.target.value)} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 font-mono" />
                  </td>
                  <td className="p-4"><input type="number" step="0.001" value={shipData.eosPHsfo} onChange={(e) => updateShipData('eosPHsfo', e.target.value)} className="w-20 text-right px-2 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-1 focus:ring-blue-500 font-mono" /></td>
                  <td className="p-4"><input type="number" step="0.001" value={shipData.eosPLsfo} onChange={(e) => updateShipData('eosPLsfo', e.target.value)} className="w-20 text-right px-2 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-1 focus:ring-blue-500 font-mono" /></td>
                  <td className="p-4"><input type="number" step="0.001" value={shipData.eosPHmdo} onChange={(e) => updateShipData('eosPHmdo', e.target.value)} className="w-20 text-right px-2 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-1 focus:ring-blue-500 font-mono" /></td>
                  <td className="p-4"><input type="number" step="0.001" value={shipData.eosPLsmgo} onChange={(e) => updateShipData('eosPLsmgo', e.target.value)} className="w-20 text-right px-2 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-1 focus:ring-blue-500 font-mono" /></td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">P.O.B.</td>
                  <td className="p-4">
                    <input type="date" value={shipData.pobDate} onChange={(e) => updateShipData('pobDate', e.target.value)} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 font-mono" />
                  </td>
                  <td className="p-4">
                    <input type="time" value={shipData.pobTime} onChange={(e) => updateShipData('pobTime', e.target.value)} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 font-mono" />
                  </td>
                  <td className="p-4"><input type="number" step="0.001" value={shipData.pobHsfo} onChange={(e) => updateShipData('pobHsfo', e.target.value)} className="w-20 text-right px-2 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-1 focus:ring-blue-500 font-mono" /></td>
                  <td className="p-4"><input type="number" step="0.001" value={shipData.pobLsfo} onChange={(e) => updateShipData('pobLsfo', e.target.value)} className="w-20 text-right px-2 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-1 focus:ring-blue-500 font-mono" /></td>
                  <td className="p-4"><input type="number" step="0.001" value={shipData.pobHmdo} onChange={(e) => updateShipData('pobHmdo', e.target.value)} className="w-20 text-right px-2 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-1 focus:ring-blue-500 font-mono" /></td>
                  <td className="p-4"><input type="number" step="0.001" value={shipData.pobLsmgo} onChange={(e) => updateShipData('pobLsmgo', e.target.value)} className="w-20 text-right px-2 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-1 focus:ring-blue-500 font-mono" /></td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">F.W.E.</td>
                  <td className="p-4">
                    <input type="date" value={shipData.fweDate} onChange={(e) => updateShipData('fweDate', e.target.value)} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 font-mono" />
                  </td>
                  <td className="p-4">
                    <input type="time" value={shipData.fweTime} onChange={(e) => updateShipData('fweTime', e.target.value)} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 font-mono" />
                  </td>
                  <td className="p-4"><input type="number" step="0.001" value={shipData.fweHsfo} onChange={(e) => updateShipData('fweHsfo', e.target.value)} className="w-20 text-right px-2 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-1 focus:ring-blue-500 font-mono" /></td>
                  <td className="p-4"><input type="number" step="0.001" value={shipData.fweLsfo} onChange={(e) => updateShipData('fweLsfo', e.target.value)} className="w-20 text-right px-2 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-1 focus:ring-blue-500 font-mono" /></td>
                  <td className="p-4"><input type="number" step="0.001" value={shipData.fweHmdo} onChange={(e) => updateShipData('fweHmdo', e.target.value)} className="w-20 text-right px-2 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-1 focus:ring-blue-500 font-mono" /></td>
                  <td className="p-4"><input type="number" step="0.001" value={shipData.fweLsmgo} onChange={(e) => updateShipData('fweLsmgo', e.target.value)} className="w-20 text-right px-2 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-1 focus:ring-blue-500 font-mono" /></td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">Time of Survey</td>
                  <td className="p-4">
                    <input type="date" value={shipData.surveyTimeDate} onChange={(e) => updateShipData('surveyTimeDate', e.target.value)} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 font-mono" />
                  </td>
                  <td className="p-4">
                    <input type="time" value={shipData.surveyTimeTime} onChange={(e) => updateShipData('surveyTimeTime', e.target.value)} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 font-mono" />
                  </td>
                  <td className="p-4"><input type="number" step="0.001" value={shipData.surveyTimeHsfo} onChange={(e) => updateShipData('surveyTimeHsfo', e.target.value)} className="w-20 text-right px-2 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-1 focus:ring-blue-500 font-mono" /></td>
                  <td className="p-4"><input type="number" step="0.001" value={shipData.surveyTimeLsfo} onChange={(e) => updateShipData('surveyTimeLsfo', e.target.value)} className="w-20 text-right px-2 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-1 focus:ring-blue-500 font-mono" /></td>
                  <td className="p-4"><input type="number" step="0.001" value={shipData.surveyTimeHmdo} onChange={(e) => updateShipData('surveyTimeHmdo', e.target.value)} className="w-20 text-right px-2 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-1 focus:ring-blue-500 font-mono" /></td>
                  <td className="p-4"><input type="number" step="0.001" value={shipData.surveyTimeLsmgo} onChange={(e) => updateShipData('surveyTimeLsmgo', e.target.value)} className="w-20 text-right px-2 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-1 focus:ring-blue-500 font-mono" /></td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-900/50">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">Date of Completion of Survey</td>
                  <td className="p-4">
                    <input type="date" value={shipData.completionDate} onChange={(e) => updateShipData('completionDate', e.target.value)} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 font-mono" />
                  </td>
                  <td colSpan="5" className="p-4 text-slate-400 dark:text-slate-500 text-sm italic">No time/fuel data required</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Fuel Calculator */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-1">
          <FuelCalculator 
            ref={calculatorRef}
            tanks={INITIAL_VESSELS[0]?.tanks || []} 
            onSave={handleSave}
            initialData={[]}
            shipData={shipData}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateSurvey;


