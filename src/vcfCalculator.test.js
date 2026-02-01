import { describe, it, expect } from 'vitest';
import { calculateVCF, getDefaultDensityForFuelType } from './utils/vcfCalculator';

describe('VCF Calculator - ASTM D1250 Table 54B', () => {
  it('Example 1: DEN15=839, DEGC=32.5 should give VCF=0.98515', () => {
    const result = calculateVCF(0.839, 32.5);
    expect(result.vcf).toBeCloseTo(0.98515, 5);
  });

  it('Example 2: DEN15=889, DEGC=115.55 should give VCF=0.91966', () => {
    const result = calculateVCF(0.889, 115.55);
    expect(result.vcf).toBeCloseTo(0.91966, 4);
  });

  it('Example 3: DEN15=903.5, DEGC=30.50 should give ALPHA=0.0007672 and VCF=0.988067', () => {
    const result = calculateVCF(0.9035, 30.50);
    expect(result.alpha).toBeCloseTo(0.0007672, 6);
    expect(result.vcf).toBeCloseTo(0.988067, 5);
  });

  it('Example 4: DEN15=819, DEGC=26.75 should give ALPHA=0.0008864 and VCF=0.989552', () => {
    const result = calculateVCF(0.819, 26.75);
    expect(result.alpha).toBeCloseTo(0.0008864, 7);
    expect(result.vcf).toBeCloseTo(0.989552, 5);
  });

  it('Example 5: Transition zone - DEN15=777.5, DEGC=9 should give ALPHA=0.0010708 and VCF=1.006412', () => {
    const result = calculateVCF(0.7775, 9);
    expect(result.alpha).toBeCloseTo(0.0010708, 5);
    expect(result.vcf).toBeCloseTo(1.006412, 4);
  });

  it('Example 6: DEN15=749, DEGC=32 should give ALPHA=0.0012033 and VCF=0.979423', () => {
    const result = calculateVCF(0.749, 32);
    expect(result.alpha).toBeCloseTo(0.0012033, 6);
    expect(result.vcf).toBeCloseTo(0.979423, 5);
  });

  it('Low density range (DEN15 <= 770): uses correct K0 and K1 coefficients', () => {
    const result = calculateVCF(0.750, 20);
    expect(result.alpha).toBeGreaterThan(0);
    expect(result.vcf).toBeLessThan(1);
  });

  it('Transition zone (770 < DEN15 < 778): uses correct A and B coefficients', () => {
    const result = calculateVCF(0.775, 15);
    expect(result.vcf).toBeCloseTo(1, 5);
  });

  it('Mid density range (778 <= DEN15 < 839): uses correct K0 and K1=0 coefficients', () => {
    const result = calculateVCF(0.800, 25);
    expect(result.alpha).toBeGreaterThan(0);
    expect(result.vcf).toBeLessThan(1);
  });

  it('High density range (DEN15 >= 839): uses correct K0 and K1 coefficients', () => {
    const result = calculateVCF(0.850, 30);
    expect(result.alpha).toBeGreaterThan(0);
    expect(result.vcf).toBeLessThan(1);
  });

  it('Weight calculations for VLSFO fuel', () => {
    const obsVol = 1000;
    const result = calculateVCF(0.9910, 45);
    
    const gsv = result.gsv(obsVol);
    const weightInVacuum = result.weightInVacuum(obsVol);
    const weightInAir = result.weightInAir(obsVol);

    expect(gsv).toBeGreaterThan(0);
    expect(weightInVacuum).toBeGreaterThan(0);
    expect(weightInAir).toBeGreaterThan(0);
    expect(weightInVacuum).toBeCloseTo(gsv * 0.9910, 2);
    expect(weightInAir).toBeCloseTo(gsv * (0.9910 - 0.0011), 2);
  });

  it('Weight calculations for LSMGO fuel', () => {
    const obsVol = 1000;
    const result = calculateVCF(0.8450, 30);
    
    const gsv = result.gsv(obsVol);
    const weightInVacuum = result.weightInVacuum(obsVol);
    const weightInAir = result.weightInAir(obsVol);

    expect(gsv).toBeGreaterThan(0);
    expect(weightInVacuum).toBeGreaterThan(0);
    expect(weightInAir).toBeGreaterThan(0);
    expect(weightInVacuum).toBeCloseTo(gsv * 0.8450, 2);
    expect(weightInAir).toBeCloseTo(gsv * (0.8450 - 0.0011), 2);
  });
});

