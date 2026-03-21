import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateSurveyPDF = async (shipData, calculatorData) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;
    let yPos = 20;

    const brand = {
        colors: {
            primary: '#2980b9',
            secondary: '#2c3e50',
            text: '#34495e',
        },
        fonts: {
            main: 'helvetica',
        }
    };

    // --- LOGO ---
    const loadImage = (src) => new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = src;
    });

    try {
        const companyLogo = await loadImage('/logolighouse.jpg');
        doc.addImage(companyLogo, 'JPEG', margin, 10, 50, 15);
    } catch (error) {
        console.error("Impossible de charger le logo pour le PDF.", error);
    }

    // --- HEADER TITLES ---
    doc.setFont(brand.fonts.main, "normal");
    doc.setFontSize(22);
    doc.setTextColor(brand.colors.secondary);
    doc.text(`${shipData.type || 'ONHIRE SURVEY'}`, pageWidth / 2, yPos + 10, { align: "center" });
    
    doc.setFontSize(14);
    doc.text(shipData.name || 'Unknown Vessel', pageWidth / 2, yPos + 20, { align: "center" });
    
    doc.setFontSize(10);
    doc.text(`Date: ${shipData.date || new Date().toLocaleDateString()}`, pageWidth / 2, yPos + 28, { align: "center" });
    
    yPos = 60;

    const addSectionTitle = (title) => {
        if (yPos > 270) { doc.addPage(); yPos = 20; }
        doc.setFontSize(12);
        doc.setFont(brand.fonts.main, "bold");
        doc.setTextColor(brand.colors.primary);
        doc.text(title, margin, yPos);
        yPos += 8;
        doc.setTextColor(brand.colors.text);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
    };

    // --- VESSEL PARTICULARS ---
    addSectionTitle("1.0 VESSEL PARTICULARS");
    autoTable(doc, {
        startY: yPos,
        body: [
            ['Name of Vessel', shipData.name || '', 'Type', shipData.type || ''],
            ['IMO', shipData.imo || '', 'Call Sign', shipData.callSign || ''],
            ['Date', shipData.date || '', 'Time', shipData.time || ''],
            ['Owner', shipData.owner || '', 'Charterer', shipData.charterer || ''],
            ['Master', shipData.master || '', 'Chief Engineer', shipData.chiefEngineer || ''],
            ['Place of Survey', shipData.placeOfSurvey || '', 'Place of Delivery', shipData.placeOfDelivery || ''],
            ['Draft FWD (m)', shipData.draftFwd || '', 'Draft AFT (m)', shipData.draftAft || ''],
        ],
        theme: 'grid',
        styles: { fontSize: 8, font: brand.fonts.main },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 40 }, 2: { fontStyle: 'bold', cellWidth: 40 } }
    });
    yPos = doc.lastAutoTable.finalY + 12;

    // --- FUEL SUMMARY (DECLARED VS CALCULATED) ---
    addSectionTitle("2.0 RECAPITULATION - BUNKERS ON BOARD");
    
    const summaryValues = calculatorData.summaryValues || {};
    const calculatedTotals = calculatorData.calculatedTotals || {};
    const entries = calculatorData.entries || [];
    
    const summaryData = ['VLSFO', 'HSFO', 'MDO', 'LSMGO'].map(fuel => {
        const declared = parseFloat(summaryValues[fuel]) || 0;
        const calculated = parseFloat(calculatedTotals[fuel]) || 0;
        const diff = (calculated - declared).toFixed(3);
        return [fuel, declared.toFixed(3), calculated.toFixed(3), diff];
    });

    autoTable(doc, {
        startY: yPos,
        head: [['Fuel Type', 'Declared Qty (MT)', 'Calculated Qty (MT)', 'Difference (MT)']],
        body: summaryData,
        theme: 'striped',
        headStyles: { fillColor: brand.colors.primary, font: brand.fonts.main },
        styles: { font: brand.fonts.main, halign: 'center' },
        columnStyles: { 0: { fontStyle: 'bold', halign: 'left' } }
    });
    yPos = doc.lastAutoTable.finalY + 15;

    // --- INDIVIDUAL TANK TABLES ---
    addSectionTitle("3.0 DETAILED TANK SOUNDINGS");

    const fuelGroups = [
        { name: 'HIGH SULPHUR FUEL OIL (T)', types: ['HFO', 'HSFO'], exclude: ['VLSFO'] },
        { name: 'VERY LOW SULPHUR FUEL OIL (T)', types: ['VLSFO'] },
        { name: 'MARINE DIESEL OIL (T)', types: ['MDO', 'MGO'], exclude: ['LSMGO'] },
        { name: 'LOW SULPHUR MARINE GAS OIL (T)', types: ['LSMGO'] }
    ];

    fuelGroups.forEach(group => {
        const groupEntries = entries.filter(e => {
            const isMatch = group.types.some(type => e.fuelType?.includes(type));
            const isExcluded = group.exclude?.some(ex => e.fuelType?.includes(ex));
            return isMatch && !isExcluded;
        });

        if (groupEntries.length > 0) {
            if (yPos > 240) { doc.addPage(); yPos = 20; }
            doc.setFontSize(10);
            doc.setFont(brand.fonts.main, "bold");
            doc.setTextColor(brand.colors.secondary);
            doc.text(group.name, margin, yPos);
            yPos += 5;

            autoTable(doc, {
                startY: yPos,
                head: [['Tank Nº', 'Sounding (m)', 'Vol (m³)', 'Dens @15', 'T° C', 'VCF', 'GSV', 'T (Vac)', 'T (Air)']],
                body: groupEntries.map(e => [
                    e.tankName,
                    (e.sounding || 0).toFixed(3),
                    (e.observedVolume || 0).toFixed(3),
                    (e.densityAt15 || 0).toFixed(4),
                    (e.temperature || 0).toFixed(1),
                    (e.vcf || 0),
                    (e.gsv || 0),
                    (e.weightInVacuum || 0),
                    (e.weightInAir || 0)
                ]),
                theme: 'grid',
                headStyles: { fillColor: [230, 230, 230], textColor: 20, font: brand.fonts.main, fontSize: 7, halign: 'center' },
                styles: { font: brand.fonts.main, fontSize: 7, halign: 'center' },
                columnStyles: { 0: { fontStyle: 'bold', halign: 'left' } }
            });
            yPos = doc.lastAutoTable.finalY + 10;
        }
    });

    // --- DISCLAIMER & SIGNATURES ---
    const addFooterWithSignatures = () => {
        // If not enough space for signatures, push to next page
        if (yPos > 240) { doc.addPage(); yPos = 20; }
        else { yPos = 250; } // Push to bottom of current page

        const lineY = yPos;
        doc.setDrawColor(150);
        doc.setLineWidth(0.3);
        doc.line(margin, lineY, pageWidth - margin, lineY);
        
        yPos += 5;
        // Disclaimer
        doc.setFontSize(7);
        doc.setFont(brand.fonts.main, "italic");
        doc.setTextColor(100);
        const disclaimer = "These measurements and information are valid only at the time of taking measurements. / Ces valeurs sont exactes au moment de l'expertise.";
        const disclaimerLines = doc.splitTextToSize(disclaimer, pageWidth - (margin * 2));
        doc.text(disclaimerLines, margin, yPos);
        
        // Zone de signatures
        yPos += 15;
        const colWidth = (pageWidth - (margin * 2)) / 3;
        
        doc.setFontSize(8);
        doc.setFont(brand.fonts.main, "bold");
        doc.setTextColor(brand.colors.secondary);
        
        // Signature 1: For the Ship / Bord
        doc.text("For the Ship / Bord", margin + (colWidth / 2), yPos, { align: "center" });
        doc.line(margin, yPos + 3, margin + colWidth - 10, yPos + 3);
        doc.setFont(brand.fonts.main, "normal");
        doc.setFontSize(7);
        doc.text("Signature & Stamp:", margin, yPos + 8);
        
        // Signature 2: 3rd Party
        const col2X = margin + colWidth;
        doc.setFontSize(8);
        doc.setFont(brand.fonts.main, "bold");
        doc.text("3rd Party / 3ème partie", col2X + (colWidth / 2), yPos, { align: "center" });
        doc.line(col2X, yPos + 3, col2X + colWidth - 10, yPos + 3);
        doc.setFont(brand.fonts.main, "normal");
        doc.setFontSize(7);
        doc.text("Signature & Stamp:", col2X, yPos + 8);
        
        // Signature 3: Inspector / Surveyor
        const col3X = margin + (colWidth * 2);
        doc.setFontSize(8);
        doc.setFont(brand.fonts.main, "bold");
        doc.text("Inspector / Surveyor", col3X + (colWidth / 2), yPos, { align: "center" });
        doc.line(col3X, yPos + 3, col3X + colWidth - 10, yPos + 3);
        doc.setFont(brand.fonts.main, "normal");
        doc.setFontSize(7);
        doc.text("Signature & Stamp:", col3X, yPos + 8);
    };

    addFooterWithSignatures();

    // Save PDF
    const safeName = (shipData.name || 'Survey').replace(/[^a-z0-9]/gi, '_');
    doc.save(`${safeName}_Survey_Report.pdf`);
};
