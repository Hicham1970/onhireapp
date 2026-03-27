/**
 * Petrocal - Oil & Gas Unit Converter Formulas
 * Precise engineering formulas for Oil & Gas conversions
 */

 // Temperature conversions
export const celsiusToFahrenheit = (c) => (c * 9/5) + 32;
export const fahrenheitToCelsius = (f) => (f - 32) * 5/9;

// Pressure conversions
export const psiToBar = (psi) => psi * 0.0689476;
export const barToPsi = (bar) => bar / 0.0689476;

// Density conversions
export const sgToApi = (sg) => (141.5 / sg) - 131.5;
export const apiToSg = (api) => 141.5 / (api + 131.5);
export const sgToKgM3 = (sg) => sg * 1000;
export const kgM3ToSg = (kgm3) => kgm3 / 1000;

// Viscosity conversions (approximate)
export const cStToCP = (cst, sg) => cst * sg;
export const cPToCSt = (cp, sg) => cp / sg;


// Energy conversions (example constants)
const MJ_PER_MBTU = 1.05506;
const BBL_PER_M3 = 6.28981;
export const mjPerM3ToMbtuPerBbl = (mj_m3) => (mj_m3 * 0.001 / MJ_PER_MBTU) * BBL_PER_M3;

// Add more precise formulas as needed
export const calculateAllConversions = (inputValue, fromUnit, category, sg = 0.85) => {
  const conversions = {};
  const normFrom = fromUnit.toLowerCase().replace(/[^a-z]/g, '');
  switch (category) {
    case 'temperature':
      if (normFrom === 'c' || normFrom === '°c') {
        conversions.f = celsiusToFahrenheit(inputValue);
        conversions['°c'] = inputValue;
      } else {
        conversions.c = fahrenheitToCelsius(inputValue);
        conversions['°f'] = inputValue;
      }
      break;
    case 'pressure':
      conversions.psi = inputValue;
      conversions.bar = psiToBar(inputValue);
      break;
    case 'density':
      conversions.sg = inputValue;
      conversions.api = sgToApi(inputValue);
      conversions['kgm3'] = sgToKgM3(inputValue);
      break;
    case 'viscosity':
      conversions.cst = inputValue;
      conversions.cp = cStToCP(inputValue, sg);
      break;
    case 'energy':
      conversions['mjm3'] = inputValue;
      conversions['mbtubbl'] = mjPerM3ToMbtuPerBbl(inputValue);
      break;
    case 'scales':
      conversions.result = inputValue; // Placeholder
      break;
    default:
      conversions.result = inputValue;
  }
  return conversions;
};

export const mbtuPerBblToMjM3 = (mbtu_bbl) => (mbtu_bbl * 1.05506 / 6.28981) * 1000;

export const btuGalToMjM3 = (btu_gal) => (btu_gal * 0.263 / 3.785) * 1000; // approx
export const kCalToMjM3 = (kcal) => kcal * 0.0041868 * 1000;

