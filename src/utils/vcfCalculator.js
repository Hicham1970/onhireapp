export const calculateVCF = (densityAt15, temperature) => {
  if (typeof densityAt15 !== 'number' || typeof temperature !== 'number') {
    throw new Error('densityAt15 and temperature must be numbers');
  }
  
  if (densityAt15 <= 0) {
    throw new Error('densityAt15 must be greater than 0');
  }

  if (densityAt15 < 0.61 || densityAt15 > 1.076) {
    console.warn(`Warning: densityAt15 ${densityAt15} T/m³ is outside typical marine fuel range (0.61-1.076 T/m³)`);
  }

  const den15 = densityAt15 * 1000;
  const deltaT = temperature - 15;
  let alpha;

  if (den15 <= 770) {
    const k0 = 346.42278;
    const k1 = 0.43884;
    alpha = (k0 + k1 * den15) / Math.pow(den15, 2);
  } else if (den15 > 770 && den15 < 778) {
    const a = -0.0033612;
    const b = 2680.32;
    alpha = a + b / Math.pow(den15, 2);
  } else if (den15 >= 778 && den15 < 839) {
    const k0 = 594.5418;
    const k1 = 0;
    alpha = (k0 + k1 * den15) / Math.pow(den15, 2);
  } else {
    const k0 = 186.9696;
    const k1 = 0.48618;
    alpha = (k0 + k1 * den15) / Math.pow(den15, 2);
  }

  const vcf = Math.exp(-alpha * deltaT * (1 + 0.8 * alpha * deltaT));

  return {
    vcf: parseFloat(vcf.toFixed(5)),
    alpha: parseFloat(alpha.toExponential(6)),
    gsv: (observedVolume) => parseFloat((observedVolume * vcf).toFixed(2)),
    weightInVacuum: (observedVolume) => parseFloat((observedVolume * vcf * densityAt15).toFixed(3)),
    weightInAir: (observedVolume) => parseFloat((observedVolume * vcf * (densityAt15 - 0.0011)).toFixed(3))
  };
};

export const getDefaultDensityForFuelType = (fuelType) => {
  const fuelTypeUpper = fuelType.toUpperCase();

  if (fuelTypeUpper.includes('VLSFO')) {
    return 0.9910;
  } else if (fuelTypeUpper.includes('HSFO') || (fuelTypeUpper.includes('HFO') && !fuelTypeUpper.includes('VLSFO'))) {
    return 0.9910;
  } else if (fuelTypeUpper.includes('MDO') || (fuelTypeUpper.includes('MGO') && !fuelTypeUpper.includes('LSMGO'))) {
    return 0.8450;
  } else if (fuelTypeUpper.includes('LSMGO')) {
    return 0.8450;
  }

  return 0.9910;
};
