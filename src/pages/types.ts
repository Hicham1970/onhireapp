
export enum FuelType {
    HFO = 'HFO (Heavy Fuel Oil)',
    MGO = 'MGO (Marine Gas Oil)',
    LSMGO = 'LSMGO (Low Sulfur MGO)',
    VLSFO = 'VLSFO (Very Low Sulfur Fuel Oil)',
    HSFO = 'HSFO (High Sulfur Fuel Oil)',
    MDO = 'MDO (Marine Diesel Oil)'
}

export enum SurveyType {
    ONHIRE = 'ONHIRE',
    OFFHIRE = 'OFFHIRE',
    BUNKER = 'BUNKER'
}

export interface Tank {
    id: string;
    name: string;
    capacity: number; // m3
    fuelType: FuelType;
    depth?: number; // meters
}

export interface SoundingEntry {
    tankId: string;
    sounding: number; // Corrected sounding/ullage
    temperature: number; // Celsius
    observedVolume: number; // m3
    densityAt15: number; // T/m3
    vcf: number; // Volume Correction Factor
    gsv: number; // Gross Standard Volume at 15C
    weightInVacuum: number;
    weightInAir: number; // Metric Tons (Corrected Volume)
}

export interface LogBookEntry {
    event: string;
    time: string;
    date: string;
}

export interface SurveyMetadata {
    client: string;
    owners: string;
    charterers: string;
    subCharterers: string;
    placeOfSurvey: string;
    placeOfDelivery: string;
    fromDateTime: string;
    toDateTime: string;
    draftFwd: string;
    draftAft: string;
    trim: string;
    list: string;
    voy: string;
    swell: string;
    thermometer: string;
    erTemp: string;
}

export interface Survey {
    id: string;
    vesselName: string;
    vesselImo: string;
    date: string;
    location: string;
    type: SurveyType;
    charterer: string;
    owner: string;
    metadata?: SurveyMetadata;
    logBook?: LogBookEntry[];
    soundings: SoundingEntry[];
    totalHFO: number;
    totalMGO: number;
    status: 'Draft' | 'Completed';
}

export interface Vessel {
    id: string;
    name: string;
    imo: string;
    type: string;
    flag?: string;
    status?: string;
    tanks: Tank[];
}
