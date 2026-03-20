/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    boxShadow: "0 8px 32px 0 rgba(0,0,0,0.3)",
    background: "#000000",
    color: "#ffffff",
    overflowX: "auto",
    width: "100%",
}));

const StyledTextField = styled(TextField)({
    "& .MuiInputBase-input": {
        color: "#ffff00",
        textAlign: "center",
    },
    "& .MuiInputLabel-root": {
        color: "#ffffff",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#ffffff",
        },
        "&:hover fieldset": {
            borderColor: "#ffff00",
        },
    },
});
const HighlightedValueCell = styled(Typography)({
    padding: "12px",
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: "bold",
    border: "2px solid #00ff00",
    borderRadius: "8px",
    backgroundColor: "rgba(0, 255, 0, 0.1)",
    color: "#00ff00",
    margin: "4px",
    boxShadow: "0 0 10px rgba(0, 255, 0, 0.3)",
    "&:hover": {
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        boxShadow: "0 0 15px rgba(0, 255, 0, 0.5)",
    },
});

const ValueCell = styled(Typography)({
    padding: "8px",
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&.yellow": {
        color: "#ffff00",
    },
});

// Add custom styled components for MTC Table
const MTCTable = styled(Grid)({
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "8px",
    padding: "16px",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
});

const MTCHeader = styled(Typography)(({ theme }) => ({
    gridColumn: "1 / span 3",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "8px",
}));

const MTCRow = styled(Grid)({
    display: "contents",
});

const MTCLabel = styled(Typography)({
    gridColumn: "1",
    display: "flex",
    alignItems: "center",
});

const MTCValue = styled(Typography)({
    gridColumn: "2",
    textAlign: "right",
});

const MTCValueHighlight = styled(MTCValue)(({ theme }) => ({
    gridColumn: "3",
    color: theme.palette.primary.main,
    fontWeight: "bold",
}));

const TrimCorrectionTable = styled(Grid)({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    padding: "16px",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
});

const TrimCorrectionHeader = styled(Typography)({
    gridColumn: "1 / span 2",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "8px",
});

const TrimCorrectionRow = styled(Grid)({
    display: "contents",
});

const TrimCorrectionLabel = styled(Typography)({
    gridColumn: "1",
    display: "flex",
    alignItems: "center",
});

const TrimCorrectionValue = styled(Typography)({
    gridColumn: "2",
    textAlign: "right",
});

export interface DisplacementProps extends React.HTMLAttributes<HTMLSpanElement> {
    type?: "initial" | "final";
    density: number;
    draftSup: number;
    quarterMean: number;
    quarterMeanInitial: number;
    quarterMeanFinal: number;
    draftInf: number;
    displacementSup: number;
    displacement: number;
    correspondingDisplInitial: number;
    correspondingDisplFinal: number;
    tpcSup: number;
    lcfSup: number;
    mtcPlus50: number;
    mtcMinus50: number;
    tpc: number;
    lcf: number;
    displacementInf: number;
    tpcInf: number;
    lcfInf: number;
    lcfInitial: number;
    lcfFinal: number;
    tpcInitial: number;
    tpcFinal: number;
    deltaMtc: number;
    trimCorrected: number;
    totalTrimCorrectionInitial: number;
    secondTrimCorrectionInitial: number;

    totalTrimCorrectedInitial: number;
    totalTrimCorrectedFinal: number;
    trimCorrectedFinal: number;
    firstTrimCorrectionInitial: number;
    firstTrimCorrectionValue: number;
    firstTrimCorrectionFinal: number;
    secondTrimCorrection: number;
    secondTrimCorrectionValue: number;
    secondTrimCorrectionFinal: number;
    totalTrimCorrection: number;
    totalTrimCorrectionValue: number;
    totalTrimCorrectionFinal: number;
    foreCorrectedInitial: number;
    aftCorrectedInitial: number;
    midCorrectedInitial: number;
    foreCorrectedFinal: number;
    aftCorrectedFinal: number;
    midCorrectedFinal: number;
    lbp: number;
    newDisplacementCorrectedByTrim: number;
    newDisplacementCorrectedByDensity: number;
    totalBallast: number;
    freeshWater: number;
    totalBunker: number;
    lightShip: number;
    others: number;
    totalDeductibles: number;
    onValueChange?: (field: string, value: number) => void;
}