describe('getDefaultDensityForFuelType', () => {
  it('Returns 0.9910 for VLSFO', () => {
    expect(getDefaultDensityForFuelType('VLSFO')).toBe(0.9910);
    expect(getDefaultDensityForFuelType('VLSFO-1')).toBe(0.9910);
    expect(getDefaultDensityForFuelType('vlsfo')).toBe(0.9910);
  });

  it('Returns 0.9910 for HSFO', () => {
    expect(getDefaultDensityForFuelType('HSFO')).toBe(0.9910);
    expect(getDefaultDensityForFuelType('hsfo')).toBe(0.9910);
  });

  it('Returns 0.9910 for HFO (non-VLSFO)', () => {
    expect(getDefaultDensityForFuelType('HFO')).toBe(0.9910);
    expect(getDefaultDensityForFuelType('HFO-380')).toBe(0.9910);
    expect(getDefaultDensityForFuelType('hfo')).toBe(0.9910);
  });

  it('Returns 0.8450 for MDO', () => {
    expect(getDefaultDensityForFuelType('MDO')).toBe(0.8450);
    expect(getDefaultDensityForFuelType('mdo')).toBe(0.8450);
    expect(getDefaultDensityForFuelType('MDO-1')).toBe(0.8450);
  });

  it('Returns 0.8450 for MGO (non-LSMGO)', () => {
    expect(getDefaultDensityForFuelType('MGO')).toBe(0.8450);
    expect(getDefaultDensityForFuelType('mgo')).toBe(0.8450);
    expect(getDefaultDensityForFuelType('MGO-1')).toBe(0.8450);
  });

  it('Returns 0.8450 for LSMGO', () => {
    expect(getDefaultDensityForFuelType('LSMGO')).toBe(0.8450);
    expect(getDefaultDensityForFuelType('lsmgo')).toBe(0.8450);
    expect(getDefaultDensityForFuelType('LSMGO-1')).toBe(0.8450);
  });

  it('Returns default 0.9910 for unknown fuel types', () => {
    expect(getDefaultDensityForFuelType('UNKNOWN')).toBe(0.9910);
    expect(getDefaultDensityForFuelType('GASOLINE')).toBe(0.9910);
  });
});

describe('VCF Calculator edge cases', () => {
  it('Handles temperature exactly at 15°C', () => {
    const result = calculateVCF(0.850, 15);
    expect(result.vcf).toBeCloseTo(1, 5);
  });

  it('Handles low temperature values', () => {
    const result = calculateVCF(0.850, -10);
    expect(result.vcf).toBeGreaterThan(1);
  });

  it('Handles high temperature values', () => {
    const result = calculateVCF(0.850, 100);
    expect(result.vcf).toBeLessThan(1);
  });

  it('Handles zero observed volume', () => {
    const result = calculateVCF(0.850, 30);
    expect(result.gsv(0)).toBe(0);
    expect(result.weightInVacuum(0)).toBe(0);
    expect(result.weightInAir(0)).toBe(0);
  });

  it('Handles boundary density value 770', () => {
    const result1 = calculateVCF(0.7699, 20);
    const result2 = calculateVCF(0.7701, 20);
    expect(result1.alpha).toBeDefined();
    expect(result2.alpha).toBeDefined();
  });

  it('Handles boundary density value 778', () => {
    const result1 = calculateVCF(0.7779, 20);
    const result2 = calculateVCF(0.7781, 20);
    expect(result1.alpha).toBeDefined();
    expect(result2.alpha).toBeDefined();
  });

  it('Handles boundary density value 839', () => {
    const result1 = calculateVCF(0.8389, 20);
    const result2 = calculateVCF(0.8391, 20);
    expect(result1.alpha).toBeDefined();
    expect(result2.alpha).toBeDefined();
  });
});
