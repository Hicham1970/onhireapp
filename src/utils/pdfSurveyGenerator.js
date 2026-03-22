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
        const companyLogo = await loadImage('/logolightouse.jpg');
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

    // --- FUEL TIMELINE ---
    addSectionTitle("1.1 FUEL TIMELINE");
    const fuelTimelineData = [
        ['E.O.S.P.', shipData.eosPDate || '', shipData.eosPTime || '', shipData.eosPHsfo || '', shipData.eosPLsfo || '', shipData.eosPHmdo || '', shipData.eosPLsmgo || ''],
        ['P.O.B.', shipData.pobDate || '', shipData.pobTime || '', shipData.pobHsfo || '', shipData.pobLsfo || '', shipData.pobHmdo || '', shipData.pobLsmgo || ''],
        ['F.W.E.', shipData.fweDate || '', shipData.fweTime || '', shipData.fweHsfo || '', shipData.fweLsfo || '', shipData.fweHmdo || '', shipData.fweLsmgo || ''],
        ['Time of Survey', shipData.surveyTimeDate || '', shipData.surveyTimeTime || '', shipData.surveyTimeHsfo || '', shipData.surveyTimeLsfo || '', shipData.surveyTimeHmdo || '', shipData.surveyTimeLsmgo || ''],
        ['Date of Completion', shipData.completionDate || '', '', '', '', '', '']
    ];
    autoTable(doc, {
        startY: yPos,
        head: [['Event', 'DATE', 'TIME', 'H.S.F.O.', 'L.S.F.O.', 'H.M.D.O.', 'L.S.M.G.O.']],
        body: fuelTimelineData,
        theme: 'grid',
        styles: { fontSize: 7, font: brand.fonts.main, halign: 'center' },
        headStyles: { fillColor: brand.colors.primary, fontSize: 8, textColor: 255 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 25, halign: 'left' } }
    });
    yPos = doc.lastAutoTable.finalY + 12;




    // --- INDIVIDUAL TANK TABLES ---
    addSectionTitle("2.0 DETAILED TANK SOUNDINGS");

    const entries = calculatorData?.entries || [];
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

        // const lineY = yPos;
        // doc.setDrawColor(150);
        // doc.setLineWidth(0.3);
        // doc.line(margin, lineY, pageWidth - margin, lineY);
        
        // Zone de signatures first
        yPos += 5;
        const colWidth = (pageWidth - (margin * 2)) / 3;
        
        doc.setFontSize(8);
        doc.setFont(brand.fonts.main, "bold");
        doc.setTextColor(brand.colors.secondary);
        
        // Signature 1: For the Ship / Bord
        doc.text("Chef Engineer name:", margin + (colWidth / 2), yPos, { align: "center" });
        doc.line(margin, yPos + 3, margin + colWidth - 10, yPos + 3);
        doc.setFont(brand.fonts.main, "normal");
        doc.setFontSize(7);
        doc.text("Signature & Stamp:", margin, yPos + 8);
        
        // Signature 2: 3rd Party
        const col2X = margin + colWidth;
        doc.setFontSize(8);
        doc.setFont(brand.fonts.main, "bold");
        doc.text("Master/Captain:", col2X + (colWidth / 2), yPos, { align: "center" });
        doc.line(col2X, yPos + 3, col2X + colWidth - 10, yPos + 3);
        doc.setFont(brand.fonts.main, "normal");
        doc.setFontSize(7);
        doc.text("Signature & Stamp:", col2X, yPos + 8);
        
        // Signature 3: Inspector / Surveyor
        const col3X = margin + (colWidth * 2);
        doc.setFontSize(8);
        doc.setFont(brand.fonts.main, "bold");
        doc.text("Surveyor/Inspector:", col3X + (colWidth / 2), yPos, { align: "center" });
        doc.line(col3X, yPos + 3, col3X + colWidth - 10, yPos + 3);
        doc.setFont(brand.fonts.main, "normal");
        doc.setFontSize(7);
        doc.text("Signature & Stamp:", col3X, yPos + 8);
        
        yPos += 25;
        // Disclaimer AFTER signatures
        doc.setFontSize(7);
        doc.setFont(brand.fonts.main, "italic");
        doc.setTextColor(100);
        const disclaimer = "Inspection was made in the best of our judgement without prejudice to any of the parties involved. These measurements and information are valid only at the time of taking measurements. / L'inspection a été faite au meilleur de notre jugement sans préjudice pour aucune des parties impliquées. Ces valeurs sont exactes au moment de l'expertise.";
        const disclaimerLines = doc.splitTextToSize(disclaimer, pageWidth - (margin * 2));
        doc.text(disclaimerLines, margin, yPos);
    };

    addFooterWithSignatures();

    // Save PDF
    const safeName = (shipData.name || 'Survey').replace(/[^a-z0-9]/gi, '_');
    doc.save(`${safeName}_Survey_Report.pdf`);
};

