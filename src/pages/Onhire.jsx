
import React, { useState, useEffect } from 'react';
import { Layout } from './Layout';
import { FuelCalculator } from './FuelCalculator';
import { INITIAL_VESSELS, MOCK_SURVEYS } from './constants';
import { SurveyType } from './types';
import { Plus, History, Ship, Search, ArrowRight, MessageSquare, Send, Sparkles, BarChart3, Settings, ClipboardCheck, Bot, Info, ChevronLeft, Droplets, Ruler, Trash2 } from 'lucide-react';
// import { getMaritimeAssistantResponse } from './services/gemini';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const OnHire = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [vessels] = useState(INITIAL_VESSELS);
  const [surveys, setSurveys] = useState(MOCK_SURVEYS);
  const [isCreatingSurvey, setIsCreatingSurvey] = useState(false);
  const [selectedVessel, setSelectedVessel] = useState(null);
  const [detailedVessel, setDetailedVessel] = useState(null);
  const [surveyDetails, setSurveyDetails] = useState({
    client: '',
    owner: '',
    charterer: '',
    location: 'New Port Location',
    surveyType: 'ONHIRE SURVEY',
    fromTime: '',
    toTime: '',
    draftFwd: '',
    draftAft: '',
    voy: '',
    list: '',
    er: '',
    thermometer: '',
    vesselNameEditable: '',
    logBookEntries: []
  });
  
  // AI Assistant State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleCreateSurvey = (vessel) => {
    setSelectedVessel(vessel);
    setSurveyDetails({
      client: vessel.client || '',
      owner: vessel.owner || '',
      charterer: vessel.charterer || '',
      location: 'New Port Location',
      surveyType: 'ONHIRE SURVEY',
      fromTime: '',
      toTime: '',
      draftFwd: '',
      draftAft: '',
      voy: '',
      list: '',
      er: '',
      thermometer: '',
      vesselNameEditable: vessel.name
    });
    setIsCreatingSurvey(true);
  };

  const handleSaveSurvey = (entries, manualHfo, manualMgo) => {
    if (!selectedVessel) return;

    const calculatedHFO = entries.reduce((acc, e) => {
      const tank = selectedVessel.tanks.find(t => t.id === e.tankId);
      return tank?.fuelType.includes('HFO') || tank?.fuelType.includes('VLSFO') ? acc + (e.correctedVolume || 0) : acc;
    }, 0);

    const calculatedMGO = entries.reduce((acc, e) => {
      const tank = selectedVessel.tanks.find(t => t.id === e.tankId);
      return tank?.fuelType.includes('MGO') || tank?.fuelType.includes('LSMGO') ? acc + (e.correctedVolume || 0) : acc;
    }, 0);

    const finalHFO = manualHfo !== undefined ? manualHfo : calculatedHFO;
    const finalMGO = manualMgo !== undefined ? manualMgo : calculatedMGO;

    const newSurvey = {
      id: `s-${Date.now()}`,
      vesselName: surveyDetails.vesselNameEditable || selectedVessel.name,
      vesselImo: selectedVessel.imo,
      date: new Date().toISOString().split('T')[0],
      location: surveyDetails.location,
      type: surveyDetails.surveyType,
      client: surveyDetails.client,
      charterer: surveyDetails.charterer,
      owner: surveyDetails.owner,
      fromTime: surveyDetails.fromTime,
      toTime: surveyDetails.toTime,
      draftFwd: surveyDetails.draftFwd,
      draftAft: surveyDetails.draftAft,
      voy: surveyDetails.voy,
      list: surveyDetails.list,
      er: surveyDetails.er,
      thermometer: surveyDetails.thermometer,
      soundings: entries,
      totalHFO: parseFloat(finalHFO.toFixed(2)),
      totalMGO: parseFloat(finalMGO.toFixed(2)),
      status: 'Completed'
    };

    setSurveys([newSurvey, ...surveys]);
    setIsCreatingSurvey(false);
    setSelectedVessel(null);
    setActiveTab('surveys');
  };

  const handleAiConsult = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    const response = await getMaritimeAssistantResponse(aiPrompt);
    setAiResponse(response || '');
    setIsAiLoading(false);
  };

  const handleAddLogBookEntry = () => {
    const newEntry = {
      id: Date.now(),
      pilotStation: '',
      time: '',
      date: '',
      vlsfo: '',
      hsfo: '',
      mdo: '',
      lsmgo: ''
    };
    setSurveyDetails(prev => ({
      ...prev,
      logBookEntries: [...(prev.logBookEntries || []), newEntry]
    }));
  };

  const handleUpdateLogBookEntry = (entryId, field, value) => {
    setSurveyDetails(prev => ({
      ...prev,
      logBookEntries: prev.logBookEntries.map(entry =>
        entry.id === entryId ? { ...entry, [field]: value } : entry
      )
    }));
  };

  const handleDeleteLogBookEntry = (entryId) => {
    setSurveyDetails(prev => ({
      ...prev,
      logBookEntries: prev.logBookEntries.filter(entry => entry.id !== entryId)
    }));
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <header className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-blue-600 tracking-tight">Fleet Dashboard</h1>
                <p className="text-slate-500 mt-1">Operational summary and fuel trends.</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setActiveTab('surveys')}
                  className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  <History className="w-4 h-4" />
                  View History
                </button>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 border-l-emerald-500">
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Active Charters</p>
                <p className="text-4xl font-bold text-slate-900 mt-2">12</p>
                <div className="mt-4 flex items-center gap-1 text-green-600 text-sm font-medium">
                  <ArrowRight className="w-4 h-4" />
                  <span>+2 this month</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total ROB (HFO)</p>
                <p className="text-4xl font-bold text-slate-900 mt-2">5,420 <span className="text-lg font-normal text-slate-400">MT</span></p>
                <div className="mt-4 flex items-center gap-1 text-blue-600 text-sm font-medium">
                  <BarChart3 className="w-4 h-4" />
                  <span>Fleet average: 450 MT/vessel</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 border-l-rose-500">
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Pending Surveys</p>
                <p className="text-4xl font-bold text-red-600 mt-2">3</p>
                <div className="mt-4 flex items-center gap-1 text-red-600 text-sm font-medium">
                  <Settings className="w-4 h-4" />
                  <span>Overdue: 1</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-80 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-slate-800 mb-6">Fuel Inventory Trends (Last 7 Days)</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { day: 'Mon', hfo: 5200 },
                    { day: 'Tue', hfo: 5100 },
                    { day: 'Wed', hfo: 5400 },
                    { day: 'Thu', hfo: 5350 },
                    { day: 'Fri', hfo: 5420 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Line type="monotone" dataKey="hfo" stroke="#2563eb" strokeWidth={3} dot={{ fill: '#2563eb' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-semibold text-slate-800 mb-4">Upcoming Offhires</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold shadow-sm">V{i}</div>
                        <div>
                          <p className="font-medium text-slate-900">Vessel Delta {i}</p>
                          <p className="text-xs text-slate-500">Scheduled: May {20 + i}, 2024</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SURVEYS TAB */}
        {activeTab === 'surveys' && (
          <div className="space-y-6">
            {!isCreatingSurvey ? (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-900">Onhire / Offhire Reports</h2>
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Search vessel or IMO..." 
                        className="pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vessels.map(v => (
                    <div key={v.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                          <Ship className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">IMO {v.imo}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{v.name}</h3>
                      <p className="text-slate-500 text-sm mb-6">{v.type}</p>
                      
                      <button 
                        onClick={() => handleCreateSurvey(v)}
                        className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200"
                      >
                        <Plus className="w-4 h-4" />
                        New Survey
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mt-8">
                  <div className="p-4 bg-slate-50 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-800">Recent Reports</h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {surveys.map(s => (
                      <div key={s.id} className="p-4 flex flex-wrap md:flex-nowrap items-center gap-6 hover:bg-slate-50 transition-colors">
                        <div className="w-12 h-12 bg-slate-100 rounded flex items-center justify-center text-slate-400">
                          <ClipboardCheck className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-[200px]">
                          <p className="font-bold text-slate-900">{s.vesselName}</p>
                          <p className="text-xs text-slate-500">{s.date} • {s.location}</p>
                        </div>
                        <div className="flex-1">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            s.type === SurveyType.ONHIRE ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {s.type}
                          </span>
                        </div>
                        <div className="flex gap-8">
                          <div className="text-right">
                            <p className="text-xs text-slate-400 uppercase font-bold">HFO ROB</p>
                            <p className="font-mono font-bold text-slate-900">{s.totalHFO} MT</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-slate-400 uppercase font-bold">MGO ROB</p>
                            <p className="font-mono font-bold text-slate-900">{s.totalMGO} MT</p>
                          </div>
                        </div>
                        <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg">
                          Details
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <button 
                  onClick={() => setIsCreatingSurvey(false)}
                  className="text-slate-500 flex items-center gap-2 hover:text-slate-900 font-medium transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Cancel Survey
                </button>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Bunker Survey Report</h2>
                    <div className="space-y-6">
                      
                      {/* Vessel Information Section */}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-200">Vessel Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">M/V: Vessel Name</label>
                            <input
                              type="text"
                              value={surveyDetails.vesselNameEditable}
                              onChange={(e) => setSurveyDetails({ ...surveyDetails, vesselNameEditable: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold"
                              placeholder="Vessel name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">IMO Number</label>
                            <input
                              type="text"
                              value={selectedVessel?.imo}
                              disabled
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600 font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Call Sign</label>
                            <input
                              type="text"
                              value={selectedVessel?.callSign || ''}
                              disabled
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600 font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Survey Parties Section */}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-200">Survey Parties</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Client</label>
                            <input
                              type="text"
                              value={surveyDetails.client}
                              onChange={(e) => setSurveyDetails({ ...surveyDetails, client: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Owners</label>
                            <input
                              type="text"
                              value={surveyDetails.owner}
                              onChange={(e) => setSurveyDetails({ ...surveyDetails, owner: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Charterers</label>
                            <input
                              type="text"
                              value={surveyDetails.charterer}
                              onChange={(e) => setSurveyDetails({ ...surveyDetails, charterer: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Survey Date/Time Section */}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-200">Survey Duration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">From: Date & Time</label>
                            <input
                              type="datetime-local"
                              value={surveyDetails.fromTime}
                              onChange={(e) => setSurveyDetails({ ...surveyDetails, fromTime: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">To: Date & Time</label>
                            <input
                              type="datetime-local"
                              value={surveyDetails.toTime}
                              onChange={(e) => setSurveyDetails({ ...surveyDetails, toTime: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Vessel Conditions Section */}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-200">Vessel Conditions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Draft FWD (m)</label>
                            <input
                              type="number"
                              step="0.01"
                              value={surveyDetails.draftFwd}
                              onChange={(e) => setSurveyDetails({ ...surveyDetails, draftFwd: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="3.00"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Draft AFT (m)</label>
                            <input
                              type="number"
                              step="0.01"
                              value={surveyDetails.draftAft}
                              onChange={(e) => setSurveyDetails({ ...surveyDetails, draftAft: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="4.00"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">VOY</label>
                            <input
                              type="text"
                              value={surveyDetails.voy}
                              onChange={(e) => setSurveyDetails({ ...surveyDetails, voy: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">List (°)</label>
                            <input
                              type="number"
                              step="0.01"
                              value={surveyDetails.list}
                              onChange={(e) => setSurveyDetails({ ...surveyDetails, list: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="2.00"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">E.R. T° (°C)</label>
                            <input
                              type="number"
                              step="0.1"
                              value={surveyDetails.er}
                              onChange={(e) => setSurveyDetails({ ...surveyDetails, er: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="30.00"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Thermometer</label>
                            <input
                              type="text"
                              value={surveyDetails.thermometer}
                              onChange={(e) => setSurveyDetails({ ...surveyDetails, thermometer: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="CIAS"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Other Details Section */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-200">Other Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Location/Port</label>
                              <input
                                type="text"
                                value={surveyDetails.location}
                                onChange={(e) => setSurveyDetails({ ...surveyDetails, location: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Port of delivery"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Survey Type</label>
                              <select 
                                value={surveyDetails.surveyType}
                                onChange={(e) => setSurveyDetails({ ...surveyDetails, surveyType: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                              >
                                <option>ONHIRE SURVEY</option>
                                <option>OFFHIRE SURVEY</option>
                                <option>BUNKERING REPORT</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Log Book Table Section */}
                        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                            <h4 className="font-semibold text-slate-800">Abstract of Log Book</h4>
                            <button
                              onClick={handleAddLogBookEntry}
                              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                              Add Entry
                            </button>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-slate-100 border-b border-slate-200">
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Arrival Pilot Station</th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Time (Hrs. L.T.)</th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Date</th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">VLSFO (T)</th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">HSFO (T)</th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">MDO (T)</th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">LSMGO (T)</th>
                                  <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {surveyDetails.logBookEntries && surveyDetails.logBookEntries.length > 0 ? (
                                  surveyDetails.logBookEntries.map((entry) => (
                                    <tr key={entry.id} className="border-b border-slate-200 hover:bg-slate-50">
                                      <td className="px-4 py-3">
                                        <input
                                          type="text"
                                          value={entry.pilotStation}
                                          onChange={(e) => handleUpdateLogBookEntry(entry.id, 'pilotStation', e.target.value)}
                                          className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                          placeholder="Station name"
                                        />
                                      </td>
                                      <td className="px-4 py-3">
                                        <input
                                          type="text"
                                          value={entry.time}
                                          onChange={(e) => handleUpdateLogBookEntry(entry.id, 'time', e.target.value)}
                                          className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                          placeholder="HH:MM"
                                        />
                                      </td>
                                      <td className="px-4 py-3">
                                        <input
                                          type="date"
                                          value={entry.date}
                                          onChange={(e) => handleUpdateLogBookEntry(entry.id, 'date', e.target.value)}
                                          className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                      </td>
                                      <td className="px-4 py-3">
                                        <input
                                          type="number"
                                          value={entry.vlsfo}
                                          onChange={(e) => handleUpdateLogBookEntry(entry.id, 'vlsfo', e.target.value)}
                                          className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                          placeholder="0"
                                          step="0.01"
                                        />
                                      </td>
                                      <td className="px-4 py-3">
                                        <input
                                          type="number"
                                          value={entry.hsfo}
                                          onChange={(e) => handleUpdateLogBookEntry(entry.id, 'hsfo', e.target.value)}
                                          className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                          placeholder="0"
                                          step="0.01"
                                        />
                                      </td>
                                      <td className="px-4 py-3">
                                        <input
                                          type="number"
                                          value={entry.mdo}
                                          onChange={(e) => handleUpdateLogBookEntry(entry.id, 'mdo', e.target.value)}
                                          className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                          placeholder="0"
                                          step="0.01"
                                        />
                                      </td>
                                      <td className="px-4 py-3">
                                        <input
                                          type="number"
                                          value={entry.lsmgo}
                                          onChange={(e) => handleUpdateLogBookEntry(entry.id, 'lsmgo', e.target.value)}
                                          className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                          placeholder="0"
                                          step="0.01"
                                        />
                                      </td>
                                      <td className="px-4 py-3 text-center">
                                        <button
                                          onClick={() => handleDeleteLogBookEntry(entry.id)}
                                          className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors"
                                        >
                                          <Trash2 className="w-4 h-4 inline" />
                                        </button>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="8" className="px-4 py-6 text-center text-slate-500 text-sm">
                                      No entries yet. Click "Add Entry" to start logging fuel data.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedVessel && (
                  <FuelCalculator tanks={selectedVessel.tanks} onSave={handleSaveSurvey} />
                )}
              </div>
            )}
          </div>
        )}

        {/* AI CONSULTANT TAB */}
        {activeTab === 'ai' && (
          <div className="space-y-6">
            <header className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
                <Bot className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">AI Maritime Consultant</h1>
                <p className="text-slate-500">Technical insights on fuel standards, ASTM tables, and BIMCO clauses.</p>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-indigo-600" />
                      Consult Technical Engine
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-widest">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Powered by Gemini
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="min-h-[300px] prose prose-slate max-w-none">
                      {aiResponse ? (
                        <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                          {aiResponse}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-[300px] text-slate-400 space-y-4">
                          <Bot className="w-12 h-12 opacity-20" />
                          <p>Ask a question about ship fuel calculations, density corrections, or charter transitions.</p>
                          <div className="flex flex-wrap gap-2 justify-center max-w-sm">
                            <button onClick={() => setAiPrompt("How do I calculate VCF for HFO at 45°C?")} className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-full transition-colors">How to calculate VCF?</button>
                            <button onClick={() => setAiPrompt("Explain BIMCO Fuel Quality Clause 2024")} className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-full transition-colors">BIMCO Clause help</button>
                            <button onClick={() => setAiPrompt("Common disputes in offhire ROB surveys")} className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-full transition-colors">Dispute risks</button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <input 
                        type="text" 
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAiConsult()}
                        placeholder="e.g., 'What are the density correction factors for LSMGO at 25°C?'"
                        className="flex-1 px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                      />
                      <button 
                        onClick={handleAiConsult}
                        disabled={isAiLoading || !aiPrompt.trim()}
                        className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:from-slate-300 disabled:to-slate-400 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-200 active:scale-95"
                      >
                        {isAiLoading ? 'Analyzing...' : (
                          <>
                            <Send className="w-5 h-5" />
                            Consult
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-xl border border-slate-700">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-400" />
                    Quick Reference
                  </h4>
                  <div className="space-y-4 text-sm text-slate-300">
                    <div className="p-3 bg-slate-800 rounded-lg">
                      <p className="text-blue-400 font-bold mb-1">Density @ 15°C</p>
                      <p>Standard temperature for quantity measurement.</p>
                    </div>
                    <div className="p-3 bg-slate-800 rounded-lg">
                      <p className="text-blue-400 font-bold mb-1">ASTM Table 54B</p>
                      <p>Used for volume correction of generalized petroleum products.</p>
                    </div>
                    <div className="p-3 bg-slate-800 rounded-lg">
                      <p className="text-blue-400 font-bold mb-1">Sludge/Water</p>
                      <p>Ensure to subtract free water and account for sludge in waste tanks.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 rounded-2xl p-6">
                  <h4 className="font-bold text-slate-800 mb-2">Charterer Transition Tip</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    When transitioning from Charter A to Charter B, ensure a joint ROB survey is signed by the Master and both Surveyors to prevent quantity disputes at redelivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VESSELS TAB */}
        {activeTab === 'vessels' && (
          <div className="space-y-6">
            {!detailedVessel ? (
              <>
                <h2 className="text-2xl font-bold text-slate-900">Fleet Management</h2>
                <div className="bg-white rounded-xl border border-slate-200">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold">
                        <tr>
                          <th className="px-6 py-4">Vessel Name</th>
                          <th className="px-6 py-4">IMO Number</th>
                          <th className="px-6 py-4">Type</th>
                          <th className="px-6 py-4">Tank Count</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {vessels.map(v => (
                          <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-bold text-slate-900">{v.name}</td>
                            <td className="px-6 py-4 text-slate-500 font-mono">{v.imo}</td>
                            <td className="px-6 py-4 text-slate-600">{v.type}</td>
                            <td className="px-6 py-4 font-medium">{v.tanks.length} Tanks</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">IN SERVICE</span>
                            </td>
                            <td className="px-6 py-4">
                              <button 
                                onClick={() => setDetailedVessel(v)}
                                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
                              >
                                View Details
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <button 
                  onClick={() => setDetailedVessel(null)}
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Fleet List
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Vessel Profile Card */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-4">
                        <Ship className="w-8 h-8" />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Vessel Name</label>
                          <input
                            type="text"
                            value={detailedVessel.name}
                            onChange={(e) => setDetailedVessel({ ...detailedVessel, name: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">IMO Number</label>
                          <input
                            type="text"
                            value={detailedVessel.imo}
                            onChange={(e) => setDetailedVessel({ ...detailedVessel, imo: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Call Sign</label>
                          <input
                            type="text"
                            value={detailedVessel.callSign || ''}
                            onChange={(e) => setDetailedVessel({ ...detailedVessel, callSign: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                            placeholder="e.g., WPXA"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Vessel Type</label>
                          <input
                            type="text"
                            value={detailedVessel.type}
                            onChange={(e) => setDetailedVessel({ ...detailedVessel, type: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Flag</label>
                          <input
                            type="text"
                            value={detailedVessel.flag || ''}
                            onChange={(e) => setDetailedVessel({ ...detailedVessel, flag: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Marshall Islands"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Year Built</label>
                          <input
                            type="number"
                            value={detailedVessel.yearBuilt || ''}
                            onChange={(e) => setDetailedVessel({ ...detailedVessel, yearBuilt: parseInt(e.target.value) })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., 2015"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Gross Tonnage</label>
                          <input
                            type="number"
                            value={detailedVessel.tonnage || ''}
                            onChange={(e) => setDetailedVessel({ ...detailedVessel, tonnage: parseInt(e.target.value) })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., 45000"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Client</label>
                          <input
                            type="text"
                            value={detailedVessel.client || ''}
                            onChange={(e) => setDetailedVessel({ ...detailedVessel, client: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Pacific Shipping Co."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Owner</label>
                          <input
                            type="text"
                            value={detailedVessel.owner || ''}
                            onChange={(e) => setDetailedVessel({ ...detailedVessel, owner: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Global Maritime Ltd."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Charterer</label>
                          <input
                            type="text"
                            value={detailedVessel.charterer || ''}
                            onChange={(e) => setDetailedVessel({ ...detailedVessel, charterer: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Ocean Transport Inc."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                          <select
                            value={detailedVessel.status || 'Active'}
                            onChange={(e) => setDetailedVessel({ ...detailedVessel, status: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Under Maintenance">Under Maintenance</option>
                            <option value="Out of Service">Out of Service</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900 rounded-2xl p-6 text-white">
                      <h3 className="font-bold mb-4 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-blue-400" />
                        Storage Summary
                      </h3>
                      <div className="space-y-4">
                        {Array.from(new Set(detailedVessel.tanks.map(t => t.fuelType))).map(fuel => {
                          const total = detailedVessel.tanks
                            .filter(t => t.fuelType === fuel)
                            .reduce((sum, t) => sum + t.capacity, 0);
                          return (
                            <div key={fuel} className="flex justify-between items-end border-b border-slate-800 pb-2">
                              <div>
                                <p className="text-[10px] uppercase text-slate-500 font-bold">{fuel}</p>
                                <p className="text-lg font-bold">{total.toLocaleString()} <span className="text-xs font-normal opacity-50">m³</span></p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Tank Configuration Table */}
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                          <Droplets className="w-5 h-5 text-blue-500" />
                          Tank Configuration
                        </h3>
                        <div className="text-xs text-slate-400">
                          {detailedVessel.tanks.length} Total Tanks
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                            <tr>
                              <th className="px-6 py-4">Tank Name</th>
                              <th className="px-6 py-4">Fuel Type</th>
                              <th className="px-6 py-4">Capacity (100%)</th>
                              <th className="px-6 py-4">Max Weight (Approx)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {detailedVessel.tanks.map(tank => (
                              <tr key={tank.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-semibold text-slate-800">{tank.name}</td>
                                <td className="px-6 py-4">
                                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                                    tank.fuelType.includes('HFO') ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'
                                  }`}>
                                    {tank.fuelType}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                    <Ruler className="w-3 h-3 text-slate-300" />
                                    <span className="font-mono">{tank.capacity.toFixed(2)} m³</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500">
                                  {(tank.capacity * (tank.fuelType.includes('HFO') ? 0.99 : 0.85)).toFixed(2)} MT
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="p-4 bg-slate-50 border-t border-slate-100">
                        <p className="text-[10px] text-slate-400 italic">
                          * Capacities shown are 100% volume. Safe working capacity is usually 98% for HFO and 95% for MGO.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </Layout>
  );
};

export default OnHire;
