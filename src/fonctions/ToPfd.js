import jsPDF from 'jspdf';

const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 10;
    let yPosition = 20;
    const lineHeight = 7;

    // Helper function to add centered text
    const addCenteredText = (text: string, y: number, size = 16) => {
        doc.setFontSize(size);
        const textWidth = doc.getStringUnitWidth(text) * size / doc.internal.scaleFactor;
        const x = (pageWidth - textWidth) / 2;
        doc.text(text, x, y);
        return y + lineHeight;
    };

    // Helper function to add field with label
    const addField = (label: string, value: any, y: number) => {
        doc.setFontSize(12);
        doc.text(`${label}: ${value}`, margin, y);
        return y + lineHeight;
    };

    // Title
    yPosition = addCenteredText('DRAFT SURVEY REPORT', yPosition, 20);
    yPosition += 5;

    // Vessel Information
    doc.setFontSize(16);
    doc.text('Vessel Information', margin, yPosition);
    yPosition += lineHeight;

    yPosition = addField('Vessel', formData.vessel, yPosition);
    yPosition = addField('Cargo', formData.cargo, yPosition);
    yPosition = addField('B/L Weight', formData.blWeight.toString(), yPosition);
    yPosition = addField('B/L Date', formData.blDate.toLocaleDateString(), yPosition);
    yPosition = addField('Port of Loading', formData.portLoading, yPosition);
    yPosition = addField('Port of Discharging', formData.portDischarging, yPosition);
    yPosition += 5;

    // Ship Details
    doc.setFontSize(16);
    doc.text('Ship Details', margin, yPosition);
    yPosition += lineHeight;

    yPosition = addField('Flag', formData.flag, yPosition);
    yPosition = addField('Port of Registry', formData.portRegistry, yPosition);
    yPosition = addField('Gross Tonnage', formData.grossTonnage.toString(), yPosition);
    yPosition = addField('Net Tonnage', formData.netTonnage.toString(), yPosition);
    yPosition += 5;

    // Add new page for Draft Measurements
    doc.addPage();
    yPosition = 20;

    // Draft Measurements
    doc.setFontSize(16);
    doc.text('Draft Measurements', margin, yPosition);
    yPosition += lineHeight;

    // Initial Survey
    doc.setFontSize(14);
    doc.text('Initial Survey', margin, yPosition);
    yPosition += lineHeight;

    // FORE
    yPosition = addField('FORE Mean', formData.foreMeanInitial.toString(), yPosition);
    yPosition = addField('AFT Mean', formData.aftMeanInitial.toString(), yPosition);
    yPosition = addField('MID Mean', formData.midMeanInitial.toString(), yPosition);
    yPosition = addField('Quarter Mean', formData.quarterMeanInitial.toString(), yPosition);
    yPosition += 5;

    // Final Survey
    doc.setFontSize(14);
    doc.text('Final Survey', margin, yPosition);
    yPosition += lineHeight;

    yPosition = addField('FORE Mean', formData.foreMeanFinal.toString(), yPosition);
    yPosition = addField('AFT Mean', formData.aftMeanFinal.toString(), yPosition);
    yPosition = addField('MID Mean', formData.midMeanFinal.toString(), yPosition);
    yPosition = addField('Quarter Mean', formData.quarterMeanFinal.toString(), yPosition);
    yPosition += 5;

    // Add new page for Displacement Calculations
    doc.addPage();
    yPosition = 20;

    // Displacement Calculations
    doc.setFontSize(16);
    doc.text('Displacement Calculations', margin, yPosition);
    yPosition += lineHeight;

    // Initial Displacement
    doc.setFontSize(14);
    doc.text('Initial Displacement', margin, yPosition);
    yPosition += lineHeight;

    yPosition = addField('Corresponding Displacement', formData.correspondingDisplacementInitial.toString(), yPosition);
    yPosition = addField('Trim Correction', formData.totalTrimCorrectionValue.toString(), yPosition);
    yPosition = addField('Corrected for Trim', formData.correctedDisplacementForTrimInitial.toString(), yPosition);
    yPosition = addField('Density Correction', formData.densityDockWaterInitial.toString(), yPosition);
    yPosition = addField('Net Displacement', formData.netLightLoadedDisplacementInitial.toString(), yPosition);
    yPosition += 5;

    // Final Displacement
    doc.setFontSize(14);
    doc.text('Final Displacement', margin, yPosition);
    yPosition += lineHeight;

    yPosition = addField('Corresponding Displacement', formData.correspondingDisplacementFinal.toString(), yPosition);
    yPosition = addField('Trim Correction', formData.trimCorrectionFinal.toString(), yPosition);
    yPosition = addField('Corrected for Trim', formData.correctedDisplacementForTrimFinal.toString(), yPosition);
    yPosition = addField('Density Correction', formData.densityDockWaterFinal.toString(), yPosition);
    yPosition = addField('Net Displacement', formData.netLightLoadedDisplacementFinal.toString(), yPosition);
    yPosition += 10;

    // Total Cargo
    doc.setFontSize(16);
    yPosition = addCenteredText(`Total Cargo: ${formData.totalCargoLoadedOnBoard.toFixed(3)} MT`, yPosition);

    // Save the PDF
    const fileName = `Draft_Survey_Report_${formData.vessel}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
};