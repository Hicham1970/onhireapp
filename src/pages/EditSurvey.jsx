import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FuelCalculator } from './FuelCalculator';
import { INITIAL_VESSELS } from './constants';
import { ChevronLeft } from 'lucide-react';
import { updateSurvey } from '../api/api';
import { getSurveys } from '../api/api';

const EditSurvey = () => {
const { currentUser, userData } = useAuth();
  const isAdmin = userData?.role === 'admin';
  const { userId } = useParams();
  const { surveyId } = useParams();
  const navigate = useNavigate();

  // Ship Particulars State - load from survey
  const [shipData, setShipData] = useState({
    name: '',
    date: '',
    owner: '',
    imo: '',
    time: '',
    charterer: '',
    type: 'ONHIRE SURVEY',
    status: 'Completed',
    placeOfSurvey: '',
    callSign: '',
    master: '',
    placeOfDelivery: '',
    chiefEngineer: '',
    draftFwd: '',
    draftAft: '',
    voy: '',
    list: '',
    erTemp: '',
    thermometer: '',
    portOfRegistry: '',
    grossTons: '',
    netTons: '',
    placeOfRedelivery: '',
    redeliveryDate: '',
    surveyCompletedDate: ''
  });
  const [fuelEntries, setFuelEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ((currentUser?.uid && surveyId) || (isAdmin && userId && surveyId)) {
      loadSurvey();
    }
  }, [currentUser, userData, surveyId, userId]);

  const loadSurvey = async () => {
    try {
      const uidToUse = isAdmin ? userId : currentUser.uid;
      const surveys = await getSurveys(uidToUse);
      const foundSurvey = surveys.find(s => s.id === surveyId);
      if (foundSurvey) {
        const data = foundSurvey;
        // Set shipData
        Object.keys(shipData).forEach(key => {
          if (data[key] !== undefined) {
            setShipData(prev => ({ ...prev, [key]: data[key] }));
          }
        });
        // Set fuel entries if exist
        if (data.fuelEntries) {
          setFuelEntries(data.fuelEntries);
        }
      }
    } catch (error) {
      console.error('Error loading survey:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/onhire');
  };

  const handleSave = useCallback(async (entries, finalHFO, finalMGO) => {
    if (!currentUser) {
      alert('Veuillez vous connecter');
      return;
    }
    
    try {
      const uidToUse = isAdmin ? userId : currentUser.uid;
      const surveyData = {
        ...shipData,
        fuelEntries: entries,
        finalHFO,
        finalMGO,
        updatedAt: new Date().toISOString()
      };
      
      await updateSurvey(uidToUse, surveyId, surveyData);
      alert('Survey mis à jour !');
      navigate(isAdmin ? `/admin/dashboard` : '/dashboard');
    } catch (error) {
      console.error('Update error:', error);
      alert('Erreur mise à jour: ' + error.message);
    }
  }, [currentUser, userData, shipData, surveyId, userId, navigate]);

  const updateShipData = (field, value) => {
    setShipData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">

            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            </div>

          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Chargement du survey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button 
            onClick={handleCancel}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            Retour Onhire
          </button>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Editer Expertise
          </h1>
          <div className="w-32" />
        </div>

        {/* Ship Particulars Form */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
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
              <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white border-b border-slate-200 pb-2">
                Vessel Certificates (Marshall Islands)
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Port of Registry</span>
                  <input 
                    type="text" 
                    value={shipData.portOfRegistry}
                    onChange={(e) => updateShipData('portOfRegistry', e.target.value)}
                    className="w-48 px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 font-mono bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Gross/Net Tons</span>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={shipData.grossTons}
                      onChange={(e) => updateShipData('grossTons', e.target.value)}
                      className="w-20 px-2 py-2 border rounded-lg font-mono bg-slate-50 dark:bg-slate-700"
                    />
                    <span>/</span>
                    <input 
                      type="text" 
                      value={shipData.netTons}
                      onChange={(e) => updateShipData('netTons', e.target.value)}
                      className="w-20 px-2 py-2 border rounded-lg font-mono bg-slate-50 dark:bg-slate-700"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Place of Redelivery</span>
                  <input 
                    type="text" 
                    value={shipData.placeOfRedelivery}
                    onChange={(e) => updateShipData('placeOfRedelivery', e.target.value)}
                    className="w-48 px-3 py-2 border rounded-lg bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Redelivery Date/Time</span>
                  <input 
                    type="text" 
                    value={shipData.redeliveryDate}
                    onChange={(e) => updateShipData('redeliveryDate', e.target.value)}
                    className="w-48 px-3 py-2 border rounded-lg bg-slate-50 dark:bg-slate-700 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fuel Calculator */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-1">
          <FuelCalculator 
            tanks={INITIAL_VESSELS[0]?.tanks || []} 
            onSave={handleSave}
            initialData={fuelEntries}
            shipData={shipData}
            isEditMode={true}
          />
        </div>
      </div>
    </div>
  );
};

export default EditSurvey;