export const generateCertificatePDF = async (shipData, calculatorData) => {
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
        const companyLogo = await loadImage('/logolightouse.jpg');
        doc.addImage(companyLogo, 'JPEG', margin, 10, 50, 15);
    } catch (error) {
        console.error("Impossible de charger le logo pour le PDF.", error);
    }

    // --- HEADER ---
    doc.setFont(brand.fonts.main, "bold");
    doc.setFontSize(18);
    doc.setTextColor(brand.colors.secondary);
    // Titre dynamique selon le type (Delivery / Redelivery / OnHire / OffHire)
    const certTitle = (shipData.type || 'CERTIFICATE OF ON/OFF HIRE SURVEY').toUpperCase();
    doc.text(certTitle, pageWidth / 2, yPos + 15, { align: "center" });
    
    yPos += 30;

    // --- CERTIFICATION TEXT ---
    doc.setFontSize(11);
    doc.setFont(brand.fonts.main, "normal");
    doc.setTextColor(0);

    // Mapping des données
    const vesselName = shipData.name || "UNKNOWN";
    const flag = shipData.portOfRegistry || "MARSHALL ISLANDS";
    const portReg = shipData.portOfRegistry || "UNKNOWN"; // P. of Reg.
    const grossTonnage = shipData.grossTons || "0";
    const netTonnage = shipData.netTonnage || "0";
    // Logique basique pour Delivery vs Redelivery (peut être ajustée si vous avez des champs spécifiques deliveredBy/To)
    const isRedelivery = (shipData.type || '').toLowerCase().includes('redelivery') || (shipData.type || '').toLowerCase().includes('off-hire');
    const deliverer = isRedelivery ? (shipData.charterer || "CHARTERERS") : (shipData.owner || "OWNERS");
    const receiver = isRedelivery ? (shipData.owner || "OWNERS") : (shipData.charterer || "CHARTERERS");
    
    const eventType = shipData.type || "Delivery/Redelivery";
    const eventDate = shipData.date || new Date().toLocaleDateString();
    const eventTime = shipData.time || "00:00";

    const text = `This is to certify that M/V "${vesselName}" under ${flag} Flag, P. of Reg. ${portReg}, Gross tonnage: ${grossTonnage} Mt, Net tonnage ${netTonnage} Mt was delivered by Messrs ${deliverer}, to Messrs. ${receiver}. Upon ${eventType} on ${eventDate} at ${eventTime} subject to all terms, conditions and exceptions agreed between Owners and Charterers as per governing Charter Party.`;

    const splitText = doc.splitTextToSize(text, pageWidth - (margin * 2));
    doc.text(splitText, margin, yPos);
    yPos += (splitText.length * 7) + 10;

    // --- QUANTITIES TABLE ---
    doc.setFont(brand.fonts.main, "bold");
    doc.text("QUANTITIES REMAINING ON BOARD:", margin, yPos);
    yPos += 5;

    const calculatedTotals = calculatorData.calculatedTotals || {};
    const summaryData = [
        ['Grade', 'Quantity (MT)'],
        ['VLSFO', (parseFloat(calculatorData.summaryValues?.VLSFO || calculatedTotals['VLSFO'] || 0).toFixed(3))],
        ['HSFO', (parseFloat(calculatorData.summaryValues?.HSFO || calculatedTotals['HSFO'] || 0).toFixed(3))],
        ['MDO', (parseFloat(calculatorData.summaryValues?.MDO || calculatedTotals['MDO'] || 0).toFixed(3))],
        ['LSMGO', (parseFloat(calculatorData.summaryValues?.LSMGO || calculatedTotals['LSMGO'] || 0).toFixed(3))]
    ];

    autoTable(doc, {
        startY: yPos,
        head: [summaryData[0]],
        body: summaryData.slice(1),
        theme: 'grid',
        headStyles: { fillColor: brand.colors.primary, textColor: 255, halign: 'center' },
        styles: { font: brand.fonts.main, fontSize: 10, halign: 'center' },
        columnStyles: { 0: { fontStyle: 'bold', halign: 'left' } },
        margin: { left: margin, right: margin },
        tableWidth: 'auto'
    });
    yPos = doc.lastAutoTable.finalY + 15;

    // --- REMARKS ---
    doc.setFont(brand.fonts.main, "bold");
    doc.text("REMARKS:", margin, yPos);
    yPos += 7;
    doc.setFont(brand.fonts.main, "normal");
    doc.setFontSize(10);
    doc.text("Figures are based on ship's calibration tables.", margin, yPos);
    yPos += 20;

    // --- SIGNATURES ---
    const sigY = yPos + 10;
    doc.setLineWidth(0.5);
    doc.line(margin, sigY, margin + 60, sigY);
    doc.line(pageWidth - margin - 60, sigY, pageWidth - margin, sigY);

    doc.setFont(brand.fonts.main, "bold");
    doc.text(`For ${deliverer}`, margin, sigY + 5);
    doc.text(`For ${receiver}`, pageWidth - margin - 60, sigY + 5);

    // --- DISCLAIMER ---
    const disclaimerY = 270;
    doc.setFontSize(8);
    doc.setFont(brand.fonts.main, "italic");
    doc.text("This certificate is issued without prejudice to the rights of either party.", margin, disclaimerY);

    const safeName = (shipData.name || 'Certificate').replace(/[^a-z0-9]/gi, '_');
    doc.save(`${safeName}_Certificate.pdf`);
};