const Displacement: React.FC<DisplacementProps> = ({
    type,
    density,
    draftSup,
    quarterMean,
    draftInf,
    displacementSup,
    displacement,
    tpcSup,
    lcfSup,
    mtcPlus50,
    tpc,
    lcf,
    displacementInf,
    tpcInf,
    lcfInf,
    mtcMinus50,
    deltaMtc,
    trimCorrected,
    firstTrimCorrectionInitial,
    firstTrimCorrectionFinal,
    secondTrimCorrectionInitial,
    secondTrimCorrection,
    totalTrimCorrection,
    totalTrimCorrectionInitial,
    totalTrimCorrectionFinal,
    tpcInitial,
    tpcFinal,
    lcfInitial,
    lcfFinal,
    foreCorrectedInitial,
    aftCorrectedInitial,
    midCorrectedInitial,

    foreCorrectedFinal,
    aftCorrectedFinal,
    midCorrectedFinal,
    correspondingDisplInitial,
    correspondingDisplFinal,
    lbp,
    newDisplacementCorrectedByTrim,
    newDisplacementCorrectedByDensity,
    totalBallast,
    freeshWater,
    totalBunker,
    lightShip,
    others,
    totalDeductibles,
    onValueChange,
}) => {
    const handleValueChange = React.useCallback((field: string, value: number) => {
        if (onValueChange) {
            onValueChange(field, value);
        }
    }, [onValueChange]);

    // États pour les valeurs supérieures et inférieures
    const [displacementSupValue, setDisplacementSupValue] =
        React.useState(displacementSup);
    const [displacementInfValue, setDisplacementInfValue] =
        React.useState(displacementInf);
    const [tpcSupValue, setTpcSupValue] = React.useState(tpcSup);
    const [tpcInfValue, setTpcInfValue] = React.useState(tpcInf);
    const [lcfSupValue, setLcfSupValue] = React.useState(lcfSup);
    const [lcfInfValue, setLcfInfValue] = React.useState(lcfInf);
    const [mtcPlus50Value, setMtcPlus50Value] = React.useState(mtcPlus50);
    const [mtcMinus50Value, setMtcMinus50Value] = React.useState(mtcMinus50);
    const [firstTrimCorrectionValue, setFirstTrimCorrectionValue] =
        React.useState(firstTrimCorrectionInitial);
    const [secondTrimCorrectionValue, setSecondTrimCorrectionValue] =
        React.useState(secondTrimCorrectionInitial);
    const [totalTrimCorrectionValue, setTotalTrimCorrectionValue] =
        React.useState<number>(0);
    const [trimCorrectedValue, setTrimCorrectedValue] =
        React.useState<number>(0);
    const [
        newDisplacementCorrectedByTrimValue,
        setNewDisplacementCorrectedByTrimValue,
    ] = React.useState(newDisplacementCorrectedByTrim);
    const [
        newDisplacementCorrectedByDensityValue,
        setNewDisplacementCorrectedByDensityValue,
    ] = React.useState(newDisplacementCorrectedByDensity);
    const [totalBallastValue, setTotalBallastValue] =
        React.useState(totalBallast);
    const [freeshWaterValue, setfreeshWaterValue] = React.useState(freeshWater);
    const [totalBunkerValue, setTotalBunkerValue] = React.useState(totalBunker);
    const [lightShipValue, setLightShipValue] = React.useState(lightShip);
    const [othersValue, setOthersValue] = React.useState(others);
    const [totalDeductiblesValue, setTotalDeductiblesValue] =
        React.useState(totalDeductibles);

    // Fonction pour gérer les changements dans les champs
    const handleChange =
        (field: keyof DisplacementProps) =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                const value = parseFloat(event.target.value);
                if (!isNaN(value)) {
                    switch (field) {
                        case "displacementSup":
                            setDisplacementSupValue(value);
                            break;
                        case "displacementInf":
                            setDisplacementInfValue(value);
                            break;
                        case "tpcSup":
                            setTpcSupValue(value);
                            break;
                        case "tpcInf":
                            setTpcInfValue(value);
                            break;
                        case "lcfSup":
                            setLcfSupValue(value);
                            break;
                        case "lcfInf":
                            setLcfInfValue(value);
                            break;
                        case "mtcPlus50":
                            setMtcPlus50Value(value);
                            break;
                        case "mtcMinus50":
                            setMtcMinus50Value(value);
                            break;
                    }
                    if (onValueChange) {
                        onValueChange(field, value);
                    }
                }
            };

    // Deductibles Section
    const handleDeductibleChange = (field: string, value: number) => {
        if (onValueChange) {
            onValueChange(field, value);

            // Calculate total deductibles
            const newTotalDeductibles =
                (field === "totalBallast" ? value : totalBallast || 0) +
                (field === "freeshWater" ? value : freeshWater || 0) +
                (field === "totalBunker" ? value : totalBunker || 0) +
                (field === "lightShip" ? value : lightShip || 0) +
                (field === "others" ? value : others || 0);

            onValueChange("totalDeductibles", newTotalDeductibles);
        }
    };

    // Effet pour recalculer les valeurs lorsque les inputs changent
    React.useEffect(() => {
        // Fonction pour calculer les valeurs moyennes
        const calculateValues = () => {
            // Calcul du displacement
            const newDisplacement =
                displacementInfValue +
                ((displacementSupValue - displacementInfValue) /
                    (draftSup - draftInf)) *
                (draftSup - parseFloat(quarterMean.toFixed(2)));
            handleValueChange("displacement", newDisplacement);

            // Calcul du TPC
            const newTpc =
                tpcInfValue +
                ((tpcSupValue - tpcInfValue) /
                    (parseFloat(draftSup.toFixed(2)) - parseFloat(draftInf.toFixed(2)))) *
                (parseFloat(draftSup.toFixed(2)) -
                    parseFloat(quarterMean.toFixed(2)));
            handleValueChange("tpc", newTpc);

            // Calcul du LCF
            const newLcf =
                lcfInfValue +
                ((lcfSupValue - lcfInfValue) /
                    (parseFloat(draftSup.toFixed(2)) - parseFloat(draftInf.toFixed(2)))) *
                (parseFloat(draftSup.toFixed(2)) -
                    parseFloat(quarterMean.toFixed(2)));
            handleValueChange("lcf", newLcf);

            // Calcul du MTC en premier
            // Calcul du deltaMtc en premier
            const newDeltaMtc = mtcPlus50 - mtcMinus50;
            handleValueChange("deltaMtc", newDeltaMtc);
            console.log("deltaMtc calculated:", newDeltaMtc);

            // Calcul du Trim Corrected:
            const newTrimCorrected = parseFloat(
                (aftCorrectedInitial - foreCorrectedInitial).toFixed(2)
            );
            handleValueChange("trimCorrected", newTrimCorrected);
            console.log("trim corrected", newTrimCorrected);

            //Calcul de la premiere correction de trim:

            //Calcul de la premiere correction de trim:
            let newFirstTRimCorrection = 0;
            // La formule de base est la même dans tous les cas
            newFirstTRimCorrection = (newTrimCorrected * 100 * newTpc * newLcf) / lbp;

            handleValueChange("firstTrimCorrection", newFirstTRimCorrection);
            console.log("first trim corrected", newFirstTRimCorrection);

            //Calcul de la deuxième correction de trim:
            const newSecondTrimCorrection =
                (newTrimCorrected * newTrimCorrected * 50 * newDeltaMtc) / lbp;
            handleValueChange("secondTrimCorrection", newSecondTrimCorrection);
            console.log("second trim corrected", newSecondTrimCorrection);
            //Calcul de la correction totale de trim:
            const newTotalTrimCorrection =
                newFirstTRimCorrection + newSecondTrimCorrection;
            handleValueChange("totalTrimCorrection", newTotalTrimCorrection);

            // Calcul du displacement corrected by the trim:
            let newDisplacementCorrectedByTrim =
                newDisplacement + newTotalTrimCorrection;

            if (newTrimCorrected === 0) {
                newDisplacementCorrectedByTrim = newDisplacement;
            }
            handleValueChange(
                "newDisplacementCorrectedByTrim",
                newDisplacementCorrectedByTrim
            );
            console.log(
                "displacement corrected by trim",
                newDisplacementCorrectedByTrim
            );

            // Calcul du displacement corrected by Density:

            let newDisplacementCorrectedByDensity =
                (newDisplacementCorrectedByTrim * 1.025) / density;
            handleValueChange(
                "newDisplacementCorrectedByDensity",
                newDisplacementCorrectedByDensity
            );
        };

        calculateValues();
    }, [
        displacementSupValue,
        displacementInfValue,
        tpcSupValue,
        tpcInfValue,
        lcfSupValue,
        lcfInfValue,
        mtcPlus50Value,
        mtcMinus50Value,
        draftSup,
        draftInf,
        quarterMean,
        trimCorrectedValue,
        firstTrimCorrectionValue,
        secondTrimCorrectionValue,
        totalTrimCorrectionValue,
        displacement,
        foreCorrectedInitial,
        aftCorrectedInitial,
        foreCorrectedFinal,
        aftCorrectedFinal,
        correspondingDisplFinal,
        density,
        handleValueChange,
        lbp,
        mtcMinus50,
        mtcPlus50,
    ]);

    return (
        <StyledPaper>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="h6">DISPLACEMENT</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <StyledTextField
                                size="small"
                                type="number"
                                label="Densité"
                                value={parseFloat(density.toFixed(3))}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const normalizedValue = value.replace(",", ".");
                                    const numericValue =
                                        normalizedValue === "" ? 0 : parseFloat(normalizedValue);
                                    if (onValueChange) {
                                        onValueChange(
                                            "density",
                                            isNaN(numericValue) ? 0 : numericValue
                                        );
                                    }
                                }}
                                inputProps={{
                                    step: "0.001",
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                {/* Header Row */}
                <Grid item xs={12}>
                    <Grid container wrap="nowrap">
                        <Grid item xs={2}>
                            <ValueCell>Interpolation</ValueCell>
                        </Grid>
                        <Grid item xs={2}>
                            <ValueCell>Draft</ValueCell>
                        </Grid>
                        <Grid item xs={2}>
                            <ValueCell>Displacement</ValueCell>
                        </Grid>
                        <Grid item xs={2}>
                            <ValueCell>TPC</ValueCell>
                        </Grid>
                        <Grid item xs={2}>
                            <ValueCell>LCF</ValueCell>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Draft Sup Row */}
                <Grid item xs={12}>
                    <Grid container wrap="nowrap">
                        <Grid item xs={2}>
                            <ValueCell>Draft Sup</ValueCell>
                        </Grid>
                        <Grid item xs={2}>
                            <StyledTextField
                                size="small"
                                type="number"
                                value={parseFloat(draftSup.toFixed(2))}
                                onChange={handleChange("draftSup")}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <StyledTextField
                                size="small"
                                type="number"
                                value={displacementSupValue}
                                onChange={handleChange("displacementSup")}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <StyledTextField
                                size="small"
                                type="number"
                                value={tpcSupValue}
                                onChange={handleChange("tpcSup")}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <StyledTextField
                                size="small"
                                type="number"
                                value={lcfSupValue}
                                onChange={handleChange("lcfSup")}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                {/* Quarter Mean Row */}
                <Grid item xs={12}>
                    <Grid container wrap="nowrap">
                        <Grid item xs={2}>
                            <ValueCell>Quarter Mean</ValueCell>
                        </Grid>
                        <Grid item xs={2}>
                            <HighlightedValueCell>
                                {quarterMean.toFixed(2)}
                            </HighlightedValueCell>
                        </Grid>
                        <Grid item xs={2}>
                            <HighlightedValueCell>
                                {displacement.toFixed(2)}
                            </HighlightedValueCell>
                        </Grid>
                        <Grid item xs={2}>
                            <HighlightedValueCell>{tpc.toFixed(2)}</HighlightedValueCell>
                        </Grid>
                        <Grid item xs={2}>
                            <HighlightedValueCell>{lcf.toFixed(2)}</HighlightedValueCell>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Draft Inf Row */}
                <Grid item xs={12}>
                    <Grid container wrap="nowrap">
                        <Grid item xs={2}>
                            <ValueCell>Draft Inf</ValueCell>
                        </Grid>
                        <Grid item xs={2}>
                            <StyledTextField
                                size="small"
                                type="number"
                                value={parseFloat(draftInf.toFixed(2))}
                                onChange={handleChange("draftInf")}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <StyledTextField
                                size="small"
                                type="number"
                                value={displacementInfValue}
                                onChange={handleChange("displacementInf")}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <StyledTextField
                                size="small"
                                type="number"
                                value={tpcInfValue}
                                onChange={handleChange("tpcInf")}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <StyledTextField
                                size="small"
                                type="number"
                                value={lcfInfValue}
                                onChange={handleChange("lcfInf")}
                            />
                        </Grid>
                    </Grid>
                    {/* MTC Table */}
                    <Grid item xs={12} sx={{ margin: "20px" }}>
                        <MTCTable>
                            <MTCHeader>MTC</MTCHeader>
                            <MTCRow>
                                <MTCLabel>MTC + 50 cm</MTCLabel>
                                <MTCValue>
                                    {(parseFloat(quarterMean.toFixed(2)) + 0.5).toFixed(2) + " m"}
                                </MTCValue>
                                <MTCValueHighlight>
                                    <input
                                        type="number"
                                        value={mtcPlus50}
                                        onChange={handleChange("mtcPlus50")}
                                        title="MTC Plus 50"
                                        style={{
                                            width: "50%",
                                            background: "transparent",
                                            border: "none",
                                            color: "inherit",
                                            textAlign: "center",
                                        }}
                                    />
                                </MTCValueHighlight>
                            </MTCRow>
                            <MTCRow>
                                <MTCLabel>MTC + 50 cm</MTCLabel>
                                <MTCValue>
                                    {(parseFloat(quarterMean.toFixed(2)) - 0.5).toFixed(2) + " m"}
                                </MTCValue>
                                <input
                                    type="number"
                                    value={mtcMinus50}
                                    onChange={handleChange("mtcMinus50")}
                                    title="MTC Minus 50"
                                    style={{
                                        width: "50%",
                                        background: "transparent",
                                        border: "none",
                                        color: "inherit",
                                        textAlign: "center",
                                    }}
                                />
                            </MTCRow>

                            <MTCRow>
                                <MTCLabel>DMZ</MTCLabel>
                                <MTCValue>
                                    <div style={{ gridColumn: "2 / span 2" }}>
                                        {(mtcPlus50 - mtcMinus50).toFixed(2) + " m"}
                                    </div>
                                </MTCValue>
                            </MTCRow>
                        </MTCTable>
                    </Grid>

                    {/* Correction Du displacement par le trim & density*/}
                    <Grid item xs={12} sx={{ margin: "20px" }}>
                        <TrimCorrectionTable>
                            <TrimCorrectionHeader>
                                DISPLACEMENT CORRECTION
                            </TrimCorrectionHeader>
                            <TrimCorrectionRow>
                                <TrimCorrectionLabel>First Trim Correction</TrimCorrectionLabel>
                                <TrimCorrectionValue>
                                    {firstTrimCorrectionInitial.toFixed(2)}
                                </TrimCorrectionValue>
                            </TrimCorrectionRow>
                            <TrimCorrectionRow>
                                <TrimCorrectionLabel>
                                    Second Trim Correction
                                </TrimCorrectionLabel>
                                <TrimCorrectionValue>
                                    {secondTrimCorrectionInitial.toFixed(2)}
                                </TrimCorrectionValue>
                            </TrimCorrectionRow>
                            <TrimCorrectionRow>
                                <TrimCorrectionLabel>Total Trim Correction</TrimCorrectionLabel>
                                <TrimCorrectionValue>
                                    {totalTrimCorrectionInitial.toFixed(2)}
                                </TrimCorrectionValue>
                            </TrimCorrectionRow>
                            <TrimCorrectionRow>
                                <TrimCorrectionLabel>
                                    Displacement Corrected By Trim
                                </TrimCorrectionLabel>
                                <TrimCorrectionValue>
                                    {newDisplacementCorrectedByTrim.toFixed(2)}
                                </TrimCorrectionValue>
                            </TrimCorrectionRow>
                            <TrimCorrectionRow>
                                <TrimCorrectionLabel>
                                    Displacement Corrected By Density
                                </TrimCorrectionLabel>
                                <TrimCorrectionValue>
                                    {newDisplacementCorrectedByDensityValue.toFixed(2)}
                                </TrimCorrectionValue>
                            </TrimCorrectionRow>
                        </TrimCorrectionTable>
                    </Grid>
                    {/* Deductibles */}
                    <Grid container spacing={2} sx={{ mt: 3 }}>
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ color: "#00ff00", mb: 2 }}>
                                Deductibles
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <StyledTextField
                                label="Total Ballast"
                                type="number"
                                value={totalBallast || ""}
                                onChange={(e) =>
                                    handleDeductibleChange("totalBallast", Number(e.target.value))
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <StyledTextField
                                label="Fresh Water"
                                type="number"
                                value={freeshWater || ""}
                                onChange={(e) =>
                                    handleDeductibleChange("freeshWater", Number(e.target.value))
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <StyledTextField
                                label="Total Bunker"
                                type="number"
                                value={totalBunker || ""}
                                onChange={(e) =>
                                    handleDeductibleChange("totalBunker", Number(e.target.value))
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <StyledTextField
                                label="Light Ship"
                                type="number"
                                value={lightShip || ""}
                                onChange={(e) =>
                                    handleDeductibleChange("lightShip", Number(e.target.value))
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <StyledTextField
                                label="Others"
                                type="number"
                                value={others || ""}
                                onChange={(e) =>
                                    handleDeductibleChange("others", Number(e.target.value))
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <HighlightedValueCell>
                                Total Deductibles: {totalDeductibles?.toFixed(3) || "0.000"}
                            </HighlightedValueCell>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <HighlightedValueCell>
                                {type === "final" ? "Final" : "Initial"} Displacement:{" "}
                                {(
                                    newDisplacementCorrectedByDensity - totalDeductibles
                                )?.toFixed(3) || "0.000"}
                            </HighlightedValueCell>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </StyledPaper>
    );
};

export default Displacement;
