
import { Vessel, FuelType, Survey, SurveyType } from './pages/types';

export const INITIAL_VESSELS: Vessel[] = [
    {
        id: 'v1',
        name: 'MV Oceanic Voyager',
        imo: '9876543',
        type: 'Bulk Carrier',
        tanks: [
            { id: 't1', name: 'HFO Tank 1 (P)', capacity: 450, fuelType: FuelType.HFO },
            { id: 't2', name: 'HFO Tank 1 (S)', capacity: 450, fuelType: FuelType.HFO },
            { id: 't3', name: 'MGO Tank 1', capacity: 120, fuelType: FuelType.MGO },
        ]
    },
    {
        id: 'v2',
        name: 'MT Star Trader',
        imo: '9123456',
        type: 'Oil Tanker',
        tanks: [
            { id: 't4', name: 'VLSFO Main 1', capacity: 1200, fuelType: FuelType.VLSFO },
            { id: 't5', name: 'MGO Service', capacity: 80, fuelType: FuelType.MGO },
        ]
    }
];

export const MOCK_SURVEYS: Survey[] = [
    {
        id: 's1',
        vesselName: 'MV Oceanic Voyager',
        vesselImo: '9876543',
        date: '2024-05-15',
        location: 'Port of Rotterdam',
        type: SurveyType.ONHIRE,
        charterer: 'Glencore Agriculture',
        owner: 'Oceanic Shipping Ltd',
        soundings: [],
        totalHFO: 845.2,
        totalMGO: 92.5,
        status: 'Completed'
    }
];
