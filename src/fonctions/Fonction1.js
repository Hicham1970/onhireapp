import { FunctionsOutlined } from "@mui/icons-material";
import { useState } from "react";

/**Les distances drafts marks-perpendiculaires */
const foreDistanceInitial = document.getElementById("distanceForeInitial");
const aftDistanceInitial = document.getElementById("distanceAftInitial");
const midDistanceInitial = document.getElementById("distanceMidInitial");
const foreDistanceFinal = document.getElementById("distanceForeFinal");
const aftDistanceFinal = document.getElementById("distanceAftFinal");
const midDistanceFinal = document.getElementById("distanceMidFinal");

// draft observés
const forePortInitial = document.getElementById("forePortInitial");
const foreStbdInitial = document.getElementById("foreStbdInitial");
const foreMeanInitial = document.getElementById("foreMeanInitial");
const aftPortInitial = document.getElementById("aftPortInitial");
const aftStbdInitial = document.getElementById("aftStbdInitial");
const aftMeanInitial = document.getElementById("aftMeanInitial");
const midPortInitial = document.getElementById("midPortInitial");
const midStbdInitial = document.getElementById("midStbdInitial");
const midMeanInitial = document.getElementById("midMeanInitial");

const forePortFinal = document.getElementById("forePortFinal");
const foreStbdFinal = document.getElementById("foreStbdFinal");
const foreMeanFinal = document.getElementById("foreMeanFinal");
const aftPortFinal = document.getElementById("aftPortFinal");
const aftStbdFinal = document.getElementById("aftStbdFinal");
const aftMeanFinal = document.getElementById("aftMeanFinal");
const midPortFinal = document.getElementById("midPortFinal");
const midStbdFinal = document.getElementById("midStbdFinal");
const midMeanFinal = document.getElementById("midMeanFinal");

/**Les corrections des distances / marks-perpendiculaires */
const foreCorrectionInitial = document.getElementById("foreCorrectionInitial");
const aftCorrectionInitial = document.getElementById("aftCorrectionInitial");
const midCorrectionInitial = document.getElementById("midCorrectionInitial");
const foreCorrectionFinal = document.getElementById("foreCorrectionFinal");
const aftCorrectionFinal = document.getElementById("aftCorrectionFinal");
const midCorrectionFinal = document.getElementById("midCorrectionFinal");
// draft Corrected:
const foreCorrectedInitial = document.getElementById("foreCorrectedInitial");
const aftCorrectedInitial = document.getElementById("aftCorrectedInitial");
const midCorrectedInitial = document.getElementById("midCorrectedInitial");
const foreCorrectedFinal = document.getElementById("foreCorrectedFinal");
const aftCorrectedFinal = document.getElementById("aftCorrectedFinal");
const midCorrectedFinal = document.getElementById("midCorrectedFinal");

// Means
const meanForeAftInitial = document.getElementById("meanForeAftInitial");
const meanOfMeanInitial = document.getElementById("meanOfMeanInitial");
const quarterMeanInitial = document.getElementById("quarterMeanInitial");
const meanForeAftFinal = document.getElementById("meanForeAftFinal");
const meanOfMeanFinal = document.getElementById("meanOfMeanFinal");
const quarterMeanFinal = document.getElementById("quarterMeanFinal");

