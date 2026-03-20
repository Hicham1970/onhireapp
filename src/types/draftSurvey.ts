
export type OperationType = 'Loading' | 'Unloading';

export interface DraftReadings {
    fwdPort: number;
    fwdStbd: number;
    midPort: number;
    midStbd: number;
    aftPort: number;
    aftStbd: number;
    // Specific corrections from SGS report
    sternCorrectionFwd?: number;
    sternCorrectionAft?: number;
    midCorrection?: number;
}

export interface Deductibles {
    fuelOil: number;
    dieselOil: number;
    lubeOil: number;
    freshWater: number;
    ballastWater: number;
    others: number;
}

export interface VesselParticulars {
    lbp: number;
    loa: number;
    breadth: number;
    fwdDraftMarkDist: number;
    aftDraftMarkDist: number;
    midDraftMarkDist: number;
    keelThickness: number;
    numHolds: number;
    numBallastTanks: number;
    flag: string;
    portOfRegistry: string;
    grossTonnage: number;
    netTonnage: number;
    lightShip: number;
    summerDraft?: number;
    summerDeadweight?: number;
}

export interface Hydrostatics {
    displacement: number;
    tpc: number;
    mtc: number;
    lcf: number;
}

export interface SurveyStep {
    drafts: DraftReadings;
    deductibles: Deductibles;
    density: number;
    hydrostatics: Hydrostatics;
    mom?: number;
    meanDraft?: number;
    trim?: number;
    quarterMean?: number;
    trimCorrection?: number;
    correctedDisplacementTrim?: number;
    correctedDisplacementDensity?: number;
    netDisplacement?: number;
    // Timestamps
    commencedDate?: string;
    commencedTime?: string;
    completedDate?: string;
    completedTime?: string;
}

export interface DraftSurvey {
    id?: string;
    userId: string;
    informations: {
        vesselName: string;
        imo: string;
        port: string;
        date: string;
        surveyor: string;
        cargo: string;
        client: string;
        operationType: OperationType;
        blWeight: number;
        blDate: string;
        portLoading: string;
        portDischarging: string;
        // Timestamps
        arrivedDate?: string;
        arrivedTime?: string;
        berthedDate?: string;
        berthedTime?: string;
    };
    particulars: VesselParticulars;
    initial: SurveyStep;
    final: SurveyStep;
    cargoWeight?: number;
    status: 'Draft' | 'Completed';
    remarks?: string;
    createdAt?: string;
    updatedAt?: string;
}
