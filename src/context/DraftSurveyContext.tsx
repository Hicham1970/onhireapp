import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DraftSurvey, OperationType, SurveyStep } from '../types/draftSurvey';

interface DraftSurveyContextType {
    survey: DraftSurvey;
    updateInformations: (info: Partial<DraftSurvey['informations']>) => void;
    updateParticulars: (particulars: Partial<DraftSurvey['particulars']>) => void;
    updateInitial: (initial: Partial<SurveyStep>) => void;
    updateFinal: (final: Partial<SurveyStep>) => void;
    resetSurvey: () => void;
    setOperationType: (type: OperationType) => void;
}

const emptyStep: SurveyStep = {
    drafts: {
        fwdPort: 0, fwdStbd: 0,
        midPort: 0, midStbd: 0,
        aftPort: 0, aftStbd: 0,
        sternCorrectionFwd: 0,
        sternCorrectionAft: 0,
        midCorrection: 0
    },
    deductibles: {
        fuelOil: 0, dieselOil: 0, lubeOil: 0, freshWater: 0, ballastWater: 0, others: 0
    },
    density: 1.025,
    hydrostatics: {
        displacement: 0,
        tpc: 0,
        mtc: 0,
        lcf: 0
    },
    commencedDate: '',
    commencedTime: '',
    completedDate: '',
    completedTime: ''
};

const initialSurvey: DraftSurvey = {
    userId: '',
    informations: {
        vesselName: '',
        imo: '',
        port: '',
        date: new Date().toISOString().split('T')[0],
        surveyor: '',
        cargo: '',
        client: '',
        operationType: 'Loading',
        blWeight: 0,
        blDate: '',
        portLoading: '',
        portDischarging: '',
        arrivedDate: '',
        arrivedTime: '',
        berthedDate: '',
        berthedTime: ''
    },
    particulars: {
        lbp: 0,
        loa: 0,
        breadth: 0,
        fwdDraftMarkDist: 0,
        aftDraftMarkDist: 0,
        midDraftMarkDist: 0,
        keelThickness: 0,
        numHolds: 5,
        numBallastTanks: 20,
        flag: '',
        portOfRegistry: '',
        grossTonnage: 0,
        netTonnage: 0,
        lightShip: 0
    },
    initial: { ...emptyStep },
    final: { ...emptyStep },
    status: 'Draft'
};

const DraftSurveyContext = createContext<DraftSurveyContextType | undefined>(undefined);

export const DraftSurveyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [survey, setSurvey] = useState<DraftSurvey>(initialSurvey);

    const updateInformations = React.useCallback((info: Partial<DraftSurvey['informations']>) => {
        setSurvey(prev => ({ ...prev, informations: { ...prev.informations, ...info } }));
    }, []);

    const updateParticulars = React.useCallback((particulars: Partial<DraftSurvey['particulars']>) => {
        setSurvey(prev => ({ ...prev, particulars: { ...prev.particulars, ...particulars } }));
    }, []);

    const updateInitial = React.useCallback((initial: Partial<SurveyStep>) => {
        setSurvey(prev => ({ ...prev, initial: { ...prev.initial, ...initial } }));
    }, []);

    const updateFinal = React.useCallback((final: Partial<SurveyStep>) => {
        setSurvey(prev => ({ ...prev, final: { ...prev.final, ...final } }));
    }, []);

    const setOperationType = React.useCallback((operationType: OperationType) => {
        setSurvey(prev => ({ 
            ...prev, 
            informations: { ...prev.informations, operationType } 
        }));
    }, []);

    const resetSurvey = React.useCallback(() => {
        setSurvey(initialSurvey);
    }, []);

    const value = React.useMemo(() => ({
        survey,
        updateInformations,
        updateParticulars,
        updateInitial,
        updateFinal,
        resetSurvey,
        setOperationType
    }), [
        survey, 
        updateInformations, 
        updateParticulars, 
        updateInitial, 
        updateFinal, 
        resetSurvey, 
        setOperationType
    ]);

    return (
        <DraftSurveyContext.Provider value={value}>
            {children}
        </DraftSurveyContext.Provider>
    );
};

export const useDraftSurvey = () => {
    const context = useContext(DraftSurveyContext);
    if (context === undefined) {
        throw new Error('useDraftSurvey must be used within a DraftSurveyProvider');
    }
    return context;
};
