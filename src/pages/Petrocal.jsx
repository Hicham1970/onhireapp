import React, { useState, useEffect } from 'react';
import { Calculator, Copy, RefreshCw, ChevronRight, Sun, Moon, Globe, Menu, X, Zap, Thermometer, Gauge, Droplets, Activity, Database } from 'lucide-react';
import { celsiusToFahrenheit, fahrenheitToCelsius, psiToBar, barToPsi, sgToApi, apiToSg, sgToKgM3, kgM3ToSg, cStToCP, cPToCSt, mjPerM3ToMbtuPerBbl, calculateAllConversions } from '../utils/petrocalFormulas';
import { calculateVCF_A54, calculateVCF_B54 } from '../utils/vcfCalculator';

const Petrocal = () => {
  const [activeCategory, setActiveCategory] = useState('energy');
  const [inputValue, setInputValue] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState('mj_m3');
  const [selectedToUnit, setSelectedToUnit] = useState('');
  const [singleResult, setSingleResult] = useState(null);
  const [results, setResults] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sgValue, setSgValue] = useState(0.85);

  // VCF specific states
  const [a54Temp, setA54Temp] = useState(15);
  const [a54Density, setA54Density] = useState(0.99560);
  const [a54Result, setA54Result] = useState({ vcf: 1.00000, alpha: '0' });

  const [b54Temp, setB54Temp] = useState(15);
  const [b54Density, setB54Density] = useState(0.8365);
  const [b54Result, setB54Result] = useState({ vcf: 1.00000, alpha: '0' });

  const categories = [
    { id: 'energy', icon: Zap, label: 'Energy Units', units: ['MJ/m³', 'MBTU/bbl', 'BTU/gal', 'kCal'] },
    { id: 'temperature', icon: Thermometer, label: 'Temperature', units: ['°F', '°C'] },
    { id: 'pressure', icon: Gauge, label: 'Pressure', units: ['psi', 'bar'] },
    { id: 'density', icon: Droplets, label: 'Oil Density & Gravity', units: ['kg/m³', 'API°', 'SG'] },
    { id: 'viscosity', icon: Activity, label: 'Viscosity', units: ['cSt', 'cP'] },
    { id: 'vcf', icon: Droplets, label: 'VCF Correction', units: ['54A Brut', '54B Produits'] },
  ];

  const computeSingleConversion = (value, fromUnit, toUnit, category) => {
    if (category === 'vcf') return null;
    const normFrom = fromUnit.toLowerCase().replace(/[^a-z]/g, '');
    const normTo = toUnit.toLowerCase().replace(/[^a-z]/g, '');

    switch (category) {
      case 'temperature':
        if (normFrom === 'c' && normTo === 'f') return celsiusToFahrenheit(value);
        if (normFrom === 'f' && normTo === 'c') return fahrenheitToCelsius(value);
        break;
      case 'pressure':
        if (normFrom === 'psi' && normTo === 'bar') return psiToBar(value);
        if (normFrom === 'bar' && normTo === 'psi') return barToPsi(value);
        break;
      case 'density':
        if (normFrom === 'sg' && normTo === 'api') return sgToApi(value);
        if (normFrom === 'api' && normTo === 'sg') return apiToSg(value);
        if (normFrom === 'sg' && normTo === 'kgm3') return sgToKgM3(value);
        if (normFrom === 'kgm3' && normTo === 'sg') return kgM3ToSg(value);
        break;
      case 'viscosity':
        if (normFrom === 'cst' && normTo === 'cp') return cStToCP(value, sgValue);
        if (normFrom === 'cp' && normTo === 'cst') return cPToCSt(value, sgValue);
        break;
      case 'energy':
        if (normFrom === 'mjm3' && normTo === 'mbtubbl') return mjPerM3ToMbtuPerBbl(value);
        break;
      default:
        return null;
    }
    return null;
  };

  // VCF Calculations
  useEffect(() => {
    if (activeCategory !== 'vcf') return;

    try {
      const a54 = calculateVCF_A54(a54Density, a54Temp);
      setA54Result(a54);
    } catch (e) {
      console.error('A54 calc error:', e);
    }

    try {
      const b54 = calculateVCF_B54(b54Density, b54Temp);
      setB54Result(b54);
    } catch (e) {
      console.error('B54 calc error:', e);
    }
  }, [a54Temp, a54Density, b54Temp, b54Density, activeCategory]);

  // General conversions
  useEffect(() => {
    if (activeCategory === 'vcf') {
      setResults({});
      return;
    }
    const conv = calculateAllConversions(inputValue, selectedUnit, activeCategory, sgValue);
    setResults(conv);
    const single = computeSingleConversion(inputValue, selectedUnit, selectedToUnit, activeCategory);
    setSingleResult(single);
  }, [inputValue, selectedUnit, selectedToUnit, activeCategory, sgValue]);

  // Sync to unit on category change
  useEffect(() => {
    if (categories.find(c => c.id === activeCategory)?.units.length > 1 && activeCategory !== 'vcf') {
      const units = categories.find(c => c.id === activeCategory)?.units.map(u => u.toLowerCase().replace(/[^a-z0-9]/g, ''));
      const firstOther = units.find(u => u !== selectedUnit) || units[1] || '';
      setSelectedToUnit(firstOther);
    }
  }, [activeCategory]);

  const handleCopy = () => {
    const data = activeCategory === 'vcf' 
      ? { A54: a54Result, B54: b54Result, inputs: {a54Temp, a54Density, b54Temp, b54Density} }
      : results;
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    if (activeCategory === 'vcf') {
      setA54Temp(15);
      setA54Density(0.8365);
      setB54Temp(15);
      setB54Density(0.8365);
    } else {
      setInputValue(42.5);
    }
  };

  const VCFSection = () => (
    <div className="space-y-8">
      {/* Section A54 - Brut/Crude */}
      <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-400/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
          📊 Table A54 - Brut (Pétrole Brut)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold uppercase tracking-wide mb-3 text-orange-200">
              Température (°C)
            </label>
            <input
              type="number"
              step="0.1"
              value={a54Temp}
              onChange={(e) => setA54Temp(parseFloat(e.target.value) || 15)}
              className="w-full bg-white/20 border-2 border-orange-400/50 rounded-2xl px-6 py-4 text-xl font-mono font-bold text-center focus:outline-none focus:border-orange-400 hover:border-orange-300 transition-all backdrop-blur-sm text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-bold uppercase tracking-wide mb-3 text-orange-200">
              Densité @15°C (t/m³)
            </label>
            <input
              type="number"
              step="0.0001"
              value={a54Density}
              onChange={(e) => setA54Density(parseFloat(e.target.value) || 0.8365)}
              className="w-full bg-white/20 border-2 border-orange-400/50 rounded-2xl px-6 py-4 text-xl font-mono font-bold text-center focus:outline-none focus:border-orange-400 hover:border-orange-300 transition-all backdrop-blur-sm text-white"
            />
          </div>
          <div className="lg:col-span-2">
            <label className="block text-sm font-bold uppercase tracking-wide mb-3 text-orange-200">
              CVF Calculé
            </label>
            <div className="text-5xl font-mono font-black text-center bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-2xl">
              {a54Result.vcf.toFixed(5)}
            </div>
            <div className="text-sm opacity-80 mt-2 text-center">
              α = {a54Result.alpha}
            </div>
          </div>
        </div>
      </div>

      {/* Section B54 - Produits FINIS */}
      <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-400/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          🛢️ Table B54 - Produits FINIS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold uppercase tracking-wide mb-3 text-emerald-200">
              Température (°C)
            </label>
            <input
              type="number"
              step="0.1"
              value={b54Temp}
              onChange={(e) => setB54Temp(parseFloat(e.target.value) || 15)}
              className="w-full bg-white/20 border-2 border-emerald-400/50 rounded-2xl px-6 py-4 text-xl font-mono font-bold text-center focus:outline-none focus:border-emerald-400 hover:border-emerald-300 transition-all backdrop-blur-sm text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-bold uppercase tracking-wide mb-3 text-emerald-200">
              Densité @15°C (t/m³)
            </label>
            <input
              type="number"
              step="0.0001"
              value={b54Density}
              onChange={(e) => setB54Density(parseFloat(e.target.value) || 0.8365)}
              className="w-full bg-white/20 border-2 border-emerald-400/50 rounded-2xl px-6 py-4 text-xl font-mono font-bold text-center focus:outline-none focus:border-emerald-400 hover:border-emerald-300 transition-all backdrop-blur-sm text-white"
            />
          </div>
          <div className="lg:col-span-2">
            <label className="block text-sm font-bold uppercase tracking-wide mb-3 text-emerald-200">
              CVF Calculé
            </label>
            <div className="text-5xl font-mono font-black text-center bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
              {b54Result.vcf.toFixed(5)}
            </div>
            <div className="text-sm opacity-80 mt-2 text-center">
              α = {b54Result.alpha}
            </div>
          </div>
        </div>
      </div>

      {/* Standards Note */}
      <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl text-sm text-slate-300">
        <strong>Normes ASTM D1250-80:</strong> Table 54A (Brut) & 54B (Produits raffinés). 
        Densité en t/m³ @15°C. Calcul: VCF = exp[-αΔT(1+0.8αΔT)] avec coefficients tabulés.
      </div>
    </div>
  );

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
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button onClick={handleReset} className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl flex items-center gap-2 backdrop-blur-sm transition-all">
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>

            {/* Conditional Content: VCF or General */}
            {activeCategory === 'vcf' ? (
              <VCFSection />
            ) : (
              <>
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
                        className="w-full bg-white/20 border-2 border-white/30 rounded-2xl px-6 py-4 text-3xl font-mono font-bold text-center focus:outline-none focus:border-cyan-400 hover:border-white/50 transition-all backdrop-blur-sm text-white"
                        placeholder="42.5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wide mb-2 text-emerald-200">
                        From Unit
                      </label>
                      <select
                        value={selectedUnit}
                        onChange={(e) => {
                          setSelectedUnit(e.target.value);
                          if (e.target.value === selectedToUnit) setSelectedToUnit('');
                        }}
                        className="w-full bg-white/10 border-2 border-emerald-400/50 rounded-2xl px-6 py-4 text-lg font-bold backdrop-blur-sm focus:outline-none focus:border-emerald-400 hover:border-emerald-300/50 transition-all appearance-none text-white"
                      >
                        {categories.find(c => c.id === activeCategory)?.units.map(u => (
                          <option key={u} value={u.toLowerCase().replace(/[^a-z0-9]/g, '')} className="text-black">
                            {u}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wide mb-2 text-cyan-200">
                        To Unit
                      </label>
                      <select
                        value={selectedToUnit}
                        onChange={(e) => setSelectedToUnit(e.target.value)}
                        className="w-full bg-white/10 border-2 border-cyan-400/50 rounded-2xl px-6 py-4 text-lg font-bold backdrop-blur-sm focus:outline-none focus:border-cyan-400 hover:border-cyan-300/50 transition-all appearance-none text-white"
                      >
                        {categories.find(c => c.id === activeCategory)?.units
                          .filter(u => u.toLowerCase().replace(/[^a-z0-9]/g, '') !== selectedUnit)
                          .map(u => (
                            <option key={u} value={u.toLowerCase().replace(/[^a-z0-9]/g, '')} className="text-black">
                              {u}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Direct Conversion */}
                {selectedToUnit && (
                  <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-400/50 backdrop-blur-xl rounded-3xl p-8 mb-8 shadow-2xl">
                    <h3 className="text-xl font-bold mb-4 text-emerald-200 uppercase tracking-wide">
                      Direct Conversion
                    </h3>
                    <div className="text-center">
                      <div className="text-6xl font-mono font-black mb-2 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
                        {inputValue.toFixed(2)}
                      </div>
                      <div className="text-lg opacity-90 mb-8">
                        {categories.find(c => c.id === activeCategory)?.units.find(u => u.toLowerCase().replace(/[^a-z0-9]/g, '') === selectedUnit)?.replace(/[°]/g, '°')} →{' '}
                        {categories.find(c => c.id === activeCategory)?.units.find(u => u.toLowerCase().replace(/[^a-z0-9]/g, '') === selectedToUnit)?.replace(/[°]/g, '°')}
                      </div>
                      <div className="text-5xl font-mono font-bold text-white mb-4">
                        {singleResult !== null ? singleResult.toFixed(3) : 'Select To Unit'}
                      </div>
                    </div>
                  </div>
                )}

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
              </>
            )}
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

