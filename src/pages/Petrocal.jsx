import React, { useState, useEffect } from 'react';
import { Calculator, Copy, RefreshCw, ChevronRight, Sun, Moon, Globe, Menu, X, Zap, Thermometer, Gauge, Droplets, Activity, Database } from 'lucide-react';
import { celsiusToFahrenheit, fahrenheitToCelsius, psiToBar, sgToApi, apiToSg, cStToCP, mjPerM3ToMbtuPerBbl, calculateAllConversions } from '../utils/petrocalFormulas';

const Petrocal = () => {
  const [activeCategory, setActiveCategory] = useState('energy');
  const [inputValue, setInputValue] = useState(42.5);
  const [selectedUnit, setSelectedUnit] = useState('mj_m3');
  const [results, setResults] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const categories = [
    { id: 'energy', icon: Zap, label: 'Energy Units', units: ['MJ/m³', 'MBTU/bbl', 'BTU/gal', 'kCal'] },
    { id: 'temperature', icon: Thermometer, label: 'Temperature', units: ['°F', '°C'] },
    { id: 'pressure', icon: Gauge, label: 'Pressure', units: ['psi', 'bar'] },
    { id: 'density', icon: Droplets, label: 'Oil Density & Gravity', units: ['kg/m³', 'API°', 'SG'] },
    { id: 'viscosity', icon: Activity, label: 'Viscosity', units: ['cSt', 'cP'] },
    { id: 'scales', icon: Database, label: 'Operational Scales', units: ['SUS', 'SFS', 'Redwood', 'Engler'] },
  ];

  useEffect(() => {
    const conv = calculateAllConversions(inputValue, selectedUnit, activeCategory);
    setResults(conv);
  }, [inputValue, selectedUnit, activeCategory]);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(results, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => setInputValue(42.5);

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-slate-900 via-slate-900/50 to-slate-900 text-white p-4 md:p-8">
      <header className="flex items-center justify-between mb-12 mt-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/25">
            <Calculator className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
              O&G Calc
            </h1>
            <p className="text-sm opacity-80 font-medium">Instant Oil & Gas Unit Converter</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className={`lg:block ${sidebarOpen ? 'fixed inset-0 z-50 bg-black/50 flex lg:hidden' : 'hidden lg:block'}`}>
          <div className={`w-full lg:w-80 h-screen bg-slate-900/90 backdrop-blur-xl border-r border-white/10 p-8 shadow-2xl overflow-y-auto ${sidebarOpen ? 'ml-auto w-64' : ''} transition-all duration-300`}>
            <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Categories
            </h2>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-4 p-5 mb-4 rounded-2xl transition-all group hover:shadow-xl hover:-translate-y-1 border-2 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 border-white/30 shadow-2xl shadow-cyan-500/25'
                    : 'border-transparent hover:border-white/20 bg-white/5'
                }`}
              >
                <cat.icon className="w-6 h-6 flex-shrink-0" />
                <span className="font-bold">{cat.label}</span>
              </button>
            ))}
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="lg:hidden absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8 lg:pr-8">
          <button 
            className="lg:hidden mb-6 p-3 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
            <span className="font-bold">Categories</span>
          </button>

          {/* Calculator Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-slate-100 to-white/80 bg-clip-text text-transparent drop-shadow-lg">
                {categories.find(c => c.id === activeCategory)?.label} Converter
              </h2>
              <div className="flex gap-3">
                <button onClick={handleCopy} className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl flex items-center gap-2 backdrop-blur-sm transition-all">
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
                <button onClick={handleReset} className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl flex items-center gap-2 backdrop-blur-sm transition-all">
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>

            {/* Input */}
            <div className="space-y-6 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <label className="block text-sm font-bold uppercase tracking-wide mb-2 text-cyan-200">
                    Enter Value
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={inputValue}
                    onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white/20 border-2 border-white/30 rounded-2xl px-6 py-6 text-4xl font-mono font-bold text-center focus:outline-none focus:border-cyan-400 hover:border-white/50 transition-all backdrop-blur-sm text-white"
                    placeholder="42.5"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold uppercase tracking-wide mb-2 text-cyan-200">
                    From Unit
                  </label>
                  <select
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value)}
                    className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-6 py-6 text-xl font-bold backdrop-blur-sm focus:outline-none focus:border-emerald-400 hover:border-white/30 transition-all appearance-none text-white"
                  >
                    {categories.find(c => c.id === activeCategory)?.units.map(u => (
                      <option key={u} value={u.toLowerCase().replace(/[^a-z0-9]/g, '')} className="text-black">
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Object.entries(results).map(([key, value]) => (
                <div key={key} className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:shadow-2xl hover:-translate-y-2 hover:border-cyan-400/50 transition-all overflow-hidden hover:bg-white/10">
                  <div className="text-xs opacity-75 uppercase tracking-wider font-bold mb-2 text-cyan-300">
                    {key.toUpperCase()}
                  </div>
                  <div className="text-3xl font-mono font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-1 group-hover:scale-105 transition-transform">
                    {isNaN(value) ? value : Math.abs(value).toFixed(3)}
                  </div>
                  <div className="w-full h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform"></div>
                </div>
              ))}
              {Object.keys(results).length === 0 && (
                <div className="col-span-full text-center py-20 opacity-50">
                  <Calculator className="w-24 h-24 mx-auto mb-4 text-cyan-400" />
                  <p className="text-xl">Enter value to see conversions</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-12 pb-8 opacity-75">
            <p className="text-lg mb-4">Powered by precise petroleum engineering formulas</p>
            <div className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-default">
              <ChevronRight className="w-5 h-5 rotate-[-45deg]" />
              <span>More Oil & Gas Tools Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Petrocal;

