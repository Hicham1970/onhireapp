import { DraftReadings, VesselParticulars, Deductibles, OperationType } from "../types/draftSurvey";

/**
 * Calcul du LBM (Length Between Marks) avec gestion des signes
 */
export const calculateLBM = (lbp: number, fwdDist: number, aftDist: number) => {
    let lbm = lbp;
    
    if (fwdDist < 0 && aftDist > 0) {
        lbm -= fwdDist - aftDist;
    } else if (fwdDist > 0 && aftDist < 0) {
        lbm += fwdDist + aftDist;
    } else if (fwdDist < 0 && aftDist < 0) {
        lbm += aftDist - fwdDist;
    } else if (fwdDist > 0 && aftDist > 0) {
        lbm += fwdDist + aftDist;
    } else if (fwdDist === 0 && aftDist < 0) {
        lbm = lbp + Math.abs(aftDist);
    } else if (fwdDist === 0 && aftDist > 0) {
        lbm = lbp - Math.abs(aftDist);
    } else if (fwdDist > 0 && aftDist === 0) {
        lbm = lbp - Math.abs(fwdDist);
    } else if (fwdDist < 0 && aftDist === 0) {
        lbm = lbp + Math.abs(fwdDist);
    }
    
    return lbm;
};

/**
 * Calcul des corrections de tirant d'eau automatisées (SGS Logic)
 */
export const calculateDraftCorrections = (
    apparentTrim: number,
    lbp: number,
    fwdDist: number,
    aftDist: number,
    midDist: number
) => {
    const lbm = calculateLBM(lbp, fwdDist, aftDist);
    if (lbm === 0) return { fwdCorr: 0, aftCorr: 0, midCorr: 0, lbm: lbp };
    
    // Fore Correction
    let fwdCorr = 0;
    if (fwdDist < 0) {
        fwdCorr = -((apparentTrim * fwdDist) / lbm);
    } else if (fwdDist > 0) {
        fwdCorr = ((apparentTrim * fwdDist) / lbm);
    }

    // Aft Correction
    let aftCorr = 0;
    if (aftDist < 0) {
        aftCorr = -((apparentTrim * aftDist) / lbm);
    } else if (aftDist > 0) {
        aftCorr = ((apparentTrim * aftDist) / lbm);
    }

    // Mid Correction
    let midCorr = 0;
    if (midDist < 0) {
        midCorr = -((apparentTrim * midDist) / lbm);
    } else if (midDist > 0) {
        midCorr = ((apparentTrim * midDist) / lbm);
    }

    return { fwdCorr, aftCorr, midCorr, lbm };
};

/**
 * Calcul des tirants d'eau corrigés
 */
export const calculateSGSCorrectedDrafts = (drafts: DraftReadings, particulars: VesselParticulars) => {
    const { fwdPort, fwdStbd, midPort, midStbd, aftPort, aftStbd } = drafts;
    const { lbp, fwdDraftMarkDist, aftDraftMarkDist, midDraftMarkDist } = particulars;

    const fwdMean = (fwdPort + fwdStbd) / 2;
    const midMean = (midPort + midStbd) / 2;
    const aftMean = (aftPort + aftStbd) / 2;

    const apparentTrim = aftMean - fwdMean;
    const { fwdCorr, aftCorr, midCorr, lbm } = calculateDraftCorrections(
        apparentTrim, lbp, fwdDraftMarkDist, aftDraftMarkDist, midDraftMarkDist
    );

    const correctedFwd = fwdMean + fwdCorr;
    const correctedMid = midMean + midCorr;
    const correctedAft = aftMean + aftCorr;

    return {
        fwd: { mean: fwdMean, corrected: correctedFwd, autoCorr: fwdCorr },
        mid: { mean: midMean, corrected: correctedMid, autoCorr: midCorr },
        aft: { mean: aftMean, corrected: correctedAft, autoCorr: aftCorr },
        apparentTrim,
        lbm
    };
};

/**
 * Calcul des moyennes intermédiaires (SGS Style)
 */
export const calculateSGSMiddleMeans = (fwdCorr: number, midCorr: number, aftCorr: number) => {
    const meanForeAft = (fwdCorr + aftCorr) / 2;
    const meanOfMean = (meanForeAft + midCorr) / 2;
    const quarterMean = (fwdCorr + 6 * midCorr + aftCorr) / 8;

    return {
        meanForeAft,
        meanOfMean,
        quarterMean
    };
};

/**
 * Calcul du Trim (Différence AR - AV)
 */
export const calculateTrim = (fwd: number, aft: number) => {
    return aft - fwd;
};

/**
 * Calcul des corrections de Trim (1ère et 2ème)
 */
export const calculateTrimCorrections = (trim: number, tpc: number, mtc: number, lcf: number, lbp: number) => {
    // 1st Correction = (Trim * LCF * TPC * 100) / LBP
    const firstTrimCorr = (trim * lcf * tpc * 100) / lbp;
    
    // 2nd Correction = (50 * Trim^2 * MTC) / LBP
    const secondTrimCorr = (50 * Math.pow(trim, 2) * mtc) / lbp;
    
    return firstTrimCorr + secondTrimCorr;
};

/**
 * Somme des déductibles
 */
export const sumDeductibles = (deductibles: Deductibles) => {
    return Object.values(deductibles).reduce((a, b) => a + b, 0);
};

/**
 * Calcul Final du Cargo
 */
export const calculateCargoWeight = (initialNet: number, finalNet: number, type: OperationType) => {
    if (type === 'Loading') {
        return finalNet - initialNet;
    } else {
        return initialNet - finalNet;
    }
};

/**
 * Calcul du Net Displacement (Après corrections de trim et densité)
 */
export const calculateNetDisplacement = (
    displacementTable: number, 
    trimCorr: number, 
    density: number, 
    deductibles: number
) => {
    const correctedForTrim = displacementTable + trimCorr;
    const correctedForDensity = correctedForTrim * (density / 1.025);
    return correctedForDensity - deductibles;
};