// Displacement Calculations:
const correspondingDisplInitial = document.getElementById("correspondingDisplInitial");
const correspondingDisplFinal = document.getElementById("correspondingDisplFinal");
const totalTrimCorrectionValue = document.getElementById("totalTrimCorrectionValue");
const trimCorrectionFinal = document.getElementById("trimCorrectionFinal");
const correctedDisplacementForTrimInitial = document.getElementById("correctedDisplacementForTrimInitial");
const correctedDisplacementForTrimFinal = document.getElementById("correctedDisplacementForTrimFinal");
const densityDockWaterInitial = document.getElementById("densityDockWaterInitial");
const densityDockWaterFinal = document.getElementById("densityDockWaterFinal");
const correctedDisplacementForDensityInitial = document.getElementById("correctedDisplacementForDensityInitial");
const correctedDisplacementForDensityFinal = document.getElementById("correctedDisplacementForDensityFinal");
const deductiblesLiquidsInitial = document.getElementById("deductiblesLiquidsInitial");
const deductiblesLiquidsFinal = document.getElementById("deductiblesLiquidsFinal");
const netLightLoadedDisplacementInitial = document.getElementById("netLightLoadedDisplacementInitial");
const netLightLoadedDisplacementFinal = document.getElementById("netLightLoadedDisplacementFinal");
const totalCargoLoadedOnBoard = document.getElementById("totalCargoLoadedOnBoard");

/**Le LBP et le LBM */
const lbp = document.getElementById('lbp');
const keelCorrectionInitial = document.getElementById('keelCorrectionInitial');
const keelCorrectionFinal = document.getElementById('keelCorrectionFinal');
/**THE KEEL CORRECTION */
// const keelCorrectionInitial=document.getElementById("keelCorrectionInitial");
// const keelCorrectionFinal=document.getElementById("keelCorrectionFinal");
/*Les draft Observés*/

/**Assigner un rôle au btnCalc */

