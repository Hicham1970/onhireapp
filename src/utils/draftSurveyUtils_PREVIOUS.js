/* BACKUP PREVIOUS VERSION - BEFORE SIMPLIFICATION */
import { DraftReadings, VesselParticulars, Deductibles, OperationType } from "../types/draftSurvey";

export const calculateLBM = (lbp: number, fwdDist: number, aftDist: number) => {
    if(fwdDist > 0 && aftDist > 0){
        return lbp + fwdDist - aftDist;
    }
    if (fwdDist < 0 && aftDist < 0) {
        return lbp - fwdDist + aftDist;
    }
    if (fwdDist > 0 && aftDist < 0) {
        return lbp + fwdDist + aftDist;
    }
    if (fwdDist < 0 && aftDist > 0) {
        return lbp - aftDist - fwdDist;
    }
    if (fwdDist === 0 && aftDist > 0) {
        return lbp - aftDist;
    }
    if (fwdDist === 0 && aftDist < 0) {
        return lbp + aftDist;
    }
    if (fwdDist > 0 && aftDist === 0) {
        return lbp + fwdDist;
    }
    if (fwdDist < 0 && aftDist === 0) {
        return lbp - fwdDist;
    }
    return  lbp;
};

/* Rest of utils unchanged */
