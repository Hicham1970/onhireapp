
import React, { useState, useMemo, useEffect } from 'react';
import { Calculator, Save, Info, RefreshCw, Gauge, Edit3, FileText, Plus, Trash2 } from 'lucide-react';

export const FuelCalculator = ({ tanks, onSave, initialData }) => {
  const [extraTanks, setExtraTanks] = useState([]);
  const [summaryValues, setSummaryValues] = useState({
    VLSFO: '',
    HSFO: '',
    MDO: '',
    LSMGO: '',
  });
  const [dirtySummary, setDirtySummary] = useState({
    VLSFO: false,
    HSFO: false,
    MDO: false,
    LSMGO: false,
  });

  const [entries, setEntries] = useState(() => {
    const initial = {};
    // Créer une map des données sauvegardées pour un accès rapide
    const savedMap = initialData ? initialData.reduce((acc, curr) => ({...acc, [curr.tankId]: curr}), {}) : {};

    tanks.forEach(t => {
      if (savedMap[t.id]) {
        initial[t.id] = { ...savedMap[t.id] };
      } else {
        initial[t.id] = {
          tankId: t.id,
          sounding: 0,
          temperature: 15,
          densityAt15: t.fuelType.includes('HFO') || t.fuelType.includes('VLSFO') ? 0.9910 : 0.8450,
          observedVolume: 0
        };
      }
    });
    return initial;
  });

  const allTanks = [...tanks, ...extraTanks];

  // Reset dirty flags when tanks change (new survey)
  useEffect(() => {
    setDirtySummary({
      VLSFO: false,
      HSFO: false,
      MDO: false,
      LSMGO: false,
    });
  }, [tanks]);

  const calculatedTotals = useMemo(() => {
    const fuelTotals = {
      VLSFO: 0,
      HSFO: 0,
      MDO: 0,
      LSMGO: 0,
    };

    Object.values(entries).forEach(entry => {
      if (entry.tankId && entry.weightInAir) {
        const tank = allTanks.find(t => t.id === entry.tankId);
        if (tank) {
          if (tank.fuelType.includes('VLSFO')) {
            fuelTotals.VLSFO += entry.weightInAir;
          } else if (tank.fuelType.includes('HSFO') || (tank.fuelType.includes('HFO') && !tank.fuelType.includes('VLSFO'))) {
            fuelTotals.HSFO += entry.weightInAir;
          } else if (tank.fuelType.includes('MDO') || (tank.fuelType.includes('MGO') && !tank.fuelType.includes('LSMGO'))) {
            fuelTotals.MDO += entry.weightInAir;
          } else if (tank.fuelType.includes('LSMGO')) {
            fuelTotals.LSMGO += entry.weightInAir;
          }
        }
      }
    });

    return {
      VLSFO: fuelTotals.VLSFO.toFixed(3),
      HSFO: fuelTotals.HSFO.toFixed(3),
      MDO: fuelTotals.MDO.toFixed(3),
      LSMGO: fuelTotals.LSMGO.toFixed(3),
    };
  }, [entries, allTanks]);

  useEffect(() => {
    setSummaryValues(prev => ({
      VLSFO: dirtySummary.VLSFO ? prev.VLSFO : calculatedTotals.VLSFO,
      HSFO: dirtySummary.HSFO ? prev.HSFO : calculatedTotals.HSFO,
      MDO: dirtySummary.MDO ? prev.MDO : calculatedTotals.MDO,
      LSMGO: dirtySummary.LSMGO ? prev.LSMGO : calculatedTotals.LSMGO,
    }));
  }, [calculatedTotals, dirtySummary]);

  const calculateCorrected = (tankId) => {
    const entry = entries[tankId];
    if (!entry) return;

    const tank = allTanks.find(t => t.id === tankId);
    if (!tank) return;

    const rho15 = entry.densityAt15 || 0.9;
    const tempObs = entry.temperature || 15;
    const deltaT = tempObs - 15;

    let k0 = 0;
    let k1 = 0;

    const isFuelOil = tank.fuelType.includes('HFO') || tank.fuelType.includes('VLSFO') || tank.fuelType.includes('HSFO');
    
    if (isFuelOil) {
      k0 = 103.8720;
      k1 = 0.2701;
    } else {
      k0 = 186.9696;
      k1 = 0.4862;
    }

    const alpha15 = (k0 / Math.pow(rho15 * 1000, 2)) + (k1 / (rho15 * 1000));
    const vcf = Math.exp(-alpha15 * deltaT * (1 + 0.8 * alpha15 * deltaT));
    
    const obsVol = entry.observedVolume || 0;
    const gsv = obsVol * vcf;
    const weightInVacuum = gsv * rho15;
    const weightInAir = gsv * (rho15 - 0.0011);

    setEntries(prev => ({
      ...prev,
      [tankId]: {
        ...prev[tankId],
        vcf: parseFloat(vcf.toFixed(5)),
        gsv: parseFloat(gsv.toFixed(2)),
        weightInVacuum: parseFloat(weightInVacuum.toFixed(3)),
        weightInAir: parseFloat(weightInAir.toFixed(3)),
        correctedVolume: parseFloat(weightInAir.toFixed(3)) // backward compatibility
      }
    }));
  };

  const handleInputChange = (tankId, field, value) => {
    setEntries(prev => ({
      ...prev,
      [tankId]: { ...prev[tankId], [field]: parseFloat(value.toString()) }
    }));
  };

  const handleSave = () => {
    const validEntries = Object.values(entries).filter(e => e.tankId).map(entry => {
      const tank = allTanks.find(t => t.id === entry.tankId);
      return {
        ...entry,
        tankName: tank ? tank.name : 'Unknown Tank',
        fuelType: tank ? tank.fuelType : 'Unknown'
      };
    });
    const hfoTotal = parseFloat(summaryValues.VLSFO || 0) + parseFloat(summaryValues.HSFO || 0);
    const mgoTotal = parseFloat(summaryValues.MDO || 0) + parseFloat(summaryValues.LSMGO || 0);
    onSave(validEntries, hfoTotal, mgoTotal);
  };

  const handleAddTank = (group) => {
    const newId = `ext-${Date.now()}`;
    const newTank = {
      id: newId,
      name: 'New Tank',
      capacity: 0,
      fuelType: group.defaultType,
      isManual: true
    };

    setExtraTanks([...extraTanks, newTank]);
    
    setEntries(prev => ({
      ...prev,
      [newId]: {
        tankId: newId,
        sounding: 0,
        temperature: 15,
        densityAt15: group.defaultType.includes('HFO') || group.defaultType.includes('VLSFO') ? 0.9910 : 0.8450,
        observedVolume: 0
      }
    }));
  };

  const handleRemoveTank = (tankId) => {
    setExtraTanks(prev => prev.filter(t => t.id !== tankId));
  };

  const handleTankNameChange = (id, newName) => {
    setExtraTanks(prev => prev.map(t => t.id === id ? { ...t, name: newName } : t));
  };

  const fuelGroups = [
    { name: 'HIGH SULPHUR FUEL OIL (T)', color: 'orange', defaultType: 'HFO', filter: (t) => t.fuelType.includes('HSFO') || (t.fuelType.includes('HFO') && !t.fuelType.includes('VLSFO')) },
    { name: 'VERY LOW SULPHUR FUEL OIL (T)', color: 'amber', defaultType: 'VLSFO', filter: (t) => t.fuelType.includes('VLSFO') },
    { name: 'MARINE DIESEL OIL (T)', color: 'sky', defaultType: 'MDO', filter: (t) => t.fuelType.includes('MDO') || (t.fuelType.includes('MGO') && !t.fuelType.includes('LSMGO')) },
    { name: 'LOW SULPHUR MARINE GAS OIL (T)', color: 'blue', defaultType: 'LSMGO', filter: (t) => t.fuelType.includes('LSMGO') }
  ];

  const getColorStyles = (color) => {
    const styles = {
      amber: { bg: 'bg-amber-50 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400', textBold: 'text-amber-700 dark:text-amber-300', hover: 'hover:bg-amber-100 dark:hover:bg-amber-900/50' },
      orange: { bg: 'bg-orange-50 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400', textBold: 'text-orange-700 dark:text-orange-300', hover: 'hover:bg-orange-100 dark:hover:bg-orange-900/50' },
      blue: { bg: 'bg-blue-50 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', textBold: 'text-blue-700 dark:text-blue-300', hover: 'hover:bg-blue-100 dark:hover:bg-blue-900/50' },
      sky: { bg: 'bg-sky-50 dark:bg-sky-900/30', text: 'text-sky-600 dark:text-sky-400', textBold: 'text-sky-700 dark:text-sky-300', hover: 'hover:bg-sky-100 dark:hover:bg-sky-900/50' },
    };
    return styles[color] || styles.blue;
  };

  const renderTable = (group) => {
    const filteredTanks = allTanks.filter(group.filter);
    // if (filteredTanks.length === 0) return null; // Commented out to allow adding rows to empty tables

    const styles = getColorStyles(group.color);

    return (
      <div key={group.name} className="mb-8 overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <div className={`px-4 py-2 ${styles.bg} border-b border-slate-200 text-center font-bold text-slate-700 text-sm uppercase tracking-widest`}>
          {group.name}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] text-center border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-2 py-3 border-r border-slate-200 dark:border-slate-700 min-w-[100px]">Tank Nº</th>
                <th className="px-2 py-3 border-r border-slate-200 dark:border-slate-700">Tank Depth (m)</th>
                <th className="px-2 py-3 border-r border-slate-200 dark:border-slate-700">Sound./Ullage Corr'd (m)</th>
                <th className="px-2 py-3 border-r border-slate-200 dark:border-slate-700">Volume (m³)</th>
                <th className="px-2 py-3 border-r border-slate-200 dark:border-slate-700">Density (T/m³) @15°C</th>
                <th className="px-2 py-3 border-r border-slate-200 dark:border-slate-700">T° Deg (C)</th>
                <th className="px-2 py-3 border-r border-slate-200 dark:border-slate-700">V.C.F. T (54B)</th>
                <th className="px-2 py-3 border-r border-slate-200 dark:border-slate-700">G.S.V (m³) @ 15°C</th>
                <th className="px-2 py-3 border-r border-slate-200 dark:border-slate-700">T (In Vac.)</th>
                <th className="px-2 py-3">T (In Air)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredTanks.map((tank) => (
                <tr key={tank.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-2 py-2 border-r border-slate-200 dark:border-slate-700 font-medium text-slate-800 dark:text-slate-200">
                    {tank.isManual ? (
                      <input 
                        type="text" 
                        className="w-full bg-transparent border-b border-slate-200 dark:border-slate-600 outline-none focus:border-blue-500 text-center"
                        value={tank.name}
                        onChange={(e) => handleTankNameChange(tank.id, e.target.value)}
                      />
                    ) : (
                      tank.name
                    )}
                    <div className="text-[9px] text-slate-400 font-normal uppercase">{tank.fuelType}</div>
                  </td>
                  <td className="px-2 py-2 border-r border-slate-200 dark:border-slate-700">
                     <input
                      type="number"
                      step="0.001"
                      className="w-full text-center outline-none bg-transparent dark:text-slate-200"
                      defaultValue={tank.depth || 0}
                    />
                  </td>
                  <td className="px-2 py-2 border-r border-slate-200 dark:border-slate-700">
                    <input
                      type="number"
                      step="0.001"
                      className="w-full text-center outline-none bg-transparent font-mono dark:text-slate-200"
                      value={entries[tank.id]?.sounding || 0}
                      onChange={(e) => handleInputChange(tank.id, 'sounding', e.target.value)}
                    />
                  </td>
                  <td className="px-2 py-2 border-r border-slate-200 dark:border-slate-700">
                    <input
                      type="number"
                      step="0.01"
                      className="w-full text-center outline-none bg-transparent font-mono dark:text-slate-200"
                      value={entries[tank.id]?.observedVolume || 0}
                      onChange={(e) => handleInputChange(tank.id, 'observedVolume', e.target.value)}
                    />
                  </td>
                  <td className="px-2 py-2 border-r border-slate-200 dark:border-slate-700">
                    <input
                      type="number"
                      step="0.0001"
                      className="w-full text-center outline-none bg-transparent font-mono dark:text-slate-200"
                      value={entries[tank.id]?.densityAt15 || 0}
                      onChange={(e) => handleInputChange(tank.id, 'densityAt15', e.target.value)}
                    />
                  </td>
                  <td className="px-2 py-2 border-r border-slate-200 dark:border-slate-700">
                    <input
                      type="number"
                      step="0.1"
                      className="w-full text-center outline-none bg-transparent font-mono dark:text-slate-200"
                      value={entries[tank.id]?.temperature || 0}
                      onChange={(e) => handleInputChange(tank.id, 'temperature', e.target.value)}
                    />
                  </td>
                  <td className="px-2 py-2 border-r border-slate-200 dark:border-slate-700 font-mono text-slate-500 dark:text-slate-400">
                    {entries[tank.id]?.vcf || '0,00000'}
                  </td>
                  <td className="px-2 py-2 border-r border-slate-200 dark:border-slate-700 font-mono text-slate-500 dark:text-slate-400">
                    {entries[tank.id]?.gsv || '0,00'}
                  </td>
                  <td className="px-2 py-2 border-r border-slate-200 dark:border-slate-700 font-mono text-slate-500 dark:text-slate-400">
                    {entries[tank.id]?.weightInVacuum || '0,000'}
                  </td>
                  <td className={`px-2 py-2 font-mono font-bold ${styles.textBold}`}>
                    <div className="flex items-center justify-between gap-1 px-1">
                      <span>{entries[tank.id]?.weightInAir || '0,000'}</span>
                      <button 
                        onClick={() => calculateCorrected(tank.id)}
                        className={`p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-400 ${styles.hover} transition-colors`}
                      >
                        <RefreshCw className="w-3 h-3" />
                      </button>
                      {tank.isManual && (
                        <button 
                          onClick={() => handleRemoveTank(tank.id)}
                          className="p-1 hover:bg-red-100 rounded text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
          <button onClick={() => handleAddTank(group)} className={`w-full py-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider ${styles.text} hover:bg-white dark:hover:bg-slate-800 rounded border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all`}>
            <Plus className="w-4 h-4" />
            Add {group.defaultType} Tank
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600" />
          Tank Sounding Details
        </h2>
        <button 
          onClick={handleSave}
          className="bg-slate-900 hover:bg-black text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95"
        >
          <Save className="w-4 h-4" />
          Finalize Computation
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm mb-6">
        <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-4 text-sm">
          <Edit3 className="w-4 h-4 text-indigo-600" />
          Summary Overrides
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['VLSFO', 'HSFO', 'MDO', 'LSMGO'].map(fuel => (
            <div key={fuel} className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{fuel} Total (T)</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder={calculatedTotals[fuel]}
                  value={summaryValues[fuel]}
                  onChange={(e) => {
                    setSummaryValues(prev => ({ ...prev, [fuel]: e.target.value }));
                    setDirtySummary(prev => ({ ...prev, [fuel]: true }));
                  }}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded text-sm outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {fuelGroups.map(renderTable)}

      <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-[10px] text-slate-500 dark:text-slate-400 italic">
        * Standard ASTM D1250 Table 54B used for V.C.F calculation. Tab (In Air) uses density buoyancy factor of -0.0011.
      </div>
    </div>
  );
};