export default function CalculateValues(formData) {
    const [formDataState, setFormData] = useState({
        forePortInitial: forePortInitial.value,
        foreStbdInitial: foreStbdInitial.value,
        aftPortInitial: aftPortInitial.value,
        aftStbdInitial: aftStbdInitial.value,
        forePortFinal: forePortFinal.value,
        foreStbdFinal: foreStbdFinal.value,
        aftPortFinal: aftPortFinal.value,
        aftStbdFinal: aftStbdFinal.value,
        midPortInitial: midPortInitial.value,
        midStbdInitial: midStbdInitial.value,
        midPortFinal: midPortFinal.value,
        midStbdFinal: midStbdFinal.value,
        foreDistanceInitial: foreDistanceInitial.value,
        aftDistanceInitial: aftDistanceInitial.value,
        midDistanceInitial: midDistanceInitial.value,
        foreDistanceFinal: foreDistanceFinal.value,
        aftDistanceFinal: aftDistanceFinal.value,
        midDistanceFinal: midDistanceFinal.value,
        lbp: lbp.value,
        keelCorrectionInitial: keelCorrectionInitial.value,
        keelCorrectionFinal: keelCorrectionFinal.value
    });

    try {
        // Calculate means Initial
        const moyenneForInitial = ((parseFloat(formDataState.forePortInitial) + parseFloat(formDataState.foreStbdInitial)) / 2).toFixed(3);
        const moyenneAftInitial = ((parseFloat(formDataState.aftPortInitial) + parseFloat(formDataState.aftStbdInitial)) / 2).toFixed(3);
        const moyenneMidInitial = ((parseFloat(formDataState.midPortInitial) + parseFloat(formDataState.midStbdInitial)) / 2).toFixed(3);

        // Calculate LBM
        let lbm = parseFloat(formDataState.lbp);
        const foreDistanceInitial = parseFloat(formDataState.foreDistanceInitial);
        const aftDistanceInitial = parseFloat(formDataState.aftDistanceInitial);

        if (foreDistanceInitial < 0 && aftDistanceInitial > 0) {
            lbm -= foreDistanceInitial - aftDistanceInitial;
        } else if (foreDistanceInitial > 0 && aftDistanceInitial < 0) {
            lbm += foreDistanceInitial + aftDistanceInitial;
        } else if (foreDistanceInitial < 0 && aftDistanceInitial < 0) {
            lbm += aftDistanceInitial - foreDistanceInitial;
        } else if (foreDistanceInitial > 0 && aftDistanceInitial > 0) {
            lbm += foreDistanceInitial + aftDistanceInitial;
        } else if (foreDistanceInitial === 0 && aftDistanceInitial === 0) {
            lbm = parseFloat(formDataState.lbp);
        } else if (foreDistanceInitial === 0 && aftDistanceInitial < 0) {
            lbm = parseFloat(formDataState.lbp) + Math.abs(aftDistanceInitial);
        } else if (foreDistanceInitial === 0 && aftDistanceInitial > 0) {
            lbm = parseFloat(formDataState.lbp) - Math.abs(aftDistanceInitial);
        } else if (foreDistanceInitial > 0 && aftDistanceInitial === 0) {
            lbm = parseFloat(formDataState.lbp) - Math.abs(foreDistanceInitial);
        } else if (foreDistanceInitial < 0 && aftDistanceInitial === 0) {
            lbm = parseFloat(formDataState.lbp) + Math.abs(foreDistanceInitial);
        }

        // Calculate TrimObserved
        const trimObservedInitial = (parseFloat(moyenneAftInitial) - parseFloat(moyenneForInitial)).toFixed(2);
        const trimObservedFinal = (parseFloat(formDataState.aftPortFinal) - parseFloat(formDataState.forePortFinal)).toFixed(2);
        //Calculate Draft Corrected:
        // Fore Initial
        let foreCorrectedInitial;
        if (foreDistanceInitial < 0) {
            foreCorrectedInitial = parseFloat(moyenneForInitial) - ((trimObservedInitial * foreDistanceInitial) / lbm);
        } else if (foreDistanceInitial > 0) {
            foreCorrectedInitial = parseFloat(moyenneForInitial) + ((trimObservedInitial * foreDistanceInitial) / lbm);
        } else if (foreDistanceInitial === 0) {
            foreCorrectedInitial = parseFloat(moyenneForInitial);
        }

        //Aft Initial
        let aftCorrectedInitial;
        if (aftDistanceInitial < 0) {
            aftCorrectedInitial = parseFloat(moyenneAftInitial) - ((trimObservedInitial * aftDistanceInitial) / lbm);
        } else if (aftDistanceInitial > 0) {
            aftCorrectedInitial = parseFloat(moyenneAftInitial) + ((trimObservedInitial * aftDistanceInitial) / lbm);
        } else if (aftDistanceInitial === 0) {
            aftCorrectedInitial = parseFloat(moyenneAftInitial);
        }

        //Mid Initial
        let midCorrectedInitial;
        if (midDistanceInitial < 0) {
            midCorrectedInitial = parseFloat(moyenneMidInitial) - ((trimObservedInitial * midDistanceInitial) / lbm);
        } else if (midDistanceInitial > 0) {
            midCorrectedInitial = parseFloat(moyenneMidInitial) + ((trimObservedInitial * midDistanceInitial) / lbm);
        } else if (midDistanceInitial === 0) {
            midCorrectedInitial = parseFloat(moyenneMidInitial);
        }


        // Fore Final
        let foreCorrectedFinal;
        if (formDataState.foreDistanceFinal < 0) {
            foreCorrectedFinal = parseFloat(formDataState.forePortFinal) - ((trimObservedFinal * formDataState.foreDistanceFinal) / lbm);
        } else if (formDataState.foreDistanceFinal > 0) {
            foreCorrectedFinal = parseFloat(formDataState.forePortFinal) + ((trimObservedFinal * formDataState.foreDistanceFinal) / lbm);
        } else if (formDataState.foreDistanceFinal === 0) {
            foreCorrectedFinal = parseFloat(formDataState.forePortFinal);
        }

        //Aft Final
        let aftCorrectedFinal;
        if (formDataState.aftDistanceFinal < 0) {
            aftCorrectedFinal = parseFloat(formDataState.aftPortFinal) - ((trimObservedFinal * formDataState.aftDistanceFinal) / lbm);
        } else if (formDataState.aftDistanceFinal > 0) {
            aftCorrectedFinal = parseFloat(formDataState.aftPortFinal) + ((trimObservedFinal * formDataState.aftDistanceFinal) / lbm);
        } else if (formDataState.aftDistanceFinal === 0) {
            aftCorrectedFinal = parseFloat(formDataState.aftPortFinal);
        }

        //Mid Final
        let midCorrectedFinal;
        if (formDataState.midDistanceFinal < 0) {
            midCorrectedFinal = parseFloat(formDataState.midPortFinal) - ((trimObservedFinal * formDataState.midDistanceFinal) / lbm);
        } else if (formDataState.midDistanceFinal > 0) {
            midCorrectedFinal = parseFloat(formDataState.midPortFinal) + ((trimObservedFinal * formDataState.midDistanceFinal) / lbm);
        } else if (formDataState.midDistanceFinal === 0) {
            midCorrectedFinal = parseFloat(formDataState.midPortFinal);
        }

        // Trim Corrected:
        const trimCorrectedInitial = (aftCorrectedInitial - foreCorrectedInitial).toFixed(2);
        const trimCorrectedFinal = (aftCorrectedFinal - foreCorrectedFinal).toFixed(2);
        // Mean Fore Aft Initial:
        const meanForeAftInitial = ((foreCorrectedInitial + aftCorrectedInitial) / 2).toFixed(2);
        // Mean Of Mean Initial:
        const meanOfMeanInitial = ((meanForeAftInitial + midCorrectedInitial) / 2).toFixed(2);
        // Quarter Mean Initial:
        const quarterMeanInitial = ((meanOfMeanInitial + midCorrectedInitial) / 2).toFixed(2);
        // Mean Fore Aft Final:
        const meanForeAftFinal = ((foreCorrectedFinal + aftCorrectedFinal) / 2).toFixed(2);
        // Mean Of Mean Final:
        const meanOfMeanFinal = ((meanForeAftFinal + midCorrectedFinal) / 2).toFixed(2);
        // Quarter Mean Final:
        const quarterMeanFinal = ((meanOfMeanFinal + midCorrectedFinal) / 2).toFixed(2);

        // Calculate Displacements:

        // Update form data with calculated values
        setFormData(prev => ({
            ...prev,
            trimObservedInitial: trimObservedInitial.toFixed(2),
            trimObservedFinal: trimObservedFinal.toFixed(2),
            lbm: lbm.toFixed(2),
            foreCorrectedInitial: foreCorrectedInitial.toFixed(2),
            aftCorrectedInitial: aftCorrectedInitial.toFixed(2),
            midCorrectedInitial: midCorrectedInitial.toFixed(2),
            foreCorrectedFinal: foreCorrectedFinal.toFixed(2),
            aftCorrectedFinal: aftCorrectedFinal.toFixed(2),
            midCorrectedFinal: midCorrectedFinal.toFixed(2),
            trimCorrectedInitial: trimCorrectedInitial,
            trimCorrectedFinal: trimCorrectedFinal,
            meanForeAftInitial: meanForeAftInitial,
            meanOfMeanInitial: meanOfMeanInitial,
            quarterMeanInitial: quarterMeanInitial,
            meanForeAftFinal: meanForeAftFinal,
            meanOfMeanFinal: meanOfMeanFinal,
            quarterMeanFinal: quarterMeanFinal,
            keelCorrectionInitial: keelCorrectionInitial,
            keelCorrectionFinal: keelCorrectionFinal
        }));

        return {
            foreCorrectedInitial: parseFloat(foreCorrectedInitial.toFixed(2)),
            aftCorrectedInitial: parseFloat(aftCorrectedInitial.toFixed(2)),
            midCorrectedInitial: parseFloat(midCorrectedInitial.toFixed(2)),
            foreCorrectedFinal: parseFloat(foreCorrectedFinal.toFixed(2)),
            aftCorrectedFinal: parseFloat(aftCorrectedFinal.toFixed(2)),
            midCorrectedFinal: parseFloat(midCorrectedFinal.toFixed(2))
        };

    } catch (error) {
        console.error(error);
        alert("Error in calculations. Please check your input values.");
    }
};
